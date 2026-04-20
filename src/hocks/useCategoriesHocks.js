import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showAlert } from "../helpers/alerts";
import categoryServices from "../services/category";

// هوك جلب التصنيفات استخدامها هيكون في الهوم فقط 

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoryServices.getCategories,
    });
};

export const useGetCategoriesByCharity = (charityId) => {
    return useQuery({
        // إضافة charityId للمفتاح مهم جداً عشان الـ Cache ميتلخبطش بين الجمعيات
        queryKey: ["categories", charityId],
        // استدعاء الدالة وتمرير الـ ID لها
        queryFn: () => categoryServices.getAllCategoriesByCharityId(charityId),
        // تجنب التنفيذ إذا كان الـ ID غير موجود
        enabled: !!charityId,
    });
};
// هوك إضافة تصنيف
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoryServices.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            showAlert.success("تم الإضافة", "تم إضافة التصنيف الجديد بنجاح");
        },
        onError: (err) => {
            showAlert.error("خطأ", err.response?.data?.message || "فشل إضافة التصنيف");
        }
    });
};

// هوك الحذف
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoryServices.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            showAlert.success("تم الحذف", "تم حذف التصنيف بنجاح");
        }
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: categoryServices.updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            showAlert.success("تم تعديل", "تم التعديل بنجاح")
        }
    })
}