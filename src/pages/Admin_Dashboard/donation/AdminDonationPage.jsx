import React, { useMemo, useState } from "react";
import {
    Search,
    Wallet,
    Loader2,
    AlertCircle,
    CheckCircle,
    Clock,
    HandHeart,
    Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import StatCard from "../../../components/ui/cards/StatCard";

import { useUser } from "../../../hocks/useAuthHocks";
import { useGetAllDonationsToCharity } from "../../../hocks/useHoksDonation";

const AdminDonationPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("table");
    const navigate = useNavigate();

    const { data: userData } = useUser();
    const user = userData?.user;
    const charityId = user?.charityId;

    const {
        data: donations = [],
        isLoading,
        isError,
        error,
    } = useGetAllDonationsToCharity(charityId);

    const stats = useMemo(() => {
        const totalDonations = donations.length;

        const totalAmount = donations.reduce(
            (sum, item) => sum + Number(item.amount || 0),
            0
        );

        const supportedCases = new Set(
            donations.map((item) => Number(item.caseId))
        ).size;

        const recentDonations = donations.filter((item) => {
            if (!item.paidAt) return false;

            const paidDate = new Date(item.paidAt);
            const now = new Date();
            const diffDays =
                (now.getTime() - paidDate.getTime()) / (1000 * 60 * 60 * 24);

            return diffDays <= 30;
        }).length;

        return [
            {
                title: "إجمالي العمليات",
                value: totalDonations,
                subtext: "عدد عمليات التبرع الخاصة بالجمعية",
                icon: Wallet,
                accent: "bg-indigo-600",
                change: "إجمالي",
                changeType: "increase",
            },
            {
                title: "إجمالي المبالغ",
                value: `${new Intl.NumberFormat("ar-EG").format(totalAmount)} ج.م`,
                subtext: "إجمالي قيمة التبرعات",
                icon: HandHeart,
                accent: "bg-emerald-500",
                change: "مبالغ",
                changeType: "increase",
            },
            {
                title: "الحالات المدعومة",
                value: supportedCases,
                subtext: "عدد الحالات التي وصلتها تبرعات",
                icon: CheckCircle,
                accent: "bg-amber-500",
                change: "حالات",
                changeType: "neutral",
            },
            {
                title: "تبرعات حديثة",
                value: recentDonations,
                subtext: "خلال آخر 30 يوم",
                icon: Clock,
                accent: "bg-rose-500",
                change: "حديثة",
                changeType: "info",
            },
        ];
    }, [donations]);

    const filteredDonations = useMemo(() => {
        let result = [...donations];
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            result = result.filter((item) =>
                item.caseName?.toLowerCase().includes(query)
            );
        }

        return result.sort(
            (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
        );
    }, [donations, searchQuery]);

    const formatCurrency = (value) =>
        new Intl.NumberFormat("ar-EG").format(Number(value || 0));

    const formatDate = (value) => {
        if (!value) return "غير متوفر";
        return new Date(value).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div
            className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700"
            dir="rtl"
        >
            <PageHeader
                title="تبرعات الجمعية"
                subtitle="استعرض جميع عمليات التبرع الخاصة بالجمعية بشكل منظم وواضح"
                icon={Wallet}
                breadcrumb="لوحة الجمعية / التبرعات"
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
                    placeholder="ابحث باسم الحالة..."
                    viewType={viewType}
                    setViewType={setViewType}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                    <p className="text-white font-black">
                        جاري تحميل التبرعات...
                    </p>
                </div>
            ) : isError ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                        حدث خطأ أثناء تحميل التبرعات
                    </h3>
                    <p className="text-white text-sm">
                        {error?.message || "تعذر تحميل البيانات حالياً"}
                    </p>
                </div>
            ) : filteredDonations.length === 0 ? (
                <div className="py-20 text-center bg-white dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                    <Search size={40} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-black text-slate-400">
                        لا توجد تبرعات حالياً
                    </h3>
                    <p className="text-sm text-slate-400 mt-2">
                        ستظهر هنا كل عمليات التبرع الخاصة بالجمعية
                    </p>
                </div>
            ) : (
                <div className="overflow-scroll rounded-[2rem] border border-slate-200/70 dark:border-white/10 max-h-[80vh] bg-white dark:bg-slate-900 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] bg-cyan-100 dark:bg-white/10">
                            <thead className="bg-indigo-800">
                                <tr className="text-center">
                                    <th className="px-5 py-6 text-sm font-black text-white">
                                        رقم العملية
                                    </th>
                                    <th className="px-5 py-6 text-sm font-black text-white">
                                        رقم المتبرع
                                    </th>
                                    <th className="px-5 py-6 text-sm font-black text-white">
                                        الحالة
                                    </th>
                                    <th className="px-5 py-6 text-sm font-black text-white">
                                        المبلغ
                                    </th>
                                    <th className="px-5 py-6 text-sm font-black text-white">
                                        تاريخ التبرع
                                    </th>
                                    <th className="px-5 py-6 text-sm font-black text-white">
                                        الصورة
                                    </th>
                                    <th className="px-5 py-6 text-sm font-black text-white">
                                        إجراء
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredDonations.map((donation, index) => (
                                    <tr
                                        key={donation.id}
                                        className={`border-t border-slate-400 dark:border-white/5 ${index % 2 === 0
                                                ? "bg-white dark:bg-slate-900"
                                                : "bg-slate-50/50 dark:bg-slate-800/20"
                                            }`}
                                    >
                                        <td className="px-5 py-4 font-bold text-slate-800 dark:text-slate-200">
                                            #{donation.id}
                                        </td>

                                        <td className="px-5 py-4 font-bold text-slate-600 dark:text-slate-300">
                                            #{donation.donorId}
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="font-black text-slate-900 dark:text-white">
                                                {donation.caseName || "بدون عنوان"}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 text-sm font-black text-indigo-600 dark:text-indigo-300">
                                                {formatCurrency(donation.amount)} ج.م
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 font-bold text-slate-600 dark:text-slate-300">
                                            {formatDate(donation.paidAt)}
                                        </td>

                                        <td className="px-5 py-4">
                                            {donation.imageUrl ? (
                                                <img
                                                    src={donation.imageUrl}
                                                    alt={donation.caseName || "صورة الحالة"}
                                                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-white/10"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[11px] text-slate-400 font-bold">
                                                    لا توجد صورة
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => navigate(`/case/${donation.caseId}`)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 px-3 py-2 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                            >
                                                <Eye size={16} />
                                                عرض الحالة
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDonationPage;