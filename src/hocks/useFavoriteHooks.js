import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteCaseServices } from "../services/favorite";

export const useGetFavoriteCasesByDonorId = (donorId) => {
    return useQuery({
        queryKey: ["favorite-cases", donorId],
        queryFn: () => favoriteCaseServices.getAllFavoriteCase(donorId),
        enabled: !!donorId,
    });
};

export const useAddCaseToFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => favoriteCaseServices.addCaseTofavorite(payload),
        onSuccess: (_, variables) => {
            if (variables?.donorId) {
                queryClient.invalidateQueries({
                    queryKey: ["favorite-cases", variables.donorId],
                });
            }
        },
        onError: (err) => {
            console.log(err?.response)
        }
    });
};

export const useDeleteFavoriteCase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ donorId, caseId }) =>
            favoriteCaseServices.deleteFavoriteCase(donorId, caseId),
        onSuccess: (_, variables) => {
            if (variables?.donorId) {
                queryClient.invalidateQueries({
                    queryKey: ["favorite-cases", variables.donorId],
                });
            }
        },
    });
};