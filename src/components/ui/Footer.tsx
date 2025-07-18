import Link from 'next/link';
import Image from 'next/image';
import { NavigationSection } from '@/types';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks: NavigationSection[] = [

    {
      title: "معلومات",
      description: "موكيت بيت السجاد هو وجهتك الأولى لحلول الأرضيات والمفروشات الفاخرة، حيث نقدم تشكيلة واسعة من الموكيت والسجاد بأعلى المواصفات العالمية. نحن نحرص على تلبية احتياجات جميع القطاعات بأفضل الأسعار وأعلى جودة، مع تقديم خدمات متميزة لما بعد البيع، وفريق متخصص جاهز لخدمتك وزيارتك أينما كنت",
      links: []
    },
    {
      title: "من نحن",
      links: [
        { name: "من نحن", href: "/about" },
        { name: "اتصل بنا", href: "/contact" },
      ]
    },
    {
      title: "الأقسام الشائعة", 
      links: [
        { name: "الشحن والتوصيل", href: "/shipping" },
        { name: "سياسة الاسترجاع", href: "/returns" },
      ]
    },
  
   
  ];

  const socialLinks = [
    { 
      icon: (
        <Image 
          src="/home/x.svg" 
          alt="X"
          width={40}
          height={20}
        />
      ), 
      href: "#", 
      name: "X (Twitter)" 
    },
    { 
      icon: (
        <Image 
          src="/home/tiktok.svg" 
          alt="TikTok"
          width={40}
          height={20}
        />
      ), 
      href: "#", 
      name: "TikTok" 
    },
    { 
      icon: (
        <Image 
          src="/home/fecbook.svg" 
          alt="Facebook"
          width={40}
          height={20}
        />
      ), 
      href: "#", 
      name: "Facebook" 
    },
    { 
      icon: (
        <Image 
          src="/home/insta.svg" 
          alt="Facebook"
          width={40}
          height={20}
        />
      ), 
      href: "#", 
      name: "Instagram" 
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Logo and Contact */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center ml-3">
                <Image 
                  src="/NavBar/NavbarIcone.svg" 
                  alt="بيت السجاد" 
                  width={48} 
                  height={48}
                  className="filter brightness-0 invert"
                />
              </div>
              <h2 className="text-2xl font-bold">بيت السجاد</h2>
            </div>
            
            <div className="space-y-3">
              <a href="tel:+966-56-774-6257" className="flex items-center justify-center text-lg">
                <Image 
                  src="/home/phon.svg" 
                  alt="هاتف"
                  width={20}
                  height={20}
                  className="ml-2"
                />
                   6257 774 56 966+ 
              </a>
            </div>
          </div>

          {/* Navigation Links - Mobile */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {navigationLinks.map((section, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
                {section.description ? (
                  <p className="text-gray-200 text-sm leading-relaxed max-w-sm mx-auto">
                    {section.description}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          href={link.href}
                          className="text-gray-200 hover:text-white transition-colors text-base"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Logo and Contact - Desktop */}
          <div className="text-right">
            <div className="flex items-center mb-6">
            <div className="w-10 h-12 flex items-center justify-center">
                <Image 
                  src="/NavBar/NavbarIcone.svg" 
                  alt="بيت السجاد" 
                  width={48} 
                  height={48}
                  className=" "
                />
              </div>
              <h2 className="text-2xl font-bold mr-3">بيت السجاد</h2>
              
            </div>
            
            <div className="space-y-4">
              <a href="tel:+966-56-774-6257" className="flex items-center justify-start text-lg">
              <Image 
                  src="/home/phon.svg" 
                  alt="هاتف"
                  width={30}
                  height={20}
                  className="ml-2"
                />
               6257 774 56 966+ 
              </a>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="text-right">
              <h3 className="font-semibold text-lg mb-6">{section.title}</h3>
              {section.description ? (
                <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
                  {section.description}
                </p>
              ) : (
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-gray-200 hover:text-white transition-colors text-base"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
       

          {/* Social Media Icons */}
          <div className="flex items-center space-x-8 space-x-reverse">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                className="w-14 h-10  bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all text-white"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
             {/* Copyright */}
             <div className="text-center lg:text-right">
            <p className="text-gray-200 text-sm">
              جميع الحقوق محفوظة ©   بيت السجاد  {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 