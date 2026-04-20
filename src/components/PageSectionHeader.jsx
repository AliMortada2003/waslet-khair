import React from "react";
import { motion } from "framer-motion";

const PageSectionHeader = ({
    icon: Icon,
    badgeText,
    title,
    highlightTitle,
    description,
    center = true
}) => {
    return (
        <div className={`${center ? "text-center" : "text-right"} mb-16 space-y-5 relative`}>

            {/* 1. البادج العلوي (The Badge) */}
            {badgeText && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest shadow-sm backdrop-blur-sm"
                >
                    {Icon && <Icon size={16} className="text-orange-500" />}
                    <span>{badgeText}</span>
                </motion.div>
            )}

            {/* 2. العنوان الرئيسي (The Title) */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-orange-500 dark:text-white leading-tight"
            >
                {title} <span className="relative inline-block">
                    <span className="relative z-10 text-indigo-800">
                        {highlightTitle}
                    </span>
                    {/* لمسة فنية: خط خلفي تحت الكلمة المميزة */}
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-500/10 -z-10 rounded-lg"></span>
                </span>
            </motion.h2>

            {/* 3. الوصف (The Description) */}
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`text-slate-500 dark:text-slate-400 text-sm font-medium max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}
                >
                    {description}
                </motion.p>
            )}

            {/* 4. الخط الديكوري (The Divider) */}
            {center && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "40px" }}
                        className="h-1 bg-indigo-600/20 rounded-full"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-orange-500"
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "40px" }}
                        className="h-1 bg-indigo-600/20 rounded-full"
                    />
                </div>
            )}
        </div>
    );
};

export default PageSectionHeader;