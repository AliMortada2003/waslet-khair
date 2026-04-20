import React from "react";

const ZakatHeader = () => {
    return (
        <div className="mb-10 text-right">
            <h1 className="text-2xl md:text-3xl font-black text-indigo-900 dark:text-indigo-400 mb-4">
                احسب زكاتك وفق الأحكام العامة في الشريعة الإسلامية
            </h1>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm bg-white dark:bg-slate-900 p-6 rounded-2xl border-r-4 border-orange-500 shadow-sm dark:shadow-none transition-colors">
                صُممت هذه الحاسبة لمساعدتك في تقدير قيمة الزكاة المستحقة على المال
                والذهب وبعض الأصول والإيرادات، بطريقة مبسطة وواضحة، اعتمادًا على
                نسبة الزكاة المعروفة شرعًا وهي ربع العشر (2.5%) في الأموال الزكوية
                التي بلغت النصاب وحال عليها الحول.
                <br />
                <br />
                كما نؤكد أن هذه الحاسبة تقدم تقديرًا مبدئيًا عامًا، أما الحالات
                التفصيلية أو الخاصة فيُستحسن فيها الرجوع إلى أهل العلم أو الجهة
                الشرعية المختصة.
            </p>
        </div>
    );
};

export default ZakatHeader;