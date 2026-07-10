import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

import { DM_Sans, Montserrat } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athletes Elevated",
  description: "An invite only ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <Script id="acsbapp" strategy="afterInteractive">{`
          (function(){
            var s = document.createElement('script');
            var h = document.querySelector('head') || document.body;
            s.src = 'https://acsbapp.com/apps/app/dist/js/app.js';
            s.async = true;
            s.onload = function(){ acsbJS.init(); };
            h.appendChild(s);
          })();
        `}</Script>
      </body>
    </html>
  );
}
