"use client";

import type React from "react";
import { DashboardSidebar } from "~/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Dashboard Sidebar - Only visible on large screens */}
      <div className="fixed top-16 right-0 z-30 hidden h-[calc(100vh-4rem)] w-64 border-l border-gray-200 bg-white shadow-sm lg:block">
        <DashboardSidebar />
      </div>

      {/* Main content - Account for navbar height and sidebar width on large screens */}
      <div className="min-h-[calc(100vh-4rem)] pt-0 lg:mr-64">
        {/* Dashboard breadcrumb */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <nav className="flex items-center space-x-2 space-x-reverse text-sm">
            <span className="text-gray-500">باشگاه مشتریان</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">نمای کلی</span>
          </nav>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}
