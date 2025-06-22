"use client";

interface HeroSliderErrorProps {
  error: Error;
  className?: string;
}

export function HeroSliderError({ error, className }: HeroSliderErrorProps) {
  return (
    <div
      className={`flex h-96 w-full items-center justify-center rounded-lg border bg-gray-100 ${className ?? ""}`}
    >
      <div className="text-center">
        <p className="text-gray-600">Failed to load slides</p>
      </div>
    </div>
  );
}
