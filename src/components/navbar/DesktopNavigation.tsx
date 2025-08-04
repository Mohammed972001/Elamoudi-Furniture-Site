import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

const DesktopNavigation = () => (
  <div className="hidden lg:flex items-center space-x-10 mr-5 ">
    <ul className="flex items-center space-x-8" role="menubar">
      {NAVIGATION_ITEMS.map((item, index) => (
        <li key={index} role="none">
          <Link
            href={item.href}
            className="text-black hover:text-amber-800 font-medium transition-colors duration-200 relative group py-2"
            role="menuitem"
            aria-label={item.ariaLabel}
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default DesktopNavigation; 