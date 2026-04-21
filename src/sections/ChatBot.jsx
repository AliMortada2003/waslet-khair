import React, { useState, useRef, useEffect, useMemo } from "react";
import { MessageCircle, X, Send, Bot, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useChatBot } from "../hocks/useChatBot";
import { useGetCases } from "../hocks/useCaseHooks";

const WELCOME_MESSAGE = {
    text: "مرحباً بك في وصلة خير، أنا وصلة مساعدك الذكي. أقدر أساعدك في اختيار الحالة المناسبة للتبرع. كيف أقدر أخدمك اليوم؟",
    isBot: true,
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);
    const [input, setInput] = useState("");
    const [userLocation, setUserLocation] = useState(null);

    const messagesEndRef = useRef(null);

    const { data: cases = [] } = useGetCases();
    const { mutate, isPending } = useChatBot();

    const quickQuestions = [
        {
            id: 1,
            text: "❤️ إزاي أتبرع؟",
            value: "إزاي أتبرع من خلال المنصة؟",
        },
        {
            id: 2,
            text: "📍 أقرب حالة ليا",
            value: "ايه أقرب الحالات المتاحة ليا حسب موقعي؟",
        },
        {
            id: 3,
            text: "🏥 حالات طبية",
            value: "عايز أشوف الحالات الطبية المتاحة",
        },
        {
            id: 4,
            text: "🍞 حالات غذاء",
            value: "عايز أشوف حالات تتعلق بالغذاء والاحتياجات الأساسية",
        },
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isPending]);

    useEffect(() => {
        if (!isOpen || userLocation) return;
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => setUserLocation(null)
        );
    }, [isOpen, userLocation]);

    const normalizedCases = useMemo(() => {
        return (cases || []).map((item) => ({
            id: item.id,
            title: item.title || item.caseTitle || "بدون عنوان",
            description: item.description || "",
            charityName: item.charityName || "",
            categoryName: item.categoryName || "",
            targetAmount: item.targetAmount ?? item.goalAmount ?? 0,
            collectedAmount: item.collectedAmount ?? item.currentAmount ?? 0,
            city: item.city || item.locationName || "",
            latitude: item.latitude ?? null,
            longitude: item.longitude ?? null,
            isCompleted: item.isCompleted ?? false,
        }));
    }, [cases]);

    const handleSendMessage = (messageText) => {
        if (!messageText.trim() || isPending) return;

        const currentHistory = messages;

        setMessages((prev) => [...prev, { text: messageText, isBot: false }]);

        mutate(
            {
                message: messageText,
                history: currentHistory,
                contextData: {
                    cases: normalizedCases,
                    userLocation,
                },
            },
            {
                onSuccess: (botReply) => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            text:
                                typeof botReply === "string"
                                    ? botReply
                                    : "تم استلام رسالتك، لكن تعذر تنسيق الرد.",
                            isBot: true,
                        },
                    ]);
                },
                onError: (error) => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            text:
                                error?.message ||
                                "عذراً، وصلة تواجه مشكلة في الاتصال حالياً. حاول مرة أخرى بعد قليل.",
                            isBot: true,
                            isError: true,
                        },
                    ]);
                },
            }
        );
    };

    const handleSend = () => {
        const currentInput = input.trim();
        if (!currentInput) return;

        setInput("");
        handleSendMessage(currentInput);
    };

    const handleQuickQuestion = (question) => {
        handleSendMessage(question.value);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50" dir="rtl">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="mb-2 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="bg-gradient-to-l from-indigo-600 to-orange-500 p-5 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/15 rounded-xl border border-white/10">
                                    <Bot size={40} />
                                </div>
                                <div>
                                    <span className="font-black text-lg block leading-none">
                                        وصلة
                                    </span>
                                    <span className="text-[10px] text-white/80 uppercase tracking-wider">
                                        المساعد الذكي لمنصة وصلة خير
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-2 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="h-52 md:h-72 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-950 scrollbar-none">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`flex gap-2.5 ${msg.isBot ? "justify-start" : "justify-end"
                                        }`}
                                >
                                    {msg.isBot && (
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                            <Bot size={16} />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[80%] p-3.5 rounded-2xl text-sm shadow-sm whitespace-pre-line ${msg.isBot
                                                ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-tr-none"
                                                : "bg-gradient-to-l from-indigo-600 to-orange-500 text-white rounded-tl-none"
                                            } ${msg.isError
                                                ? "!bg-red-50 !text-red-800 border border-red-200"
                                                : ""
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isPending && (
                                <div className="flex gap-2 justify-start items-center text-slate-400 text-[10px]">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                    <span>وصلة تحلل استفسارك...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="px-4 py-3 grid grid-cols-2 gap-2 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
                            {quickQuestions.map((q) => (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuickQuestion(q)}
                                    disabled={isPending}
                                    className="text-[10px] md:text-xs font-bold bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all border border-transparent hover:border-indigo-500 disabled:opacity-50"
                                >
                                    {q.text}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 bg-white dark:bg-slate-900 flex gap-2 items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="اسأل وصلة أي شيء..."
                                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isPending || !input.trim()}
                                className="p-3 bg-gradient-to-l from-indigo-600 to-orange-500 text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                <Send size={20} />
                            </button>
                        </div>

                        <div className="text-center pb-3 text-[9px] text-slate-400 dark:text-slate-600 flex items-center justify-center gap-1">
                            <CornerDownLeft size={8} />
                            مدعوم بتجربة ذكية داخل وصلة خير
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-gradient-to-l from-indigo-600 to-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:opacity-90 transition-all border-4 border-white dark:border-slate-900"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>
        </div>
    );
};

export default ChatBot;