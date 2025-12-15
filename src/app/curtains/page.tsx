import { Metadata } from "next";
import ContainerSection from "@/components/ui/ContainerSection";
import { containerSections } from "@/data/containers";

export const metadata: Metadata = {
  title: "ستائر الرياض - العمودي للمفروشات",
  description:
    "تشكيلة متنوعة من ستائر الرياض الأنيقة لجميع المساحات، مع إمكانية تنسيق الستائر مع سجاد الرياض وموكيت الرياض ومختلف المفروشات المنزلية.",
  keywords: [
    "ستائر",
    "ستائر معتمة",
    "ستائر شيفون",
    "ستائر ذكية",
    "ستائر عازلة",
    "ديكور النوافذ",
    "ستائر الرياض",
    "مفروشات الرياض",
    "سجاد الرياض",
    "موكيت الرياض"
  ],
  openGraph: {
    title: "الستائر - العمودي للمفروشات",
    description: "تشكيلة راقية من الستائر لإضافة الأناقة والخصوصية لمنزلك",
    type: "website",
  },
};

export default function CurtainsPage() {
  // Get curtains section
  const curtainsSection = containerSections.find(section => section.id === "curtains-collection");

  if (!curtainsSection) {
    return (
      <div className="min-h-screen bg-custom-background pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            عذراً، لم نتمكن من العثور على منتجات الستائر
          </h1>
          <p className="text-gray-600">يرجى المحاولة لاحقاً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-background pt-20">
      {/* Hero Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          ستائر أنيقة لكل مساحة
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          اكتشف مجموعتنا المتميزة من الستائر التي تجمع بين الأناقة والوظائف العملية. 
          من الستائر المعتمة للخصوصية إلى الستائر الذكية بأحدث التقنيات، 
          نوفر لك الحل المثالي لكل نافذة في منزلك أو مكتبك
        </p>
        <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
      </section>

      {/* Products Section */}
      <ContainerSection 
        section={curtainsSection}
        className="pb-12"
        gridCols="md:grid-cols-2 lg:grid-cols-3"
        mobileCols="grid-cols-1"
      />

      {/* Features Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            مميزات ستائرنا الحصرية
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">تركيب احترافي</h3>
              <p className="text-gray-600 text-sm">فريق متخصص لتركيب مثالي</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">عازلة للحرارة</h3>
              <p className="text-gray-600 text-sm">توفير في فاتورة التكييف</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">تحكم ذكي</h3>
              <p className="text-gray-600 text-sm">ريموت كنترول وتطبيق ذكي</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">جودة عالية</h3>
              <p className="text-gray-600 text-sm">خامات مستوردة فاخرة</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            هل تحتاج استشارة مجانية؟
          </h2>
          <p className="text-gray-600 mb-6">
            فريقنا المتخصص جاهز لمساعدتك في اختيار الستائر المناسبة لمساحتك
          </p>
          <a 
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            اتصل بنا الآن
          </a>
        </div>
      </section>
    </div>
  );
} 