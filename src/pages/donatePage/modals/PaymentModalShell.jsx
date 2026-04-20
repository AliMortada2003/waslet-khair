import React from "react";
import { X } from "lucide-react";

const PaymentModalShell = ({
    isOpen,
    onClose,
    title,
    subtitle,
    logo,
    children,
    maxWidth = "max-w-2xl",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" dir="rtl">
            <div
                className={`w-full ${maxWidth} rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-y-scroll h-auto animate-in fade-in zoom-in-95 duration-300`}
            >
                <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-4 min-w-0">
                        {logo ? (
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0">
                                <img
                                    src={logo}
                                    alt={title}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                        ) : null}

                        <div className="min-w-0">
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                                {title}
                            </h2>
                            {subtitle ? (
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                                    {subtitle}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 md:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PaymentModalShell;