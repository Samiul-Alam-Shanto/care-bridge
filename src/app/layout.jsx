import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import AppProviders from "@/components/providers/AppProviders";
import ClientShell from "@/components/layout/ClientShell"; // Import the Shell

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <NextTopLoader color="#059669" showSpinner={false} />

        <AppProviders>
          <div className="flex min-h-screen flex-col">
            {/* The Shell handles the Navbar/Footer logic */}
            <ClientShell>
              <main className="flex-1">{children}</main>
            </ClientShell>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
