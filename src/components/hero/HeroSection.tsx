import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/heroimage.svg"
          alt="سجاد وموكيت عربي تقليدي - مجموعة متنوعة من السجاجيد والستائر الشرقية"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzhhNDUxMyIvPjwvc3ZnPg=="
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="block">كل لمسة تبدأ</span>
            <span className="block text-carpet-gold">من الأرض</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 leading-relaxed">
            سجاد، موكيت، رقائق وستائر
            <br />
            بتصميمات تحول بيتك لقطعة فنية.
          </p>

          {/* CTA Button */}
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="تصفح مجموعة السجاد والموكيت"
          >
            ← تصفح الآن
          </Link>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-semibold mb-1">تصميمات عصرية</h3>
              <p className="text-gray-300 text-sm">أحدث الموضات والأنماط</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="text-white font-semibold mb-1">جودة عالية</h3>
              <p className="text-gray-300 text-sm">خامات مميزة ومتينة</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🚚</div>
              <h3 className="text-white font-semibold mb-1">توصيل سريع</h3>
              <p className="text-gray-300 text-sm">خدمة توصيل لجميع المحافظات</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
} 