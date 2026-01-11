'use client';

import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp, FaPhone, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ProductDetails } from "@/types";

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
    const message = encodeURIComponent(`مرحباً، أريد الاستفسار عن ${product.title}`);
    window.open(`https://wa.me/966558352924?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+966558352924', '_self');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
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
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h overflow-y-auto">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-300 ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-blue-500 scale-105' 
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - صورة ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-delay">
                {product.description}
              </p>
            </div>

        

            {/* Features */}
            {product.features && (
              <div className="animate-fade-in-delay-4">
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

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 animate-fade-in-delay-5">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp className="w-5 h-5" />
                طلب عبر الواتساب
              </button>
              
              <button
                onClick={handleCall}
                className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaPhone className="w-5 h-5" />
                اتصال الآن
              </button>
            </div>

            {/* Detailed Description for SEO */}
            {product.detailedDescription && (
              <div className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in-delay-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  الوصف التفصيلي
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.detailedDescription}
                </div>
              </div>
            )}
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
