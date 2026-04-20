import React, { useMemo, useState } from "react";
import {
    Wallet,
    Copy,
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import PaymentModalShell from "./PaymentModalShell";
import { Button } from "./../../../components/buttoms/Button";

const FawryPaymentModal = ({
    isOpen,
    onClose,
    caseData,
    amount,
    onSubmitDonation,
    isSubmitting,
}) => {
    const [submitState, setSubmitState] = useState("idle");

    const paymentCode = "74295531882";
    const caseTitle = caseData?.title || caseData?.caseTitle || "الحالة";

    const amountLabel = useMemo(
        () => new Intl.NumberFormat("ar-EG").format(Number(amount || 0)),
        [amount]
    );

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(paymentCode);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    const handleConfirmPaid = async () => {
        try {
            setSubmitState("idle");

            await onSubmitDonation();

            setSubmitState("success");
            onClose();
        } catch (error) {
            console.error(error);
            setSubmitState("failed");
        }
    };

    return (
        <PaymentModalShell
            isOpen={isOpen}
            onClose={onClose}
            title="الدفع عبر فوري"
            subtitle="استخدم كود الدفع التالي لإتمام العملية"
            logo="/images/PayMethods/fawry.jpg"
        >
            <div className="space-y-5">
                <div className="rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/40 p-4 border border-slate-200/70 dark:border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-slate-400 font-black mb-1">
                                الحالة
                            </p>
                            <p className="font-black text-slate-900 dark:text-white">
                                {caseTitle}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400 font-black mb-1">
                                المبلغ
                            </p>
                            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                {amountLabel} ج.م
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 p-5 text-center">
                    <p className="text-sm text-slate-500 font-bold mb-2">
                        كود الدفع
                    </p>
                    <p className="text-3xl md:text-4xl font-black tracking-wider text-orange-500">
                        {paymentCode}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleCopy}
                        className="flex-1 h-12 rounded-2xl border border-slate-200 dark:border-white/10 font-black flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                        <Copy size={16} />
                        نسخ الكود
                    </button>

                    <Button
                        onClick={handleConfirmPaid}
                        disabled={isSubmitting}
                        className="flex-1 h-12 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                جاري التأكيد...
                            </>
                        ) : (
                            <>
                                <Wallet size={16} />
                                تم الدفع
                            </>
                        )}
                    </Button>
                </div>

                {submitState === "success" && (
                    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 p-4 flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={20} />
                        <p className="font-bold text-emerald-700 dark:text-emerald-300">
                            تم تسجيل التبرع بنجاح.
                        </p>
                    </div>
                )}

                {submitState === "failed" && (
                    <div className="rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 flex items-center gap-3">
                        <AlertCircle className="text-red-500" size={20} />
                        <p className="font-bold text-red-700 dark:text-red-300">
                            حدث خطأ أثناء تسجيل العملية.
                        </p>
                    </div>
                )}
            </div>
        </PaymentModalShell>
    );
};

export default FawryPaymentModal;