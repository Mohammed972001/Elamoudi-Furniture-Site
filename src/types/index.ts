// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  ariaLabel: string;
}

export interface NavigationLink {
  name: string;
  href: string;
}

export interface NavigationSection {
  title: string;
  links: NavigationLink[];
  description?: string;
}

// Component props types
export interface ActionIconsProps {
  cartCount: number;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export interface CartButtonProps {
  count: number;
}

export interface MobileMenuButtonProps {
  onToggle: () => void;
  isOpen: boolean;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onItemClick: () => void;
}

// Layout types
export interface RootLayoutProps {
  children: React.ReactNode;
}

// Card and Container System Types
export interface CardItem {
  id: string;
  name: string;
  image: string;
  href?: string;
  description?: string;
}

export interface ContainerSection {
  id: string;
  title: string;
  items: CardItem[];
}

export interface ProductDetails {
  id: string;
  /** Date this page's content last really changed (YYYY-MM-DD); the sitemap's lastModified. */
  updated: string;
  title: string;
  description: string;
  detailedDescription?: string;
  metaDescription: string;
  keywords: string[];
  images: string[];
  availableColors: {
    name: string;
    value: string;
  }[];
  /**
   * Starting price per square metre, in SAR. The same figures as funun-aladiyat and mokeet-elsuarye
   * (owner via the agency, 2026-11-04). A page with a price is a Product with an Offer, which is what
   * Merchant Center reads; a page without one is a Service.
   */
  price?: number;
  features?: string[];
  /** Answer-first paragraph shown under the H1 in place of `description`. Owner-confirmed. */
  answer?: string;
  /** The «حسب الغرفة والاستخدام» section. */
  rooms?: ProductRoom[];
  /** Visible FAQ plus FAQPage JSON-LD of the same text. Owner-confirmed. */
  faq?: { question: string; answer: string }[];
  /** Points in the green strip under the summary. Defaults to the flooring points. */
  highlights?: string[];
  /** The owner's videos: public/furniture/<file>.mp4 with the poster <file>.jpg. */
  videos?: ProductVideo[];
  /** Container id of the card row under the page. Defaults to the flooring categories. */
  related?: string;
}

export interface ProductVideo {
  file: string;
  title: string;
  seconds: number;
}

export interface ProductRoom {
  name: string;
  text: string;
  link?: { href: string; label: string };
}

// Future types can be added here
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// Hero Container Types
export interface HeroContainerData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  imageAlt: string;
  backgroundColor?: string;
  textColor?: string;
}

// Action Button Types
export interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
} 