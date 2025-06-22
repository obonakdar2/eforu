"use client";

interface CardSliderErrorProps {
  error: Error;
  className?: string;
}

export function CardSliderError({ error, className }: CardSliderErrorProps) {
  return (
    <div
      dir="rtl"
      className={`mx-auto w-full max-w-7xl p-6 ${className ?? ""}`}
    >
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <h1 className="text-2xl font-bold text-white">جوایز و هدایا</h1>
      </div>

      <div className="rounded-b-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 pt-0">
        <div className="rounded-lg bg-white/10 p-8 text-center text-white">
          <p>خطا در بارگذاری جوایز</p>
        </div>
      </div>
    </div>
  );
}
