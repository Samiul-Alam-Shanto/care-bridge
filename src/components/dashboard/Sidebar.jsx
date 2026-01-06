"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  Settings,
  MapPin,
  ClipboardList,
  CheckSquare,
  Users,
  ShieldAlert,
  BarChart3,
} from "lucide-react";

// 1. EXPORT THIS CONSTANT
export const menus = {
  user: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/bookings", icon: CalendarDays },
    { name: "Track Service", href: "/dashboard/track", icon: MapPin },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "Settings", href: "/dashboard/profile", icon: Settings },
  ],
  caregiver: [
    { name: "Work Console", href: "/dashboard", icon: CheckSquare },
    { name: "Job Requests", href: "/dashboard/requests", icon: ClipboardList },
    { name: "History", href: "/dashboard/history", icon: CalendarDays },
    { name: "Settings", href: "/dashboard/profile", icon: Settings },
  ],
  admin: [
    { name: "Analytics", href: "/dashboard", icon: BarChart3 },
    {
      name: "All Bookings",
      href: "/dashboard/admin/bookings",
      icon: CalendarDays,
    },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      name: "Applications",
      href: "/dashboard/admin/applications",
      icon: ShieldAlert,
    },
    { name: "Settings", href: "/dashboard/profile", icon: Settings },
  ],
};

export default function Sidebar({ role = "user" }) {
  const pathname = usePathname();
  const links = menus[role] || menus.user;

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">
            CareBridge
          </span>
        </div>

        <div className="px-2 mb-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider border border-border rounded-full px-2 py-0.5">
            {role.toUpperCase()}
          </span>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
