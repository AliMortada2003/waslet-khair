import React, { useMemo, useState } from "react";
import { Search, Loader2, AlertCircle, Users, HeartHandshake, UserX } from "lucide-react";

// Components
import PageHeader from "./../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import StatCard from "../../../components/ui/cards/StatCard";
import DonorsTable from "./DonorsTable";

// Modals
import DonorModal from "./DonorModal";
import DonorViewModal from "./DonorViewModal";

// Hooks
import useModal from "./../../../hocks/useModal";
import { useGetDonors, useUpdateDonor, useDeleteDonor, useConfirmDonor } from "./../../../hocks/useDonorsHooks";
import ConfirmModal from "./ConfirmModal";
import DeleteModal from "../../../components/sharedmodals/DeleteModal";

const DonorsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("list");

    // Modals Control
    const editModal = useModal();
    const viewModal = useModal();
    const deleteModal = useModal();
    const activationModal = useModal(); // مودال التفعيل الجديد

    // Data Fetching
    const { data: donors = [], isLoading, isError, error } = useGetDonors();

    // Mutations
    const updateDonorMutation = useUpdateDonor();
    const deleteDonorMutation = useDeleteDonor();
    const confirmDonorMutation = useConfirmDonor();

    // Filtering Logic
    const filteredDonors = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return donors;
        return donors.filter((item) => {
            const fullName = `${item.firstName || ""} ${item.lastName || ""}`.toLowerCase();
            return (
                item.firstName?.toLowerCase().includes(query) ||
                item.lastName?.toLowerCase().includes(query) ||
                fullName.includes(query) ||
                item.email?.toLowerCase().includes(query) ||
                item.phoneNumber?.toLowerCase().includes(query)
            );
        });
    }, [donors, searchQuery]);

    // Handlers
    const handleSaveDonor = (formData) => {
        if (!editModal.data?.id) return;
        updateDonorMutation.mutate(
            { id: editModal.data.id, payload: formData },
            { onSuccess: () => editModal.close() }
        );
    };

    const handleConfirmDelete = () => {
        if (!deleteModal.data?.id) return;
        deleteDonorMutation.mutate(deleteModal.data.id, {
            onSuccess: () => deleteModal.close(),
        });
    };

    const handleConfirmActivation = async () => {
        if (!activationModal.data?.id) return;
        console.log(activationModal?.data)
        try {
            await confirmDonorMutation.mutateAsync(activationModal.data.id);
            activationModal.close();
        } catch (err) {
            // الخطأ يتم معالجته داخلياً في ConfirmModal عبر الـ error prop
        }
    };

    // Statistics Calculation
    const stats = useMemo(() => {
        const total = donors.length;
        const confirmed = donors.filter(d => d.isConfirmed).length;
        const pending = total - confirmed;
        return [
            {
                title: "إجمالي المتبرعين",
                value: total,
                subtext: "قاعدة بيانات المتبرعين",
                icon: Users,
                accent: "bg-blue-600",
                changeType: "increase"
            },
            {
                title: "حسابات موثقة",
                value: confirmed,
                subtext: "متبرعين تم تأكيد حسابهم",
                icon: HeartHandshake,
                accent: "bg-emerald-500",
                changeType: "success"
            },
            {
                title: "في انتظار التأكيد",
                value: pending,
                subtext: "حسابات تحتاج تفعيل",
                icon: UserX,
                accent: "bg-rose-500",
                changeType: "warning"
            }
        ];
    }, [donors]);

    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700">
            <PageHeader
                title="إدارة المتبرعين"
                subtitle="متابعة بيانات المتبرعين وتعديلها أو إدارة حالات التفعيل"
                icon={Users}
                breadcrumb="لوحة التحكم / المتبرعين"
            />

            {/* Filter Section */}
            <div className="mb-8">
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="ابحث بالاسم، البريد، أو رقم الهاتف..."
                    viewType={viewType}
                    setViewType={setViewType}
                />
            </div>

            {/* Stats Section */}
            {!isLoading && !isError && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            )}

            {/* Main Content (Table/Loader/Error) */}
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold">جاري تحميل المتبرعين...</p>
                </div>
            ) : isError ? (
                <div className="py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-white/5 rounded-[3rem] border border-red-100 dark:border-red-500/10">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">حدث خطأ في الاتصال</h3>
                    <p className="text-slate-500 text-sm">{error?.message || "فشل جلب البيانات"}</p>
                </div>
            ) : (
                <DonorsTable
                    donors={filteredDonors}
                    onView={(item) => viewModal.open(item)}
                    onEdit={(item) => editModal.open(item)}
                    onDelete={(item) => deleteModal.open(item)}
                    onConfirm={(item) => activationModal.open(item)} // فتح مودال التفعيل
                />
            )}

            {/* Modals Rendering */}

            {/* 1. Edit Donor Modal */}
            <DonorModal
                isOpen={editModal.isOpen}
                onClose={editModal.close}
                initialData={editModal.data}
                onSubmit={handleSaveDonor}
                isSubmitting={updateDonorMutation.isPending}
            />

            {/* 2. View Donor Modal */}
            <DonorViewModal
                isOpen={viewModal.isOpen}
                onClose={viewModal.close}
                data={viewModal.data}
            />

            {/* 3. Delete Confirmation Modal */}
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                onConfirm={handleConfirmDelete}
                title={`${deleteModal.data?.firstName || ""} ${deleteModal.data?.lastName || ""}`}
                isLoading={deleteDonorMutation.isPending}
            />

            {/* 4. Activation Confirmation Modal (The New Component) */}
            <ConfirmModal
                isOpen={activationModal.isOpen}
                onClose={activationModal.close}
                onConfirm={handleConfirmActivation}
                title="تفعيل حساب متبرع"
                description={`هل أنت متأكد من تفعيل حساب ${activationModal.data?.firstName}؟ سيتمكن المتبرع من استخدام كافة مميزات المنصة.`}
                isLoading={confirmDonorMutation.isPending}
                error={confirmDonorMutation.error?.response?.data?.message}
            />
        </div>
    );
};

export default DonorsPage;