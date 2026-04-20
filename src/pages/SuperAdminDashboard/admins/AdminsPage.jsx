import React, { useMemo, useState } from "react";
import { Plus, Loader2, AlertCircle, ShieldCheck, Building2, UserCheck } from "lucide-react";

import PageHeader from "./../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import useModal from "./../../../hocks/useModal";

import AdminsTable from "./AdminsTable";
import AdminModal from "./AdminModal";
import AdminDetailsModal from "./AdminDetailsModal";
import DeleteModal from './../../../components/sharedmodals/DeleteModal';

import { useCreateAdmin, useDeleteAdmin, useGetAllAdmins, useUpdateAdmin } from "../../../hocks/useAdminsHocks";

import { useGetCharities } from "./../../../hocks/useCharityHooks";
import StatCard from "../../../components/ui/cards/StatCard";

const AdminsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("list");

    const adminModal = useModal();
    const detailsModal = useModal();
    const deleteModal = useModal();

    const { data: admins = [], isLoading, isError, error } = useGetAllAdmins();
    const { data: charities = [] } = useGetCharities();
    const createAdminMutation = useCreateAdmin();
    const updateAdminMutation = useUpdateAdmin();
    const deleteAdminMutation = useDeleteAdmin();

    // console.log(admins)
    const filteredAdmins = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return admins;

        return admins.filter((item) =>
            item.firstName?.toLowerCase().includes(query) ||
            item.lastName?.toLowerCase().includes(query) ||
            `${item.firstName || ""} ${item.lastName || ""}`.toLowerCase().includes(query) ||
            item.email?.toLowerCase().includes(query) ||
            item.phone?.toLowerCase().includes(query)
        );
    }, [admins, searchQuery]);

    const handleSaveAdmin = (formData) => {
        const isEditMode = !!adminModal.data?.id;

        if (isEditMode) {
            updateAdminMutation.mutate(
                { id: adminModal.data.id, payload: formData },
                {
                    onSuccess: () => adminModal.close(),
                }
            );
        } else {
            console.log(formData)
            createAdminMutation.mutate(formData, {
                onSuccess: () => adminModal.close(),
            });
        }
    };

    const handleConfirmDelete = () => {
        if (!deleteModal.data?.id) return;

        deleteAdminMutation.mutate(deleteModal.data.id, {
            onSuccess: () => deleteModal.close(),
        });
    };

    const isSubmitting =createAdminMutation.isPending || updateAdminMutation.isPending;

    // حساب الإحصائيات
    const stats = useMemo(() => {
        return [
            {
                title: "إجمالي المسؤولين",
                value: admins.length,
                subtext: "مسؤولي النظام والجمعيات",
                icon: ShieldCheck,
                accent: "bg-indigo-600",
                change: "نشط",
                changeType: "info"
            },
            {
                title: "جمعيات مفعلة",
                value: charities.length,
                subtext: "مؤسسات شريكة حالية",
                icon: Building2,
                accent: "bg-emerald-500",
                change: "مستمر",
                changeType: "neutral"
            },
            {
                title: "أحدث المنضمين",
                value: admins.slice(-1)[0]?.firstName || "لا يوجد",
                subtext: "آخر مسؤول تم إضافته",
                icon: UserCheck,
                accent: "bg-amber-500",
                changeType: "neutral"
            }
        ];
    }, [admins, charities]);
    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700">
            <PageHeader
                title="إدارة المسؤولين"
                subtitle="متابعة بيانات المسؤولين والتحكم في الحسابات"
                icon={ShieldCheck}
                breadcrumb="لوحة التحكم / المسؤولين"
                actions={
                    <button
                        onClick={() => adminModal.open()}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        إضافة مسؤول جديد
                    </button>
                }
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
                    placeholder="ابحث بالاسم أو البريد أو رقم الهاتف..."
                    viewType={viewType}
                    setViewType={setViewType}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-black">جاري تحميل المسؤولين...</p>
                </div>
            ) : isError ? (
                <div className="py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-white/5 rounded-[3rem] border border-red-100 dark:border-red-500/10">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                        حدث خطأ في الاتصال
                    </h3>
                    <p className="text-slate-500 text-sm">
                        {error?.message || "فشل جلب المسؤولين من الخادم"}
                    </p>
                </div>
            ) : (
                <AdminsTable
                    admins={filteredAdmins}
                    charities={charities}
                    onView={(item) => detailsModal.open(item)}
                    onEdit={(item) => adminModal.open(item)}
                    onDelete={(item) => deleteModal.open(item)}
                />
            )}

            <AdminModal
                isOpen={adminModal.isOpen}
                onClose={adminModal.close}
                initialData={adminModal.data}
                onSubmit={handleSaveAdmin}
                isSubmitting={isSubmitting}
                charities={charities}
            />

            <AdminDetailsModal
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.close}
                data={detailsModal.data}
                charities={charities}
            />

            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                onConfirm={handleConfirmDelete}
                title={`${deleteModal.data?.firstName || ""} ${deleteModal.data?.lastName || ""}`.trim()}
                isLoading={deleteAdminMutation.isPending}
            />
        </div>
    );
};

export default AdminsPage;