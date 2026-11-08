import type { NavigationItem } from '@/types';
import { hasArticles } from '@/data/articles';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'الرئيسية', href: '/', ariaLabel: 'الرئيسية' },
  { name: 'المتجر', href: '/products/mokite', ariaLabel: 'المتجر والتسوق' },
  { name: 'العشب الصناعي', href: '/products/artificial-grass', ariaLabel: 'العشب الصناعي' },
  ...(hasArticles ? [{ name: 'مقالات', href: '/articles', ariaLabel: 'مقالات' }] : []),
  { name: 'تواصل معنا', href: '/contact', ariaLabel: 'تواصل معنا' },
  { name: 'عن الشركة', href: '/about', ariaLabel: 'عن الشركة' },
];

// App constants
export const APP_CONFIG = {
  CART_COUNT: 3, // TODO: Connect to state management
  SITE_NAME: 'العمودي للمفروشات',
  SITE_TAGLINE: 'مفروشات الرياض',
} as const; 