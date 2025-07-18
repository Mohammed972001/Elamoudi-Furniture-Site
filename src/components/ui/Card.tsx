"use client";

import Link from "next/link";
import Image from "next/image";
import { CardItem } from "@/types";
import { useState, useRef, useCallback } from "react";

interface CardProps {
  item: CardItem;
  className?: string;
}

const Card: React.FC<CardProps> = ({ item, className = "" }) => {
  const [isActive, setIsActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsActive(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    
    // Check if touch is still within card bounds with some tolerance
    const tolerance = 10;
    const isWithinBounds = (
      touch.clientX >= rect.left - tolerance &&
      touch.clientX <= rect.right + tolerance &&
      touch.clientY >= rect.top - tolerance &&
      touch.clientY <= rect.bottom + tolerance
    );
    
    setIsActive(isWithinBounds);
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Add small delay to prevent flicker
    timeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 100);
  }, []);

  const handleTouchCancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsActive(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <Link 
      ref={cardRef}
      href={item.href || "#"}
      className={`group block rounded-lg shadow-md transition-all duration-300 transform overflow-hidden touch-manipulation select-none ${
        isActive 
          ? 'shadow-xl -translate-y-1 scale-[1.02]' 
          : 'hover:shadow-xl hover:-translate-y-1'
      } ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={`transition-all duration-300 ${
            isActive 
              ? 'scale-110' 
              : 'group-hover:scale-105'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onLoad={handleImageLoad}
          priority={false}
        />
        
        {/* Title Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center text-center pointer-events-none transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="p-4 w-full">
            <h3 className={`font-bold text-white text-2xl transition-colors duration-200 text-center ${
              isActive 
                ? 'text-blue-200' 
                : 'group-hover:text-blue-200'
            }`}>
              {item.name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card; 