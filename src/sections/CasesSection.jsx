import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Inbox,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import PageSectionHeader from "../components/PageSectionHeader";
import CaseCard from "../components/cards/CaseCard";
import { useGetFeaturedCases } from "../hocks/useCaseHooks";
import { useGetFavoriteCasesByDonorId } from "../hocks/useFavoriteHooks";
import { useUser } from "../hocks/useAuthHocks";

const CaseSkeleton = () => (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/5 p-4 space-y-4 shadow-sm h-full">
        <div className="relative h-52 bg-slate-200 dark:bg-slate-800 rounded-[1.5rem] animate-pulse" />

        <div className="space-y-3 px-2">
            <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>

        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-[1.25rem] space-y-3">
            <div className="flex justify-between">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
        </div>

        <div className="flex gap-3 pt-2">
            <div className="h-12 flex-1 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-12 flex-[2] bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
        </div>
    </div>
);

const CasesSection = () => {
    const { data: cases, isLoading, isError } = useGetFeaturedCases("active");
    const { data: userData } = useUser()
    const donorId = userData?.user?.id

    const { data: favoriteCases } = useGetFavoriteCasesByDonorId(donorId)

    const favoriteCaseIds = useMemo(() => {
        if (!favoriteCases) return new Set()
        else return new Set(favoriteCases.map((fav) => fav.caseId));
    }, [favoriteCases]);

    console.log(favoriteCaseIds)
    return (
        <section
            className="relative py-20  bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors duration-500 overflow-hidden"
            dir="rtl"
        >
            {/* خلفية خفيفة */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-200/20 dark:bg-indigo-500/10 blur-3xl rounded-full" />
                <div className="absolute bottom-10 left-10 w-52 h-52 bg-sky-200/20 dark:bg-sky-500/10 blur-3xl rounded-full" />
            </div>

            <div className="container max-w-7xl relative mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                    <PageSectionHeader
                        badgeText="ساهم معنا"
                        title="أحدث"
                        highlightTitle="حالات التبرع"
                        center={false}
                        description="تصفح الحالات الحرجة المضافة من الجمعيات الموثوقة، وتبرع بثقة وتابع تطورات كل حالة أولًا بأول."
                    />

                    <div className="flex items-center justify-between sm:justify-start gap-3">
                        <div className="hidden md:flex items-center gap-2">
                            <button className="featured-swiper-prev p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-500 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                                <ChevronRight size={20} />
                            </button>

                            <button className="featured-swiper-next p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-500 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                                <ChevronLeft size={20} />
                            </button>
                        </div>

                        <Link
                            to="/cases"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all group shadow-sm"
                        >
                            كل الحالات
                            <ArrowRight
                                size={20}
                                className="rotate-180 group-hover:-translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <CaseSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-16 px-6 bg-red-50 dark:bg-red-500/5 rounded-[2rem] border border-red-100 dark:border-red-500/10">
                        <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                            عذرًا، حدث خطأ أثناء تحميل الحالات.
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            حاول تحديث الصفحة مرة أخرى.
                        </p>
                    </div>
                ) : cases?.length > 0 ? (
                    <div className="relative">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            loop={cases.length > 3}
                            speed={800}
                            spaceBetween={20}
                            slidesPerGroup={1}
                            grabCursor={true}
                            allowTouchMove={true}
                            navigation={{
                                nextEl: ".featured-swiper-next",
                                prevEl: ".featured-swiper-prev",
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                                reverseDirection: false,
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 16,
                                },
                                640: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 16,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 18,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                            className="!px-1 !py-2"
                        >
                            {cases.map((item, index) => (
                                <SwiperSlide key={item.id} className="!h-auto">
                                    <CaseCard
                                        key={item.id}
                                        item={item}
                                        index={index} isFavorite={favoriteCaseIds.has(item.id)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 opacity-70 bg-white/60 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5">
                        <Inbox size={60} className="text-slate-400 mb-4" />
                        <p className="text-slate-600 dark:text-slate-300 font-bold text-lg">
                            لا توجد حالات تبرع حالياً
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            سيتم إضافة حالات جديدة قريبًا.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CasesSection;