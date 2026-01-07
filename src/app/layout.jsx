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
  metadataBase: new URL("https://care-bridge-seven.vercel.app"),

  title: {
    default: "CareBridge | Book Trusted Healthcare Services Online",
    template: "%s | CareBridge",
  },

  description:
    "CareBridge connects patients with trusted healthcare services. Book appointments, manage care, and access professional medical support easily and securely.",

  keywords: [
    "CareBridge",
    "healthcare services",
    "medical booking platform",
    "doctor appointment",
    "online healthcare",
    "patient care management",
    "health services platform",
  ],

  authors: [{ name: "CareBridge Team" }],
  creator: "CareBridge",
  publisher: "CareBridge",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "CareBridge | Book Trusted Healthcare Services Online",
    description:
      "A modern healthcare platform to book trusted medical services, manage patient care, and connect with professionals.",
    url: "https://care-bridge-seven.vercel.app",
    siteName: "CareBridge",
    images: [
      {
        url: "https://i.ibb.co.com/39X8cf4w/image.png",
        width: 1200,
        height: 630,
        alt: "CareBridge Healthcare Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CareBridge | Trusted Healthcare Services",
    description:
      "Book healthcare services online with CareBridge. Fast, secure, and reliable medical support.",
    images: ["https://i.ibb.co.com/39X8cf4w/image.png"],
    creator: "@carebridge",
  },

  alternates: {
    canonical: "https://care-bridge-seven.vercel.app",
  },

  category: "Healthcare",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <NextTopLoader color="#059669" showSpinner={false} />

        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <ClientShell>
              <main className="flex-1">{children}</main>
            </ClientShell>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
