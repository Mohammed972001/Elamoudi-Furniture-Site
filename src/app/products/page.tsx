import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { containerSections } from "@/data/containers";
import ContainerSection from "@/components/ui/ContainerSection";

export const metadata: Metadata = {
  title: "المنتجات | العمودي للمفروشات",
  description: "تصفح جميع منتجات العمودي للمفروشات من سجاد وديكور وأثاث منزلي بجودة عالية وتصاميم عصرية.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات" }
  ];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">جميع المنتجات</h1>
          <p className="text-xl text-gray-600">تصفح تشكيلتنا الواسعة من المفروشات والديكورات</p>
        </div>
        {containerSections.map((section) => (
          <ContainerSection
            key={section.id}
            section={section}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        ))}
      </div>
    </div>
  );
}
