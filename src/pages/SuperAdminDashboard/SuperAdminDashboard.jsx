import React, { useMemo } from "react";
import {
    Heart, HandHelping, Users, LayoutGrid, TrendingUp,
    RefreshCw, CheckCircle2, AlertCircle, Wallet, Globe, ArrowUpRight
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useGetAllDonations } from "../../hocks/useHoksDonation";
import { useGetCases } from './../../hocks/useCaseHooks';
import { useGetCharities } from './../../hocks/useCharityHooks';
import StatCard from './../../components/ui/cards/StatCard';
import ChartContainer from './../../components/ui/charts/ChartContainer';
import LineChart from './../../components/ui/charts/LineChart';
import PieChart from './../../components/ui/charts/PieChart';

function SuperAdminDashboard() {
    const { isDark } = useTheme();
    
    // جلب البيانات الفعلية
    const { data: donations = [], isLoading: isDonationsLoading, refetch: refetchDonations } = useGetAllDonations();
    const { data: cases = [], isLoading: isCasesLoading } = useGetCases();
    const { data: charities = [], isLoading: isCharitiesLoading } = useGetCharities();

    console.log(cases)
    // 🧮 معالجة البيانات لمشروع "وصلة خير"
    const statsData = useMemo(() => {
        // 1. إجمالي التبرعات (Sum)
        const totalAmount = donations.reduce((acc, curr) => acc + (curr.amount || 0), 0);
        
        // 2. حالات مكتملة (تم جمع التبرعات لها)
        const completedCases = cases.filter(c => c.status === "Completed").length;
        
        // 3. حالات عاجلة (نسبة الإنجاز فيها قليلة أو محددة كـ Urgent)
        const urgentCases = cases.filter(c => c.isUrgent || c.status === "Urgent").length;

        // 4. عدد المتبرعين الفريدين
        const uniqueDonors = new Set(donations.map(d => d.donorId)).size;

        return {
            totalAmount: `${totalAmount.toLocaleString()} ج.م`,
            activeCases: cases.filter(c => c.status === "Active").length,
            completedCases,
            urgentCases,
            totalDonors: uniqueDonors,
            charitiesCount: charities.length,
            recentDonationsCount: donations.filter(d => {
                const dDate = new Date(d.createdAt);
                const today = new Date();
                return dDate.toDateString() === today.toDateString();
            }).length
        };
    }, [donations, cases, charities]);

    const statsCards = useMemo(() => [
        {
            title: "إجمالي التبرعات",
            value: statsData.totalAmount,
            subtext: "مبالغ تم جمعها",
            icon: Wallet,
            accent: isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-600 text-white",
            change: "+12% النمو",
            changeType: "increase",
        },
        {
            title: "الحالات النشطة",
            value: statsData.activeCases,
            subtext: "تحتاج دعم الآن",
            icon: HandHelping,
            accent: isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-500 text-white",
            change: "مباشر",
            changeType: "increase",
            path: "/admin/cases",
        },
        {
            title: "المتبرعون",
            value: statsData.totalDonors,
            subtext: "فاعل خير مسجل",
            icon: Users,
            accent: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white",
            change: "ثقة",
            changeType: "increase",
        },
        {
            title: "حالات عاجلة",
            value: statsData.urgentCases,
            subtext: "تتطلب تدخل سريع",
            icon: AlertCircle,
            accent: isDark ? "bg-rose-500/20 text-rose-400" : "bg-rose-600 text-white",
            change: "تنبيه",
            changeType: "warning",
        },
        {
            title: "الجمعيات الشريكة",
            value: statsData.charitiesCount,
            subtext: "مؤسسة معتمدة",
            icon: Globe,
            accent: isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-600 text-white",
            path: "/admin/charities",
        },
        {
            title: "حالات اكتملت",
            value: statsData.completedCases,
            subtext: "وصلت لمستحقيها",
            icon: CheckCircle2,
            accent: isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-500 text-white",
            change: "إنجاز",
            changeType: "increase",
        },
        {
            title: "تبرعات اليوم",
            value: statsData.recentDonationsCount,
            subtext: "عملية تبرع جديدة",
            icon: TrendingUp,
            accent: isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-500 text-white",
        },
        {
            title: "تصنيفات الخير",
            value: "8",
            subtext: "مجالات المساعدة",
            icon: LayoutGrid,
            accent: isDark ? "bg-slate-500/20 text-slate-400" : "bg-slate-700 text-white",
        }
    ], [isDark, statsData]);

    if (isDonationsLoading || isCasesLoading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-bold">جاري تحميل بيانات وصلة خير...</p>
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
                        لوحة تحكم وصلة خير
                    </h1>
                    <p className={`text-sm mt-2 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        أهلاً بك يا أستاذ علي، إليك تقرير الأثر المجتمعي اليوم.
                    </p>
                </div>
                <button
                    onClick={() => refetchDonations()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                >
                    <RefreshCw size={18} /> تحديث الإحصائيات
                </button>
            </div>

            {/* 8 Stats Grid */}
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((item, idx) => (
                    <StatCard key={idx} {...item} isDark={isDark} />
                ))}
            </section>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartContainer title="معدل نمو التبرعات (أسبوعي)" icon={ArrowUpRight} height={350}>
                        <LineChart
                            data={[
                                { name: 'السبت', تبرعات: 1500 },
                                { name: 'الأحد', تبرعات: 3200 },
                                { name: 'الاثنين', تبرعات: 2100 },
                                { name: 'الثلاثاء', تبرعات: 4500 },
                                { name: 'الأربعاء', تبرعات: 3800 },
                            ]}
                            xAxisDataKey="name"
                            lines={[
                                { dataKey: "تبرعات", color: "#4f46e5" }, // Indigo
                            ]}
                        />
                    </ChartContainer>
                </div>
                
                <ChartContainer title="توزيع ميزانية الحالات" icon={HandHelping} height={350}>
                    <PieChart
                        data={[
                            { name: 'حالات طبية', value: 40, color: '#4f46e5' }, // Indigo
                            { name: 'تعليم', value: 25, color: '#f97316' },     // Orange
                            { name: 'إطعام', value: 20, color: '#10b981' },     // Emerald
                            { name: 'غارمين', value: 15, color: '#6366f1' }, 
                        ]}
                    />
                </ChartContainer>
            </div>
        </div>
    );
}

export default SuperAdminDashboard;