import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Building2,
    Heart,
    ArrowRight,
    LayoutGrid,
    AlertCircle,
    SearchX,
    MapPin,
    Phone,
    Mail,
    Globe,
    Facebook,
    Instagram,
    Users,
    FolderKanban,
    CircleDollarSign,
    BadgeCheck,
} from "lucide-react";

import CaseCard from "../../components/cards/CaseCard";
import { useGetCharityDetails } from "../../hocks/useCharityHooks";
import { useGetCasesByCharityId } from "../../hocks/useCaseHooks";
import { useGetCategoriesByCharity } from "../../hocks/useCategoriesHocks";

function StatCard({ icon: Icon, label, value, color = "indigo" }) {
    const colorClasses = {
        indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        green: "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400",
        orange: "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
        blue: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
    };

    return (
        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center gap-4">
                <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}
                >
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
                        {label}
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

function InfoLinkCard({ icon: Icon, label, value, href }) {
    const content = (
        <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all shadow-sm">
            <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
                        {label}
                    </p>
                    <p className="text-base font-black text-slate-900 dark:text-white break-words">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );

    if (!href) return content;

    return (
        <a href={href} target="_blank" rel="noreferrer" className="block">
            {content}
        </a>
    );
}

function formatCurrency(value) {
    return new Intl.NumberFormat("ar-EG").format(Number(value || 0)) + " ج.م";
}

function CharitesPageDetails() {
    const { charityId } = useParams();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const {
        data: charity,
        isLoading: charityLoading,
        isError: charityError,
        error: charityErrorObj,
    } = useGetCharityDetails(charityId);

    const {
        data: cases = [],
        isLoading: casesLoading,
        isError: casesError,
        error: casesErrorObj,
    } = useGetCasesByCharityId(charityId);

    const {
        data: charityCategories = [],
        isLoading: categoriesLoading,
    } = useGetCategoriesByCharity(charityId);

    const categoriesWithCount = useMemo(() => {
        return charityCategories.map((cat) => {
            const casesCount = cases.filter(
                (item) => String(item.categoryId || item.categoryName) === String(cat.id || cat.name)
            ).length;

            return {
                ...cat,
                casesCount,
            };
        });
    }, [charityCategories, cases]);

    const filteredCases = useMemo(() => {
        if (selectedCategory === "all") return cases;

        return cases.filter(
            (item) => String(item.categoryId || item.categoryName) === selectedCategory
        );
    }, [cases, selectedCategory]);

    const activeCategory = useMemo(() => {
        if (selectedCategory === "all") return null;
        return (
            categoriesWithCount.find(
                (cat) => String(cat.id || cat.name) === selectedCategory
            ) || null
        );
    }, [selectedCategory, categoriesWithCount]);

    if (charityLoading || casesLoading || categoriesLoading) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"
                dir="rtl"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                        <Heart
                            className="absolute inset-0 m-auto text-indigo-600 animate-pulse"
                            size={20}
                        />
                    </div>
                    <p className="text-slate-900 dark:text-white font-black text-xl">
                        جاري تحميل بيانات الجمعية...
                    </p>
                </div>
            </div>
        );
    }

    if (charityError || casesError) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6"
                dir="rtl"
            >
                <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-red-100 dark:border-red-500/10 shadow-xl p-10">
                    <AlertCircle className="mx-auto text-red-500 mb-5" size={60} />
                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-3">
                        حدث خطأ أثناء تحميل البيانات
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        {charityErrorObj?.message ||
                            casesErrorObj?.message ||
                            "حاول مرة أخرى بعد قليل."}
                    </p>
                </div>
            </div>
        );
    }

    if (!charity) {
        return (
            <div
                className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6"
                dir="rtl"
            >
                <div className="max-w-xl w-full text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl p-10">
                    <SearchX className="mx-auto text-slate-400 mb-5" size={60} />
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
                        الجمعية غير موجودة
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">
                        لم نتمكن من العثور على بيانات هذه الجمعية.
                    </p>
                    <Link
                        to="/charities"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all"
                    >
                        <ArrowRight size={18} />
                        العودة إلى الجمعيات
                    </Link>
                </div>
            </div>
        );
    }

    console.log(charity)
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950" dir="rtl">
            {/* Hero */}
            <section className="relative overflow-hidden pt-28 pb-16 border-b border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-500/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/30 dark:bg-sky-500/10 blur-3xl rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <Link
                        to="/charities"
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-8 hover:gap-3 transition-all"
                    >
                        <ArrowRight size={18} />
                        العودة إلى الجمعيات
                    </Link>

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">
                        <div className="relative h-[280px] md:h-[360px]">
                            <img
                                src={charity.coverImageUrl || charity.logoUrl}
                                alt={charity.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

                            <div className="absolute top-6 right-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white font-bold text-sm border border-white/10">
                                    <Building2 size={16} />
                                    تفاصيل الجمعية
                                </span>
                            </div>

                            <div className="absolute bottom-6 right-6 left-6">
                                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-30 h-30 md:w-50 md:h-32 rounded-[2rem] bg-white dark:bg-slate-900 border-4 border-white/20 shadow-2xl overflow-hidden flex items-center justify-center shrink-0">
                                            {charity.logoUrl ? (
                                                <img
                                                    src={charity.logoUrl}
                                                    alt={charity.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Building2 className="w-12 h-12 md:w-16 md:h-16 text-indigo-600" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
                                                {charity.name}
                                            </h1>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white font-bold text-sm border border-white/10">
                                                    عدد الحالات: {cases.length}
                                                </span>

                                                <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white font-bold text-sm border border-white/10">
                                                    عدد التصنيفات: {categoriesWithCount.length}
                                                </span>

                                                <span className="px-4 py-2 rounded-full bg-emerald-500/90 text-white font-bold text-sm">
                                                    {charity.isActive ? "نشطة" : "غير نشطة"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shrink-0">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-black shadow-lg">
                                            <BadgeCheck size={16} />
                                            جهة موثقة
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-8 font-medium max-w-5xl">
                                {charity.description ||
                                    "استعرض الحالات والتصنيفات الخاصة بهذه الجمعية، وابدأ المساهمة في دعم الحالات الأكثر احتياجًا."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                {/* Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    <StatCard
                        icon={Users}
                        label="إجمالي المتبرعين"
                        value={charity.totalDonorsCount || 0}
                        color="blue"
                    />
                    <StatCard
                        icon={FolderKanban}
                        label="إجمالي المشاريع"
                        value={charity.totalProjectsCount || 0}
                        color="green"
                    />
                    <StatCard
                        icon={CircleDollarSign}
                        label="إجمالي التبرعات"
                        value={formatCurrency(charity.totalRaisedAmount)}
                        color="orange"
                    />
                    <StatCard
                        icon={LayoutGrid}
                        label="التصنيفات المتاحة"
                        value={categoriesWithCount.length}
                        color="indigo"
                    />
                </section>

                {/* Contact / Info */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <InfoLinkCard
                        icon={MapPin}
                        label="العنوان"
                        value={charity.address || "غير متوفر"}
                    />
                    <InfoLinkCard
                        icon={Phone}
                        label="رقم الهاتف"
                        value={charity.phoneNumber || "غير متوفر"}
                        href={charity.phoneNumber ? `tel:${charity.phoneNumber}` : null}
                    />
                    <InfoLinkCard
                        icon={Mail}
                        label="البريد الإلكتروني"
                        value={charity.email || "غير متوفر"}
                        href={charity.email ? `mailto:${charity.email}` : null}
                    />
                    <InfoLinkCard
                        icon={Globe}
                        label="الموقع الإلكتروني"
                        value={charity.websiteUrl || "غير متوفر"}
                        href={charity.websiteUrl}
                    />
                    <InfoLinkCard
                        icon={Facebook}
                        label="فيسبوك"
                        value={charity.facebookUrl || "غير متوفر"}
                        href={charity.facebookUrl}
                    />
                    <InfoLinkCard
                        icon={Instagram}
                        label="إنستجرام"
                        value={charity.instagramUrl || "غير متوفر"}
                        href={charity.instagramUrl}
                    />
                </section>

                {/* Categories */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                            <LayoutGrid
                                className="text-indigo-600 dark:text-indigo-400"
                                size={22}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                                تصنيفات الجمعية
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                اختر التصنيف الذي تريد استعراض حالاته
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`min-w-[220px] rounded-[2rem] border p-4 text-right transition-all ${
                                selectedCategory === "all"
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                        selectedCategory === "all"
                                            ? "bg-white/20"
                                            : "bg-indigo-50 dark:bg-indigo-500/10"
                                    }`}
                                >
                                    <LayoutGrid
                                        className={
                                            selectedCategory === "all"
                                                ? "text-white"
                                                : "text-indigo-600 dark:text-indigo-400"
                                        }
                                    />
                                </div>

                                <div>
                                    <p className="font-black text-lg">كل الحالات</p>
                                    <p
                                        className={`text-xs mt-1 ${
                                            selectedCategory === "all"
                                                ? "text-white/80"
                                                : "text-slate-400 dark:text-slate-500"
                                        }`}
                                    >
                                        {cases.length} حالة
                                    </p>
                                </div>
                            </div>
                        </button>

                        {categoriesWithCount.map((cat) => {
                            const isActive =
                                selectedCategory === String(cat.id || cat.name);

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() =>
                                        setSelectedCategory(String(cat.id || cat.name))
                                    }
                                    className={`min-w-50 rounded-[2rem] border p-2 text-right transition-all ${
                                        isActive
                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:border-indigo-200 dark:hover:border-indigo-500/20"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-20 h-18 rounded-2xl overflow-hidden flex items-center justify-center ${
                                                isActive
                                                    ? "bg-white/20"
                                                    : "bg-indigo-50 dark:bg-indigo-500/10"
                                            }`}
                                        >
                                            {cat.iconUrl ? (
                                                <img
                                                    src={cat.iconUrl}
                                                    alt={cat.name}
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            ) : (
                                                <LayoutGrid
                                                    className={`w-7 h-7 ${
                                                        isActive
                                                            ? "text-white"
                                                            : "text-indigo-600 dark:text-indigo-400"
                                                    }`}
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-black text-lg truncate">
                                                {cat.name}
                                            </p>
                                            <p
                                                className={`text-xs mt-1 ${
                                                    isActive
                                                        ? "text-white/80"
                                                        : "text-slate-400 dark:text-slate-500"
                                                }`}
                                            >
                                                {cat.casesCount} حالة
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Cases */}
                <section>
                    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                                {selectedCategory === "all"
                                    ? "كل حالات الجمعية"
                                    : `حالات ${activeCategory?.name || ""}`}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                                عدد الحالات المعروضة: {filteredCases.length}
                            </p>
                        </div>
                    </div>

                    {filteredCases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredCases.map((item, index) => (
                                <CaseCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm">
                            <SearchX
                                size={72}
                                className="mx-auto text-slate-300 dark:text-slate-700 mb-6"
                            />
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
                                لا توجد حالات حالياً
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                                لا توجد حالات مرتبطة بهذا التصنيف داخل الجمعية حالياً.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default CharitesPageDetails;