import Link from 'next/link';
import type { MobileMenuProps } from '@/types';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

const MobileMenu = ({ isOpen, onItemClick }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-gray-200 bg-white" role="menu">
      <div className="py-4 space-y-1">
        {NAVIGATION_ITEMS.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors font-medium"
            role="menuitem"
            aria-label={item.ariaLabel}
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu; 