import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
أنت "وصلة"، المساعد الذكي الرسمي لمنصة وصلة خير.

مهمتك:
- مساعدة المستخدم في فهم الحالات المتاحة واختيار الحالة المناسبة للتبرع.
- الإجابة فقط بالاعتماد على بيانات الحالات المرسلة لك.
- لا تخترع معلومات غير موجودة في البيانات.
- لو لم تجد معلومة كافية، قل ذلك بوضوح.
- لو كانت هناك أكثر من حالة مناسبة، رشّح أفضل 3 حالات فقط.
- إذا كانت الحالات المرسلة تتضمن distanceKm فاستفد منها عند الترتيب.

أسلوبك:
- عربي بسيط وواضح
- إنساني وودود
- مختصر ومفيد
- لا تتجاوز 120 كلمة
`;

const STATIC_REPLIES = [
    {
        keywords: ["إزاي أتبرع", "كيف أتبرع", "طريقة التبرع", "عايز أتبرع", "اريد التبرع"],
        reply:
            "تقدر تتبرع بسهولة من خلال اختيار الحالة المناسبة، ثم الدخول على صفحة التبرع، وتحديد المبلغ، وبعدها استكمال خطوات الدفع من داخل المنصة.",
    },
    {
        keywords: ["هل التبرع آمن", "التبرع آمن", "هل الدفع آمن", "الدفع آمن"],
        reply:
            "نعم، التبرع يتم من خلال تجربة منظمة داخل المنصة. اختر الحالة المناسبة وتأكد من تفاصيلها قبل إتمام عملية التبرع.",
    },
    {
        keywords: ["هل أقدر أختار حالة", "اختار حالة", "ممكن أختار حالة", "هل يمكنني اختيار حالة"],
        reply:
            "نعم، يمكنك اختيار الحالة التي تناسبك من الحالات المتاحة داخل المنصة، سواء حسب الفئة أو المدينة أو الاحتياج الظاهر في تفاصيل الحالة.",
    },
];

const normalizeArabic = (text = "") =>
    text
        .toLowerCase()
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .trim();

const matchesAnyKeyword = (text, keywords = []) => {
    const normalizedText = normalizeArabic(text);
    return keywords.some((keyword) => normalizedText.includes(normalizeArabic(keyword)));
};

export const getStaticReply = (message = "") => {
    const found = STATIC_REPLIES.find((item) => matchesAnyKeyword(message, item.keywords));
    return found?.reply || null;
};

export const detectIntent = (message = "") => {
    const msg = normalizeArabic(message);

    if (msg.includes("اقرب") || msg.includes("قريبه") || msg.includes("بالقرب") || msg.includes("جنبى")) {
        return "nearest";
    }

    if (msg.includes("طبي") || msg.includes("مستشفى") || msg.includes("علاج") || msg.includes("عمليه")) {
        return "medical";
    }

    if (msg.includes("غذاء") || msg.includes("اكل") || msg.includes("طعام") || msg.includes("احتياجات اساسيه")) {
        return "food";
    }

    if (msg.includes("تعليمي") || msg.includes("تعليم") || msg.includes("دراسه")) {
        return "education";
    }

    if (msg.includes("ملابس") || msg.includes("بطاطين")) {
        return "clothing";
    }

    if (msg.includes("تبرع")) {
        return "donation_help";
    }

    return "general";
};

const toNumberOrNull = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
};

const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const p1 = toNumberOrNull(lat1);
    const p2 = toNumberOrNull(lon1);
    const p3 = toNumberOrNull(lat2);
    const p4 = toNumberOrNull(lon2);

    if ([p1, p2, p3, p4].some((v) => v === null)) return null;

    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(p3 - p1);
    const dLon = toRad(p4 - p2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(p1)) *
            Math.cos(toRad(p3)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return +(R * c).toFixed(2);
};

const prepareCases = (cases = [], userLocation = null) => {
    return (cases || [])
        .filter((item) => !item.isCompleted)
        .map((item) => {
            const target = Number(item.targetAmount || 0);
            const collected = Number(item.collectedAmount || 0);
            const remainingAmount = Math.max(target - collected, 0);

            let distanceKm = null;
            if (
                userLocation?.latitude &&
                userLocation?.longitude &&
                item.latitude != null &&
                item.longitude != null
            ) {
                distanceKm = calculateDistanceKm(
                    userLocation.latitude,
                    userLocation.longitude,
                    item.latitude,
                    item.longitude
                );
            }

            return {
                ...item,
                remainingAmount,
                distanceKm,
            };
        });
};

const filterCasesByIntent = (intent, cases = [], userLocation = null) => {
    const prepared = prepareCases(cases, userLocation);

    switch (intent) {
        case "nearest":
            return prepared
                .filter((item) => item.distanceKm !== null)
                .sort((a, b) => a.distanceKm - b.distanceKm)
                .slice(0, 3);

        case "medical":
            return prepared
                .filter((item) =>
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("طبي") ||
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("علاج") ||
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("عمليه")
                )
                .slice(0, 5);

        case "food":
            return prepared
                .filter((item) =>
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("غذاء") ||
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("طعام") ||
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("احتياجات")
                )
                .slice(0, 5);

        case "education":
            return prepared
                .filter((item) =>
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("تعليم")
                )
                .slice(0, 5);

        case "clothing":
            return prepared
                .filter((item) =>
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("ملابس") ||
                    normalizeArabic(
                        `${item.categoryName || ""} ${item.title || ""} ${item.description || ""}`
                    ).includes("بطاطين")
                )
                .slice(0, 5);

        case "general":
        default:
            return prepared
                .sort((a, b) => a.remainingAmount - b.remainingAmount)
                .slice(0, 4);
    }
};

const buildCasesContext = (cases = []) => {
    if (!cases.length) return "لا توجد حالات مناسبة متاحة حالياً بناءً على الطلب.";

    return cases
        .map((item, index) => {
            const distanceText =
                item.distanceKm !== null ? ` | المسافة: ${item.distanceKm} كم` : "";

            return `${index + 1}. الفئة: ${item.categoryName || "غير محددة"} | العنوان: ${
                item.title || "بدون عنوان"
            } | المدينة: ${item.city || "غير محددة"} | المتبقي: ${
                item.remainingAmount || 0
            }${distanceText}`;
        })
        .join("\n");
};

const sanitizeHistory = (history = []) => {
    const mapped = history.slice(-4).map((msg) => ({
        role: msg.isBot ? "model" : "user",
        parts: [{ text: msg.text || "" }],
    }));

    const deduped = mapped.reduce((acc, curr) => {
        if (acc.length === 0) return [curr];
        const last = acc[acc.length - 1];
        if (last.role === curr.role) return acc;
        return [...acc, curr];
    }, []);

    if (deduped.length > 0 && deduped[0].role === "model") {
        return deduped.slice(1);
    }

    return deduped;
};

export const chatService = {
    sendMessage: async ({ message, history = [], contextData = {} }) => {
        try {
            const staticReply = getStaticReply(message);
            if (staticReply) {
                return staticReply;
            }

            const { cases = [], userLocation = null } = contextData;
            const intent = detectIntent(message);

            if (intent === "nearest" && !userLocation) {
                return "لتحديد أقرب الحالات لك، فعّل الموقع من جهازك ثم أعد المحاولة.";
            }

            const relevantCases = filterCasesByIntent(intent, cases, userLocation);

            if (
                ["medical", "food", "education", "clothing", "nearest"].includes(intent) &&
                relevantCases.length === 0
            ) {
                return "لم أجد حالياً حالات مناسبة لهذا الطلب ضمن البيانات المتاحة.";
            }

            const dynamicContext = `
نوع الطلب: ${intent}

الحالات المناسبة:
${buildCasesContext(relevantCases)}

تعليمات إضافية:
- اعتمد فقط على الحالات أعلاه.
- لو في أكثر من حالة مناسبة، رشّح أفضل 3 فقط.
- لا تذكر بيانات غير موجودة.
- لو السؤال لا يمكن الإجابة عليه من البيانات الحالية، قل ذلك بوضوح.
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
                    maxOutputTokens: 180,
                    temperature: 0.5,
                },
            });

            return response.text || "عذرًا، لم أتمكن من تجهيز رد مناسب الآن.";
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