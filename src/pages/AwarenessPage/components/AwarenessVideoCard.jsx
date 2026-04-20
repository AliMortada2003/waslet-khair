import React from "react";
import { Play, Clock } from "lucide-react";

const AwarenessVideoCard = ({ video, onPlay }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group">
            <div className="relative">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-52 object-cover"
                />

                <button
                    onClick={onPlay}
                    className="absolute inset-0 flex items-center justify-center bg-slate-900/25 opacity-100 group-hover:bg-slate-900/35 transition-all"
                >
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                        <Play className="text-indigo-700 mr-1" size={24} fill="currentColor" />
                    </div>
                </button>

                <div className="absolute top-4 right-4 bg-white/90 text-slate-800 px-3 py-1 rounded-full text-xs font-black">
                    {video.category}
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-300 font-bold mb-3">
                    <Clock size={14} />
                    {video.duration}
                </div>

                <h3 className="text-base font-black text-slate-800 dark:text-white leading-7 mb-2">
                    {video.title}
                </h3>

                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400 mb-4">
                    {video.description}
                </p>

                <button
                    onClick={onPlay}
                    className="w-full py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-black transition-all"
                >
                    مشاهدة الفيديو
                </button>
            </div>
        </div>
    );
};

export default AwarenessVideoCard;