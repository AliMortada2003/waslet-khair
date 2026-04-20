import React from "react";
import {
    ShieldCheck,
    User,
    Mail,
    Phone,
    Building2,
    Hash,
} from "lucide-react";
import ModalHeader from "../../../components/modals/ModalHeader";

const Item = ({ icon: Icon, label, value }) => (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-2">
            <Icon size={16} className="text-indigo-500" />
            <span className="text-xs font-black text-slate-500">{label}</span>
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-white break-words">
            {value || "—"}
        </p>
    </div>
);

const DonorDetailsModal = ({ isOpen, onClose, data, charities = [] }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-scroll max-h-[90vh] flex flex-col">
                <ModalHeader
                    title="تفاصيل المسؤول"
                    subtitle="عرض بيانات المسؤول بشكل كامل"
                    icon={ShieldCheck}
                    onClose={onClose}
                    variant="indigo"
                />

                <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-24 h-24 rounded-[2rem]  bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4">
                            {data?.imageUrl ? (
                                <img
                                    src={data.imageUrl}
                                    alt={`${data?.firstName || ""} ${data?.lastName || ""}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-black">
                                    <img
                                        src="/images/user.webp"
                                        alt={`${data.firstName || ""} ${data.lastName || ""}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-black text-slate-800 dark:text-white">
                            {`${data?.firstName || ""} ${data?.lastName || ""}`.trim() || "—"}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">بيانات </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <Item icon={Hash} label="المعرف" value={data?.id} />
                        <Item icon={User} label="الاسم الأول" value={data?.firstName} />
                        <Item icon={User} label="الاسم الأخير" value={data?.lastName} />
                        <Item icon={Mail} label="البريد الإلكتروني" value={data?.email} />
                        <Item icon={Phone} label="رقم الهاتف" value={data?.phoneNumber} />
                    </div>
                </div>

                <div className="px-8 py-6 border-t dark:border-white/5 flex items-center justify-end bg-white dark:bg-[#0f172a]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition-all"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonorDetailsModal;