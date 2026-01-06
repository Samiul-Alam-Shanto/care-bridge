"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Home, LogOut, Menu, X } from "lucide-react"; // Added Menu, X
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { dashboardLinks } from "./Sidebar"; // Import links to avoid duplication
import { usePathname } from "next/navigation"; // To highlight active link in mobile

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6 shadow-sm">
        {/* Left: Mobile Menu Trigger & Branding */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Show Logo only on Mobile (Desktop has it in Sidebar) */}
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 font-bold text-primary"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              C
            </div>
            <span>CareBridge</span>
          </Link>

          {/* Breadcrumb / Title (Desktop) */}
          <h1 className="hidden lg:block text-lg font-semibold text-foreground capitalize">
            {pathname.split("/").pop().replace("-", " ") || "Overview"}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-stone-100 hover:text-primary dark:hover:bg-stone-800 transition-colors"
            title="Go to Home"
          >
            <Home className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-stone-100 hover:text-primary dark:hover:bg-stone-800 transition-colors"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          <div className="h-6 w-px bg-border mx-1" />

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/profile"
              className="hidden md:block text-sm font-medium text-foreground hover:underline"
            >
              {session?.user?.name?.split(" ")[0]}
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <Link
              href="/dashboard/profile"
              className="relative h-9 w-9 overflow-hidden rounded-full border border-border"
            >
              <Image
                src={session?.user?.image || "https://i.pravatar.cc/150?u=user"}
                alt="User"
                fill
                className="object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER (Overlay) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed inset-y-0 left-0 w-64 bg-card p-6 shadow-2xl border-r border-border animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-xl text-primary">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md hover:bg-muted"
              >
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>

            <nav className="space-y-2">
              {dashboardLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
