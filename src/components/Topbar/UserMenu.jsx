import React, { useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hocks/useAuthHocks";

const UserMenu = ({ isOnline, goTo, user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userRef = useRef(null);
    const { logout } = useLogout();

    const image = user?.imageUrl || "/images/user.webp";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        logout();
    };

    return (
        <div className="relative" ref={userRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-100 dark:hover:bg-white/10 transition-all active:scale-95"
            >
                <div className="relative h-10 w-10 rounded-full bg-white/20 border border-slate-200 dark:border-white/20 overflow-hidden shadow-inner flex items-center justify-center text-white font-bold">
                    <img src={image} alt="profile" className="w-full h-full object-cover" />
                    <div
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#0b1120] ${isOnline ? "bg-emerald-500" : "bg-red-500"
                            }`}
                    />
                </div>

                <ChevronDown
                    size={16}
                    className={`text-slate-600 dark:text-white transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute left-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-1 text-center">
                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-tight">
                            رقم الهاتف
                        </p>
                        <p className="text-xs font-bold text-slate-700 dark:text-white truncate">
                            {user?.phoneNumber || "غير متوفر"}
                        </p>

                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-tight mt-2">
                            الاسم
                        </p>
                        <p className="text-xs font-bold text-slate-700 dark:text-white truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                    </div>

                    <Link
                        onClick={() => setIsDropdownOpen(false)}
                        to={goTo}
                        className="w-full flex items-center justify-end gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <span>إعدادات الملف</span>
                        <User2 size={16} />
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogoutClick}
                        className="w-full flex items-center justify-end gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-slate-50 dark:border-white/5 mt-1"
                    >
                        <span className="font-bold">تسجيل الخروج</span>
                        <LogOut size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;