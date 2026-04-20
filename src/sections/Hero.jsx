import React from 'react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
// افترضنا أن عندك هوك لجلب الجمعيات، إذا لا، سنستخدم بيانات تجريبية

const HeroSection = () => {
  const heroImage = "/images/Hero_background.avif";

  return (
    <section className="w-full pt-16 md:pt-20 overflow-hidden" dir="rtl">
      <div className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden">
        
        {/* --- نفس محتوى الهيرو الخاص بك بدون تغيير --- */}
        <div className="absolute inset-0">
          <img
            alt="وصلة خير"
            className="w-full h-full object-cover animate-slow-zoom"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-indigo-950/40 to-slate-950/90 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative h-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 text-indigo-100 text-[10px] md:text-sm font-bold px-5 py-2 rounded-full mb-6 shadow-xl"
          >
            <Sparkles size={16} className="text-orange-400" />
            <span>خلى خيرك يوصل للي محتاجه فعلاً</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.15] drop-shadow-xl"
          >
            وصـلـة <span className='text-indigo-500'>خـيـر..</span> طـريـقـك <br />
            <span className="text-orange-400">لدعم المحتاجين</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-200 text-lg md:text-2xl mb-10 font-medium max-w-3xl leading-relaxed"
          >
            المنصة الأولى التي تجمع الجمعيات الخيرية في مصر في مكان واحد. 
            <span className="md:block"> تبرع بأمان، وتابع أثر خيرك خطوة بخطوة.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-5 justify-center"
          >
            <NavLink to="/cases" className="group flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-2xl shadow-orange-500/40 active:scale-95">
              <Heart size={22} fill="currentColor" /> تبرع الآن
            </NavLink>

            <NavLink to="/charities" className="flex items-center gap-2 text-white font-bold hover:text-orange-400 transition-colors px-6 py-4 group bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20">
              استكشف الجمعيات <ArrowLeft className="group-hover:-translate-x-2 transition-transform" size={20} />
            </NavLink>
          </motion.div>
        </div>

      </div>

      <style>{`
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.30); } }
        .animate-slow-zoom { animation: slow-zoom 25s linear infinite alternate; }
      `}</style>
    </section>
  );
};

export default HeroSection;