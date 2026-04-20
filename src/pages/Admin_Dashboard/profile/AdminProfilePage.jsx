import React from 'react';
import {
    User, Mail, Phone, Building2, Edit3, ShieldCheck,
    MapPin, Globe, Facebook, Instagram, Quote, Heart, ExternalLink,
    Origami
} from "lucide-react";
import useModal from "./../../../hocks/useModal";
import InfoBox from "./InfoBox";
import EditProfileModal from "./EditProfileModal";
import { useGetCharityDetails } from '../../../hocks/useCharityHooks';
import { useUser } from '../../../hocks/useAuthHocks';
import { useUpdateAdmin } from '../../../hocks/useAdminsHocks';

function AdminProfilePage() {
    const editModal = useModal();
    const { data: userData } = useUser();
    const admin = userData?.user;
    console.log(userData)
    const { data: handleUpdate } = useUpdateAdmin()
    console.log(handleUpdate)
    // جلب بيانات الجمعية 
    const { data: charity, isLoading } = useGetCharityDetails(admin?.charityId);

    console.log(charity)
    const handleUpdateProfile = async (values) => {
        console.log("إرسال التحديث للسيرفر:", values);
        editModal.close();
    };

    if (isLoading) return (
        <div className="p-20 text-center font-black animate-pulse text-indigo-600">
            جاري جلب بيانات مؤسسة {admin?.charityName}...
        </div>
    );

    return (
        <div className="p-2 md:p-10 min-h-screen  dark:bg-[#0b0f1a] font-['Cairo'] transition-colors duration-500" dir="rtl">

            <div className="relative group overflow-hidden rounded-[3.5rem] shadow-2xl shadow-indigo-500/10 h-80">
                {/* --- هيدر الغلاف (استخدام تاغ img لضمان الجودة والأداء) --- */}
                <div className="relative group overflow-hidden rounded-[3.5rem] shadow-2xl shadow-indigo-500/10 h-80">
                    {/* استبدال الـ div بتاغ img فعلي */}
                    <img
                        src={charity?.coverImageUrl}
                        alt="Charity Cover"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* الطبقة الشفافة (Overlay) لضمان وضوح النص الأبيض فوق الصورة */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/30 to-transparent"></div>

                    {/* بيانات الأدمن (تأكد إن الـ z-index عالي عشان يظهر فوق الصورة) */}
                    <div className="absolute bottom-10 right-8 md:right-16 flex flex-col md:flex-row items-center md:items-end gap-8 z-20">
                        <div className="relative">
                            <img
                                src={admin?.imageUrl}
                                alt="Admin Profile"
                                className="w-40 h-40 rounded-[2.5rem] border-[6px] border-white/20 backdrop-blur-md object-cover shadow-2xl transition-all duration-500"
                            />
                            <div className="absolute -bottom-2 -left-2 bg-emerald-600 text-white p-3 rounded-2xl shadow-lg border-4 border-indigo-100">
                                <ShieldCheck size={22} />
                            </div>
                        </div>

                        <div className="text-center md:text-right mb-2">
                            <h1 className="text-4xl font-black text-white mb-2 shadow-2xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                                {admin?.firstName} {admin?.lastName}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-xl text-xs font-black shadow-lg">
                                    مسؤول معتمد
                                </span>
                                <span className="bg-black/20 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-xs font-bold border border-white/10 flex items-center gap-2">
                                    <Building2 size={14} /> {charity?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- المحتوى الرئيسي --- */}
            <div className="grid grid-cols-1 space-y-6 lg:grid-cols-12 gap-15 mt-12">
                {/* العمود الجانبي (بطاقة الجمعية) */}
                <div className="lg:col-span-4  h-full  space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-lg p-3 border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-30 h-25 bg-indigo-500/45 rounded-bl-full"></div>

                        <div className="flex flex-col items-center text-center mb-8 relative z-10">
                            <div className="w-24 h-24 bg-white rounded-[2rem] p-4 shadow-xl mb-4 border border-slate-50">
                                <img src={charity?.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight">{charity?.name}</h3>
                            <p className="text-orange-500 text-xs font-black mt-2 tracking-widest uppercase">جهة العمل</p>
                        </div>

                        <div className="space-y-3 relative z-10 px-2">
                            <DetailRow icon={MapPin} label="المقر الرئيسي" value={charity?.address} />
                            <DetailRow icon={Mail} label="بريد المؤسسة" value={charity?.email} />
                            <DetailRow icon={Globe} label="الموقع الإلكتروني" value={charity?.websiteUrl} isLink />
                        </div>

                        <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-t-amber-700 dark:border-white/5">
                            <SocialIcon icon={Facebook} href={charity?.facebookUrl} />
                            <SocialIcon icon={Instagram} href="#" />
                        </div>

                    </div>
                    <img src={charity?.logoUrl}
                        className='w-full h-50 rounded-2xl shadow-sm'
                        alt="" />
                </div>

                {/* العمود الرئيسي (بيانات الحساب + رسالة المؤسسة) */}
                <div className="lg:col-span-8  space-y-8">
                    {/* كارت البيانات الشخصية */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-5 shadow-lg border-r border-orange-600 dark:border-white relative">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-sm md:text-2xl font-black text-indigo-800  dark:text-white flex items-center gap-3">
                                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                                معلومات المسؤول
                            </h2>
                            <button
                                onClick={() => editModal.open(admin)}
                                className="bg-indigo-600 text-xs md:text-sm hover:bg-indigo-700 text-white px-3 py-3 rounded-2xl font-black shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Edit3 size={18} /> تعديل الحساب
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* الاسم الأول والأخير جنب بعض في الشاشات الكبيرة */}
                            <InfoBox icon={User} label="الاسم الأول" value={admin?.firstName} />
                            <InfoBox icon={User} label="الاسم الأخير" value={admin?.lastName} />
                            <InfoBox icon={Phone} label="رقم الجوال" value={admin?.phoneNumber} />
                            <InfoBox icon={Origami} label="المؤسسة التابع لها" value={charity?.name} />
                            <div className="md:col-span-2">
                                <InfoBox
                                    icon={Mail}
                                    label="بريدك الإلكتروني"
                                    value={admin?.email}
                                />
                            </div>
                        </div>
                    </div>

                    {/* كارت رسالة المؤسسة (خلفية White/Slate مريحة) */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border-l border-orange-600 dark:border-white/5 shadow-lg relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-500">
                                <Heart size={40} className="fill-current" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white">عن {charity?.name}</h3>
                        </div>

                        <div className="relative">
                            <Quote className="absolute -top-4 -right-2 w-12 h-12 text-slate-100 dark:text-white/5 -z-0" />
                            <p className="text-slate-600 dark:text-slate-400 leading-[2.2] font-medium text-lg text-justify relative z-10">
                                {charity?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={editModal.isOpen}
                onClose={editModal.close}
                initialData={editModal.data}
                onSubmit={handleUpdateProfile}
            />
        </div>
    );
}

// مكونات فرعية بنفس الهوية (Indigo & Orange)
const DetailRow = ({ icon: Icon, label, value, isLink }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
        <div className="text-indigo-600 dark:text-indigo-400 mt-1 group-hover:scale-110 transition-transform">
            <Icon size={18} />
        </div>
        <div className="overflow-hidden">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5 tracking-wider">{label}</p>
            {isLink ? (
                <a href={value} target="_blank" rel="noreferrer" className="text-sm font-black text-indigo-600 hover:text-orange-500 transition-colors truncate block">
                    {value}
                </a>
            ) : (
                <p className="text-sm font-black text-slate-700 dark:text-slate-200 leading-tight">{value}</p>
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

export default AdminProfilePage;