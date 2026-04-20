import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import charityServices from './../services/charity';
import { showAlert } from "../helpers/alerts";

// هوك جلب الكل
export const useGetCharities = () => {
    return useQuery({
        queryKey: ["charities"],
        queryFn: charityServices.getCharities,
    });
};

// هوك جلب جمعية واحدة
export const useGetCharityDetails = (id) => {
    return useQuery({
        queryKey: ["charity", id],
        queryFn: () => charityServices.getCharityById(id),
        enabled: !!id,
    });
};

// هوك الإضافة
export const useCreateCharity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: charityServices.createCharity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["charities"] });
            showAlert.success("تم التسجيل", "تمت إضافة الجمعية بنجاح");
        },
        onError: (err) => {
            showAlert.error("فشل الإضافة", err.response?.data?.message || "حدث خطأ ما");
        }
    });
};

// هوك التعديل
export const useUpdateCharity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: charityServices.updateCharity,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["charities"] });
            queryClient.invalidateQueries({ queryKey: ["charity", id] });
            showAlert.success("تم التحديث", "تم تعديل بيانات الجمعية بنجاح");
        }
    });
};

// هوك الحذف
export const useDeleteCharity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: charityServices.deleteCharity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["charities"] });
            showAlert.success("تم الحذف", "تمت إزالة الجمعية من النظام");
        }
    });
};

// 2 chaange status
export const useToggleStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: charityServices.toggleStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["charities"] });
            showAlert.success("تم", "تمت تغير الحاله");
        }
    })
}