import axios from "axios";
import axiosApi from "../Axios/axios";

// ده الـ Base URL بتاعك، تأكد من تعديله حسب إعداداتك

const categoryServices = {
    // 1) جلب كل التصنيفات
    getCategories: async () => {
        const response = await axiosApi.get("Category");
        return response.data;
    },

    // 2) جلب تصنيف واحد بالـ ID
    getCategoryById: async (id) => {
        const response = await axiosApi.get(`Category/${id}`);
        return response.data;
    },

    // 3) إضافة تصنيف جديد (مع رفع صورة)
    createCategory: async (categoryData) => {
        const response = await axiosApi.post("Category", categoryData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    // 4) تعديل تصنيف موجود
    updateCategory: async ({ id, categoryData }) => {
        const response = await axiosApi.put(`Category/${id}`, categoryData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    // 5)  تصنيف
    deleteCategory: async (id) => {
        const response = await axiosApi.delete(`Category/${id}`);
        return response.data;
    },

    // new 6) get all categoriesByCharityId

    getAllCategoriesByCharityId: async (charityId) => {
        const response = await axiosApi.get(`Category/Charity/${charityId}`)
        return response.data
    }
};

export default categoryServices;