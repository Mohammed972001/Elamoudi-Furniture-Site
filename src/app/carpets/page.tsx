import { Metadata } from "next";
import ContainerSection from "@/components/ui/ContainerSection";
import { containerSections } from "@/data/containers";

export const metadata: Metadata = {
  title: "سجاد الرياض وموكيت الرياض - العمودي للمفروشات",
  description:
    "اكتشف أفضل سجاد الرياض وموكيت الرياض، بما في ذلك موكيت مساجد وسجاد مساجد في الرياض. تشكيلة واسعة من السجاد والموكيت عالي الجودة لجميع المساحات والمفروشات في الرياض.",
  keywords: [
    "السجاد",
    "موكيت",
    "أرضيات",
    "فرش منزلي",
    "سجاد تقليدي",
    "موكيت عصري",
    "سجاد الرياض",
    "سجاد في الرياض",
    "موكيت الرياض",
    "موكيت في الرياض",
    "موكيت ومفروشات في الرياض",
    "مفروشات الرياض",
    "موكيت مساجد",
    "سجاد مساجد في الرياض",
    "سجاد مساجد الرياض"
  ],
  openGraph: {
  title: "سجاد الرياض وموكيت الرياض - العمودي للمفروشات",
  description: "سجاد وموكيت عالي الجودة في الرياض، بما في ذلك سجاد المساجد وموكيت المساجد ومجموعة واسعة لمختلف المساحات.",
    type: "website",
  },
};

export default function CarpetsPage() {
  // Get carpets section (first section in containerSections)
  const carpetsSection = containerSections.find(section => section.id === "categorys-main");

  if (!carpetsSection) {
    return (
      <div className="min-h-screen bg-custom-background pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            عذراً، لم نتمكن من العثور على منتجات السجاد
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
          مجموعة السجاد المتميزة
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          اكتشف تشكيلتنا الواسعة من السجاد والموكيت عالي الجودة، من التصميمات التقليدية إلى العصرية، 
          لتناسب جميع الأذواق والمساحات وتضفي الدفء والأناقة على منزلك
        </p>
        <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
      </section>

      {/* Products Section */}
      <ContainerSection 
        section={carpetsSection}
        className="pb-12"
        gridCols="md:grid-cols-3 lg:grid-cols-4"
        mobileCols="grid-cols-2"
      />
    </div>
  );
} 