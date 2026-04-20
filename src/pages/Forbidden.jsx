import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, MoveRight, Lock, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotAllowedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center p-6 space-y-8 overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-slate-950">

            {/* القسم البصري (403 مع الهوية) */}
            <div className="relative flex items-center justify-center">
                {/* النيون الخلفي (Orange Glow هذه المرة للتحذير) */}
                <div className="absolute inset-0 w-80 h-80 bg-orange-500/10 dark:bg-orange-600/20 rounded-full blur-[100px] animate-pulse" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex items-end gap-1">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[140px] font-black leading-none text-indigo-600 dark:text-indigo-500"
                        >
                            4
                        </motion.span>

                        {/* أيقونة القفل المتحركة داخل مربع برتقالي */}
                        <motion.div
                            initial={{ rotate: -10 }}
                            animate={{ rotate: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-24 h-24 rounded-[2.5rem] bg-orange-500 flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/40"
                        >
                            <Lock size={50} className="text-white fill-current" />
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[140px] font-black leading-none text-indigo-600 dark:text-indigo-500"
                        >
                            3
                        </motion.span>
                    </div>

                    {/* خط ديكوري متدرج يعكس الهوية */}
                    <div className="w-48 h-2 bg-gradient-to-r from-orange-500 via-indigo-600 to-orange-500 rounded-full mt-[-10px]" />
                </div>
            </div>

            {/* القسم النصي */}
            <div className="text-center space-y-4 max-w-lg z-10" dir="rtl">
                <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-500 mb-2">
                    <ShieldAlert size={24} />
                    <span className="font-black tracking-[0.2em] uppercase text-sm">Access Denied</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white transition-colors">
                    منطقة محظورة!
                </h1>

                <p className="text-base md:text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400 transition-colors px-4">
                    نعتذر منك، ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة. يرجى التواصل مع الإدارة إذا كنت تعتقد أن هذا خطأ.
                </p>
            </div>

            {/* أزرار التحكم */}
            <div className="flex flex-col md:flex-row gap-4 z-10">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)} // العودة للخلف
                    className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-white border-2 border-slate-200 dark:border-white/10 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-50 transition-all"
                >
                    العودة للخلف
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 px-10 py-4 bg-[#400068] text-white rounded-2xl font-black text-lg transition-all 
                               shadow-xl shadow-indigo-600/20 hover:bg-[#2d004a] hover:shadow-indigo-600/30 group"
                >
                    <Home size={22} className="group-hover:-translate-y-1 transition-transform" />
                    الرئيسية
                </motion.button>
            </div>

            {/* شعار "وصلة خير" في الخلفية */}
            <div className="absolute bottom-6 font-black text-[10px] tracking-[0.4em] opacity-20 dark:opacity-10 text-slate-900 dark:text-white uppercase">
                Waslet Khair | Security & Integrity
            </div>
        </div>
    );
};

export default NotAllowedPage;