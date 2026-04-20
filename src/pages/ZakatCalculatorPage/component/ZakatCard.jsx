import React from "react";

const ZakatCard = ({ title, icon, children }) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-6 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            {children}
        </div>
    );
};

export default ZakatCard;