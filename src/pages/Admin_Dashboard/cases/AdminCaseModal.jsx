import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Briefcase, FileText, Hash, DollarSign, User, Tag,
    ShieldAlert, Activity, Star, Image as ImageIcon, Paperclip,
} from "lucide-react";
import ModalHeader from "../../../components/modals/ModalHeader";
import FormField from "../../../components/form/FormField";
import UploadField from "../../../components/ui/form-fields/UploadField";
import { useUser } from "../../../hocks/useAuthHocks"; // سحب بياناتك كأدمن
import { AnimatePresence, motion } from "framer-motion";

const validationSchema = Yup.object().shape({
    Title: Yup.string().required("عنوان الحالة مطلوب"),
    Description: Yup.string().required("وصف الحالة مطلوب"),
    Age: Yup.number().typeError("العمر يجب أن يكون رقمًا").min(0).required("العمر مطلوب"),
    TargetAmount: Yup.number().typeError("المبلغ يجب أن يكون رقمًا").min(1).required("المبلغ مطلوب"),
    BeneficiaryName: Yup.string().required("اسم المستفيد مطلوب"),
    CategoryId: Yup.string().required("التصنيف مطلوب"),
    Priority: Yup.string().required("الأولوية مطلوبة"),
    Status: Yup.string().required("الحالة مطلوبة"),
    // الحقول دي بقت مطلوبة كقيم برمجية مش UI
    CharityId: Yup.string().required(),
    AdminId: Yup.string().required(),
});

const priorities = [
    { value: "Normal", label: "عادي" },
    { value: "Urgent", label: "عاجل" },
];

const statuses = [
    { value: "Active", label: "نشطة" },
    { value: "Completed", label: "مكتملة" },
];

const AdminCaseModal = ({
    isOpen,
    onClose,
    initialData,
    onSubmit,
    isSubmitting: externalSubmitting = false,
    categories = [],
}) => {
    const { data: userData } = useUser();

    // استخراج بياناتك التلقائية
    const myCharityId = userData?.user?.charityId;
    const myAdminId = userData?.user?.id;

    if (!isOpen) return null;

    const isEdit = !!initialData?.id;

    return (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col max-h-[90vh]">
                <ModalHeader
                    title={isEdit ? "تعديل بيانات الحالة" : "إضافة حالة جديدة لمؤسستك"}
                    subtitle="أنت تقوم بإضافة حالة تابعة لجمعيتك مباشرة"
                    icon={Briefcase}
                    onClose={onClose}
                    variant={isEdit ? "indigo" : "orange"}
                />

                <Formik
                    enableReinitialize
                    initialValues={{
                        Title: initialData?.title || "",
                        Description: initialData?.description || "",
                        Age: initialData?.age || "",
                        TargetAmount: initialData?.targetAmount || "",
                        BeneficiaryName: initialData?.beneficiaryName || "",
                        CategoryId: initialData?.categoryId || "",
                        Priority: initialData?.priority || "Normal",
                        Status: initialData?.status || "Pending",
                        IsFeatured: initialData?.isFeatured || false,
                        CoverImageFile: null,
                        AttachmentFiles: null,
                        // قيم مخفية تُرسل تلقائياً
                        CharityId: myCharityId || initialData?.charityId || "",
                        AdminId: myAdminId || initialData?.adminId || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => {
                        console.log(values)
                        onSubmit(values, formikHelpers);
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="flex flex-col flex-1 min-h-0" dir="rtl">
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="md:col-span-2 flex items-center gap-2 mb-2 border-r-4 border-indigo-500 pr-4">
                                        <h3 className="font-black text-indigo-600 dark:text-indigo-400 text-sm">المعلومات الأساسية للمستفيد</h3>
                                    </div>

                                    <FormField name="Title" label="عنوان الحالة" icon={Briefcase} required />
                                    <FormField name="BeneficiaryName" label="اسم المستفيد" icon={User} required />
                                    <FormField name="Age" label="العمر" icon={Hash} type="number" required />
                                    <FormField name="TargetAmount" label="المبلغ المستهدف (ج.م)" icon={DollarSign} type="number" required />

                                    <div className="md:col-span-2">
                                        <FormField name="Description" label="تفاصيل الحالة المرضية أو الاجتماعية" icon={FileText} as="textarea" rows="4" required />
                                    </div>

                                    <div className="md:col-span-2 flex items-center gap-2 mt-4 mb-2 border-r-4 border-orange-500 pr-4">
                                        <h3 className="font-black text-orange-600 dark:text-orange-400 text-sm">التصنيف والأولوية</h3>
                                    </div>

                                    {/* التصنيف */}
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">اختر فئة التبرع <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                name="CategoryId"
                                                value={values.CategoryId}
                                                onChange={(e) => setFieldValue("CategoryId", e.target.value)}
                                                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] py-3 pr-10 pl-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                            >
                                                <option value="">اختر التصنيف</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* الأولوية */}
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">مدى الاحتياج (الأولوية)</label>
                                        <div className="relative">
                                            <ShieldAlert className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                name="Priority"
                                                value={values.Priority}
                                                onChange={(e) => setFieldValue("Priority", e.target.value)}
                                                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] py-3 pr-10 pl-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                            >
                                                {priorities.map((p) => (
                                                    <option key={p.value} value={p.value}>{p.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* الحالة (تظهر فقط في التعديل أو للأدمن) */}
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">حالة النشر</label>
                                        <div className="relative">
                                            <Activity className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                name="Status"
                                                value={values.Status}
                                                onChange={(e) => setFieldValue("Status", e.target.value)}
                                                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] py-3 pr-10 pl-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                            >
                                                {statuses.map((s) => (
                                                    <option key={s.value} value={s.value}>{s.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* حالة مميزة */}
                                    <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl px-4 py-3">
                                        <Star className="w-5 h-5 text-amber-500" />
                                        <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-slate-700 dark:text-slate-200">
                                            <input
                                                type="checkbox"
                                                name="IsFeatured"
                                                checked={values.IsFeatured}
                                                onChange={(e) => setFieldValue("IsFeatured", e.target.checked)}
                                                className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            تمييز في الصفحة الرئيسية
                                        </label>
                                    </div>

                                    <div className="md:col-span-2 flex items-center gap-2 mt-4 mb-2 border-r-4 border-emerald-500 pr-4">
                                        <h3 className="font-black text-emerald-600 dark:text-emerald-400 text-sm">الصور والوثائق الثبوتية</h3>
                                    </div>

                                    <UploadField
                                        name="CoverImageFile"
                                        label="صورة الحالة المعبرة"
                                        setFieldValue={setFieldValue}
                                        icon={ImageIcon}
                                        accept="image/*"
                                        initialPreview={initialData?.coverImageUrl}
                                    />

                                    {/* التقارير او الاثباتات */}
                                    <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 p-4 bg-slate-50 dark:bg-white/[0.02]">
                                        <label className="mb-3 flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                                            <Paperclip className="w-4 h-4 text-indigo-500" />
                                            التقارير الطبية / المرفقات
                                        </label>

                                        <input
                                            type="file"
                                            name="AttachmentFiles"
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                                            onChange={(event) =>
                                                setFieldValue("AttachmentFiles", event.currentTarget.files)
                                            }
                                            className="block w-full text-sm text-slate-500 file:ml-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-indigo-700"
                                        />

                                        {values.AttachmentFiles && values.AttachmentFiles.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {Array.from(values.AttachmentFiles).map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl"
                                                    >
                                                        {file.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-6 border-t dark:border-white/5 flex items-center justify-end gap-3 bg-white dark:bg-[#0f172a]">
                                <button type="button" onClick={onClose} className="px-8 py-3.5 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600">إلغاء</button>
                                <button type="submit" className="px-12 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-500/20 active:scale-95 disabled:opacity-50">
                                    {isSubmitting || externalSubmitting ? "جارٍ الحفظ..." : isEdit ? "تحديث الحالة" : "حفظ ونشر"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminCaseModal;