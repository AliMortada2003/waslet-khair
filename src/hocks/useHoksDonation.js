import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showAlert } from "../helpers/alerts";
import { donationServices } from "../services/donation";

// 1. جلب كل التبرعات
export const useGetAllDonations = () => {
    return useQuery({
        queryKey: ["donations"],
        queryFn: donationServices.get_Alldonation,
    });
};

export const useGetAllDonationsToCharity = (charityId) => {
    return useQuery({
        queryKey: ["charityDonation", charityId],
        queryFn: () => donationServices.get_AlldonationToCharity(charityId),
        enabled: !!charityId
    });
};
// 2. جلب تبرعات متبرع معين
export const useGetDonationsByDonor = (donorId) => {
    return useQuery({
        queryKey: ["donations", "donor", donorId],
        queryFn: () => donationServices.get_Alldonation_For_Donner(donorId),
        enabled: !!donorId,
    });
};

// 3. جلب تبرعات حالة معينة
export const useGetDonationsByCase = (caseId) => {
    return useQuery({
        queryKey: ["donations", "case", caseId],
        queryFn: () => donationServices.get_all_Donnation_For_Case(caseId),
        enabled: !!caseId,
    });
};

// 4. إضافة تبرع جديد
export const useAddDonation = (caseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) =>
            payload?.donorId
                ? donationServices.add_Donation(payload)
                : donationServices.add_Donation_Guest(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["case", caseId] });
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            showAlert.success("تم التبرع", "شكراً لك، تم تسجيل تبرعك بنجاح");
        },
        onError: (error) => {
            showAlert.error("خطأ", error.response?.data?.message || "فشل تسجيل التبرع");
        }
    });
};

// 5. حذف تبرع
export const useDeleteDonation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (donationId) => donationServices.delete_Donation(donationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
            showAlert.success("تم الحذف", "تم حذف سجل التبرع بنجاح");
        },
    });
};
