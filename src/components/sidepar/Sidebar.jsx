import React from "react";
import { NavLink } from "react-router-dom";
import {
    X,
    PanelRightClose,
    PanelRightOpen,
    LogOut,
    ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLogout } from "../../hocks/useAuthHocks";
import WaslaLogo from "../WaslaLogo";

const Sidebar = ({
    isOpen,
    onClose,
    collapsed,
    onToggleCollapse,
    navItems = [],
}) => {
    const { isDark } = useTheme();
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
        onClose?.();
    };

    return (
        <>
            {/* Overlay للموبايل */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    width: collapsed ? 80 : 288,
                }}
                transition={{
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                    fixed inset-y-0 right-0 flex flex-col
                    border-l z-40 overflow-hidden
                    transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0
                    ${isDark
                        ? "bg-slate-950 border-white/10 text-slate-300"
                        : "bg-white border-slate-200 text-slate-700"}
                `}
                dir="rtl"
            >
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-white/10 py-5 px-4 relative">
                    <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
                        <NavLink
                            to="/admin"
                            className={`flex items-center shrink-0 ${collapsed ? "gap-0" : "gap-3"}`}
                        >
                            <AnimatePresence mode="wait">
                                {!collapsed && (
                                    <motion.div
                                        key="logo-expanded"
                                        initial={{ opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 8 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <WaslaLogo />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </NavLink>

                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 8 }}
                                transition={{ duration: 0.18 }}
                                className="flex items-center gap-2"
                            >
                                <button
                                    onClick={onToggleCollapse}
                                    className="hidden lg:flex p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors active:scale-95"
                                    title="طي القائمة"
                                    type="button"
                                >
                                    <PanelRightClose size={18} />
                                </button>

                                <button
                                    onClick={onClose}
                                    className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors active:scale-95"
                                    type="button"
                                >
                                    <X size={20} strokeWidth={2.5} />
                                </button>
                            </motion.div>
                        )}

                        {collapsed && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={onToggleCollapse}
                                className="hidden lg:flex absolute top-5 left-1/2 -translate-x-1/2 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors active:scale-95"
                                title="توسيع القائمة"
                                type="button"
                            >
                                <PanelRightOpen size={18} />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Nav */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
                    <nav className="flex-1 flex flex-col h-full">
                        <div className="space-y-1">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.end}
                                        title={collapsed ? item.label : ""}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) onClose?.();
                                        }}
                                        className={({ isActive }) => `
                                            group flex items-center gap-3 rounded-2xl px-3 py-3
                                            transition-colors duration-200
                                            ${collapsed ? "justify-center" : "justify-between"}
                                            ${isActive
                                                ? isDark
                                                    ? "bg-indigo-500/10 text-indigo-400"
                                                    : "bg-indigo-600 text-white"
                                                : isDark
                                                    ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <motion.span
                                                layout
                                                transition={{ duration: 0.22 }}
                                                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                                                    collapsed ? "bg-transparent" : "bg-slate-500/5"
                                                }`}
                                            >
                                                {Icon && <Icon size={20} />}
                                            </motion.span>

                                            <AnimatePresence>
                                                {!collapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 10 }}
                                                        transition={{ duration: 0.16, delay: index * 0.015 }}
                                                        className="text-sm font-bold truncate"
                                                    >
                                                        {item.label}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </NavLink>
                                );
                            })}
                        </div>

                        {/* Logout */}
                        <div className="mt-auto pt-4">
                            <div className="mb-4 border-t border-dashed border-slate-200 dark:border-white/10 opacity-50" />
                            <button
                                onClick={handleLogout}
                                title={collapsed ? "تسجيل الخروج" : ""}
                                type="button"
                                className={`
                                    group flex w-full items-center gap-3 rounded-2xl px-3 py-3
                                    text-rose-500 transition-colors active:scale-95
                                    hover:bg-rose-50 dark:hover:bg-rose-500/10
                                    ${collapsed ? "justify-center" : "justify-start"}
                                `}
                            >
                                <div
                                    className={`
                                        flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                                        ${collapsed ? "bg-transparent" : "bg-rose-500/5 group-hover:bg-rose-500/20"}
                                    `}
                                >
                                    <LogOut size={20} />
                                </div>

                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ duration: 0.16 }}
                                            className="text-sm font-black tracking-tight"
                                        >
                                            تسجيل الخروج
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 dark:border-white/10 px-3 py-3">
                    <AnimatePresence mode="wait">
                        {collapsed ? (
                            <motion.div
                                key="footer-collapsed"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.16 }}
                                className="py-6 flex flex-col items-center gap-4"
                            >
                                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                <span className="text-[9px] font-black text-slate-400 tracking-tighter origin-center -rotate-90">
                                    V1.0
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="footer-expanded"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.18 }}
                                className={isDark ? "text-slate-400" : "text-slate-500"}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-1">
                                            <ShieldCheck
                                                size={10}
                                                className="text-indigo-600 dark:text-indigo-400 opacity-80"
                                            />
                                            <p className="text-[9px] font-black tracking-[0.1em] uppercase text-slate-600 dark:text-slate-300">
                                                منصة الخير الآمنة
                                            </p>
                                        </div>

                                        <p className="text-[8px] font-bold text-slate-400/60 mr-4">
                                            الإصدار المستقر 1.0.0
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-white/5 shadow-sm">
                                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                        <span className="text-[9px] text-orange-600 dark:text-orange-400 font-black tracking-tight">
                                            LIVE
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/5 flex flex-col items-center gap-1">
                                    <p className="text-[7px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                        Powered by
                                    </p>
                                    <p className="text-[8px] font-black text-indigo-600/60 dark:text-indigo-400/40 tracking-widest uppercase">
                                        ALI MORTADA
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;