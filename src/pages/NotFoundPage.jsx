import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center p-6 space-y-8 overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-slate-950">

            {/* القسم البصري (404 مع الهوية الجديدة) */}
            <div className="relative flex items-center justify-center">
                {/* النيون الخلفي (Indigo Glow) */}
                <div className="absolute inset-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />

                <div className="relative z-10 flex flex-col items-center">
                    {/* رقم الـ 404 بستايل Indigo & Orange */}
                    <div className="flex items-end gap-1">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[140px] font-black leading-none text-indigo-600 dark:text-indigo-500"
                        >
                            4
                        </motion.span>

                        {/* أيقونة القلب النابض بدلاً من الصفر - تعبيراً عن "وصلة" الخير */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-24 h-24 rounded-3xl bg-orange-500 flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/40 rotate-12"
                        >
                            <Heart size={50} className="text-white fill-current" />
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[140px] font-black leading-none text-indigo-600 dark:text-indigo-500"
                        >
                            4
                        </motion.span>
                    </div>

                    {/* خط ديكوري متدرج */}
                    <div className="w-40 h-2 bg-gradient-to-r from-indigo-600 to-orange-500 rounded-full mt-[-10px]" />
                </div>
            </div>

            {/* القسم النصي */}
            <div className="text-center space-y-4 max-w-lg z-10" dir="rtl">
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white transition-colors">
                    عفواً.. هذه الوصلة مفقودة!
                </h1>

                <p className="text-base md:text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400 transition-colors px-4">
                    يبدو أنك سلكت طريقاً غير موجود، لكن لا بأس.. رحلة الخير لا تتوقف هنا، يمكنك دائماً العودة والبدء من جديد.
                </p>
            </div>

            {/* زر العودة بستايل Indigo & Orange Hover */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-3 px-10 py-4 bg-[#400068] text-white rounded-2xl font-black text-lg transition-all 
                           shadow-xl shadow-indigo-600/20 hover:bg-[#2d004a] hover:shadow-indigo-600/30 z-10 group"
            >
                <Home size={22} className="group-hover:-translate-y-1 transition-transform" />
                العودة للرئيسية
            </motion.button>

            {/* شعار "وصلة خير" خفي في الخلفية */}
            <div className="absolute bottom-6 font-black text-[10px] tracking-[0.4em] opacity-20 dark:opacity-10 text-slate-900 dark:text-white uppercase">
                Waslet Khair | Giving is a Connection
            </div>
        </div>
    );
};

export default NotFoundPage;