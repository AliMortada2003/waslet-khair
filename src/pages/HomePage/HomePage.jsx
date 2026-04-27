
import AboutSection from "../../sections/AboutSection";
import HeroSection from "../../sections/Hero";
import CharitySection from "../../sections/CharitySection";
import CasesSection from "../../sections/CasesSection";
import CategorySection from "../../sections/CategorySection";
import ZakatCalculator from "../../sections/ZakatCalculator";
import { awarenessArticles, awarenessImpactStats, awarenessVideos } from "../AwarenessPage/data/awarenessData";
import { useState } from "react";
import AwarenessHero from './../AwarenessPage/components/AwarenessHero';
import AwarenessVideoSection from './../AwarenessPage/components/AwarenessVideoSection';
import AwarenessArticlesSection from "../AwarenessPage/components/AwarenessArticles";
import AwarenessImpactSection from "../AwarenessPage/components/AwarenessImpact";

// ✅ استيراد الشات بوت الجديد

const HomePage = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className="relative overflow-x-hidden transition-colors duration-300">
            <main>
                <HeroSection />
                <AboutSection />
                <CategorySection />
                <CharitySection />
                <CasesSection />
                <AwarenessHero />
                <AwarenessVideoSection videos={awarenessVideos} onPlayVideo={setSelectedVideo} />
                <AwarenessArticlesSection articles={awarenessArticles} />
                <AwarenessImpactSection stats={awarenessImpactStats} />
            </main>
        </div>
    );
};

export default HomePage;