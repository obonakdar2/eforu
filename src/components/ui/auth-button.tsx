"use client";

import { ChevronDown, LogIn, User } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const AuthButton = () => {
  const session = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (session.status == "authenticated") {
    return (
      <div className="relative hidden sm:block">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex transform items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-gray-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            {session.data.user.name}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Profile dropdown menu with animation */}
        {isProfileOpen && (
          <div className="animate-in slide-in-from-top-2 absolute left-0 z-50 mt-2 w-48 origin-top-left scale-100 transform rounded-lg border border-gray-200 bg-white py-1 opacity-100 shadow-lg transition-all duration-200">
            <Link
              href="/dashboard/profile"
              className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
              onClick={() => setIsProfileOpen(false)}
            >
              پروفایل
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
              onClick={() => setIsProfileOpen(false)}
            >
              تنظیمات
            </Link>
            <hr className="my-1" />
            <button
              onClick={() => signOut()}
              className="block w-full cursor-pointer px-4 py-2 text-right text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
            >
              خروج
            </button>
          </div>
        )}
      </div>
    );
  } else if (session.status == "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700"
      >
        <span>ورود</span>
        <LogIn className="h-4 w-4" />
      </button>
    );
  } else if (session.status == "loading") {
    return <div>درحال بارگذاری...</div>;
  }
};
