import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    MapPin,
    Users,
    FolderHeart,
    Verified,
    ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const CharityCard = ({ charity }) => {
    const [imageError, setImageError] = useState(false);
    const [logoError, setLogoError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="h-full group"
        >
            <Link to={`/charities/${charity.id}`} className="block h-full">
                <div className="relative h-full rounded-[2.5rem] bg-white  dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col overflow-hidden">

                    {/* 1. منطقة الغلاف (Cover Photo) */}
                    <div className="relative h-32 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        {charity.coverImageUrl && !imageError ? (
                            <img
                                src={charity.coverImageUrl}
                                alt="Cover"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                        )}

                        {/* شارة التوثيق */}
                        {charity.isActive && (
                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <Verified size={20} className="text-blue-500" />
                                <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">موثق</span>
                            </div>
                        )}
                    </div>

                    {/* 2. منطقة اللوجو العائم (Floating Logo) */}
                    <div className="relative px-6 -mt-10 mb-4 flex items-end justify-between">
                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-xl shadow-black/5 ring-4 ring-white dark:ring-slate-900">
                            <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
                                {charity.logoUrl && !logoError ? (
                                    <img
                                        src={charity.logoUrl}
                                        alt={charity.name}
                                        className="w-full h-full object-contain p-1"
                                        onError={() => setLogoError(true)}
                                    />
                                ) : (
                                    <Building2 size={32} className="text-indigo-400" />
                                )}
                            </div>
                        </div>

                        {/* زر صغير للانتقال */}
                        <div className="mb-2 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <ExternalLink size={18} />
                        </div>
                    </div>

                    {/* 3. المحتوى النصي */}
                    <div className="px-6 pb-6 flex flex-col flex-grow text-right">
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 group-hover:text-orange-500  transition-colors line-clamp-1">
                            {charity.name}
                        </h3>

                        <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-6 min-h-[32px]">
                            <MapPin size={14} className="mt-0.5 shrink-0 text-indigo-500" />
                            <span className="line-clamp-2 leading-relaxed font-medium">
                                {charity.address || "القاهرة، جمهورية مصر العربية"}
                            </span>
                        </div>

                        {/* 4. الإحصائيات (Stats) */}
                        <div className="mt-auto flex items-center gap-2">
                            <div className="flex-1 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl p-3 border border-indigo-100/50 dark:border-indigo-500/10 transition-colors group-hover:border-indigo-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <Users size={14} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">المتبرعون</span>
                                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                                        {charity.totalDonorsCount?.toLocaleString() || 0}
                                    </p>
                                </div>

                            </div>

                            <div className="flex-1 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-2xl  border border-emerald-100/50 dark:border-emerald-500/10 transition-colors group-hover:border-emerald-200">
                                <div className="flex  items-center gap-2 mb-1">
                                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <FolderHeart size={14} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">المشاريع</span>
                                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                                        {charity.totalProjectsCount || 0}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* خط جمالي في الأسفل يظهر عند الهوفير */}
                    {/* <div className="absolute bottom-0 left-0 h-1 bg-indigo-600 transition-all duration-500 w-0 group-hover:w-full" /> */}
                </div>
            </Link>
        </motion.div>
    );
};

export default CharityCard;