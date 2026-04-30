/**
 * Single source of truth for all NAP data (Name, Address, Phone).
 * Import from here in every component, JSON-LD schema, and metadata file.
 * Changing a value here propagates everywhere — never hardcode NAP.
 */
export const BUSINESS = {
  name: 'العمودي للمفروشات',
  legalName: 'العمودي للأرضيات والمفروشات',
  description:
    'متجر متخصص في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد وأرضيات عالية الجودة بتوصيل وتركيب مجاني.',
  url: 'https://www.elamoudifurniture.com',
  logo: '/favicon.svg',

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
    postalCode: '12345',
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

  social: {
    tiktok: 'https://www.tiktok.com/@elamoudi_furniture',
    instagram: 'https://www.instagram.com/elamoudi_furniture',
    // Add as profiles are claimed.
  },

  areaServed: ['الرياض', 'المملكة العربية السعودية'],
  priceRange: '$$',
} as const;
