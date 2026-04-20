import React from 'react';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    isLoading,
    error
}) => {
    if (!isOpen) return null;
    // console.log(title)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header & Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        {description}
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800">
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors disabled:opacity-50"
                    >
                        إلغاء
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="relative flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all active:scale-95 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                جاري المعالجة...
                            </>
                        ) : (
                            "تأكيد"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;