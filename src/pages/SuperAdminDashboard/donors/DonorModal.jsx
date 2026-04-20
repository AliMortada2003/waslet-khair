import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    ShieldCheck,
    User,
    Mail,
    Phone,
    Lock,
    Building2,
    Image as ImageIcon,
} from "lucide-react";

import FormField from "./../../../components/form/FormField";
import ModalHeader from "../../../components/modals/ModalHeader";
import UploadField from "../../../components/ui/form-fields/UploadField";
import { toFormData } from "axios";
import PasswordField from './../../../components/ui/form-fields/PasswordField';
import SelectField from "../../../components/ui/form-fields/SelectField";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("الاسم الأخير مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
    email: Yup.string().email("بريد غير صالح").required("البريد الإلكتروني مطلوب"),
    password: Yup.string().when("$isEdit", {
        is: false,
        then: (schema) => schema.required("كلمة المرور مطلوبة"),
        otherwise: (schema) => schema.notRequired(),
    }),
});

const DonorModal = ({
    isOpen,
    onClose,
    initialData,
    onSubmit,
    isSubmitting: externalSubmitting = false,
}) => {
    if (!isOpen) return null;

    const isEdit = !!initialData?.id;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden max-h-[90vh] flex flex-col">
                <ModalHeader
                    title={"تعديل بيانات المتبرع"}
                    subtitle="إدارة المتبرعين وحل مشاكل المتبرعين الخاصة بالموقع "
                    icon={ShieldCheck}
                    onClose={onClose}
                    variant={isEdit ? "indigo" : "orange"}
                />

                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: initialData?.firstName || "",
                        lastName: initialData?.lastName || "",
                        phone: initialData?.phoneNumber || "",
                        email: initialData?.email || "",
                        password: "",
                        image: null,
                    }}
                    validationSchema={validationSchema}
                    validationContext={{ isEdit }}
                    onSubmit={(values, formikHelpers) => {
                        const formData = toFormData(values);

                        onSubmit(formData, formikHelpers);
                    }}
                >
                    {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                        <Form className="flex flex-col flex-1 min-h-0">
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 flex items-center gap-2 mb-2 border-r-4 border-indigo-500 pr-4">
                                        <h3 className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
                                            البيانات الأساسية
                                        </h3>
                                    </div>

                                    <FormField
                                        name="firstName"
                                        label="الاسم الأول"
                                        icon={User}
                                        placeholder="أدخل الاسم الأول..."
                                        required
                                    />

                                    <FormField
                                        name="lastName"
                                        label="الاسم الأخير"
                                        icon={User}
                                        placeholder="أدخل الاسم الأخير..."
                                        required
                                    />

                                    <FormField
                                        name="email"
                                        label="البريد الإلكتروني"
                                        icon={Mail}
                                        placeholder="mail@example.com"
                                        required
                                    />

                                    <FormField
                                        name="phone"
                                        label="رقم الهاتف"
                                        icon={Phone}
                                        placeholder="01xxxxxxxxx"
                                        required
                                    />

                                    <PasswordField
                                        name="password"
                                        label={isEdit ? "كلمة المرور الجديدة (اختياري)" : "كلمة المرور"}
                                        icon={Lock}
                                        type="password"
                                        placeholder={isEdit ? "اتركها فارغة إذا لم ترد تغييرها" : "أدخل كلمة المرور"}
                                        required={!isEdit}
                                    />
                                    <div className="md:col-span-2 flex items-center gap-2 mt-4 mb-2 border-r-4 border-emerald-500 pr-4">
                                        <h3 className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                                            الصورة الشخصية
                                        </h3>
                                    </div>

                                    <div className="md:col-span-2">
                                        <UploadField
                                            name="image"
                                            label="صورة المسؤول"
                                            setFieldValue={setFieldValue}
                                            icon={ImageIcon}
                                            accept="image/*"
                                            initialPreview={initialData?.imageUrl}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-6 border-t dark:border-white/5 flex items-center justify-end gap-3 bg-white dark:bg-[#0f172a]">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-8 py-3.5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all"
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="submit"
                                    // disabled={isSubmitting || externalSubmitting}
                                    className="px-12 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isSubmitting || externalSubmitting
                                        ? "جارٍ الحفظ..."
                                        : isEdit
                                            ? "تحديث"
                                            : "إضافة"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default DonorModal;