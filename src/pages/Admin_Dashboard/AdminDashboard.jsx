import React, { useMemo } from "react";
import {
    Heart,
    HandHelping,
    LayoutGrid,
    TrendingUp,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Wallet,
    ArrowUpRight,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useGetCasesByCharityId } from "../../hocks/useCaseHooks";
import StatCard from "../../components/ui/cards/StatCard";
import ChartContainer from "../../components/ui/charts/ChartContainer";
import LineChart from "../../components/ui/charts/LineChart";
import PieChart from "../../components/ui/charts/PieChart";
import { useUser } from "../../hocks/useAuthHocks";
import { useGetCharityDetails } from "../../hocks/useCharityHooks";

function AdminDashboard() {
    const { isDark } = useTheme();
    const { data: userData } = useUser();
    const user = userData?.user;
    const charityId = user?.charityId;

    const {
        data: charity,
        isLoading: isCharityLoading,
        isError: isCharityError,
        refetch: refetchCharity,
        isFetching: isCharityFetching,
    } = useGetCharityDetails(charityId);

    const {
        data: cases = [],
        isLoading: isCasesLoading,
        isError: isCasesError,
        refetch: refetchCases,
        isFetching: isCasesFetching,
    } = useGetCasesByCharityId(charityId);

    console.log(charity)
    const normalizedCases = useMemo(() => {
        if (!Array.isArray(cases)) return [];

        return cases.map((item) => ({
            ...item,
            title: item.title || item.caseTitle || "بدون عنوان",
            collectedAmount: Number(
                item.collectedAmount ?? item.raisedAmount ?? item.currentAmount ?? 0
            ),
            targetAmount: Number(
                item.targetAmount ?? item.goalAmount ?? 0
            ),
            status: item.status || "",
            priority: item.priority || "",
        }));
    }, [cases]);

    const statsData = useMemo(() => {
        const totalCollected = Number(
            charity?.totalCollectedAmount ??
            charity?.totalRaisedAmount
        );

        const completedCases = normalizedCases.filter(
            (c) =>
                c.status === "Completed" ||
                (c.targetAmount > 0 && c.collectedAmount >= c.targetAmount)
        ).length;

        const criticalCases = normalizedCases.filter(
            (c) => c.priority === "Critical"
        ).length;

        const activeCases = normalizedCases.filter(
            (c) => c.status === "Active"
        ).length;

        const totalDonors = charity?.totalDonorsCount
        return {
            totalAmount: `${totalCollected.toLocaleString("ar-EG")} ج.م`,
            activeCases,
            completedCases,
            totalDonors,
            criticalCases,
            totalProjectsCount: normalizedCases.length,
            overallProgress:
                normalizedCases.length > 0
                    ? Math.round((completedCases / normalizedCases.length) * 100)
                    : 0,
        };
    }, [normalizedCases, charity]);

    const statsCards = useMemo(
        () => [
            {
                title: "إجمالي ما تم جمعه",
                value: statsData.totalAmount,
                subtext: "إجمالي التبرعات الخاصة بالجمعية",
                icon: Wallet,
                accent: isDark
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "bg-indigo-600 text-white",
            },
            {
                title: "إجمالي الحالات",
                value: statsData.totalProjectsCount,
                subtext: "جميع الحالات المسجلة",
                icon: LayoutGrid,
                accent: isDark
                    ? "bg-slate-500/20 text-slate-400"
                    : "bg-slate-700 text-white",
            },
            {
                title: "الحالات النشطة",
                value: statsData.activeCases,
                subtext: "تنتظر دعم المتبرعين",
                icon: HandHelping,
                accent: isDark
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-orange-500 text-white",
                path: "/admin/cases",
            },
            {
                title: "حالات حرجة",
                value: statsData.criticalCases,
                subtext: "تحتاج تمويل فوري",
                icon: AlertCircle,
                accent: isDark
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-rose-600 text-white",
            },
            {
                title: "حالات مكتملة",
                value: statsData.completedCases,
                subtext: "تم إغلاقها بنجاح",
                icon: CheckCircle2,
                accent: isDark
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-500 text-white",
            },
            {
                title: "عدد المتبرعين",
                value: `${statsData.totalDonors}`,
                subtext: "معدل الحالات المنتهية",
                icon: TrendingUp,
                accent: isDark
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-cyan-600 text-white",
            },
        ],
        [isDark, statsData]
    );

    const lineChartData = useMemo(() => {
        return normalizedCases.slice(0, 7).map((c) => ({
            name: c.title.length > 10 ? `${c.title.substring(0, 10)}...` : c.title,
            المطلوب: c.targetAmount,
            المجموع: c.collectedAmount,
        }));
    }, [normalizedCases]);

    const pieChartData = useMemo(() => {
        return [
            { name: "نشطة", value: statsData.activeCases, color: "#f97316" },
            { name: "مكتملة", value: statsData.completedCases, color: "#10b981" },
            { name: "حرجة", value: statsData.criticalCases, color: "#ef4444" },
        ].filter((item) => item.value > 0);
    }, [statsData]);

    const isLoading = isCasesLoading || isCharityLoading;
    const isError = isCasesError || isCharityError;
    const isRefreshing = isCasesFetching || isCharityFetching;

    const handleRefresh = () => {
        refetchCases();
        refetchCharity();
    };

    if (isLoading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-bold">
                    جاري تحميل بيانات الجمعية...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-20 flex flex-col items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
                <p className="text-slate-500 font-bold">
                    حدث خطأ أثناء تحميل بيانات الجمعية
                </p>
            </div>
        );
    }

    return (
        <div dir="rtl" className="space-y-6 animate-in fade-in duration-700">
            <div
                className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-8 rounded-[2.5rem] border shadow-sm ${isDark
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-100"
                    }`}
            >
                <div>
                    <h1
                        className={`text-3xl font-black flex items-center gap-3 ${isDark ? "text-white" : "text-slate-800"
                            }`}
                    >
                        <Heart className="text-orange-500 animate-pulse" fill="currentColor" />
                        لوحة تحكم الجمعية
                    </h1>
                    <p
                        className={`text-sm mt-2 font-medium ${isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                    >
                        أهلاً بك، إليك ملخص أداء الحالات التابعة لجمعيتك اليوم.
                    </p>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <RefreshCw
                        size={18}
                        className={isRefreshing ? "animate-spin" : ""}
                    />
                    تحديث البيانات
                </button>
            </div>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statsCards.map((item, idx) => (
                    <StatCard key={idx} {...item} isDark={isDark} />
                ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartContainer
                        title="تحليل تمويل الحالات (ج.م)"
                        icon={ArrowUpRight}
                        height={350}
                    >
                        <LineChart
                            data={lineChartData}
                            xAxisDataKey="name"
                            lines={[
                                { dataKey: "المجموع", color: "#10b981" },
                                { dataKey: "المطلوب", color: "#6366f1" },
                            ]}
                        />
                    </ChartContainer>
                </div>

                <div className="lg:col-span-1">
                    <ChartContainer
                        title="توزيع الحالات حسب النوع"
                        icon={HandHelping}
                        height={350}
                    >
                        <PieChart data={pieChartData} />
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;