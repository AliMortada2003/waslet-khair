import React from "react";
import { LayoutGrid } from "lucide-react";

const SuperAdminCardCategory = ({ category, onView }) => {
    console.log(category)
    return (
        <div
            onClick={onView}
            className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl cursor-pointer hover:shadow-indigo-500/10 transition-all duration-500 p-4">
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
        </div>
    );
};

export default SuperAdminCardCategory;