import React from "react";
import { LayoutGrid, Edit2, Trash2 } from "lucide-react";

const AdminCardCategory = ({ category, onEdit, onDelete }) => {
    return (
        <div className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 p-4">
            {/* حاوية الصورة */}
            <div className="h-28 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800/50 relative">
                {category.iconUrl ? (
                    <img
                        src={category.iconUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.parentElement.querySelector(".fallback-icon");
                            if (fallback) fallback.classList.remove("hidden");
                        }}
                    />
                ) : null}

                <div className={`fallback-icon ${category.iconUrl ? "hidden" : "flex"} w-full h-full items-center justify-center bg-indigo-50 dark:bg-indigo-500/10`}>
                    <LayoutGrid size={32} className="text-indigo-600 dark:text-indigo-400" />
                </div>
            </div>

            {/* تفاصيل التصنيف */}
            <div className="mt-4 px-2">
                <h3 className="text-base font-black text-slate-700 dark:text-slate-200 truncate group-hover:text-indigo-600 transition-colors text-center">
                    {category.name}
                </h3>
            </div>

            {/* أزرار التحكم - تظهر بشكل لطيف في الأسفل */}
            <div className="mt-4 flex items-center gap-2">
                <button
                    onClick={() => onEdit(category)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold"
                >
                    <Edit2 size={14} />
                    تعديل
                </button>
                <button
                    onClick={() => onDelete(category)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default AdminCardCategory;