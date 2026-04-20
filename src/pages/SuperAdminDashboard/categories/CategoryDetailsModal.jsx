import React from "react";
import {
    Tag,
    Image as ImageIcon,
    Building2,
    CalendarDays,
    ShieldCheck,
    X,
    Layers3,
    LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ModalHeader from "../../../components/modals/ModalHeader";

const CategoryDetailsModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;
    const createdAt = data?.createdAt ? new Date(data.createdAt).toLocaleDateString("ar-EG") : "غير محدد";
    console.log(data)
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]"
                    dir="rtl"
                >
                    {/* Header */}
                    <ModalHeader
                        title={"بيانات الصنف"}
                        subtitle="بيانات التصنيف المضاف من قبل الجمعية"
                        icon={LayoutDashboard}
                        onClose={onClose}
                        variant={"indigo"}
                    />
                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                        {/* Top summary card */}
                        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-28 h-28 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0">
                                    {data?.iconUrl ? (
                                        <img
                                            src={data.iconUrl}
                                            alt={data?.name || "Category Icon"}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon
                                            size={34}
                                            className="text-slate-300 dark:text-slate-600"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 text-center md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-black mb-3">
                                        <Layers3 size={14} />
                                        تصنيف خيري
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                                        {data?.name || "غير محدد"}
                                    </h3>

                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-2">
                                        هذا التصنيف يُستخدم لتنظيم الحالات وربطها داخل المنصة.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Details grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InfoCard
                                icon={Tag}
                                label="اسم التصنيف"
                                value={data?.name || "غير متوفر"}
                            />

                            <InfoCard
                                icon={Building2}
                                label="اسم الجمعية"
                                value={data?.charityName || "غير متوفر"}
                            />

                            <InfoCard
                                icon={ShieldCheck}
                                label="رقم الجمعية"
                                value={data?.charityId || "غير متوفر"}
                            />

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-5 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-[#0f172a] flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                        >
                            إغلاق
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 p-5 bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
            </div>
            <span className="text-xs font-black text-slate-400">{label}</span>
        </div>

        <div className="text-sm font-black text-slate-800 dark:text-white break-words">
            {value}
        </div>
    </div>
);

export default CategoryDetailsModal;