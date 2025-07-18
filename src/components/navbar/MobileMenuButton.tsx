import { Menu, X } from 'lucide-react';
import type { MobileMenuButtonProps } from '@/types';

const MobileMenuButton = ({ onToggle, isOpen }: MobileMenuButtonProps) => (
  <button
    onClick={onToggle}
    className="lg:hidden  p-2 text-gray-600 hover:text-amber-800 transition-colors "
    aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
    aria-expanded={isOpen}
    type="button"
  >
    {isOpen ? (
      <X className="h-6 w-6" />
    ) : (
      <Menu className="h-6 w-6" />
    )}
  </button>
);

export default MobileMenuButton; 