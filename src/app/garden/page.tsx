import { Metadata } from "next";
import GardenClient from "./GardenClient";

export const metadata: Metadata = {
  title: "تنسيق الحدائق - العمودي للمفروشات",
  description: "خدمات تنسيق حدائق احترافية. حوّل حديقتك إلى واحة خضراء جميلة مع شلالات ونوافير ونباتات طبيعية منسقة.",
  keywords: ["تنسيق حدائق", "تصميم حدائق", "شلالات", "نوافير", "نباتات طبيعية", "حدائق منزلية", "تنسيق حدائق الرياض"],
  alternates: {
    canonical: "/garden",
  },
  openGraph: {
    title: "تنسيق الحدائق - العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية لحديقة أحلامك",
    type: "website",
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
  },
  twitter: {
    card: "summary_large_image",
    title: "تنسيق الحدائق - العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية لحديقة أحلامك",
  },
};

export default function GardenPage() {
  return <GardenClient />;
} 