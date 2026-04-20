import React from "react";

const ZakatResultRow = ({ label, value }) => {
    return (
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="text-sm font-medium">{label}:</span>
            <span className="font-bold text-slate-900 dark:text-slate-200">
                {value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                })}{" "}
                ج.م
            </span>
        </div>
    );
};

export default ZakatResultRow;