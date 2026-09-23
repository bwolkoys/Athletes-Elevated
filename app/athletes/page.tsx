"use client";

/**
 * Athletes Elevated — "Our Athletes" page
 * Place at:  app/athletes/page.tsx   (Next.js App Router)
 *
 * Brand guide:
 *   Navy        #092866
 *   Sky Blue    #52aafc
 *   Royal Blue  #006aac
 *   Light Gray  #c2c2c2
 *   Charcoal    #231f20
 *   Headlines:  Apotek Extended (Adobe Fonts) — falls back to Montserrat ExtraBold
 *   Body copy:  Montserrat (loaded below via next/font)
 *
 * The global top nav is intentionally not included (it lives in your layout).
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Apotek Extended is an Adobe Fonts typeface. If your Adobe kit is loaded in
// layout.tsx, this family name picks it up; otherwise Montserrat 800 is used.
const HEADLINE_FONT = `"apotek-extended", "Apotek Extended", ${montserrat.style.fontFamily}`;

/* ----------------------------------------------------------------------------
 * Athlete roster — add athletes here. `image` is optional: leave it empty to
 * show the branded placeholder. Put photos in /public/athletes/.
 * ------------------------------------------------------------------------- */
type Athlete = {
  slug: string;
  name: string;
  sport: string;
  tagline: string;
  category: string;
  image?: string;
};

const ATHLETES: Athlete[] = [
  {
    slug: "picabo-street",
    name: "Picabo Street",
    sport: "Alpine Skiing",
    tagline: "Alpine Skiing • 2× Olympic Medalist",
    category: "Olympian",
    image: "",
  },
  {
    slug: "lauren-brzozowski",
    name: "Lauren Brzozowski",
    sport: "Alpine Skiing",
    tagline: "U.S. Ski Team • Speaker • Community Leader",
    category: "Speaker",
    image: "",
  },
  { slug: "athlete-3", name: "[Athlete Name]", sport: "[Sport]", tagline: "[Sport] • [Role]", category: "[Category]" },
  { slug: "athlete-4", name: "[Athlete Name]", sport: "[Sport]", tagline: "[Sport] • [Role]", category: "[Category]" },
  { slug: "athlete-5", name: "[Athlete Name]", sport: "[Sport]", tagline: "[Sport] • [Role]", category: "[Category]" },
  { slug: "athlete-6", name: "[Athlete Name]", sport: "[Sport]", tagline: "[Sport] • [Role]", category: "[Category]" },
  { slug: "athlete-7", name: "[Athlete Name]", sport: "[Sport]", tagline: "[Sport] • [Role]", category: "[Category]" },
  { slug: "athlete-8", name: "[Athlete Name]", sport: "[Sport]", tagline: "[Sport] • [Role]", category: "[Category]" },
];

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------------- */

export default function AthletesPage() {
  const [sport, setSport] = useState("All Sports");
  const [category, setCategory] = useState("All Categories");

  const sports = useMemo(
    () => ["All Sports", ...Array.from(new Set(ATHLETES.map((a) => a.sport)))],
    []
  );
  const categories = useMemo(
    () => ["All Categories", ...Array.from(new Set(ATHLETES.map((a) => a.category)))],
    []
  );

  const filtered = ATHLETES.filter(
    (a) =>
      (sport === "All Sports" || a.sport === sport) &&
      (category === "All Categories" || a.category === category)
  );

  return (
    <main className={`${montserrat.className} min-h-screen bg-white text-[#231f20]`}>
        <Navbar />
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-[#092866] text-white">
        {/* Accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#52aafc] opacity-20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
            Athletes Elevated
          </p>
          <h1
            className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-6xl"
            style={{ fontFamily: HEADLINE_FONT }}
          >
            Our Athletes
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">
            Athletes who build their brand, give back, and bring fans inside their world — on the
            field and off it.
          </p>
        </div>
        <div className="h-1.5 w-full bg-[#52aafc]" />
      </section>

      {/* ============================ FILTER BAR ============================ */}
      <section className="border-b border-[#c2c2c2]/60 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <FilterPill label="Sport" value={sport} options={sports} onChange={setSport} />
            <FilterPill
              label="Category"
              value={category}
              options={categories}
              onChange={setCategory}
            />
            {(sport !== "All Sports" || category !== "All Categories") && (
              <button
                type="button"
                onClick={() => {
                  setSport("All Sports");
                  setCategory("All Categories");
                }}
                className="text-xs font-semibold uppercase tracking-wider text-[#006aac] hover:text-[#092866]"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-sm font-medium text-[#231f20]/60">
            <span className="font-bold text-[#092866]">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "Athlete" : "Athletes"}
          </p>
        </div>
      </section>

      {/* =========================== ATHLETE GRID =========================== */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((athlete) => (
              <AthleteCard key={athlete.slug} athlete={athlete} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-[#231f20]/60">
            No athletes match those filters yet — check back soon.
          </p>
        )}
      </section>

      {/* ========================= MARKETPLACE CTA ========================= */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
        <div className="relative overflow-hidden rounded-lg bg-[#092866] px-8 py-12 md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#006aac] opacity-40 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2
                className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl"
                style={{ fontFamily: HEADLINE_FONT }}
              >
                Shop the full marketplace
              </h2>
              <p className="mt-3 text-sm text-white/75 md:text-base">
                Browse every athlete&apos;s storefront in one place.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-md bg-[#52aafc] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#092866] transition hover:bg-white"
            >
              Visit Marketplace
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

     <Footer />
    </main>
  );
}

/* ============================== COMPONENTS ============================== */

function AthleteCard({ athlete }: { athlete: Athlete }) {
  return (
    <Link
      href={`/athletes/${athlete.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#c2c2c2]/70 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#52aafc] hover:shadow-[0_18px_40px_-18px_rgba(9,40,102,0.45)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#092866]/5">
        {athlete.image ? (
          <Image
            src={athlete.image}
            alt={athlete.name}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#eef4fb] to-[#dbe6f3] text-[#092866]/40">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
            </svg>
            <span className="text-[11px] font-medium">Athlete Photo</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#52aafc] transition-transform duration-300 group-hover:scale-x-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-[#092866]">{athlete.name}</h3>
        <p className="mt-1 text-xs text-[#231f20]/60">{athlete.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#006aac] transition group-hover:gap-2.5">
          View Profile
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function FilterPill({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none rounded-full border border-[#c2c2c2] bg-white py-2 pl-4 pr-9 text-xs font-semibold text-[#231f20] transition hover:border-[#006aac] focus:border-[#006aac] focus:outline-none focus:ring-2 focus:ring-[#52aafc]/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3.5 h-3 w-3 text-[#231f20]/60"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m3 4.5 3 3 3-3" />
      </svg>
    </label>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" />
    </svg>
  );
}