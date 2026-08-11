import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { restaurantSchema } from "./schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tutu's Cafe and Kitchen | Authentic North Indian Restaurant in Somwarpet",
  description: "Experience authentic North Indian cuisine at Tutu's Cafe and Kitchen in Somwarpet, Karnataka. Famous for butter chicken, tandoori dishes, biryani, and more. Dine-in, pickup, and delivery available.",
  keywords: ["North Indian restaurant", "Somwarpet restaurant", "Coorg dining", "butter chicken", "tandoori", "biryani", "family restaurant"],
  openGraph: {
    title: "Tutu's Cafe and Kitchen | Authentic North Indian Restaurant",
    description: "Experience authentic North Indian cuisine at Tutu's Cafe and Kitchen in Somwarpet, Karnataka.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutu's Cafe and Kitchen | Authentic North Indian Restaurant",
    description: "Experience authentic North Indian cuisine at Tutu's Cafe and Kitchen in Somwarpet, Karnataka.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
