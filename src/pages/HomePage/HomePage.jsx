
import AboutSection from "../../sections/AboutSection";
import HeroSection from "../../sections/Hero";
import CharitySection from "../../sections/CharitySection";
import CasesSection from "../../sections/CasesSection";
import CategorySection from "../../sections/CategorySection";
import ZakatCalculator from "../../sections/ZakatCalculator";
import AwarenessHero from "../AwarenessPage/components/AwarenessHero";
import AwarenessVideoSection from "../AwarenessPage/components/AwarenessVideoSection";
import { awarenessVideos } from "../AwarenessPage/data/awarenessData";
import { useState } from "react";

// ✅ استيراد الشات بوت الجديد

const HomePage = () => {
    return (
        <div className="relative overflow-x-hidden transition-colors duration-300">
            <main>
                <HeroSection />
                <AboutSection />
                <CategorySection />
                <CharitySection />
                <CasesSection />
            </main>
        </div>
    );
};

export default HomePage;