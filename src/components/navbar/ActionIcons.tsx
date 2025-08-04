import type { ActionIconsProps } from '@/types';
import FavoriteButton from './FavoriteButton';
import MobileContactIcons from './MobileContactIcons';
import MobileMenuButton from './MobileMenuButton';

const ActionIcons = ({  onMenuToggle, isMenuOpen }: ActionIconsProps) => (
  <div className="flex items-center space-x-3 space-x-reverse">
    {/* Desktop: Show Favorite Button, Mobile: Show Contact Icons */}
    <div className="hidden lg:block">
      <FavoriteButton />
    </div>
    <div className="lg:hidden">
      <MobileContactIcons />
    </div>

    <MobileMenuButton onToggle={onMenuToggle} isOpen={isMenuOpen} />
  </div>
);

export default ActionIcons; 