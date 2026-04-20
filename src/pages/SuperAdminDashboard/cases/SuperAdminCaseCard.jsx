import React from "react";
import { motion } from "framer-motion";
import {
    Eye,
    Building2,
    Tag,
    Timer,
    Star,
    Calendar,
    Layout,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

const SuperAdminCaseCard = ({ item, onView }) => {
    if (!item) return null;

    const collectedAmount = Number(item?.collectedAmount || item?.currentAmount || 0);
    const targetAmount = Number(item?.targetAmount || 0);

    const progress =
        targetAmount > 0
            ? Math.min((collectedAmount / targetAmount) * 100, 100)
            : 0;

    const isCompleted =
        item?.isCompleted ||
        item?.status === "Completed" ||
        (targetAmount > 0 && collectedAmount >= targetAmount);

    const getStatusDetails = (status) => {
        const statuses = {
            Pending: {
                color: "text-amber-500",
                dot: "bg-amber-500",
                bg: "bg-amber-500/10",
                border: "border-amber-200/30",
                label: "قيد الانتظار",
            },
            Active: {
                color: "text-emerald-500",
                dot: "bg-emerald-500",
                bg: "bg-emerald-500/10",
                border: "border-emerald-200/30",
                label: "نشطة",
            },
            Completed: {
                color: "text-blue-500",
                dot: "bg-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-200/30",
                label: "مكتملة",
            },
            Rejected: {
                color: "text-rose-500",
                dot: "bg-rose-500",
                bg: "bg-rose-500/10",
                border: "border-rose-200/30",
                label: "مرفوضة",
            },
        };

        if (isCompleted) return statuses.Completed;
        return (
            statuses[status] || {
                color: "text-slate-500",
                dot: "bg-slate-400",
                bg: "bg-slate-500/10",
                border: "border-slate-200/30",
                label: "غير محددة",
            }
        );
    };

    const getPriorityDetails = (priority) => {
        const priorities = {
            Critical: {
                color: "text-rose-600",
                bg: "bg-rose-50 dark:bg-rose-500/10",
                label: "حرجة",
                icon: AlertCircle,
            },
            Urgent: {
                color: "text-orange-500",
                bg: "bg-orange-50 dark:bg-orange-500/10",
                label: "عاجلة",
                icon: Timer,
            },
            High: {
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-500/10",
                label: "عالية",
                icon: AlertCircle,
            },
            Normal: {
                color: "text-indigo-500",
                bg: "bg-indigo-50 dark:bg-indigo-500/10",
                label: "عادية",
                icon: Tag,
            },
            Low: {
                color: "text-slate-400",
                bg: "bg-slate-100 dark:bg-slate-800",
                label: "منخفضة",
                icon: Tag,
            },
        };

        return priorities[priority] || priorities.Normal;
    };

    const statusDetails = getStatusDetails(item?.status);
    const priorityDetails = getPriorityDetails(item?.priority);
    const PriorityIcon = priorityDetails.icon;

    const formattedDate = item?.createdAt
        ? new Date(item.createdAt).toLocaleDateString("ar-EG")
        : "غير محدد";

    const title = item?.title && item.title !== "string" ? item.title : "عنوان الحالة غير محدد";

    const description = item?.description && item.description !== "string" ? item.description : "لا يوجد وصف مضاف لهذه الحالة حتى الآن.";

    const handleView = () => {
        if (onView) onView(item);
    };

    return (
        <div
            onClick={handleView}
            className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full cursor-pointer"
            dir="rtl"
        >
            <div className="relative h-48 overflow-hidden">
                {item?.coverImageUrl && item.coverImageUrl !== "string" ? (
                    <img
                        src={item.coverImageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                        <Layout className="text-slate-300 dark:text-slate-700" size={42} />
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 right-4">
                    <span
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border text-[10px] font-black text-white ${statusDetails.bg} ${statusDetails.border}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${statusDetails.dot} animate-pulse`} />
                        {statusDetails.label}
                    </span>
                </div>

                {item?.isFeatured && (
                    <div className="absolute top-4 left-4">
                        <span className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-black text-[10px] font-black rounded-full shadow-lg">
                            <Star size={12} fill="black" />
                            مميزة
                        </span>
                    </div>
                )}

                <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-white/75 mb-1">
                            <Calendar size={12} />
                            <span className="text-[10px] font-bold">{formattedDate}</span>
                        </div>

                        <h3 className="text-white text-lg font-black line-clamp-1">
                            {title}
                        </h3>
                    </div>

                    <div className="shrink-0">
                        <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-all duration-300">
                            <Eye size={18} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1 space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-slate-400 min-w-0">
                        <Tag size={13} />
                        <span className="text-[10px] font-black truncate">
                            {item?.categoryName || "بدون تصنيف"}
                        </span>
                    </div>

                    <span
                        className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${priorityDetails.color} ${priorityDetails.bg}`}
                    >
                        <PriorityIcon size={12} />
                        {priorityDetails.label}
                    </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed min-h-[40px]">
                    {description}
                </p>

                <div className="flex items-center gap-2 py-3 border-y border-slate-100 dark:border-white/5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <Building2 size={16} className="text-indigo-600" />
                    </div>

                    <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] text-slate-400 font-bold">
                            الجمعية المسؤولة
                        </span>
                        <span className="text-xs font-black text-slate-700 dark:text-slate-200 truncate">
                            {item?.charityName || "غير محدد"}
                        </span>
                    </div>
                </div>

                <div className="space-y-3 pt-1">
                    <div className="flex items-end justify-between gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold">
                                تم جمع
                            </span>
                            <span className="text-base font-black text-emerald-600">
                                {collectedAmount.toLocaleString()} ج.م
                            </span>
                        </div>

                        <div className="text-left flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold">
                                الهدف
                            </span>
                            <span className="text-base font-black text-slate-700 dark:text-slate-200">
                                {targetAmount.toLocaleString()} ج.م
                            </span>
                        </div>
                    </div>

                    <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${progress >= 100
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                                : "bg-gradient-to-r from-indigo-600 to-indigo-400"
                                }`}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-400">
                            {Math.round(progress)}% اكتمل
                        </span>

                        {isCompleted && (
                            <span className="flex items-center gap-1 text-[11px] font-black text-emerald-600">
                                <CheckCircle2 size={13} />
                                مكتملة
                            </span>
                        )}
                    </div>
                </div>

                <div className="pt-3 mt-auto">
                    <button
                        type="button"
                        onClick={handleView}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all font-black text-sm shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                    >
                        <Eye size={16} />
                        عرض التفاصيل
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminCaseCard;