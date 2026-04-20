import React, { useMemo, useState } from "react";
import {
    Bell,
    CheckCheck,
    Eye,
    Loader2,
    RefreshCw,
    Search,
    XCircle,
    Clock3,
    MessageSquareText,
    Info,
} from "lucide-react";


import {
    useGetNotificationToUser,
    useMarkAllNotificationsAsRead,
    useMarkNotificationAsRead,
} from "../../hocks/useNotificationsHoks";
import useModal from "../../hocks/useModal";
import PageHeader from "../../components/ui/layout/PageHeader";
import ModalHeader from "../../components/modals/ModalHeader";

function NotificationsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    const detailsModal = useModal();

    const {
        data: notificationsData = [],
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useGetNotificationToUser();

    const { mutate: markAsRead, isPending: isMarkingOne } =
        useMarkNotificationAsRead();

    const { mutate: markAllAsRead, isPending: isMarkingAll } =
        useMarkAllNotificationsAsRead();

    const notifications = useMemo(() => {
        if (!Array.isArray(notificationsData)) return [];

        return notificationsData.map((item) => ({
            id: item.id,
            title: item.title || item.notificationTitle || "إشعار جديد",
            message:
                item.message ||
                item.description ||
                item.body ||
                "لا يوجد وصف لهذا الإشعار",
            isRead: item.isRead ?? item.read ?? item.isSeen ?? false,
            createdAt: item.createdAt || item.date || item.sentAt || null,
            type: item.type || item.notificationType || "عام",
            sender: item.sender || item.senderName || item.from || "النظام",
            extraDetails:
                item.extraDetails ||
                item.details ||
                item.fullMessage ||
                item.content ||
                null,
        }));
    }, [notificationsData]);

    const filteredNotifications = useMemo(() => {
        let result = [...notifications];

        if (activeFilter === "read") {
            result = result.filter((item) => item.isRead);
        }

        if (activeFilter === "unread") {
            result = result.filter((item) => !item.isRead);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (item) =>
                    item.title.toLowerCase().includes(term) ||
                    item.message.toLowerCase().includes(term) ||
                    item.type.toLowerCase().includes(term)
            );
        }

        return result;
    }, [notifications, activeFilter, searchTerm]);

    const unreadCount = useMemo(() => {
        return notifications.filter((item) => !item.isRead).length;
    }, [notifications]);

    const readCount = notifications.length - unreadCount;

    const formatDate = (date) => {
        if (!date) return "تاريخ غير متوفر";

        try {
            return new Date(date).toLocaleString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "تاريخ غير متوفر";
        }
    };

    const handleMarkAsRead = (id, isRead) => {
        if (isRead) return;
        markAsRead(id);
    };

    const handleOpenDetails = (notification) => {
        detailsModal.open(notification);

        if (!notification.isRead) {
            markAsRead(notification.id);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                    <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
                        جاري تحميل الإشعارات...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
                <div className="max-w-md w-full rounded-3xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
                    <XCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                        حدث خطأ أثناء تحميل الإشعارات
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-5">
                        حاول مرة أخرى، قد تكون المشكلة مؤقتة.
                    </p>
                    <button
                        onClick={refetch}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition"
                    >
                        <RefreshCw className="w-4 h-4" />
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8"
                dir="rtl"
            >
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title="الإشعارات"
                        subtitle="تابع كل التنبيهات والتحديثات الخاصة بحسابك في مكان واحد"
                        icon={Bell}
                    />

                    <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto lg:min-w-[700px]">
                            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5 shadow-sm">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    إجمالي الإشعارات
                                </p>
                                <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                    {notifications.length}
                                </h3>
                            </div>

                            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5 shadow-sm">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    غير المقروءة
                                </p>
                                <h3 className="mt-2 text-3xl font-black text-amber-500">
                                    {unreadCount}
                                </h3>
                            </div>

                            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5 shadow-sm">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    المقروءة
                                </p>
                                <h3 className="mt-2 text-3xl font-black text-emerald-600">
                                    {readCount}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => refetch()}
                                disabled={isFetching}
                                className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-60 inline-flex items-center gap-2 font-semibold"
                            >
                                <RefreshCw
                                    className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                                />
                                تحديث
                            </button>

                            <button
                                onClick={() => markAllAsRead()}
                                disabled={isMarkingAll || unreadCount === 0}
                                className="px-4 py-3 rounded-2xl bg-amber-500 text-white hover:bg-amber-600 transition disabled:opacity-60 inline-flex items-center gap-2 font-semibold"
                            >
                                {isMarkingAll ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <CheckCheck className="w-4 h-4" />
                                )}
                                تحديد الكل كمقروء
                            </button>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 sm:p-5 mb-6 shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                            <div className="relative w-full lg:max-w-md">
                                <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="ابحث داخل الإشعارات..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-11 pl-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    { key: "all", label: "الكل" },
                                    { key: "unread", label: "غير المقروءة" },
                                    { key: "read", label: "المقروءة" },
                                ].map((filter) => (
                                    <button
                                        key={filter.key}
                                        onClick={() => setActiveFilter(filter.key)}
                                        className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition ${activeFilter === filter.key
                                                ? "bg-amber-500 text-white"
                                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {filteredNotifications.length === 0 ? (
                        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center shadow-sm">
                            <Bell className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                                لا توجد إشعارات
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                لا يوجد أي إشعارات مطابقة للبحث أو الفلتر الحالي.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => handleOpenDetails(notification)}
                                    className={`rounded-3xl border p-5 transition shadow-sm cursor-pointer hover:shadow-md ${notification.isRead
                                            ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10"
                                            : "bg-amber-50/70 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20"
                                        }`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <span
                                                    className={`w-3 h-3 rounded-full ${notification.isRead
                                                            ? "bg-slate-300 dark:bg-slate-600"
                                                            : "bg-amber-500"
                                                        }`}
                                                />
                                                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                                    {notification.title}
                                                </h3>

                                                {!notification.isRead && (
                                                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500 text-white font-bold">
                                                        جديد
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-slate-700 dark:text-slate-300 leading-7 mb-3 line-clamp-2">
                                                {notification.message}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock3 className="w-4 h-4" />
                                                    {formatDate(notification.createdAt)}
                                                </span>

                                                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                                    {notification.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenDetails(notification);
                                                }}
                                                className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition inline-flex items-center gap-2 font-semibold"
                                            >
                                                <Eye className="w-4 h-4" />
                                                عرض التفاصيل
                                            </button>

                                            {!notification.isRead && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkAsRead(
                                                            notification.id,
                                                            notification.isRead
                                                        );
                                                    }}
                                                    disabled={isMarkingOne}
                                                    className="px-4 py-2.5 rounded-2xl bg-amber-500 text-white hover:bg-amber-600 transition disabled:opacity-60 inline-flex items-center gap-2 font-semibold"
                                                >
                                                    {isMarkingOne ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <CheckCheck className="w-4 h-4" />
                                                    )}
                                                    تم قراءته
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <NotificationDetailsModal
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.close}
                notification={detailsModal.data}
                formatDate={formatDate}
            />
        </>
    );
}

function NotificationDetailsModal({
    isOpen,
    onClose,
    notification,
    formatDate,
}) {
    if (!isOpen || !notification) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-2xl rounded-[28px] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <ModalHeader
                    title="تفاصيل الإشعار"
                    subtitle="NOTIFICATION DETAILS"
                    icon={MessageSquareText}
                    onClose={onClose}
                    variant="orange"
                />

                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoCard label="العنوان" value={notification.title} />
                        <InfoCard label="النوع" value={notification.type} />
                        <InfoCard
                            label="المرسل"
                            value={notification.sender || "النظام"}
                        />
                        <InfoCard
                            label="التاريخ"
                            value={formatDate(notification.createdAt)}
                        />
                    </div>

                    <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 p-5">
                        <h3 className="text-sm font-extrabold text-slate-500 dark:text-slate-400 mb-3">
                            محتوى الرسالة
                        </h3>
                        <p className="text-slate-800 dark:text-slate-100 leading-8 whitespace-pre-line">
                            {notification.extraDetails || notification.message}
                        </p>
                    </div>

                    {notification.extraDetails &&
                        notification.extraDetails !== notification.message && (
                            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5">
                                <h3 className="text-sm font-extrabold text-slate-500 dark:text-slate-400 mb-3">
                                    الملخص
                                </h3>
                                <p className="text-slate-700 dark:text-slate-300 leading-8 whitespace-pre-line">
                                    {notification.message}
                                </p>
                            </div>
                        )}

                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-5 py-3 rounded-2xl bg-amber-500 text-white hover:bg-amber-600 transition font-bold"
                        >
                            إغلاق
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-[0.18em] mb-2">
                {label}
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-white leading-7">
                {value || "--"}
            </p>
        </div>
    );
}

export default NotificationsPage;