import type { ActionIconsProps } from '@/types';
import FavoriteButton from './FavoriteButton';
import MobileMenuButton from './MobileMenuButton';

const ActionIcons = ({  onMenuToggle, isMenuOpen }: ActionIconsProps) => (
  <div className="flex items-center space-x-3 space-x-reverse">
    <FavoriteButton />

    <MobileMenuButton onToggle={onMenuToggle} isOpen={isMenuOpen} />
  </div>
);

export default ActionIcons; 