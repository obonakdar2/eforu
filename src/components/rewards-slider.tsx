"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import type { RewardItem } from "~/types/rewards";
import { RewardCard } from "./reward-card";

interface RewardsSliderProps {
  slides: RewardItem[];
  autoSlideInterval?: number;
  className?: string;
}

export function RewardsSlider({ slides, className }: RewardsSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    >
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <RewardCard
            key={slide.rewardPointId}
            rewardName={slide.rewardName}
            urlImage={slide.urlImage}
            points={slide.points}
            persianDeadlineDate={slide.persianDeadlineDate}
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
    </div>
  );
}
