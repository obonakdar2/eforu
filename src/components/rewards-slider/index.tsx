"use client";

import { useState, useEffect } from "react";
import { IconButton } from "~/components/ui/icon-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { RewardApiResponse } from "~/types/rewards";
import { RewardCard } from "../reward-card";
import { CardSliderSkeleton } from "./reward-slider-skeleton";
import { CardSliderError } from "./reward-slider-error";
import { CardSliderEmpty } from "./reward-slider-empty";

async function getRewardData() {
  const res = await fetch(
    "https://api.entekhabgroup.com/club-awards/v1/RewardPoint/GetAllRewards",
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const response = (await res.json()) as RewardApiResponse;

  if (response.result !== "ok") {
    throw new Error(response.message?.value || "Request failed");
  }

  return response.data;
}

interface CardSliderProps {
  visibleCards?: number;
  className?: string;
}

export default function CardSlider({
  visibleCards = 3,
  className,
}: CardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: slides,
    isPending,
    error,
  } = useQuery({
    queryKey: ["rewards"],
    queryFn: getRewardData,
  });

  const maxIndex = slides ? Math.max(0, slides.length - visibleCards) : 0;

  // Reset current index when slides change
  useEffect(() => {
    if (slides && slides.length > 0 && currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides, currentIndex]);

  const goToNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goToPrevious = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  // Loading state
  if (isPending) {
    return <CardSliderSkeleton className={className} />;
  }

  // Error state
  if (error) {
    return <CardSliderError error={error} className={className} />;
  }

  // Empty state
  if (!slides || slides.length === 0) {
    return <CardSliderEmpty className={className} />;
  }

  return (
    <div
      dir="rtl"
      className={`mx-auto w-full max-w-7xl p-6 ${className ?? ""}`}
    >
      {/* Header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">جوایز و هدایا</h1>
        </div>
      </div>

      {/* Slider Container */}
      <div className="rounded-b-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 pt-0">
        <div className="relative">
          {/* Navigation - Only show if more cards than visible */}
          {slides.length > visibleCards && (
            <>
              <IconButton
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="absolute top-1/2 right-0 z-10 -translate-y-1/2 focus:ring-2 focus:ring-white/50"
                aria-label="Previous rewards"
              >
                <ChevronRight className="h-5 w-5" />
              </IconButton>
              <IconButton
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="absolute top-1/2 left-0 z-10 -translate-y-1/2 focus:ring-2 focus:ring-white/50"
                aria-label="Next rewards"
              >
                <ChevronLeft className="h-5 w-5" />
              </IconButton>
            </>
          )}

          {/* Cards */}
          <div className="mx-12 overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(calc(${currentIndex * 100 * (1 / visibleCards)}% + ${currentIndex * 16}px))`,
              }}
            >
              {slides.map((item) => (
                <div
                  key={item.rewardPointId}
                  className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <RewardCard data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots - Only show if more cards than visible */}
        {slides.length > visibleCards && maxIndex > 0 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
