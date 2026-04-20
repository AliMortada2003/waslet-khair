import React from "react";
import { ArrowLeft, Heart } from "lucide-react";

const AwarenessCTA = () => {
    return (
        <div className="bg-gradient-to-l from-indigo-700 to-indigo-900 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl shadow-indigo-900/20">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-orange-200 text-sm font-bold mb-5">
                    <Heart size={16} className="fill-orange-300 text-orange-300" />
                    الخير يبدأ بخطوة
                </div>

                <h2 className="text-2xl md:text-4xl font-black leading-tight mb-5">
                    كل مساهمة تبدأ بوعي...
                    <br />
                    وكل وعي قد يتحول إلى أثر حقيقي
                </h2>

                <p className="text-sm md:text-base leading-8 text-white/80 mb-8">
                    تعرّف على الحالات، وافهم أثر عطائك، وابدأ اليوم بمساهمة قد تكون سببًا
                    في تخفيف ألم، أو سد احتياج، أو منح أمل جديد لمن ينتظر الدعم.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="px-6 py-3 rounded-2xl bg-white text-indigo-800 hover:bg-slate-100 font-black transition-all">
                        عرض الحالات
                    </button>

                    <button className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black transition-all flex items-center gap-2">
                        ابدأ التبرع
                        <ArrowLeft size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AwarenessCTA;