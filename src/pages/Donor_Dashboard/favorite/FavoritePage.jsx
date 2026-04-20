import React, { useMemo, useState } from "react";
import {
    Search,
    Heart,
    Loader2,
    AlertCircle,
    CheckCircle,
    Clock,
    Sparkles,
} from "lucide-react";

import PageHeader from "../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import CasesFilters from "../../SuperAdminDashboard/cases/CasesFilters";
import StatCard from "../../../components/ui/cards/StatCard";

import { useUser } from "../../../hocks/useAuthHocks";
import { useGetFavoriteCasesByDonorId } from "../../../hocks/useFavoriteHooks";
import { useGetCategories } from "../../../hocks/useCategoriesHocks";
import CaseCard from "../../../components/cards/CaseCard";

const FavoritePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("grid");

    const { data: userData } = useUser();
    const donorId = userData?.user?.id;

    const {
        data: favoriteCases = [],
        isLoading,
        isError,
        error,
    } = useGetFavoriteCasesByDonorId(donorId);
    console.log(favoriteCases)
    const { data: categories = [] } = useGetCategories();

    const normalizedFavoriteCases = useMemo(() => {
        return favoriteCases.map((item) => ({
            ...item,
            collectedAmount: item.collectedAmount ?? item.currentAmount ?? 0,
            targetAmount: item.targetAmount ?? item.goalAmount ?? 0,
            coverImageUrl: item.coverImageUrl ?? item.imageUrl ?? "",
        }));
    }, [favoriteCases]);

    const stats = useMemo(() => {
        const total = normalizedFavoriteCases.length;

        const completed = normalizedFavoriteCases.filter(
            (c) =>
                c.isCompleted ||
                (Number(c.collectedAmount) >= Number(c.targetAmount) &&
                    Number(c.targetAmount) > 0)
        ).length;

        const active = total - completed;

        const nearlyCompleted = normalizedFavoriteCases.filter((c) => {
            const target = Number(c.targetAmount || 0);
            const collected = Number(c.collectedAmount || 0);

            if (!target || target <= 0) return false;

            const progress = (collected / target) * 100;
            return progress >= 70 && progress < 100;
        }).length;

        return [
            {
                title: "الحالات المفضلة",
                value: total,
                subtext: "إجمالي الحالات المحفوظة",
                icon: Heart,
                accent: "bg-rose-500",
                change: "مهم",
                changeType: "increase",
            },
            {
                title: "حالات نشطة",
                value: active,
                subtext: "ما زالت تستقبل التبرعات",
                icon: Clock,
                accent: "bg-amber-500",
                change: "متاحة",
                changeType: "neutral",
            },
            {
                title: "حالات مكتملة",
                value: completed,
                subtext: "تم الوصول لهدفها",
                icon: CheckCircle,
                accent: "bg-emerald-500",
                change: "مكتملة",
                changeType: "increase",
            },
            {
                title: "قريبة من الاكتمال",
                value: nearlyCompleted,
                subtext: "فرص لصناعة أثر أسرع",
                icon: Sparkles,
                accent: "bg-indigo-600",
                change: "مميزة",
                changeType: "info",
            },
        ];
    }, [normalizedFavoriteCases]);

    const filteredCases = useMemo(() => {
        let result = [...normalizedFavoriteCases];
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            result = result.filter(
                (item) =>
                    item.title?.toLowerCase().includes(query) ||
                    item.description?.toLowerCase().includes(query) ||
                    item.charityName?.toLowerCase().includes(query)
            );
        }
        return result;
    }, [normalizedFavoriteCases, searchQuery]);

    return (
        <div
            className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700"
            dir="rtl"
        >
            <PageHeader
                title="الحالات المفضلة"
                subtitle="كل الحالات التي قمت بحفظها للرجوع إليها بسهولة لاحقًا"
                icon={Heart}
                breadcrumb="لوحة المتبرع / الحالات المفضلة"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 mt-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="space-y-4 mb-8">
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="ابحث داخل الحالات المفضلة..."
                    viewType={viewType}
                    setViewType={setViewType}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                    <p className="text-slate-500 font-black">
                        جاري تحميل الحالات المفضلة...
                    </p>
                </div>
            ) : isError ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                        حدث خطأ أثناء تحميل المفضلة
                    </h3>
                    <p className="text-slate-500 text-sm">
                        {error?.message || "تعذر تحميل البيانات حالياً"}
                    </p>
                </div>
            ) : (
                <div
                    className={`grid gap-6 transition-all duration-500 ${viewType === "grid"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1"
                        }`}
                >
                    {filteredCases.map((item, index) => (
                        <CaseCard
                            key={item.id}
                            item={item}
                            index={index}
                            isFavorite={true}
                        />
                    ))}

                    {filteredCases.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                            <Search size={40} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-black text-slate-400">
                                لا توجد حالات في المفضلة حالياً
                            </h3>
                            <p className="text-sm text-slate-400 mt-2">
                                ابدأ بحفظ الحالات المهمة لك لتظهر هنا
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FavoritePage;