import React from "react";
import { HeartHandshake } from "lucide-react";

const AwarenessImpactSection = ({ stats = [] }) => {
    return (
        <div className="bg-white  dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center  gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                    <HeartHandshake className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        كيف يصنع تبرعك فرقًا؟
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        أمثلة تقريبية تساعد على تصور أثر العطاء في حياة المحتاجين.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-[1.5rem] p-6 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5"
                    >
                        <h3 className="text-2xl font-black text-orange-600 dark:text-orange-300 mb-3">
                            {item.title}
                        </h3>
                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AwarenessImpactSection;