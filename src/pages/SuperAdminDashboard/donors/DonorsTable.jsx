import React from "react";
import { Eye, Pencil, Trash2, Mail, Phone, CheckCircle } from "lucide-react";

const DonorsTable = ({ donors = [], onView, onEdit, onDelete, onConfirm }) => {
    // console.log(donors)
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-100">
                <table className="w-full min-w-[1000px]">
                    <thead className="bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10">
                        <tr>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">#</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">الصورة</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">الاسم</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">البريد الإلكتروني</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">رقم الهاتف</th>
                            <th className="px-6 py-4 text-center text-xs font-black text-slate-500">الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {donors.length > 0 ? (
                            donors.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`border-b last:border-b-0  border-indigo-400 dark:border-white/5 hover:bg-indigo-100/70 dark:hover:bg-white/[0.02] transition-all`}
                                >
                                    <td className="px-6 py-5 text-sm font-bold text-slate-400">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                            {item.imageUrl ? (
                                                <img
                                                    src={item.imageUrl}
                                                    alt={`${item.firstName || ""} ${item.lastName || ""}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs font-black text-slate-400">
                                                    —
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800 dark:text-white">
                                                {`${item.firstName || ""} ${item.lastName || ""}`.trim() || "—"}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                ID: {item.id}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                            <Mail size={15} className="text-indigo-500" />
                                            <span>{item.email || "—"}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                            <Phone size={15} className="text-emerald-500" />
                                            <span>{item.phoneNumber || "—"}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* 1. زر التفعيل - أخضر (يظهر فقط للحالات غير المؤكدة) */}
                                            {!item?.isConfirmed && (
                                                <button
                                                    onClick={() => onConfirm(item)}
                                                    className="flex items-center gap-2 px-3 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                                                    title="تفعيل الآن"
                                                >
                                                    <CheckCircle size={16} className="animate-pulse" />
                                                    <span className="text-xs font-black">تفعيل الآن</span>
                                                </button>
                                            )}

                                            {/* 2. زر العرض - أزرق/بنفسجي */}
                                            <button
                                                onClick={() => onView(item)}
                                                className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center transition-all active:scale-95"
                                                title="عرض التفاصيل"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* 3. زر التعديل - برتقالي/أصفر */}
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="w-10 h-10 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center transition-all active:scale-95"
                                                title="تعديل البيانات"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            {/* 4. زر الحذف - أحمر */}
                                            <button
                                                onClick={() => onDelete(item)}
                                                className="w-10 h-10 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400 flex items-center justify-center transition-all active:scale-95"
                                                title="حذف المتبرع"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <SearchFallback />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SearchFallback = () => (
    <>
        <h3 className="text-lg font-black text-slate-400">لا يوجد متبرعون مطابقون</h3>
        <p className="text-xs text-slate-400 mt-1">جرب تغيير كلمة البحث</p>
    </>
);

export default DonorsTable;