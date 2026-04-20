import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Building,
    Mail,
    Phone,
    MapPin,
    Globe,
    Info,
    Image as ImageIcon,
    Facebook,
    X,
    Save,
    Instagram,
    Map,
} from "lucide-react";
import { toFormData } from "axios";

// Schema التحقق من البيانات
const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم المؤسسة مطلوب"),
    email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    mapFile: Yup.string().nullable(),
});

const OrganizationModal = ({
    isOpen,
    onClose,
    initialData,
    onSubmit,
    isSubmitting: externalSubmitting = false,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            dir="rtl"
        >
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden max-h-[92vh] flex flex-col transition-colors">
                {/* Header */}
                <div className="px-8 py-6 bg-indigo-600 dark:bg-indigo-800 text-white flex items-center justify-between relative">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                            <Building size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black">تعديل بيانات المؤسسة</h2>
                            <p className="text-indigo-100 text-xs opacity-80">
                                تحديث المعلومات العامة والروابط الرقمية والملفات
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: initialData?.name || "",
                        description: initialData?.description || "",
                        address: initialData?.address || "",
                        phoneNumber: initialData?.phoneNumber || "",
                        email: initialData?.email || "",
                        facebookUrl: initialData?.facebookUrl || "",
                        websiteUrl: initialData?.websiteUrl || "",
                        instagramUrl: initialData?.instagramUrl || "",
                        logoFile: null,
                        coverFile: null,
                        mapFile: initialData?.mapUrl || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => {
                        const formData = toFormData(values);
                        onSubmit(formData, formikHelpers);
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="flex flex-col flex-1 min-h-0 overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                                {/* القسم الأول */}
                                <section>
                                    <div className="flex items-center gap-2 mb-6 border-r-4 border-orange-500 pr-4">
                                        <h3 className="font-black text-indigo-900 dark:text-indigo-300 text-sm">
                                            بيانات التواصل والتعريف
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <CustomField name="name" label="اسم المؤسسة" icon={Building} />
                                        <CustomField name="email" label="البريد الإلكتروني الرسمي" icon={Mail} />
                                        <CustomField name="phoneNumber" label="رقم التواصل" icon={Phone} />
                                        <CustomField name="address" label="العنوان الجغرافي" icon={MapPin} />
                                        <div className="md:col-span-2">
                                            <CustomField
                                                name="description"
                                                label="عن المؤسسة (الوصف)"
                                                icon={Info}
                                                as="textarea"
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* القسم الثاني */}
                                <section>
                                    <div className="flex items-center gap-2 mb-6 border-r-4 border-indigo-400 pr-4">
                                        <h3 className="font-black text-indigo-900 dark:text-indigo-300 text-sm">
                                            التواجد الرقمي
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <CustomField
                                            name="websiteUrl"
                                            label="الموقع الإلكتروني"
                                            icon={Globe}
                                            placeholder="https://..."
                                        />
                                        <CustomField
                                            name="facebookUrl"
                                            label="صفحة فيسبوك"
                                            icon={Facebook}
                                            placeholder="https://facebook.com/..."
                                        />
                                        <CustomField
                                            name="instagramUrl"
                                            label="إنستجرام"
                                            icon={Instagram}
                                            placeholder="https://instagram.com/..."
                                        />
                                    </div>
                                </section>

                                {/* القسم الثالث */}
                                <section>
                                    <div className="flex items-center gap-2 mb-6 border-r-4 border-emerald-500 pr-4">
                                        <h3 className="font-black text-indigo-900 dark:text-indigo-300 text-sm">
                                            الصور وبيانات الموقع
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <ImageUploadBox
                                            label="شعار المؤسسة (Logo)"
                                            name="logoFile"
                                            preview={
                                                values.logoFile
                                                    ? URL.createObjectURL(values.logoFile)
                                                    : initialData?.logoUrl
                                            }
                                            setFieldValue={setFieldValue}
                                        />

                                        <ImageUploadBox
                                            label="صورة الغلاف (Cover)"
                                            name="coverFile"
                                            preview={
                                                values.coverFile
                                                    ? URL.createObjectURL(values.coverFile)
                                                    : initialData?.coverImageUrl
                                            }
                                            setFieldValue={setFieldValue}
                                        />

                                        <LocationInputBox
                                            label="رابط الموقع / اللوكيشن"
                                            name="mapFile"
                                            value={values.mapFile}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                </section>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 border-t dark:border-white/5 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || externalSubmitting}
                                    className="px-10 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isSubmitting || externalSubmitting ? (
                                        "جارٍ الحفظ..."
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            حفظ التعديلات
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

// ------------------- Components -------------------

const CustomField = ({ label, icon: Icon, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-2">
            <Icon size={14} className="text-indigo-500" /> {label}
        </label>
        <Field
            {...props}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm font-bold"
        />
        <ErrorMessage
            name={props.name}
            component="div"
            className="text-[10px] text-red-500 mr-2 font-medium"
        />
    </div>
);

const ImageUploadBox = ({ label, name, preview, setFieldValue }) => (
    <div className="relative group flex flex-col h-full">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
            {label}
        </p>
        <div className="relative flex-1 min-h-[160px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 group-hover:border-indigo-500 transition-all shadow-inner">
            {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <ImageIcon size={30} strokeWidth={1.5} />
                    <span className="text-[10px] mt-2 font-medium">اختر صورة</span>
                </div>
            )}
            <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFieldValue(name, e.currentTarget.files[0])}
                    accept="image/*"
                />
                <span className="text-white text-[10px] font-black bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/30 uppercase tracking-tighter">
                    تغيير الصورة
                </span>
            </label>
        </div>
    </div>
);

const LocationInputBox = ({ label, name, value, setFieldValue }) => (
    <div className="relative group flex flex-col h-full">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
            {label}
        </p>

        <div className="flex-1 min-h-[160px] rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 group-hover:border-emerald-500 transition-all p-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400">
                <Map size={18} />
                <span className="text-xs font-black">أدخل رابط Google Maps أو اللوكيشن</span>
            </div>

            <input
                type="text"
                value={value || ""}
                onChange={(e) => setFieldValue(name, e.target.value)}
                placeholder="https://maps.google.com/... أو أي رابط للموقع"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm font-bold"
            />

            {value ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 break-all"
                >
                    فتح الرابط
                </a>
            ) : (
                <p className="mt-3 text-[10px] text-slate-400">
                    الصق هنا رابط اللوكيشن بدل رفع ملف
                </p>
            )}
        </div>
    </div>
);

export default OrganizationModal;