import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Sparkles } from "lucide-react";

const AuthHeader = ({ badge, title, highlight, subtitle }) => {
    return (
        <div className="mb-10 text-center lg:text-right relative">
            {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl rounded-full -z-10" />

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4 justify-center lg:justify-start">
                {/* Main Icon */}
                <motion.div
                    initial={{ rotate: -10, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="relative mx-auto lg:mx-0"
                >
                    <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20 rotate-3">
                        <HeartPulse className="text-white" size={28} />
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -left-2 bg-orange-500 p-1.5 rounded-lg shadow-lg text-white"
                    >
                        <Sparkles size={12} />
                    </motion.div>
                </motion.div>

                {/* Title & Badge */}
                <div className="flex flex-col items-center lg:items-start">
                    <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.2em] bg-orange-500/10 px-3 py-1 rounded-full mb-1">
                        {badge}
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                        {title} <span className="text-indigo-600 dark:text-indigo-400">{highlight}</span>
                    </h1>
                </div>
            </div>

            <div className="relative">
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                    {subtitle}
                </p>
                <div className="h-1 w-12 bg-orange-500 rounded-full mt-3 mx-auto lg:mr-0 lg:ml-auto" />
            </div>
        </div>
    );
};

export default AuthHeader;