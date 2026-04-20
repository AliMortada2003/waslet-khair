import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LayoutGrid, 
    Loader2, 
    Inbox,
    Filter,
    ArrowUpDown,
    CheckCircle2
} from "lucide-react";

import { useGetCharities } from "../../hocks/useCharityHooks"; 
import CharityCard from './../../components/cards/CharityCard';

const CharitiesPage = () => {
    const { data: charities, isLoading, isError } = useGetCharities();
    const [activeFilter, setActiveFilter] = useState("all");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const filters = [
        { id: "all", label: "الكل" },
        { id: "top", label: "الأكثر نشاطاً" },
        { id: "new", label: "انضم حديثاً" },
    ];

    return (
        <div className="min-h-screen bg-slate-100/3 dark:bg-slate-950 pt-32 pb-20" dir="rtl">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- الهيدر الرئيسي --- */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-4 text-sm font-bold"
                    >
                        <CheckCircle2 size={16} />
                        <span>شركاء معتمدون وموثوقون</span>
                    </motion.div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        شركاء <span className="text-indigo-600">الخير</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                        نعمل يداً بيد مع كبرى المؤسسات الخيرية لضمان وصول أمانتكم لمستحقيها. 
                        <span className="md:block text-indigo-600/70 dark:text-indigo-400/50"> ابحث عن المؤسسة التي تود دعم مسيرتها اليوم.</span>
                    </p>
                </div>

                {/* --- قسم الفلترة (تحت الهيدر على اليمين) --- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-200 dark:border-white/5 pb-8">
                    <div className="flex items-center gap-3 self-start">
                        <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 text-indigo-600">
                            <Filter size={20} />
                        </div>
                        <div className="flex items-center gap-2 p-1 bg-slate-200/50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${
                                        activeFilter === filter.id 
                                        ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm" 
                                        : "text-slate-500 hover:text-indigo-600"
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* إحصائية سريعة بجانب الفلتر */}
                    <div className="text-slate-400 font-bold text-sm flex items-center gap-2">
                        <ArrowUpDown size={16} />
                        عرض {charities?.length || 0} مؤسسة خيرية
                    </div>
                </div>

                {/* --- محتوى الصفحة --- */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="relative">
                            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                            <div className="absolute inset-0 blur-2xl bg-indigo-500/20 animate-pulse"></div>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 font-black text-xl">جاري فحص قائمة الشركاء...</span>
                    </div>
                ) : isError ? (
                    <div className="max-w-md mx-auto text-center py-20 px-8 bg-red-50 dark:bg-red-950/10 rounded-[3rem] border-2 border-dashed border-red-100 dark:border-red-900/20">
                        <Inbox size={40} className="mx-auto mb-6 text-red-600" />
                        <h3 className="text-xl font-black text-red-700 dark:text-red-400 mb-2">حدث خطأ تقني</h3>
                        <p className="text-red-600/70 dark:text-red-400/60 font-medium">لم نتمكن من جلب بيانات الجمعيات، يرجى المحاولة لاحقاً.</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {charities?.map((charity) => (
                                <CharityCard key={charity.id} charity={charity} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default CharitiesPage;