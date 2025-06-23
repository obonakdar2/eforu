"use client";

import Link from "next/link";
import { Menu, Search, Bell } from "lucide-react";
import { mainNavItems } from "~/config/navigation";
import { AuthButton } from "./ui/auth-button";

interface MainNavbarProps {
  onMobileMenuToggle: () => void;
}

export function MainNavbar({ onMobileMenuToggle }: MainNavbarProps) {
  return (
    <nav className="fixed top-0 right-0 left-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and main nav */}
          <div className="flex items-center gap-8">
            {/* Mobile menu button with animation */}
            <button
              onClick={onMobileMenuToggle}
              className="transform rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-gray-100 active:scale-95 lg:hidden"
            >
              <Menu className="h-5 w-5 transition-transform duration-200" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">ا</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                گروه انتخاب
              </span>
            </Link>

            {/* Main navigation - hidden on mobile */}
            <div className="hidden items-center gap-6 lg:flex">
              {mainNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="group relative text-gray-700 transition-all duration-200 hover:text-gray-900"
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/*  Search, notifications, profile */}
          <div className="flex items-center gap-4">
            {/* Search - hidden on small screens */}
            <div className="hidden items-center md:flex">
              <div className="relative">
                <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-64 rounded-lg border border-gray-300 py-2 pr-10 pl-4 text-sm transition-all duration-200 focus:w-72 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Notifications - hidden on small screens */}
            <button className="relative hidden transform rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-gray-100 sm:flex">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -left-1 h-3 w-3 animate-pulse rounded-full bg-red-500 text-xs"></span>
            </button>

            {/* Profile dropdown - hidden on mobile */}
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="px-4 pb-4 md:hidden">
        <div className="relative">
          <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 text-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </nav>
  );
}
