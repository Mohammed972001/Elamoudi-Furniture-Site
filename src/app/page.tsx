import HeroSection from "@/components/hero/HeroSection";
import Iconcomponanet from "@/components/hero/iconcomponanet";
import ContainerSection from "@/components/ui/ContainerSection";
import { containerSections } from "@/data/containers";
import HeroContainer from "@/components/ui/HeroContainer";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <HeroSection />
      <Iconcomponanet />

      {/* Display Container Sections */}
      {containerSections.slice(0, 1).map((section) => (
        <ContainerSection 
          key={section.id} 
          section={section}
          className=""
          mobileCols="grid-cols-2"
        />
      ))}
      <HeroContainer
  title="ستائر تضيف الأناقة... وتمنحك الخصوصية"
  description="حوّل أجواء منزلك بلمسة من الفخامة مع تشكيلتنا المختارة من الستائر المصمّمة بعناية لتناسب مختلف الأذواق والمساحات."
  buttonText="تسوق الآن"
  buttonHref="/products/mokite"
  image="/home/staar.png"
  imageAlt="موكيت عالي الجودة"
  backgroundColor="bg-[#EAE4D8]"
  textColor="text-black"
/>
      {containerSections.slice(1, 2).map((section) => (
        <ContainerSection 
          key={section.id} 
          section={section}
          className=""
        />
      ))}

<HeroContainer
  title="موكيت يغطي المساحة... ويمنحك الراحة"
  description="أضف لمسة من الدفء والهدوء إلى منزلك مع تشكيلتنا المميزة من الموكيت، تصاميم تناسب كل الأذواق والمساحات."
  buttonText=" عرض المنتجات"
  buttonHref="/products/mokite"
  image="/home/mokite.png"
  imageAlt="موكيت عالي الجودة"
  backgroundColor="bg-[#D2E0D4]"
  textColor="text-black"
  
/>
    </main>
  );
}
