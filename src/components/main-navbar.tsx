"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { mainNavItems } from "~/config/navigation";

interface MainNavbarProps {
  onMobileMenuToggle: () => void;
}

export function MainNavbar({ onMobileMenuToggle }: MainNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Right side - Logo and main nav */}
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

          {/* Left side - Search, notifications, profile */}
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
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex transform items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-gray-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="hidden text-sm font-medium text-gray-700 md:block">
                  مهندس کریمی
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Profile dropdown menu with animation */}
              {isProfileOpen && (
                <div className="animate-in slide-in-from-top-2 absolute left-0 z-50 mt-2 w-48 origin-top-left scale-100 transform rounded-lg border border-gray-200 bg-white py-1 opacity-100 shadow-lg transition-all duration-200">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    پروفایل
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    تنظیمات
                  </Link>
                  <hr className="my-1" />
                  <button className="block w-full px-4 py-2 text-right text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100">
                    خروج
                  </button>
                </div>
              )}
            </div>
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
