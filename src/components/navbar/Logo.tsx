import Link from 'next/link';
import { APP_CONFIG } from '@/constants/navigation';
import Image from 'next/image';
const Logo = () => (
  <div className="flex items-center">
    <Link 
      href="/" 
      className="flex items-center space-x-2 space-x-reverse group"
      aria-label={`الصفحة الرئيسية - ${APP_CONFIG.SITE_NAME}`}
    >
      <div className="w-8 h-8 lg:w-10 lg:h-10  flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        <Image 
          src="/NavBar/NavbarIcone.svg" 
          alt="logo" 
          width="32" 
          height="32"
          style={{ width: "auto", height: "auto" }}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-lg lg:text-xl font-bold text-primary group-hover:text-amber-900 transition-colors">
          {APP_CONFIG.SITE_NAME}
        </h1>
        <p className="text-xs text-gray-600 leading-tight">
          {APP_CONFIG.SITE_TAGLINE}
        </p>
      </div>
    </Link>
  </div>
);

export default Logo; 