import React, { useMemo, useState } from "react";
import {
    Heart,
    AlertCircle,
    Sparkles,
    LayoutGrid,
    Search,
} from "lucide-react";

// Hooks
import { useGetCases, useGetCasesByCategoryName } from "../../hocks/useCaseHooks";
import { useGetCategories } from "../../hocks/useCategoriesHocks";
import { useUser } from "../../hocks/useAuthHocks";
import { useGetFavoriteCasesByDonorId } from "../../hocks/useFavoriteHooks";

// Components
import CaseCard from "../../components/cards/CaseCard";
import { unifyCategoriesFromApi } from "../../helpers/categoryMatcher";

const INITIAL_VISIBLE_CASES = 8;

const PublicCasesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_CASES);

    const { data: userData } = useUser();
    const donorId = userData?.user?.id;

    const {
        data: favoriteCases = [],
    } = useGetFavoriteCasesByDonorId(donorId);

    const {
        data: categories = [],
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategories();

    const unifiedCategories = useMemo(() => {
        return unifyCategoriesFromApi(categories);
    }, [categories]);

    const selectedCategoryObject = useMemo(() => {
        if (selectedCategory === "all") return null;
        return unifiedCategories.find((cat) => cat.slug === selectedCategory) || null;
    }, [selectedCategory, unifiedCategories]);

    const {
        data: allCases = [],
        isLoading: allCasesLoading,
        isError: allCasesError,
        error: allCasesErrorObj,
    } = useGetCases();

    const {
        data: categoryCases = [],
        isLoading: categoryCasesLoading,
        isError: categoryCasesError,
        error: categoryCasesErrorObj,
    } = useGetCasesByCategoryName(selectedCategoryObject?.name);

    const activeCases = useMemo(() => {
        return selectedCategory === "all" ? allCases : categoryCases;
    }, [selectedCategory, allCases, categoryCases]);

    const favoriteCaseIds = useMemo(() => {
        return new Set(favoriteCases.map((fav) => fav.caseId));
    }, [favoriteCases]);

    const isLoading = selectedCategory === "all" ? allCasesLoading : categoryCasesLoading;
    const isError = selectedCategory === "all" ? allCasesError : categoryCasesError;
    const error = selectedCategory === "all" ? allCasesErrorObj : categoryCasesErrorObj;

    const visibleCases = useMemo(() => {
        return activeCases.slice(0, visibleCount);
    }, [activeCases, visibleCount]);

    const hasMoreCases = activeCases.length > visibleCount;

    const handleSelectCategory = (slug) => {
        setSelectedCategory(slug);
        setVisibleCount(INITIAL_VISIBLE_CASES);
    };

    const headerBg = "/images/Hero_background.avif";

    if (categoriesLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                        <Heart
                            className="absolute inset-0 m-auto text-indigo-600 animate-pulse"
                            size={20}
                        />
                    </div>
                    <p className="text-slate-900 dark:text-white font-black text-xl">
                        جاري تحميل التصنيفات...
                    </p>
                </div>
            </div>
        );
    }

    if (categoriesError) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6">
                <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-red-100 dark:border-red-500/10 shadow-xl p-10">
                    <AlertCircle className="mx-auto text-red-500 mb-5" size={60} />
                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-3">
                        حدث خطأ أثناء تحميل التصنيفات
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        حاول مرة أخرى بعد قليل.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-700"
            dir="rtl"
        >
            <section className="relative pt-28 pb-20 overflow-hidden border-b border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 z-0">
                    <img
                        src={headerBg}
                        alt="حالات التبرع"
                        className="w-full h-full object-cover dark:opacity-60 scale-105"

                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/20 via-slate-50/70 to-slate-50/65 dark:from-slate-950/80 dark:via-slate-950/65 dark:to-slate-950" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white mb-6 shadow-xl shadow-indigo-500/20">
                        <Sparkles size={18} />
                        <span className="text-sm font-bold tracking-wide">
                            معًا نصنع أثرًا حقيقيًا
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white mb-6 leading-tight">
                        اكتشف <span className="text-indigo-600">حالات التبرع</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-bold leading-relaxed">
                        اختر التصنيف المناسب واستعرض الحالات المتاحة للتبرع بسهولة.
                    </p>
                </div>
            </section>

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                            <LayoutGrid
                                className="text-indigo-600 dark:text-indigo-400"
                                size={20}
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                التصنيفات
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                                اختر تصنيفًا لعرض الحالات
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                        <button
                            onClick={() => handleSelectCategory("all")}
                            className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-2xl border font-black text-sm transition-all ${selectedCategory === "all"
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-200 dark:hover:border-indigo-500/20"
                                }`}
                        >
                            <LayoutGrid size={16} />
                            كل الحالات
                        </button>

                        {unifiedCategories.map((cat) => {
                            const Icon = cat.icon || Heart;
                            const isActive = selectedCategory === cat.slug;

                            return (
                                <button
                                    key={cat.slug}
                                    onClick={() => handleSelectCategory(cat.slug)}
                                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-2xl border font-black text-sm transition-all ${isActive
                                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-200 dark:hover:border-indigo-500/20"
                                        }`}
                                >
                                    <Icon
                                        size={16}
                                        className={
                                            isActive
                                                ? "text-white"
                                                : cat.textColor || "text-indigo-600 dark:text-indigo-400"
                                        }
                                    />
                                    <span>{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section className="min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                                {selectedCategory === "all"
                                    ? "كل الحالات المتاحة"
                                    : `حالات ${selectedCategoryObject?.name}`}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                                {selectedCategory === "all"
                                    ? "تصفح جميع الحالات المتاحة للتبرع"
                                    : "حالات مرتبطة بالتصنيف المحدد"}
                            </p>
                        </div>

                        <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold">
                            النتائج:{" "}
                            <span className="text-indigo-600 dark:text-indigo-400">
                                {activeCases.length}
                            </span>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="py-32 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                                <Heart
                                    className="absolute inset-0 m-auto text-indigo-600 animate-pulse"
                                    size={20}
                                />
                            </div>
                            <p className="text-slate-900 dark:text-white font-black text-2xl mt-6">
                                جاري جلب الحالات...
                            </p>
                        </div>
                    ) : isError ? (
                        <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-red-100 dark:border-red-500/10 shadow-sm">
                            <AlertCircle className="mx-auto text-red-500 mb-6" size={64} />
                            <h3 className="text-red-900 dark:text-red-400 font-black text-2xl">
                                نأسف، حدث خطأ ما
                            </h3>
                            <p className="text-slate-500 mt-4 font-bold text-lg max-w-md mx-auto">
                                {error?.message || "تأكد من اتصالك بالإنترنت"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                                {visibleCases.map((item, index) => (
                                    <CaseCard
                                        key={item.id}
                                        item={item}
                                        index={index} isFavorite={favoriteCaseIds.has(item.id)}
                                    />
                                ))}
                            </div>

                            {hasMoreCases && (
                                <div className="flex justify-center mt-10">
                                    <button
                                        onClick={() => setVisibleCount((prev) => prev + 8)}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                                    >
                                        عرض المزيد
                                    </button>
                                </div>
                            )}

                            {activeCases.length === 0 && (
                                <div className="py-28 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/10">
                                    <Search
                                        size={72}
                                        className="mx-auto text-slate-300 dark:text-slate-700 mb-6"
                                    />
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                                        لا توجد حالات حالياً
                                    </h3>
                                    <p className="text-slate-400 mt-4 text-lg font-bold">
                                        جرّب اختيار تصنيف آخر
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default PublicCasesPage;