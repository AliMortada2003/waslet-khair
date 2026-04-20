import React from 'react';

const InfoBox = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 p-4  rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-transparent hover:border-indigo-500/20 hover:bg-indigo-200 dark:hover:bg-white/[0.05] transition-all duration-300 group">
        <div className="w-10 pr-1 text-center h-10 rounded-2xl bg-white/50 dark:bg-slate-800 flex items-center justify- text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
            <Icon size={30} />
        </div>
        <div>
            <p className="text-[13px] font-black text-orange-700 font-bold  mb-1">{label}</p>
            <p className="text-indigo-950 dark:text-slate-50 font-bold text-xs md:text-sm">{value || "—"}</p>
        </div>
    </div>
);

export default InfoBox;