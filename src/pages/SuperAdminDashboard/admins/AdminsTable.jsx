import React from "react";
import { Eye, Pencil, Trash2, Mail, Phone, Building2 } from "lucide-react";

const AdminsTable = ({ admins = [], charities = [], onView, onEdit, onDelete }) => {
    const getCharityName = (charityId) => {
        return charities.find((item) => String(item.id) === String(charityId))?.name || "—";
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-100">
                <table className="w-full min-w-[1050px]">
                    <thead className="bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10">
                        <tr>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">#</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">الصورة</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">الاسم</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">البريد الإلكتروني</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">رقم الهاتف</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500">الجمعية</th>
                            <th className="px-6 py-4 text-center text-xs font-black text-slate-500">الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.length > 0 ? (
                            admins.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-b last:border-b-0 border-slate-100 dark:border-white/5 hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-all"
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
                                                    <img
                                                        src="/images/user.webp"
                                                        className="w-full h-full object-cover"
                                                    />
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
                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                            <Building2 size={15} className="text-orange-500" />
                                            <span>{getCharityName(item.charityId)}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onView(item)}
                                                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all"
                                                title="عرض"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                onClick={() => onEdit(item)}
                                                className="w-10 h-10 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 flex items-center justify-center text-amber-600 transition-all"
                                                title="تعديل"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                onClick={() => onDelete(item)}
                                                className="w-10 h-10 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 flex items-center justify-center text-rose-600 transition-all"
                                                title="حذف"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-20 text-center">
                                    <h3 className="text-lg font-black text-slate-400">
                                        لا يوجد مسؤولون مطابقون
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1">
                                        جرب تغيير كلمة البحث
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminsTable;