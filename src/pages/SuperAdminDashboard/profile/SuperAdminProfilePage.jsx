import React from "react";
import {
    User,
    Mail,
    Phone,
    ShieldCheck,
    Globe,
    Facebook,
    Instagram,
    Quote,
    Heart,
    Edit3,
    Settings,
    BadgeCheck,
    Crown,
    Sparkles,
} from "lucide-react";
import useModal from "./../../../hocks/useModal";
import { useUser } from "../../../hocks/useAuthHocks";
import InfoBox from './../../Admin_Dashboard/profile/InfoBox';
// import EditProfileModal from "./EditProfileModal";
import WaslaLogo from './../../../components/WaslaLogo';

function SuperAdminProfilePage() {
    const editModal = useModal();
    const { data: userData } = useUser();
    const admin = userData?.user;

    const platformInfo = {
        name: "وصلة خير",
        websiteUrl: "https://wasletkhair.com",
        email: "support@wasletkhair.com",
        facebookUrl: "#",
        instagramUrl: "#",
        logoUrl: "/images/Hero_background.avif", // غيرها بلوجو المنصة
        coverImageUrl: "/images/Hero_background.avif", // غيرها بصورة مناسبة للمنصة
        description:
            "وصلة خير منصة رقمية تهدف إلى ربط المتبرعين بالحالات والجمعيات الموثوقة بشكل منظم وشفاف، مع توفير تجربة سهلة وآمنة لإدارة التبرعات ومتابعة أثرها.",
    };

    // const handleUpdateProfile = async (values) => {
    //     console.log("إرسال التحديث للسيرفر:", values);
    //     editModal.close();
    // };

    return (
        <div
            className="p-2 md:p-10 min-h-screen dark:bg-[#0b0f1a] font-['Cairo'] transition-colors duration-500"
            dir="rtl"
        >
            <div className="relative group overflow-hidden rounded-[3.5rem] shadow-2xl shadow-indigo-500/10 h-80">
                <img
                    src={platformInfo.coverImageUrl}
                    alt="Platform Cover"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/30 to-transparent" />

                <div className="absolute bottom-10 right-8 md:right-16 flex flex-col md:flex-row items-center md:items-end gap-8 z-20">
                    <div className="relative">
                        <img
                            src={admin?.imageUrl || platformInfo.logoUrl}
                            alt="Super Admin"
                            className="w-40 h-40 rounded-[2.5rem] border-[6px] border-white/20 backdrop-blur-md object-cover shadow-2xl transition-all duration-500"
                        />
                        <div className="absolute -bottom-2 -left-2 bg-emerald-600 text-white p-3 rounded-2xl shadow-lg border-4 border-indigo-100">
                            <Crown size={22} />
                        </div>
                    </div>

                    <div className="text-center md:text-right mb-2">
                        <h1 className="text-4xl font-black text-white mb-2 shadow-2xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                            {admin?.firstName} {admin?.lastName}
                        </h1>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="bg-orange-500 text-white px-4 py-1.5 rounded-xl text-xs font-black shadow-lg">
                                Super Admin
                            </span>

                            <span className="bg-black/20 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-xs font-bold border border-white/10 flex items-center gap-2">
                                <ShieldCheck size={14} />
                                إدارة المنصة
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-lg p-5 border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-28 bg-indigo-500/20 rounded-bl-full"></div>

                        <div className="flex flex-col items-center text-center mb-8 relative z-10">
                            <WaslaLogo />
                            <p className="text-orange-500 text-xs font-black mt-2 tracking-widest uppercase">
                                لوحة تحكم الإدارة
                            </p>
                        </div>

                        <div className="space-y-3 relative z-10 px-2">
                            <DetailRow
                                icon={Mail}
                                label="البريد الرسمي"
                                value={platformInfo.email}
                            />
                            <DetailRow
                                icon={Globe}
                                label="الموقع الإلكتروني"
                                value={platformInfo.websiteUrl}
                                isLink
                            />
                            <DetailRow
                                icon={BadgeCheck}
                                label="نوع الحساب"
                                value="سوبر أدمن / إدارة كاملة"
                            />
                        </div>

                        <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                            <SocialIcon icon={Facebook} href={platformInfo.facebookUrl} />
                            <SocialIcon icon={Instagram} href={platformInfo.instagramUrl} />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-lg p-5 border border-slate-100 dark:border-white/5">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-5 flex items-center gap-2">
                            <Settings size={18} className="text-indigo-600" />
                            صلاحيات الحساب
                        </h3>

                        <div className="space-y-3">
                            <PermissionBadge text="إدارة الجمعيات" />
                            <PermissionBadge text="متابعة الحالات الحالات" />
                            <PermissionBadge text="متابعة التصنيفات" />
                            <PermissionBadge text="مراجعة المحتوى" />
                            <PermissionBadge text="التحكم الكامل بالمستخدمين" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-5 shadow-lg border-r border-orange-600 dark:border-white/5 relative">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-sm md:text-2xl font-black text-indigo-800 dark:text-white flex items-center gap-3">
                                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                                معلومات الحساب
                            </h2>
                            {/* 
                            <button
                                onClick={() => editModal.open(admin)}
                                className="bg-indigo-600 text-xs md:text-sm hover:bg-indigo-700 text-white px-3 py-3 rounded-2xl font-black shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Edit3 size={18} />
                                تعديل الحساب
                            </button> */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InfoBox icon={User} label="الاسم الأول" value={admin?.firstName} />
                            <InfoBox icon={User} label="الاسم الأخير" value={admin?.lastName} />
                            <InfoBox icon={Phone} label="رقم الجوال" value={admin?.phoneNumber} />
                            <InfoBox icon={ShieldCheck} label="الدور" value="Super Admin" />
                            <div className="md:col-span-2">
                                <InfoBox
                                    icon={Mail}
                                    label="البريد الإلكتروني"
                                    value={admin?.email}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border-l border-orange-600 dark:border-white/5 shadow-lg relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-500">
                                <Heart size={40} className="fill-current" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                                عن {platformInfo.name}
                            </h3>
                        </div>

                        <div className="relative">
                            <Quote className="absolute -top-4 -right-2 w-12 h-12 text-slate-100 dark:text-white/5 -z-0" />
                            <p className="text-slate-600 dark:text-slate-400 leading-[2.2] font-medium text-lg text-justify relative z-10">
                                {platformInfo.description}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-l from-indigo-600 to-violet-600 rounded-[3rem] p-8 text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles size={22} />
                            <h3 className="text-xl font-black">ملخص سريع</h3>
                        </div>

                        <p className="text-white/90 leading-8 font-medium">
                            هذا الحساب مخصص لإدارة منصة وصلة خير بالكامل، ومتابعة الجمعيات والحالات
                            والتصنيفات والمحتوى العام، مع صلاحية كاملة للتحكم في جميع أجزاء النظام.
                        </p>
                    </div>
                </div>
            </div>

            {/* <EditProfileModal
                isOpen={editModal.isOpen}
                onClose={editModal.close}
                initialData={editModal.data}
                onSubmit={handleUpdateProfile}
            /> */}
        </div>
    );
}

const DetailRow = ({ icon: Icon, label, value, isLink }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
        <div className="text-indigo-600 dark:text-indigo-400 mt-1 group-hover:scale-110 transition-transform">
            <Icon size={18} />
        </div>
        <div className="overflow-hidden">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5 tracking-wider">
                {label}
            </p>
            {isLink ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-black text-indigo-600 hover:text-orange-500 transition-colors truncate block"
                >
                    {value}
                </a>
            ) : (
                <p className="text-sm font-black text-slate-700 dark:text-slate-200 leading-tight">
                    {value || "غير متوفر"}
                </p>
            )}
        </div>
    </div>
);

const SocialIcon = ({ icon: Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="p-3.5 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-orange-500 transition-all shadow-sm"
    >
        <Icon size={20} />
    </a>
);

const PermissionBadge = ({ text }) => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
        <ShieldCheck size={16} className="text-emerald-500" />
        <span className="text-sm font-black text-slate-700 dark:text-slate-200">
            {text}
        </span>
    </div>
);

export default SuperAdminProfilePage;