"use client";

import React, { useState } from "react";
import { IconButton } from "~/components/ui/icon-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { RewardApiResponse } from "~/types/rewards";
import { RewardCard } from "./reward-card";

async function getRewardData() {
  const res = await fetch(
    "https://api.entekhabgroup.com/club-awards/v1/RewardPoint/GetAllRewards",
  );
  const response = (await res.json()) as RewardApiResponse;

  if (response.result !== "ok") {
    throw new Error(response.message.value || "Request failed");
  }

  return response.data;
}

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: slides } = useSuspenseQuery({
    queryKey: ["rewards"],
    queryFn: getRewardData,
  });

  const visibleCards = 3;
  const maxIndex = Math.max(0, slides.length - visibleCards);

  const goToNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goToPrevious = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div dir="rtl" className="mx-auto w-full max-w-7xl p-6">
      {/* Header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">جوایز و هدایا</h1>
        </div>
      </div>

      {/* Slider Container */}
      <div className="rounded-b-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 pt-0">
        <div className="relative">
          {/* Navigation */}
          <IconButton
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
          >
            <ChevronRight className="h-5 w-5" />
          </IconButton>
          <IconButton
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2"
          >
            <ChevronLeft className="h-5 w-5" />
          </IconButton>

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

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
