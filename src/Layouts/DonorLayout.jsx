import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
    Search,
    Heart,
    History,
    CircleUser,
    HomeIcon,
    LayoutDashboard,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/sidepar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

const donorItems = [
    { to: "/donor", icon: LayoutDashboard, label: "لوحة التحكم", end: true },
    { to: "/donor/profile", icon: CircleUser, label: "حسابي الشخصي" },
    { to: "/donor/explore", icon: Search, label: "استكشاف الحالات" },
    { to: "/donor/my-donations", icon: History, label: "سجل تبرعاتي" },
    { to: "/donor/favorites", icon: Heart, label: "الحالات المفضلة" },
    { to: "/", icon: HomeIcon, label: "العودة للرئيسية" },
];

const DonorLayout = () => {
    const { isDark } = useTheme();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOnline, setIsOnline] = useState(
        typeof navigator !== "undefined" ? navigator.onLine : true
    );

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
        <div
            className="flex min-h-screen bg-slate-50 transition-colors duration-500 dark:bg-[#0b1120]"
            dir="rtl"
        >
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                collapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
                navItems={donorItems}
                activeClassName="bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                hoverClassName="hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600"
            />

            <div
                className={`flex min-w-0 flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? "lg:mr-20" : "lg:mr-72"
                    } mr-0`}
            >
                <Topbar
                    onMenuClick={() => setIsSidebarOpen(true)}
                    roleLabel="لوحة تحكم المتبرع"
                />

                <main className="relative flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="pointer-events-none absolute left-0 top-0 h-80 w-full bg-gradient-to-b from-orange-50/50 via-transparent to-transparent dark:from-orange-500/5" />
                    <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />

                    <div className="relative z-10 mx-auto w-full">
                        <Outlet />
                    </div>
                </main>

                <footer
                    className="mt-auto border-t px-4 py-4 md:px-6 transition-all
                            dark:border-white/5 dark:bg-slate-900/80 dark:text-slate-50 border-slate-100 bg-white text-slate-500"
                >
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="order-2 flex items-center gap-4 md:order-1">
                            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                                <div
                                    className={`h-2 w-2 rounded-full animate-pulse ${isOnline
                                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.55)]"
                                        : "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.55)]"
                                        }`}
                                />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {isOnline ? "Connected" : "Offline Mode"}
                                </span>
                            </div>
                        </div>

                        <div className="order-1 text-center md:order-2">
                            <p className="text-[10px] font-bold italic text-slate-400">
                                "خيرُ الناسِ أنفعُهم للناس"
                            </p>
                        </div>

                        <div className="order-3 text-center md:text-left">
                            <p className="text-[10px] font-bold">
                                Waslet Khair
                                <span className="mx-1 text-orange-500">✨</span>
                                <span className="font-black uppercase tracking-tighter text-indigo-600 dark:text-indigo-400">
                                    Donor Portal
                                </span>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default DonorLayout;