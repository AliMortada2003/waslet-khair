import React from "react";
import { Quote } from "lucide-react";

const AwarenessQuotesSection = ({ quotes = [] }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    رسائل ملهمة
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    كلمات تذكّر بقيمة الخير وأثره في الدنيا والآخرة.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quotes.map((quote) => (
                    <div
                        key={quote.id}
                        className="bg-white dark:bg-slate-900 rounded-[1.75rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-5">
                            <Quote className="text-orange-500" size={20} />
                        </div>

                        <p className="text-base font-black leading-8 text-slate-900 dark:text-white mb-4">
                            {quote.text}
                        </p>

                        <span className="inline-flex px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-black">
                            {quote.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AwarenessQuotesSection;