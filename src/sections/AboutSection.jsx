import React from 'react';
import { Award, Heart, Users, CheckCircle2, HandHelping, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import PageSectionHeader from '../components/PageSectionHeader';

const AboutSection = () => {
  const stats = [
    { icon: <Users size={24} />, label: 'متبرع نشط', value: '+1,500' },
    { icon: <Heart size={24} />, label: 'حالة تم مساعدتها', value: '+450' },
    { icon: <Award size={24} />, label: 'جمعية موثوقة', value: '+25' },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-slate-100/2 dark:bg-slate-950 transition-colors duration-500 overflow-hidden"
      dir="rtl"
    >
      <div className="container mx-auto px-6 relative z-10">

        {/* 1. استخدام العنوان الموحد للسكشن بعد التحديث */}
        <PageSectionHeader
          icon={HandHelping} // تأكد من عمل import لها من lucide-react
          badgeText="من نحن"
          title="تعرف على"
          highlightTitle="وصلة خير"
          // description="نسخر التكنولوجيا لتسهيل وصول تبرعاتكم لمستحقيها بكل أمان وشفافية، لنكون الجسر الموثوق بين قلوبكم المعطاءة ومن يحتاجون الدعم."
          center={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* 🖼️ الجانب البصري - تصميم يعبر عن التكافل */}
          <div className="relative group">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[12px] border-slate-50 dark:border-slate-900">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                alt="عمل تطوعي"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />
              {/* Overlay خفيف */}
              <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* أشكال زخرفية (Indigo & Orange) */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -z-0"></div>

            {/* بطاقة عائمة "الثقة" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl z-20 border border-slate-100 dark:border-white/5 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">شفافية 100%</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">تقارير دورية لكل تبرع</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 📝 محتوى النص */}
          <div className="text-right">
            <h4 className="text-orange-500 font-bold text-lg mb-4 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              رسالتنا هي الخير
            </h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              نحن نؤمن أن <span className="text-indigo-600 dark:text-indigo-400">الصدقة</span> تغير حياة الكثيرين
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed font-medium">
              "وصلة خير" ليست مجرد منصة رقمية، بل هي جسر من الأمل يربط بين القلوب الراغبة في العطاء وبين الأسر المحتاجة. نعمل كحلقة وصل موثوقة لضمان وصول مساهماتكم بفاعلية وسرعة لأكثر الحالات استحقاقاً.
            </p>

            {/* مميزات المنصة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { text: 'متابعة التبرع لحظة بلحظة', icon: <HandHelping size={18} /> },
                { text: 'جمعيات معتمدة وموثوقة', icon: <CheckCircle2 size={18} /> },
                { text: 'حماية كاملة لبيانات المتبرعين', icon: <ShieldCheck size={18} /> },
                { text: 'تغطية شاملة لكافة المحافظات', icon: <CheckCircle2 size={18} /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border-r-4 border-indigo-600 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm group">
                  <span className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* قسم الإحصائيات (Stats) */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-indigo-600 dark:text-indigo-400 mb-2 flex justify-center group-hover:translate-y-[-5px] transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;