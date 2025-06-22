"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import type { SiteBanner } from "~/types/banner";
import Image from "next/image";

interface HeroSliderProps {
  slides: SiteBanner[];
  autoSlideInterval?: number;
  className?: string;
}

export function HeroSlider({
  slides,
  autoSlideInterval = 2000,
  className,
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [slides.length, autoSlideInterval, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200">
        <p className="text-gray-500">No slides available</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-96 w-full overflow-hidden shadow-lg",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <Image
            key={slide.siteBannerId}
            src={slide.imageUrl}
            alt={slide.description}
            width={1440}
            height={336}
            className="w-full object-cover"
            objectFit="cover"
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="bg-opacity-20 hover:bg-opacity-30 absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white p-2 text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="bg-opacity-20 hover:bg-opacity-30 absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white p-2 text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 w-3 cursor-pointer rounded-full transition-all duration-200",
              currentSlide === index
                ? "scale-110 bg-white"
                : "bg-opacity-50 hover:bg-opacity-75 bg-white",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
