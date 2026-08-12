import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { restaurantSchema } from "./schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tutu's Cafe and Kitchen | North Indian Restaurant in Somwarpet, Kodagu",
  description: "Family-run North Indian restaurant in Somwarpet, Kodagu, Karnataka. Known for tandoori, biryani, and butter chicken. Dine-in, takeaway, and delivery.",
  keywords: ["North Indian restaurant", "Somwarpet restaurant", "Coorg dining", "butter chicken", "tandoori", "biryani", "family restaurant"],
  openGraph: {
    title: "Tutu's Cafe and Kitchen | North Indian Restaurant in Somwarpet, Kodagu",
    description: "Family-run North Indian restaurant in Somwarpet, Kodagu, Karnataka. Known for tandoori, biryani, and butter chicken. Dine-in, takeaway, and delivery.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutu's Cafe and Kitchen | North Indian Restaurant in Somwarpet, Kodagu",
    description: "Family-run North Indian restaurant in Somwarpet, Kodagu, Karnataka. Known for tandoori, biryani, and butter chicken. Dine-in, takeaway, and delivery.",
  },
  alternates: {
    canonical: "https://tutus-cafe-kitchen.vercel.app",
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
