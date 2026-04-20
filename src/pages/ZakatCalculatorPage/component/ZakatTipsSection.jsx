import React from "react";

const ZakatTipsSection = () => {
    return (
        <div className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                نصائح مهمة قبل إخراج الزكاة
            </h3>

            <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <li>احرص على التأكد من بلوغ المال النصاب الشرعي قبل احتساب الزكاة.</li>
                <li>يشترط في كثير من الأموال الزكوية مرور الحول الهجري الكامل عليها.</li>
                <li>
                    يُفضل إدخال السعر الحالي للذهب وقت الحساب للحصول على نتيجة أقرب
                    للدقة.
                </li>
                <li>
                    في الحالات الخاصة مثل الديون أو الأموال المشتركة أو الاستثمارات
                    المعقدة، يُفضّل الرجوع إلى مختص شرعي.
                </li>
                <li>
                    هذه الحاسبة وسيلة تقديرية أولية تساعدك على فهم قيمة الزكاة
                    المستحقة بشكل واضح ومنظم.
                </li>
                <li className="font-bold text-orange-600 dark:text-orange-400">
                    الزكاة عبادة مالية عظيمة، وهي سبب في طهرة المال ونمائه وبركته.
                </li>
            </ul>
        </div>
    );
};

export default ZakatTipsSection;