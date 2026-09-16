"use client";

import { useRef } from "react";
import Link from "next/link";
import Navbar from "./components/navBar";

// Athletes Elevated — Marketplace Homepage
// Links point at the two real storefronts you have live today: /storefront/picabo
// and /storefront/teebox. "Browse all athletes/brands" and the footer's Stories/
// About/Contact links point at pages that don't exist yet — they go to "#" for now
// so nothing 404s; wire them up to real routes once those pages are built.

interface CategoryTile {
  label: string;
}

const CATEGORIES: CategoryTile[] = [
  { label: "Football" },
  { label: "Golf" },
  { label: "Outdoor" },
  { label: "Wellness" },
  { label: "Apparel" },
  { label: "Accessories" },
  { label: "Training" },
];

interface FeaturedAthlete {
  slug: string;
  name: string;
  sport: string;
  href: string;
}

const FEATURED_ATHLETES: FeaturedAthlete[] = [
  { slug: "picabo-street", name: "Picabo Street", sport: "Alpine Skiing", href: "/storefront/picabo" },
  { slug: "athlete-name", name: "Athlete Name", sport: "Sport", href: "#" },
  { slug: "athlete-name-2", name: "Athlete Name", sport: "Sport", href: "#" },
];

interface FeaturedBrand {
  slug: string;
  name: string;
  category: string;
  href: string;
}

const FEATURED_BRANDS: FeaturedBrand[] = [
  { slug: "teebox-golf", name: "TeeBox Golf", category: "Golf", href: "/storefront/teebox" },
  { slug: "parkit", name: "Parkit", category: "Outdoor", href: "#" },
  { slug: "pinned-golf", name: "Pinned Golf", category: "Golf", href: "#" },
  { slug: "west-ham-united", name: "West Ham United", category: "Football", href: "#" },
];

interface Pick {
  brand: string;
  name: string;
  price: string;
}

const PICKS: Pick[] = [
  { brand: "TeeBox Golf", name: "Performance Polo", price: "$68.00" },
  { brand: "TeeBox Golf", name: "Tour Cap", price: "$32.00" },
  { brand: "Parkit", name: "Insulated Tumbler", price: "$28.00" },
  { brand: "Pinned Golf", name: "Rangefinder Pro", price: "$199.00" },
  { brand: "West Ham United", name: "Training Jacket", price: "$85.00" },
  { brand: "Brand Name", name: "Product Name", price: "$0.00" },
];

export default function Homepage() {
  const catRowRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (dir: "left" | "right") => {
    catRowRef.current?.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }} className="bg-white text-[#092866]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#092866] to-[#071c4a] px-6 py-20 text-center text-white md:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#52aafc]">
          Member-Only Marketplace
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          SHOP WHAT THEY BUILT
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#d7e2f7] md:text-base">
          Every athlete storefront curated by the athlete. Every brand hand-picked and vetted
          before it earns a spot here. Every purchase fuels what they're building.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/storefront/picabo"
            className="rounded-sm border border-[#52aafc] bg-[#52aafc] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#092866]"
          >
            Shop by Athlete
          </Link>
          <Link
            href="/storefront/teebox"
            className="rounded-sm border border-white/50 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Shop by Brand
          </Link>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-5 pr-1.5">
            <input
              type="text"
              placeholder="Find an athlete, a brand, or a product…"
              className="flex-1 border-none py-2.5 text-sm text-[#092866] outline-none placeholder:text-[#9aa5bd]"
            />
            <button
              type="button"
              className="rounded-full bg-[#146FF8] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Search
            </button>
          </div>
          <div className="mt-3.5 flex flex-wrap justify-center gap-2.5">
            <span className="rounded-full bg-white/5 px-3.5 py-1.5 text-xs text-[#e7edfa] ring-1 ring-inset ring-white/30">
              What's live right now?
            </span>
            <span className="rounded-full bg-white/5 px-3.5 py-1.5 text-xs text-[#e7edfa] ring-1 ring-inset ring-white/30">
              Show me golf brands
            </span>
            <span className="rounded-full bg-white/5 px-3.5 py-1.5 text-xs text-[#e7edfa] ring-1 ring-inset ring-white/30">
              New drops this week
            </span>
          </div>
        </div>
      </section>

      {/* Live drop ticker */}
      <div className="flex items-center justify-between gap-4 bg-[#111318] px-6 py-3.5 text-sm font-semibold text-white md:px-10">
        <div className="flex items-center">
          <span className="mr-3 rounded-full bg-[#1f9d55] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
            Live Now
          </span>
          Picabo Street x TeeBox Golf — Founding Drop 01
        </div>
        <Link href="/storefront/picabo" className="text-xs font-bold uppercase text-[#52aafc]">
          Shop the drop →
        </Link>
      </div>

      {/* Browse by category */}
      <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold md:text-3xl">Browse by Category</h2>
          <p className="mt-1 text-sm text-[#5b5f6b]">Every brand, sorted by what they actually make.</p>
        </div>
        <div className="relative">
          <div
            ref={catRowRef}
            className="flex gap-4 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className="w-[170px] flex-none text-center">
                <div className="mb-2.5 flex h-[170px] items-center justify-center rounded-lg bg-gradient-to-br from-[#c7d6f0] to-[#8fa9d6] text-[11px] font-bold uppercase tracking-wide text-[#3a4a70]">
                  {cat.label}
                </div>
                <h4 className="text-sm font-bold">{cat.label}</h4>
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollCategories("left")}
            className="absolute left-[-6px] top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#ddd] bg-white text-base shadow"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollCategories("right")}
            className="absolute right-[-6px] top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#ddd] bg-white text-base shadow"
          >
            ›
          </button>
        </div>
      </section>

      {/* Featured athletes */}
      <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#146FF8]">
              Curated by Them
            </p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Featured Athletes</h2>
            <p className="mt-1 max-w-md text-sm text-[#5b5f6b]">
              Each storefront hand-picked by the athlete themselves.
            </p>
          </div>
          <Link href="#" className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-[#146FF8]">
            Browse all athletes →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FEATURED_ATHLETES.map((athlete) => (
            <Link
              key={athlete.slug}
              href={athlete.href}
              className="w-[220px] flex-none rounded-lg bg-[#f4f4f4] pb-4 text-center"
            >
              <div className="flex h-[150px] items-center justify-center bg-gradient-to-br from-[#c7d6f0] to-[#8fa9d6] text-xs font-bold uppercase tracking-wide text-[#3a4a70]">
                {athlete.name}
              </div>
              <h3 className="mt-3.5 text-sm font-bold">{athlete.name}</h3>
              <span className="mb-2 mt-1 inline-block rounded-xl bg-[#e3f0ff] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#146FF8]">
                {athlete.sport}
              </span>
              <br />
              <span className="mt-1 inline-block rounded-sm border border-[#092866] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#092866]">
                Shop Her Picks
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured brands */}
      <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#146FF8]">
              New to the Marketplace
            </p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Featured Brands</h2>
            <p className="mt-1 max-w-md text-sm text-[#5b5f6b]">
              Every brand hand-picked and vetted before it earns a spot here.
            </p>
          </div>
          <Link href="#" className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-[#146FF8]">
            Browse all brands →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FEATURED_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={brand.href}
              className="w-[220px] flex-none rounded-lg bg-[#f4f4f4] pb-4 text-center"
            >
              <div className="flex h-[150px] items-center justify-center bg-gradient-to-br from-[#c7d6f0] to-[#8fa9d6] text-xs font-bold uppercase tracking-wide text-[#3a4a70]">
                {brand.name}
              </div>
              <h3 className="mt-3.5 text-sm font-bold">{brand.name}</h3>
              <span className="mb-2 mt-1 inline-block rounded-xl bg-[#e3f0ff] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#146FF8]">
                {brand.category}
              </span>
              <br />
              <span className="mt-1 inline-block rounded-sm border border-[#092866] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#092866]">
                Shop the Brand
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop the picks */}
      <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#146FF8]">
              Straight From This Week
            </p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Shop the Picks</h2>
            <p className="mt-1 max-w-md text-sm text-[#5b5f6b]">
              A few things worth grabbing right now, across athletes and brands.
            </p>
          </div>
          <span className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-[#146FF8]">
            See all picks →
          </span>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {PICKS.map((item, i) => (
            <div key={i} className="text-left">
              <div className="mb-2.5 h-28 rounded-lg bg-gradient-to-br from-[#e6ecf7] to-[#c3d1ec]" />
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#5b5f6b]">{item.brand}</p>
              <p className="mb-1 text-sm font-bold">{item.name}</p>
              <p className="text-xs text-[#5b5f6b]">{item.price}</p>
              <span className="mt-1.5 inline-block text-xs font-bold uppercase tracking-wide text-[#146FF8]">
                Shop →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards teaser */}
      <section className="bg-[#f4f4f4] px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="max-w-sm text-2xl font-extrabold md:text-3xl">
              Every purchase earns rewards.
            </h2>
            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-[#5b5f6b]">
              Members build rewards with every order — redeemable for exclusive experiences,
              private events, and access you won't find anywhere else.
            </p>
          </div>
          <div>
            {[
              { n: 1, title: "Shop the marketplace", copy: "Any purchase earns rewards, automatically." },
              { n: 2, title: "Build your rewards", copy: "Points add up in your account over time." },
              { n: 3, title: "Unlock experiences", copy: "Exclusive access and moments you won't find anywhere else." },
            ].map((step) => (
              <div key={step.n} className="mb-5 flex gap-4">
                <div className="flex h-8.5 w-8.5 flex-none items-center justify-center rounded border border-[#092866] text-sm font-extrabold">
                  {step.n}
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-extrabold uppercase tracking-wide">{step.title}</h4>
                  <p className="text-[13px] text-[#5b5f6b]">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gradient-to-br from-[#092866] to-[#071c4a] px-6 py-16 text-center text-white md:px-10">
        <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#52aafc]">Our Mission</p>
        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">More than a marketplace.</h2>
        <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-[#d7e2f7]">
          A community of athletes, brands, and fans who believe sports can build a better world.
          Shop the products. Back the people. Lift the culture.
        </p>
        <Link
          href="#"
          className="inline-block rounded-sm border border-white/50 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white"
        >
          Learn More
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#f4f4f4]">
        <div className="mx-auto grid max-w-[1200px] gap-10 border-b border-[#ddd] px-6 py-14 md:grid-cols-[1.3fr_1fr] md:px-10">
          <div>
            <h2 className="mb-2.5 text-2xl font-extrabold">Get inside the movement.</h2>
            <p className="mb-5 max-w-md text-sm text-[#5b5f6b]">
              First access to every drop, exclusive experiences, and stories. No spam — just the good stuff.
            </p>
            <form className="flex max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 border border-[#ccc] px-4 py-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-[#092866] px-5 py-3 text-xs font-bold uppercase tracking-wide text-white"
              >
                Join
              </button>
            </form>
          </div>
          <div className="flex flex-col items-start justify-center md:items-end md:text-right">
            <h4 className="mb-1.5 text-lg font-extrabold leading-snug">
              Athletes who curate.
              <br />
              Brands who deliver.
            </h4>
            <p className="text-sm text-[#5b5f6b]">Vetted before it ever gets here.</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 py-9 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-10">
          <div className="text-lg font-extrabold tracking-wide text-[#092866]">
            ATHLETES <span className="text-[#146FF8]">ELEVATED</span>
          </div>
          <div>
            <h5 className="mb-3.5 text-xs font-extrabold uppercase tracking-wide">Shop</h5>
            <Link href="/storefront/picabo" className="mb-2 block text-sm text-[#5b5f6b]">Athletes</Link>
            <Link href="/storefront/teebox" className="mb-2 block text-sm text-[#5b5f6b]">Brands</Link>
          </div>
          <div>
            <h5 className="mb-3.5 text-xs font-extrabold uppercase tracking-wide">About</h5>
            <Link href="#" className="mb-2 block text-sm text-[#5b5f6b]">Rewards</Link>
            <Link href="#" className="mb-2 block text-sm text-[#5b5f6b]">Our Mission</Link>
          </div>
          <div>
            <h5 className="mb-3.5 text-xs font-extrabold uppercase tracking-wide">Connect</h5>
            <Link href="#" className="mb-2 block text-sm text-[#5b5f6b]">Stories</Link>
            <Link href="#" className="mb-2 block text-sm text-[#5b5f6b]">Contact</Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1200px] justify-between border-t border-[#ddd] px-6 py-4.5 text-xs text-[#5b5f6b] md:px-10">
          <span>© 2026 Athletes Elevated</span>
          <span>Terms and Policies</span>
        </div>
      </footer>
    </div>
  );
}