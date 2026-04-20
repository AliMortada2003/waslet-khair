import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import caseServices from './../services/Case';
import { showAlert } from "../helpers/alerts";

// 1) جلب كل الحالات
export const useGetCases = () => {
    return useQuery({
        queryKey: ["cases"],
        queryFn: caseServices.getCases,
    });
};

// 2) جلب حالة واحدة بالتفاصيل
export const useGetCaseDetails = (id) => {
    return useQuery({
        queryKey: ["case", id],
        queryFn: () => caseServices.getCaseById(id),
        enabled: !!id,
    });
};

// 3) جلب الحالات المميزة
export const useGetFeaturedCases = () => {
    return useQuery({
        queryKey: ["featuredCases"],
        queryFn: caseServices.getAllFeaturedCases,
    });
};

// 4) جلب الحالات حسب التصنيف
export const useGetCasesByCategoryId = (id) => {
    return useQuery({
        queryKey: ["cases", "category", id],
        queryFn: () => caseServices.getCasesByCategoryId(id),
        enabled: !!id,
    });
};

// 4.1) جلب الحالات حسب اسم التصنيف
export const useGetCasesByCategoryName = (name) => {
    return useQuery({
        queryKey: ["cases", "categoryName", name],
        queryFn: () => caseServices.getCasesByCategoryName(name),
        enabled: !!name,
    });
};
// 5) جلب الحالات حسب الجمعية
export const useGetCasesByCharityId = (id) => {
    return useQuery({
        queryKey: ["cases", "charity", id],
        queryFn: () => caseServices.getCasesByCharityId(id),
        enabled: !!id,
    });
};

// 6) إضافة حالة
export const useCreateCase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => caseServices.createCase(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cases"] });
            showAlert.success(
                "تمت إضافة الحالة",
                "تم نشر الحالة بنجاح وهي الآن متاحة للتبرع"
            );
        },
        onError: (err) => {
            console.log(err?.response)
            showAlert.error(
                "خطأ في الإضافة",
                err.response.title || "تأكد من صحة البيانات والملفات المرفوعة"
            );
        },
    });
};

// 7) حذف حالة
export const useDeleteCase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: caseServices.deleteCase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cases"] });
            showAlert.success("تم الحذف!", "تمت إزالة الحالة من النظام بنجاح.");
        },
        onError: (err) => {
            showAlert.error(
                "فشل الحذف",
                err.response?.data?.message || "حدث خطأ أثناء المحاولة"
            );
        },
    });
};

export const useUpdateCase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }) => caseServices.updateCase({ id, payload }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cases"] });
            showAlert.success("تم التعديل!", "تمت تعديل الحالة بنجاح.");
        },
        onError: (err) => {
            console.log(err?.response)
            showAlert.error("فشل التعديل", err.response?.data || "حدث خطأ");
        },
    });
};

