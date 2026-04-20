import React from "react";
import {
    Edit3, Mail, Phone, MapPin, Globe, Loader2,
    Building2, Users, LayoutDashboard, BadgeDollarSign,
    Instagram, Facebook, Info, Share2, ShieldCheck, ShieldAlert,
    ExternalLink, Map as MapIcon
} from "lucide-react";

import { useUpdateCharity, useGetCharityDetails } from "../../../hocks/useCharityHooks";
import useModal from "../../../hocks/useModal";
import { useUser } from "../../../hocks/useAuthHocks";
import PageHeader from "../../../components/ui/layout/PageHeader";
import OrganizationModal from "./OrganizationModal";
import StatCard from "./../../../components/ui/cards/StatCard";

const AdminCharityProfile = () => {
    const charityModal = useModal();
    const { data: userData } = useUser();
    const charityId = userData?.user?.charityId;

    const { data: charity, isLoading, isError } = useGetCharityDetails(charityId);

    console.log(charity)
    const updateCharityMutation = useUpdateCharity();
    const handleSaveCharity = (formData) => {

        if (charityId) {
            updateCharityMutation.mutate(
                { id: charityId, formData },
                { onSuccess: () => charityModal.close() }
            );
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-orange-500" size={40} />
                    <p className="text-slate-500 font-black animate-pulse text-sm">
                        تحميل بيانات المؤسسة...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <p className="text-red-500 font-black">حدث خطأ أثناء تحميل بيانات المؤسسة</p>
            </div>
        );
    }

    const mapEmbedUrl = charity?.locationEmbedUrl || charity?.mapUrl;
    const mapExternalUrl = charity?.locationUrl || charity?.mapUrl;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700" dir="rtl">
            <PageHeader
                title="إدارة ملف المؤسسة"
                subtitle={charity?.name}
                icon={Building2}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <StatCard
                    title="إجمالي التبرعات"
                    value={`${charity?.totalRaisedAmount?.toLocaleString() || 0} ج.م`}
                    subtext="الأموال التي تم جمعها"
                    icon={BadgeDollarSign}
                    accent="bg-orange-500"
                    changeType="increase"
                    change="LIVE"
                />
                <StatCard
                    title="المشاريع"
                    value={charity?.totalProjectsCount || 0}
                    subtext="المشاريع المسجلة"
                    icon={LayoutDashboard}
                    accent="bg-indigo-600"
                    changeType="info"
                    change="نشط"
                />
                <StatCard
                    title="المتبرعين"
                    value={charity?.totalDonorsCount || 0}
                    subtext="أصدقاء المؤسسة"
                    icon={Users}
                    accent="bg-emerald-500"
                    changeType="success"
                    change="موثق"
                />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center relative">
                        <div className="absolute top-6 left-6">
                            {charity?.isActive ? (
                                <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-black">
                                    <ShieldCheck size={14} /> نشط
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-full text-[10px] font-black">
                                    <ShieldAlert size={14} /> متوقف
                                </div>
                            )}
                        </div>

                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-[2.2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 group">
                            <img
                                src={charity?.logoUrl || `https://ui-avatars.com/api/?name=${charity?.name || "Charity"}`}
                                alt="logo"
                                className="w-32 h-32 rounded-[1.8rem] object-cover shadow-lg transition-transform group-hover:scale-105 duration-500"
                            />
                        </div>

                        <h2 className="mt-6 text-xl font-black text-indigo-950 dark:text-white text-center leading-tight">
                            {charity?.name}
                        </h2>
                        <p className="text-xs text-slate-400 font-bold mt-1">
                            {charity?.type || "جمعية خيرية مسجلة"}
                        </p>

                        <div className="mt-8 w-full space-y-3">
                            <ContactRow icon={<Mail size={16} />} label="البريد الإلكتروني" value={charity?.email} />
                            <ContactRow icon={<Phone size={16} />} label="رقم التواصل" value={charity?.phoneNumber} />
                            <ContactRow icon={<MapPin size={16} />} label="العنوان الجغرافي" value={charity?.address} />
                        </div>

                        <div className="flex gap-3 mt-8">
                            <SocialLink icon={<Facebook size={20} />} href={charity?.facebookUrl} color="hover:text-blue-600" />
                            <SocialLink icon={<Instagram size={20} />} href={charity?.instagramUrl} color="hover:text-pink-600" />
                            <SocialLink icon={<Globe size={20} />} href={charity?.websiteUrl} color="hover:text-indigo-600" />
                        </div>

                        <button
                            onClick={() => charityModal.open(charity)}
                            className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Edit3 size={18} /> تعديل بيانات الحساب
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="h-64 md:h-80 rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl relative">
                        {charity?.coverImageUrl ? (
                            <img
                                src={charity.coverImageUrl}
                                className="w-full h-full object-cover"
                                alt="cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-300">
                                <Share2 size={40} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                            <h3 className="text-white font-black text-lg">صورة الغلاف الرسمية</h3>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-black text-indigo-950 dark:text-indigo-300 mb-6 flex items-center gap-2">
                            <Info className="text-orange-500" size={20} /> نبذة عن المؤسسة
                        </h3>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg italic">
                            "{charity?.description || "لا يوجد وصف حالي للمؤسسة. يرجى إضافة وصف لجذب المتبرعين."}"
                        </p>

                        <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800">
                            <h4 className="text-sm font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                                <MapIcon size={16} /> موقعنا على الخريطة
                            </h4>

                            {mapEmbedUrl ? (
                                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                                    <iframe
                                        src={mapEmbedUrl}
                                        title="موقع المؤسسة على الخريطة"
                                        className="w-full h-[320px] border-0"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        allowFullScreen
                                    />

                                    {mapExternalUrl && (
                                        <div className="absolute bottom-4 left-4">
                                            <a
                                                href={mapExternalUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-xl active:scale-95"
                                            >
                                                <ExternalLink size={16} />
                                                فتح في Google Maps
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-8 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
                                    <p className="text-slate-400 font-bold text-sm">
                                        لم يتم إضافة رابط الموقع الجغرافي بعد
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <OrganizationModal
                isOpen={charityModal.isOpen}
                onClose={charityModal.close}
                initialData={charity}
                onSubmit={handleSaveCharity}
                isSubmitting={updateCharityMutation.isPending}
            />
        </div>
    );
};

const ContactRow = ({ icon, label, value }) => (
    <div className="flex flex-col gap-1 group">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mr-2">
            {label}
        </span>
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors group-hover:border-orange-200">
            <span className="text-orange-500">{icon}</span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">
                {value || "غير مسجل"}
            </span>
        </div>
    </div>
);

const SocialLink = ({ icon, href, color }) => {
    const isValidHref = href && href.trim() !== "";

    return (
        <a
            href={isValidHref ? href : "#"}
            target={isValidHref ? "_blank" : undefined}
            rel={isValidHref ? "noreferrer" : undefined}
            className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 transition-all ${color} hover:bg-white dark:hover:bg-slate-700 shadow-sm active:scale-90 ${!isValidHref ? "pointer-events-none opacity-50" : ""}`}
        >
            {icon}
        </a>
    );
};

export default AdminCharityProfile;