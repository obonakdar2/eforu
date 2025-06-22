/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "~/lib/utils";

interface HeroSliderSkeletonProps {
  className?: string;
}

export function HeroSliderSkeleton({ className }: HeroSliderSkeletonProps) {
  return (
    <div
      className={cn(
        "relative h-96 w-full animate-pulse rounded-lg bg-gray-200",
        className,
      )}
    >
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-3 w-3 rounded-full bg-white/50" />
        ))}
      </div>
    </div>
  );
}
