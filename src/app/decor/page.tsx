import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getContainerById } from "@/data/containers";
import ContainerSection from "@/components/ui/ContainerSection";

export const metadata: Metadata = {
  title: "الديكور | العمودي للمفروشات",
  description: "تسوق أفضل قطع الديكور والإكسسوارات المنزلية من العمودي للمفروشات لضمان الفخامة والأناقة في منزلك.",
  alternates: {
    canonical: "/decor",
  },
};

export default function DecorPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "الديكور" }
  ];

  const curtains = getContainerById("curtains-collection");
  const garden = getContainerById("garden-services");

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الديكور والإكسسوارات</h1>
          <p className="text-xl text-gray-600">تسوق أفضل قطع الديكور وأضف لمسة جمالية لمنزلك</p>
        </div>
        {curtains && (
          <ContainerSection
            section={curtains}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        )}
        {garden && (
          <ContainerSection
            section={garden}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        )}
      </div>
    </div>
  );
}
