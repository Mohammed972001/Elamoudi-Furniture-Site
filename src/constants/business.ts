/**
 * Single source of truth for all NAP data (Name, Address, Phone).
 * Import from here in every component, JSON-LD schema, and metadata file.
 * Changing a value here propagates everywhere — never hardcode NAP.
 */
export const BUSINESS = {
  name: 'العمودي للمفروشات',
  description:
    'متجر متخصص في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد وأرضيات عالية الجودة مع التوصيل والتركيب.',
  url: 'https://www.elamoudifurniture.com',
  /** The one business entity. Every JSON-LD block points at this @id instead of repeating the shop. */
  id: 'https://www.elamoudifurniture.com/#business',
  /** Profiles the owner confirmed. The shop has no Google Maps listing yet; add its link here once it exists. */
  sameAs: [
    'https://x.com/Khaled1985357',
    'https://www.tiktok.com/@khaled.el.fannan',
    'https://www.snapchat.com/@bwmhmdkhld27921',
  ],
  knowsAbout: [
    'موكيت',
    'موكيت تركي مشجر',
    'موكيت مساجد',
    'موكيت مكاتب',
    'باركيه',
    'أرضيات فينيل رول',
    'فينيل طبي للمستشفيات',
    'عشب صناعي',
    'ربل جيم',
    'ربل حمامات',
    'أرضيات فوم بازل',
  ],
  /** Only what the owner confirmed, with where it came from. Unconfirmed offers do not belong here. */
  facts: [
    { text: 'التركيب متاح ويُحسب بالمتر، وهو خدمة غير مجانية.', source: 'owner via the agency, 2026-10-27 and 2026-11-04' },
    { text: 'يوجد ضمان، ومدته وتفاصيله توضَّح عند الطلب.', source: 'owner via the agency, 2026-10-27' },
    { text: 'التوصيل غير مجاني، والتسليم خلال 1 إلى 3 أيام.', source: 'owner via the agency, 2026-11-03' },
    { text: 'نبيع بالجملة للمساجد والشركات.', source: 'owner via the agency, 2026-11-04' },
  ],
  /** Square PNG of the header mark (public/NavBar/NavbarIcone.svg), 512x512: the logo Google shows. */
  logo: '/images/logo.png',

  // ONE phone number across the site. The 0567... line was deprecated.
  phone: {
    primary: '+966558352924',
    waMessage: 'مرحباً، أريد الاستفسار عن منتجاتكم',
    get whatsappLink() {
      return `https://wa.me/${this.primary.replace('+', '')}?text=${encodeURIComponent(this.waMessage)}`;
    },
    get telLink() {
      return `tel:${this.primary}`;
    },
    get displayIntl() {
      return '+966 55 835 2924';
    },
    get displayLocal() {
      return '0558352924';
    },
  },

  address: {
    streetAddress: 'حي العزيزية، شارع عبدالله بن صالح',
    addressLocality: 'الرياض',
    addressRegion: 'منطقة الرياض',
    addressCountry: 'SA',
    addressCountryName: 'المملكة العربية السعودية',
    full: 'حي العزيزية، شارع عبدالله بن صالح، الرياض، المملكة العربية السعودية',
  },

  geo: {
    latitude: 24.597427,
    longitude: 46.730596,
    googleMapsUrl: 'https://maps.google.com/?q=24.597427,46.730596',
  },

  hours: {
    schemaOrg: ['Mo-Th 09:00-22:00', 'Fr 14:00-22:00', 'Sa-Su 09:00-22:00'],
    display: {
      sunThu: 'الأحد - الخميس: 9:00 ص - 10:00 م',
      friday: 'الجمعة: 2:00 م - 10:00 م',
      saturday: 'السبت: 9:00 ص - 10:00 م',
    },
  },


  areaServed: ['الرياض', 'المملكة العربية السعودية'],
  priceRange: '$$',
} as const;
