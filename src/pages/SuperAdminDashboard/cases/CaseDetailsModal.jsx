import React, { useMemo } from "react";
import {
    Briefcase,
    FileText,
    Hash,
    DollarSign,
    User,
    Tag,
    ShieldAlert,
    Activity,
    Building2,
    Star,
    Image as ImageIcon,
    Paperclip,
    X,
    CalendarDays,
    CheckCircle2,
} from "lucide-react";

const prioritiesMap = {
    Normal: "عادي",
    Urgent: "عاجل",
    Critical: "مرتفع",
};

const statusesMap = {
    Pending: "قيد الانتظار",
    Active: "نشطة",
    Completed: "مكتملة",
    Rejected: "ملغية",
};

const CaseDetailsModal = ({ isOpen, onClose, data }) => {
    console.log(data)

    if (!isOpen || !data) return null;

    console.log(data)
    const currentAmount = Number(data.collectedAmount || 0);
    const targetAmount = Number(data.targetAmount || 0);
    const progress = targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden max-h-[90vh] flex flex-col"
                dir="rtl"
            >
                <div className="relative px-8 py-6 border-b border-slate-100 dark:border-white/10 bg-gradient-to-l from-indigo-600 to-indigo-500 text-white">
                    <button
                        onClick={onClose}
                        className="absolute left-6 top-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                            <Briefcase size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">تفاصيل الحالة</h2>
                            <p className="text-white/80 text-sm mt-1">
                                استعراض كامل لبيانات الحالة والمستفيد
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
                    {data?.coverImageUrl ? (
                        <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800">
                            <img
                                src={data.coverImageUrl}
                                alt={data.title}
                                className="w-full h-72 object-cover"
                            />
                        </div>
                    ) : (
                        <div className="rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/40 h-60 flex flex-col items-center justify-center text-slate-400">
                            <ImageIcon size={36} className="mb-3" />
                            <p className="font-bold text-sm">لا توجد صورة غلاف للحالة</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <SectionTitle title="المعلومات الأساسية" color="indigo" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoCard icon={Briefcase} label="عنوان الحالة" value={data?.title} />
                                <InfoCard icon={User} label="اسم المستفيد" value={data?.beneficiaryName} />
                                <InfoCard icon={Hash} label="العمر" value={data?.age ? `${data.age} سنة` : "غير محدد"} />
                                <InfoCard icon={Building2} label="الجمعية" value={data?.charityName} />
                                <InfoCard icon={Tag} label="التصنيف" value={data?.categoryName} />
                                <InfoCard icon={User} label="رقم الأدمن" value={data?.adminId || "غير محدد"} />
                            </div>

                            <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 p-5 bg-slate-50 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-2 mb-3">
                                    <FileText className="text-indigo-500" size={18} />
                                    <h3 className="font-black text-slate-800 dark:text-white">وصف الحالة</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-8 text-sm font-medium">
                                    {data?.description || "لا يوجد وصف متاح لهذه الحالة"}
                                </p>
                            </div>

                            <SectionTitle title="الحالة المالية" color="emerald" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoCard
                                    icon={DollarSign}
                                    label="المبلغ المستهدف"
                                    value={targetAmount ? `${targetAmount.toLocaleString()} ج.م` : "0 ج.م"}
                                />
                                <InfoCard
                                    icon={DollarSign}
                                    label="المبلغ الحالي"
                                    value={currentAmount ? `${currentAmount.toLocaleString()} ج.م` : "0 ج.م"}
                                />
                            </div>

                            <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 p-5 bg-slate-50 dark:bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-black text-slate-700 dark:text-white">نسبة التقدم</span>
                                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                        {progress.toFixed(0)}%
                                    </span>
                                </div>

                                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <SectionTitle title="بيانات الحالة" color="orange" />

                            <InfoCard
                                icon={ShieldAlert}
                                label="الأولوية"
                                value={prioritiesMap[data?.priority] || data?.priority || "غير محددة"}
                            />

                            <InfoCard
                                icon={Activity}
                                label="الحالة"
                                value={statusesMap[data?.status] || data?.status || "غير محددة"}
                            />

                            <InfoCard
                                icon={Star}
                                label="حالة مميزة"
                                value={data?.isFeatured ? "نعم، مميزة" : "لا"}
                            />

                            <InfoCard
                                icon={CheckCircle2}
                                label="اكتمال الحالة"
                                value={data?.isCompleted || currentAmount >= targetAmount ? "مكتملة" : "غير مكتملة"}
                            />

                            {data?.createdAt && (
                                <InfoCard
                                    icon={CalendarDays}
                                    label="تاريخ الإنشاء"
                                    value={new Date(data.createdAt).toLocaleDateString("ar-EG")}
                                />
                            )}

                            <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 p-5 bg-slate-50 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-2 mb-3">
                                    <Paperclip className="text-indigo-500" size={18} />
                                    <h3 className="font-black text-slate-800 dark:text-white">المرفقات</h3>
                                </div>

                                {data?.attachments && data.attachments.length > 0 ? (
                                    <div className="space-y-3">
                                        {data.attachments.map((file, index) => (
                                            <a
                                                key={index}
                                                href={file.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition"
                                            >
                                                <span className="truncate">{file.name || `مرفق ${index + 1}`}</span>
                                                <Paperclip size={16} className="text-slate-400 shrink-0" />
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 font-bold">لا توجد مرفقات متاحة</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-5 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-[#0f172a] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

const SectionTitle = ({ title, color = "indigo" }) => {
    const colors = {
        indigo: "border-indigo-500 text-indigo-600 dark:text-indigo-400",
        orange: "border-orange-500 text-orange-600 dark:text-orange-400",
        emerald: "border-emerald-500 text-emerald-600 dark:text-emerald-400",
    };

    return (
        <div className={`flex items-center gap-2 border-r-4 pr-4 ${colors[color]}`}>
            <h3 className="font-black text-sm">{title}</h3>
        </div>
    );
};

const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 p-4 bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-black text-slate-400">{label}</span>
        </div>
        <div className="text-sm font-bold text-slate-800 dark:text-white break-words">
            {value || "غير متوفر"}
        </div>
    </div>
);

export default CaseDetailsModal;