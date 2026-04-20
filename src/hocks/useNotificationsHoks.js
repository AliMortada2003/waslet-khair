import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notificationServices from "../services/notification";

// جلب كل إشعارات المستخدم
export const useGetNotificationToUser = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: notificationServices.getNotificationToUser,
    });
};

// جلب تفاصيل إشعار واحد
export const useGetOneNotificationDetails = (id) => {
    return useQuery({
        queryKey: ["notification", id],
        queryFn: () => notificationServices.getOneNotificationDetails(id),
        enabled: !!id,
    });
};

// حذف إشعار
export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: notificationServices.deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            showAlert("success", "تم حذف الإشعار بنجاح");
        },
        onError: (error) => {
            showAlert("error", error?.response?.data?.message || "حدث خطأ أثناء حذف الإشعار");
        },
    });
};

// تعليم إشعار كمقروء
export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: notificationServices.markAsRead,
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notification", id] });
        },
        onError: (error) => {
            showAlert("error", error?.response?.data?.message || "حدث خطأ أثناء تحديث الإشعار");
        },
    });
};

// تعليم كل الإشعارات كمقروءة
export const useMarkAllNotificationsAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: notificationServices.markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            showAlert("success", "تم تعليم كل الإشعارات كمقروءة");
        },
        onError: (error) => {
            showAlert("error", error?.response?.data?.message || "حدث خطأ أثناء تحديث الإشعارات");
        },
    });
};