"use client";

/**
 * Athletes Elevated — Brand Storefront: BYLT × Rob Gronkowski
 * Place at:  app/storefront/bylt/page.tsx
 *
 * Everything you'd want to change lives in the STOREFRONT object below:
 * copy, products, prices, links and images. Nothing else needs editing.
 *
 * Images: drop files into /public/bylt/ and set the path, e.g.
 *   heroImage: "/bylt/gronk-hero.jpg"
 * Any image left as "" shows a styled placeholder, so you can add photos
 * one at a time.
 *
 * Brand look: BYLT's black-and-bone palette with a sand accent. The global
 * Athletes Elevated nav and the "Join the Marketplace" band stay AE-branded,
 * per the Brand Storefront one-pager.
 */

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../components/navBar";

/* ============================================================================
 * CONTENT — edit here
 * ========================================================================= */

type Product = {
  name: string;
  price?: string; // leave "" to hide the price
  image?: string; // "/bylt/file.jpg" or a full URL; "" = placeholder
  href?: string; // product link; "" falls back to STOREFRONT.shopAllHref
  tag?: string; // small label on the card, e.g. "Gronk Signature"
};

type Look = {
  key: string;
  label: string;
  blurb: string;
  image?: string;
  products: Product[];
};

const STOREFRONT = {
  brand: "BYLT",
  athlete: "Gronk",
  athleteFullName: "Rob Gronkowski",
  athleteNumber: "87",
  campaign: "BYLT FOR LIFE",
  credentials: ["4× Super Bowl Champion", "NFL Broadcaster", "Entrepreneur"],
  headline: "Built for the game after the game.",
  intro:
    "Premium basics from BYLT, co-signed by one of the most decorated tight ends in football history. Pieces that move from the morning workout to the business meeting to the night out — without missing a beat.",
  heroImage: "/bylt/DXP_1985.jpg", // e.g. "/bylt/gronk-hero.jpg" (portrait works best)

  marqueeTop: ["BYLT FOR LIFE", "BYLT × GRONK", "4× SUPER BOWL CHAMPION", "PREMIUM BASICS", "SHOW UP"],
  marqueeBottom: ["Everyday", "Night Out", "Activewear", "The Gronk Short", "The Gronk Underwear Collection"],

  brandStory: {
    title: "BYLT for the go-getter.",
    body: "BYLT makes premium basics for people who show up for every part of the day. Tailored fits, elevated designs and better materials, made to carry you from the office to the gym to wherever the night goes.",
  },
  athleteStory: {
    title: "Gronk, off the field.",
    body: "Four Super Bowl rings, a broadcasting career, and a growing roster of businesses. Rob Gronkowski partnered with BYLT to help design clothes that keep up with all of it — and put his name on the pieces he actually lives in.",
  },

  quote: {
    text: "I know when I look good, I feel good, and when I feel good, I can perform to the best of my abilities.",
    by: "Rob Gronkowski",
  },

  shopAllHref: "/marketplace",

  looks: [
    {
      key: "night-out",
      label: "Night Out",
      blurb: "Gronk's go-to looks after dark.",
      image: "",
      products: [
        { name: "LUX Short Sleeve Button Down", price: "$75", image: "", href: "" },
        { name: "Everyday Short Sleeve Button Down", price: "$80", image: "", href: "" },
        { name: "Ribbed+ Short Sleeve Button Down", price: "$88", image: "", href: "" },
        { name: "Seersucker Short Sleeve Button Down", price: "$85", image: "", href: "" },
        { name: "Everyday Pant 2.0", price: "$128", image: "", href: "" },
        { name: "Everyday Pant 2.0 — Classic Fit", price: "$128", image: "", href: "" },
        { name: "Coastal Overshirt", price: "$125", image: "", href: "" },
        { name: "Plaid Coastal Overshirt", price: "$125", image: "", href: "" },
        { name: "Split Hem: LUX", price: "$40", image: "", href: "" },
      ],
    },
    {
      key: "activewear",
      label: "Activewear",
      blurb: "Train in it. Live in it.",
      image: "",
      products: [
        { name: "The Gronk Short — Linerless", price: "$78", image: "", href: "", tag: "Gronk Signature" },
      ],
    },
    {
      key: "underwear",
      label: "Underwear",
      blurb: "Designed by Gronk himself.",
      image: "",
      products: [
        { name: "The Gronk × BYLT Underwear Collection", price: "", image: "", href: "", tag: "Designed by Gronk" },
      ],
    },
  ] as Look[],

  socials: [
    { label: "BYLT on Instagram", handle: "@byltbasics", href: "https://www.instagram.com/byltbasics/" },
    { label: "Gronk on Instagram", handle: "@gronk", href: "https://www.instagram.com/gronk/" },
    { label: "BYLT website", handle: "byltbasics.com", href: "https://byltbasics.com" },
  ],
};

/* ============================================================================
 * BRAND TOKENS
 * ========================================================================= */
const INK = "#0b0b0c";
const BONE = "#f2eee7";
const SAND = "#c9a77c";
const HEADING = "var(--font-heading), 'Apotek Extended', 'Montserrat', sans-serif";

/* ============================================================================
 * PAGE
 * ========================================================================= */
export default function ByltGronkStorefront() {
  const s = STOREFRONT;
  const [active, setActive] = useState(s.looks[0].key);
  const look = s.looks.find((l) => l.key === active) ?? s.looks[0];

  const openLook = (key: string) => {
    setActive(key);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: BONE, color: INK }}>
      <PageStyles />
      <Navbar />

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: INK }}>
        <SpikeField className="pointer-events-none absolute inset-0 opacity-[0.07]" />
        {/* Giant jersey number */}
        <span
          aria-hidden
          className="bylt-outline pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[42vw] leading-none md:text-[30vw]"
          style={{ fontFamily: HEADING, fontWeight: 900 }}
        >
          {s.athleteNumber}
        </span>

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-6 pb-16 pt-14 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-20">
          <Reveal>
            <p className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
              <span className="h-px w-8" style={{ backgroundColor: SAND }} />
              Brand Storefront · {s.campaign}
            </p>

            <h1
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[17vw] uppercase leading-[0.85] sm:text-[13vw] lg:text-[8.5rem]"
              style={{ fontFamily: HEADING, fontWeight: 900 }}
            >
              <span>{s.brand}</span>
              <span className="text-[0.45em]" style={{ color: SAND }}>
                ×
              </span>
              <span>{s.athlete}</span>
            </h1>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {s.credentials.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1 w-1 rotate-45" style={{ backgroundColor: SAND }} />
                  {c}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-xl text-2xl font-extrabold leading-tight md:text-3xl">{s.headline}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">{s.intro}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#shop"
                className="bylt-btn inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em]"
                style={{ backgroundColor: SAND, color: INK }}
              >
                Shop the Collection <Arrow />
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center gap-2 border border-white/40 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                The Story
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div
                className="absolute -inset-3 -rotate-2 border"
                style={{ borderColor: `${SAND}66` }}
                aria-hidden
              />
              <div className="relative h-full w-full overflow-hidden bg-[#161618]">
                {s.heroImage ? (
                  <img src={s.heroImage} alt={`${s.athleteFullName} wearing BYLT`} className="h-full w-full object-cover" />
                ) : (
                  <ImagePlaceholder label={`${s.athleteFullName} · Hero Photo`} dark />
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5">
                  <span
                    className="text-lg uppercase text-white"
                    style={{ fontFamily: HEADING, fontWeight: 900 }}
                  >
                    {s.campaign}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: SAND }}>
                    No. {s.athleteNumber}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ MARQUEE ============================ */}
      <div className="overflow-hidden" aria-label="Collection highlights">
        <Marquee items={s.marqueeTop} bg={SAND} fg={INK} />
        <Marquee items={s.marqueeBottom} bg={INK} fg={BONE} reverse outline />
      </div>

      {/* ============================== STORY ============================= */}
      <section id="story" className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#8a6d47" }}>
              The Collaboration
            </p>
            <h2
              className="max-w-3xl text-4xl uppercase leading-[0.95] md:text-6xl"
              style={{ fontFamily: HEADING, fontWeight: 900 }}
            >
              Two names. One standard.
            </h2>
          </Reveal>

          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Reveal>
              <StoryCard eyebrow="The Brand" title={s.brandStory.title} body={s.brandStory.body} mark={s.brand} />
            </Reveal>
            <div className="flex items-center justify-center" aria-hidden>
              <span className="text-5xl md:text-7xl" style={{ fontFamily: HEADING, fontWeight: 900, color: SAND }}>
                ×
              </span>
            </div>
            <Reveal delay={0.1}>
              <StoryCard
                eyebrow="The Athlete"
                title={s.athleteStory.title}
                body={s.athleteStory.body}
                mark={s.athleteNumber}
                dark
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== SHOP ============================== */}
      <section id="shop" className="scroll-mt-20 bg-white px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#8a6d47" }}>
                Shop the Collection
              </p>
              <h2
                className="text-4xl uppercase leading-[0.95] md:text-6xl"
                style={{ fontFamily: HEADING, fontWeight: 900 }}
              >
                Gronk&apos;s Picks
              </h2>
            </div>
            <a
              href={s.shopAllHref}
              className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em]"
            >
              View Full Marketplace
              <span className="transition-transform group-hover:translate-x-1">
                <Arrow />
              </span>
            </a>
          </div>

          {/* Tabs */}
          <div role="tablist" aria-label="Collections" className="mt-10 flex flex-wrap gap-2 border-b border-black/10 pb-4">
            {s.looks.map((l) => {
              const on = l.key === active;
              return (
                <button
                  key={l.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(l.key)}
                  className="px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.2em] transition"
                  style={
                    on
                      ? { backgroundColor: INK, color: BONE }
                      : { backgroundColor: "transparent", color: INK, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }
                  }
                >
                  {l.label}
                  <span className="ml-2 opacity-50">{l.products.length}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-black/60">{look.blurb}</p>

          <div key={look.key} className="bylt-fade mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {look.products.map((p, i) => (
              <ProductCard key={p.name + i} product={p} fallbackHref={s.shopAllHref} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ LOOKBOOK ============================ */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ backgroundColor: INK }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: SAND }}>
              Lookbook
            </p>
            <h2
              className="text-4xl uppercase leading-[0.95] text-white md:text-6xl"
              style={{ fontFamily: HEADING, fontWeight: 900 }}
            >
              Dressed for every play.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {s.looks.map((l, i) => (
              <Reveal key={l.key} delay={i * 0.08}>
                <button
                  onClick={() => openLook(l.key)}
                  className="group relative block aspect-[3/4] w-full overflow-hidden text-left"
                >
                  {l.image ? (
                    <img
                      src={l.image}
                      alt={`${l.label} look`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <ImagePlaceholder label={`${l.label} Look`} dark index={i} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: SAND }}>
                      0{i + 1}
                    </span>
                    <h3
                      className="mt-1 text-3xl uppercase text-white"
                      style={{ fontFamily: HEADING, fontWeight: 900 }}
                    >
                      {l.label}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{l.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white">
                      Shop the look
                      <span className="transition-transform group-hover:translate-x-1">
                        <Arrow />
                      </span>
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== GRONK QUOTE =========================== */}
      <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28" style={{ backgroundColor: SAND }}>
        <SpikeField className="pointer-events-none absolute inset-0 opacity-[0.08]" />
        <div className="relative mx-auto max-w-[1100px]">
          <Reveal>
            <span
              aria-hidden
              className="block text-8xl leading-none md:text-9xl"
              style={{ fontFamily: HEADING, fontWeight: 900, color: INK }}
            >
              &ldquo;
            </span>
            <blockquote
              className="-mt-6 text-3xl uppercase leading-[1.05] md:text-5xl"
              style={{ fontFamily: HEADING, fontWeight: 900, color: INK }}
            >
              {s.quote.text}
            </blockquote>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: INK }}>
              — {s.quote.by}
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 sm:grid-cols-3">
            {s.credentials.map((c, i) => (
              <div key={c} className="p-6" style={{ backgroundColor: SAND }}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">0{i + 1}</dt>
                <dd className="mt-2 text-lg font-extrabold uppercase leading-tight" style={{ color: INK }}>
                  {c}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================ SOCIALS ============================= */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl uppercase md:text-3xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
            Follow the drop.
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {s.socials.map((so) => (
              <li key={so.href}>
                <a
                  href={so.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 border border-black/15 bg-white px-5 py-4 transition hover:border-black"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                      {so.label}
                    </span>
                    <span className="block text-sm font-extrabold">{so.handle}</span>
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">
                    <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================ AE MARKETPLACE BAND (stays AE-branded) ================ */}
      <section className="bg-gradient-to-br from-[#092866] to-[#071c4a] px-6 py-14 text-center text-white md:px-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#52aafc]">Join the Marketplace</p>
        <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">
          Shop BYLT × Gronk — and every other vetted brand, too.
        </h2>
        <a
          href="/storefront-login"
          className="mt-2 inline-block rounded-sm border border-[#52aafc] bg-[#52aafc] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#092866]"
        >
          Become a Member
        </a>
      </section>
    </div>
  );
}

/* ============================================================================
 * COMPONENTS
 * ========================================================================= */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Marquee({
  items,
  bg,
  fg,
  reverse,
  outline,
}: {
  items: string[];
  bg: string;
  fg: string;
  reverse?: boolean;
  outline?: boolean;
}) {
  const track = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-4 md:py-5" style={{ backgroundColor: bg, color: fg }}>
      <div className={`bylt-marquee flex w-max whitespace-nowrap ${reverse ? "bylt-marquee-rev" : ""}`}>
        {track.map((item, i) => (
          <span
            key={i}
            className={`mx-5 flex items-center gap-10 text-2xl uppercase md:text-4xl ${
              outline && i % 2 === 1 ? "bylt-outline-light" : ""
            }`}
            style={{ fontFamily: HEADING, fontWeight: 900 }}
          >
            {item}
            <Spike color={outline ? SAND : fg} />
          </span>
        ))}
      </div>
    </div>
  );
}

function StoryCard({
  eyebrow,
  title,
  body,
  mark,
  dark,
}: {
  eyebrow: string;
  title: string;
  body: string;
  mark: string;
  dark?: boolean;
}) {
  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden p-8 md:p-10"
      style={dark ? { backgroundColor: INK, color: BONE } : { backgroundColor: "#ffffff", color: INK }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-6 -right-2 select-none text-[9rem] leading-none md:text-[11rem] ${
          dark ? "bylt-outline" : "bylt-outline-dark"
        }`}
        style={{ fontFamily: HEADING, fontWeight: 900 }}
      >
        {mark}
      </span>
      <div className="relative">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: dark ? SAND : "#8a6d47" }}>
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl">{title}</h3>
        <p className={`mt-4 max-w-md text-sm leading-relaxed md:text-base ${dark ? "text-white/70" : "text-black/65"}`}>
          {body}
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product, fallbackHref }: { product: Product; fallbackHref: string }) {
  const href = product.href || fallbackHref;
  return (
    <a href={href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: BONE }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder label={product.name} />
        )}
        {product.tag && (
          <span
            className="absolute left-3 top-3 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em]"
            style={{ backgroundColor: INK, color: SAND }}
          >
            {product.tag}
          </span>
        )}
        <span
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 py-3 text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ backgroundColor: INK, color: BONE }}
        >
          Shop Now <Arrow />
        </span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="text-sm font-bold leading-snug">{product.name}</p>
        {product.price && <p className="shrink-0 text-sm font-extrabold">{product.price}</p>}
      </div>
    </a>
  );
}

function ImagePlaceholder({ label, dark, index = 0 }: { label: string; dark?: boolean; index?: number }) {
  const tones = dark
    ? ["from-[#1d1d20] to-[#0e0e10]", "from-[#2a241c] to-[#111012]", "from-[#1a1c20] to-[#0b0b0c]"]
    : ["from-[#ebe5da] to-[#d9cfbf]"];
  return (
    <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${tones[index % tones.length]}`}>
      <SpikeField className={`absolute inset-0 ${dark ? "opacity-[0.08]" : "opacity-[0.12]"}`} />
      <span
        className={`relative px-6 text-center text-[10px] font-bold uppercase tracking-[0.25em] ${
          dark ? "text-white/35" : "text-black/35"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/** Repeating spike pattern — a nod to the Gronk Spike. */
function SpikeField({ className = "" }: { className?: string }) {
  return (
    <svg className={className} aria-hidden width="100%" height="100%">
      <defs>
        <pattern id="bylt-spikes" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
          <path d="M22 6 L28 38 L22 32 L16 38 Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bylt-spikes)" />
    </svg>
  );
}

function Spike({ color }: { color: string }) {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden>
      <path d="M9 0 L15 22 L9 17 L3 22 Z" fill={color} />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" />
    </svg>
  );
}

function PageStyles() {
  return (
    <style>{`
      @keyframes bylt-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .bylt-marquee { animation: bylt-marquee 38s linear infinite; }
      .bylt-marquee-rev { animation-direction: reverse; }
      .bylt-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.16); }
      .bylt-outline-dark { color: transparent; -webkit-text-stroke: 1px rgba(0,0,0,0.08); }
      .bylt-outline-light { color: transparent; -webkit-text-stroke: 1px ${BONE}; }
      .bylt-btn { transition: transform .2s ease, box-shadow .2s ease; }
      .bylt-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px -10px ${SAND}; }
      @keyframes bylt-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      .bylt-fade { animation: bylt-fade .45s ease both; }
      @media (prefers-reduced-motion: reduce) {
        .bylt-marquee, .bylt-fade { animation: none; }
      }
    `}</style>
  );
}
