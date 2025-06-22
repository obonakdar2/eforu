"use client";

import type React from "react";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500 transform hover:scale-[1.02]",
      secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
      ghost: "hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
      link: "text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline focus:ring-blue-500",
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm rounded-md",
      md: "px-4 py-3 text-sm rounded-lg",
      lg: "px-6 py-4 text-base rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
