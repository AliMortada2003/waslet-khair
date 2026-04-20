import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

const SYSTEM_PROMPT = `
أنت "وصلة"، المساعد الذكي الرسمي لمنصة وصلة خير.

مهمتك:
- مساعدة المستخدم في تصفح المنصة والتبرع بسهولة.
- الإجابة فقط بالاعتماد على البيانات المرسلة لك.
- ترشيح الحالات المناسبة حسب الفئة أو الوصف أو القرب الجغرافي إذا كانت الإحداثيات متاحة.
- شرح محتوى قسم الوعي بشكل مبسط وواضح.
- إذا لم تجد معلومة كافية، أخبر المستخدم بذلك بوضوح.

أسلوبك:
- عربي بسيط وواضح
- إنساني وودود
- مختصر ومفيد
`;

const buildCasesContext = (cases = []) => {
    if (!cases.length) return "لا توجد حالات متاحة حالياً.";

    return cases.slice(0, 30).map((item, index) => `
الحالة ${index + 1}:
- id: ${item.id}
- العنوان: ${item.title || item.caseTitle || "غير متوفر"}
- الوصف: ${item.description || "غير متوفر"}
- الجمعية: ${item.charityName || "غير محددة"}
- الفئة: ${item.categoryName || "غير محددة"}
- المبلغ المطلوب: ${item.targetAmount || item.goalAmount || 0}
- المبلغ المُجمع: ${item.collectedAmount || item.currentAmount || 0}
- المدينة: ${item.city || item.locationName || "غير محددة"}
- latitude: ${item.latitude ?? "غير متوفر"}
- longitude: ${item.longitude ?? "غير متوفر"}
- مكتملة: ${item.isCompleted ? "نعم" : "لا"}
    `).join("\n");
};

const buildAwarenessContext = ({
    awarenessVideos = [],
    awarenessArticles = [],
    awarenessImpactStats = [],
    awarenessQuotes = [],
    awarenessFaqs = [],
}) => {
    return `
قسم الوعي:

الفيديوهات:
${awarenessVideos.map((item, index) => `
${index + 1}. العنوان: ${item.title}
الوصف: ${item.description}
المدة: ${item.duration}
التصنيف: ${item.category}
`).join("\n")}

المقالات:
${awarenessArticles.map((item, index) => `
${index + 1}. العنوان: ${item.title}
الوصف: ${item.description}
`).join("\n")}

إحصائيات الأثر:
${awarenessImpactStats.map((item, index) => `
${index + 1}. ${item.title}: ${item.description}
`).join("\n")}

الاقتباسات:
${awarenessQuotes.map((item, index) => `
${index + 1}. ${item.text} (${item.type})
`).join("\n")}

الأسئلة الشائعة:
${awarenessFaqs.map((item, index) => `
${index + 1}. السؤال: ${item.question}
الإجابة: ${item.answer}
`).join("\n")}
    `;
};

const buildUserLocationContext = (userLocation) => {
    if (!userLocation) return "موقع المستخدم غير متاح حالياً.";

    return `
موقع المستخدم الحالي:
- latitude: ${userLocation.latitude}
- longitude: ${userLocation.longitude}
- city: ${userLocation.city || "غير محددة"}
- address: ${userLocation.address || "غير متوفر"}
    `;
};

export const chatService = {
    sendMessage: async ({
        message,
        history = [],
        contextData = {}
    }) => {
        try {
            const {
                cases = [],
                awarenessVideos = [],
                awarenessArticles = [],
                awarenessImpactStats = [],
                awarenessQuotes = [],
                awarenessFaqs = [],
                userLocation = null,
            } = contextData;

            const formattedHistory = history.slice(-6).map((msg) => ({
                role: msg.isBot ? "model" : "user",
                parts: [{ text: msg.text }]
            }));

            const dynamicContext = `
بيانات المنصة الحالية:

الحالات المتاحة:
${buildCasesContext(cases)}

${buildAwarenessContext({
                awarenessVideos,
                awarenessArticles,
                awarenessImpactStats,
                awarenessQuotes,
                awarenessFaqs,
            })}

${buildUserLocationContext(userLocation)}

مهم:
- إذا سأل المستخدم عن أقرب حالة له، استخدم الإحداثيات إن كانت موجودة.
- إذا كانت هناك أكثر من حالة مناسبة، اعرض أفضل 3 حالات.
- إذا لم تكن الإحداثيات موجودة، اطلب من المستخدم تفعيل الموقع أو أخبره بعدم توفر الموقع.
- لا تذكر بيانات غير موجودة.
            `;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                systemInstruction: SYSTEM_PROMPT,
                contents: [
                    {
                        role: "user",
                        parts: [{ text: dynamicContext }]
                    },
                    ...formattedHistory,
                    {
                        role: "user",
                        parts: [{ text: message }]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.6,
                }
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

            throw new Error("حدثت مشكلة أثناء التواصل مع المساعد الذكي.");
        }
    },
};