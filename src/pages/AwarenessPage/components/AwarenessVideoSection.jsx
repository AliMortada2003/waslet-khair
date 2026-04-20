import React from "react";
import { PlayCircle } from "lucide-react";
import AwarenessVideoCard from './AwarenessVideoCard';
const AwarenessVideoSection = ({ videos = [], onPlayVideo }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        فيديوهات توعوية
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        محتوى مرئي يساعدك على فهم أثر التبرع وأهمية الزكاة والصدقة والتكافل.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-300 font-bold text-sm">
                    <PlayCircle size={18} />
                    محتوى هادف ومبسط
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <AwarenessVideoCard
                        key={video.id}
                        video={video}
                        onPlay={() => onPlayVideo(video)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AwarenessVideoSection;