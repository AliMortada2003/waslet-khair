import { useMutation } from "@tanstack/react-query";
import { chatService } from "./../services/chatService";

export const useChatBot = () => {
    return useMutation({
        mutationFn: ({ message, history = [], contextData = {} }) =>
            chatService.sendMessage({
                message,
                history,
                contextData,
            }),

        onSuccess: () => {
            // أي logic إضافي بعد النجاح
        },

        onError: (error) => {
            console.error("ChatBot Error:", error);
        },
    });
};