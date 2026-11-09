import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaWhatsapp } from 'react-icons/fa';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQ from '@/components/seo/FAQ';
import VideoCard from '@/components/ui/VideoCard';
import { BUSINESS } from '@/constants/business';
import { pageOpenGraph } from '@/constants/openGraph';
import { getProductById } from '@/data/products';

/**
 * The furniture category: sofas, majlis sets and curtains, each with its own product page built from
 * the owner's photos and videos (2026-11-09), plus bedrooms, which have no photos yet and so only
 * ask for the models on WhatsApp.
 */

const TITLE = 'كنب ومجالس وستائر في الرياض';
const DESCRIPTION =
  'كنب مودرن وكنب زاوية ومجالس كلاسيك وستائر وغرف نوم من العمودي للمفروشات في حراج بن قاسم بالرياض. شاهد الموديلات بالصور والفيديو واطلب عرض السعر على الواتساب.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/furniture' },
  openGraph: pageOpenGraph('/furniture', TITLE, DESCRIPTION, [
    { url: '/furniture/sofa-set-grey-a.jpg', width: 464, height: 464, alt: 'طقم كنب رمادي' },
  ]),
};

const PRODUCTS = [
  { id: 'modern-sofas', name: 'كنب مودرن وكنب زاوية' },
  { id: 'classic-majlis', name: 'مجالس كلاسيك' },
  { id: 'curtains', name: 'ستائر' },
];

const VIDEOS = [
  { file: 'sofa-set-grey', title: 'طقم كنب رمادي مع كراسي وطاولات' },
  { file: 'corner-sofa-mint', title: 'كنب زاوية أخضر فاتح' },
  { file: 'majlis-classic-teal', title: 'مجالس كلاسيك تركوازي وبيج' },
  { file: 'majlis-classic-grey', title: 'مجلس كلاسيك رمادي' },
];

const STEPS = [
  'أرسل مقاس المكان وصورته على الواتساب، أو اتصل بنا.',
  'نرسل لك الموديلات المتوفرة بالصور، أو زرنا في المعرض.',
  'يصلك عرض السعر، وتكلفة التوصيل حسب المكان.',
];

const FAQ_ITEMS = [
  {
    question: 'ماذا تبيعون من الأثاث؟',
    answer: 'نبيع الكنب المودرن والكنب الزاوية والمجالس الكلاسيك والستائر وغرف النوم، إلى جانب الموكيت والأرضيات.',
  },
  {
    question: 'كيف أعرف الموديلات المتوفرة وأسعارها؟',
    answer: 'أرسل مقاس المكان وصورته على الواتساب، ونرسل لك الموديلات المتوفرة بالصور وعرض السعر.',
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

const waLink = (text: string) =>
  `https://wa.me/${BUSINESS.phone.primary.replace('+', '')}?text=${encodeURIComponent(text)}`;

export default function FurniturePage() {
  return (
    <div className="pt-2 md:pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <Breadcrumbs items={[{ name: 'الرئيسية', href: '/' }, { name: 'كنب ومجالس وستائر' }]} />

      <header className="mt-6 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{TITLE}</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
          أطقم كنب ومجالس وستائر وغرف نوم من معرضنا في حراج بن قاسم. شاهد الموديلات، واطلب عرض السعر على الواتساب.
        </p>
        <div className="mx-auto mt-4 h-1 w-20 rounded bg-blue-600" />
      </header>

      <section aria-label="المنتجات" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map(({ id, name }) => {
          const product = getProductById(id);
          if (!product) return null;
          return (
            <Link
              key={id}
              href={`/products/${id}`}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.videos && (
                  <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                    {product.videos.length} فيديو
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">{name}</h2>
                <p className="mt-2 flex-1 text-gray-600 leading-relaxed">{product.description}</p>
                <span className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition-colors group-hover:bg-blue-700">
                  شاهد الموديلات
                </span>
              </div>
            </Link>
          );
        })}

        <div id="bedrooms" className="flex scroll-mt-24 flex-col overflow-hidden rounded-xl bg-white shadow-md">
          <div className="flex aspect-square flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600">
            <FaBed className="h-16 w-16" aria-hidden />
            <span className="text-sm font-medium">نرسل صور الموديلات على الواتساب</span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h2 className="text-xl font-bold text-gray-900">غرف نوم</h2>
            <p className="mt-2 flex-1 text-gray-600 leading-relaxed">
              غرف نوم كاملة. أرسل مقاس الغرفة لتصلك الموديلات المتوفرة بالصور وعرض السعر.
            </p>
            <a
              href={waLink('مرحباً، أريد صور موديلات غرف النوم المتوفرة')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 font-semibold text-white hover:bg-green-700"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden />
              اطلب صور الموديلات
            </a>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">شاهد الموديلات بالفيديو</h2>
          <div className="mx-auto h-1 w-20 rounded bg-blue-600" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {VIDEOS.map((v) => (
            <VideoCard key={v.file} file={v.file} title={v.title} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">كيف تطلب؟</h2>
          <div className="mx-auto h-1 w-20 rounded bg-blue-600" />
        </div>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-1.5 text-gray-700 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <a
            href={BUSINESS.phone.telLink}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
          >
            اتصال الآن
          </a>
          <a
            href={waLink('مرحباً، أريد الاستفسار عن الكنب والمجالس والستائر')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
          >
            اطلب عرض سعر على الواتساب
          </a>
        </div>
      </section>

      <div className="mt-16">
        <FAQ items={FAQ_ITEMS} title="أسئلة شائعة" />
      </div>
    </div>
  );
}
