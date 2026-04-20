import React, { useMemo, useState } from "react";
import {
    Search,
    Briefcase,
    Loader2,
    AlertCircle,
    CheckCircle,
    Clock,
} from "lucide-react";

import PageHeader from "./../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import useModal from "./../../../hocks/useModal";
import { useGetCases } from "./../../../hocks/useCaseHooks";
import { useGetCharities } from "./../../../hocks/useCharityHooks";
import { useGetCategories } from "./../../../hocks/useCategoriesHocks";
import CasesFilters from "./CasesFilters";
import StatCard from "../../../components/ui/cards/StatCard";
import CaseDetailsModal from "./CaseDetailsModal";
import SuperAdminCaseCard from "./SuperAdminCaseCard";

const CasesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("grid");

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedCharity, setSelectedCharity] = useState("all");

    const detailsModal = useModal();

    const { data: cases = [], isLoading, isError, error } = useGetCases();
    const { data: charities = [] } = useGetCharities();
    const { data: categories = [] } = useGetCategories();

    const stats = useMemo(() => {
        const total = cases.length;
        const completed = cases.filter(
            (c) => c.isCompleted || c.currentAmount >= c.targetAmount
        ).length;
        const active = total - completed;

        return [
            {
                title: "إجمالي الحالات",
                value: total,
                subtext: "كل الحالات المسجلة",
                icon: Briefcase,
                accent: "bg-indigo-600",
                change: "نشط",
                changeType: "info",
            },
            {
                title: "حالات نشطة",
                value: active,
                subtext: "في انتظار اكتمال الدعم",
                icon: Clock,
                accent: "bg-amber-500",
                change: "مستمر",
                changeType: "neutral",
            },
            {
                title: "حالات مكتملة",
                value: completed,
                subtext: "تم تغطية مبلغ الدعم",
                icon: CheckCircle,
                accent: "bg-emerald-500",
                change: "تم بنجاح",
                changeType: "increase",
            },
        ];
    }, [cases]);

    const filteredCases = useMemo(() => {
        let result = [...cases];
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            result = result.filter(
                (item) =>
                    item.title?.toLowerCase().includes(query) ||
                    item.description?.toLowerCase().includes(query) ||
                    item.beneficiaryName?.toLowerCase().includes(query)
            );
        }

        if (selectedCategory !== "all") {
            result = result.filter(
                (item) => String(item.categoryId) === String(selectedCategory)
            );
        }

        if (selectedCharity !== "all") {
            result = result.filter(
                (item) => String(item.charityId) === String(selectedCharity)
            );
        }

        return result;
    }, [cases, searchQuery, selectedCategory, selectedCharity]);

    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700">
            <PageHeader
                title="إدارة الحالات"
                subtitle="استعراض حالات التبرع ومتابعة بيانات المستفيدين"
                icon={Briefcase}
                breadcrumb="لوحة التحكم / الحالات"
            />

            {!isLoading && !isError && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            )}

            <div className="space-y-4 mb-8">
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="ابحث عن حالة بالاسم أو الوصف..."
                    viewType={viewType}
                    setViewType={setViewType}
                />

                <CasesFilters
                    categories={categories}
                    charities={charities}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedCharity={selectedCharity}
                    setSelectedCharity={setSelectedCharity}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-black">جاري تحميل الحالات...</p>
                </div>
            ) : isError ? (
                <div className="py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-white/5 rounded-[3rem] border border-red-100 dark:border-red-500/10">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                        حدث خطأ في الاتصال
                    </h3>
                    <p className="text-slate-500 text-sm">
                        {error?.message || "فشل جلب الحالات من الخادم"}
                    </p>
                </div>
            ) : (
                <div
                    className={`grid gap-6 transition-all duration-500 ${
                        viewType === "grid"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1"
                    }`}
                >
                    {filteredCases.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => detailsModal.open(item)}
                            className="cursor-pointer"
                        >
                            <SuperAdminCaseCard item={item} readOnly />
                        </div>
                    ))}

                    {filteredCases.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white dark:bg-white/[0.02] rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                            <Search size={40} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-black text-slate-400">
                                لا توجد حالات تطابق اختياراتك
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                جرب تغيير كلمات البحث أو الفلاتر
                            </p>
                        </div>
                    )}
                </div>
            )}

            <CaseDetailsModal
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.close}
                data={detailsModal.data}
            />
        </div>
    );
};

export default CasesPage;