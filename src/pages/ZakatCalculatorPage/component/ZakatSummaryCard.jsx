import React from "react";
import { Calculator, Heart } from "lucide-react";
import ZakatResultRow from "./ZakatResultRow";

const ZakatSummaryCard = ({ results }) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg dark:shadow-none border border-indigo-50 dark:border-slate-800 sticky top-6 transition-colors">
            <h3 className="text-xl font-black text-indigo-900 dark:text-indigo-400 mb-4 flex items-center gap-2 border-b dark:border-slate-800 pb-4">
                <Calculator className="text-orange-500" />
                قيمة الزكاة
            </h3>

            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400 mb-8">
                يتم عرض الناتج هنا بشكل تقديري وفق البيانات التي قمت بإدخالها، وبحسب
                النسبة الشرعية العامة المعروفة لزكاة الأموال الزكوية.
            </p>

            <div className="space-y-5">
                <ZakatResultRow label="زكاة المال" value={results.moneyZakat} />
                <ZakatResultRow label="زكاة الأصول" value={results.assetsZakat} />
                <ZakatResultRow label="زكاة الذهب" value={results.goldZakat} />
                <ZakatResultRow
                    label="زكاة العقارات"
                    value={results.propertyZakat}
                />

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center text-indigo-900 dark:text-indigo-300">
                        <span className="text-lg font-black">الإجمالي:</span>
                        <span className="text-xl font-black text-orange-600 dark:text-orange-500">
                            {results.total.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                            })}{" "}
                            ج.م
                        </span>
                    </div>
                </div>

                <button className="w-full mt-8 bg-indigo-900 hover:bg-indigo-950 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md">
                    تبرع الآن
                    <Heart size={18} className="fill-orange-500 text-orange-500" />
                </button>
            </div>
        </div>
    );
};

export default ZakatSummaryCard;