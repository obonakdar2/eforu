import { Menu, X, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { AuthButton } from "~/components/ui/auth-button";

export default async function Navbar() {
  return (
    <nav className="border-b bg-white shadow-lg" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand - Now on the right in RTL */}
          <div className="flex-shrink-0">
            <h1 className="font-vazir text-xl font-bold text-gray-800">
              EForU
            </h1>
          </div>

          {/* Desktop Navigation - Now on the left in RTL */}
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline gap-4">
              <Link
                href="/"
                className="font-vazir flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
              >
                <Home className="ml-2 h-4 w-4" />
                خانه
              </Link>
              <Link
                href="/dashboard"
                className="font-vazir flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
              >
                <LayoutDashboard className="ml-2 h-4 w-4" />
                داشبورد
              </Link>
              <AuthButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <input type="checkbox" id="menu-toggle" className="peer hidden" />
            <label
              htmlFor="menu-toggle"
              className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
            >
              <span className="sr-only">باز کردن منوی اصلی</span>
              <Menu className="block h-6 w-6 peer-checked:hidden" />
              <X className="hidden h-6 w-6 peer-checked:block" />
            </label>

            {/* Mobile Navigation Menu */}
            <div className="absolute top-16 right-0 left-0 z-50 origin-top scale-y-0 transform border-b bg-white shadow-lg transition-transform duration-200 ease-out peer-checked:scale-y-100">
              <div className="flex flex-col gap-1 px-2 pt-2 pb-3">
                <Link
                  href="/"
                  className="font-vazir flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Home className="ml-3 h-5 w-5" />
                  خانه
                </Link>
                <Link
                  href="/dashboard"
                  className="font-vazir flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  <LayoutDashboard className="ml-3 h-5 w-5" />
                  داشبورد
                </Link>
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
