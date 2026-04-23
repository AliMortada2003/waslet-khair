import React, { useMemo, useState } from "react";
import { LayoutGrid, Plus, Loader2, AlertCircle, Tags, Zap, PieChart } from "lucide-react"; // أيقونات جديدة
import useModal from "../../../hocks/useModal";
import { useCreateCategory, useDeleteCategory, useGetCategoriesByCharity, useUpdateCategory } from "../../../hocks/useCategoriesHocks";
import PageHeader from "../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import AdminCardCategory from "./AdminCardCategory";
import CategoryModal from './CategoryModal';
import StatCard from "../../../components/ui/cards/StatCard";
import DeleteModal from './../../../components/sharedmodals/DeleteModal';
import { useUser } from "../../../hocks/useAuthHocks";

const CategoryPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("grid");
    const categoryModal = useModal();
    const deleteModal = useModal();

    // User Admin Data and Categories
    const { data: userData } = useUser()
    const { user } = userData
    const charityid = user?.charityId
    // console.log(user)

    // Destructing
    const { data: categories = [], isLoading, isError, error } = useGetCategoriesByCharity(charityid);
    const createCategoryMutation = useCreateCategory();
    const deleteCategoryMutation = useDeleteCategory();
    const updateCategoryMutation = useUpdateCategory();

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

    const handleSaveCategory = (formData) => {
        const categoryId = categoryModal.data?.id;

        if (categoryId) {
            updateCategoryMutation.mutate({ id: categoryId, categoryData: formData }, {
                onSuccess: () => categoryModal.close(),
            });
        } else {
            createCategoryMutation.mutate(formData, {
                onSuccess: () => categoryModal.close(),
            });
        }
    };

    const handleConfirmDelete = () => {
        if (!deleteModal.data?.id) return;
        deleteCategoryMutation.mutate(deleteModal.data.id, {
            onSuccess: () => deleteModal.close(),
        });
    };

    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700">
            <PageHeader
                title="تصنيفات الحالات"
                subtitle="إدارة وتبويب الحالات الخيرية"
                icon={LayoutGrid}
                breadcrumb="لوحة التحكم / التصنيفات"
                actions={
                    <button
                        onClick={() => categoryModal.open()}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        إضافة تصنيف
                    </button>
                }
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
                        <AdminCardCategory
                            key={category.id}
                            category={category}
                            onEdit={(data) => categoryModal.open(data)}
                            onDelete={(data) => deleteModal.open(data)}
                        />
                    ))}
                </div>
            )}

            {/* المودالز */}
            <CategoryModal
                isOpen={categoryModal.isOpen}
                onClose={categoryModal.close}
                initialData={categoryModal.data}
                onSubmit={handleSaveCategory}
                isSubmitting={createCategoryMutation.isPending || updateCategoryMutation.isPending}
            />

            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                onConfirm={handleConfirmDelete}
                title={deleteModal.data?.name}
                isLoading={deleteCategoryMutation.isPending}
            />
        </div>
    );
};

export default CategoryPage;