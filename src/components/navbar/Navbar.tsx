'use client';

import { useState } from 'react';
import { APP_CONFIG } from '@/constants/navigation';

// Import all navbar components
import Logo from './Logo';
import DesktopNavigation from './DesktopNavigation';
import SearchBar from './SearchBar';
import ActionIcons from './ActionIcons';
import MobileMenu from './MobileMenu';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMobileMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className=" md:w-[93%] bg-custom-background py-2 shadow-lg md:rounded-br-full md:fixed top-0 left-0 z-50" 
      role="banner"
    >
      <nav 
        className="container px-4 sm:px-6 lg:px-8" 
        role="navigation" 
        aria-label="القائمة الرئيسية"
      >
        <div className="flex items-center justify-between h-12 xl:h-16">
          <Logo />
          <DesktopNavigation />
          <SearchBar />
          <ActionIcons 
            cartCount={APP_CONFIG.CART_COUNT} 
            onMenuToggle={handleMenuToggle} 
            isMenuOpen={isMenuOpen} 
          />
        </div>
        
        <MobileMenu 
          isOpen={isMenuOpen} 
          onItemClick={handleMobileMenuItemClick} 
        />
      </nav>
    </header>
  );
};

 