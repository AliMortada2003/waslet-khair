import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminServices } from "../services/admins";
import { showAlert } from "../helpers/alerts";

export const useGetAllAdmins = () => {
    return useQuery({
        queryKey: ["admins"],
        queryFn: adminServices.getAllAdmins,
    });
};

export const useGetAdminById = (id) => {
    return useQuery({
        queryKey: ["admin", id],
        queryFn: () => adminServices.getAdminById(id),
        enabled: !!id,
    });
};

export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => adminServices.AddAdmin(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            showAlert.success("تمت الإضافة", "تمت إضافة مسؤول بنجاح");
        },
        onError: (err) => {
            console.log(err?.response)
            showAlert.error(
                "فشل الإضافة",
                err?.response?.data || "حدث خطأ أثناء الإضافة"
            );
        },
    });
};

export const useUpdateAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }) => adminServices.editAdmin(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            queryClient.invalidateQueries({ queryKey: ["admin", variables.id] });
            showAlert.success("تم التحديث", "تم تعديل بيانات المسؤول بنجاح");
        },
        onError: (err) => {
            console.log(err?.response)
            showAlert.error(
                "فشل التعديل",
                err?.response?.data || "حدث خطأ أثناء التعديل"
            );
        },
    });
};

export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => adminServices.deleteAdmin(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            showAlert.success("تم الحذف", "تم حذف المسؤول بنجاح");
        },
        onError: (err) => {
            showAlert.error(
                "فشل الحذف",
                err?.response?.data?.message || "حدث خطأ أثناء الحذف"
            );
        },
    });
};