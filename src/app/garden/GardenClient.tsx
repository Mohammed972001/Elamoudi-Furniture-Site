'use client';

import { useState, useRef, useEffect } from "react";
import ContainerSection from "@/components/ui/ContainerSection";
import { containerSections } from "@/data/containers";

export default function GardenClient() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Get garden section 
  const gardenSection = containerSections.find(section => section.id === "garden-services");

  if (!gardenSection) {
    return (
      <div className="min-h-screen bg-custom-background pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            عذراً، لم نتمكن من العثور على خدمات تنسيق الحدائق
          </h1>
          <p className="text-gray-600">يرجى المحاولة لاحقاً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-8">
              تنسيق الحدائق
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-semibold">
              حوّل حديقتك إلى واحة خضراء ساحرة
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              من التصميم والتنفيذ إلى الشلالات والنوافير والنباتات الطبيعية المنسقة، 
              نضفي الحياة والجمال على مساحتك الخارجية بأعلى معايير الجودة والإبداع.
            </p>
          </div>
        </div>
        
        {/* Floating Animation Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-emerald-200/30 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-300/20 rounded-full animate-float"></div>
      </section>

      {/* Video Section */}
      <section ref={sectionRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              شاهد أعمالنا في تنسيق الحدائق
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Video Player */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative w-full">
              <video
                controls
                className="w-full h-auto max-h-[70vh] object-contain bg-black"
                poster="/garden-poster.jpg" // إضافة poster إذا كان متاح
              >
                <source src="/tanseiq.mp4" type="video/mp4" />
                المتصفح لا يدعم تشغيل الفيديو
              </video>
            </div>
            
            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                تنسيق حدائق احترافي
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                استمتع بمشاهدة بعض من أعمالنا المتميزة في تنسيق الحدائق، من التصميم الأولي إلى النتيجة النهائية المذهلة.
                نحن نحول المساحات العادية إلى حدائق استثنائية تجمع بين الجمال والوظائف العملية.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+966558352924"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300"
                >
                  📞 اتصل للاستشارة المجانية
                </a>
                <a
                  href="https://wa.me/966558352924"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300"
                >
                  💬 واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ContainerSection 
        section={gardenSection}
        className="pb-12"
        gridCols="md:grid-cols-2 lg:grid-cols-3"
        mobileCols="grid-cols-1"
      />

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              لماذا تختار خدماتنا؟
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🌱
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                خبرة احترافية
              </h3>
              <p className="text-gray-600 leading-relaxed">
                فريق متخصص في تنسيق الحدائق مع سنوات من الخبرة في تحويل المساحات العادية إلى واحات خضراء
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                💧
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                أنظمة ري متطورة
              </h3>
              <p className="text-gray-600 leading-relaxed">
                نظم ري أوتوماتيكية حديثة وذكية لضمان نمو النباتات والحفاظ على جمال الحديقة
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🏆
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                ضمان الجودة
              </h3>
              <p className="text-gray-600 leading-relaxed">
                ضمان شامل على التنفيذ والنباتات مع خدمة صيانة دورية لضمان استمرارية الجمال
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ابدأ رحلة تحويل حديقتك اليوم
          </h2>
          <p className="text-xl mb-10 opacity-90">
            احصل على استشارة مجانية وتصميم مخصص لحديقة أحلامك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+966567746257"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              📞 اتصل بنا الآن
            </a>
            <a
              href="https://wa.me/966567746257"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg"
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
