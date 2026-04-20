import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Heart,
    ArrowRight,
    SearchX,
    LayoutGrid,
    AlertCircle,
    FolderHeart,
} from "lucide-react";

import { useGetCategories } from "../../hocks/useCategoriesHocks";
import { useGetCasesByCategoryName } from "../../hocks/useCaseHooks";
import CaseCard from "../../components/cards/CaseCard";
import { unifyCategoriesFromApi } from "../../helpers/categoryMatcher";

function CategoriesPageDetails() {
    const { slug } = useParams();

    const {
        data: categories = [],
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategories();

    const unifiedCategories = useMemo(() => {
        return unifyCategoriesFromApi(categories);
    }, [categories]);

    const currentCategory = useMemo(() => {
        return (
            unifiedCategories.find(
                (item) => String(item.slug || item.name) === String(slug)
            ) || null
        );
    }, [unifiedCategories, slug]);

    const {
        data: cases = [],
        isLoading: casesLoading,
        isError: casesError,
        error,
    } = useGetCasesByCategoryName(currentCategory?.name);

    const Icon = currentCategory?.icon || FolderHeart;

    const firstImage = currentCategory?.originalCategories?.find(
        (cat) => cat.iconUrl
    )?.iconUrl;

    if (categoriesLoading) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"
                dir="rtl"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                        <Heart
                            className="absolute inset-0 m-auto text-indigo-600 animate-pulse"
                            size={20}
                        />
                    </div>
                    <p className="text-slate-900 dark:text-white font-black text-xl">
                        جاري تحميل بيانات التصنيف...
                    </p>
                </div>
            </div>
        );
    }

    if (categoriesError) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6"
                dir="rtl"
            >
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

    if (!currentCategory) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6"
                dir="rtl"
            >
                <div className="max-w-xl w-full text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl p-10">
                    <SearchX className="mx-auto text-slate-400 mb-5" size={60} />
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
                        التصنيف غير موجود
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">
                        لم نتمكن من العثور على هذا التصنيف ضمن التصنيفات المتاحة.
                    </p>
                    <Link
                        to="/categories"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all"
                    >
                        <ArrowRight size={18} />
                        العودة إلى التصنيفات
                    </Link>
                </div>
            </div>
        );
    }

    if (casesLoading) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"
                dir="rtl"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                        <Heart
                            className="absolute inset-0 m-auto text-indigo-600 animate-pulse"
                            size={20}
                        />
                    </div>
                    <p className="text-slate-900 dark:text-white font-black text-xl">
                        جاري تحميل الحالات...
                    </p>
                </div>
            </div>
        );
    }

    if (casesError) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6"
                dir="rtl"
            >
                <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-red-100 dark:border-red-500/10 shadow-xl p-10">
                    <AlertCircle className="mx-auto text-red-500 mb-5" size={60} />
                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-3">
                        حدث خطأ أثناء تحميل الحالات
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        {error?.message || "حاول مرة أخرى بعد قليل."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950" dir="rtl">
            <section className="relative overflow-hidden pt-28 pb-14">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-500/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/30 dark:bg-sky-500/10 blur-3xl rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <Link
                        to="/categories"
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-8 hover:gap-3 transition-all"
                    >
                        <ArrowRight size={18} />
                        العودة إلى كل التصنيفات
                    </Link>

                    <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-center bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-sm">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-5">
                                <LayoutGrid size={16} />
                                تصنيف الحالات
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.3] mb-4">
                                حالات {currentCategory.name}
                            </h1>

                            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-8 font-medium mb-6 max-w-2xl">
                                {currentCategory.description ||
                                    "استعرض الحالات التابعة لهذا التصنيف، واختر الحالة التي ترغب في دعمها والمساهمة في مساعدة أصحابها بشكل مباشر."}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold">
                                    عدد الحالات: <span className="text-indigo-600 dark:text-indigo-400">{cases.length}</span>
                                </div>

                                <div className="px-5 py-3 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20">
                                    تصنيف: {currentCategory.name}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[360px] aspect-square rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl">
                                <div className="absolute inset-0 bg-white/30 dark:bg-black/10" />

                                {firstImage ? (
                                    <img
                                        src={firstImage}
                                        alt={currentCategory.name}
                                        className="relative z-10 w-full h-full object-contain p-8 md:p-10"
                                    />
                                ) : (
                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                        <Icon
                                            className={`w-28 h-28 md:w-36 md:h-36 ${
                                                currentCategory.textColor ||
                                                "text-indigo-600 dark:text-indigo-400"
                                            }`}
                                        />
                                    </div>
                                )}

                                <div className="absolute top-5 left-5 w-16 h-16 rounded-full bg-indigo-200/40 dark:bg-indigo-500/10 blur-2xl" />
                                <div className="absolute bottom-5 right-5 w-20 h-20 rounded-full bg-sky-200/40 dark:bg-sky-500/10 blur-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 pb-14">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                            <LayoutGrid
                                className="text-indigo-600 dark:text-indigo-400"
                                size={22}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                                الحالات المتاحة
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                اختر الحالة المناسبة وابدأ المساهمة الآن
                            </p>
                        </div>
                    </div>
                </div>

                {cases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cases.map((item, index) => (
                            <CaseCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm">
                        <SearchX
                            size={72}
                            className="mx-auto text-slate-300 dark:text-slate-700 mb-6"
                        />
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
                            لا توجد حالات حالياً
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            لا توجد حالات مرتبطة بهذا التصنيف في الوقت الحالي.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default CategoriesPageDetails;