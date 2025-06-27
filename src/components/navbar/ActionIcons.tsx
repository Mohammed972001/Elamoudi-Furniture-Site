import type { ActionIconsProps } from '@/types';
import FavoriteButton from './FavoriteButton';
import CartButton from './CartButton';
import MobileMenuButton from './MobileMenuButton';

const ActionIcons = ({ cartCount, onMenuToggle, isMenuOpen }: ActionIconsProps) => (
  <div className="flex items-center space-x-3 space-x-reverse">
    <FavoriteButton />
    <CartButton count={cartCount} />
    <MobileMenuButton onToggle={onMenuToggle} isOpen={isMenuOpen} />
  </div>
);

export default ActionIcons; 