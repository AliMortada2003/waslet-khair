import axiosApi from "../Axios/axios";

export const donorServices = {
    getAllDonors: async () => {
        const res = await axiosApi.get("/Donor");
        return res.data;
    },

    getDonorById: async (id) => {
        const res = await axiosApi.get(`/Donor/${id}`);
        return res.data;
    },

    updateDonor: async (id, payload) => {
        const res = await axiosApi.put(`/Donor/${id}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },

    deleteDonor: async (id) => {
        const res = await axiosApi.delete(`/Donor/${id}`);
        return res.data;
    },
    confirmEmail: async (id) => {
        const res = await axiosApi.patch(`/Donor/${id}/confirm`);
        return res.data;
    },
};