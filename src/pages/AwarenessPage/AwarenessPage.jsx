import React, { useState } from "react";

import {
    awarenessVideos,
    awarenessArticles,
    awarenessQuotes,
    awarenessFaqs,
    awarenessImpactStats,
} from "./data/awarenessData";
import AwarenessHero from "./components/AwarenessHero";
import AwarenessVideoSection from "./components/AwarenessVideoSection";
import AwarenessArticlesSection from "./components/AwarenessArticles";
import AwarenessImpactSection from "./components/AwarenessImpact";
import AwarenessQuotesSection from "./components/AwarenessQuotes";
import AwarenessFaqSection from "./components/AwarenessFaq";
import AwarenessCTA from './components/AwarenessCTA';
import AwarenessVideoModal from './components/AwarenessVideoModal';

const AwarenessPage = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section
            className="bg-slate-50 dark:bg-slate-950 min-h-screen mt-8 py-12 px-4 transition-colors duration-300"
            dir="rtl"
        >
            <div className="max-w-7xl mx-auto space-y-10">
                <AwarenessHero />

                <AwarenessVideoSection
                    videos={awarenessVideos}
                    onPlayVideo={setSelectedVideo}
                />

                <AwarenessArticlesSection articles={awarenessArticles} />

                <AwarenessImpactSection stats={awarenessImpactStats} />

                <AwarenessQuotesSection quotes={awarenessQuotes} />

                <AwarenessFaqSection faqs={awarenessFaqs} />

                <AwarenessCTA />
            </div>

            <AwarenessVideoModal
                video={selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </section>
    );
};

export default AwarenessPage;