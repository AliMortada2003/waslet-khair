import { useMutation } from "@tanstack/react-query";
import { chatService } from "./../services/chatService";
import { useRef } from "react";

export const useChatBot = () => {
    const lastRequestTime = useRef(0);

    return useMutation({
        mutationFn: async ({ message, history = [], contextData = {} }) => {
            // ✅ منع الإرسال قبل مرور 15 ثانية من آخر request
            const now = Date.now();
            const timeSinceLast = now - lastRequestTime.current;
            const minInterval = 15000; // 15 ثانية

            if (timeSinceLast < minInterval) {
                const waitTime = Math.ceil((minInterval - timeSinceLast) / 1000);
                throw new Error(`انتظر ${waitTime} ثانية قبل الإرسال مرة أخرى`);
            }

            lastRequestTime.current = Date.now();

            return chatService.sendMessage({ message, history, contextData });
        },

        onError: (error) => {
            console.error("ChatBot Error:", error);
        },
    });
};