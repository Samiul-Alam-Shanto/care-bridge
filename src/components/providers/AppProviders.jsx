"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast"; // IMPORT THIS
import ThemeProvider from "./ThemeProvider";

const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster position="top-center" />
              {children}
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
