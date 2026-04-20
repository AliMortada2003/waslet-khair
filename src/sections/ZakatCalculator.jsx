import React, { useState, useEffect } from 'react';
import { Wallet, Coins, Building, LineChart, Calculator, Heart } from 'lucide-react';

const ZakatCalculator = () => {
    // States for values
    const [money, setMoney] = useState(0);
    const [shares, setShares] = useState(0);
    const [bonds, setBonds] = useState(0);
    const [profits, setProfits] = useState(0);
    const [gold18Weight, setGold18Weight] = useState(0);
    const [gold21Weight, setGold21Weight] = useState(0);
    const [propertyRent, setPropertyRent] = useState(0);
    const [gold18Price, setGold18Price] = useState(0);
    const [gold21Price, setGold21Price] = useState(0);

    const [results, setResults] = useState({
        moneyZakat: 0,
        assetsZakat: 0,
        goldZakat: 0,
        propertyZakat: 0,
        total: 0
    });

    useEffect(() => {
        const mZakat = Number(money) * 0.025;
        const aZakat = (Number(shares) + Number(bonds) + Number(profits)) * 0.025;
        const gZakat = ((Number(gold18Weight) * Number(gold18Price)) + 
                        (Number(gold21Weight) * Number(gold21Price))) * 0.025;
        const pZakat = (Number(propertyRent) * 12) * 0.025;

        setResults({
            moneyZakat: mZakat,
            assetsZakat: aZakat,
            goldZakat: gZakat,
            propertyZakat: pZakat,
            total: mZakat + aZakat + gZakat + pZakat
        });
    }, [money, shares, bonds, profits, gold18Weight, gold21Weight, gold18Price, gold21Price, propertyRent]);

    return (
        <section className="bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300" dir="rtl">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-right">
                    <h1 className="text-2xl font-black text-indigo-900 dark:text-indigo-400 mb-4">احسب زكاتك مع مؤسسة وصلة خير</h1>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm bg-white dark:bg-slate-900 p-6 rounded-2xl border-r-4 border-orange-500 shadow-sm dark:shadow-none transition-colors">
                        أدخل القيم الحالية للمال، الذهب، أو الاستثمارات وسيقوم النظام بحساب الزكاة المستحقة فوراً بناءً على سعر الجرام الذي تحدده.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Inputs Column */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        <Card title="زكاة المال" icon={<Wallet className="text-orange-500" size={20} />}>
                            <InputGroup label="قيمة المال الذى املكة" onChange={setMoney} />
                        </Card>

                        <Card title="زكاة الاصول والممتلكات" icon={<LineChart className="text-orange-500" size={20} />}>
                            <div className="space-y-6">
                                <InputGroup label="قيمة الأسهم في السوق" onChange={setShares} />
                                <InputGroup label="قيمة السندات في السوق" onChange={setBonds} />
                                <InputGroup label="قيمة الارباح المحصلة" onChange={setProfits} />
                            </div>
                        </Card>

                        <Card title="زكاة الذهب" icon={<Coins className="text-orange-500" size={20} />}>
                            <div className="space-y-8">
                                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-900/30 mb-4 text-sm text-orange-800 dark:text-orange-300">
                                    * يرجى إدخال سعر الجرام الحالي لضمان دقة العملية الحسابية.
                                </div>
                                <GoldInputManual label="ذهب عيار 18" onWeightChange={setGold18Weight} onPriceChange={setGold18Price} />
                                <hr className="border-slate-100 dark:border-slate-800" />
                                <GoldInputManual label="ذهب عيار 21" onWeightChange={setGold21Weight} onPriceChange={setGold21Price} />
                            </div>
                        </Card>

                        <Card title="زكاة العقارات" icon={<Building className="text-orange-500" size={20} />}>
                            <InputGroup label="إيجار العقار الشهري" onChange={setPropertyRent} />
                        </Card>
                    </div>

                    {/* Result Summary Column */}
                    <div className="lg:col-span-4">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg dark:shadow-none border border-indigo-50 dark:border-slate-800 sticky top-6 transition-colors">
                            <h3 className="text-xl font-black text-indigo-900 dark:text-indigo-400 mb-8 flex items-center gap-2 border-b dark:border-slate-800 pb-4">
                                <Calculator className="text-orange-500" /> قيمة الزكاة
                            </h3>
                            <div className="space-y-5">
                                <ResultRow label="زكاة المال" value={results.moneyZakat} />
                                <ResultRow label="زكاة الأصول" value={results.assetsZakat} />
                                <ResultRow label="زكاة الذهب" value={results.goldZakat} />
                                <ResultRow label="زكاة العقارات" value={results.propertyZakat} />
                                
                                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex justify-between items-center text-indigo-900 dark:text-indigo-300">
                                        <span className="text-lg font-black">الإجمالي:</span>
                                        <span className="text-xl font-black text-orange-600 dark:text-orange-500">
                                            {results.total.toLocaleString(undefined, {minimumFractionDigits: 2})} ج.م
                                        </span>
                                    </div>
                                </div>
                                <button className="w-full mt-8 bg-indigo-900 hover:bg-indigo-950 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md">
                                    تبرع الآن <Heart size={18} className="fill-orange-500 text-orange-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Reusable Components with Dark Mode Support ---

const Card = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-6 flex items-center gap-2">
            {icon} {title}
        </h3>
        {children}
    </div>
);

const InputGroup = ({ label, onChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label}</label>
            <input 
                type="number" 
                onChange={(e) => onChange(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all" 
                placeholder="0.00" 
            />
        </div>
        <div className="md:col-span-1 text-orange-600 dark:text-orange-400 font-bold text-sm pb-3">جنية مصري</div>
    </div>
);

const GoldInputManual = ({ label, onWeightChange, onPriceChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label} (بالجرام)</label>
            <input 
                type="number" 
                onChange={(e) => onWeightChange(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all" 
                placeholder="الوزن" 
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">سعر جرام {label} اليوم</label>
            <input 
                type="number" 
                onChange={(e) => onPriceChange(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500 dark:text-white transition-all" 
                placeholder="السعر بالجنية" 
            />
        </div>
    </div>
);

const ResultRow = ({ label, value }) => (
    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
        <span className="text-sm font-medium">{label}:</span>
        <span className="font-bold text-slate-900 dark:text-slate-200">
            {value.toLocaleString(undefined, {minimumFractionDigits: 2})} ج.م
        </span>
    </div>
);

export default ZakatCalculator;