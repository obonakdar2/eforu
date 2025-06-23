"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { dashboardNavItems } from "~/config/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-16 right-0 z-30 hidden h-[calc(100vh-4rem)] w-64 border-l border-gray-200 bg-white shadow-sm lg:block">
      {/* Sidebar content container with flex layout */}
      <div className="flex h-full flex-col">
        {/* Dashboard title */}
        <div className="flex-shrink-0 border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                باشگاه مشتریان
              </h1>
              <p className="text-xs text-gray-500">گروه صنعتی انتخاب</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable content */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              منوی باشگاه مشتریان
            </p>
            {dashboardNavItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                    isActive
                      ? "border border-blue-200 bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  } `}
                >
                  <span className="font-medium">{item.title}</span>
                  {item.icon && <item.icon className="h-5 w-5" />}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
