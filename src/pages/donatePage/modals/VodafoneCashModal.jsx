import React, { useMemo, useState } from "react";
import { Smartphone, Copy, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import PaymentModalShell from "./PaymentModalShell";
import { Button } from './../../../components/buttoms/Button';

const VodafoneCashModal = ({
    isOpen,
    onClose,
    caseData,
    amount,
    donorId,
    isGuest,
    onSubmitDonation,
    isSubmitting
}) => {
    const [transactionId, setTransactionId] = useState("");
    const [submitState, setSubmitState] = useState("idle");

    const walletNumber = "01012345678";
    const caseTitle = caseData?.title || caseData?.caseTitle || "الحالة";
    const amountLabel = useMemo(
        () => new Intl.NumberFormat("ar-EG").format(Number(amount || 0)),
        [amount]
    );

    const handleCopy = async () => {
        await navigator.clipboard.writeText(walletNumber);
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
            title="الدفع عبر فودافون كاش"
            subtitle="حوّل المبلغ ثم أدخل رقم العملية للتأكيد"
            logo="/images/PayMethods/vodafone.jpg"
        >
            <div className="space-y-5">
                <div className="rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/40 p-4 border border-slate-200/70 dark:border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-slate-400 font-black mb-1">الحالة</p>
                            <p className="font-black text-slate-900 dark:text-white">
                                {caseTitle}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-black mb-1">المبلغ</p>
                            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                {amountLabel} ج.م
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 p-5">
                    <p className="text-sm text-slate-500 font-bold mb-2">رقم المحفظة</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/40 px-4 flex items-center text-lg font-black text-red-500">
                            {walletNumber}
                        </div>
                        <button
                            onClick={handleCopy}
                            className="h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 font-black flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5"
                        >
                            <Copy size={16} />
                            نسخ الرقم
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-black text-slate-700 dark:text-slate-200 mb-2">
                        رقم العملية
                    </label>
                    <input
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="أدخل رقم العملية بعد التحويل"
                        className="w-full h-14 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 text-slate-800 dark:text-white font-bold outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 p-4">
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                        يتم هنا حاليًا محاكاة عملية التحويل والتأكيد. لاحقًا سيتم ربطها بالهوك الفعلي.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
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
                                <Smartphone size={16} />
                                تأكيد التحويل
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

                {submitState === "success" && (
                    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 p-4 flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={20} />
                        <p className="font-bold text-emerald-700 dark:text-emerald-300">
                            تم تسجيل التحويل التجريبي بنجاح.
                        </p>
                    </div>
                )}

                {submitState === "failed" && (
                    <div className="rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 flex items-center gap-3">
                        <AlertCircle className="text-red-500" size={20} />
                        <p className="font-bold text-red-700 dark:text-red-300">
                            حدث خطأ أثناء التأكيد.
                        </p>
                    </div>
                )}
            </div>
        </PaymentModalShell>
    );
};

export default VodafoneCashModal;