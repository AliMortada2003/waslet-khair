import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/sidepar/Sidebar";
import {
    LayoutDashboard,
    Building2,
    HeartHandshake,
    Users2,
    HandHeart,
    Tags,
    History,
    BellRing,
    UserCircle,
    HomeIcon
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const SuperAdminLayout = () => {
    const { isDark } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", handleStatus);
        window.addEventListener("offline", handleStatus);
        return () => {
            window.removeEventListener("online", handleStatus);
            window.removeEventListener("offline", handleStatus);
        };
    }, []);

    // القائمة الجانبية بهوية (Indigo + Orange)
    const superAdminNavItems = [
        { to: "/supermanager", icon: LayoutDashboard, label: "لوحة التحكم", end: true },
        { to: "/supermanager/charity", icon: Building2, label: "الجمعيات الخيرية" },
        { to: "/supermanager/cases", icon: HeartHandshake, label: "الحالات" },
        { to: "/supermanager/users", icon: Users2, label: "إدارة المستخدمين" },
        { to: "/supermanager/donors", icon: HandHeart, label: "إدارة المتبرعين" },
        { to: "/supermanager/categories", icon: Tags, label: "فئات التبرعات" },
        { to: "/supermanager/notifications", icon: BellRing, label: "الإشعارات" },
        { to: "/supermanager/profile", icon: UserCircle, label: "الملف الشخصي" },
        { to: "/", icon: HomeIcon, label: "العودة للرئيسية" },
    ];


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex transition-colors duration-500" dir="rtl">

            {/* 1. القائمة الجانبية - بنمرر الهوية للـ Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                collapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                navItems={superAdminNavItems}
                // تأكد أن الـ Sidebar عندك بيستخدم هذه الألوان في الـ Active State
                activeClassName="bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
                hoverClassName="hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600"
            />

            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out 
                ${isCollapsed ? "lg:mr-20" : "lg:mr-72"} mr-0 overflow-hidden`}>
                {/* 2. التوب بار - بلمسات Indigo */}
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

                {/* المحتوى المتغير - هنا بنضيف خلفية خفيفة جداً تعكس الهوية */}
                <main className="p-4 md:p-8 flex-1 overflow-y-auto relative">
                    {/* لمسة فنية خلفية (Background Glow) */}
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-500/5 pointer-events-none" />

                    <div className=" mx-auto w-full relative ">
                        <Outlet />
                    </div>
                </main>

                {/* 3. الفوتر - دمج الـ Indigo مع الـ Orange في الحالة */}
                <footer className={`mt-auto px-6 py-4 border-t transition-all 
                    ${isDark ? "bg-slate-900/80 border-white/5 text-slate-400" : "bg-white border-slate-100 text-slate-500"}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">

                        {/* حالة الاتصال - Orange للـ Offline و Indigo/Emerald للـ Online */}
                        <div className="flex items-center gap-4 order-2 md:order-1">
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <div className={`h-2 w-2 rounded-full animate-pulse ${isOnline ? "bg-indigo-500 shadow-[0_0_8px_#6366f1]" : "bg-orange-500 shadow-[0_0_8px_#f97316]"}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {isOnline ? "System Active" : "Connection Lost"}
                                </span>
                            </div>
                            <span className="text-[10px] opacity-30">|</span>
                            <p className="text-[10px] font-bold text-indigo-600/70 dark:text-indigo-400/70">V 1.0.0</p>
                        </div>

                        {/* حقوق التطوير - استخدام الـ Indigo */}
                        <div className="text-center md:text-left order-1 md:order-2">
                            <p className="text-[10px] font-bold">
                                Crafted with <span className="text-orange-500">❤️</span> by
                                <span className="text-indigo-600 dark:text-indigo-400 font-black mr-1">Ali Mortada</span> © {new Date().getFullYear()}
                            </p>
                        </div>

                    </div>
                </footer>
            </div>

            {/* ستايل إضافي للـ Scrollbar ليتماشى مع الهوية */}
            <style jsx global>{`
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { 
                    background: ${isDark ? '#1e293b' : '#e2e8f0'}; 
                    border-radius: 10px; 
                }
                ::-webkit-scrollbar-thumb:hover { 
                    background: #6366f1; 
                }
            `}</style>
        </div>
    );
};

export default SuperAdminLayout;