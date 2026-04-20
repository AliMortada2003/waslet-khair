import React from "react";

const ZakatInputGroup = ({ label, onChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                </label>
                <input
                    type="number"
                    min="0"
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                    placeholder="0.00"
                />
            </div>

            <div className="md:col-span-1 text-orange-600 dark:text-orange-400 font-bold text-sm pb-3">
                جنيه مصري
            </div>
        </div>
    );
};

export default ZakatInputGroup;