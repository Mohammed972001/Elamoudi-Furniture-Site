import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

const DesktopNavigation = () => (
  <div className="hidden lg:flex items-center mr-3 xl:mr-5">
    <ul className="flex items-center gap-3 xl:gap-7" role="menubar">
      {/* The logo already links home, so the desktop bar leaves «الرئيسية» out to fit on one line.
          From 1024 to 1279px the gaps and text are smaller, and the search box hides (SearchBar). */}
      {NAVIGATION_ITEMS.filter((item) => item.href !== "/").map((item, index) => (
        <li key={index} role="none">
          <Link
            href={item.href}
            className="whitespace-nowrap text-[15px] xl:text-base text-black hover:text-amber-800 font-medium transition-colors duration-200 relative group py-2"
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