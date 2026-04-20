import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import PageSectionHeader from "../components/PageSectionHeader";
import CategoryCard from "../components/cards/CategoryCard";
import { useGetCategories } from "../hocks/useCategoriesHocks";
import { unifyCategoriesFromApi } from "../helpers/categoryMatcher";

const CategorySection = () => {
    const { data: categories = [], isLoading, isError } = useGetCategories();

    const unifiedCategories = useMemo(() => {
        return unifyCategoriesFromApi(categories);
    }, [categories]);

    if (isLoading || isError || unifiedCategories.length === 0) {
        return null;
    }

    return (
        <section
            className="py-20 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden"
            dir="rtl"
        >
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                    <PageSectionHeader
                        icon={LayoutGrid}
                        title="اختر نوع"
                        badgeText="أنواع التبرع"
                        highlightTitle="التبرع"
                        description="اختر التصنيف المناسب، واستعرض الحالات المرتبطة به بسهولة وسرعة."
                        center={false}
                    />

                    <div className="flex items-center justify-between sm:justify-start gap-3">
                        <div className="hidden md:flex items-center gap-2">
                            <button className="categories-swiper-prev p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                                <ChevronRight size={20} />
                            </button>

                            <button className="categories-swiper-next p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                                <ChevronLeft size={20} />
                            </button>
                        </div>

                        <Link
                            to="/categories"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all shadow-sm"
                        >
                            <span>كل التصنيفات</span>
                            <ArrowLeft size={18} />
                        </Link>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={unifiedCategories.length > 4}
                    speed={800}
                    spaceBetween={20}
                    slidesPerGroup={1}
                    grabCursor={true}
                    allowTouchMove={true}
                    navigation={{
                        nextEl: ".categories-swiper-next",
                        prevEl: ".categories-swiper-prev",
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.15,
                            spaceBetween: 14,
                        },
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 2.2,
                            spaceBetween: 18,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    className="!px-1 !py-2"
                >
                    {unifiedCategories.map((item) => (
                        <SwiperSlide key={item.slug} className="!h-auto">
                            <CategoryCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CategorySection;