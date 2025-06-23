"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "~/components/ui/icon-button";
import type { RewardApiResponse } from "~/types/rewards";
import { RewardCard } from "../reward-card";
import { CardSliderSkeleton } from "./reward-slider-skeleton";
import { CardSliderError } from "./reward-slider-error";
import { CardSliderEmpty } from "./reward-slider-empty";

async function getRewardData() {
  const res = await fetch(
    "https://api.entekhabgroup.com/club-awards/v1/RewardPoint/GetAllRewards",
  );

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const response = (await res.json()) as RewardApiResponse;
  if (response.result !== "ok") {
    throw new Error(response.message?.value || "Request failed");
  }
  return response.data;
}

export default function Slider() {
  const [cardIndex, setCardIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCards(3); // lg: basis-1/3
      } else if (width >= 640) {
        setVisibleCards(2); // sm: basis-1/2
      } else {
        setVisibleCards(1); // basis-full
      }
    };

    updateVisibleCards(); // Run on mount
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);
  const dragX = useMotionValue(0);

  const {
    data: cardsData,
    isPending,
    error,
  } = useSuspenseQuery({
    queryKey: ["rewards"],
    queryFn: getRewardData,
  });

  const maxIndex = cardsData ? Math.max(0, cardsData.length - visibleCards) : 0;

  useEffect(() => {
    if (cardsData && cardIndex >= cardsData.length) {
      setCardIndex(0);
    }
  }, [cardsData, cardIndex]);

  const handleDragEnd = () => {
    const x = dragX.get();
    const DRAG_BUFFER = 5;

    if (x > DRAG_BUFFER && cardIndex < maxIndex) {
      setCardIndex((prev) => prev + 1); // Drag right → Next
    } else if (x < -DRAG_BUFFER && cardIndex > 0) {
      setCardIndex((prev) => prev - 1); // Drag left → Previous
    }
  };

  // Loading state
  if (isPending) {
    return <CardSliderSkeleton />;
  }

  // Error state
  if (error) {
    return <CardSliderError error={error} />;
  }

  // Empty state
  if (!cardsData || cardsData.length === 0) {
    return <CardSliderEmpty />;
  }

  return (
    <div dir="rtl" className="mx-auto w-full max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <h2 className="text-2xl font-bold text-white">جوایز و هدایا</h2>
      </div>

      {/* Slider */}
      <div className="relative rounded-b-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 pt-0">
        {/* Navigation */}
        {cardsData.length > visibleCards && (
          <>
            <IconButton
              onClick={() => setCardIndex((i) => Math.max(i - 1, 0))}
              disabled={cardIndex === 0}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white/20 hover:bg-white/30"
              aria-label="قبلی"
            >
              <ChevronRight className="h-5 w-5" />
            </IconButton>
            <IconButton
              onClick={() => setCardIndex((i) => Math.min(i + 1, maxIndex))}
              disabled={cardIndex >= maxIndex}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white/20 hover:bg-white/30"
              aria-label="بعدی"
            >
              <ChevronLeft className="h-5 w-5" />
            </IconButton>
          </>
        )}

        {/* Cards */}
        <div className="mx-12 overflow-hidden">
          <motion.div
            className="flex gap-4"
            drag="x"
            style={{ x: dragX }}
            onDragEnd={handleDragEnd}
            dragConstraints={{ left: 0, right: 0 }}
            animate={{
              translate: `calc(${cardIndex * (100 / visibleCards)}% + ${cardIndex * 16}px)`,
            }}
          >
            {cardsData.map((item) => (
              <div
                key={item.rewardPointId}
                className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <RewardCard data={item} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        {maxIndex > 0 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCardIndex(i)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  i === cardIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`صفحه ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
