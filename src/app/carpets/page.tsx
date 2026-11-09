import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQ from "@/components/seo/FAQ";
import { BUSINESS } from "@/constants/business";
import { productsDetails } from "@/data/products";

/**
 * The carpet hub. It ranked around position 7 in February to April 2026 and about 19 by
 * November, as the sister sites built from the same template grew. Every fact here comes from
 * BUSINESS.facts or the product data; the prices are the ones each product page shows.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: "موكيت وسجاد الرياض — تشكيلة فاخرة مع التركيب",
  description: "اكتشف أحدث تشكيلات الموكيت والسجاد الفاخر في الرياض من العمودي للمفروشات. توصيل وتركيب.",
  keywords: ["موكيت", "سجاد", "موكيت الرياض", "سجاد الرياض", "موكيت مساجد", "موكيت تركي", "موكيت مشجر"],
  alternates: { canonical: "/carpets" },
  openGraph: {
    title: "موكيت وسجاد الرياض — تشكيلة فاخرة | العمودي للمفروشات",
    description: "أحدث تشكيلات الموكيت والسجاد الفاخر بأفضل الأسعار في الرياض. توصيل وتركيب.",
    type: "website",
    url: `${baseUrl}/carpets`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/carpets.jpg", width: 1200, height: 630, alt: "تشكيلة الموكيت والسجاد - العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "موكيت وسجاد الرياض — العمودي للمفروشات",
    description: "أحدث تشكيلات الموكيت والسجاد الفاخر بأفضل الأسعار في الرياض.",
    images: ["/og/carpets.jpg"],
  },
};

const priceOf = (id: string) => productsDetails.find((p) => p.id === id)?.price;

const TYPES = [
  {
    id: "mokite",
    name: "موكيت منازل",
    image: "/images/catg/mokite.jpg",
    text: "لغرف النوم والصالات والمجالس، بألوان وتصاميم متعددة.",
  },
  {
    id: "turky-mshager",
    name: "موكيت تركي مشجر",
    image: "/turky mshager/WhatsApp Image 2025-08-02 at 6.39.25 PM.jpeg",
    text: "موكيت بنقوش للمجالس والصالات. اسأل عن النقوش والألوان المتوفرة.",
  },
  {
    id: "mosque-carpets",
    name: "موكيت مساجد",
    image: "/images/catg/msaged.jpg",
    text: "موكيت بالمتر لفرش المساجد والمصليات، مع عروض جملة للمساجد.",
  },
  {
    id: "office-flooring",
    name: "بلاط موكيت مكاتب",
    image: "/images/catg/mactbia.webp",
    text: "مربعات موكيت للمكاتب والشركات، مع عروض جملة للشركات.",
  },
  {
    id: "vinyl-mosque",
    name: "فينيل مساجد",
    image: "/images/catg/vinylmsagd.webp",
    text: "أرضية فينيل للمساجد والمصليات لمن يفضّلها على الموكيت.",
  },
];

const PLACES = [
  {
    name: "المجالس وغرف الضيوف",
    text: "اختر بين الموكيت المشجر والسادة حسب لون الكنب والجدران. أرسل صورة المجلس على الواتساب ونرشّح لك الألوان.",
    link: { href: "/furniture", label: "الكنب والستائر للمجلس" },
  },
  {
    name: "غرف النوم والصالات",
    text: "موكيت المنازل يغطي الغرفة من الجدار إلى الجدار. أرسل مقاس الغرفة لتصلك الألوان المتوفرة وعرض السعر.",
    link: { href: "/products/mokite", label: "موكيت المنازل" },
  },
  {
    name: "المكاتب والشركات",
    text: "بلاط الموكيت يناسب المكاتب. أخبرنا بعدد الغرف والمساحة لنحسب لك الكمية.",
    link: { href: "/products/office-flooring", label: "بلاط موكيت المكاتب" },
  },
  {
    name: "المساجد والمصليات",
    text: "موكيت مساجد بالمتر، وعروض جملة حسب مساحة المسجد.",
    link: { href: "/products/mosque-carpets", label: "موكيت المساجد" },
  },
];

const waLink = `https://wa.me/${BUSINESS.phone.primary.replace("+", "")}?text=${encodeURIComponent(
  "مرحباً، أريد الاستفسار عن الموكيت"
)}`;

export default function CarpetsPage() {
  const home = priceOf("mokite");
  const mosque = priceOf("mosque-carpets");
  const office = priceOf("office-flooring");
  const { streetAddress, addressLocality } = BUSINESS.address;
  const { sunThu, friday, saturday } = BUSINESS.hours.display;

  const prices = [
    home && `موكيت المنازل يبدأ من ${home} ريال للمتر المربع`,
    mosque && `موكيت المساجد من ${mosque} ريال`,
    office && `بلاط موكيت المكاتب من ${office} ريال`,
  ]
    .filter(Boolean)
    .join("، ");

  const faq = [
    {
      question: "بكم متر الموكيت في الرياض؟",
      answer: `${prices}. السعر النهائي حسب النوع والمساحة، والتركيب يُحسب بالمتر.`,
    },
    {
      question: "هل المعاينة والقياس مجانًا؟",
      answer: "نعم، المعاينة والقياس مجانًا داخل الرياض. أرسل صور المكان على الواتساب لنحدد الموعد.",
    },
    {
      question: "كم يستغرق تركيب الموكيت؟",
      answer: "تركيب الشقة العادية يستغرق يومًا، ولا يوجد حد أدنى للمساحة.",
    },
    {
      question: "هل يوجد ضمان على تركيب الموكيت؟",
      answer: "نعم، يوجد ضمان على التركيب.",
    },
    {
      question: "كم تكلفة توصيل الموكيت؟",
      answer: "تكلفة التوصيل حسب المكان، والتسليم خلال 1 إلى 3 أيام.",
    },
    {
      question: "هل تبيعون الموكيت بالجملة؟",
      answer: "نعم، نبيع بالجملة للمساجد والشركات، والسعر حسب الكمية.",
    },
    {
      question: "أين يقع محل الموكيت؟",
      answer: `في ${streetAddress}، ${addressLocality}. مواعيد العمل: ${sunThu}، ${saturday}، ${friday}.`,
    },
  ];

  return (
    <div className="pt-2 md:pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <Breadcrumbs items={[{ name: "الرئيسية", href: "/" }, { name: "السجاد والموكيت" }]} />

      <header className="mt-6 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">موكيت وسجاد في الرياض</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
          محل موكيت في حراج بن قاسم. نورّد الموكيت ونركّبه للبيوت والمجالس والمكاتب والمساجد، والأسعار تبدأ من{" "}
          {home} ريال للمتر المربع. المعاينة والقياس مجانًا داخل الرياض.
        </p>
        <div className="mx-auto mt-4 h-1 w-20 rounded bg-blue-600" />
        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <a
            href={BUSINESS.phone.telLink}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
          >
            اتصال الآن
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
          >
            أرسل صورة المكان على الواتساب
          </a>
        </div>
      </header>

      <section className="mt-14">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">أنواع الموكيت عندنا</h2>
          <div className="mx-auto h-1 w-20 rounded bg-blue-600" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((t) => {
            const price = priceOf(t.id);
            return (
              <Link
                key={t.id}
                href={`/products/${t.id}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {price && (
                    <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-gray-900 shadow">
                      يبدأ من {price} ريال/م²
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">{t.name}</h3>
                  <p className="mt-2 flex-1 text-gray-600 leading-relaxed">{t.text}</p>
                  <span className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition-colors group-hover:bg-blue-700">
                    التفاصيل والصور
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">أي موكيت يناسب مكانك؟</h2>
          <div className="mx-auto h-1 w-20 rounded bg-blue-600" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PLACES.map((p) => (
            <div key={p.name} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h3>
              <p className="text-gray-700 leading-relaxed">{p.text}</p>
              <Link href={p.link.href} className="mt-2 inline-block font-semibold text-primary hover:underline">
                {p.link.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">كيف تطلب الموكيت؟</h2>
          <div className="mx-auto h-1 w-20 rounded bg-blue-600" />
        </div>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "أرسل صورة المكان ومساحته التقريبية على الواتساب، أو اتصل بنا.",
            "نحدد موعد المعاينة والقياس، وهي مجانًا داخل الرياض.",
            "يصلك عرض السعر: سعر المتر، والتركيب بالمتر، وتكلفة التوصيل حسب المكان.",
            "التسليم خلال 1 إلى 3 أيام، وتركيب الشقة العادية في يوم.",
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-1.5 text-gray-700 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-gray-700 leading-relaxed">
          نوفّر أيضًا{" "}
          <Link href="/products/parket" className="font-semibold text-primary hover:underline">الباركيه</Link>،
          و<Link href="/products/vinyl-roll" className="font-semibold text-primary hover:underline">الفينيل رول</Link>،
          و<Link href="/products/artificial-grass" className="font-semibold text-primary hover:underline">العشب الصناعي</Link>،
          وكل المنتجات في{" "}
          <Link href="/products" className="font-semibold text-primary hover:underline">صفحة المنتجات</Link>.
        </p>
      </section>

      <div className="mt-12">
        <FAQ items={faq} title="أسئلة عن الموكيت" />
      </div>
    </div>
  );
}
