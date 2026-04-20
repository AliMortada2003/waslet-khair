import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    User,
    Mail,
    Phone,
    Lock,
    Image as ImageIcon,
    Save,
} from "lucide-react";

import FormField from "../../../components/form/FormField";
import UploadField from "../../../components/ui/form-fields/UploadField";
import ModalHeader from "../../../components/modals/ModalHeader";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("الاسم الأخير مطلوب"),
    email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
    password: Yup.string().min(6, "كلمة المرور لا تقل عن 6 أحرف"),
});

const EditProfileModal = ({
    isOpen,
    onClose,
    initialData,
    onSubmit,
    isSubmitting: externalSubmitting = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">

                <ModalHeader
                    title="تعديل الحساب"
                    subtitle="تحديث بيانات السوبر أدمن"
                    icon={User}
                    onClose={onClose}
                    variant="indigo"
                />

                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: initialData?.firstName || "",
                        lastName: initialData?.lastName || "",
                        email: initialData?.email || "",
                        phone: initialData?.phoneNumber || "",
                        password: "",
                        image: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => {
                        const formData = new FormData();

                        formData.append("FirstName", values.firstName);
                        formData.append("LastName", values.lastName);
                        formData.append("Email", values.email);
                        formData.append("PhoneNumber", values.phone);

                        if (values.password) {
                            formData.append("Password", values.password);
                        }

                        if (values.image) {
                            formData.append("Image", values.image);
                        }

                        onSubmit(formData, helpers);
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="flex flex-col flex-1 overflow-hidden">

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">

                                {/* الاسم */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        name="firstName"
                                        label="الاسم الأول"
                                        icon={User}
                                        placeholder="اكتب الاسم الأول"
                                        required
                                    />
                                    <FormField
                                        name="lastName"
                                        label="الاسم الأخير"
                                        icon={User}
                                        placeholder="اكتب الاسم الأخير"
                                        required
                                    />
                                </div>

                                {/* التواصل */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        name="email"
                                        label="البريد الإلكتروني"
                                        icon={Mail}
                                        placeholder="example@email.com"
                                        required
                                    />
                                    <FormField
                                        name="phone"
                                        label="رقم الهاتف"
                                        icon={Phone}
                                        placeholder="01xxxxxxxxx"
                                        required
                                    />
                                </div>

                                {/* الباسورد */}
                                <FormField
                                    name="password"
                                    label="كلمة المرور الجديدة (اختياري)"
                                    icon={Lock}
                                    type="password"
                                    placeholder="اتركها فارغة لو مش عايز تغيرها"
                                />

                                {/* الصورة */}
                                <UploadField
                                    name="image"
                                    label="الصورة الشخصية"
                                    setFieldValue={setFieldValue}
                                    icon={ImageIcon}
                                    accept="image/*"
                                    initialPreview={initialData?.imageUrl}
                                />

                                <p className="text-[11px] text-slate-400 font-bold">
                                    * يمكنك تعديل البيانات التي تريد فقط، وترك الباقي كما هو.
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 border-t dark:border-white/5 flex items-center justify-end gap-3 bg-white dark:bg-[#0f172a]">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || externalSubmitting}
                                    className="px-10 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {(isSubmitting || externalSubmitting) ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            جارٍ الحفظ...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            حفظ التغييرات
                                        </>
                                    )}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditProfileModal;