import React from "react";
import { motion } from "framer-motion";

const AuthSidebar = ({ title, description, badgeText }) => {
    return (
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden group">
            {/* 1. الصورة الخلفية الكاملة */}
            <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                src="/images/Hero_background.avif"
                alt="Waslet Khair Community"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* 2. الـ Overlay المظلم */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-indigo-950/90 backdrop-blur-[1px]"></div>

            {/* 3. المحتوى المتغير */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4"
                >
                    {badgeText && (
                        <span className="text-sm font-black text-orange-400 uppercase tracking-widest bg-orange-500/10 px-4 py-1 rounded-full">
                            {badgeText}
                        </span>
                    )}

                    <h2 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
                        {title}
                    </h2>

                    <p className="text-lg text-slate-200 max-w-md mx-auto font-medium leading-relaxed">
                        {description}
                    </p>

                    {/* سهم جمالي */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="pt-6"
                    >
                        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-orange-500 to-transparent mx-auto" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthSidebar;