import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getContainerById } from "@/data/containers";
import ContainerSection from "@/components/ui/ContainerSection";
import SEOContent from "@/components/seo/SEOContent";
import FAQ from "@/components/seo/FAQ";

const decorCopy = `الديكور المنزلي من العمودي للمفروشات

نقدّم في العمودي للمفروشات تشكيلة من قطع الديكور والإكسسوارات المنزلية المختارة بعناية لتكمل مفهوم بيتك. من **الستائر العصرية** بألوانها وخاماتها المتنوعة إلى **خدمات تنسيق الحدائق** التي تشمل العشب الصناعي والشلالات والنوافير والنباتات المنسقة، كل عنصر مصمّم ليتناغم مع الذوق السعودي الحديث ويرفع من قيمة المساحة سواء كانت سكنية أو تجارية.

كيف نختار قطع الديكور؟

نختار كل منتج بناءً على ثلاثة محاور: **الجودة** (خامات تدوم لسنوات)، **التصميم** (ألوان ونقوش متناغمة مع التريندات الحديثة)، و**التركيب** (سهل أو ضمن خدمتنا الاحترافية). نتعاون مع موردين معتمدين محليًا وعالميًا، ونوفّر استشارة مجانية لاختيار القطع المناسبة لمساحتك ومُيزانيتك.

خدمات تكميلية

إلى جانب البيع، نوفّر **زيارة مندوب مجانية** للمعاينة والقياس داخل الرياض، **تركيبًا احترافيًا** بضمان، و**استشارات تنسيق** للديكور الكامل. تواصل عبر الواتساب لحجز موعد أو زيارة المعرض في حي العزيزية.`;

const decorFaq = [
  {
    question: "ما القطع التي تشملها صفحة الديكور؟",
    answer: "تشمل الستائر بأنواعها (الستائر الكلاسيكية، الرولر، الزيبرا) وخدمات تنسيق الحدائق (عشب صناعي، شلالات، نوافير، نباتات منسقة)، إلى جانب إكسسوارات تكميلية للمنزل."
  },
  {
    question: "هل تقدّمون استشارات ديكور؟",
    answer: "نعم — نقدّم استشارات مجانية عبر الواتساب أو في المعرض لاختيار القطع المناسبة لذوقك ومساحتك وميزانيتك."
  },
  {
    question: "هل التركيب مشمول في السعر؟",
    answer: "التركيب خدمة منفصلة بأسعار تنافسية، أما التوصيل داخل الرياض فمجاني. اطلب عرض سعر شامل التركيب عبر الواتساب."
  },
  {
    question: "هل هناك ضمان على قطع الديكور؟",
    answer: "نعم — كل المنتجات لدينا تأتي بضمان جودة، وسياسة استبدال خلال 14 يومًا للقطع غير المُركّبة."
  },
  {
    question: "هل يمكنني زيارة المعرض؟",
    answer: "نرحّب بكم في معرضنا في حي العزيزية، شارع عبدالله بن صالح بالرياض. ساعات العمل: السبت-الخميس 9 ص - 10 م، الجمعة 2 م - 10 م."
  }
];

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: "الديكور والإكسسوارات المنزلية — ستائر ومفروشات",
  description: "تشكيلة ديكور وإكسسوارات منزلية فاخرة من العمودي للمفروشات بالرياض. ستائر، مفروشات، وقطع تكميلية لإطلالة عصرية.",
  keywords: ["ديكور", "إكسسوارات منزلية", "ستائر", "ديكور الرياض", "تنسيق منازل"],
  alternates: { canonical: "/decor" },
  openGraph: {
    title: "الديكور والإكسسوارات المنزلية | العمودي للمفروشات",
    description: "ستائر وقطع ديكور فاخرة لإطلالة عصرية في منزلك. توصيل وتركيب مجاني داخل الرياض.",
    type: "website",
    url: `${baseUrl}/decor`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/decor.jpg", width: 1200, height: 630, alt: "الديكور والإكسسوارات - العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "الديكور والإكسسوارات | العمودي للمفروشات",
    description: "ستائر وقطع ديكور فاخرة لإطلالة عصرية.",
    images: ["/og/decor.jpg"],
  },
};

export default function DecorPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "الديكور" }
  ];

  const curtains = getContainerById("curtains-collection");
  const garden = getContainerById("garden-services");

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الديكور والإكسسوارات</h1>
          <p className="text-xl text-gray-600">تسوق أفضل قطع الديكور وأضف لمسة جمالية لمنزلك</p>
        </div>
        {curtains && (
          <ContainerSection
            section={curtains}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        )}
        {garden && (
          <ContainerSection
            section={garden}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        )}
        <SEOContent content={decorCopy} title="عن تشكيلة الديكور" />
        <div className="mt-12">
          <FAQ items={decorFaq} title="أسئلة شائعة عن الديكور" />
        </div>
      </div>
    </div>
  );
}
