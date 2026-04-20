import React from "react";
import { Link } from "react-router-dom";
import { LogIn, ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/form/FormField";
import PasswordField from "../../components/form/PasswordField";
import AuthSidebar from "../../components/layout/AuthSideBar";
import AuthHeader from "../../components/layout/AuthHeader";
import { useLogin } from "../../hocks/useAuthHocks";

// استدعاء الهوك الجديد

const Login = () => {
    // التعديل هنا: استدعاء دالة تسجيل الدخول مباشرة
    const { mutate: handleLogin, isPending } = useLogin();

    const initialValues = { email: "", password: "" };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("البريد الإلكتروني غير صحيح")
            .required("البريد الإلكتروني مطلوب"),
        password: Yup.string()
            .min(6, "كلمة المرور قصيرة")
            .required("كلمة المرور مطلوبة"),
    });

    const onSubmit = (values, { setSubmitting }) => {
        // نمرر البيانات مباشرة للهوك
        handleLogin(values, {
            onSettled: () => setSubmitting(false),
        });
    };

    return (
        <div
            className="min-h-screen mt-5 flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
            dir="rtl"
        >
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white dark:bg-slate-900 shadow-2xl z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <AuthHeader
                        badge="عودة حميدة"
                        title="تسجيل"
                        highlight="الدخول"
                        subtitle="سعداء بعودتك إلينا، سجل دخولك الآن لمتابعة أثر تبرعاتك."
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
                                    className="focus:ring-indigo-500"
                                />

                                <div className="space-y-1">
                                    <PasswordField
                                        name="password"
                                        label="كلمة المرور"
                                        placeholder="••••••••"
                                    />

                                    <div className="flex justify-end">
                                        <Link
                                            to="/forget-password"
                                            className="text-xs text-orange-600 dark:text-orange-400 font-bold hover:text-indigo-600 transition-colors"
                                        >
                                            نسيت كلمة المرور؟
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    // نستخدم isPending الخاصة بالتان ستاك كويري
                                    disabled={isSubmitting || isPending}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 dark:shadow-none transition-all flex items-center justify-center gap-3 text-lg group active:scale-[0.98]"
                                >
                                    {isSubmitting || isPending ? (
                                        <span className="animate-pulse">جاري التحقق...</span>
                                    ) : (
                                        <>
                                            <span>دخول الحساب</span>
                                            <LogIn
                                                className="group-hover:translate-x-[-5px] transition-transform"
                                                size={22}
                                            />
                                        </>
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    
                    {/* ... باقي الكود (الروابط والسايد بار) يظل كما هو دون تغيير */}
                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center font-bold">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            ليس لديك حساب؟{" "}
                            <Link
                                to="/register"
                                className="text-orange-600 dark:text-orange-400 hover:text-indigo-600 inline-flex items-center gap-1 group transition-colors"
                            >
                                إنشاء حساب جديد
                                <ArrowLeft
                                    size={16}
                                    className="group-hover:translate-x-[-3px] transition-transform"
                                />
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
            <AuthSidebar
                badgeText="أهلاً بك مجدداً"
                title={<>سجل دخولك <br /> لتكمل <span className="text-orange-400">الخير</span></>}
                description="سعداء بعودتك. تابع حالات التبرع الخاصة بك وكن على اطلاع دائم بأثر مساهماتك."
            />
        </div>
    );
};

export default Login;