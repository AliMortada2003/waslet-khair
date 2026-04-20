import React from "react";
import { ArrowUpLeft, BookOpen } from "lucide-react";

const AwarenessArticleCard = ({ article }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-5">
                <BookOpen className="text-orange-500" size={22} />
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 leading-8">
                {article.title}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-7 mb-5">
                {article.description}
            </p>

            <a href={article?.to} target="_blank" className="inline-flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-black text-sm hover:gap-3 transition-all">
                اعرف أكثر
                <ArrowUpLeft size={16} />
            </a>
        </div>
    );
};

export default AwarenessArticleCard;