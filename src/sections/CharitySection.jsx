import React from "react";
import { Link } from "react-router-dom";
import {
    Loader2,
    Inbox,
    Building2,
    ArrowLeft
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { useGetCharities } from "../hocks/useCharityHooks";
import PageSectionHeader from "../components/PageSectionHeader";
import CharityCard from "../components/cards/CharityCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CharitySection = () => {
    const { data: charities, isLoading, isError } = useGetCharities();

    return (
        <section
            className="py-20 bg-white dark:bg-slate-950 transition-colors duration-500"
            dir="rtl"
        >
            <div className="container mx-auto px-6">
                {/* Header */}
                <PageSectionHeader
                    icon={Building2}
                    title="شركاء "
                    badgeText="المؤسسات الخيرية"
                    highlightTitle="الخير"
                    description="نعمل مع أوثق الجمعيات والمؤسسات الخيرية لضمان وصول تبرعاتكم بأمان وشفافية تامة."
                    center={false}
                />

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                        <span className="text-slate-500 font-black text-lg">
                            جاري تحميل الشركاء...
                        </span>
                    </div>
                ) : isError ? (
                    <div className="max-w-md mx-auto text-center py-12 bg-red-50 dark:bg-red-950/20 rounded-[2.5rem] border border-red-100 dark:border-red-900/30">
                        <p className="text-red-600 dark:text-red-400 font-bold">
                            عذرًا، حدث خطأ في تحميل بيانات الجمعيات.
                        </p>
                    </div>
                ) : charities?.length > 0 ? (
                    <div className="relative">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1.2}
                            loop={true}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                        >
                            {charities.map((charity) => (
                                <SwiperSlide key={charity.id}>
                                    <CharityCard charity={charity} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="text-center py-20 opacity-30">
                        <Inbox size={64} className="mx-auto mb-4" />
                        <h3 className="text-xl font-black">
                            لا توجد جمعيات حالياً
                        </h3>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CharitySection;