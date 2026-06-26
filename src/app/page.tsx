import HeroSection from "@/components/hero/HeroSection";
import Iconcomponanet from "@/components/hero/iconcomponanet";
import ContainerSection from "@/components/ui/ContainerSection";
import { containerSections } from "@/data/containers";
import HeroContainer from "@/components/ui/HeroContainer";
import FAQ from "@/components/seo/FAQ";
import Link from "next/link";
import SEOContent from "@/components/seo/SEOContent";

const homeSeoContent = `
**لمسة ابداع - خيارك الأول لمفروشات الرياض**
نحن في لمسة ابداع لمفروشات الرياض نفخر بتقديم أفضل تشكيلة من الموكيت والسجاد وأرضيات الباركيه والفينيل في الرياض. منذ تأسيسنا، التزمنا بتوفير منتجات تجمع بين الفخامة، المتانة، والأسعار التنافسية. 

1. تفصيل موكيت مساجد
نحن متخصصون في فرش المساجد بأجود أنواع الموكيت التركي والوطني، مع توفير خدمات القياس والتركيب الاحترافي لضمان راحة المصلين.

2. أرضيات باركيه وفينيل
نقدم خيارات واسعة من الأرضيات الخشبية (الباركيه) وأرضيات الفينيل التي تناسب المنازل والمكاتب، وتتميز بمقاومتها العالية للرطوبة وسهولة التنظيف.
`;

// FAQ Items for Homepage
const homeFaqItems = [
  {
    question: "هل توفرون خدمة التركيب؟",
    answer: "نعم، نوفر خدمة التركيب الاحترافي لجميع منتجاتنا من موكيت وسجاد وأرضيات وباركيه. فريقنا المتخصص يضمن تركيباً متقناً يحافظ على جودة المنتج.",
  },
  {
    question: "هل التوصيل مجاني داخل الرياض؟",
    answer: "نعم، نوفر خدمة التوصيل المجاني لجميع أنحاء الرياض. للمناطق خارج الرياض، يمكنكم التواصل معنا لمعرفة تكاليف الشحن.",
  },
  {
    question: "ما أنواع الموكيت المتوفرة لديكم؟",
    answer: "نوفر تشكيلة واسعة تشمل موكيت المنازل، موكيت المساجد، موكيت تركي مشجر، موكيت المكاتب، وأرضيات الفينيل. جميعها بأعلى معايير الجودة.",
  },
  {
    question: "هل يمكنني معاينة المنتجات قبل الشراء؟",
    answer: "بالتأكيد! يمكنكم زيارة معرضنا في الرياض لمعاينة جميع المنتجات، أو طلب زيارة مندوب للمنزل مع عينات مجانية.",
  },
  {
    question: "ما هي سياسة الضمان والاستبدال؟",
    answer: "نقدم ضماناً على جميع منتجاتنا وخدمات التركيب. في حال وجود أي عيب، نوفر خدمة الاستبدال خلال فترة الضمان بشروط ميسرة.",
  },
];

export default function Home() {
  return (
      <div className="min-h-screen">
        <HeroSection />
        <Iconcomponanet />

        {/* Display Container Sections */}
        {containerSections.slice(0, 1).map((section) => (
          <ContainerSection
            key={section.id}
            section={section}
            className=""
            mobileCols="grid-cols-2"
          />
        ))}

        <HeroContainer
          title="أرضيات تضيف الأناقة... وتتحمل لسنوات"
          description="حوّل أجواء منزلك بلمسة من الفخامة مع تشكيلتنا المختارة من الأرضيات المصمّمة بعناية لتناسب مختلف الأذواق والمساحات."
          buttonText="تسوق الآن"
          buttonHref="/products/mokite"
          images={[
            "/home/Ardiat1 (1).jpeg",
            "/home/Ardiat1 (2).jpeg",
            "/home/Ardiat1 (3).jpeg",
            "/home/Ardiat1 (4).jpeg",
            "/home/Ardiat1 (5).jpeg"
          ]}
          imageAlt="أرضيات فاخرة من العمودي للمفروشات الرياض"
          backgroundColor="bg-[#EAE4D8]"
          textColor="text-black"
        />

        {containerSections.slice(1, 2).map((section) => (
          <ContainerSection
            key={section.id}
            section={section}
            className=""
          />
        ))}

        <HeroContainer
          title="موكيت يغطي المساحة... ويمنحك الراحة"
          description="أضف لمسة من الدفء والهدوء إلى منزلك مع تشكيلتنا المميزة من الموكيت، تصاميم تناسب كل الأذواق والمساحات."
          buttonText="عرض المنتجات"
          buttonHref="/products/mokite"
          image="/home/mokite.png"
          imageAlt="موكيت عالي الجودة من العمودي للمفروشات الرياض"
          backgroundColor="bg-[#D2E0D4]"
          textColor="text-black"
        />



        {/* Internal Links Section - SEO Optimized */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
              تصفح منتجاتنا
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              <Link
                href="/products/mosque-carpets"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <span className="text-primary font-semibold">موكيت مساجد</span>
              </Link>
              <Link
                href="/products/mokite"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <span className="text-primary font-semibold">موكيت منازل</span>
              </Link>
              <Link
                href="/products/parket"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <span className="text-primary font-semibold">أرضيات باركيه</span>
              </Link>
              <Link
                href="/products/vinyl-roll"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <span className="text-primary font-semibold">أرضيات فينيل</span>
              </Link>
              <Link
                href="/products/artificial-grass"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <span className="text-primary font-semibold">عشب صناعي</span>
              </Link>
              <Link
                href="/about"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <span className="text-primary font-semibold">من نحن</span>
              </Link>
            </div>
            <p className="text-center text-gray-600 mt-6">
              تعرف على <Link href="/about" className="text-primary hover:underline font-semibold">لمسة ابداع لمفروشات الرياض</Link> -
              خبرة واسعة في <Link href="/products/mokite" className="text-primary hover:underline">موكيت الرياض</Link> و
              <Link href="/products/parket" className="text-primary hover:underline">أرضيات الرياض</Link>
            </p>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="px-4">
          <div className="max-w-4xl mx-auto">
            <SEOContent content={homeSeoContent} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <FAQ items={homeFaqItems} title="الأسئلة الشائعة حول خدماتنا" />
          </div>
        </section>
      </div>
  );
}

