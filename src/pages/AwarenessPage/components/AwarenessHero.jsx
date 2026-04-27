import React from "react";
import { Heart, PlayCircle, BookOpen } from "lucide-react";

const AwarenessHero = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 text-sm font-bold mb-5">
                        <BookOpen size={16} />
                        الوعي بداية الخير
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-5">
                        افهم أكثر...
                        <span className="text-indigo-700 dark:text-indigo-400"> وساهم بشكل أعمق</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 leading-8 text-sm md:text-base mb-8">
                        في وصلة خير، نؤمن أن التبرع الحقيقي يبدأ من الوعي. لذلك صممنا
                        هذه الصفحة لتكون مساحة توعوية تساعدك على فهم أثر العطاء،
                        وأهمية الزكاة والصدقة، وكيف يمكن لمساهمتك أن تصنع فرقًا
                        حقيقيًا في حياة الآخرين.
                    </p>
                </div>

                <div className="relative">
                    <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1400&auto=format&fit=crop"
                            alt="Awareness"
                            className="w-full h-[320px] object-cover"
                        />
                    </div>

                    <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xl max-w-[230px]">
                        <div className="flex items-center gap-2 text-orange-500 mb-2">
                            <Heart size={18} className="fill-orange-500" />
                            <span className="font-black text-sm">رسالة وصلة خير</span>
                        </div>
                        <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
                            كل مساهمة تبدأ بوعي، وكل وعي قد يتحول إلى أمل جديد لشخص ينتظر الدعم.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AwarenessHero;