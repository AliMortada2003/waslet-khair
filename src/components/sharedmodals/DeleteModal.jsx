import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-[#0f172a] w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-rose-100 dark:border-rose-500/10"
            >
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trash2 size={40} className="text-rose-500" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                        تأكيد الحذف
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed px-4">
                        هل أنت متأكد من حذف{" "}
                        <span className="text-rose-600">"{title}"</span>؟
                        هذا الإجراء سيؤدي لإزالة كافة البيانات المرتبطة ولن يمكنك التراجع عنه.
                    </p>
                </div>

                <div className="flex gap-4 p-6 bg-slate-50 dark:bg-white/[0.02]">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5 transition-all disabled:opacity-50"
                    >
                        تراجع
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black shadow-lg shadow-rose-500/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                جاري الحذف...
                            </>
                        ) : (
                            "تأكيد الحذف"
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteModal;