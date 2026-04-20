import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { donorServices } from "../services/donors";
import { showAlert } from "../helpers/alerts";

// Get All Donors
export const useGetDonors = () => {
    return useQuery({
        queryKey: ["donors"],
        queryFn: donorServices.getAllDonors,
    });
};

// Get Donor By Id
export const useGetDonorById = (id) => {
    return useQuery({
        queryKey: ["donor", id],
        queryFn: () => donorServices.getDonorById(id),
        enabled: !!id,
    });
};

// Update Donor
export const useUpdateDonor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => donorServices.updateDonor(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["donors"] });
            queryClient.invalidateQueries({ queryKey: ["donor", variables.id] });

            showAlert.success("تم التحديث", "تم تعديل بيانات المتبرع بنجاح");
        },
        onError: (err) => {
            showAlert.error(
                "فشل التعديل",
                err?.response?.data?.message || err?.response?.message || "حدث خطأ أثناء التعديل"
            );
        },
    });
};

// Delete Donor
export const useDeleteDonor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => donorServices.deleteDonor(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donors"] });
            showAlert.success("تم الحذف", "تم حذف المتبرع بنجاح");
        },
        onError: (err) => {
            showAlert.error(
                "فشل الحذف",
                err?.response?.data?.message || err?.response?.message || "حدث خطأ أثناء الحذف"
            );
        },
    });
};

// Update Donor
export const useConfirmDonor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => donorServices.confirmEmail(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["donors"]})
        },
        onError: (err) => {
            console.log(err?.response)
        }
    })
};
