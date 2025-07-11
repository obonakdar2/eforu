"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, User, LogOut, LogIn } from "lucide-react";
import { mainNavItems, dashboardNavItems } from "~/config/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDashboardPage?: boolean;
}

export function MobileMenu({
  isOpen,
  onClose,
  isDashboardPage = false,
}: MobileMenuProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className={`flex items-center justify-between border-b border-gray-200 p-4 transition-all duration-500 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">ا</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                گروه انتخاب
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <div
              className={`transform p-4 transition-all duration-500 ease-out ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
            >
              <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                منوی اصلی
              </h3>
              <div className="space-y-1">
                {mainNavItems.map((item, index) => {
                  const isActive = pathname === item.url;
                  return (
                    <div
                      key={item.title}
                      className={`transform transition-all duration-300 ease-out ${
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isOpen
                          ? `${250 + index * 50}ms`
                          : "0ms",
                      }}
                    >
                      <Link
                        href={item.url}
                        className={`block rounded-lg px-3 py-2 transition-all duration-200 ${
                          isActive
                            ? "border border-blue-200 bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={onClose}
                      >
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dashboard Navigation */}
            {isDashboardPage && (
              <>
                <div className="mx-4 border-t border-gray-200" />
                <div
                  className={`transform p-4 transition-all duration-500 ease-out ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
                >
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    داشبورد
                  </h3>
                  <div className="space-y-1">
                    {dashboardNavItems.map((item, index) => {
                      const isActive = pathname === item.url;
                      return (
                        <div
                          key={item.title}
                          className={`transform transition-all duration-300 ease-out ${
                            isOpen
                              ? "translate-x-0 opacity-100"
                              : "translate-x-4 opacity-0"
                          }`}
                          style={{
                            transitionDelay: isOpen
                              ? `${450 + index * 50}ms`
                              : "0ms",
                          }}
                        >
                          <Link
                            href={item.url}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                              isActive
                                ? "border border-blue-200 bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                            onClick={onClose}
                          >
                            <span className="font-medium">{item.title}</span>
                            {item.icon && <item.icon className="h-4 w-4" />}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer: only render after session status is resolved */}
          {status !== "loading" && (
            <div
              className={`transform border-t border-gray-200 p-4 transition-all duration-500 ease-out ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
            >
              {status === "authenticated" ? (
                <>
                  {/* User Profile */}
                  <div className="mb-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {session.user?.name ?? "کاربر"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.user?.email ?? "—"}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Link
                      href="/dashboard/profile"
                      className="block w-full transform cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700"
                      onClick={onClose}
                    >
                      پروفایل
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <span>خروج</span>
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => signIn()}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-700"
                  >
                    <span>ورود</span>
                    <LogIn className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
