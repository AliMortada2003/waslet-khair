import React from "react";
import { Link } from "react-router-dom";
import { User, Phone, UserPlus, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/form/FormField";
import PasswordField from "../../components/form/PasswordField";
// 1. استيراد الهوك الجديد المنفصل
import { useRegisterDonor } from "../../hocks/useAuthHocks";
import UploadField from './../../components/ui/form-fields/UploadField';
import AuthSidebar from "../../components/layout/AuthSideBar";
import AuthHeader from "../../components/layout/AuthHeader";
import { toFormData } from './../../helpers/heplper';

const Register = () => {
    // 2. استخدام هوك تسجيل المتبرع مباشرة
    const { mutate: handleRegister, isPending } = useRegisterDonor();

    const initialValues = {
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Password: "",
        ConfirmPassword: "", // تم تفعيله للتحقق
        Image: null,
    };

    const validationSchema = Yup.object({
        FirstName: Yup.string().required("الاسم الأول مطلوب"),
        LastName: Yup.string().required("الاسم الثاني مطلوب"),
        Email: Yup.string()
            .email("البريد الإلكتروني غير صحيح")
            .required("البريد الإلكتروني مطلوب"),
        Phone: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح")
            .required("رقم الهاتف مطلوب"),
        Password: Yup.string()
            .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
            .required("كلمة المرور مطلوبة"),
        ConfirmPassword: Yup.string()
            .oneOf([Yup.ref("Password")], "كلمتا المرور غير متطابقتين")
            .required("تأكيد كلمة المرور مطلوب"),
        Image: Yup.mixed().nullable(),
    });

    const onSubmit = (values, { setSubmitting }) => {
        // 1. تحويل الـ Object إلى FormData عشان الصور تتبعت صح
        const formData = toFormData(values);

        // 2. تمرير الـ formData بدلاً من الـ values
        handleRegister(formData, {
            onSettled: () => setSubmitting(false),
        });
    };

    return (
        <div className="min-h-screen mt-5 pt-15 flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300" dir="rtl">

            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto bg-white dark:bg-slate-900 shadow-2xl z-10">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-xl"
                >
                    <AuthHeader
                        badge="مجتمع العطاء"
                        title="إنشاء"
                        highlight="حساب جديد"
                        subtitle={<>انضم لآلاف المتبرعين وكن <span className="text-slate-700 dark:text-slate-200 font-bold italic">"وصلة"</span> أمل لمن يحتاجون إليك.</>}
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="space-y-4">
                                {/* Profile Image Upload */}
                                <UploadField
                                    name="Image"
                                    label="الصورة الشخصية"
                                    setFieldValue={setFieldValue}
                                    icon={User}
                                    accept="image/jpeg,image/jpg,image/png"
                                />

                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        name="FirstName"
                                        label="الاسم الأول"
                                        placeholder="علي"
                                        icon={User}
                                    />
                                    <FormField
                                        name="LastName"
                                        label="الاسم الثاني"
                                        placeholder="مرتضى"
                                        icon={User}
                                    />
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        name="Email"
                                        label="البريد الإلكتروني"
                                        placeholder="ali@example.com"
                                        icon={Mail}
                                    />
                                    <FormField
                                        name="Phone"
                                        label="رقم الهاتف"
                                        placeholder="01XXXXXXXXX"
                                        icon={Phone}
                                        dir="ltr"
                                    />
                                </div>

                                {/* Password Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PasswordField
                                        name="Password"
                                        label="كلمة المرور"
                                        placeholder="••••••••"
                                    />
                                    <PasswordField
                                        name="ConfirmPassword"
                                        label="تأكيد كلمة المرور"
                                        placeholder="••••••••"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    // نستخدم isPending الخاصة بالتان ستاك كويري لتعطيل الزر أثناء التحميل
                                    disabled={isSubmitting || isPending}
                                    className="w-full bg-[#400068] hover:bg-[#2d004a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-200 dark:shadow-none transition-all flex items-center justify-center gap-3 mt-6 group"
                                >
                                    {isSubmitting || isPending ? (
                                        <span className="animate-pulse">جاري معالجة بياناتك...</span>
                                    ) : (
                                        <>
                                            <span>إنشاء الحساب الآن</span>
                                            <UserPlus size={20} className="group-hover:translate-x-[-4px] transition-transform" />
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-400 dark:text-slate-500">
                                    <ShieldCheck size={14} />
                                    <span>بياناتك مشفرة ومحمية بالكامل</span>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {/* Footer Link */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                        لديك حساب بالفعل؟{" "}
                        <Link to="/login" className="text-[#400068] dark:text-purple-400 hover:underline transition-all">
                            تسجيل الدخول
                        </Link>
                    </div>
                </motion.div>
            </div>

            <AuthSidebar
                badgeText="انضم لأسرة وصلة خير"
                title={<>ابدأ رحلة <span className="text-orange-400">العطاء</span><br /> بحساب جديد</>}
                description="كل جنيه يوضع هنا هو خطوة نحو تغيير حياة شخص ما للأفضل. تبرعك آمن، شفاف، ويصل لمستحقيه."
            />
        </div>
    );
};

export default Register;