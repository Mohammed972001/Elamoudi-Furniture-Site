import { ContainerSection } from "@/types";

export const containerSections: ContainerSection[] = [
  {
    id: "categorys-main",
    title: "فئات الموكيت والمفروشات",
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
        id: "turky-mshager",
        name: "تركي مشجر",
        image: "/turky mshager/WhatsApp Image 2025-08-02 at 6.36.14 PM (1).jpeg",
        href: "/products/turky-mshager",
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
    id: "rubber-flooring",
    title: "أرضيات مطاطية (ربل)",
    items: [
      {
        id: "gym-rubber",
        name: "ربل جيم وصالات رياضية",
        image: "/rubber/gym-1.jpg",
        href: "/products/gym-rubber",
      },
      {
        id: "horse-rubber",
        name: "ربل خيل وإسطبلات",
        image: "/rubber/horse-1.jpg",
        href: "/products/horse-rubber",
      },
      {
        id: "bathroom-rubber",
        name: "ربل حمامات مانع للانزلاق",
        image: "/rubber/bath-1.jpg",
        href: "/products/bathroom-rubber",
      },
    ]
  },
  {
    id: "curtains-collection",
    title: "ستائر أنيقة لجميع المساحات",
    items: [
      {
        // One real photo for the whole range: the shop has no photo per curtain type yet.
        id: "curtains",
        name: "ستائر للبيوت والمكاتب",
        image: "/furniture/curtains-a.jpg",
        href: "/products/curtains",
        description: "تواصل معنا لمعرفة أنواع الستائر وألوانها المتاحة، وأرسل مقاسات النوافذ على الواتساب."
      }
    ]
  }
,
  {
    id: "home-furniture",
    title: "كنب ومجالس وستائر",
    items: [
      {
        // The owner's own photos and videos (2026-11-09). Bedrooms get a card once their photos arrive.
        id: "modern-sofas",
        name: "كنب مودرن وزاوية",
        image: "/furniture/sofa-set-grey-a.jpg",
        href: "/products/modern-sofas",
        description: "أطقم كنب مودرن وكنب زاوية للصالات والمجالس."
      },
      {
        id: "classic-majlis",
        name: "مجالس كلاسيك",
        image: "/furniture/majlis-classic-grey-b.jpg",
        href: "/products/classic-majlis",
        description: "كنب وكراسي بإطارات خشب، ومجالس بيج."
      },
      {
        id: "curtains-home",
        name: "ستائر",
        image: "/furniture/curtains-a.jpg",
        href: "/products/curtains",
        description: "ستائر للمجالس وغرف النوم، والقياس مجانًا داخل الرياض."
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