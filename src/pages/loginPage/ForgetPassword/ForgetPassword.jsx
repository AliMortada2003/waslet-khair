import React from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthHeader from "../../../components/layout/AuthHeader";
import FormField from "../../../components/form/FormField";
import AuthSidebar from "../../../components/layout/AuthSideBar";
// التعديل: استدعاء الهوك المخصص فقط
import { useForgotPassword } from './../../../hocks/useAuthHocks';

const ForgetPassword = () => {
    // التعديل: استخراج الدوال من هوك نسيت كلمة المرور
    const { mutate: sendCode, isPending } = useForgotPassword();

    const initialValues = {
        email: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("البريد الإلكتروني غير صحيح")
            .required("البريد الإلكتروني مطلوب"),
    });

    const onSubmit = (values, { setSubmitting }) => {
        // نمرر الإيميل مباشرة كما هو معرف في الـ mutationFn
        sendCode(values.email, {
            onSettled: () => setSubmitting(false),
        });
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
                        badge="استعادة الحساب"
                        title="نسيت"
                        highlight="كلمة المرور؟"
                        subtitle="أدخل بريدك الإلكتروني وسنرسل لك كود التحقق."
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <FormField
                                    name="email"
                                    type="email"
                                    label="البريد الإلكتروني"
                                    placeholder="example@mail.com"
                                    icon={Mail}
                                    dir="ltr"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isPending}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    {isSubmitting || isPending ? (
                                        <span className="animate-pulse">جاري الإرسال...</span>
                                    ) : (
                                        <>
                                            <span>إرسال الكود</span>
                                            <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center font-bold">
                        <Link
                            to="/login"
                            className="text-orange-600 dark:text-orange-400 hover:text-indigo-600 inline-flex items-center gap-1 group transition-colors text-sm"
                        >
                            العودة لتسجيل الدخول
                            <ArrowLeft
                                size={16}
                                className="group-hover:translate-x-[-3px] transition-transform"
                            />
                        </Link>
                    </div>
                </motion.div>
            </div>

            <AuthSidebar
                badgeText="لا تقلق"
                title={
                    <>
                        استعادة <br /> <span className="text-orange-400">الوصول</span>
                    </>
                }
                description="سنساعدك على استعادة حسابك بخطوات بسيطة وآمنة."
            />
        </div>
    );
};

export default ForgetPassword;