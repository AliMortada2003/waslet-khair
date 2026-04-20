import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const CasesFilters = ({
    categories = [],
    charities = [],
    selectedCategory,
    setSelectedCategory,
    selectedCharity,
    setSelectedCharity
}) => {

    // شروط العرض: لو مفيش داتا مش هنعرض السليكت الخاص بيها
    const hasCategories = categories && categories.length > 0;
    const hasCharities = charities && charities.length > 0;

    // لو مفيش الاتنين، مش هنعرض الكومبوننت أصلاً
    if (!hasCategories && !hasCharities) return null;

    const resetFilters = () => {
        setSelectedCategory("all");
        setSelectedCharity("all");
    };

    const isFiltered = selectedCategory !== "all" || selectedCharity !== "all";

    const selectStyles = `
        bg-white dark:bg-slate-800 
        text-slate-600 dark:text-slate-200 
        text-xs font-bold p-2.5 rounded-xl 
        border border-slate-200 dark:border-white/10 
        outline-none focus:ring-2 focus:ring-indigo-500/50 
        transition-all cursor-pointer hover:border-indigo-500/50
    `;

    return (
        <div className="flex flex-wrap items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
            {/* ليبل التصفية */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5">
                <Filter size={14} className="text-indigo-500" />
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">تصفية حسب:</span>
            </div>

            {/* فلتر التصنيفات - يعرض فقط لو فيه بيانات */}
            {hasCategories && (
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={selectStyles}
                >
                    <option value="all">كل التصنيفات</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            )}

            {/* فلتر الجمعيات - يعرض فقط لو فيه بيانات */}
            {hasCharities && (
                <select
                    value={selectedCharity}
                    onChange={(e) => setSelectedCharity(e.target.value)}
                    className={selectStyles}
                >
                    <option value="all">كل الجمعيات</option>
                    {charities.map(charity => (
                        <option key={charity.id} value={charity.id}>{charity.name}</option>
                    ))}
                </select>
            )}

            {/* زرار إعادة التعيين */}
            {isFiltered && (
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors group"
                >
                    <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />
                    إعادة تعيين
                </button>
            )}
        </div>
    );
};

export default CasesFilters;