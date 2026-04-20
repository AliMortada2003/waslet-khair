import React, { useMemo, useState } from "react";
import { LayoutGrid, Plus, Loader2, AlertCircle, Tags, Zap, PieChart } from "lucide-react"; // أيقونات جديدة
import useModal from "../../../hocks/useModal";
import { useGetCategories } from "../../../hocks/useCategoriesHocks";
import PageHeader from "../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import StatCard from "../../../components/ui/cards/StatCard"; // استيراد الـ StatCard
import SuperAdminCardCategory from "./SuperAdminCardCategory";
import CategoryDetailsModal from './CategoryDetailsModal';

const CategoryPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("grid");

    const showDetailsModal = useModal();
    const { data: categories = [], isLoading, isError, error } = useGetCategories();


    // حساب إحصائيات التصنيفات
    const stats = useMemo(() => {
        return [
            {
                title: "إجمالي التصنيفات",
                value: categories.length,
                subtext: "أنواع الحالات المعرفة",
                icon: Tags,
                accent: "bg-indigo-600",
                change: "مفعل",
                changeType: "success"
            },
            {
                title: "آخر إضافة",
                value: categories.slice(-1)[0]?.name || "---",
                subtext: "أحدث تصنيف تم إنشاؤه",
                icon: Zap,
                accent: "bg-amber-500",
                changeType: "neutral"
            }
        ];
    }, [categories]);

    const filteredCategories = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return categories;
        return categories.filter((cat) => cat.name?.toLowerCase().includes(query));
    }, [categories, searchQuery]);
    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700">
            <PageHeader
                title="تصنيفات الحالات"
                subtitle="إدارة وتبويب الحالات الخيرية"
                icon={LayoutGrid}
                breadcrumb="لوحة التحكم / التصنيفات"
            />

            {/* قسم الإحصائيات الجديد */}
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
                    placeholder="ابحث عن تصنيف..."
                    viewType={viewType}
                    setViewType={setViewType}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold">جاري تحميل التصنيفات...</p>
                </div>
            ) : isError ? (
                <div className="py-20 text-center bg-red-50/50 dark:bg-red-500/5 rounded-[2.5rem]">
                    <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
                    <p className="text-slate-500 font-bold">{error?.message || "حدث خطأ في الاتصال"}</p>
                </div>
            ) : (
                <div className={`grid gap-6 transition-all duration-500 ${viewType === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
                    : "grid-cols-1"
                    }`}>
                    {filteredCategories.map((category) => (
                        <SuperAdminCardCategory
                            key={category.id}
                            category={category}
                            onView={() => showDetailsModal.open(category)}
                        />
                    ))}
                </div>
            )}
            <CategoryDetailsModal
                isOpen={showDetailsModal.isOpen}
                onClose={showDetailsModal.close}
                data={showDetailsModal.data}
            />
        </div>
    );
};

export default CategoryPage;