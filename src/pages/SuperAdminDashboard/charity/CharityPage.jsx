import React, { useMemo, useState } from "react";
import { Search, Heart, Plus, Loader2, AlertCircle, Building2, MapPin, Activity } from "lucide-react";

import PageHeader from "./../../../components/ui/layout/PageHeader";
import FilterBar from "../../../components/filter/FilterBar";
import AdminCharityCard from "./component/AdminCharityCard";
import OrganizationModal from "./modals/OrganizationModal";
import useModal from './../../../hocks/useModal';
import StatCard from "../../../components/ui/cards/StatCard"; // تأكد من المسار الصحيح للـ StatCard

import {
    useGetCharities,
    useCreateCharity,
    useUpdateCharity,
    useDeleteCharity,
} from "../../../hocks/useCharityHooks";
import DeleteModal from "../../../components/sharedmodals/DeleteModal";

const CharityPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewType, setViewType] = useState("grid");

    const charityModal = useModal();
    const deleteModal = useModal();

    const {
        data: charities = [],
        isLoading,
        isError,
        error,
    } = useGetCharities();

    const createCharityMutation = useCreateCharity();
    const updateCharityMutation = useUpdateCharity();
    const deleteCharityMutation = useDeleteCharity();

    console.log(charities)
    // حساب الإحصائيات ديناميكياً
    const stats = useMemo(() => {
        // حساب عدد المناطق المختلفة بناءً على العنوان
        const isActive = charities.map(c => c.isActive).length;

        return [
            {
                title: "إجمالي الجمعيات",
                value: charities.length,
                subtext: "مؤسسة مسجلة حالياً",
                icon: Building2,
                accent: "bg-indigo-600",
                change: "نشط",
                changeType: "info"
            },
            {
                title: "جمعيات مفعلة ",
                value: isActive || 0,
                subtext: "جمعيات مفعلة الان",
                icon: MapPin,
                accent: "bg-emerald-500",
                change: "الان",
                changeType: "neutral"
            }
        ];
    }, [charities]);

    const filteredCharities = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return charities;

        return charities.filter((charity) => {
            return (
                charity.name?.toLowerCase().includes(query) ||
                charity.address?.toLowerCase().includes(query) ||
                charity.phoneNumber?.toLowerCase().includes(query) ||
                charity.email?.toLowerCase().includes(query)
            );
        });
    }, [charities, searchQuery]);

    const handleSaveCharity = (formData) => {
        const isEditMode = !!charityModal.data?.id;

        if (isEditMode) {
            updateCharityMutation.mutate(
                { id: charityModal.data.id, formData: formData },
                { onSuccess: () => charityModal.close() }
            );
        } else {
            createCharityMutation.mutate(formData, {
                onSuccess: () => charityModal.close()
            });
        }
    };

    const handleConfirmDelete = () => {
        if (!deleteModal.data?.id) return;
        deleteCharityMutation.mutate(deleteModal.data.id, {
            onSuccess: () => deleteModal.close()
        });
    };

    const isSubmitting = createCharityMutation.isPending || updateCharityMutation.isPending;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-transparent animate-in fade-in duration-700">
            <PageHeader
                title="الجمعيات الخيرية"
                subtitle="إدارة وتتبع نشاطات الجمعيات الشريكة في المنصة"
                icon={Heart}
                breadcrumb="لوحة التحكم / الجمعيات"
                actions={
                    <button
                        onClick={() => charityModal.open()}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        إضافة مؤسسة جديدة
                    </button>
                }
            />

            {/* قسم الإحصائيات - يظهر فقط في حالة عدم وجود خطأ أو تحميل */}
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
                    placeholder="ابحث عن مؤسسة بالاسم، العنوان، أو الرقم..."
                    viewType={viewType}
                    setViewType={setViewType}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold">جاري تحميل الجمعيات...</p>
                </div>
            ) : isError ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="bg-red-50 dark:bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle size={32} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">حدث خطأ أثناء تحميل البيانات</h3>
                    <p className="text-slate-500">{error?.message || "حاول مرة أخرى لاحقًا"}</p>
                </div>
            ) : (
                <div className={`grid gap-6 ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                    {filteredCharities.map((charity) => (
                        <AdminCharityCard
                            key={charity.id}
                            data={charity}
                            onEdit={() => charityModal.open(charity)}
                            onDelete={() => deleteModal.open(charity)}
                            onView={(d) => console.log("Quick View", d)}
                        />
                    ))}

                    {filteredCharities.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white/50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10">
                            <div className="bg-indigo-50 dark:bg-indigo-500/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={32} className="text-indigo-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white">لا توجد نتائج</h3>
                            <p className="text-slate-500">{searchQuery ? "لا توجد نتائج مطابقة لبحثك." : "ابدأ بإضافة أول مؤسسة للمنصة الآن."}</p>
                        </div>
                    )}
                </div>
            )}

            <OrganizationModal
                isOpen={charityModal.isOpen}
                onClose={charityModal.close}
                initialData={charityModal.data}
                onSubmit={handleSaveCharity}
                isSubmitting={isSubmitting}
            />

            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.close}
                onConfirm={handleConfirmDelete}
                title={deleteModal.data?.name}
                isLoading={deleteCharityMutation.isPending}
            />
        </div>
    );
};

export default CharityPage;