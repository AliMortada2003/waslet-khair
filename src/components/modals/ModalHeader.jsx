import React from 'react';
import { X } from 'lucide-react';

const ModalHeader = ({
    title,
    subtitle,
    icon: Icon,
    onClose,
    variant = 'indigo' // 'indigo', 'orange', 'rose'
}) => {
    // تحديد الألوان بناءً على الـ variant
    const themes = {
        indigo: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
        orange: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
        rose: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
    };

    return (
        <div className="relative p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-amber-100 dark:bg-white/[0.01]">
            {/* الخلفية الملونة الخفيفة (اختياري لمسة جمالية) */}
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl pointer-events-none -mr-16 -mt-16 rounded-full ${variant === 'indigo' ? 'bg-indigo-500' : 'bg-orange-500'}`} />

            <div className="flex items-center gap-4 relative z-10">
                {/* الأيقونة بحاوية أنيقة */}
                {Icon && (
                    <div className={`p-3.5 rounded-[1.25rem] shadow-sm transition-transform duration-500 group-hover:rotate-12 ${themes[variant]}`}>
                        <Icon size={26} strokeWidth={2.5} />
                    </div>
                )}

                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* زر الإغلاق بتصميم تفاعلي */}
            <button
                onClick={onClose}
                className="group p-2.5 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10 transition-all duration-300"
            >
                <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
        </div>
    );
};

export default ModalHeader;