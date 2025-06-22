"use client";

import type React from "react";
import { useState } from "react";
import { DashboardSidebar } from "~/components/dashboard-sidebar";
import { MainNavbar } from "~/components/main-navbar";
import { MobileMenu } from "~/components/mobile-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Main Navbar */}
      <MainNavbar
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Mobile Menu - includes both main nav and dashboard nav */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isDashboardPage={true}
      />

      {/* Dashboard Sidebar - Only visible on large screens */}
      <DashboardSidebar />

      {/* Main content - Account for navbar height and sidebar width on large screens */}
      <div className="min-h-[calc(100vh-4rem)] lg:mr-64">
        {/* Dashboard breadcrumb */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <nav className="flex items-center space-x-2 space-x-reverse text-sm">
            <span className="text-gray-500">داشبورد</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">نمای کلی</span>
          </nav>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
