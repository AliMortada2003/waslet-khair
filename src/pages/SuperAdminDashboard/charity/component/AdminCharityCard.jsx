import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Building2, MapPin, Users, FolderHeart, Edit3, Trash2,
    Eye, Globe, ShieldCheck, ShieldAlert, RefreshCw
} from "lucide-react";
import { useToggleStatus } from "../../../../hocks/useCharityHooks";

const AdminCharityCard = ({ data, onEdit, onDelete, onView, isToggling = false }) => {
    const [imageError, setImageError] = useState(false);
    const [coverError, setCoverError] = useState(false);
    const onToggleStatus = useToggleStatus()
    const {
        id,
        name,
        logoUrl,
        coverImageUrl, // استخدمنا الكوفر هنا
        address,
        totalDonorsCount,
        totalProjectsCount,
        isActive,
        websiteUrl
    } = data;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-[#0f172a] rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-white/5 overflow-hidden"
        >
            {/* زرار تبديل الحالة (Toggle) */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggleStatus.mutate(id)}
                disabled={isToggling}
                className={`absolute top-6 left-6 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border ${isActive
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/30'
                    } ${isToggling ? 'animate-pulse cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {isToggling ? (
                    <RefreshCw size={14} className="animate-spin" />
                ) : (
                    isActive ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />
                )}
                <span className="text-[10px] font-black uppercase tracking-wider">
                    {isToggling ? 'جاري...' : (isActive ? 'نشط' : 'متوقف')}
                </span>
            </motion.button>

            <div className="flex flex-col h-full">
                {/* منطقة الهيدر (اللوجو + الكوفر خلفية) */}
                <div className="w-full h-36 rounded-[2rem] relative mb-5 border border-slate-100 dark:border-white/5 overflow-hidden bg-slate-100 dark:bg-slate-800/50">

                    {/* صورة الغلاف كخلفية (Cover Image) */}
                    {coverImageUrl && !coverError ? (
                        <div className="absolute inset-0 z-0">
                            <img
                                src={coverImageUrl}
                                alt="Cover"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={() => setCoverError(true)}
                            />
                            {/* طبقة تغميق و Blur عشان اللوجو يظهر */}
                            <div className="absolute inset-0 bg-black/50  backdrop-blur-[5px]" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-orange-500/10" />
                    )}

                    {/* اللوجو في المنتصف */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-black/10 flex items-center justify-center overflow-hidden border border-white/20">
                            {logoUrl && !imageError ? (
                                <img
                                    src={logoUrl}
                                    alt={name}
                                    className="w-full h-full object-contain  transition-transform duration-500 group-hover:scale-110"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <Building2 size={32} className="text-slate-300 dark:text-slate-600" />
                            )}
                        </div>
                    </div>
                </div>

                {/* الاسم والعنوان */}
                <div className="text-right mb-6 px-1">
                    <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <MapPin size={14} className="text-orange-500 flex-shrink-0" />
                        <span className="truncate">{address || "لا يوجد عنوان مسجل"}</span>
                    </div>
                </div>

                {/* الإحصائيات */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 dark:bg-white/[0.02] rounded-2xl p-3 border border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-2 text-indigo-600 mb-1">
                            <Users size={14} />
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">المتبرعين</span>
                        </div>
                        <p className="text-sm font-black dark:text-white">{totalDonorsCount ?? 0}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/[0.02] rounded-2xl p-3 border border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-2 text-orange-500 mb-1">
                            <FolderHeart size={14} />
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">المشاريع</span>
                        </div>
                        <p className="text-sm font-black dark:text-white">{totalProjectsCount || 0}</p>
                    </div>
                </div>

                {/* أزرار التحكم */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
                    <button
                        onClick={() => onView(data)}
                        title="عرض التفاصيل"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 flex-shrink-0"
                    >
                        <Eye size={18} />
                    </button>

                    {websiteUrl && (
                        <a
                            href={websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="زيارة الموقع"
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-orange-600 hover:text-white transition-all duration-300 flex-shrink-0"
                        >
                            <Globe size={18} />
                        </a>
                    )}

                    <button
                        onClick={() => onEdit(data)}
                        className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-xs hover:bg-indigo-600 hover:text-white transition-all duration-300 ml-auto"
                    >
                        <Edit3 size={16} />
                        تعديل
                    </button>

                    <button
                        onClick={() => onDelete(data)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 flex-shrink-0"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminCharityCard;