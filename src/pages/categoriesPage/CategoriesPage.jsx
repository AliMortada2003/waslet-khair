import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCategories } from "../../hocks/useCategoriesHocks";
import { unifyCategories } from "../../helpers/MockapData";

const CategoriesPage = () => {
    const { data: categories = [], isLoading, isError } = useGetCategories();

    const unifiedCategories = useMemo(() => {
        return unifyCategories(categories);
    }, [categories]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { y: 24, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.45, ease: "easeOut" },
        },
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950" dir="rtl">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        جاري تحميل التصنيفات...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6" dir="rtl">
                <div className="max-w-md w-full text-center rounded-[2rem] bg-white dark:bg-slate-900 border border-red-100 dark:border-red-500/10 shadow-lg p-8">
                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-3">
                        حدث خطأ أثناء تحميل التصنيفات
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        حاول تحديث الصفحة أو المحاولة مرة أخرى بعد قليل.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 pt-28 pb-20 px-5"
            dir="rtl"
        >
            <div className="max-w-[1280px] mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-5 shadow-sm">
                        <LayoutGrid size={16} />
                        <span>أنواع التبرع</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        اختر <span className="text-indigo-600">نوع التبرع</span> المناسب
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-8">
                        استكشف مجالات العطاء المختلفة، واختر المجال الأقرب إلى قلبك، ثم تصفح الحالات المرتبطة به بسهولة ووضوح.
                    </p>
                </div>

                {unifiedCategories.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
                    >
                        {unifiedCategories.map((cat) => {
                            const Icon = cat.icon || LayoutGrid;

                            const firstImage = cat?.originalCategories?.find(
                                (c) => c.iconUrl
                            )?.iconUrl;

                            return (
                                <motion.div
                                    key={cat.slug}
                                    variants={itemVariants}
                                    className="h-full"
                                >
                                    <Link
                                        to={`/categories/${cat.slug || cat.name}`}
                                        className="block h-full group"
                                    >
                                        <div className="h-full rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300">
                                            <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                {firstImage ? (
                                                    <img
                                                        src={firstImage}
                                                        alt={cat.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-500/10 dark:to-sky-500/10">
                                                        <Icon
                                                            className={`w-16 h-16 ${
                                                                cat.textColor ||
                                                                "text-indigo-600 dark:text-indigo-400"
                                                            }`}
                                                        />
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />

                                                <div className="absolute top-4 right-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm shadow-md flex items-center justify-center">
                                                        <Icon
                                                            className={`w-6 h-6 ${
                                                                cat.textColor ||
                                                                "text-indigo-600 dark:text-indigo-400"
                                                            }`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl text-center font-black text-slate-800 dark:text-white mb-3">
                                                    {cat.name}
                                                </h3>

                                                <p className="text-sm text-center text-slate-500 dark:text-slate-400 leading-7 mb-5 min-h-[56px]">
                                                    {cat.description}
                                                </p>

                                                <div className="flex justify-center">
                                                    <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                        <span>استعراض الحالات</span>
                                                        <ArrowLeft
                                                            size={16}
                                                            className="group-hover:-translate-x-1 transition-transform"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-5">
                            <LayoutGrid className="text-slate-400" size={34} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                            لا توجد تصنيفات حالياً
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            سيتم إضافة تصنيفات جديدة قريبًا.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;