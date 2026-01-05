import { Inter } from "next/font/google";
import "./globals.css";
// 1. Import NextJsTopLoader and SessionProvider
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "CareBridge | Trusted Care Services",
  description: "Reliable babysitting, elderly care, and patient support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Global Loader at top of page */}
        <NextTopLoader color="#059669" showSpinner={false} />

        {/* Wrap app in Auth Provider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
