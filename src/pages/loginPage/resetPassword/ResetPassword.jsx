import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// 1. استيراد الهوك المخصص الجديد
import { useResetPassword } from "../../../hocks/useAuthHocks";
import AuthHeader from "../../../components/layout/AuthHeader";
import PasswordField from "../../../components/form/PasswordField";
import AuthSidebar from "../../../components/layout/AuthSideBar";
import { resetPasswordStorage } from "../../../helpers/resetPasswordStorage";

const ResetPassword = () => {
    const navigate = useNavigate();
    // 2. استخدام هوك إعادة التعيين مباشرة
    const { mutate: resetPassword, isPending } = useResetPassword();

    const storedData = resetPasswordStorage.get();


    const initialValues = {
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
            .required("كلمة المرور الجديدة مطلوبة"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "كلمتا المرور غير متطابقتين")
            .required("تأكيد كلمة المرور مطلوب"),
    });

    const onSubmit = (values, { setSubmitting }) => {
        const payload = {
            email: storedData.email,
            code: storedData.code,
            token: storedData.token,
            newPassword: values.newPassword,
        };

        resetPassword(payload, {
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
                        badge="تعيين جديد"
                        title="إعادة تعيين"
                        highlight="كلمة المرور"
                        subtitle="أدخل كلمة المرور الجديدة لإكمال استعادة الحساب."
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                {/* عرض تنبيه للمستخدم بالحساب المستهدف */}
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl flex items-center gap-3">
                                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600">
                                        <LockKeyhole size={20} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-amber-600 dark:text-amber-500 font-bold uppercase tracking-wider">أمان الحساب</p>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium break-all">
                                            تغيير الباسورد لـ: {storedData?.email}
                                        </p>
                                    </div>
                                </div>

                                <PasswordField
                                    name="newPassword"
                                    label="كلمة المرور الجديدة"
                                    placeholder="••••••••"
                                />

                                <PasswordField
                                    name="confirmPassword"
                                    label="تأكيد كلمة المرور"
                                    placeholder="••••••••"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isPending}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    {isSubmitting || isPending ? (
                                        <span className="animate-pulse">جاري الحفظ...</span>
                                    ) : (
                                        <>
                                            <span>تحديث كلمة المرور</span>
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
                            className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 inline-flex items-center gap-1 group transition-colors text-sm"
                        >
                            إلغاء والعودة للدخول
                            <ArrowLeft
                                size={16}
                                className="group-hover:translate-x-[-3px] transition-transform"
                            />
                        </Link>
                    </div>
                </motion.div>
            </div>

            <AuthSidebar
                badgeText="أمان الحساب"
                title={
                    <>
                        كلمة مرور <br /> <span className="text-orange-400">جديدة</span>
                    </>
                }
                description="اختر كلمة مرور قوية وآمنة لحماية حسابك بشكل أفضل. ننصح باستخدام مزيج من الحروف والأرقام."
            />
        </div>
    );
};

export default ResetPassword;