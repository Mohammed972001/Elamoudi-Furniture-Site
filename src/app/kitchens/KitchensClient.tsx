'use client';

import { useState, useRef, useEffect } from "react";

export default function KitchensClient() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const videos = [
    {
      src: "/matab5.mp4",
      title: "مطبخ عالمي فاخر",
      description: "تصميمات عصرية بأعلى جودة وأفضل الخامات العالمية"
    },
    {
      src: "/matab52.mp4", 
      title: "أثاث مطابخ متميز",
      description: "حلول مبتكرة للمطابخ تجمع بين الأناقة والعملية"
    }
  ];

  const features = [
    {
      title: "تصميمات عالمية",
      description: "مطابخ بتصميمات عصرية تواكب أحدث التطورات العالمية",
      icon: "🌍"
    },
    {
      title: "خامات فاخرة",
      description: "أجود أنواع الخشب والرخام والمعادن المقاومة للصدأ",
      icon: "💎"
    },
    {
      title: "حلول ذكية",
      description: "تصميمات مبتكرة لاستغلال المساحات بأقصى كفاءة",
      icon: "🧠"
    },
    {
      title: "ضمان الجودة",
      description: "ضمان شامل على جميع المنتجات مع خدمة ما بعد البيع",
      icon: "✅"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 pb-10">
              مطابخ عالمية
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-semibold">
              أثاث مطابخ فاخر يجمع بين الجمال والعملية
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              اكتشف مجموعتنا المتميزة من المطابخ العالمية بتصميمات عصرية وخامات فاخرة. 
              نقدم لك حلولاً مبتكرة تحول مطبخك إلى مساحة أحلامك مع ضمان الجودة والأناقة.
            </p>
          </div>
        </div>
        
        {/* Floating Animation Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-orange-200/30 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-amber-300/20 rounded-full animate-float"></div>
      </section>

      {/* Full Screen Video Player Section */}
      <section ref={sectionRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              تشكيلة المطابخ المتميزة
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Full Screen Video Player */}
          <div className="space-y-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative w-full">
                  <video
                    controls
                    className="w-full h-auto max-h-[70vh] object-contain bg-black"
                    poster={`/kitchens-poster-${index + 1}.jpg`} // إضافة poster إذا كان متاح
                  >
                    <source src={video.src} type="video/mp4" />
                    المتصفح لا يدعم تشغيل الفيديو
                  </video>
                </div>
                
                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {video.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {video.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    <a
                      href="tel:+966558352924"
                      className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all duration-300"
                    >
                      📞 اتصل للاستفسار
                    </a>
                    <a
                      href="https://wa.me/966558352924"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300"
                    >
                      💬 واتساب
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              لماذا تختار مطابخنا؟
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ابدأ رحلة تحويل مطبخك اليوم
          </h2>
          <p className="text-xl mb-10 opacity-90">
            تواصل معنا للحصول على استشارة مجانية وتصميم مطبخ أحلامك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+966567746257"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              📞 اتصل بنا الآن
            </a>
            <a
              href="https://wa.me/966567746257"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              💬 واتساب
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
