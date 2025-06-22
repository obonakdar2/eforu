/* eslint-disable @typescript-eslint/no-explicit-any */
import { Home, BarChart3, User, Settings } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: any;
}

export const mainNavItems: NavItem[] = [
  { title: "خانه", url: "/" },
  { title: "داشبورد", url: "/dashboard" },
];

export const dashboardNavItems: NavItem[] = [
  {
    title: "نمای کلی",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "آمار فروش",
    url: "/dashboard/charts",
    icon: BarChart3,
  },
];
