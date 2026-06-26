import Link from 'next/link';
import { APP_CONFIG } from '@/constants/navigation';
import Image from 'next/image';

const Logo = () => (
  <div className="flex items-center">
    <Link
      href="/"
      className="flex items-center gap-2.5 group"
      aria-label={`الصفحة الرئيسية - ${APP_CONFIG.SITE_NAME} - ${APP_CONFIG.SITE_TAGLINE}`}
    >
      <div className="w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        <Image
          src="/NavBar/NavbarIcone.svg"
          alt={`شعار ${APP_CONFIG.SITE_NAME} ${APP_CONFIG.SITE_TAGLINE}`}
          width="44"
          height="44"
          priority
          className="w-full h-full object-contain"
        />
      </div>
      <div className="hidden sm:flex flex-col leading-none">
        <span className="text-[10px] lg:text-xs font-semibold tracking-[0.2em] text-carpet-gold">
          {APP_CONFIG.SITE_TAGLINE}
        </span>
        <span className="text-lg lg:text-2xl font-extrabold text-primary group-hover:text-amber-900 transition-colors -mt-0.5">
          {APP_CONFIG.SITE_NAME}
        </span>
      </div>
    </Link>
  </div>
);

export default Logo;
