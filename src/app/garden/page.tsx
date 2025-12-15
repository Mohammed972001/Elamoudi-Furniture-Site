import { Metadata } from "next";
import GardenClient from "./GardenClient";

export const metadata: Metadata = {
  title: "تنسيق حدائق الرياض - العمودي للمفروشات",
  description:
    "خدمات تنسيق حدائق احترافية في الرياض مع إمكانية تنسيق المساحات الخارجية مع السجاد والموكيت والمفروشات، لتكامل تصميم المنزل الداخلي والخارجي.",
  keywords: [
    "تنسيق حدائق",
    "تصميم حدائق",
    "شلالات",
    "نوافير",
    "نباتات طبيعية",
    "حدائق منزلية",
    "تنسيق حدائق الرياض",
    "حدائق في الرياض",
    "مفروشات الرياض",
    "سجاد الرياض",
    "موكيت الرياض"
  ],
  openGraph: {
    title: "تنسيق الحدائق - العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية لحديقة أحلامك",
    type: "website",
  },
};

export default function GardenPage() {
  return <GardenClient />;
} 