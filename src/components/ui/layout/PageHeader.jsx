import React from 'react';

const PageHeader = ({
    title,
    subtitle,
    actions,
    breadcrumb,
    dark = false,
    center
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative">
            
            <div className="space-y-1 text-right">
                {/* Breadcrumb - خفيف وبسيط */}
                {breadcrumb && (
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">
                        {breadcrumb}
                    </div>
                )}

                {/* العنوان - تم استبدال الـ Cyan بالـ Indigo البراند بتاعنا */}
                <h1 className="text-3xl md:text-4xl font-black text-indigo-600  dark:text-slate-50   tracking-tight">
                    {title}
                </h1>

                {/* العنوان الفرعي - تحسين الألوان والتباين */}
                {subtitle && (
                    <p className={`text-sm md:text-base font-bold leading-relaxed ${
                        dark ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                    }`}>
                        {subtitle}
                    </p>
                )}
            </div>

            {/* الأزرار أو الأكشنز (زي زر الإضافة) */}
            {actions && (
                <div className="flex items-center gap-3 shrink-0">
                    {actions}
                </div>
            )}
            
            {/* لمسة "وصلة خير" - خط برتقالي خفيف تحت الهيدر */}
            <div className="absolute -bottom-4 right-0 w-16 h-1.5 bg-gradient-to-l from-orange-500 to-transparent rounded-full opacity-60" />
        </div>
    );
};

export default PageHeader;