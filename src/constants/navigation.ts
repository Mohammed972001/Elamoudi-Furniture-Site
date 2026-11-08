import type { NavigationItem } from '@/types';
import { hasArticles } from '@/data/articles';

// The main sections first: carpet, parquet, vinyl, furniture and grass are what the shop sells most.
// «من نحن» stays in the footer; the call and WhatsApp buttons sit beside this menu.
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'الرئيسية', href: '/', ariaLabel: 'الرئيسية' },
  { name: 'الموكيت والسجاد', href: '/carpets', ariaLabel: 'الموكيت والسجاد' },
  { name: 'الباركيه', href: '/products/parket', ariaLabel: 'أرضيات الباركيه' },
  { name: 'الفينيل', href: '/products/vinyl-roll', ariaLabel: 'أرضيات الفينيل' },
  { name: 'الكنب والمجالس', href: '/furniture', ariaLabel: 'الكنب والمجالس والستائر' },
  { name: 'العشب الصناعي', href: '/products/artificial-grass', ariaLabel: 'العشب الصناعي' },
  ...(hasArticles ? [{ name: 'مقالات', href: '/articles', ariaLabel: 'مقالات' }] : []),
  { name: 'تواصل معنا', href: '/contact', ariaLabel: 'تواصل معنا' },
];

// App constants
export const APP_CONFIG = {
  CART_COUNT: 3, // TODO: Connect to state management
  SITE_NAME: 'العمودي للمفروشات',
  SITE_TAGLINE: 'مفروشات الرياض',
} as const; 