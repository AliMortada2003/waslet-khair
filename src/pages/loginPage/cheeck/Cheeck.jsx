import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthHeader from "../../../components/layout/AuthHeader";
import FormField from "../../../components/form/FormField";
import AuthSidebar from "../../../components/layout/AuthSideBar";
// 1. استيراد الهوك المخصص للتحقق من الكود
import { useCheckCode } from "../../../hocks/useAuthHocks";
import { resetPasswordStorage } from "../../../helpers/resetPasswordStorage";

const CheckCode = () => {
    // 2. استخدام الهوك المخصص
    const { mutate: verifyCode, isPending } = useCheckCode();

    // جلب الإيميل من التخزين المحلي
    const storedData = resetPasswordStorage.get();

    const initialValues = {
        code: "",
    };

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("كود التحقق مطلوب")
            .min(4, "الكود غير مكتمل"), // أضفت تحقق بسيط من طول الكود إذا كان 4 أو 6 أرقام
    });

    const onSubmit = (values, { setSubmitting }) => {
        // نرسل الإيميل المخزن مع الكود المدخل
        verifyCode(
            {
                email: storedData?.email,
                code: values.code,
            },
            {
                onSettled: () => setSubmitting(false),
            }
        );
    };

    return (
        <div className="min-h-screen mt-5 flex bg-slate-50 dark:bg-slate-950" dir="rtl">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white dark:bg-slate-900 shadow-2xl z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <AuthHeader
                        badge="تحقق الأمان"
                        title="أدخل"
                        highlight="الكود"
                        subtitle="أدخل الكود المرسل إلى بريدك الإلكتروني."
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">

                                {/* عرض الإيميل ليكون المستخدم على دراية بأي حساب يتم التحقق منه */}
                                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 text-center">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">تم إرسال الكود إلى:</p>
                                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 break-all">
                                        {storedData?.email || "البريد الإلكتروني غير متاح"}
                                    </span>
                                </div>

                                <FormField
                                    name="code"
                                    maxLength={6} // أصلحت الـ Prop لتكون CamelCase
                                    type="text"
                                    label="كود التحقق"
                                    placeholder="123456"
                                    icon={ShieldCheck}
                                    dir="ltr"
                                    className="text-center tracking-[1em] font-black text-xl focus:ring-indigo-500"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isPending || !storedData?.email}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    {isSubmitting || isPending ? (
                                        <span className="animate-pulse">جاري التحقق...</span>
                                    ) : (
                                        <>
                                            <span>تأكيد الكود</span>
                                            <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center font-bold">
                        <Link
                            to="/forget-password"
                            className="text-orange-600 dark:text-orange-400 hover:text-indigo-600 inline-flex items-center gap-1 group transition-colors text-sm"
                        >
                            <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-[3px] transition-transform" />
                            رجوع لتغيير البريد الإلكتروني
                        </Link>
                    </div>
                </motion.div>
            </div>

            <AuthSidebar
                badgeText="تحقق سريع"
                title={
                    <>
                        تأكيد <br /> <span className="text-orange-400">الهوية</span>
                    </>
                }
                description="خطوة أخيرة للتحقق من ملكية الحساب قبل إعادة التعيين."
            />
        </div>
    );
};

export default CheckCode;