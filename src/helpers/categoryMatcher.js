import { Heart } from "lucide-react";
import { categorySuggestions } from "./MockapData";

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

export const slugifyArabic = (text = "") => {
    return normalizeArabic(text).replace(/\s+/g, "-");
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

const buildFallbackCategory = (cat) => {
    return {
        id: `fallback-${cat.id ?? slugifyArabic(cat.name)}`,
        name: cat.name,
        slug: cat.slug || slugifyArabic(cat.name),
        description: cat.description || "",
        icon: Heart,
        textColor: "text-indigo-600 dark:text-indigo-400",
        originalCategories: [cat],
        originalCategoryIds: [cat.id],
        totalMatches: 1,
        isFallback: true,
    };
};

export const unifyCategoriesFromApi = (categories = []) => {
    const grouped = new Map();

    categories.forEach((cat) => {
        const matched = findBestCategoryMatch(cat.name);

        const categoryObject = matched
            ? {
                ...matched,
                originalCategories: [cat],
                originalCategoryIds: [cat.id],
                totalMatches: 1,
                isFallback: false,
            }
            : buildFallbackCategory(cat);

        const key = categoryObject.slug || categoryObject.name;

        if (!grouped.has(key)) {
            grouped.set(key, categoryObject);
        } else {
            const existing = grouped.get(key);
            existing.originalCategories.push(cat);
            existing.originalCategoryIds.push(cat.id);
            existing.totalMatches += 1;
        }
    });

    return Array.from(grouped.values());
};

export const attachUnifiedCategoryToCases = (cases = [], categories = []) => {
    const categoryMap = new Map(categories.map((cat) => [String(cat.id), cat]));

    return cases.map((item) => {
        const rawCategory =
            categoryMap.get(String(item.categoryId)) ||
            (item.category
                ? typeof item.category === "object"
                    ? item.category
                    : { name: item.category }
                : null);

        const matched = findBestCategoryMatch(rawCategory?.name);

        const fallbackCategory = rawCategory?.name
            ? {
                name: rawCategory.name,
                slug: rawCategory.slug || slugifyArabic(rawCategory.name),
                icon: Heart,
                textColor: "text-indigo-600 dark:text-indigo-400",
                isFallback: true,
            }
            : null;

        const finalCategory = matched || fallbackCategory;

        return {
            ...item,
            unifiedCategory: finalCategory || null,
            unifiedCategorySlug: finalCategory?.slug || null,
            unifiedCategoryName: finalCategory?.name || null,
        };
    });
};