import axiosApi from "../Axios/axios"

export const adminServices = {
    getAllAdmins: async () => {
        const res = await axiosApi.get("Admin")
        return res.data
    },
    getOneAdmin: async (id) => {
        const res = await axiosApi.get(`Admin/${id}`)
        return res.data
    },
    editAdmin: async (id, payload) => {
        const res = await axiosApi.put(`Admin/${id}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res.data
    },
    deletAdmin: async (id) => {
        const res = await axiosApi.delete(`Admin/${id}`)
        return res.data
    },
    AddAdmin: async (payload) => {
        const res = await axiosApi.post("User/Admin-Register", payload, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res.data
    }

}
