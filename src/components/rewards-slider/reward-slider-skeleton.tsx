/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

interface CardSliderSkeletonProps {
  className?: string;
}

export function CardSliderSkeleton({ className }: CardSliderSkeletonProps) {
  return (
    <div
      dir="rtl"
      className={`mx-auto w-full max-w-7xl p-6 ${className ?? ""}`}
    >
      {/* Header Skeleton */}
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="h-8 w-32 animate-pulse rounded bg-white/20" />
      </div>

      {/* Content Skeleton */}
      <div className="rounded-b-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 pt-0">
        <div className="mx-12">
          <div className="flex gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex-1 rounded-lg bg-white p-4">
                <div className="mb-4 h-48 animate-pulse rounded bg-gray-200" />
                <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
