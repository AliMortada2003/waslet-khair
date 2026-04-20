import React from "react";
import { 
    Facebook, Instagram, Twitter, Linkedin, Mail, Phone, 
    MapPin, ChevronLeft, Heart, HeartHandshake, Building2, 
    Shapes, UserPlus, Info, Lightbulb, Home 
} from "lucide-react";
import ScrollAnimation from "../helpers/ScrollAnimation";
import { NavLink } from "react-router-dom";
import WaslaLogo from "../components/WaslaLogo";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    const navLinks = [
        { name: "الرئيسية", to: "/", icon: <Home size={16} /> },
        { name: "الحالات الإنسانية", to: "/cases", icon: <HeartHandshake size={16} /> },
        { name: "الجمعيات الشريكة", to: "/charities", icon: <Building2 size={16} /> },
        { name: "مجالات الخير", to: "/categories", icon: <Shapes size={16} /> },
        { name: "انضم كمؤسسة", to: "/join", icon: <UserPlus size={16} /> },
        { name: "عن وصلة خير", to: "/about", icon: <Info size={16} /> },
        { name: "مدونة الأثر", to: "/advice", icon: <Lightbulb size={16} /> },
    ];

    return (
        <footer
            className="relative overflow-hidden border-t border-white/5 bg-[#070c14] text-slate-300"
            dir="rtl"
        >
            {/* خط إضاءة علوي هادئ بلون الهوية */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

            <div className="container max-w-7xl mx-auto px-6 pt-16 pb-8">
                <ScrollAnimation direction="up" duration={0.8}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* العمود الأول: اللوجو والتعريف */}
                        <div className="space-y-6 lg:col-span-1">
                            <WaslaLogo />
                            <p className="text-slate-400 leading-relaxed text-sm">
                                منصة "وصلة خير" هي الجسر الذي يربط بين المتبرعين والحالات الإنسانية الأكثر احتياجاً، نضمن وصول تبرعك لمستحقيه بشفافية تامة وتحت إشراف جمعيات معتمدة.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { icon: <Facebook size={18} />, href: "#" },
                                    { icon: <Instagram size={18} />, href: "#" },
                                    { icon: <Twitter size={18} />, href: "#" },
                                    { icon: <Linkedin size={18} />, href: "#" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-orange-400 hover:border-orange-500/50 transition-all duration-300"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* العمود الثاني: روابط سريعة */}
                        <div className="lg:pr-4">
                            <h3 className="text-white font-bold mb-6 font-[Cairo] text-lg">خريطة المنصة</h3>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <NavLink
                                            to={link.to}
                                            className={({ isActive }) =>
                                                `group flex items-center gap-2 text-[15px] transition-all duration-300 ${
                                                    isActive ? "text-orange-500" : "text-slate-400 hover:text-orange-400"
                                                }`
                                            }
                                        >
                                            <ChevronLeft
                                                size={14}
                                                className="transition-transform duration-300 group-hover:-translate-x-1"
                                            />
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* العمود الثالث: رؤية المنصة */}
                        <div>
                            <h3 className="text-white font-bold mb-6 font-[Cairo] text-lg">أثرك يبقى</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Heart size={18} className="text-orange-500 shrink-0 mt-1" />
                                    <div className="text-sm">
                                        <p className="text-slate-200">الشفافية والمصداقية</p>
                                        <p className="text-slate-400 mt-1">تقارير دورية لكل حالة تساهم فيها لتعرف أين ذهب تبرعك في سبيل الخير.</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                    <p className="text-xs text-orange-400 leading-5 italic text-center font-medium">
                                        "ما نقص مال من صدقة، بل يزداد"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* العمود الرابع: معلومات الاتصال الخاصة بك */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold mb-6 font-[Cairo] text-lg">تواصل مباشر</h3>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                                <span className="text-xs leading-5 italic">سوهاج - جمهورية مصر العربية</span>
                            </div>
                            <a 
                                href="tel:+201125346313" 
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all group cursor-pointer"
                            >
                                <Phone size={18} className="text-orange-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <span dir="ltr" className="text-sm font-medium hover:text-orange-400">01125346313</span>
                            </a>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                <Mail size={18} className="text-orange-500 shrink-0" />
                                <span className="text-xs truncate">info@waslakhair.com</span>
                            </div>
                        </div>

                    </div>
                </ScrollAnimation>

                {/* حقوق النشر والمالك */}
                <ScrollAnimation direction="up" delay={0.3}>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px]">
                        <p className="text-slate-500">
                            © {currentYear} جميع الحقوق محفوظة لمنصة <span className="text-slate-300 font-bold">وصلة خير</span>
                        </p>
                        <div className="flex gap-2 text-slate-500 items-center">
                            <span className="text-[11px]">بواسطة</span>
                            <span className="text-orange-500 font-black tracking-widest uppercase">ALI MORTADA</span>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </footer>
    );
};

export default Footer;