import React from "react";
import { Wallet, Coins, Building, LineChart } from "lucide-react";
import ZakatCard from "./ZakatCard";
import ZakatInputGroup from "./ZakatInputGroup";
import ZakatGoldInput from "./ZakatGoldInput";

const ZakatInputsSection = ({
    setMoney,
    setShares,
    setBonds,
    setProfits,
    setGold18Weight,
    setGold18Price,
    setGold21Weight,
    setGold21Price,
    setPropertyRent,
}) => {
    return (
        <>
            <ZakatCard
                title="زكاة المال"
                icon={<Wallet className="text-orange-500" size={20} />}
            >
                <ZakatInputGroup
                    label="قيمة المال الذي أملكه"
                    onChange={setMoney}
                />
            </ZakatCard>

            <ZakatCard
                title="زكاة الأصول والممتلكات"
                icon={<LineChart className="text-orange-500" size={20} />}
            >
                <div className="space-y-6">
                    <ZakatInputGroup
                        label="قيمة الأسهم في السوق"
                        onChange={setShares}
                    />
                    <ZakatInputGroup
                        label="قيمة السندات في السوق"
                        onChange={setBonds}
                    />
                    <ZakatInputGroup
                        label="قيمة الأرباح المحصلة"
                        onChange={setProfits}
                    />
                </div>
            </ZakatCard>

            <ZakatCard
                title="زكاة الذهب"
                icon={<Coins className="text-orange-500" size={20} />}
            >
                <div className="space-y-8">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-900/30 mb-4 text-sm text-orange-800 dark:text-orange-300">
                        يتم احتساب الزكاة هنا وفق القيمة الحالية للذهب، لذلك يُرجى
                        إدخال سعر الجرام اليومي لكل عيار لضمان دقة التقدير.
                    </div>

                    <ZakatGoldInput
                        label="ذهب عيار 18"
                        onWeightChange={setGold18Weight}
                        onPriceChange={setGold18Price}
                    />

                    <hr className="border-slate-100 dark:border-slate-800" />

                    <ZakatGoldInput
                        label="ذهب عيار 21"
                        onWeightChange={setGold21Weight}
                        onPriceChange={setGold21Price}
                    />
                </div>
            </ZakatCard>

            <ZakatCard
                title="زكاة العقارات"
                icon={<Building className="text-orange-500" size={20} />}
            >
                <ZakatInputGroup
                    label="إيجار العقار الشهري"
                    onChange={setPropertyRent}
                />
            </ZakatCard>
        </>
    );
};

export default ZakatInputsSection;