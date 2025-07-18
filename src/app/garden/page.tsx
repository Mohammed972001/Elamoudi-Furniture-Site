import { Metadata } from "next";
import ContainerSection from "@/components/ui/ContainerSection";
import { containerSections } from "@/data/containers";

export const metadata: Metadata = {
  title: "تنسيق الحدائق - بيت السجاد",
  description: "خدمات تنسيق حدائق احترافية. حوّل حديقتك إلى واحة خضراء جميلة مع شلالات ونوافير ونباتات طبيعية منسقة.",
  keywords: ["تنسيق حدائق", "تصميم حدائق", "شلالات", "نوافير", "نباتات طبيعية", "حدائق منزلية"],
  openGraph: {
    title: "تنسيق الحدائق - بيت السجاد",
    description: "خدمات تنسيق حدائق احترافية لحديقة أحلامك",
    type: "website",
  },
};

export default function GardenPage() {
  // Get garden section 
  const gardenSection = containerSections.find(section => section.id === "garden-services");

  if (!gardenSection) {
    return (
      <div className="min-h-screen bg-custom-background pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            عذراً، لم نتمكن من العثور على خدمات تنسيق الحدائق
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
          تنسيق الحدائق المتميز
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          حوّل حديقتك إلى واحة خضراء ساحرة مع خدماتنا الاحترافية في تنسيق الحدائق. 
          من التصميم والتنفيذ إلى الشلالات والنوافير والنباتات الطبيعية المنسقة، 
          نضفي الحياة والجمال على مساحتك الخارجية
        </p>
        <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
      </section>

      {/* Services Section */}
      <ContainerSection 
        section={gardenSection}
        className="pb-12"
        gridCols="md:grid-cols-2 lg:grid-cols-3"
        mobileCols="grid-cols-1"
      />

      {/* Additional Info Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            لماذا تختار خدماتنا؟
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">خبرة احترافية</h3>
              <p className="text-gray-600">فريق متخصص في تنسيق الحدائق مع سنوات من الخبرة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">أنظمة ري متطورة</h3>
              <p className="text-gray-600">نظم ري أوتوماتيكية حديثة لضمان نمو النباتات</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">ضمان الجودة</h3>
              <p className="text-gray-600">ضمان على التنفيذ والنباتات مع صيانة دورية</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 