import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { User, Phone, Mail, Camera, Save } from "lucide-react";
import ModalHeader from "../../../components/modals/ModalHeader";
import FormField from "../../../components/form/FormField";
import UploadField from "../../../components/ui/form-fields/UploadField";

const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("الاسم الأول مطلوب"),
    LastName: Yup.string().required("الاسم الأخير مطلوب"),
    PhoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
});

const EditProfileModal = ({ isOpen, onClose, initialData }) => {
    if (!isOpen) return null;

    const handleUpdate = (values) => {
        console.log("Updating Profile:", values);
        // هنا تنادي الميوتيشن الخاص بالتعديل
        onClose();
    };

    return (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl max-h-[90vh]  overflow-scroll  animate-in zoom-in-95 duration-300">
                <ModalHeader
                    title="تعديل البروفايل"
                    subtitle="تحديث بياناتك الشخصية وصورتك"
                    icon={User}
                    onClose={onClose}
                    variant="indigo"
                />

                <Formik
                    initialValues={{
                        FirstName: initialData?.firstName || "",
                        LastName: initialData?.lastName || "",
                        PhoneNumber: initialData?.phoneNumber || "",
                        ImageFile: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}
                >
                    {({ setFieldValue, isSubmitting }) => (
                        <Form className="p-8 space-y-6" dir="rtl">
                            {/* صورة البروفايل */}
                            <div className="flex justify-center mb-8">
                                <UploadField
                                    name="ImageFile"
                                    label="تغيير الصورة الشخصية"
                                    icon={Camera}
                                    setFieldValue={setFieldValue}
                                    initialPreview={initialData?.imageUrl}
                                    variant="circular" // لو الكومبوننت يدعم الشكل الدائري
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField name="FirstName" label="الاسم الأول" icon={User} />
                                <FormField name="LastName" label="الاسم الأخير" icon={User} />
                                <FormField name="PhoneNumber" label="رقم الهاتف" icon={Phone} />
                                <FormField name="Email" label="البريد الإلكتروني (لا يمكن تغييره)" icon={Mail} disabled value={initialData?.email} />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t dark:border-white/5">
                                <button type="button" onClick={onClose} className="px-6 py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors">إلغاء</button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                                >
                                    <Save size={18} />
                                    حفظ التغييرات
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