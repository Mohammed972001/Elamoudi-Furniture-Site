import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اتصل بنا - العمودي للمفروشات بالرياض للسجاد والموكيت',
  description: 'تواصل مع العمودي للمفروشات في الرياض للاستفسار عن سجاد الرياض، موكيت الرياض، موكيت مساجد وسجاد مساجد في الرياض، بالإضافة إلى جميع أنواع المفروشات والأرضيات. نحن في خدمتك عبر الواتساب أو زيارة معرضنا في الرياض.',
  keywords: [
    'اتصل بالعمودي للمفروشات',
    'تواصل معنا',
    'رقم العمودي للمفروشات',
    'عنوان العمودي للمفروشات الرياض',
    'واتساب العمودي للمفروشات',
    'خدمة العملاء',
    'معرض السجاد الرياض',
    'سجاد الرياض',
    'سجاد في الرياض',
    'موكيت الرياض',
    'موكيت في الرياض',
    'موكيت ومفروشات في الرياض',
    'مفروشات الرياض',
    'موكيت مساجد',
    'سجاد مساجد في الرياض',
    'سجاد مساجد الرياض'
  ],
  openGraph: {
    title: 'اتصل بنا - العمودي للمفروشات بالرياض للسجاد والموكيت',
    description: 'تواصل مع العمودي للمفروشات في الرياض للاستفسار عن السجاد والموكيت وموكيت المساجد وسجاد المساجد في الرياض وخدمات المفروشات المتكاملة.',
    type: 'website',
    locale: 'ar_SA',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  // Structured Data for Contact Page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'العمودي للمفروشات -  للأرضيات والمفروشات',
      telephone: '+966575108287',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'طريق الملك فهد',
        addressLocality: 'الرياض',
        addressRegion: 'الرياض',
        postalCode: '12345',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.597427,
        longitude: 46.730596,
      },
      openingHours: [
        'Mo-Th 09:00-22:00',
        'Fr 14:00-22:00',
        'Sa-Su 09:00-22:00'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+966575108287',
        contactType: 'customer service',
        availableLanguage: ['Arabic'],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-custom-background pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              اتصل بنا
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نحن في خدمتك! تواصل معنا للاستفسار عن منتجاتنا أو لطلب استشارة مجانية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* WhatsApp Contact */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center ml-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">واتساب</h3>
                    <p className="text-gray-600">التواصل المباشر والسريع</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold text-lg" dir="ltr">+966 56 774 6257</p>
                      <p className="text-gray-600 text-sm">متاح 24/7</p>
                    </div>
                    <a
                      href="https://wa.me/966575108287?text=مرحباً، أريد الاستفسار عن منتجاتكم"
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      ابدأ المحادثة
                    </a>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">خدماتنا</h3>
                <div className="grid grid-cols-1 gap-4">
                  <a
                    href="https://wa.me/966575108287?text=مرحباً، أحتاج مساعدة في خدمة العملاء"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">خدمة العملاء</h4>
                      <p className="text-gray-600 text-sm">استفسارات عامة ومساعدة</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/966575108287?text=مرحباً، أريد طلب زيارة مندوب"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ml-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">طلب مندوب</h4>
                      <p className="text-gray-600 text-sm">زيارة منزلية للاستشارة والقياس</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/966575108287?text=مرحباً، أريد الاستفسار عن الأسعار"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center ml-4">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">استفسار عن الأسعار</h4>
                      <p className="text-gray-600 text-sm">احصل على عروض أسعار مخصصة</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Store Information */}
            <div className="space-y-8">
              {/* Store Location */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center ml-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">موقع المعرض</h3>
                    <p className="text-gray-600">زورونا في معرضنا بالرياض</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">العنوان</h4>
                    <p className="text-gray-700">
                      حي العزيزية، شارع عبدالله بن صالح، الرياض، المملكة العربية السعودية
                    </p>

                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">ساعات العمل</h4>
                    <div className="space-y-1 text-gray-700">
                      <p>الأحد - الخميس: 9:00 ص - 10:00 م</p>
                      <p>الجمعة: 2:00 م - 10:00 م</p>
                      <p>السبت: 9:00 ص - 10:00 م</p>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=24.597427,46.730596"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    عرض على خرائط Google
                  </a>

                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-primary text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">لماذا تختار العمودي للمفروشات؟</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-carpet-gold text-xl ml-3">✨</span>
                    <span>جودة عالية وأسعار تنافسية</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-carpet-gold text-xl ml-3">🚚</span>
                    <span>توصيل مجاني لجميع أنحاء الرياض</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-carpet-gold text-xl ml-3">👨‍🔧</span>
                    <span>تركيب احترافي وضمان على الخدمة</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-carpet-gold text-xl ml-3">💬</span>
                    <span>استشارة مجانية من خبراء الديكور</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-carpet-gold text-xl ml-3">🔄</span>
                    <span>إمكانية الاستبدال والإرجاع</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-carpet-gold p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">
              نحن في انتظارك!
            </h2>
            <p className="text-xl text-white mb-6">
              تواصل معنا الآن واحصل على أفضل العروض والخدمات
            </p>

            <a
              href="https://wa.me/966575108287?text=مرحباً، أريد الاستفسار عن منتجاتكم"
              className="inline-flex items-center bg-white text-carpet-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
              </svg>
              تواصل عبر الواتساب
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 