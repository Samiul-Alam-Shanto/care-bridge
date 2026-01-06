"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useCart } from "@/context/CartContext"; // IMPORTED CART CONTEXT
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  HelpCircle,
  Briefcase,
  Mail,
  Newspaper,
  Users,
  Lightbulb,
  ShoppingBag, // IMPORTED ICON
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const { cart } = useCart(); // GET CART STATE

  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Track which dropdown is open on Mobile
  const [mobileDropdown, setMobileDropdown] = useState(null);
  // Track hover state for Desktop
  const [hoveredNav, setHoveredNav] = useState(null);

  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setMobileDropdown(null);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  // --- NAVIGATION DATA STRUCTURE ---
  const navItems = [
    { name: "Home", href: "/", type: "link" },
    { name: "Services", href: "/services", type: "link" },
    { name: "Coverage", href: "/coverage", type: "link" },
    {
      name: "Resources",
      type: "dropdown",
      children: [
        { name: "Safety & Trust", href: "/safety", icon: ShieldCheck },
        { name: "How It Works", href: "/how-it-works", icon: Lightbulb },
        { name: "Help & FAQ", href: "/faq", icon: HelpCircle },
      ],
    },
    {
      name: "Company",
      type: "dropdown",
      children: [
        { name: "About Us", href: "/about", icon: Users },
        { name: "Careers", href: "/careers", icon: Briefcase },
        { name: "Blog", href: "/blog", icon: Newspaper },
        { name: "Contact", href: "/contact", icon: Mail },
      ],
    },
    { name: "Professionals", href: "/caregivers", type: "link" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-sm">
            C
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            CareBridge
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative px-3 py-2"
              onMouseEnter={() =>
                item.type === "dropdown" && setHoveredNav(item.name)
              }
              onMouseLeave={() =>
                item.type === "dropdown" && setHoveredNav(null)
              }
            >
              {item.type === "link" ? (
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                    hoveredNav === item.name
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      hoveredNav === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {/* Desktop Dropdown Content */}
              <AnimatePresence>
                {item.type === "dropdown" && hoveredNav === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full w-56 pt-2"
                  >
                    <div className="rounded-xl border border-border bg-card p-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <child.icon className="h-4 w-4" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          {/* --- CART ICON (DESKTOP) --- */}
          <Link
            href="/cart"
            className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-5.5" />
          </button>

          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 hover:bg-muted/50 transition-all"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <span className="text-sm font-medium max-w-25 truncate">
                  {session.user?.name?.split(" ")[0]}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-lg z-20">
                    <div className="px-2 py-1.5 text-sm text-muted-foreground border-b border-border mb-2">
                      {session.user?.email}
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-stone-100 hover:text-primary dark:hover:bg-stone-800 transition-colors"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          {/* --- CART ICON (MOBILE) --- */}
          <Link href="/cart" className="relative p-2 text-foreground">
            <ShoppingBag className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU CONTENT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background overflow-hidden"
          >
            <div className="flex flex-col space-y-2 p-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.type === "link" ? (
                    <Link
                      href={item.href}
                      className="block py-2 text-lg font-medium text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.name ? null : item.name
                          )
                        }
                        className="flex w-full items-center justify-between py-2 text-lg font-medium text-foreground hover:text-primary"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            mobileDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 flex flex-col space-y-2 border-l border-border pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                              >
                                <child.icon className="h-4 w-4" />
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              <hr className="my-2 border-border" />

              {/* Mobile Auth */}
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 py-2 font-medium"
                  >
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 py-2 font-medium text-red-500"
                  >
                    <LogOut className="h-5 w-5" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    href="/login"
                    className="text-center font-medium py-2 border border-border rounded-lg"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="text-center font-medium py-2 bg-primary text-white rounded-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
