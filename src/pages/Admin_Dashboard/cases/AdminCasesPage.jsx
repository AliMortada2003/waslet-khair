import React, { useMemo, useState } from "react";
import { Search, Briefcase, Plus, Loader2, AlertCircle, CheckCircle, Clock } from "lucide-react";

import PageHeader from "../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import useModal from '../../../hocks/useModal';
import AdminCaseCard from "./AdminCaseCard";
import CaseModal from './AdminCaseModal';
import { useUser } from "../../../hocks/useAuthHocks";
import { useCreateCase, useDeleteCase, useGetCasesByCharityId, useUpdateCase } from "../../../hocks/useCaseHooks";
import { useGetCategoriesByCharity } from "../../../hocks/useCategoriesHocks";
import CasesFilters from "../../SuperAdminDashboard/cases/CasesFilters";
import StatCard from "../../../components/ui/cards/StatCard";
import CaseDetailsModal from './../../SuperAdminDashboard/cases/CaseDetailsModal';
import DeleteModal from "../../../components/sharedmodals/DeleteModal";

const AdminCasesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("grid");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // 1. جلب بيانات اليوزر الحالي لمعرفة الـ charityId
    const { data: userData } = useUser(); //Admin Data
    const myCharityId = userData?.user?.charityId;

    const { data: myCases = [], isLoading, isError, error } = useGetCasesByCharityId(myCharityId);
    const { data: categories = [] } = useGetCategoriesByCharity(myCharityId); 

    const caseModal = useModal();
    const deleteModal = useModal();
    const detailsModal = useModal()
    // 2. جلب البيانات

    console.log(myCases)
    const createCaseMutation = useCreateCase();
    const updateCaseMutation = useUpdateCase();
    const deleteCaseMutation = useDeleteCase();
    // console.log(user)

    // 4. الإحصائيات بناءً على حالات الجمعية فقط
    const stats = useMemo(() => {
        const total = myCases.length;
        const completed = myCases.filter(c => c.isCompleted || (c.currentAmount >= c.goalAmount && c.goalAmount > 0)).length;
        const active = total - completed;

        return [
            {
                title: "حالات المؤسسة",
                value: total,
                subtext: "إجمالي الحالات المضافة",
                icon: Briefcase,
                accent: "bg-indigo-600",
                change: "إدارة",
                changeType: "info"
            },
            {
                title: "حالات نشطة",
                value: active,
                subtext: "تحت جمع التبرعات",
                icon: Clock,
                accent: "bg-amber-500",
                change: "جارٍ",
                changeType: "neutral"
            },
            {
                title: "حالات مكتملة",
                value: completed,
                subtext: "تم تحقيق الهدف",
                icon: CheckCircle,
                accent: "bg-emerald-500",
                change: "نجاح",
                changeType: "increase"
            }
        ];
    }, [myCases]);

    // 5. الفلترة للبحث والتصنيفات
    const filteredCases = useMemo(() => {
        let result = [...myCases];
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            result = result.filter((item) =>
                item.title?.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query)
            );
        }

        if (selectedCategory !== "all") {
            result = result.filter((item) => String(item.categoryId) === String(selectedCategory));
        }

        return result;
    }, [myCases, searchQuery, selectedCategory]);

    const handleSaveCase = (formData) => {
        const isEditMode = !!caseModal.data?.id;

        // التأكد من إرسال charityId الخاص بالجمعية عند الإضافة الجديدة
        const payload = {
            ...formData,
            charityId: myCharityId
        };

        if (isEditMode) {
            updateCaseMutation.mutate({ id: caseModal?.data.id, payload }, {
                onSuccess: () => caseModal.close(),
            });
        } else {
            createCaseMutation.mutate(payload, {
                onSuccess: () => caseModal.close(),
            });
        }
    };

    const handleConfirmDelete = () => {
        if (!deleteModal.data?.id) return;
        deleteCaseMutation.mutate(deleteModal.data.id, {
            onSuccess: () => deleteModal.close(),
        });
    };

    const isSubmitting = createCaseMutation.isPending || updateCaseMutation.isPending;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700" dir="rtl">
            <PageHeader
                title="إدارة حالات التبرع"
                subtitle="تحكم في الحالات الخاصة بمؤسستك فقط"
                icon={Briefcase}
                breadcrumb="لوحة التحكم / الحالات"
                actions={
                    <button
                        onClick={() => caseModal.open()}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-orange-500/20 transition-all active:scale-95"
                    >
                        <Plus size={20} /> إضافة حالة للمؤسسة
                    </button>
                }
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
            <div className="space-y-4 mb-8">
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="ابحث في حالات مؤسستك..."
                    viewType={viewType}
                    setViewType={setViewType}
                />

                <CasesFilters
                    categories={categories}
                    charities={[]} // نرسل مصفوفة فارغة لأننا لا نحتاج لفلترة الجمعيات هنا
                    showCharityFilter={false} // لو تقدر تعدل الكومبوننت يخفي فلتر الجمعية
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                    <p className="text-slate-500 font-black">جاري تحميل حالات مؤسستك...</p>
                </div>
            ) : isError ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">حدث خطأ</h3>
                    <p className="text-slate-500 text-sm">{error?.message}</p>
                </div>
            ) : (
                <div className={`grid gap-6 transition-all duration-500 ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                    }`}>
                    {filteredCases.map((item) => (
                        <AdminCaseCard
                            key={item.id}
                            item={item}
                            onView={(selectedCase) => detailsModal.open(selectedCase)}
                            onEdit={(selectedCase) => caseModal.open(selectedCase)}
                            onDelete={(selectedCase) => deleteModal.open(selectedCase)}
                        />
                    ))}

                    {filteredCases.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                            <Search size={40} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-black text-slate-400">لا توجد حالات مسجلة حالياً</h3>
                        </div>
                    )}
                </div>
            )}

            <CaseModal
                isOpen={caseModal.isOpen}
                onClose={caseModal.close}
                initialData={caseModal.data}
                onSubmit={handleSaveCase}
                isSubmitting={isSubmitting}
                categories={categories}
                fixedCharityId={myCharityId} // نمرر الـ ID ليكون ثابتاً في المودال
            />

            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                onConfirm={handleConfirmDelete}
                title={deleteModal.data?.title}
                isLoading={deleteCaseMutation.isPending}
            />

            <CaseDetailsModal
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.close}
                data={detailsModal.data}

            />
        </div>
    );
};

export default AdminCasesPage;