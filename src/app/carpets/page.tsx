import { Metadata } from "next";
import ContainerSection from "@/components/ui/ContainerSection";
import { containerSections } from "@/data/containers";

export const metadata: Metadata = {
  title: "السجاد - بيت السجاد",
  description: "اكتشف مجموعتنا الواسعة من السجاد والموكيت عالي الجودة. تشكيلة متنوعة تناسب جميع الاحتياجات والمساحات.",
  keywords: ["السجاد", "موكيت", "أرضيات", "فرش منزلي", "سجاد تقليدي", "موكيت عصري"],
  openGraph: {
    title: "السجاد - بيت السجاد",
    description: "مجموعة متميزة من السجاد والموكيت لجميع الاحتياجات والمساحات",
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