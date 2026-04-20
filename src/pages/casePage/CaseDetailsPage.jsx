import React from "react";
import {
    Heart,
    MapPin,
    Building2,
    BadgeInfo,
    CircleDollarSign,
    Users,
    CalendarDays,
    ShieldAlert,
    FolderOpen,
    UserRound,
    AlertCircle,
    ArrowRight,
} from "lucide-react";
import { useGetCaseDetails } from "../../hocks/useCaseHooks";
import { useParams, Link, useNavigate } from "react-router-dom";

function InfoRow({ icon: Icon, label, value, highlight = true }) {
    return (
        <div className="flex items-start gap-3">
            <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 ${highlight
                    ? "bg-indigo-50 dark:bg-indigo-500/10"
                    : "bg-slate-100 dark:bg-slate-800"
                    }`}
            >
                <Icon
                    className={`w-4 h-4 ${highlight
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-200"
                        }`}
                />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                    {label}
                </p>
                <p className="text-base md:text-sm font-black text-slate-900 dark:text-white break-words">
                    {value || "غير متوفر"}
                </p>
            </div>
        </div>
    );
}

function StatCard({ label, value, color = "default" }) {
    const styles = {
        default:
            "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white",
        primary:
            "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
        success:
            "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400",
        danger: "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400",
    };

    return (
        <div className={`rounded-[1.5rem] p-4 ${styles[color]}`}>
            <p className="text-sm font-bold opacity-80 mb-2">{label}</p>
            <p className="text-xl md:text-2xl font-black">{value}</p>
        </div>
    );
}

function formatCurrency(value) {
    if (value === null || value === undefined) return "غير محدد";
    return `${new Intl.NumberFormat("ar-EG").format(value)} ج.م`;
}

function formatDate(dateString) {
    if (!dateString) return "غير متوفر";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

function getPriorityLabel(priority) {
    if (!priority) return "غير محددة";

    const map = {
        Low: "منخفضة",
        Medium: "متوسطة",
        High: "مرتفعة",
        Critical: "حرجة",
    };

    return map[priority] || priority;
}

function getStatusLabel(status) {
    if (!status) return "غير محددة";

    const map = {
        Active: "نشطة",
        Completed: "مكتملة",
        Pending: "قيد المراجعة",
        Cancelled: "ملغية",
    };

    return map[status] || status;
}

function CaseDetailsPage() {
    const { caseId } = useParams();
    const navigate = useNavigate();
    const {
        data: caseData,
        isLoading,
        isError,
        error,
    } = useGetCaseDetails(caseId);

    if (isLoading) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"
                dir="rtl"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                        <Heart
                            className="absolute inset-0 m-auto text-indigo-600 animate-pulse"
                            size={20}
                        />
                    </div>
                    <p className="text-slate-900 dark:text-white font-black text-xl">
                        جاري تحميل تفاصيل الحالة...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !caseData) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6"
                dir="rtl"
            >
                <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-red-100 dark:border-red-500/10 shadow-xl p-10">
                    <AlertCircle className="mx-auto text-red-500 mb-5" size={60} />
                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-3">
                        حدث خطأ أثناء تحميل الحالة
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        {error?.message || "حاول مرة أخرى بعد قليل."}
                    </p>
                </div>
            </div>
        );
    }

    const progress =
        caseData.targetAmount > 0
            ? Math.min((caseData.collectedAmount / caseData.targetAmount) * 100, 100)
            : 0;

    return (
        <div className="min-h-screen py-15 bg-slate-50 dark:bg-slate-950" dir="rtl">
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
                <div className="mb-8">
                    <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                        <div className="relative px-5 md:px-8 py-6 md:py-7">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/60 dark:bg-indigo-500/10 blur-3xl rounded-full" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-100/60 dark:bg-sky-500/10 blur-3xl rounded-full" />
                            </div>

                            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                <div className="min-w-0">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-4">
                                        <FolderOpen size={16} />
                                        صفحة تفاصيل الحالة
                                    </div>

                                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">
                                        تفاصيل الحالة
                                    </h1>

                                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
                                        {caseData?.title
                                            ? `أنت الآن تستعرض تفاصيل الحالة: ${caseData.title}`
                                            : "استعرض البيانات الكاملة الخاصة بهذه الحالة"}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                    >
                                        <ArrowRight size={18} />
                                        رجوع
                                    </button>

                                    <Link
                                        to="/cases"
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                                    >
                                        <FolderOpen size={18} />
                                        كل الحالات
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1  lg:grid-cols-[1fr_.92fr] gap-8 ">
                    {/* Left Side */}
                    <div className="space-y-6">
                        {/* Cover */}
                        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">
                            <img
                                src={caseData.coverImageUrl}
                                alt={caseData.title}
                                className="w-full h-[280px] md:h-[400px] object-cover"
                            />

                            <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                                <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-sm font-black shadow">
                                    {caseData.categoryName || "بدون تصنيف"}
                                </span>

                                <span className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-black shadow">
                                    {getPriorityLabel(caseData.priority)}
                                </span>
                            </div>

                            {caseData.isFeatured && (
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-black shadow-lg">
                                        حالة مميزة
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Main content */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] p-5 md:p-7 shadow-sm">
                            <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                                <div className="min-w-0">
                                    <p className="text-slate-500 dark:text-slate-400 font-bold mb-2">
                                        تفاصيل الحالة
                                    </p>
                                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight break-words">
                                        {caseData.title}
                                    </h1>
                                </div>

                                <span className="px-4 py-2 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-black shrink-0">
                                    {getStatusLabel(caseData.status)}
                                </span>
                            </div>

                            {/* Quick info distributed */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <InfoRow
                                    icon={UserRound}
                                    label="اسم المستفيد"
                                    value={caseData.beneficiaryName}
                                />
                                <InfoRow
                                    icon={Building2}
                                    label="الجمعية"
                                    value={caseData.charityName}
                                />
                                <InfoRow
                                    icon={BadgeInfo}
                                    label="العمر"
                                    value={caseData.age ? `${caseData.age} سنة` : "غير متوفر"}
                                />
                                <InfoRow
                                    icon={FolderOpen}
                                    label="التصنيف"
                                    value={caseData.categoryName}
                                />
                            </div>

                            <div className="border-t border-slate-100 dark:border-white/5 pt-6">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                                    وصف الحالة
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-8 font-medium">
                                    {caseData.description || "لا يوجد وصف متاح لهذه الحالة."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6 lg:sticky lg:top-24">
                        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 md:p-6 shadow-sm">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-5">
                                ملخص التبرع
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                                <StatCard
                                    label="المبلغ المطلوب"
                                    value={formatCurrency(caseData.targetAmount)}
                                />
                                <StatCard
                                    label="تم جمعه"
                                    value={formatCurrency(caseData.collectedAmount)}
                                    color="primary"
                                />
                            </div>

                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                    نسبة الإنجاز
                                </span>
                                <span className="text-sm font-black text-slate-900 dark:text-white">
                                    {Math.round(progress)}%
                                </span>
                            </div>

                            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-6">
                                <div
                                    className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <StatCard
                                    label="الحالة"
                                    value={getStatusLabel(caseData.status)}
                                    color="success"
                                />
                                <StatCard
                                    label="الأولوية"
                                    value={getPriorityLabel(caseData.priority)}
                                    color="danger"
                                />
                            </div>

                            <button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                                <Heart size={20} />
                                تبرع الآن
                            </button>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 md:p-6 shadow-sm">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-5">
                                نظرة سريعة
                            </h3>

                            <div className="grid  grid-cols-2 md:grid-cols-3 gap-2">
                                <InfoRow
                                    icon={CircleDollarSign}
                                    label="المبلغ المستهدف"
                                    value={formatCurrency(caseData.targetAmount)}
                                />
                                <InfoRow
                                    icon={CircleDollarSign}
                                    label="المبلغ المُجمّع"
                                    value={formatCurrency(caseData.collectedAmount)}
                                />
                                <InfoRow
                                    icon={Building2}
                                    label="الجهة المشرفة"
                                    value={caseData.charityName}
                                />
                                <InfoRow
                                    icon={Users}
                                    label="عدد المتبرعين"
                                    value={caseData.donorsCount ?? "لا يوجد بعد"}
                                />
                                <InfoRow
                                    icon={CalendarDays}
                                    label="تاريخ الإنشاء"
                                    value={formatDate(caseData.createdAt)}
                                />
                                <InfoRow
                                    icon={CalendarDays}
                                    label="تاريخ الانتهاء"
                                    value={formatDate(caseData.endDate)}
                                />
                                <InfoRow
                                    icon={MapPin}
                                    label="الموقع"
                                    value={caseData.location || "غير محدد"}
                                />
                                <InfoRow
                                    icon={ShieldAlert}
                                    label="الأولوية"
                                    value={getPriorityLabel(caseData.priority)}
                                    highlight
                                />
                                <InfoRow
                                    icon={BadgeInfo}
                                    label="رقم الحالة"
                                    value={`#${caseData.id}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseDetailsPage;