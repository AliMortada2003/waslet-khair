import React, { useMemo, useState } from "react";
import {
    CreditCard,
    Lock,
    Loader2,
    AlertCircle,
} from "lucide-react";
import PaymentModalShell from "./PaymentModalShell";
import { Button } from "./../../../components/buttoms/Button";

const VisaPaymentModal = ({
    isOpen,
    onClose,
    caseData,
    amount,
    isSubmitting,
    onSubmitDonation,
}) => {
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [submitError, setSubmitError] = useState("");

    const caseTitle = caseData?.title || caseData?.caseTitle || "الحالة";

    const amountLabel = useMemo(
        () => new Intl.NumberFormat("ar-EG").format(Number(amount || 0)),
        [amount]
    );

    const formattedCardNumber = useMemo(() => {
        const digits = cardNumber.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    }, [cardNumber]);

    const formattedExpiry = useMemo(() => {
        const digits = expiry.replace(/\D/g, "").slice(0, 4);
        if (digits.length <= 2) return digits;
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }, [expiry]);

    const maskedCvv = useMemo(() => {
        return cvv.replace(/\D/g, "").slice(0, 3);
    }, [cvv]);

    const previewCardNumber =
        formattedCardNumber || "0000 0000 0000 0000";
    const previewCardName = cardName || "CARD HOLDER";
    const previewExpiry = formattedExpiry || "MM/YY";

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 16);
        setCardNumber(value);
        if (submitError) setSubmitError("");
    };

    const handleExpiryChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
        setExpiry(value);
        if (submitError) setSubmitError("");
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 3);
        setCvv(value);
        if (submitError) setSubmitError("");
    };

    const handleCardNameChange = (e) => {
        setCardName(e.target.value);
        if (submitError) setSubmitError("");
    };

    const handleSubmit = async () => {
        if (!cardName.trim()) {
            setSubmitError("من فضلك أدخل اسم حامل البطاقة.");
            return;
        }

        if (cardNumber.replace(/\D/g, "").length !== 16) {
            setSubmitError("من فضلك أدخل رقم بطاقة صحيح مكون من 16 رقم.");
            return;
        }

        if (expiry.replace(/\D/g, "").length !== 4) {
            setSubmitError("من فضلك أدخل تاريخ انتهاء صحيح.");
            return;
        }

        if (cvv.replace(/\D/g, "").length !== 3) {
            setSubmitError("من فضلك أدخل CVV صحيح.");
            return;
        }

        try {
            setSubmitError("");
            await onSubmitDonation();
            onClose();
        } catch (error) {
            setSubmitError("حدث خطأ أثناء تنفيذ العملية.");
        }
    };

    return (
        <PaymentModalShell
            isOpen={isOpen}
            onClose={onClose}
            title="الدفع بالبطاقة"
            subtitle="أدخل بيانات البطاقة لإتمام عملية التبرع"
            logo="/images/PayMethods/Meeza.svg.png"
        >
            <div className="space-y-2">
                {/* Card Preview */}
                <div className="relative overflow-hidden rounded-[2rem] p-5 md:p-6 bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-900 text-white shadow-xl">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-orange-400/20 rounded-full blur-2xl" />

                    <div className="relative">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <p className="text-white/70 text-xs font-bold mb-1">
                                    بطاقة التبرع
                                </p>
                                <p className="text-lg font-black">Visa / Meeza</p>
                            </div>

                            <div className="w-12 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <CreditCard size={20} />
                            </div>
                        </div>

                        <div className="mb-6 tracking-[0.18em] text-lg md:text-2xl font-black">
                            {previewCardNumber}
                        </div>

                        <div className="flex items-end justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-[10px] text-white/70 font-bold mb-1">
                                    CARD HOLDER
                                </p>
                                <p className="text-sm md:text-base font-black truncate uppercase">
                                    {previewCardName}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] text-white/70 font-bold mb-1">
                                    EXPIRES
                                </p>
                                <p className="text-sm md:text-base font-black">
                                    {previewExpiry}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-black text-slate-700 dark:text-slate-200 mb-2">
                            اسم حامل البطاقة
                        </label>
                        <input
                            value={cardName}
                            onChange={handleCardNameChange}
                            placeholder="اكتب الاسم كما هو على البطاقة"
                            className="w-full h-14 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 text-slate-800 dark:text-white font-bold outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black text-slate-700 dark:text-slate-200 mb-2">
                            رقم البطاقة
                        </label>
                        <input
                            value={formattedCardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                            inputMode="numeric"
                            className="w-full h-14 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 text-slate-800 dark:text-white font-bold outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-black text-slate-700 dark:text-slate-200 mb-2">
                                تاريخ الانتهاء
                            </label>
                            <input
                                value={formattedExpiry}
                                onChange={handleExpiryChange}
                                placeholder="MM/YY"
                                inputMode="numeric"
                                className="w-full h-14 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 text-slate-800 dark:text-white font-bold outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-700 dark:text-slate-200 mb-2">
                                CVV
                            </label>
                            <input
                                value={maskedCvv}
                                onChange={handleCvvChange}
                                placeholder="123"
                                inputMode="numeric"
                                className="w-full h-14 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 text-slate-800 dark:text-white font-bold outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 h-12 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                جاري التنفيذ...
                            </>
                        ) : (
                            <>
                                <CreditCard size={16} />
                                ادفع الآن
                            </>
                        )}
                    </Button>

                    <button
                        onClick={onClose}
                        className="h-12 px-6 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                        إغلاق
                    </button>
                </div>

                {submitError && (
                    <div className="rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 flex items-center gap-3">
                        <AlertCircle className="text-red-500" size={20} />
                        <p className="font-bold text-red-700 dark:text-red-300">
                            {submitError}
                        </p>
                    </div>
                )}
            </div>
        </PaymentModalShell>
    );
};

export default VisaPaymentModal;