import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
أنت "وصلة"، المساعد الذكي الرسمي لمنصة وصلة خير.

مهمتك:
- مساعدة المستخدم في التبرع واختيار الحالة المناسبة.
- الإجابة فقط بالاعتماد على بيانات الحالات المرسلة لك.
- ترشيح الحالات المناسبة حسب الفئة أو الوصف أو القرب الجغرافي إذا كانت الإحداثيات متاحة.
- إذا لم تجد معلومة كافية، أخبر المستخدم بذلك بوضوح.

أسلوبك:
- عربي بسيط وواضح
- إنساني وودود
- مختصر ومفيد (لا تتجاوز 150 كلمة في الرد)
`;

// =====================
// Context Builder - Cases Only
// =====================

const buildCasesContext = (cases = []) => {
    if (!cases.length) return "لا توجد حالات متاحة حالياً.";

    return cases
        .slice(0, 10)
        .map(
            (item, index) =>
                `${index + 1}. [${item.categoryName || "غير محددة"}] ${item.title || "بدون عنوان"} | ${item.city || "غير محددة"} | مطلوب: ${item.targetAmount || 0} | مُجمع: ${item.collectedAmount || 0} | lat: ${item.latitude ?? "?"}, lng: ${item.longitude ?? "?"} | مكتملة: ${item.isCompleted ? "نعم" : "لا"}`
        )
        .join("\n");
};

const buildUserLocationContext = (userLocation) => {
    if (!userLocation) return "موقع المستخدم غير متاح.";
    return `موقع المستخدم: lat=${userLocation.latitude}, lng=${userLocation.longitude}`;
};

// =====================
// History Sanitizer
// ✅ يضمن تناوب صحيح user → model → user
// =====================

const sanitizeHistory = (history = []) => {
    const mapped = history.slice(-6).map((msg) => ({
        role: msg.isBot ? "model" : "user",
        parts: [{ text: msg.text || "" }],
    }));

    // إزالة التكرارات المتتالية لنفس الـ role
    const deduped = mapped.reduce((acc, curr) => {
        if (acc.length === 0) return [curr];
        const last = acc[acc.length - 1];
        if (last.role === curr.role) return acc;
        return [...acc, curr];
    }, []);

    // لازم تبدأ بـ user مش model
    if (deduped.length > 0 && deduped[0].role === "model") {
        return deduped.slice(1);
    }

    return deduped;
};

// =====================
// Main Chat Service
// =====================

export const chatService = {
    sendMessage: async ({ message, history = [], contextData = {} }) => {
        try {
            // ✅ بنستخدم الحالات والموقع فقط، مش باقي البيانات
            const { cases = [], userLocation = null } = contextData;

            const dynamicContext = `
الحالات المتاحة:
${buildCasesContext(cases)}

${buildUserLocationContext(userLocation)}

تعليمات:
- لو سأل عن أقرب حالة، استخدم الإحداثيات.
- اعرض أفضل 3 حالات إذا كان هناك أكثر من خيار.
- لو مفيش إحداثيات، اطلب من المستخدم تفعيل الموقع.
`;

            const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n${dynamicContext}`;
            const safeHistory = sanitizeHistory(history);

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                systemInstruction: fullSystemPrompt,
                contents: [
                    ...safeHistory,
                    {
                        role: "user",
                        parts: [{ text: message }],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.6,
                },
            });

            return response.text;
        } catch (error) {
            console.error("Gemini Service Error:", error);

            if (error.message?.includes("429")) {
                throw new Error("تم تجاوز عدد الطلبات المسموح بها، حاول بعد قليل.");
            }
            if (error.message?.includes("503")) {
                throw new Error("المساعد الذكي مشغول حالياً، حاول مرة أخرى.");
            }
            if (error.message?.includes("400")) {
                throw new Error("حدث خطأ في صياغة الطلب، تواصل مع الدعم الفني.");
            }

            throw new Error("حدثت مشكلة أثناء التواصل مع المساعد الذكي.");
        }
    },
};