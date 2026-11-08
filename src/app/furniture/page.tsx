import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQ from '@/components/seo/FAQ';
import { BUSINESS } from '@/constants/business';
import { pageOpenGraph } from '@/constants/openGraph';

/**
 * Sofas, bedrooms and curtains: lines the owner sells beside the flooring (owner via the agency,
 * 2026-11-04 and 2026-11-09). The photo and videos are the ones the owner sent on 2026-11-09.
 * Two videos he sent stay out: one carries another seller's phone number, and one shows people
 * who cannot be told apart. Bedrooms have no photos yet.
 */

const TITLE = 'كنب وغرف نوم وستائر في الرياض';
const DESCRIPTION =
  'كنب ومجالس وغرف نوم وستائر من العمودي للمفروشات في حراج بن قاسم بالرياض. شاهد نماذج الكنب بالصور والفيديو، وأرسل مقاس المكان على الواتساب ليصلك عرض السعر.';
const UPLOADED = '2026-11-09T12:00:00+03:00';

const VIDEOS = [
  { file: 'sofa-set-grey', title: 'طقم كنب رمادي مع كرسي مفرد وطاولات', seconds: 50 },
  { file: 'majlis-beige', title: 'مجلس كنب بيج بزاوية', seconds: 9 },
  { file: 'corner-sofa-mint', title: 'كنب زاوية بلون أخضر فاتح', seconds: 15 },
  { file: 'living-room-modern', title: 'كنب مودرن في صالة معيشة', seconds: 17 },
  { file: 'majlis-classic-teal', title: 'مجلس كلاسيك بكنب وكراسي', seconds: 12 },
  { file: 'majlis-classic-grey', title: 'مجلس كلاسيك رمادي', seconds: 9 },
  { file: 'sofa-set-beige', title: 'طقم كنب بيج', seconds: 28 },
  { file: 'armchairs-patterned', title: 'كراسي مفردة بقماش منقوش', seconds: 30 },
];

const FAQ_ITEMS = [
  {
    question: 'هل تبيعون الكنب وغرف النوم والستائر؟',
    answer: 'نعم، نبيع الكنب والمجالس وغرف النوم والستائر إلى جانب الأرضيات والموكيت. أرسل صورة المكان ومقاسه على الواتساب لتصلك الموديلات المتوفرة وعرض السعر.',
  },
  {
    question: 'هل المعاينة والقياس مجانًا؟',
    answer: 'نعم، المعاينة والقياس مجانًا داخل الرياض.',
  },
  {
    question: 'كم تكلفة التوصيل؟',
    answer: 'تكلفة التوصيل حسب المكان، ونوضّحها في عرض السعر.',
  },
  {
    question: 'أين المعرض؟',
    answer: `في ${BUSINESS.address.streetAddress}، ${BUSINESS.address.addressLocality}.`,
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/furniture' },
  openGraph: pageOpenGraph('/furniture', TITLE, DESCRIPTION, [
    { url: '/furniture/sofa-curved-grey.jpg', width: 736, height: 981, alt: 'كنب رمادي منحني' },
  ]),
};

const waLink = (text: string) =>
  `https://wa.me/${BUSINESS.phone.primary.replace('+', '')}?text=${encodeURIComponent(text)}`;

function Actions({ topic }: { topic: string }) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <a
        href={BUSINESS.phone.telLink}
        className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
      >
        اتصال الآن
      </a>
      <a
        href={waLink(`مرحباً، أريد الاستفسار عن ${topic}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
      >
        اطلب الموديلات والسعر على الواتساب
      </a>
    </div>
  );
}

export default function FurniturePage() {
  const base = BUSINESS.url;
  const videoSchema = {
    '@context': 'https://schema.org',
    '@graph': VIDEOS.map((v) => ({
      '@type': 'VideoObject',
      name: v.title,
      description: `${v.title} من العمودي للمفروشات بالرياض.`,
      thumbnailUrl: `${base}/furniture/${v.file}.jpg`,
      contentUrl: `${base}/furniture/${v.file}.mp4`,
      uploadDate: UPLOADED,
      duration: `PT${v.seconds}S`,
      publisher: { '@id': BUSINESS.id },
    })),
  };

  return (
    <div className="pt-2 md:pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <Breadcrumbs items={[{ name: 'الرئيسية', href: '/' }, { name: 'كنب وغرف نوم وستائر' }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{TITLE}</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          إلى جانب الأرضيات والموكيت، نبيع في العمودي للمفروشات الكنب والمجالس وغرف النوم والستائر. أرسل صورة
          المكان ومقاسه على الواتساب، ونرسل لك الموديلات المتوفرة وعرض السعر. المعاينة والقياس مجانًا داخل
          الرياض، وتكلفة التوصيل حسب المكان.
        </p>
        <nav className="mt-4 flex flex-wrap gap-3 text-sm font-semibold" aria-label="أقسام الصفحة">
          <a href="#sofas" className="rounded-full bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200">الكنب والمجالس</a>
          <a href="#bedrooms" className="rounded-full bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200">غرف النوم</a>
          <a href="#curtains" className="rounded-full bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200">الستائر</a>
        </nav>
      </header>

      <section id="sofas" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">الكنب والمجالس</h2>
        <p className="max-w-3xl text-gray-700 leading-relaxed">
          أطقم كنب للمجالس وصالات المعيشة، كلاسيك ومودرن، وكنب زاوية وكراسي مفردة. الصور والفيديوهات دي نماذج
          من الموديلات. أرسل مقاس المجلس على الواتساب لنرشّح لك الطقم المناسب.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <figure className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative aspect-[3/4]">
              <Image
                src="/furniture/sofa-curved-grey.jpg"
                alt="كنب رمادي منحني بثلاث مخدات"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <figcaption className="p-3 text-sm text-gray-700">كنب رمادي منحني</figcaption>
          </figure>
          {VIDEOS.map((v) => (
            <figure key={v.file} className="overflow-hidden rounded-lg bg-white shadow-sm">
              <video
                className="aspect-[3/4] w-full bg-black object-cover"
                src={`/furniture/${v.file}.mp4`}
                poster={`/furniture/${v.file}.jpg`}
                controls
                muted
                playsInline
                preload="none"
                aria-label={v.title}
              />
              <figcaption className="p-3 text-sm text-gray-700">{v.title}</figcaption>
            </figure>
          ))}
        </div>
        <Actions topic="الكنب والمجالس" />
      </section>

      <section id="bedrooms" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">غرف النوم</h2>
        <p className="max-w-3xl text-gray-700 leading-relaxed">
          نبيع غرف النوم أيضًا. أرسل مقاس الغرفة على الواتساب لتصلك الموديلات المتوفرة بالصور وعرض السعر، وإذا
          كنت تجهّز الغرفة كاملة فاسأل عن{' '}
          <Link href="/products/mokite" className="font-semibold text-primary hover:underline">موكيت غرف النوم</Link>{' '}
          و<Link href="/products/parket" className="font-semibold text-primary hover:underline">الباركيه</Link>.
        </p>
        <Actions topic="غرف النوم" />
      </section>

      <section id="curtains" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">الستائر</h2>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white shadow-sm">
            <Image
              src="/home/staar.png"
              alt="ستائر من العمودي للمفروشات"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed">
              ستائر للمجالس وغرف النوم والمعيشة والمكاتب. نقيس النوافذ مجانًا داخل الرياض، ونرسل لك الألوان
              المتوفرة وعرض السعر على الواتساب.
            </p>
            <Actions topic="الستائر" />
          </div>
        </div>
      </section>

      <div className="mt-14">
        <FAQ items={FAQ_ITEMS} title="أسئلة شائعة" />
      </div>
    </div>
  );
}
