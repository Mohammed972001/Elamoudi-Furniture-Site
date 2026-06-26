import type { NavigationItem } from '@/types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'الرئيسية', href: '/', ariaLabel: 'الرئيسية' },
  { name: 'المتجر', href: '/products/mokite', ariaLabel: 'المتجر والتسوق' },
  { name: 'تنسيق الحدائق', href: '/garden', ariaLabel: 'منتجات الحديقة المنزلية' },
  { name: 'تواصل معنا', href: '/contact', ariaLabel: 'تواصل معنا' },
  { name: 'عن الشركة', href: '/about', ariaLabel: 'عن الشركة' },
];

// App constants
export const APP_CONFIG = {
  CART_COUNT: 3, // TODO: Connect to state management
  SITE_NAME: 'لمسة ابداع',
  SITE_TAGLINE: 'مفروشات الرياض',
} as const; 