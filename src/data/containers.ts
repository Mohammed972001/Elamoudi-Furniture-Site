import { ContainerSection } from "@/types";

export const containerSections: ContainerSection[] = [
  {
    id: "categorys-main",
    title: "فئات السجاد الرئيسية",
    items: [
      {
        id: "Mosque carpets",
        name: "موكيت مساجد",
        image: "/images/catg/msaged.jpg",
        href: "/products/mosque-carpets",
      },
      {
        id: "office-flooring",
        name: "ارضيات مكتبية",
        image: "/images/catg/mactbia.webp",
        href: "/products/office-flooring",
      },
      {
        id: "water-resistant-carpet",
        name: "باركيه ضد الماء",
        image: "/images/catg/spc.jpg",
        href: "/products/water-resistant-carpet",
      },
      {
        id: "artificial-grass",
        name: "العشب الصناعي",
        image: "/images/catg/grass.webp",
        href: "/products/artificial-grass",
      },
      {
        id: "vinyl-roll",
        name: "ارضيات فينيل رول",
        image: "/images/catg/vinyl-roll.jpg",
        href: "/products/vinyl-roll",
      },
      {
        id: "parket",
        name: "ارضيات  باركيه",
        image: "/images/catg/barqya.webp",
        href: "/products/parket",
      },
      {
        id: "mokite",
        name: "موكيت",
        image: "/images/catg/mokite.jpg",
        href: "/products/mokite",
      },
      {
        id: "hospital-flooring",
        name: "ارضيات مستيشفيات",
        image: "/images/catg/hospital.jpg",
        href: "/products/hospital-flooring",
      },
      {
        id: "vinyl-mosque",
        name: "فينيل مساجد",
        image: "/images/catg/vinylmsagd.webp",
        href: "/products/vinyl-mosque",
      },
    ]
    
  },
  {
    id: "garden-services",
    title: "حول حديقتك الي واحة جميلة",
    items: [
      {
        id: "garden-flooring",
        name: "تنسيق حدائق بتركيب احترافي",
        image: "/images/catg/garden.png",
        href: "/products/garden-flooring",
      },
      {
        id: "shlal",
        name: "شلالات ونوافير تنبض بالحياة",
        image: "/images/catg/shlal.png",
        href: "/products/shlal",
      },
      {
        id: "planets",
        name: "زرع منسق وجاهز للتزيين",
        image: "/images/catg/planets.png",
        href: "/products/planets",
      },
      
    ]
  },
  {
    id: "curtains-collection",
    title: "ستائر أنيقة لجميع المساحات",
    items: [
      {
        id: "blackout-curtains",
        name: "ستائر معتمة للخصوصية",
        image: "/images/catg/blackout-curtains.jpg",
        href: "/products/blackout-curtains",
        description: "ستائر معتمة عالية الجودة لحجب الضوء والحصول على الخصوصية التامة"
      },
      {
        id: "sheer-curtains",
        name: "ستائر شيفون شفافة",
        image: "/images/catg/sheer-curtains.jpg", 
        href: "/products/sheer-curtains",
        description: "ستائر شيفون أنيقة تسمح بمرور الضوء الطبيعي مع الحفاظ على الخصوصية"
      },
      {
        id: "thermal-curtains",
        name: "ستائر عازلة للحرارة",
        image: "/images/catg/thermal-curtains.jpg",
        href: "/products/thermal-curtains", 
        description: "ستائر متطورة تعزل الحرارة وتوفر في فاتورة التكييف"
      },
      {
        id: "decorative-curtains",
        name: "ستائر ديكورية فاخرة",
        image: "/images/catg/decorative-curtains.jpg",
        href: "/products/decorative-curtains",
        description: "ستائر بتصميمات فاخرة وزخارف جميلة لإضافة لمسة أناقة"
      },
      {
        id: "motorized-curtains",
        name: "ستائر ذكية بموتور",
        image: "/images/catg/motorized-curtains.jpg",
        href: "/products/motorized-curtains",
        description: "ستائر ذكية تعمل بالريموت كنترول أو الهاتف الذكي"
      },
      {
        id: "office-curtains",
        name: "ستائر مكتبية احترافية",
        image: "/images/catg/office-curtains.jpg",
        href: "/products/office-curtains",
        description: "ستائر أنيقة مناسبة لبيئة العمل والمكاتب الاحترافية"
      }
    ]
  }

];

export const getContainerById = (id: string): ContainerSection | undefined => {
  return containerSections.find(container => container.id === id);
};

export const getItemById = (itemId: string): ContainerSection['items'][0] | undefined => {
  for (const container of containerSections) {
    const item = container.items.find(item => item.id === itemId);
    if (item) return item;
  }
  return undefined;
}; 