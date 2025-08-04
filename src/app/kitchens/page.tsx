import { Metadata } from "next";
import KitchensClient from "./KitchensClient";


export const metadata: Metadata = {
  title: "المطابخ - العمودي للمفروشات",
  description: "اكتشف مجموعتنا المتميزة من المطابخ العالمية بتصميمات عصرية وخامات فاخرة. مطابخ عالمية وأثاث مطابخ فاخر.",
  keywords: ["مطابخ", "مطابخ عالمية", "أثاث مطابخ", "تصميم مطابخ", "خامات فاخرة", "مطابخ عصرية"],
  openGraph: {
    title: "المطابخ - العمودي للمفروشات",
    description: "مطابخ عالمية بتصميمات عصرية وخامات فاخرة تجمع بين الجمال والعملية",
    type: "website",
  },
};

export default function KitchensPage() {
  return <KitchensClient />;
}
