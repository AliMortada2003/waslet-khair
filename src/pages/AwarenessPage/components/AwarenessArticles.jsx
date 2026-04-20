import React from "react";
import AwarenessArticleCard from "./AwarenessArticleCard";

const AwarenessArticlesSection = ({ articles = [] }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    محتوى توعوي
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    بطاقات معرفية تساعدك على فهم العطاء بصورة أعمق وأكثر وعيًا.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <AwarenessArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default AwarenessArticlesSection;