'use client';

import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp, FaPhone, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ProductDetails } from "@/types";
import SEOContent from "@/components/seo/SEOContent";
import { BUSINESS } from "@/constants/business";
import { reportContact } from "@/constants/conversions";

interface ProductViewProps {
  product: ProductDetails;
}

export default function ProductView({ product }: ProductViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleWhatsApp = () => {
    reportContact('whatsapp');
    const message = encodeURIComponent(`مرحباً، أريد الاستفسار عن ${product.title}`);
    window.open(`https://wa.me/${BUSINESS.phone.primary.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    reportContact('call');
    window.open(BUSINESS.phone.telLink, '_self');
  };

  return (
    // No top padding here: the page wrapper already clears the fixed navbar,
    // and a second pt-20 left a blank band across the first phone screen.
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-2 pb-10 lg:py-8">
        {/* Three blocks placed explicitly. On phones they stack in source
            order — summary first — so a visitor from an ad sees the headline,
            the ad's promises and both contact buttons on the first screen
            instead of after the photo and a wall of thumbnails. On desktop
            the gallery keeps its column and the text sits beside it. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:items-start">
          {/* Summary */}
          <div className="space-y-4 lg:col-start-2 lg:row-start-1">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4">
                {product.title}
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              {['معاينة وقياس مجاناً', 'توصيل مجاني داخل الرياض', 'عرض سعر على الواتساب'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-gray-800">
                  <span className="text-green-600">✓</span>
                  {item}
                </span>
              ))}
            </div>

            {/* Action Buttons — no entrance animation: they used to fade in
                a full second after load, right when ad visitors decide. */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaWhatsapp className="w-5 h-5" />
                اطلب عرض سعر على الواتساب
              </button>

              <button
                onClick={handleCall}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaPhone className="w-5 h-5" />
                اتصال الآن
              </button>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-3 lg:col-start-1 lg:row-start-1 lg:row-span-2">
            {/* Main Image with Zoom */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md group">
              <div 
                className="relative w-full h-full cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleImageHover}
              >
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
                  }}
                  priority
                />
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {selectedImageIndex + 1} / {product.images.length}
                </div>
              </div>
            </div>
            
            {/* Thumbnails: one horizontal strip. The old 4-per-row grid
                stacked up to four rows (13 photos on the carpet page) above
                everything else on a phone. */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    type="button"
                    key={index}
                    aria-label={`عرض الصورة ${index + 1}`}
                    className={`relative w-16 h-16 lg:w-20 lg:h-20 shrink-0 bg-white rounded-lg overflow-hidden shadow-sm ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - صورة ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6 lg:col-start-2 lg:row-start-2">
            {/* Features */}
            {product.features && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  المواصفات والمميزات
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Description for SEO */}
            <SEOContent content={product.detailedDescription} title="الوصف التفصيلي" />
          </div>
        </div>
      </div>

      {/* Add Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out 0.4s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.6s ease-out 0.6s both;
        }
        
        .animate-fade-in-delay-4 {
          animation: fadeIn 0.6s ease-out 0.8s both;
        }
        
        .animate-fade-in-delay-5 {
          animation: fadeIn 0.6s ease-out 1s both;
        }
        
        .animate-fade-in-delay-6 {
          animation: fadeIn 0.6s ease-out 1.2s both;
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-out both;
        }
      `}</style>
    </div>
  );
}
