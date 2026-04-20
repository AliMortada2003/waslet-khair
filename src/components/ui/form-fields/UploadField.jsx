import React, { useEffect, useMemo, useState } from "react";
import { useField, ErrorMessage } from "formik";
import { Upload, User, FileText } from "lucide-react";

export default function UploadField({
    name,
    label,
    setFieldValue,
    icon: Icon,
    initialPreview, // البرامتر الجديد (رابط الصورة القديمة)
    accept = "image/jpeg,image/jpg,image/png,application/pdf",
}) {
    const [field] = useField(name);
    const [previewUrl, setPreviewUrl] = useState(null);

    // التحقق هل القيمة الحالية (ملف جديد) هي صورة؟
    const isImage = useMemo(() => {
        if (!field.value) return false;
        if (typeof field.value === "string") return true; // لو قيمة نصية (URL)
        return field.value.type?.startsWith("image/");
    }, [field.value]);

    useEffect(() => {
        const file = field.value;

        // 1. لو مفيش ملف جديد مختار، استخدم الصورة القديمة (initialPreview) لو موجودة
        if (!file) {
            setPreviewUrl(initialPreview || null);
            return;
        }

        // 2. لو القيمة اللي في Formik عبارة عن رابط (string)
        if (typeof file === "string") {
            setPreviewUrl(file);
            return;
        }

        // 3. لو المستخدم اختار ملف جديد (File Object)
        if (file instanceof File && isImage) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (file instanceof File && !isImage) {
            setPreviewUrl(null); // لو ملف مش صورة (زي PDF)
        }
    }, [field.value, isImage, initialPreview]);

    return (
        <div className="mb-6">
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-4 text-center transition-colors">
                {label}
            </label>

            <div className="flex justify-center">
                <div className="relative group">
                    <div className="w-32 h-32 rounded overflow-hidden border-4 border-indigo-500/20 dark:border-indigo-500/10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-all group-hover:border-indigo-500/40 shadow-inner">

                        {/* عرض المعاينة: إما الرابط القديم أو الملف المختار الجديد */}
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover animate-in fade-in zoom-in duration-300"
                            />
                        ) : field.value && !isImage ? (
                            <div className="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1">
                                <FileText size={42} className="text-indigo-500" />
                                <span className="text-[10px] font-bold tracking-tighter uppercase">Document</span>
                            </div>
                        ) : Icon ? (
                            <Icon size={48} strokeWidth={1.5} className="text-slate-300 dark:text-slate-600" />
                        ) : (
                            <User size={48} strokeWidth={1.5} className="text-slate-300 dark:text-slate-600" />
                        )}
                    </div>

                    <label
                        htmlFor={name}
                        className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 dark:bg-indigo-500 
                        rounded-full flex items-center justify-center cursor-pointer shadow-lg
                        hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:scale-110 active:scale-95 transition-all"
                    >
                        <Upload className="text-white" size={18} />
                    </label>

                    <input
                        id={name}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setFieldValue(name, file);
                        }}
                    />
                </div>
            </div>

            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 dark:text-red-400 text-[10px] font-bold text-center mt-3"
            />
        </div>
    );
}