import { Metadata } from "next";
import GardenClient from "./GardenClient";

export const metadata: Metadata = {
  title: "تنسيق الحدائق - العمودي للمفروشات",
  description: "خدمات تنسيق حدائق احترافية. حوّل حديقتك إلى واحة خضراء جميلة مع شلالات ونوافير ونباتات طبيعية منسقة.",
  keywords: ["تنسيق حدائق", "تصميم حدائق", "شلالات", "نوافير", "نباتات طبيعية", "حدائق منزلية"],
  openGraph: {
    title: "تنسيق الحدائق - العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية لحديقة أحلامك",
    type: "website",
  },
};

export default function GardenPage() {
  return <GardenClient />;
} 