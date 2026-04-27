import React from "react";
import { X } from "lucide-react";

const ModalHeader = ({
    title,
    subtitle,
    icon: Icon,
    onClose,
    variant = "indigo",
}) => {
    const themes = {
        indigo: {
            icon: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
            glow: "bg-indigo-500",
            line: "from-indigo-500",
        },
        orange: {
            icon: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
            glow: "bg-orange-500",
            line: "from-orange-500",
        },
        rose: {
            icon: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
            glow: "bg-rose-500",
            line: "from-rose-500",
        },
        emerald: {
            icon: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
            glow: "bg-emerald-500",
            line: "from-emerald-500",
        },
    };

    const theme = themes[variant] || themes.indigo;

    return (
        <div className="relative overflow-hidden border-b border-slate-100 dark:border-white/10 bg-white/90 dark:bg-slate-900/95">
            <div
                className={`absolute -top-16 -right-16 w-44 h-44 rounded-full ${theme.glow} opacity-10 blur-3xl pointer-events-none`}
            />

            <div className="relative z-10 p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    {Icon && (
                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${theme.icon}`}
                        >
                            <Icon size={26} strokeWidth={2.5} />
                        </div>
                    )}

                    <div className="min-w-0">
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                            {title}
                        </h2>

                        {subtitle && (
                            <p className="mt-1 text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 truncate">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 dark:bg-white/5 dark:hover:bg-rose-500/10 transition-all active:scale-95 shrink-0"
                >
                    <X size={22} />
                </button>
            </div>

            <div
                className={`h-1 w-full bg-gradient-to-l ${theme.line} via-transparent to-transparent opacity-70`}
            />
        </div>
    );
};

export default ModalHeader;