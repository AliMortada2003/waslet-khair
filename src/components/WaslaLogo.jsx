import React from 'react';
import { NavLink } from 'react-router-dom';

const WaslaLogo = () => {
    return (
        <NavLink
            to="/"
            className="relative flex items-center gap-4 group focus:outline-none px-4 py-2 rounded-2xl transition-all duration-500"
            dir="rtl"
        >
            {/* تأثير خلفية البلور عند الهوفر (Indigo Blur) */}
            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 dark:group-hover:bg-indigo-400/10 rounded-2xl transition-all duration-500 blur-xl -z-10"></div>
            
            {/* الأيقونة مع تأثير الروتيت المطور */}
            <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-500 ease-out group-hover:rotate-[20deg] group-hover:scale-110">
                {/* الدائرة الإنديجو */}
                <div className="absolute w-8 h-8 rounded-full border-4 border-indigo-600 dark:border-indigo-400 translate-x-3 translate-y-1 opacity-90 shadow-sm transition-transform duration-500 group-hover:translate-x-4"></div>
                {/* الدائرة البرتقالية */}
                <div className="absolute w-8 h-8 rounded-full border-4 border-orange-500 translate-y-3 opacity-90 shadow-sm transition-transform duration-500 group-hover:translate-y-4"></div>
            </div>

            {/* النصوص: عربي وتحته إنجليزي */}
            <div className="flex flex-col items-start text-right leading-none transition-transform duration-500 group-hover:translate-x-[-2px]">
                {/* الاسم بالعربي مع تأثير تغيير اللون البسيط */}
                <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-white transition-colors duration-300">
                    وصــلــة <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-orange-500 transition-colors duration-500">خــيـر</span>
                </span>

                {/* الاسم بالإنجليزي */}
                <span className="text-[11px] font-extrabold text-indigo-900 dark:text-indigo-300 uppercase tracking-[0.2em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    Waslet Khair
                </span>
            </div>
        </NavLink>
    );
};

export default WaslaLogo;