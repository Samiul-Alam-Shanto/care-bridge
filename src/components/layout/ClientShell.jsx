"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ClientShell({ children }) {
  const pathname = usePathname();

  // Define routes that should NOT have the public Navbar/Footer
  const isDashboard =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/provider") ||
    pathname?.startsWith("/admin");
  const isCheckout = pathname?.startsWith("/checkout"); // Checkout usually has minimal nav

  return (
    <>
      {/* Only show Public Navbar if NOT dashboard and NOT checkout */}
      {!isDashboard && !isCheckout && <Navbar />}

      {children}

      {/* Only show Public Footer if NOT dashboard */}
      {!isDashboard && <Footer />}
    </>
  );
}
