"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import type { BannerApiResponse } from "~/types/banner";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { HeroSliderSkeleton } from "./hero-slider-skeleton";
import { HeroSliderError } from "./hero-slider-error";

async function getBannerData() {
  const res = await fetch(
    "https://api.entekhabgroup.com/club-awards/v1/SiteBanner/GetSiteBanner",
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const response = (await res.json()) as BannerApiResponse;

  if (response.result !== "ok") {
    throw new Error(response.message?.value || "Request failed");
  }

  return response.data;
}

interface HeroSliderProps {
  autoSlideInterval?: number;
  className?: string;
}

export function HeroSlider({
  autoSlideInterval = 2000,
  className,
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const {
    data: slides,
    isPending,
    error,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: getBannerData,
  });

  // Reset current slide when slides change
  useEffect(() => {
    if (slides && slides.length > 0 && currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides, currentSlide]);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && slides && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [slides?.length, autoSlideInterval, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    if (slides) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const goToNext = () => {
    if (slides) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  // Loading state
  if (isPending) {
    return <HeroSliderSkeleton className={className} />;
  }

  // Error state
  if (error) {
    return <HeroSliderError error={error} className={className} />;
  }

  // Empty state
  if (!slides || slides.length === 0) {
    return (
      <div
        className={cn(
          "flex h-96 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-100",
          className,
        )}
      >
        <div className="text-center">
          <p className="text-lg text-gray-500">No slides available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
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
        {slides.map((slide, index) => (
          <div
            key={slide.siteBannerId}
            className="relative w-full flex-shrink-0"
          >
            <Image
              src={slide.imageUrl || "/placeholder.svg"}
              alt={slide.description || `Slide ${index + 1}`}
              width={1440}
              height={336}
              className="h-full w-full object-cover"
              priority={index === 0} // Prioritize first image
              onError={(e) => {
                // Handle individual image errors
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg?height=336&width=1440";
              }}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than one slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white transition-all duration-200 hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white transition-all duration-200 hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Pagination Dots - Only show if more than one slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-3 w-3 cursor-pointer rounded-full transition-all duration-200 focus:ring-2 focus:ring-white/50 focus:outline-none",
                currentSlide === index
                  ? "scale-110 bg-white"
                  : "bg-white/50 hover:bg-white/75",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
