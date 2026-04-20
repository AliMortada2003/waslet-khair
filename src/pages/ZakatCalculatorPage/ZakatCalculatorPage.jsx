import React, { useEffect, useState } from "react";
import ZakatHeader from './component/ZakatHeader';
import ZakatInfoSection from './component/ZakatInfoSection';
import ZakatInputsSection from './component/ZakatInputsSection';
import ZakatSummaryCard from './component/ZakatSummaryCard';
import ZakatTipsSection from './component/ZakatTipsSection';

const ZakatCalculatorPage = () => {
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
        total: 0,
    });

    useEffect(() => {
        const mZakat = Number(money) * 0.025;
        const aZakat = (Number(shares) + Number(bonds) + Number(profits)) * 0.025;
        const gZakat =
            ((Number(gold18Weight) * Number(gold18Price)) +
                (Number(gold21Weight) * Number(gold21Price))) *
            0.025;
        const pZakat = Number(propertyRent) * 12 * 0.025;

        setResults({
            moneyZakat: mZakat,
            assetsZakat: aZakat,
            goldZakat: gZakat,
            propertyZakat: pZakat,
            total: mZakat + aZakat + gZakat + pZakat,
        });
    }, [
        money,
        shares,
        bonds,
        profits,
        gold18Weight,
        gold21Weight,
        gold18Price,
        gold21Price,
        propertyRent,
    ]);

    return (
        <section
            className="bg-slate-50 dark:bg-slate-950 mt-5 py-20 px-4 transition-colors duration-300"
            dir="rtl"
        >
            <div className="max-w-7xl mx-auto">
                <ZakatHeader />

                <ZakatInfoSection />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <ZakatInputsSection
                            setMoney={setMoney}
                            setShares={setShares}
                            setBonds={setBonds}
                            setProfits={setProfits}
                            setGold18Weight={setGold18Weight}
                            setGold18Price={setGold18Price}
                            setGold21Weight={setGold21Weight}
                            setGold21Price={setGold21Price}
                            setPropertyRent={setPropertyRent}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        <ZakatSummaryCard results={results} />
                    </div>
                </div>

                <ZakatTipsSection />
            </div>
        </section>
    );
};

export default ZakatCalculatorPage;