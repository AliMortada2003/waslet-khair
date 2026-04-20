import React, { useMemo } from "react";
import {
    Heart, Gift, Wallet, TrendingUp,
    RefreshCw, Star, Clock, Target, ArrowUpRight, Sparkles
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../hocks/useAuthHocks"; // لجب بيانات المتبرع الحالي
import { useGetAllDonations } from "../../hocks/useHoksDonation";
import StatCard from './../../components/ui/cards/StatCard';
import ChartContainer from './../../components/ui/charts/ChartContainer';
import LineChart from './../../components/ui/charts/LineChart';
import PieChart from './../../components/ui/charts/PieChart';

function DonorDashboard() {
    const { isDark } = useTheme();
    const { data: userData } = useUser();

    // جلب كل التبرعات وفلترتها للمتبرع الحالي فقط
    const { data: allDonations = [], isLoading, refetch } = useGetAllDonations();

    const donorId = userData?.user?.id;

    // 🧮 معالجة بيانات المتبرع
    const donorStats = useMemo(() => {
        const myDonations = allDonations.filter(d => d.donorId === donorId);

        const totalPaid = myDonations.reduce((acc, curr) => acc + (curr.amount || 0), 0);
        const uniqueCharities = new Set(myDonations.map(d => d.charityId)).size;

        return {
            totalPaid: `${totalPaid.toLocaleString()} ج.م`,
            donationsCount: myDonations.length,
            supportedCharities: uniqueCharities,
            impactScore: Math.floor(totalPaid / 100), // مثال لحساب نقاط الأثر
            lastDonation: myDonations.length > 0 ? new Date(myDonations[0].createdAt).toLocaleDateString('ar-EG') : '---'
        };
    }, [allDonations, donorId]);

    const statsCards = useMemo(() => [
        {
            title: "إجمالي عطائك",
            value: donorStats.totalPaid,
            subtext: "مبالغ تبرعت بها",
            icon: Wallet,
            accent: isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-600 text-white",
            change: "جزاك الله خيراً",
            changeType: "increase",
        },
        {
            title: "عدد المساهمات",
            value: donorStats.donationsCount,
            subtext: "وصلة خير قدمتها",
            icon: Heart,
            accent: isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-500 text-white",
            change: "مستمر",
            changeType: "increase",
        },
        {
            title: "جمعيات دعمتها",
            value: donorStats.supportedCharities,
            subtext: "مؤسسة وصلت لها",
            icon: Star,
            accent: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white",
        },
        {
            title: "نقاط الأثر",
            value: donorStats.impactScore,
            subtext: "مستوى الأثر المجتمعي",
            icon: Sparkles,
            accent: isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-500 text-white",
            change: "رائع",
            changeType: "increase",
        }
    ], [isDark, donorStats]);

    if (isLoading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                <p className="text-slate-500 font-bold">جاري تجهيز تقرير الخير الخاص بك...</p>
            </div>
        );
    }

    return (
        <div dir="rtl" className="space-y-6 animate-in fade-in duration-700">

            {/* Header الترحيبي للمتبرع */}
            <div className={`relative overflow-hidden p-8 rounded-[2.5rem] border shadow-sm
                ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>

                {/* لمسة ديكورية برتقالية خلفية */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 rounded-br-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className={`text-3xl font-black flex items-center gap-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                            <Gift className="text-orange-500" />
                            مرحباً بك، {userData?.user?.firstName || "فاعل الخير"}
                        </h1>
                        <p className={`text-sm mt-2 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            "ما نقص مالٌ من صدقة" - إليك ملخص لأثر تبرعاتك في وصلة خير.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <div className="hidden md:flex flex-col items-end px-4 border-r border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">آخر تبرع</span>
                            <span className="text-sm font-bold text-indigo-500">{donorStats.lastDonation}</span>
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 text-white font-black hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25 active:scale-95"
                        >
                            <RefreshCw size={18} /> تحديث البيانات
                        </button>
                    </div>
                </div>
            </div>

            {/* الإحصائيات الأربعة الرئيسية */}
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((item, idx) => (
                    <StatCard key={idx} {...item} isDark={isDark} />
                ))}
            </section>

            {/* الرسوم البيانية */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* رسم بياني لمساهمات المتبرع الشهرية */}
                <div className="lg:col-span-2">
                    <ChartContainer title="تطور تبرعاتك الشهرية" icon={TrendingUp} height={350}>
                        <LineChart
                            data={[
                                { name: 'يناير', تبرعاتي: 400 },
                                { name: 'فبراير', تبرعاتي: 800 },
                                { name: 'مارس', تبرعاتي: 1200 },
                                { name: 'أبريل', تبرعاتي: 950 },
                            ]}
                            xAxisDataKey="name"
                            lines={[
                                { dataKey: "تبرعاتي", color: "#f97316" }, // Orange لبيانات المتبرع
                            ]}
                        />
                    </ChartContainer>
                </div>

                {/* توزيع التبرعات حسب مجالات الخير */}
                <ChartContainer title="أين ذهب خيرك؟" icon={Target} height={350}>
                    <PieChart
                        data={[
                            { name: 'كفالة أيتام', value: 50, color: '#4f46e5' },
                            { name: 'مساعدات طبية', value: 30, color: '#f97316' },
                            { name: 'إطعام', value: 20, color: '#10b981' },
                        ]}
                    />
                </ChartContainer>
            </div>
        </div>
    );
}

export default DonorDashboard;