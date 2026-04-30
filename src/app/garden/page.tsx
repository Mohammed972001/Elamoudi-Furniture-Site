import { Metadata } from "next";
import GardenClient from "./GardenClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

export const metadata: Metadata = {
  title: "تنسيق حدائق الرياض — عشب صناعي وشلالات ونوافير",
  description: "خدمات تنسيق حدائق احترافية في الرياض. عشب صناعي، شلالات، نوافير ونباتات منسقة بأيدي خبراء.",
  keywords: ["تنسيق حدائق", "تصميم حدائق", "شلالات", "نوافير", "نباتات طبيعية", "حدائق منزلية", "تنسيق حدائق الرياض"],
  alternates: { canonical: "/garden" },
  openGraph: {
    title: "تنسيق حدائق الرياض — عشب صناعي وشلالات | العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية في الرياض. عشب صناعي، شلالات، نوافير ونباتات منسقة بأيدي خبراء.",
    type: "website",
    url: `${baseUrl}/garden`,
    locale: "ar_SA",
    siteName: "العمودي للمفروشات",
    images: [{ url: "/og/garden.jpg", width: 1200, height: 630, alt: "تنسيق الحدائق - العمودي للمفروشات" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تنسيق حدائق الرياض — العمودي للمفروشات",
    description: "خدمات تنسيق حدائق احترافية لحديقة أحلامك.",
    images: ["/og/garden.jpg"],
  },
};

export default function GardenPage() {
  return <GardenClient />;
} 