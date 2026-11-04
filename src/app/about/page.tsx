import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/constants/business';
import { pageOpenGraph } from '@/constants/openGraph';


export const metadata: Metadata = {
  title: 'من نحن — محل موكيت وأرضيات في حي العزيزية بالرياض',
  description:
    'العمودي للمفروشات محل موكيت وأرضيات في حي العزيزية بالرياض: موكيت وباركيه وفينيل وعشب صناعي وربل وفوم. تعرّف على العنوان والمواعيد وطريقة الطلب.',
  alternates: {
    canonical: '/about',
  },
  openGraph: pageOpenGraph('/about', 'من نحن — محل موكيت وأرضيات في حي العزيزية بالرياض', 'العمودي للمفروشات محل موكيت وأرضيات في حي العزيزية بالرياض: موكيت وباركيه وفينيل وعشب صناعي وربل وفوم. تعرّف على العنوان والمواعيد وطريقة الطلب.'),
};

/** Curtains, decor and sofas return with the owner's photos. */
const PRODUCT_GROUPS = [
  {
    label: 'للبيوت',
    items: [
      { name: 'موكيت منازل', href: '/products/mokite' },
      { name: 'موكيت تركي مشجر', href: '/products/turky-mshager' },
      { name: 'باركيه', href: '/products/parket' },
      { name: 'باركيه ضد الماء', href: '/products/water-resistant-carpet' },
      { name: 'فينيل رول', href: '/products/vinyl-roll' },
      { name: 'ربل حمامات', href: '/products/bathroom-rubber' },
      { name: 'أرضيات فوم بازل', href: '/products/foam-flooring' },
    ],
  },
  {
    label: 'للمساجد والمكاتب',
    items: [
      { name: 'موكيت مساجد', href: '/products/mosque-carpets' },
      { name: 'فينيل مساجد', href: '/products/vinyl-mosque' },
      { name: 'موكيت وأرضيات مكاتب', href: '/products/office-flooring' },
    ],
  },
  {
    label: 'للمستشفيات وصالات الرياضة والإسطبلات',
    items: [
      { name: 'فينيل طبي', href: '/products/hospital-flooring' },
      { name: 'ربل جيم', href: '/products/gym-rubber' },
      { name: 'ربل خيل', href: '/products/horse-rubber' },
    ],
  },
  {
    label: 'للحدائق والأسطح',
    items: [
      { name: 'عشب صناعي', href: '/products/artificial-grass' },
      { name: 'شلالات ونوافير', href: '/products/shlal' },
      { name: 'نباتات منسقة', href: '/products/planets' },
    ],
  },
];

export default function AboutPage() {
  // Structured Data for About Page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: { '@id': BUSINESS.id },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-custom-background pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              العمودي للمفروشات — الرياض
            </h1>
          </div>

          <div className="prose prose-lg max-w-none text-right" dir="rtl">
            <section className="mb-12">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                العمودي للمفروشات محل موكيت وأرضيات في الرياض، ومعرضه في حي العزيزية على شارع عبدالله بن صالح. نبيع الموكيت والسجاد والباركيه والفينيل والعشب الصناعي والربل وأرضيات الفوم، ونوفّر التوصيل والتركيب. وإذا كنت تجهّز بيتًا كاملًا، يمكنك اختيار أرضية كل غرفة من مكان واحد.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">ماذا نبيع؟</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {PRODUCT_GROUPS.map((group) => (
                  <div key={group.label} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{group.label}</h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-primary hover:underline">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-primary mb-6">كيف تطلب؟</h2>
              <ol className="list-decimal pr-6 space-y-3 text-lg text-gray-700">
                <li>اتصل بنا أو راسلنا على واتساب على الرقم {BUSINESS.phone.displayLocal}.</li>
                <li>أرسل مساحة المكان وصورته، ونرد عليك بعرض سعر.</li>
                <li>يمكنك أيضًا زيارة المعرض لرؤية الخامات بنفسك قبل الشراء.</li>
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">قبل أن تطلب</h2>
              <ul className="list-disc pr-6 space-y-3 text-lg text-gray-700">
                <li>التسليم خلال 1 إلى 3 أيام.</li>
                <li>التوصيل والتركيب متاحان، والتركيب خدمة منفصلة تُحسب بالمتر. اسألنا عن التكلفة عند طلب عرض السعر.</li>
                <li>يوجد ضمان على التركيب.</li>
                <li>المعاينة والقياس مجانًا داخل الرياض.</li>
                <li>تركيب الشقة العادية يستغرق يومًا، ولا يوجد حد أدنى للمساحة.</li>
                <li>نبيع بالجملة أيضًا للمساجد والشركات.</li>
              </ul>
            </section>

            <section className="mb-12 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-primary mb-6">العنوان والمواعيد</h2>
              <p className="text-lg text-gray-700 mb-4">{BUSINESS.address.full}</p>
              <ul className="space-y-2 text-lg text-gray-700 mb-4">
                <li>{BUSINESS.hours.display.sunThu}</li>
                <li>{BUSINESS.hours.display.friday}</li>
                <li>{BUSINESS.hours.display.saturday}</li>
              </ul>
              <a
                href={BUSINESS.geo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                عرض على خرائط Google
              </a>
            </section>

            <section className="text-center bg-carpet-gold p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-white mb-6">تواصل مع المحل</h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={BUSINESS.phone.telLink}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  اتصل الآن
                </a>
                <a
                  href={BUSINESS.phone.whatsappLink}
                  className="bg-white text-carpet-gold px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  تواصل معنا عبر الواتساب
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
