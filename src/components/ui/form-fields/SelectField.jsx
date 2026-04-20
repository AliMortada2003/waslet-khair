import { Field, ErrorMessage, useFormikContext } from "formik";

export default function SelectField({
    name,
    label,
    icon: Icon,
    children,
    disabled,
    required = true,
    isNumber = false // بروب جديد لتحديد إذا كنت تريد تحويل القيمة لرقم
}) {
    const { setFieldValue } = useFormikContext(); // الوصول لـ Formik helpers

    const selectClasses = `
        w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 outline-none appearance-none
        border-gray-200 bg-white text-slate-800 focus:border-[#0A8DBA]
        dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-[#0FB5A9]
        disabled:bg-gray-100 disabled:cursor-not-allowed
        dark:disabled:bg-slate-900/60 dark:disabled:opacity-70
    `;

    // دالة التعامل مع التغيير
    const handleChange = (e) => {
        const value = e.target.value;
        // إذا كان الحقل مطلوباً كـ Number، نقوم بتحويله، وإلا نتركه String
        const finalValue = isNumber && value !== "" ? Number(value) : value;
        setFieldValue(name, finalValue);
    };

    return (
        <div className="w-full">
            <label htmlFor={name} className="block font-bold mb-2 text-gray-700 dark:text-slate-200">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">
                <Field
                    as="select"
                    id={name}
                    name={name}
                    disabled={disabled}
                    className={selectClasses}
                    onChange={handleChange} // استخدام الدالة المخصصة هنا
                >
                    {children}
                </Field>

                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" size={20} />
                )}

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 dark:text-slate-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>

            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-sm mt-1 font-bold animate-in fade-in slide-in-from-top-1"
            />
        </div>
    );
}