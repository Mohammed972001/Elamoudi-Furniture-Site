import { Metadata } from "next";
import KitchensClient from "./KitchensClient";


export const metadata: Metadata = {
  title: "مطابخ الرياض - العمودي للمفروشات",
  description:
    "اكتشف مجموعتنا المتميزة من المطابخ العالمية في الرياض بتصميمات عصرية وخامات فاخرة، مع إمكانية تنسيق المطابخ مع سجاد الرياض وموكيت الرياض ومفروشات المنزل.",
  keywords: [
    "مطابخ",
    "مطابخ عالمية",
    "أثاث مطابخ",
    "تصميم مطابخ",
    "خامات فاخرة",
    "مطابخ عصرية",
    "مطابخ الرياض",
    "مفروشات الرياض",
    "سجاد الرياض",
    "موكيت الرياض"
  ],
  openGraph: {
    title: "المطابخ - العمودي للمفروشات",
    description: "مطابخ عالمية بتصميمات عصرية وخامات فاخرة تجمع بين الجمال والعملية",
    type: "website",
  },
};

export default function KitchensPage() {
  return <KitchensClient />;
}
