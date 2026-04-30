import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getContainerById } from "@/data/containers";
import ContainerSection from "@/components/ui/ContainerSection";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: "موكيت وسجاد الرياض — تشكيلة فاخرة بتركيب مجاني",
  description: "اكتشف أحدث تشكيلات الموكيت والسجاد الفاخر في الرياض من العمودي للمفروشات. توصيل وتركيب مجاني، ضمان الجودة.",
  keywords: ["موكيت", "سجاد", "موكيت الرياض", "سجاد الرياض", "موكيت مساجد", "موكيت تركي", "موكيت مشجر"],
  alternates: { canonical: "/carpets" },
  openGraph: {
    title: "موكيت وسجاد الرياض — تشكيلة فاخرة | العمودي للمفروشات",
    description: "أحدث تشكيلات الموكيت والسجاد الفاخر بأفضل الأسعار في الرياض. توصيل وتركيب مجاني.",
    type: "website",
    url: `${baseUrl}/carpets`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/carpets.jpg", width: 1200, height: 630, alt: "تشكيلة الموكيت والسجاد - العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "موكيت وسجاد الرياض — العمودي للمفروشات",
    description: "أحدث تشكيلات الموكيت والسجاد الفاخر بأفضل الأسعار في الرياض.",
    images: ["/og/carpets.jpg"],
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
