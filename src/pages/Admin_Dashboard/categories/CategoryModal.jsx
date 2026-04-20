import React, { useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Tag,
    Image as ImageIcon,
    Save,
    CheckCircle2,
    Wand2,
} from "lucide-react";

import FormField from "../../../components/form/FormField";
import ModalHeader from "../../../components/modals/ModalHeader";
import UploadField from "../../../components/ui/form-fields/UploadField";
import { useUser } from "../../../hocks/useAuthHocks";
import { categorySuggestions, findBestCategoryMatch } from './../../../helpers/MockapData';

const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("اسم التصنيف مطلوب"),
});

const CategoryModal = ({
    isOpen,
    onClose,
    initialData,
    onSubmit,
    isSubmitting: externalSubmitting = false,
}) => {
    const { data: userData } = useUser();
    const charityId = userData?.user?.charityId;

    if (!isOpen) return null;

    const isEdit = !!initialData?.id;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col max-h-[90vh]">
                <ModalHeader
                    title={isEdit ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
                    subtitle="تصنيفات الحالات الخيرية"
                    icon={Tag}
                    onClose={onClose}
                    variant={isEdit ? "indigo" : "orange"}
                />

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: initialData?.name || "",
                        iconFile: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => {
                        const rawName = values.name?.trim() || "";
                        const matchedCategory = findBestCategoryMatch(rawName);
                        const finalName = matchedCategory?.name || rawName;

                        const formData = new FormData();

                        formData.append("Name", finalName);

                        if (charityId) {
                            formData.append("CharityId", charityId);
                        }

                        if (values.iconFile) {
                            formData.append("IconFile", values.iconFile);
                        }

                        if (isEdit) {
                            formData.append("Id", initialData.id);
                        }

                        onSubmit(formData, formikHelpers);
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => {
                        const matchedCategory = findBestCategoryMatch(values.name);

                        const isNormalized =
                            values.name?.trim() &&
                            matchedCategory &&
                            matchedCategory.name !== values.name.trim();

                        return (
                            <Form className="flex flex-col flex-1 overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 border-r-4 border-indigo-500 pr-4 mb-2">
                                            <h3 className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
                                                بيانات التصنيف
                                            </h3>
                                        </div>

                                        <FormField
                                            name="name"
                                            label="اسم التصنيف"
                                            icon={Tag}
                                            placeholder="مثلاً: حالات طبية، تعليم، إطعام..."
                                            required
                                        />

                                        {values.name?.trim() && matchedCategory && (
                                            <div
                                                className={`flex items-start gap-3 px-4 py-3 rounded-2xl border ${isNormalized
                                                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20"
                                                    : "bg-indigo-50 border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20"
                                                    }`}
                                            >
                                                {isNormalized ? (
                                                    <Wand2 className="text-emerald-600 dark:text-emerald-400 mt-0.5" size={18} />
                                                ) : (
                                                    <CheckCircle2 className="text-indigo-600 dark:text-indigo-400 mt-0.5" size={18} />
                                                )}

                                                <div className="text-sm leading-6">
                                                    {isNormalized ? (
                                                        <p className="font-bold text-emerald-700 dark:text-emerald-300">
                                                            سيتم توحيد الاسم تلقائيًا إلى:
                                                            <span className="mx-1 font-black">
                                                                {matchedCategory.name}
                                                            </span>
                                                        </p>
                                                    ) : (
                                                        <p className="font-bold text-indigo-700 dark:text-indigo-300">
                                                            هذا الاسم متوافق مع التصنيف الموحد:
                                                            <span className="mx-1 font-black">
                                                                {matchedCategory.name}
                                                            </span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-3">
                                            <p className="text-xs font-black text-slate-500 dark:text-slate-400">
                                                اقتراحات جاهزة تساعدك تختار اسمًا موحدًا وقريبًا من التصنيفات المعتمدة:
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {categorySuggestions.map((item) => {
                                                    const suggestion = item.name;
                                                    const isActive = values.name === suggestion;

                                                    return (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            onClick={() => setFieldValue("name", suggestion)}
                                                            className={`px-3 py-1.5 rounded-2xl text-xs font-black transition-all border ${isActive
                                                                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20"
                                                                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
                                                                }`}
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <p className="text-[13px] text-amber-700 dark:text-amber-400 font-bold leading-relaxed bg-amber-50 dark:bg-amber-500/10 px-4 py-3 rounded-2xl border border-amber-200 dark:border-amber-500/20">
                                                لو كتبت اسمًا قريبًا من تصنيف معروف مثل
                                                <span className="mx-1 font-black">التعليم</span>
                                                أو
                                                <span className="mx-1 font-black">دعم التعليم</span>
                                                فسيتم حفظه تلقائيًا باسم
                                                <span className="mx-1 font-black">تعليم</span>
                                                لتوحيد التصنيفات داخل المنصة.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 border-r-4 border-emerald-500 pr-4 mb-2">
                                            <h3 className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                                                الأيقونة البصرية
                                            </h3>
                                        </div>

                                        <UploadField
                                            name="iconFile"
                                            label="أيقونة التصنيف (Icon)"
                                            setFieldValue={setFieldValue}
                                            icon={ImageIcon}
                                            accept="image/*"
                                            initialPreview={initialData?.iconUrl}
                                        />

                                        <p className="text-[11px] text-slate-400 pr-2 font-bold leading-relaxed">
                                            يفضّل استخدام صورة واضحة بخلفية شفافة PNG وبحجم مناسب للحصول على أفضل مظهر.
                                        </p>
                                    </div>
                                </div>

                                <div className="px-8 py-6 border-t dark:border-white/5 flex items-center justify-end gap-3 bg-white dark:bg-[#0f172a]">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-8 py-3.5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-all hover:bg-slate-50 dark:hover:bg-white/5"
                                    >
                                        إلغاء
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || externalSubmitting}
                                        className="px-12 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isSubmitting || externalSubmitting ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                جارٍ الحفظ...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                {isEdit ? "تحديث التغييرات" : "حفظ التصنيف"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default CategoryModal;