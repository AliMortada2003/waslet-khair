import React, { useMemo } from "react";
import {
    Heart, HandHelping, LayoutGrid, TrendingUp,
    RefreshCw, CheckCircle2, AlertCircle, Wallet, ArrowUpRight
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useGetCasesByCharityId } from './../../hocks/useCaseHooks';
import StatCard from './../../components/ui/cards/StatCard';
import ChartContainer from './../../components/ui/charts/ChartContainer';
import LineChart from './../../components/ui/charts/LineChart';
import PieChart from './../../components/ui/charts/PieChart';
import { useUser } from "../../hocks/useAuthHocks";

function AdminDashboard() {
    const { isDark } = useTheme();
    const { data: userData } = useUser();
    const user = userData?.user;

    const charityId = user?.charityId;

    // جلب الحالات الخاصة بهذه الجمعية فقط
    const { 
        data: cases = [], 
        isLoading: isCasesLoading, 
        refetch: refetchCases 
    } = useGetCasesByCharityId(charityId);

    console.log(cases)
    // 🧮 معالجة البيانات الخاصة بالجمعية
    const statsData = useMemo(() => {
        // 1. حساب إجمالي التبرعات التي تم جمعها داخل حالات هذه الجمعية
        const totalCollected = cases.reduce((acc, curr) => acc + (curr.collectedAmount || 0), 0);

        // 2. الحالات التي اكتمل تمويلها بنسبة 100%
        const completedCases = cases.filter(c => c.status === "Completed" || c.raisedAmount >= c.goalAmount).length;

        // 3. حالات حرجة جداً
        const criticalCases = cases.filter(c => c.priority === "Critical").length;

        // 4. الحالات النشطة حالياً
        const activeCases = cases.filter(c => c.status === "Active").length;

        return {
            totalAmount: `${totalCollected.toLocaleString()} ج.م`,
            activeCases,
            completedCases,
            criticalCases,
            totalCases: cases.length,
            // يمكن حساب النسبة العامة للإنجاز في الجمعية
            overallProgress: cases.length > 0 
                ? Math.round((cases.filter(c => c.status === "Completed").length / cases.length) * 100) 
                : 0
        };
    }, [cases]);

    const statsCards = useMemo(() => [
        {
            title: "إجمالي ما تم جمعه",
            value: statsData.totalAmount,
            subtext: "إجمالي تبرعات حالاتنا",
            icon: Wallet,
            accent: isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-600 text-white",
        },
        {
            title: "إجمالي الحالات",
            value: statsData.totalCases,
            subtext: "جميع الحالات المسجلة",
            icon: LayoutGrid,
            accent: isDark ? "bg-slate-500/20 text-slate-400" : "bg-slate-700 text-white",
        },
        {
            title: "الحالات النشطة",
            value: statsData.activeCases,
            subtext: "تنتظر دعم المتبرعين",
            icon: HandHelping,
            accent: isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-500 text-white",
            path: "/admin/cases",
        },
        {
            title: "حالات حرجة",
            value: statsData.criticalCases,
            subtext: "تحتاج تمويل فوري",
            icon: AlertCircle,
            accent: isDark ? "bg-rose-500/20 text-rose-400" : "bg-rose-600 text-white",
        },
        {
            title: "حالات مكتملة",
            value: statsData.completedCases,
            subtext: "تم إغلاقها بنجاح",
            icon: CheckCircle2,
            accent: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white",
        },
        {
            title: "نسبة الإنجاز",
            value: `${statsData.overallProgress}%`,
            subtext: "معدل الحالات المنتهية",
            icon: TrendingUp,
            accent: isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-600 text-white",
        }
    ], [isDark, statsData]);

    if (isCasesLoading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-bold">جاري تحميل بيانات الجمعية...</p>
            </div>
        );
    }

    return (
        <div dir="rtl" className="space-y-6 animate-in fade-in duration-700">
            {/* Header */}
            <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-8 rounded-[2.5rem] border shadow-sm
                ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                <div>
                    <h1 className={`text-3xl font-black flex items-center gap-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                        <Heart className="text-orange-500 animate-pulse" fill="currentColor" />
                        لوحة تحكم الجمعية
                    </h1>
                    <p className={`text-sm mt-2 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        أهلاً بك، إليك ملخص أداء الحالات التابعة لجمعيتك اليوم.
                    </p>
                </div>
                <button
                    onClick={() => refetchCases()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                >
                    <RefreshCw size={18} /> تحديث البيانات
                </button>
            </div>

            {/* Stats Grid */}
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statsCards.map((item, idx) => (
                    <StatCard key={idx} {...item} isDark={isDark} />
                ))}
            </section>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartContainer title="تحليل تمويل الحالات (ج.م)" icon={ArrowUpRight} height={350}>
                        <LineChart
                            data={cases.slice(0, 7).map(c => ({
                                name: c.title.substring(0, 10) + '...',
                                المطلوب: c.goalAmount,
                                المجموع: c.raisedAmount
                            }))}
                            xAxisDataKey="name"
                            lines={[
                                { dataKey: "المجموع", color: "#10b981" }, // أخضر للمبالغ المحصلة
                                { dataKey: "المطلوب", color: "#6366f1" }, // بنفسجي للهدف
                            ]}
                        />
                    </ChartContainer>
                </div>

                <div className="lg:col-span-1">
                    <ChartContainer title="توزيع الحالات حسب النوع" icon={HandHelping} height={350}>
                        <PieChart
                            data={[
                                { name: 'نشطة', value: statsData.activeCases, color: '#f97316' },
                                { name: 'مكتملة', value: statsData.completedCases, color: '#10b981' },
                                { name: 'حرجة', value: statsData.criticalCases, color: '#ef4444' },
                            ]}
                        />
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;