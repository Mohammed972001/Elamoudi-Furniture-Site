import type { NavigationItem } from '@/types';

// Navigation menu items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'السجاد', href: '/carpets', ariaLabel: 'السجاد التقليدي والعصري' },
  { name: 'الستائر', href: '/curtains', ariaLabel: 'ستائر ومفروشات النوافذ' },
  { name: 'تنسيق الحدائق', href: '/garden', ariaLabel: 'منتجات الحديقة المنزلية' },
  { name: 'تواصل معنا', href: '/contact', ariaLabel: 'تواصل معنا' },
  { name: 'عن الشركة', href: '/about', ariaLabel: 'عن الشركة' },
];

// App constants
export const APP_CONFIG = {
  CART_COUNT: 3, // TODO: Connect to state management
  SITE_NAME: 'بيت السجاد',
  SITE_TAGLINE: 'منزلك أجمل معنا',
} as const; 