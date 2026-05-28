import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { PAGE_METADATA } from "./src/lib/uxContent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.athleteselevated.com"),
  title: {
    default: PAGE_METADATA.home.title,
    template: "%s",
  },
  description: PAGE_METADATA.home.description,
  openGraph: {
    title: PAGE_METADATA.home.title,
    description: PAGE_METADATA.home.description,
    url: "https://www.athleteselevated.com",
    siteName: "Athletes Elevated",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.home.title,
    description: PAGE_METADATA.home.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children} <Analytics /> </body>
    </html>
  );
}
