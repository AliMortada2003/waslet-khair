import axiosApi from "../Axios/axios";

const charityServices = {
    // 1) جلب كل الجمعيات
    getCharities: async () => {
        const response = await axiosApi.get("Charity");
        return response.data;
    },

    // 2) جلب بيانات جمعية واحدة
    getCharityById: async (id) => {
        const response = await axiosApi.get(`Charity/${id}`);
        return response.data;
    },

    // 3) إضافة جمعية جديدة (Post)
    createCharity: async (formData) => {
        // بما إنك بعت FormData من المودال، هنبعتها مباشرة للأكسيوس
        const response = await axiosApi.post("Charity", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    },

    // 4) تعديل بيانات جمعية (Put)
    updateCharity: async ({ id, formData }) => {
        // console.log(formData)
        // الـ Put في بعض الـ APIs بيفضل تبعت الـ ID داخل الـ URL والبيانات في الـ Body
        const response = await axiosApi.put(`Charity/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        console.log(response)
        return response.data;
    },

    // 5) حذف جمعية
    deleteCharity: async (id) => {
        try {
            const response = await axiosApi.delete(`Charity/${id}`);
            return response.data;
        } catch (error) {
            // سجل الخطأ عشان تعرف الـ 500 دي سببها إيه (غالباً Constraint في الداتابيز)
            console.error("Delete Error Details:", error.response?.data || error.message);
            throw error; // عشان React Query أو الـ Component يحس بالخطأ
        }
    },
    // 5) حذف جمعية
    toggleStatus: async (id) => {
        try {
            const response = await axiosApi.patch(`Charity/${id}/toggle-activation`);
            return response.data;
        } catch (error) {
            console.error("Delete Error Details:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default charityServices;