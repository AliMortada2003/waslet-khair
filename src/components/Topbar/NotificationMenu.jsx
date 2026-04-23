import React, { useMemo, useRef, useState, useEffect } from "react";
import {
    Bell,
    Clock,
    Calendar,
    Loader2,
    CheckCheck,
    X,
    ExternalLink,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // أضفنا useNavigate

import { useGetNotificationToUser, useMarkAllNotificationsAsRead, useMarkNotificationAsRead, useNotificationSound } from "../../hocks/useNotificationsHoks";
import { useUser } from "../../hocks/useAuthHocks";

const NotificationMenu = ({ goTo }) => {
    console.log(goTo)
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const {
        data: notificationsData = [],
        isLoading,
        isError,
    } = useGetNotificationToUser();

    const { mutate: markAsRead } = useMarkNotificationAsRead();
    const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllNotificationsAsRead();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const notifications = useMemo(() => {
        if (!Array.isArray(notificationsData)) return [];

        return notificationsData.map((item) => ({
            id: item.id,
            title: item.title || item.notificationTitle || "إشعار جديد",
            message: item.message || item.body || "لا يوجد محتوى",
            isRead: item.isRead ?? item.read ?? item.isSeen ?? false,
            createdAt: item.createdAt || new Date().toISOString(),
        }));
    }, [notificationsData]);

    const unreadCount = useMemo(() => {
        return notifications.filter((item) => !item.isRead).length;
    }, [notifications]);

    useNotificationSound(notifications);


    // دالة التعامل مع الضغط على الإشعار
    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            markAsRead(notification.id);
        }
        setIsOpen(false); // إغلاق القائمة
        navigate(goTo); // التوجه لصفحة الإشعارات
    };

    const formatTime = (value) => {
        if (!value) return "--:--";
        return new Date(value).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDate = (value) => {
        if (!value) return "غير متوفر";
        return new Date(value).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative rounded-xl p-3 text-slate-500 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 active:scale-95"
            >
                <Bell size={24} className={unreadCount > 0 ? "animate-swing" : ""} />

                {unreadCount > 0 && (
                    <span className="absolute right-1.5 top-1.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed left-1 md:left-10 mx-auto mt-3 w-80 md:w-100 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-1">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <X size={18} />
                            </button>

                            <div className="text-right">
                                <p className="text-sm font-black text-slate-800 dark:text-white">الإشعارات</p>
                                <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                                    {unreadCount > 0 ? `${unreadCount} غير مقروءة` : "كل الإشعارات مقروءة"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2">
                            <button
                                onClick={() => markAllAsRead()}
                                disabled={isMarkingAll || unreadCount === 0}
                                className="flex items-center gap-1 text-[11px] font-bold text-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 hover:underline"
                            >
                                {isMarkingAll ? <Loader2 size={12} className="animate-spin" /> : <CheckCheck size={13} />}
                                تحديد الكل كمقروء
                            </button>

                            <Link
                                to={goTo}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                <ExternalLink size={13} />
                                عرض الكل
                            </Link>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-10 text-xs font-bold text-slate-400">
                                <Loader2 size={22} className="mb-3 animate-spin" />
                                جاري التحميل...
                            </div>
                        ) : isError ? (
                            <div className="p-10 text-center text-xs font-bold text-red-400">حدث خطأ في التحميل</div>
                        ) : notificationsData.length > 0 ? (
                            notificationsData.map((n) => (
                                <button
                                    key={n.id}
                                    onClick={() => handleNotificationClick(n)}
                                    className={`flex w-full flex-col gap-1 border-b px-4 py-3 text-right transition-all ${!n.isRead ? "bg-cyan-50/50 dark:bg-cyan-500/5" : "bg-transparent"
                                        } border-slate-50 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{n.title}</h4>
                                        {!n.isRead && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />}
                                    </div>
                                    <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                                    <div className="mt-2 flex flex-wrap justify-end gap-3 text-[10px] font-medium text-slate-400">
                                        <span className="flex items-center gap-1">{formatTime(n.createdAt)} <Clock size={12} /></span>
                                        <span className="flex items-center gap-1">{formatDate(n.createdAt)} <Calendar size={12} /></span>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-10 text-center text-xs font-bold text-slate-400">لا توجد إشعارات</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationMenu;
