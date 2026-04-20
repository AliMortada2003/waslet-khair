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
import { useGetDonationsByDonor } from "../../../hocks/useHoksDonation";
import { useGetCases } from "../../../hocks/useCaseHooks";

const MyDonationPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("table");
    const navigate = useNavigate();

    const { data: userData } = useUser();
    const donorId = userData?.user?.id;

    const {
        data: donations = [],
        isLoading: donationsLoading,
        isError: donationsError,
        error: donationsErrorObject,
    } = useGetDonationsByDonor(donorId);

    const {
        data: cases = [],
        isLoading: casesLoading,
        isError: casesError,
        error: casesErrorObject,
    } = useGetCases();

    const isLoading = donationsLoading || casesLoading;
    const isError = donationsError || casesError;
    const error = donationsErrorObject || casesErrorObject;

    const normalizedCases = useMemo(() => {
        return cases.map((item) => ({
            ...item,
            collectedAmount: item.collectedAmount ?? item.currentAmount ?? 0,
            targetAmount: item.targetAmount ?? item.goalAmount ?? 0,
            coverImageUrl: item.coverImageUrl ?? item.imageUrl ?? "",
        }));
    }, [cases]);

    const donationRows = useMemo(() => {
        if (!donations.length || !normalizedCases.length) return [];

        return donations
            .map((donation) => {
                const relatedCase = normalizedCases.find(
                    (item) => Number(item.id) === Number(donation.caseId)
                );

                if (!relatedCase) return null;

                return {
                    donationId: donation.id,
                    caseId: relatedCase.id,
                    caseTitle: relatedCase.title || relatedCase.caseTitle || "بدون عنوان",
                    charityName: relatedCase.charityName || "غير محددة",
                    donationAmount: Number(donation.amount || 0),
                    paidAt: donation.paidAt,
                    imgUrl: relatedCase.coverImageUrl,
                };
            })
            .filter(Boolean);
    }, [donations, normalizedCases]);

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
                title: "إجمالي التبرعات",
                value: totalDonations,
                subtext: "عدد مرات التبرع التي قمت بها",
                icon: Wallet,
                accent: "bg-indigo-600",
                change: "إجمالي",
                changeType: "increase",
            },
            {
                title: "إجمالي المبلغ",
                value: `${new Intl.NumberFormat("ar-EG").format(totalAmount)} ج.م`,
                subtext: "إجمالي ما تم التبرع به",
                icon: HandHeart,
                accent: "bg-emerald-500",
                change: "أثر",
                changeType: "increase",
            },
            {
                title: "الحالات المدعومة",
                value: supportedCases,
                subtext: "عدد الحالات التي ساهمت فيها",
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

    const filteredRows = useMemo(() => {
        let result = [...donationRows];
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            result = result.filter(
                (item) =>
                    item.caseTitle?.toLowerCase().includes(query) ||
                    item.charityName?.toLowerCase().includes(query)
            );
        }

        return result.sort(
            (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
        );
    }, [donationRows, searchQuery]);

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
                title="تبرعاتي"
                subtitle="استعرض كل السجلات الخاصة بتبرعاتك بشكل منظم وواضح"
                icon={Wallet}
                breadcrumb="لوحة المتبرع / تبرعاتي"
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
                    placeholder="ابحث باسم الحالة أو الجمعية..."
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
            ) : filteredRows.length === 0 ? (
                <div className="py-20 text-center bg-white dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                    <Search size={40} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-black text-slate-400">
                        لا توجد تبرعات حالياً
                    </h3>
                    <p className="text-sm text-slate-400 mt-2">
                        عندما تقوم بالتبرع للحالات ستظهر هنا
                    </p>
                </div>
            ) : (
                <div className="overflow-scroll rounded-[2rem] border border-slate-200/70 dark:border-white/10 max-h-[80vh] bg-white dark:bg-slate-900 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] bg-cyan-100 dark:bg-white/10">
                            <thead className="bg-indigo-800 ">
                                <tr className="text-center">
                                    <th className="px-5 py-6 text-sm font-black text-white">رقم العملية</th>
                                    <th className="px-5 py-6 text-sm font-black text-white">الحالة</th>
                                    <th className="px-5 py-6 text-sm font-black text-white">الجمعية</th>
                                    <th className="px-5 py-6 text-sm font-black text-white">المبلغ</th>
                                    <th className="px-5 py-6 text-sm font-black text-white">تاريخ التبرع</th>
                                    <th className="px-5 py-6 text-sm font-black text-white">الصورة</th>
                                    <th className="px-5 py-6 text-sm font-black text-white">إجراء</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredRows.map((row, index) => (
                                    <tr
                                        key={row.donationId}
                                        className={`border-t border-slate-400 dark:border-white/5 ${index % 2 === 0
                                                ? "bg-white dark:bg-slate-900"
                                                : "bg-slate-50/50 dark:bg-slate-800/20"
                                            }`}
                                    >
                                        <td className="px-5 py-4 font-bold text-slate-800 dark:text-slate-200">
                                            #{row.donationId}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white">
                                                    {row.caseTitle}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 font-bold text-slate-600 dark:text-slate-300">
                                            {row.charityName}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 text-sm font-black text-indigo-600 dark:text-indigo-300">
                                                {formatCurrency(row.donationAmount)} ج.م
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 font-bold text-slate-600 dark:text-slate-300">
                                            {formatDate(row.paidAt)}
                                        </td>

                                        <td className="px-5 py-4">
                                            {row.imgUrl ? (
                                                <img
                                                    src={row.imgUrl}
                                                    alt={row.caseTitle}
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
                                                onClick={() => navigate(`/case/${row.caseId}`)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 px-3 py-2 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                            >
                                                <Eye size={16} />
                                                عرض
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

export default MyDonationPage;