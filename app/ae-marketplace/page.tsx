"use client";

import { useState } from "react";
import Footer from "../src/components/footer";
import Navbar from "../src/components/navBar";

type Product = {
  id: number;
  name: string;
  price: string;
  visual: string; // big watermark number (kits) or short monogram (accessories)
  description: string;
  features: string[];
  // TODO: add real product photo path, e.g. "/whu-x-ae/home-shirt.jpg"
  image: string;
  // TODO: insert the real West Ham store URL for this product
  shopUrl: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "West Ham 26/27 Elite Home Shirt",
    price: "£110",
    visual: "1",
    description:
      "Built for performance and inspired by the Club’s next chapter, the West Ham United x New Balance 2026/27 Elite Home Shirt combines iconic Claret and Blue colours with cutting-edge innovation. Designed to mirror the shirt worn by the players, it delivers premium comfort and a professional-level feel whether you're backing the Hammers from the stands or taking to the pitch yourself.",
    features: ["Official West Ham United x New Balance 2026/27 Elite Home Shirt", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Finished with official Club branding in classic West Ham colours", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteHome.png",
    shopUrl: "https://tidd.ly/4wb1AlG",
  },
  {
    id: 2,
    name: "West Ham 26/27 Elite Away Shirt",
    price: "£110",
    visual: "2",
    description: "Built for performance and inspired by the Club's next chapter, the West Ham United x New Balance 2026/27 Elite Away Shirt combines the iconic white Away colours with cutting-edge innovation. Designed to mirror the shirt worn at the highest level, it delivers premium comfort whether you're backing the Hammers from the stands or on the pitch yourself.",
    features: ["Official West Ham United x New Balance 2026/27 Elite Away Shirt", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Finished with official West Ham United Club crest and New Balance branding in classic Away styling", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteAway.png",
    shopUrl: "https://tidd.ly/4vFyGca",
  },
  {
    id: 3,
    name: "West Ham 26/27 Womens Elite Home Shirt",
    price: "£110",
    visual: "3",
    description: "A performance-led design made for the next chapter, the West Ham United x New Balance 2026/27 Women’s Elite Home Shirt combines iconic Claret and Blue style with advanced comfort and modern craftsmanship. Designed for supporters who want the same elite-level feel as the players, it delivers lightweight performance and freedom of movement throughout every moment of the season.",
    features: ["Official West Ham United x New Balance 2026/27 Women’s Elite Home Shirt", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric for a premium feel", "Short sleeve design for comfort and freedom of movement", "Finished with official Club branding in classic West Ham colours", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteHome.png",
    shopUrl: "https://tidd.ly/4prol1S",
  },
  {
    id: 4,
    name: "West Ham 26/27 Womens Elite Away Shirt",
    price: "£110",
    visual: "H",
    description:
      "Built for performance and inspired by the Club's next chapter, the West Ham United x New Balance 2026/27 Women’s Elite Away Shirt combines the iconic white Away colours with cutting-edge innovation. Designed for a tailored women’s fit and to mirror the shirt worn at the highest level, it delivers premium comfort whether you're backing the Hammers from the stands or on the pitch yourself.",
    features: ["Official West Ham United x New Balance 2026/27 Women’s Elite Away Shirt", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Designed for a women’s fit for enhanced comfort and wearability", "Finished with official West Ham United Club crest and New Balance branding in classic Away styling", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteAway.png",
    shopUrl: "https://tidd.ly/4f9lLdx",
  },
  {
    id: 5,
    name: "West Ham 26/27 ELITE Third Shirt",
    price: "£110",
    visual: "SC",
    description: "Bold, bright and contemporary, the West Ham United x New Balance 2026/27 Elite Third Shirt brings the vibrancy of summer to the pitch with a distinctive bleach blue colour and fluid tonal graphics. Inspired by the creative beating heart of modern East London, this premium performance jersey mirrors the shirt worn at the highest level, combining cutting-edge innovation with a striking design for players and supporters alike.",
    features: ["Official West Ham United x New Balance 2026/27 Elite Third Shirt", "Distinctive bleach blue colour with fluid tonal graphics inspired by the vibrancy of summer", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Finished with official West Ham United Club crest and New Balance branding", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteThird.png",
    shopUrl: "https://tidd.ly/4c3SLBW",
  },
  {
    id: 6,
    name: "West Ham 26/27 Womens Third Shirt",
    price: "£75",
    visual: "CP",
    description: "Represent the Hammers in comfort with the West Ham United x New Balance 2026/27 Unsponsored Third Shirt. Bold, bright and contemporary, the distinctive bleach blue colour is brought to life by fluid tonal graphics, creating a striking look inspired by the vibrancy of summer. Designed for game days and everyday support, this lightweight jersey combines fast-drying NB DRY technology with a smooth, comfortable fit.",
    features: ["Official West Ham United x New Balance 2026/27 Unsponsored Third Shirt", "Distinctive bleach blue colour with fluid tonal graphics", "Short sleeve design for a classic match-inspired look", "NB DRY fast-drying technology helps wick moisture away from the body", "Standard fit designed to provide a true-to-size feel", "Lightweight polyester material for a comfortable feel", "Finished with official West Ham United colours and club branding", "Made from 100% recycled polyester"],
    image: "/marketplace/third.png",
    shopUrl: "https://tidd.ly/4xk1TdP",
  },
  {
    id: 7,
    name: "West Ham 26/27 Third Shirt",
    price: "£75",
    visual: "BG",
    description:
      "Represent the Hammers in comfort with the West Ham United x New Balance 2026/27 Third Shirt. Bold, bright and contemporary, the distinctive bleach blue colour is brought to life by fluid tonal graphics, creating a striking look inspired by the vibrancy of summer. Designed for players and fans alike, this lightweight jersey combines fast-drying NB DRY technology with a comfortable fit to keep you feeling fresh throughout the season.",
    features: ["Official West Ham United x New Balance 2026/27 Third Shirt", "Distinctive bleach blue colour with fluid tonal graphics", "Short sleeve design for a classic match-inspired look", "NB DRY fast-drying technology helps wick moisture away from the body", "Standard fit designed to provide a true-to-size feel", "Lightweight polyester material for a comfortable feel", "Finished with official West Ham United colours and club branding", "Made from 100% recycled polyester"],
    image: "/marketplace/third.png",
    shopUrl: "https://tidd.ly/456TLBB",
  },
];

function ProductVisual({ product, size }: { product: Product; size: "sm" | "lg" }) {
  const heightClass = size === "lg" ? "h-90 sm:h-110" : "h-50";

  if (product.image) {
    return (
      <div className={`${heightClass} w-full overflow-hidden rounded-2xl`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${heightClass} w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#8C2438] via-[#7A1F2B] to-[#4A121B] shadow-inner`}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 18px)",
        }}
      />
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#1BB1E7]/20 blur-2xl" />
      <div className="flex h-full w-full items-center justify-center">
        <span
          className={`select-none font-black italic text-white/15 ${
            size === "lg" ? "text-[9rem]" : "text-6xl"
          }`}
        >
          {product.visual}
        </span>
      </div>
    </div>
  );
}

const TICKER_TEXT = "Official merchandise";

// Awin affiliate banner for West Ham United. Keep the <img> and the tracked
// <a href> paired exactly as provided by Awin — separating them breaks
// commission tracking on any click-throughs.
const AWIN_LINK =
  "https://www.awin1.com/cread.php?s=4029952&v=19650&q=389560&r=2975489";
// Local hero image instead of Awin's dynamically-served (and blurry) banner.
// Drop the real file at public/whu-x-ae/hero-banner.jpg and adjust the path
// below if you name or place it differently.
const HERO_IMAGE = "/whu-wrexham-lp/2633.jpg";

function Header() {
  return (
    <div>
      <header className="w-full bg-black pt-16">
        <a rel="sponsored" href={AWIN_LINK} className="block w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="West Ham United — official partner offer"
            className="block h-auto w-full"
          />
        </a>
      </header>

      <div className="relative overflow-hidden border-y-2 border-[#1BB1E7] bg-[#7A1F2B] py-2.5">
        <style>{`
          @keyframes whuMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
        <div
          className="flex w-max whitespace-nowrap pt-4 pb-4"
          style={{ animation: "whuMarquee 45s linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {Array.from({ length: 8 }).map((_, j) => (
                <span
                  key={j}
                  className="mx-6 flex shrink-0 items-center gap-6 text-lg font-bold uppercase tracking-wide text-white"
                >
                  {TICKER_TEXT}
                  <span className="text-[#8FD5F7]">•</span>
                  West Ham United
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [selected, setSelected] = useState<Product | null>(null);

  const related = selected
    ? PRODUCTS.filter((p) => p.id !== selected.id).slice(0, 3)
    : [];

  return (
    <main className="min-h-screen bg-neutral-50">
        <Navbar />
      <Header />

      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-12">
        {!selected ? (
          <>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelected(product)}
                  className="group rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7A1F2B]/10 hover:ring-[#1BB1E7]/40"
                >
                  <div className="relative">
                    <ProductVisual product={product} size="sm" />
                    <div className="absolute -right-2 -top-2 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#7A1F2B] shadow-md ring-1 ring-black/5">
                      {product.price}
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-neutral-900">
                    {product.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-[#1B90BC] opacity-0 transition group-hover:opacity-100">
                    View details
                    <span aria-hidden="true">→</span>
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelected(null)}
              className="mb-6 flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-[#7A1F2B]"
            >
              <span aria-hidden="true">←</span> Back to all products
            </button>

            <div className="grid gap-10 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8 md:grid-cols-2">
              <ProductVisual product={selected} size="lg" />
              <div className="flex flex-col justify-center">
                <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
                  {selected.name}
                </h2>
                <p className="mt-2 text-xl font-semibold text-[#7A1F2B]">
                  {selected.price}
                </p>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {selected.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {selected.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1BB1E7]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={selected.shopUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-[#7A1F2B] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7A1F2B]/30 transition hover:-translate-y-0.5 hover:bg-[#621826] hover:shadow-xl"
                >
                  Shop on WHU
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="mt-3 text-xs text-neutral-400">
                  Opens on the official West Ham United store in a new tab.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                You might also like
              </p>
              <div className="grid grid-cols-3 gap-4">
                {related.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelected(product)}
                    className="group rounded-2xl bg-white p-2.5 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <ProductVisual product={product} size="sm" />
                    <p className="mt-2 truncate text-xs font-semibold text-neutral-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-neutral-500">{product.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
<Footer />
    </main>
  );
}