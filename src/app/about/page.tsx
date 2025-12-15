import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'معلومات عنا - العمودي للمفروشات الرياض للسجاد والموكيت',
  description: 'تعرف على العمودي للمفروشات في الرياض، المتخصص في سجاد الرياض، موكيت الرياض، موكيت مساجد وسجاد مساجد في الرياض، مع تشكيلة كبيرة من المفروشات والأرضيات المنزلية.',
  keywords: [
    'معلومات عن العمودي للمفروشات',
    'شركة الأرضيات والمفروشات',
    'موكيت وسجاد فاخر',
    'باركيه وفينيل',
    'مفروشات منزلية',
    'تصاميم عصرية',
    'جودة عالية',
    'الرياض',
    'سجاد الرياض',
    'سجاد في الرياض',
    'موكيت الرياض',
    'موكيت في الرياض',
    'موكيت ومفروشات في الرياض',
    'مفروشات الرياض',
    'موكيت مساجد',
    'سجاد مساجد في الرياض'
  ],
  openGraph: {
    title: 'معلومات عنا - العمودي للمفروشات الرياض للسجاد والموكيت',
    description: 'العمودي للمفروشات في الرياض يقدم سجاد وموكيت ومفروشات منزلية، بالإضافة إلى موكيت مساجد وسجاد مساجد في الرياض بجودة عالية وأسعار مناسبة.',
    type: 'website',
    locale: 'ar_SA',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  // Structured Data for About Page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'العمودي للمفروشات - للأرضيات والمفروشات',
      description: 'شركة رائدة في مجال الأرضيات والمفروشات المنزلية تقدم تشكيلة متنوعة تلبي مختلف الأذواق',
      telephone: '+966575108287',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SA',
        addressLocality: 'الرياض',
      },
      foundingDate: '2020',
      industry: 'أرضيات ومفروشات',
      areaServed: 'المملكة العربية السعودية',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-custom-background pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              معلومات عنا
            </h1>
           
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-right" dir="rtl">
            {/* About Section */}
            <section className="mb-12">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                يعد العمودي للمفروشات من الشركات الرائدة في مجال الأرضيات والمفروشات المنزلية، حيث توفر تشكيلة متنوعة تلبي مختلف الأذواق. منذ تأسيسها، حرصت على تقديم أحدث التصاميم بأعلى معايير الجودة، مما جعلها الخيار الأول للكثير من العملاء. من خلال الابتكار المستمر، تسعى الشركة إلى توفير حلول عملية تضفي لمسة من الأناقة والراحة على جميع المساحات.
              </p>
            </section>

            {/* Vision & Mission */}
            <section className="mb-12 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-primary mb-6">رؤيتنا ورسالتنا</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                في العالمية للأرضيات والمفروشات، نؤمن بأن اختيار الأرضيات والمفروشات المناسبة يُحدث فرقًا كبيرًا في جمال وأناقة أي مكان. لذلك، نلتزم بتقديم منتجات ذات جودة عالية بأسعار تنافسية. علاوة على ذلك، نهدف إلى تحسين تجربة عملائنا من خلال تقديم خدمات استشارية تساعدهم في اتخاذ أفضل القرارات وفقًا لاحتياجاتهم.
              </p>
            </section>

            {/* Products Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">منتجاتنا</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                تضم مجموعتنا تشكيلة واسعة من المنتجات التي تناسب جميع الأنماط والاحتياجات. من بين هذه المنتجات:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <span className="text-green-600 text-xl ml-3">✅</span>
                    <h3 className="text-xl font-semibold text-gray-800">الموكيت العصري</h3>
                  </div>
                  <p className="text-gray-600">
                    يتوفر بتصاميم عصرية وألوان تناسب مختلف الديكورات.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <span className="text-green-600 text-xl ml-3">✅</span>
                    <h3 className="text-xl font-semibold text-gray-800">السجاد الفاخر</h3>
                  </div>
                  <p className="text-gray-600">
                    يضفي لمسة من الفخامة على أي مساحة.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <span className="text-green-600 text-xl ml-3">✅</span>
                    <h3 className="text-xl font-semibold text-gray-800">الأرضيات الخشبية (الباركيه)</h3>
                  </div>
                  <p className="text-gray-600">
                    تمنح شعورًا بالدفء والأناقة.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <span className="text-green-600 text-xl ml-3">✅</span>
                    <h3 className="text-xl font-semibold text-gray-800">أرضيات الفينيل</h3>
                  </div>
                  <p className="text-gray-600">
                    معروفة بمتانتها وسهولة صيانتها، مما يجعلها خيارًا عمليًا.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                  <div className="flex items-center mb-4">
                    <span className="text-green-600 text-xl ml-3">✅</span>
                    <h3 className="text-xl font-semibold text-gray-800">المفروشات المنزلية</h3>
                  </div>
                  <p className="text-gray-600">
                    تأتي بألوان وأقمشة متنوعة تناسب مختلف الأذواق.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="mb-12 bg-primary text-white p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">لماذا تختارنا؟</h2>
              <p className="text-lg leading-relaxed mb-6">
                نتميز بعدة عوامل تجعلنا الخيار الأمثل لعملائنا، ومنها:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <span className="text-carpet-gold text-xl ml-3">🔹</span>
                  <div>
                    <h3 className="font-semibold mb-2">الجودة العالية</h3>
                    <p>نحرص على اختيار أفضل الخامات لضمان المتانة والراحة.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-carpet-gold text-xl ml-3">🔹</span>
                  <div>
                    <h3 className="font-semibold mb-2">الأسعار التنافسية</h3>
                    <p>تجعل منتجاتنا في متناول الجميع دون المساس بالجودة.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-carpet-gold text-xl ml-3">🔹</span>
                  <div>
                    <h3 className="font-semibold mb-2">تنوع التصاميم</h3>
                    <p>لتناسب مختلف الديكورات، سواء الكلاسيكية أو العصرية.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-carpet-gold text-xl ml-3">🔹</span>
                  <div>
                    <h3 className="font-semibold mb-2">الخدمة الممتازة</h3>
                    <p>يقدمها فريقنا المتخصص لمساعدة العملاء في اختيار الأنسب لهم.</p>
                  </div>
                </div>

                <div className="flex items-start md:col-span-2">
                  <span className="text-carpet-gold text-xl ml-3">🔹</span>
                  <div>
                    <h3 className="font-semibold mb-2">التركيب الاحترافي</h3>
                    <p>لضمان تنفيذ دقيق يحقق أفضل النتائج.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Commitment */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">التزامنا تجاه العملاء</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                نضع رضا العملاء في مقدمة أولوياتنا، لذا نحرص على تقديم تجربة تسوق سلسة ومريحة. بالإضافة إلى ذلك، نقوم بتحديث تشكيلتنا باستمرار لمواكبة أحدث الاتجاهات في عالم الديكور، مما يمنح عملاءنا خيارات متعددة تناسب جميع الأذواق والميزانيات.
              </p>
            </section>

            {/* Call to Action */}
            <section className="text-center bg-carpet-gold p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-white mb-4">
                📍 زورونا اليوم واكتشفوا التميز مع العالمية للأرضيات والمفروشات
              </h2>
              <p className="text-xl text-white mb-6">
                حيث يلتقي الجمال بالجودة! مفروشات الرياض
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/966575108287?text=مرحباً، أريد الاستفسار عن منتجاتكم"
                  className="bg-white text-carpet-gold px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  تواصل معنا عبر الواتساب
                </a>
                <Link
                  href="/"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  تصفح منتجاتنا
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
} 