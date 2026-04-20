import React from "react";

const ZakatInfoSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                    كيف يتم حساب الزكاة؟
                </h3>

                <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    <p>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            زكاة المال النقدي:
                        </span>{" "}
                        تُحسب بنسبة 2.5% من إجمالي المال المدخر إذا بلغ النصاب الشرعي
                        وحال عليه الحول.
                    </p>

                    <p>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            زكاة الأسهم والسندات والأرباح:
                        </span>{" "}
                        يتم جمع قيمة الأصول الاستثمارية والأرباح المستحقة ثم احتساب
                        2.5% منها وفق التقدير المبسط المستخدم هنا.
                    </p>

                    <p>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            زكاة الذهب:
                        </span>{" "}
                        يتم ضرب وزن الذهب في سعر الجرام الحالي لكل عيار، ثم استخراج
                        2.5% من القيمة الإجمالية.
                    </p>

                    <p>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            زكاة العقارات المؤجرة:
                        </span>{" "}
                        الزكاة هنا تُحسب على الإيراد السنوي الناتج عن الإيجار، وليس
                        على أصل العقار نفسه.
                    </p>
                </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-4">
                    المعادلات المستخدمة في الحساب
                </h3>

                <div className="space-y-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <p>زكاة المال = قيمة المال × 0.025</p>
                    <p>زكاة الأصول = (الأسهم + السندات + الأرباح) × 0.025</p>
                    <p>
                        زكاة الذهب = ((وزن ذهب 18 × سعره) + (وزن ذهب 21 × سعره)) ×
                        0.025
                    </p>
                    <p>زكاة العقارات = (الإيجار الشهري × 12) × 0.025</p>
                    <p className="font-bold text-indigo-700 dark:text-indigo-300 pt-2">
                        إجمالي الزكاة = مجموع جميع القيم السابقة
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ZakatInfoSection;