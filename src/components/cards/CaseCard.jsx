import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Timer, Building2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./../buttoms/Button";
import { useUser } from "../../hocks/useAuthHocks";
import {
    useAddCaseToFavorite,
    useDeleteFavoriteCase,
} from "../../hocks/useFavoriteHooks";

const CaseCard = ({
    item,
    index = 0,
    isFavorite = false,
    hideDonateButton = false,
    hideDetailsButton = false,
    onFavoriteToggle,
}) => {
    const navigate = useNavigate();
    const { data: userData } = useUser();
    const donorId = userData?.user?.id;

    const addFavoriteMutation = useAddCaseToFavorite();
    const deleteFavoriteMutation = useDeleteFavoriteCase();

    const progress = useMemo(() => {
        const collected = Number(item?.collectedAmount || item?.currentAmount || item?.collected || 0);
        const target = Number(item?.targetAmount || item?.goalAmount ||item?.target|| 0);

        if (!target || target <= 0) return 0;
        return Math.min((collected / target) * 100, 100);
    }, [item?.collectedAmount, item?.currentAmount, item?.targetAmount, item?.goalAmount]);

    const isUrgent =
        item?.priority === "High" || item?.priority === "Critical";

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("ar-EG").format(Number(value || 0));
    };

    const isFavoriteLoading =
        addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;


    const handleFavoriteClick = () => {
        if (onFavoriteToggle) {
            onFavoriteToggle(item);
            return;
        }

        if (isFavorite) {
            if (!item?.donorId || !item?.caseId) return;

            deleteFavoriteMutation.mutate({
                donorId: item.donorId,
                caseId: item.caseId,
            });
        } else {
            if (!donorId || !item?.id) return;

            addFavoriteMutation.mutate({
                donorId,
                caseId: item.id,
            });
        }
    };
    const resolvedCaseId = item?.caseId || item?.id;
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="group bg-white dark:bg-slate-900 rounded-[1.75rem] overflow-hidden border border-slate-200/70 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            dir="rtl"
        >
            <div className="relative h-44 overflow-hidden">
                <img
                    src={item?.coverImageUrl || item?.imageUrl}
                    alt={item?.title || item?.caseTitle || "صورة الحالة"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                <div className="absolute top-3 right-3 flex flex-wrap gap-2 max-w-[85%]">
                    {isUrgent && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-[10px] font-black rounded-full shadow-md">
                            <Timer size={11} />
                            {item?.priority === "Critical" ? "حرجة" : "مستعجلة"}
                        </span>
                    )}

                    {item?.categoryName && (
                        <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full border border-white/10">
                            {item.categoryName}
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shrink-0">
                        <Building2
                            size={14}
                            className="text-indigo-600 dark:text-indigo-400"
                        />
                    </div>

                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate">
                        {item?.charityName || "جمعية غير محددة"}
                    </span>
                </div>

                <h3 className="text-base font-black text-slate-800 dark:text-white leading-6 line-clamp-2 min-h-[48px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item?.title || item?.caseTitle || "عنوان الحالة"}
                </h3>

                <div className="rounded-[1.25rem] bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 p-3 space-y-2.5">
                    <div className="flex items-center justify-between gap-3 text-sm">
                        <div>
                            <p className="text-[15px] dark:text-white text-slate-950 font-black mb-1">
                                تم جمع
                            </p>
                            <p className="text-indigo-600 font-bold dark:text-indigo-400 text-lg">
                                {formatCurrency(item?.collectedAmount || item?.currentAmount || item?.collected)} ج.م
                            </p>
                        </div>

                        <div className="text-left">
                            <p className="text-[15px] dark:text-white text-slate-700 font-black mb-1">
                                المستهدف
                            </p>
                            <p className="font-bold text-slate-800 dark:text-slate-300 text-lg">
                                {formatCurrency(item?.targetAmount || item?.goalAmount || item?.target)} ج.م
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                            نسبة التقدم
                        </span>
                        <span className="text-[11px] font-black text-slate-800 dark:text-white">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="relative h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                            className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-indigo-600 via-indigo-500 to-orange-400"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <button
                        title={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                        onClick={handleFavoriteClick}
                        disabled={isFavoriteLoading}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all disabled:opacity-60
                            ${isFavorite
                                ? "border-red-200 bg-red-50 text-red-500"
                                : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-500 hover:text-red-500 hover:border-red-200"
                            }`}
                    >
                        {isFavoriteLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Heart
                                size={18}
                                className={isFavorite ? "fill-current" : ""}
                            />
                        )}
                    </button>

                    {!hideDetailsButton && (
                        <button
                            title="عرض التفاصيل"
                            onClick={() => navigate(`/case/${resolvedCaseId}`)}
                            className="flex-1 h-10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-black rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-xs"
                        >
                            التفاصيل
                        </button>
                    )}

                    {!hideDonateButton && (
                        <Button
                            onClick={() => navigate(`/case/${resolvedCaseId}/donate`)}
                            className="flex-[1.3] h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all duration-300 text-xs shadow-md shadow-indigo-600/20"
                        >
                            تبرع الآن
                            <Heart size={14} />
                        </Button>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default CaseCard;