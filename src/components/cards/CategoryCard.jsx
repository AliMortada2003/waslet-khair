import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ item }) => {
    const Icon = item.icon || LayoutGrid;

    const firstImage = item?.originalCategories?.find(
        (c) => c.iconUrl
    )?.iconUrl;
    return (
        <Link
            to={`/categories/${item.slug || item.name}`}
            className="group block h-full"
        >
            <div className="h-full rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-3xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 p-6">
                <div className="flex justify-center mb-5">
                    <div className="w-full h-40 rounded-2xl flex items-center justify-center bg-indigo-50 dark:bg-indigo-500/10 shadow-md overflow-hidden">
                        {firstImage ? (
                            <img
                                src={firstImage}
                                alt={item.name}
                                className="w-full h-full object-cover p-1"
                            />
                        ) : (
                            <Icon
                                className={`w-8 h-8 ${item.textColor || "text-indigo-600 dark:text-indigo-400"
                                    }`}
                            />
                        )}

                    </div>
                </div>

                <h3 className="text-xl text-center font-black text-slate-800 dark:text-white mb-2">
                    {item.name}
                </h3>

                <p className="text-sm text-center text-slate-500 dark:text-slate-400 leading-6 mb-4 min-h-[48px]">
                    {item.description}
                </p>

                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        <span>استعرض الحالات</span>
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;