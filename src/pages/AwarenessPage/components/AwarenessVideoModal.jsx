import React from "react";
import { X } from "lucide-react";

const AwarenessVideoModal = ({ video, onClose }) => {
    if (!video) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-white">
                            {video.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {video.category}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center transition-all"
                    >
                        <X size={18} className="text-slate-700 dark:text-white" />
                    </button>
                </div>

                <div className="aspect-video bg-black">
                    <iframe
                        className="w-full h-full"
                        src={video.videoUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default AwarenessVideoModal;