import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  User,
  LogOut,
  Calculator,
  Home,
  HeartHandshake,
  Building2,
  Shapes,
  UserPlus,
  Info,
  Lightbulb,
  UserCircle,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useLogout, useUser } from "../../hocks/useAuthHocks";
import WaslaLogo from "../WaslaLogo";
import UserMenu from "../Topbar/UserMenu";
import NotificationMenu from "../Topbar/NotificationMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const { data: authData } = useUser();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const user = authData?.user;
  const isAuthenticated = authData?.isAuthenticated;
  const userRole = authData?.userRole?.toLowerCase();

  const profilePath = userRole === "superadmin" ? "/supermanager" : userRole === "admin" ? "/admin" : "/donor";

  const notificationPath = userRole === "superadmin" ? "/supermanager/notifications" : userRole === "admin" ? "/admin/notifications" : "/donor/notifications";

  const navLinks = [
    { name: "الرئيسية", to: "/", icon: <Home size={16} /> },
    { name: "الحالات", to: "/cases", icon: <HeartHandshake size={16} /> },
    { name: "الجمعيات", to: "/charities", icon: <Building2 size={16} /> },
    { name: "أنواع المساهمات", to: "/categories", icon: <Shapes size={16} /> },
    { name: "من نحن", to: "/about", icon: <Info size={16} /> },
    { name: "قسم التوعية", to: "/advice", icon: <Lightbulb size={16} /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLinkStyle = ({ isActive }) =>
    `relative group font-bold text-sm transition-all duration-300 flex items-center gap-1.5 ${isActive
      ? "text-indigo-600 dark:text-indigo-400"
      : "text-slate-600 dark:text-slate-400 hover:text-indigo-600"
    }`;

  const handleLogout = () => {
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
    logout();
  };

  const handleGoProfile = () => {
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
    navigate(profilePath);
  };

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-4 transition-all"
        dir="rtl"
      >
        <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-4">
          <div className="flex justify-between items-center h-12">
            <div className="flex-shrink-0">
              <WaslaLogo />
            </div>

            <div className="hidden lg:flex items-center gap-5 bg-slate-100/50 dark:bg-white/5 px-6 py-2 rounded-full border border-slate-200/50 dark:border-white/5">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.to} className={activeLinkStyle}>
                  {({ isActive }) => (
                    <>
                      <span
                        className={`${isActive
                          ? "text-indigo-600"
                          : "text-slate-400 group-hover:text-indigo-500"
                          }`}
                      >
                        {link.icon}
                      </span>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute -bottom-1 right-0 w-full h-0.5 bg-orange-500 rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/10 mx-1" />

              <Link
                to="/zakatcalc"
                className="flex items-center gap-2 text-orange-500 dark:text-orange-400 font-bold text-xs hover:scale-105 transition-transform bg-orange-100 dark:bg-orange-500/10 px-3 py-2 rounded-xl"
              >
                <Calculator size={18} />
                احسب زكاتك
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-orange-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAuthenticated ? (
                <>
                  <UserMenu
                    user={user}
                    // isOnline={isOnline}
                    goTo={profilePath}
                  />
                  <NotificationMenu
                    goTo={notificationPath}
                  /></>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-slate-600 dark:text-slate-300 font-bold text-sm px-4"
                  >
                    تسجيل دخول
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              )}

            </div>

            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-orange-400"
              >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-600 dark:text-white"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white dark:bg-slate-950 z-[70] md:hidden shadow-2xl border-r border-slate-200 dark:border-white/5"
              dir="rtl"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
                <WaslaLogo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-4 space-y-2">
                {isAuthenticated && (
                  <div className="mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center overflow-hidden">
                        {user?.imageUrl ? (
                          <img
                            src={user.imageUrl}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={20} />
                        )}
                      </div>
                      <div
                        className="min-w-0">
                        <p className="text-sm font-black text-slate-800 dark:text-white truncate">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs font-bold text-slate-400 truncate">
                          {authData?.userRole}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-4 text-base font-bold rounded-2xl transition-all ${isActive
                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    <span className="text-indigo-500">{link.icon}</span>
                    {link.name}
                  </NavLink>
                ))}

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/5">
                  <Link
                    to="/zakatcalc"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-orange-500 font-bold rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-500/10"
                  >
                    <Calculator size={20} />
                    احسب زكاتك
                  </Link>
                </div>

                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 font-bold text-center text-slate-700 dark:text-white"
                    >
                      دخول
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-indigo-600 text-white font-bold text-center"
                    >
                      تسجيل
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 pt-3">
                    <button
                      onClick={handleGoProfile}
                      className="w-full flex items-center gap-3 py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-200 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      <UserCircle size={18} />
                      الملف الشخصي
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 py-3 px-4 text-sm font-bold text-rose-500 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    >
                      <LogOut size={18} />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;