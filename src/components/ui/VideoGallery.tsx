'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function VideoGallery() {
  const [currentVideo, setCurrentVideo] = useState(0);
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

  const nextVideo = () => {
    setCurrentVideo((prev: number) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev: number) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            تشكيلة المطابخ المتميزة
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Video Carousel */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative aspect-video">
            <video
              key={currentVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videos[currentVideo].src} type="video/mp4" />
              المتصفح لا يدعم تشغيل الفيديو
            </video>
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Video Navigation */}
            <button
              onClick={prevVideo}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextVideo}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Video Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {videos[currentVideo].title}
              </h3>
              <p className="text-lg opacity-90">
                {videos[currentVideo].description}
              </p>
            </div>
          </div>

          {/* Video Dots */}
          <div className="flex justify-center space-x-3 py-6 bg-gray-50">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentVideo === index 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Link to Full Kitchen Section */}
        <div className="text-center mt-12">
          <Link
            href="/kitchens"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            🍳 شاهد المزيد من المطابخ
          </Link>
        </div>
      </div>
    </section>
  );
}
