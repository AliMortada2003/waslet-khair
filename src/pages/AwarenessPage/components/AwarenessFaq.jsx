import React from "react";
import { HelpCircle } from "lucide-react";

const AwarenessFaqSection = ({ faqs = [] }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                    <HelpCircle className="text-orange-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        أسئلة شائعة
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        إجابات مختصرة على أكثر الأسئلة شيوعًا حول التبرع والعطاء.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {faqs.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-[1.5rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] p-5"
                    >
                        <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
                            {item.question}
                        </h3>
                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {item.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AwarenessFaqSection;