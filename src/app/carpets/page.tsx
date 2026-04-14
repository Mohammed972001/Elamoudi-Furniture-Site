import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getContainerById } from "@/data/containers";
import ContainerSection from "@/components/ui/ContainerSection";

export const metadata: Metadata = {
  title: "تشكيلة السجاد | العمودي للمفروشات",
  description: "اكتشف أحدث تشكيلات السجاد الفاخر من العمودي للمفروشات. تصاميم متنوعة تناسب كل الأذواق.",
  alternates: {
    canonical: "/carpets",
  },
};

export default function CarpetsPage() {
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "السجاد" }
  ];

  const rawSection = getContainerById("categorys-main");
  // Clone to avoid mutating the exported constant
  const carpetsSection = rawSection ? { ...rawSection, title: "تشكيلة السجاد والموكيت" } : null;

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">السجاد والموكيت</h1>
          <p className="text-xl text-gray-600">اكتشف أحدث تشكيلات السجاد الفاخر</p>
        </div>
        {carpetsSection ? (
          <ContainerSection
            section={carpetsSection}
            className="mb-16"
            mobileCols="grid-cols-2"
          />
        ) : null}
      </div>
    </div>
  );
}
