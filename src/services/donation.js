
import axiosApi from './../Axios/axios';
export const donationServices = {
    get_Alldonation: async () => {
        const res = await axiosApi.get("Donation")
        return res.data
    },
    get_Alldonation_For_Donner: async (donnerId) => {
        const res = await axiosApi.get(`Donation/donor/${donnerId}`)
        return res.data
    },
    add_Donation: async (payload) => {
        const res = await axiosApi.post("Donation", payload)
        return res.data
    },
    get_all_Donnation_For_Case: async (caseId) => {
        const res = await axiosApi.get(`/Donation/case/${caseId}`)
        return res.data
    },
    get_One_Donation_Details: async (donationId) => {
        const res = await axiosApi.get(`/Donation/${donationId}`)
        return res.data
    },
    delete_Donation: async (donationId) => {
        const res = await axiosApi.delete(`/Donation/${donationId}`)
        return res.data
    },

}