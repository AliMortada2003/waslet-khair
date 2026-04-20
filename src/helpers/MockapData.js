import {
    HeartHandshake,
    GraduationCap,
    HeartPulse,
    Utensils,
    Landmark,
    Droplets,
    Home,
    HandCoins,
    Users,
    Accessibility,
    Stethoscope,
    Pill,
    Baby,
    Shirt,
    Bed,
    Building2,
} from "lucide-react";

export const categorySuggestions = [
    {
        id: 1,
        name: "كفالة أيتام",
        slug: "كفالة-أيتام",
        icon: HeartHandshake,
        color: "from-pink-500/15 to-rose-500/10",
        textColor: "text-pink-600 dark:text-pink-400",
        description: "ساهم في رعاية الأيتام وتوفير احتياجاتهم الأساسية",
    },
    {
        id: 2,
        name: "تعليم",
        slug: "تعليم",
        icon: GraduationCap,
        color: "from-blue-500/15 to-cyan-500/10",
        textColor: "text-blue-600 dark:text-blue-400",
        description: "ادعم الطلاب وساهم في بناء مستقبل أفضل",
    },
    {
        id: 3,
        name: "صحة",
        slug: "صحة",
        icon: HeartPulse,
        color: "from-red-500/15 to-rose-500/10",
        textColor: "text-red-600 dark:text-red-400",
        description: "شارك في دعم الحالات الصحية والعلاجية",
    },
    {
        id: 4,
        name: "إطعام",
        slug: "إطعام",
        icon: Utensils,
        color: "from-orange-500/15 to-amber-500/10",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "ساهم في توفير الطعام للأسر الأكثر احتياجًا",
    },
    {
        id: 5,
        name: "زكاة",
        slug: "زكاة",
        icon: Landmark,
        color: "from-emerald-500/15 to-green-500/10",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "أخرج زكاتك بكل ثقة لتصل لمستحقيها",
    },
    {
        id: 6,
        name: "مياه",
        slug: "مياه",
        icon: Droplets,
        color: "from-sky-500/15 to-blue-500/10",
        textColor: "text-sky-600 dark:text-sky-400",
        description: "ساهم في مشروعات توفير المياه النقية",
    },
    {
        id: 7,
        name: "إيجار وسكن",
        slug: "إيجار-وسكن",
        icon: Home,
        color: "from-indigo-500/15 to-violet-500/10",
        textColor: "text-indigo-600 dark:text-indigo-400",
        description: "ساعد الأسر في توفير سكن آمن ومستقر",
    },
    {
        id: 8,
        name: "سداد ديون",
        slug: "سداد-ديون",
        icon: HandCoins,
        color: "from-yellow-500/15 to-amber-500/10",
        textColor: "text-yellow-600 dark:text-yellow-400",
        description: "فرّج كربة الغارمين وساهم في سداد ديونهم",
    },
    {
        id: 9,
        name: "دعم أسر محتاجة",
        slug: "دعم-أسر-محتاجة",
        icon: Users,
        color: "from-teal-500/15 to-emerald-500/10",
        textColor: "text-teal-600 dark:text-teal-400",
        description: "ادعم الأسر الأكثر احتياجًا باحتياجاتها الأساسية",
    },
    {
        id: 10,
        name: "ذوي الاحتياجات الخاصة",
        slug: "ذوي-الاحتياجات-الخاصة",
        icon: Accessibility,
        color: "from-fuchsia-500/15 to-pink-500/10",
        textColor: "text-fuchsia-600 dark:text-fuchsia-400",
        description: "شارك في دعم ورعاية ذوي الاحتياجات الخاصة",
    },
    {
        id: 11,
        name: "علاج مرضى",
        slug: "علاج-مرضى",
        icon: Stethoscope,
        color: "from-rose-500/15 to-red-500/10",
        textColor: "text-rose-600 dark:text-rose-400",
        description: "ساهم في علاج المرضى وتخفيف معاناتهم",
    },
    {
        id: 12,
        name: "أدوية",
        slug: "أدوية",
        icon: Pill,
        color: "from-lime-500/15 to-green-500/10",
        textColor: "text-lime-600 dark:text-lime-400",
        description: "ساعد في توفير الأدوية للحالات المحتاجة",
    },
    {
        id: 13,
        name: "رعاية أطفال",
        slug: "رعاية-أطفال",
        icon: Baby,
        color: "from-cyan-500/15 to-sky-500/10",
        textColor: "text-cyan-600 dark:text-cyan-400",
        description: "شارك في رعاية الأطفال وتلبية احتياجاتهم",
    },
    {
        id: 14,
        name: "ملابس",
        slug: "ملابس",
        icon: Shirt,
        color: "from-purple-500/15 to-violet-500/10",
        textColor: "text-purple-600 dark:text-purple-400",
        description: "ساهم في توفير الملابس للأسر المحتاجة",
    },
    {
        id: 15,
        name: "بطاطين",
        slug: "بطاطين",
        icon: Bed,
        color: "from-slate-500/15 to-gray-500/10",
        textColor: "text-slate-600 dark:text-slate-400",
        description: "ادعم حملات الشتاء وتوفير البطاطين للمحتاجين",
    },
    {
        id: 16,
        name: "بناء مساجد",
        slug: "بناء-مساجد",
        icon: Building2,
        color: "from-emerald-500/15 to-teal-500/10",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "شارك في صدقة جارية من خلال بناء المساجد",
    },
];

const aliasMap = {
    "التعليم": "تعليم",
    "تعليمية": "تعليم",
    "دعم التعليم": "تعليم",
    "تعليم الطلاب": "تعليم",

    "الصحة": "صحة",
    "الرعاية الصحية": "صحة",

    "الاطعام": "إطعام",
    "اطعام": "إطعام",
    "إطعام الطعام": "إطعام",
    "توزيع وجبات": "إطعام",

    "الزكاة": "زكاة",

    "مياه شرب": "مياه",
    "حفر آبار": "مياه",

    "سكن": "إيجار وسكن",
    "إيجار": "إيجار وسكن",
    "ايجار": "إيجار وسكن",
    "ايجار وسكن": "إيجار وسكن",

    "الغارمين": "سداد ديون",
    "سداد دين": "سداد ديون",

    "كفالة اليتيم": "كفالة أيتام",
    "كفالة يتيم": "كفالة أيتام",
    "الايتام": "كفالة أيتام",

    "احتياجات خاصة": "ذوي الاحتياجات الخاصة",
    "ذوي الاحتياجات": "ذوي الاحتياجات الخاصة",

    "العلاج": "علاج مرضى",
    "علاج": "علاج مرضى",
    "مرضى": "علاج مرضى",

    "الادوية": "أدوية",
    "ادوية": "أدوية",

    "رعاية الطفل": "رعاية أطفال",
    "الأطفال": "رعاية أطفال",

    "كساء": "ملابس",
    "ملابس الشتاء": "ملابس",

    "بطانيات": "بطاطين",

    "بناء مسجد": "بناء مساجد",
    "مساجد": "بناء مساجد",
};

export const normalizeArabic = (text = "") => {
    return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/[ًٌٍَُِّْـ]/g, "")
        .replace(/[^\u0600-\u06FF0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

const normalizedAliasMap = Object.entries(aliasMap).reduce((acc, [key, value]) => {
    acc[normalizeArabic(key)] = value;
    return acc;
}, {});

const normalizedStaticObjects = categorySuggestions.reduce((acc, item) => {
    acc[normalizeArabic(item.name)] = item;
    return acc;
}, {});

export const findBestCategoryMatch = (inputName) => {
    if (!inputName) return null;

    const normalized = normalizeArabic(inputName);

    if (normalizedAliasMap[normalized]) {
        const matchedName = normalizedAliasMap[normalized];
        return categorySuggestions.find((item) => item.name === matchedName) || null;
    }

    if (normalizedStaticObjects[normalized]) {
        return normalizedStaticObjects[normalized];
    }

    for (const key in normalizedAliasMap) {
        if (
            normalized.length >= 3 &&
            (normalized.includes(key) || key.includes(normalized))
        ) {
            const matchedName = normalizedAliasMap[key];
            return categorySuggestions.find((item) => item.name === matchedName) || null;
        }
    }

    for (const key in normalizedStaticObjects) {
        if (
            normalized.length >= 3 &&
            (normalized.includes(key) || key.includes(normalized))
        ) {
            return normalizedStaticObjects[key];
        }
    }

    return null;
};

export const unifyCategories = (categories = []) => {
    const grouped = new Map();

    categories.forEach((cat) => {
        const matched = findBestCategoryMatch(cat.name);

        if (!matched) return;

        const key = matched.slug || matched.name;

        if (!grouped.has(key)) {
            grouped.set(key, {
                ...matched,
                originalCategories: [cat],
                totalMatches: 1,
            });
        } else {
            const existing = grouped.get(key);
            existing.originalCategories.push(cat);
            existing.totalMatches += 1;
        }
    });

    return Array.from(grouped.values());
};