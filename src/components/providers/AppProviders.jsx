"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./ThemeProvider";

const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
