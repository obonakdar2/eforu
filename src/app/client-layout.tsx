"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { MainNavbar } from "~/components/main-navbar";
import { MobileMenu } from "~/components/mobile-menu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <MainNavbar
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isDashboardPage={isDashboardPage}
      />
      {children}
    </div>
  );
}
