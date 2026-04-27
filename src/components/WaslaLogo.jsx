import React from 'react';
import { NavLink } from 'react-router-dom';

const WaslaLogo = ({footer}) => {
    return (
        <NavLink
            to="/"
            className="relative flex items-center gap-3 group px-3 py-2 rounded-2xl transition-all duration-500"
            dir="rtl"
        >
            {/* Glow خفيف */}
            {/* <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 rounded-2xl blur-xl transition-all duration-500 -z-10"></div> */}

            {/* Logo Image */}
            <div className="relative w-15 h-15 transition-all duration-500 ease-out
                            group-hover:scale-110 group-hover:rotate-[4deg]">

                <img
                    src="/images/logo22.png"
                    alt="Waslet Khair"
                    className="
                        w-full h-full object-contain
                        transition-all duration-500
                        drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]
                        group-hover:drop-shadow-[0_8px_20px_rgba(99,102,241,0.35)]
                    "
                />

                {/* Pulse خفيف على القلب */}
                {/* <div className="absolute inset-0 rounded-full bg-orange-400/10 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div> */}
            </div>

            {/* Text */}
            <div className="flex flex-col items-start text-right leading-none">

                <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">
                    وصــلــة <span className="text-indigo-600 group-hover:text-orange-500 transition-colors duration-500">خــيـر</span>
                </span>

                <span className="text-[10px] font-extrabold text-indigo-900 dark:text-indigo-300 uppercase tracking-[0.2em] opacity-80">
                    Waslet Khair
                </span>
            </div>
        </NavLink>
    );
};

export default WaslaLogo;