import React, { useEffect, useState } from "react";
import { Sun, Moon, LayoutGrid, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import MobileMenuButton from "./MobileMenuButton";
import UserMenu from "./UserMenu";
import NotificationMenu from "./NotificationMenu";
import { useUser } from "../../hocks/useAuthHocks";

const Topbar = ({ onMenuClick, roleLabel }) => {
    const { isDark, toggleTheme } = useTheme();
    const { data: authData } = useUser();

    const [isOnline, setIsOnline] = useState(
        typeof navigator !== "undefined" ? navigator.onLine : true
    );

    const user = authData?.user;
    const userRole = authData?.userRole?.toLowerCase();
    const label = user?.firstName || "مستخدم";

    const profilePath = userRole === "superadmin" ? "/supermanager/profile" : userRole === "admin" ? "/admin/profile" : "/donor/profile";

    const dashboardLabel = roleLabel || (userRole === "superadmin" ? "لوحة تحكم المدير العام" : userRole === "donor" ? "لوحة تحكم المتبرع" : "لوحة تحكم الإدارة");

    const notificationPath = userRole === "superadmin" ? "/supermanager/notifications" : userRole === "admin" ? "/admin/notifications" : "/donor/notifications";

    useEffect(() => {
        const handleStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener("online", handleStatus);
        window.addEventListener("offline", handleStatus);

        return () => {
            window.removeEventListener("online", handleStatus);
            window.removeEventListener("offline", handleStatus);
        };
    }, []);

    return (
        <header
            className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/75 backdrop-blur-xl shadow-sm dark:border-white/[0.05] dark:bg-[#0b1120]/80"
            dir="rtl"
        >
            <div className="flex items-center gap-3 px-4 py-3 md:px-8">
                <MobileMenuButton onClick={onMenuClick} isDark={isDark} />

                <div className="flex flex-1 items-center gap-3 min-w-0">
                    <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 transition-all hover:bg-indigo-500/20">
                        <LayoutGrid
                            size={22}
                            className="text-indigo-600 transition-transform hover:rotate-12 dark:text-indigo-400"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 min-w-0">
                            <h1 className="truncate text-lg md:text-[22px] font-black tracking-tight text-slate-900 dark:text-white">
                                أهلاً،
                                <span className="mr-1 bg-gradient-to-l from-indigo-600 to-orange-500 bg-clip-text text-transparent">
                                    {label}
                                </span>
                            </h1>

                            <span
                                className={`h-2.5 w-2.5 shrink-0 rounded-full animate-pulse ${isOnline
                                    ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.45)]"
                                    : "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.45)]"
                                    }`}
                            />
                        </div>

                        <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold tracking-widest text-slate-400">
                            <Sparkles size={10} className="text-orange-400" />
                            {dashboardLabel}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <button
                        onClick={toggleTheme}
                        className="rounded-2xl border border-slate-200 bg-slate-100 p-2.5 text-slate-500 transition-all hover:border-indigo-200 hover:text-indigo-600 active:scale-90 dark:border-white/10 dark:bg-white/5 dark:text-yellow-400 dark:hover:bg-indigo-500/10 dark:hover:text-yellow-300"
                    >
                        {isDark ? (
                            <Sun size={20} strokeWidth={2.2} />
                        ) : (
                            <Moon size={20} strokeWidth={2.2} />
                        )}
                    </button>

                    <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />

                    <div className="relative flex items-center gap-2">
                        <NotificationMenu
                            goTo={notificationPath}
                        />
                        <UserMenu
                            user={user}
                            isOnline={isOnline}
                            goTo={profilePath}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;