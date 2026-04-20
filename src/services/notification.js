import axiosApi from "../Axios/axios";

const notificationServices = {
    getNotificationToUser: async () => {
        const response = await axiosApi.get("/Notification/ToUser");
        return response.data;
    },

    getOneNotificationDetails: async (id) => {
        const response = await axiosApi.get(`/Notification/${id}`);
        return response.data;
    },

    deleteNotification: async (id) => {
        const response = await axiosApi.delete(`/Notification/${id}`);
        return response.data;
    },

    markAsRead: async (id) => {
        const response = await axiosApi.patch(`/Notification/${id}/mark-as-read`);
        return response.data;
    },

    markAllAsRead: async () => {
        const response = await axiosApi.patch(`/Notification/user/mark-all-as-read`);
        return response.data;
    },
};

export default notificationServices;