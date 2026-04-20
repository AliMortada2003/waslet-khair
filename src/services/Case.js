import { toFormData } from "axios";
import axiosApi from "../Axios/axios";

const caseServices = {
    getAllFeaturedCases: async () => {
        const res = await axiosApi.get("Case/active");
        return res.data;
    },

    getCaseById: async (id) => {
        const res = await axiosApi.get(`Case/${id}`);
        return res.data;
    },

    getCases: async () => {
        const res = await axiosApi.get("Case");
        return res.data;
    },

    getCasesByCategoryId: async (id) => {
        const res = await axiosApi.get(`Case/category/${id}`);
        return res.data;
    },

    getCasesByCharityId: async (id) => {
        const res = await axiosApi.get(`Case/charity/${id}`);
        return res.data;
    },

    createCase: async (payload) => {
        // سطر واحد فقط يقوم بكل العمل
        const formData = toFormData(payload);
        const res = await axiosApi.post("Case", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    updateCase: async ({ id, payload }) => { // لاحظ القوسين { id, payload } لفك الكائن
        const res = await axiosApi.put(`Case/${id}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },

    deleteCase: async (id) => {
        const res = await axiosApi.patch(`Case/${id}/soft-delete`);
        return res.data;
    },
    getCasesByCategoryName: async (name) => {
        console.log(name)
        const response = await axiosApi.get(`/Case/categoryName/${name}`);
        return response.data;
    }
};

export default caseServices;