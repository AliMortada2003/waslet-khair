import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';

const FilterBar = ({
    searchQuery,
    setSearchQuery,
    placeholder = "ابحث هنا...",
    onFilterClick,
    viewType = 'grid', 
    setViewType,
    showViewSwitcher = true,
    totalResults // أضفت هذا الـ prop لعرض عدد النتائج داخل البار
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-3 rounded-[2rem] border border-slate-200 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center shadow-xl shadow-slate-200/50 dark:shadow-none">
            
            {/* --- حقل البحث --- */}
            <div className="relative flex-1 w-full group">
                <Search
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                    size={20}
                />
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500/20 rounded-2xl py-3 pr-12 pl-4 outline-none focus:ring-4 ring-indigo-500/5 text-sm font-bold transition-all text-slate-700 dark:text-slate-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* --- أدوات التحكم --- */}
            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto px-2 md:px-0">
                
                {/* عدّاد النتائج (اختياري) */}
                {totalResults !== undefined && (
                    <div className="hidden xl:block px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                            {totalResults} حالة
                        </span>
                    </div>
                )}

                {/* أزرار تبديل العرض (Grid / List) */}
                {showViewSwitcher && (
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-white/5">
                        <button
                            onClick={() => setViewType?.('grid')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                                viewType === 'grid'
                                    ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm font-black'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold'
                            }`}
                        >
                            <LayoutGrid size={18} />
                            <span className="text-xs">شبكة</span>
                        </button>
                        <button
                            onClick={() => setViewType?.('list')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                                viewType === 'list'
                                    ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm font-black'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold'
                            }`}
                        >
                            <List size={18} />
                            <span className="text-xs">قائمة</span>
                        </button>
                    </div>
                )}

                {/* زر الفلتر (يظهر في الموبايل أو كزر إضافي) */}
                {onFilterClick && (
                    <button
                        onClick={onFilterClick}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-all active:scale-95"
                    >
                        <Filter size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterBar;