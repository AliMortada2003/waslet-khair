import React, { useMemo, useState } from "react";
import {
    Wallet,
    CreditCard,
    Landmark,
    Smartphone,
    Loader2,
    AlertCircle,
    HandHeart,
    ChevronLeft,
    ShieldCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/ui/layout/PageHeader";
import { Button } from "../../components/buttoms/Button";
import { useGetCaseDetails } from "../../hocks/useCaseHooks";
import { useUser } from "../../hocks/useAuthHocks";
import VisaPaymentModal from "./modals/VisaPaymentModal";
import VodafoneCashModal from "./modals/VodafoneCashModal";
import FawryPaymentModal from "./modals/FawryPaymentModal";
import InstaPayModal from "./modals/InstaPayModal";
import { useAddDonation } from "../../hocks/useHoksDonation";

const quickAmounts = [50, 100, 200, 500, 1000];

export const paymentMethods = [
    {
        id: "visa",
        label: "Visa / Meeza",
        logo: "/images/PayMethods/Meeza.svg.png",
        icon: CreditCard,
        description: "الدفع باستخدام البطاقات البنكية",
    },
    {
        id: "vodafone",
        label: "Vodafone Cash",
        logo: "/images/PayMethods/vodafone.jpg",
        icon: Smartphone,
        description: "الدفع عبر محفظة فودافون كاش",
    },
    {
        id: "fawry",
        label: "Fawry",
        logo: "/images/PayMethods/fawry.jpg",
        icon: Wallet,
        description: "الدفع باستخدام كود فوري",
    },
    {
        id: "instapay",
        label: "InstaPay",
        logo: "/images/PayMethods/instapay.webp",
        icon: Landmark,
        description: "تحويل مباشر عبر InstaPay",
    },
];

const DonatePage = () => {
    const { caseId } = useParams();
    const navigate = useNavigate();

    const { data: userData } = useUser();
    const donorId = userData?.user?.id;
    const { mutateAsync: addDonation, isPending: isAddingDonation } = useAddDonation(caseId);

    const {
        data: caseData,
        isLoading,
        isError,
        error,
    } = useGetCaseDetails(caseId);

    const [amount, setAmount] = useState(100);
    const [customAmount, setCustomAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("visa");
    const [activePaymentModal, setActivePaymentModal] = useState(null);

    const isGuest = !donorId;

    const resolvedAmount = useMemo(() => {
        const numericCustom = Number(customAmount || 0);
        return numericCustom > 0 ? numericCustom : Number(amount || 0);
    }, [amount, customAmount]);

    const progress = useMemo(() => {
        const collected = Number(
            caseData?.collectedAmount || caseData?.currentAmount || 0
        );
        const target = Number(
            caseData?.targetAmount || caseData?.goalAmount || 0
        );

        if (!target || target <= 0) return 0;
        return Math.min((collected / target) * 100, 100);
    }, [caseData]);

    const remainingAmount = useMemo(() => {
        const collected = Number(
            caseData?.collectedAmount || caseData?.currentAmount || 0
        );
        const target = Number(
            caseData?.targetAmount || caseData?.goalAmount || 0
        );
        return Math.max(target - collected, 0);
    }, [caseData]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("ar-EG").format(Number(value || 0));
    };

    const selectedPaymentMethod = paymentMethods.find(
        (method) => method.id === paymentMethod
    );

    const handleQuickAmount = (value) => {
        setAmount(value);
        setCustomAmount("");
    };

    const handleContinueToPayment = () => {
        if (!resolvedAmount || resolvedAmount <= 0) return;
        setActivePaymentModal(paymentMethod);
    };

    if (isLoading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                dir="rtl"
            >
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                    <p className="font-black text-slate-600 dark:text-slate-300">
                        جاري تحميل بيانات الحالة...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !caseData) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-6"
                dir="rtl"
            >
                <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-red-100 dark:border-red-500/10 shadow-xl p-10">
                    <AlertCircle
                        className="mx-auto text-red-500 mb-5"
                        size={60}
                    />
                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-3">
                        تعذر تحميل الحالة
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        {error?.message || "حدث خطأ غير متوقع"}
                    </p>
                </div>
            </div>
        );
    }

    const handleAddDonation = () => {
        const payload = {
            caseId: Number(caseId),
            donorId: donorId || null,
            amount: resolvedAmount,
        };
        return addDonation(payload);
    };
    return (
        <div
            className="p-5 py-17  mt-8 container mx-auto max-w-7xl  bg-transparent animate-in fade-in duration-700"
            dir="rtl"
        >
            <PageHeader
                title="إتمام عملية التبرع"
                subtitle="اختر المبلغ وطريقة الدفع ثم أكمل عملية التبرع"
                icon={HandHeart}
                breadcrumb="التبرع / تجهيز العملية"
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                {/* Case Info */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">
                        <div className="relative h-60 overflow-hidden">
                            <img
                                src={
                                    caseData?.coverImageUrl ||
                                    caseData?.imageUrl ||
                                    "/images/placeholder-case.jpg"
                                }
                                alt={
                                    caseData?.title ||
                                    caseData?.caseTitle ||
                                    "صورة الحالة"
                                }
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 right-4 left-4">
                                <h2 className="text-white text-xl font-black line-clamp-2">
                                    {caseData?.title || caseData?.caseTitle}
                                </h2>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 font-bold">
                                    الجمعية
                                </span>
                                <span className="text-slate-900 dark:text-white font-black">
                                    {caseData?.charityName ||
                                        "جمعية غير محددة"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                    <p className="text-xs text-slate-400 font-black mb-1">
                                        تم جمع
                                    </p>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-black text-base">
                                        {formatCurrency(
                                            caseData?.collectedAmount ||
                                            caseData?.currentAmount
                                        )}{" "}
                                        ج.م
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-3">
                                    <p className="text-xs text-slate-400 font-black mb-1">
                                        المتبقي
                                    </p>
                                    <p className="text-orange-500 font-black text-base">
                                        {formatCurrency(remainingAmount)} ج.م
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2 text-xs">
                                    <span className="text-slate-500 font-bold">
                                        نسبة التقدم
                                    </span>
                                    <span className="text-slate-900 dark:text-white font-black">
                                        {Math.round(progress)}%
                                    </span>
                                </div>

                                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-l from-indigo-600 via-indigo-500 to-orange-400"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-200/70 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <ShieldCheck
                                className="text-emerald-500"
                                size={20}
                            />
                            <h3 className="font-black text-slate-900 dark:text-white">
                                نوع العملية
                            </h3>
                        </div>

                        <div className="rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-800/50">
                            <p className="text-sm font-bold text-slate-500 mb-1">
                                حالة المستخدم
                            </p>
                            <p className="text-base font-black text-slate-900 dark:text-white">
                                {isGuest ? "ضيف" : "متبرع مسجل"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Area */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Amount */}
                    <div className="rounded-[2rem] border border-slate-200/70 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <Wallet
                                className="text-indigo-600 dark:text-indigo-400"
                                size={22}
                            />
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">
                                اختر مبلغ التبرع
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                            {quickAmounts.map((value) => {
                                const isActive =
                                    !customAmount && Number(amount) === value;

                                return (
                                    <button
                                        key={value}
                                        onClick={() =>
                                            handleQuickAmount(value)
                                        }
                                        className={`h-14 rounded-2xl border font-black text-base transition-all ${isActive
                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20"
                                            : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-indigo-300"
                                            }`}
                                    >
                                        {value} ج.م
                                    </button>
                                );
                            })}
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-700 dark:text-slate-200 mb-2">
                                أو أدخل مبلغًا مخصصًا
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={customAmount}
                                onChange={(e) =>
                                    setCustomAmount(e.target.value)
                                }
                                placeholder="اكتب المبلغ هنا"
                                className="w-full h-14 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 text-lg text-slate-800 dark:text-white font-black outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Payment methods */}
                    <div className="rounded-[2rem] border border-slate-200/70 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <CreditCard
                                className="text-orange-500"
                                size={22}
                            />
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">
                                اختر وسيلة الدفع
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentMethods.map((method) => {
                                const isActive =
                                    paymentMethod === method.id;
                                const Icon = method.icon;

                                return (
                                    <button
                                        key={method.id}
                                        onClick={() =>
                                            setPaymentMethod(method.id)
                                        }
                                        className={`p-4 rounded-[1.5rem] border flex items-center gap-4 transition-all text-right ${isActive
                                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 shadow-md"
                                            : "border-slate-200 dark:border-white/10 hover:border-indigo-300"
                                            }`}
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0">
                                            <img
                                                src={method.logo}
                                                alt={method.label}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0 text-right">
                                            <div className="flex items-center gap-2 justify-between">
                                                <p className="font-black text-slate-900 dark:text-white text-base">
                                                    {method.label}
                                                </p>
                                                <Icon
                                                    size={18}
                                                    className={
                                                        isActive
                                                            ? "text-indigo-600 dark:text-indigo-400"
                                                            : "text-slate-400"
                                                    }
                                                />
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                                                {method.description}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-[2rem] border border-slate-200/70 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <Wallet
                                className="text-emerald-500"
                                size={22}
                            />
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">
                                ملخص التبرع
                            </h3>
                        </div>

                        <div className="rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/40 p-5 border border-slate-200/70 dark:border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-400 font-black mb-1">
                                        الحالة
                                    </p>
                                    <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                                        {caseData?.title ||
                                            caseData?.caseTitle}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400 font-black mb-1">
                                        وسيلة الدفع
                                    </p>
                                    <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                                        {selectedPaymentMethod?.label}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400 font-black mb-1">
                                        نوع التبرع
                                    </p>
                                    <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                                        {isGuest ? "ضيف" : "متبرع مسجل"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400 font-black mb-1">
                                        المبلغ
                                    </p>
                                    <p className="text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                                        {formatCurrency(resolvedAmount)}{" "}
                                        <span className="text-lg">ج.م</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={handleContinueToPayment}
                                disabled={
                                    !resolvedAmount ||
                                    resolvedAmount <= 0
                                }
                                className="flex-1 h-12 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all duration-300 disabled:opacity-60"
                            >
                                <>
                                    إتمام الدفع
                                    <ChevronLeft size={18} />
                                </>
                            </Button>

                            <button
                                onClick={() => navigate(-1)}
                                className="h-12 px-6 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                            >
                                رجوع
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <VisaPaymentModal
                isOpen={activePaymentModal === "visa"}
                onClose={() => setActivePaymentModal(null)}
                caseData={caseData}
                amount={resolvedAmount}
                donorId={donorId}
                isGuest={isGuest}
                onSubmitDonation={handleAddDonation}
                isSubmitting={isAddingDonation}
            />

            <VodafoneCashModal
                isOpen={activePaymentModal === "vodafone"}
                onClose={() => setActivePaymentModal(null)}
                caseData={caseData}
                amount={resolvedAmount}
                donorId={donorId}
                isGuest={isGuest}
                onSubmitDonation={handleAddDonation}
                isSubmitting={isAddingDonation}
            />
            
            <FawryPaymentModal
                isOpen={activePaymentModal === "fawry"}
                onClose={() => setActivePaymentModal(null)}
                caseData={caseData}
                amount={resolvedAmount}
                donorId={donorId}
                isGuest={isGuest}
                onSubmitDonation={handleAddDonation}
                isSubmitting={isAddingDonation}
            />

            <InstaPayModal
                isOpen={activePaymentModal === "instapay"}
                onClose={() => setActivePaymentModal(null)}
                caseData={caseData}
                amount={resolvedAmount}
                donorId={donorId}
                isGuest={isGuest}
                onSubmitDonation={handleAddDonation}
                isSubmitting={isAddingDonation}
            />
        </div>
    );
};

export default DonatePage;