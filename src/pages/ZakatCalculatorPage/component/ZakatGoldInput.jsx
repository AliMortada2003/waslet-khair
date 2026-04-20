import React from "react";

const ZakatGoldInput = ({ label, onWeightChange, onPriceChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label} (بالجرام)
                </label>
                <input
                    type="number"
                    min="0"
                    onChange={(e) => onWeightChange(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                    placeholder="الوزن"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    سعر جرام {label} اليوم
                </label>
                <input
                    type="number"
                    min="0"
                    onChange={(e) => onPriceChange(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500 dark:text-white transition-all"
                    placeholder="السعر بالجنيه"
                />
            </div>
        </div>
    );
};

export default ZakatGoldInput;