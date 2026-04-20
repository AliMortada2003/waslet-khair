import axiosApi from "../Axios/axios"

export const favoriteCaseServices = {
    addCaseTofavorite: async (payload) => {
        const response = await axiosApi.post("FavoriteCase", payload);
        return response.data
    },
    getAllFavoriteCase: async (donorId) => {
        const response = await axiosApi.get(`FavoriteCase/donor/${donorId}`)
        return response.data
    },
    deleteFavoriteCase: async (donorId, caseId) => {
        const response = await axiosApi.delete(`FavoriteCase/donor/${donorId}/case/${caseId}`)
        return response.data
    }
}