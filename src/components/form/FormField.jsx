import React from 'react';
import { useField } from 'formik';
import { motion } from 'framer-motion';

const FormField = ({ label, icon: Icon, ...props }) => {
    // useField يربط المدخل بـ Formik تلقائياً بناءً على الـ name
    const [field, meta] = useField(props);

    const hasError = meta.touched && meta.error;

    return (
        <div className="space-y-2 w-full">
            {label && (
                <label className="text-sm mb-1 font-bold text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
                    {label}
                    {props.required && <span className="text-orange-500">*</span>}
                </label>
            )}
            
            <div className="relative group">
                {/* Icon Section */}
                {Icon && (
                    <Icon
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 
                        ${hasError ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400'}`}
                        size={18}
                    />
                )}

                {/* Input Field */}
                <input
                    {...field}
                    {...props}
                    className={`w-full bg-slate-100/50 dark:bg-slate-800/50 border rounded-2xl py-3 pr-12 pl-4
                    text-slate-900 dark:text-white outline-none transition-all duration-300 font-medium
                    ${hasError
                            ? 'border-rose-500/50 focus:border-rose-500 shadow-sm shadow-rose-500/10'
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 shadow-sm focus:shadow-indigo-500/10'
                        }`}
                />

                {/* Subtle Focus Ring for Indigo feel */}
                <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 
                    ${!hasError ? 'group-focus-within:ring-2 ring-indigo-500/20 opacity-100' : 'opacity-0'}`} 
                />
            </div>

            {/* Error Message */}
            {hasError && (
                <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-[11px] font-bold mr-2 flex items-center gap-1"
                >
                    <span className="w-1 h-1 rounded-full bg-rose-500" />
                    {meta.error}
                </motion.p>
            )}
        </div>
    );
};

export default FormField;