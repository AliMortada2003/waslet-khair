import React from "react";
import { Heart, ArrowUpLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { useUser } from "../../../hocks/useAuthHocks";
import { useDeleteFavoriteCase } from "../../../hocks/useFavoriteHooks";

const FavoriteCaseCard = ({ item, viewType = "grid" }) => {
    const { isDark } = useTheme();
    const { data: userData } = useUser();
    const donorId = userData?.user?.id;

    const deleteFavoriteMutation = useDeleteFavoriteCase();

    const progress = item.goalAmount
        ? Math.min(Math.round((item.currentAmount / item.goalAmount) * 100), 100)
        : 0;

    const handleRemove = () => {
        if (!donorId || !item?.id) return;

        deleteFavoriteMutation.mutate({
            donorId,
            caseId: item.id,
        });
    };

    return (
        <div
            className={`group overflow-hidden rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
            ${isDark
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-100"
                }
            ${viewType === "list" ? "flex flex-col md:flex-row" : ""}`}
        >
            <div className={`${viewType === "list" ? "md:w-72 shrink-0" : "w-full"}`}>
                <img
                    src={item.imageUrl || "/placeholder-case.jpg"}
                    alt={item.title}
                    className={`w-full object-cover ${viewType === "list" ? "h-full md:h-full" : "h-52"
                        }`}
                />
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <h3
                            className={`text-lg font-black line-clamp-1 ${isDark ? "text-white" : "text-slate-800"
                                }`}
                        >
                            {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                            {item.categoryName || "حالة إنسانية"}
                        </p>
                    </div>

                    <button
                        onClick={handleRemove}
                        disabled={deleteFavoriteMutation.isPending}
                        className="shrink-0 p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition disabled:opacity-60"
                        title="إزالة من المفضلة"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <p
                    className={`text-sm leading-7 line-clamp-3 mb-4 ${isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                >
                    {item.description}
                </p>

                <div className="mb-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-slate-400">نسبة التقدم</span>
                        <span className="text-orange-500">{progress}%</span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-l from-orange-500 to-indigo-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-3 text-xs">
                        <span className="text-slate-400">
                            تم جمع: {item.currentAmount?.toLocaleString()} ج.م
                        </span>
                        <span className="text-slate-400">
                            الهدف: {item.goalAmount?.toLocaleString()} ج.م
                        </span>
                    </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                    <Link
                        to={`/cases/${item.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        عرض الحالة
                        <ArrowUpLeft size={16} />
                    </Link>

                    <Link
                        to={`/cases/${item.id}/donate`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-black text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
                    >
                        <Heart size={16} />
                        تبرع الآن
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCaseCard;