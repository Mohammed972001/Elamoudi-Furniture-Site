// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  ariaLabel: string;
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