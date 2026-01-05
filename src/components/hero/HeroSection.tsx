import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative  w-full h-[60vh] md:h-[100vh]  ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/WhatsApp.jpeg"
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
      <div className="relative z-10 flex min-h-screen pt-5  md:pt-0 md:items-center justify-start px-4 sm:px-6 lg:px-28">
        <div className="">
          {/* Main Heading */}
          <h1 className="mb-6 text-5xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block text-primary">  العمودي للمفروشات والموكيت </span>
            <span className="block">كل لمسة تبدأ</span>
            <span className="block text-carpet-gold">من الأرض</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-2xl mx-auto text-2xl sm:text-4xl text-gray-200 leading-relaxed">
          سجاد، موكيت، ركنيات وستائر ، تنسيق حدائق
            <br />
             مطابخ تصميمات تحول بيتك لقطعة فنية.
          </p>

        

          
        </div>
      </div>

    
    </section>
  );
} 