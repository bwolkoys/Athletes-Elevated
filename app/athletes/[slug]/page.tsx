/**
 * Athletes Elevated — Athlete Spotlight page
 * Place at:  app/athletes/[slug]/page.tsx   (Next.js App Router)
 *
 * Renders whichever athlete was clicked on /athletes, e.g.
 *   /athletes/picabo-street  →  Picabo's spotlight
 * All content comes from Airtable via lib/athletes.ts. A new published
 * athlete in Airtable gets a page automatically — no code changes.
 * The global top nav is intentionally not included (it lives in your layout).
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { montserrat, HEADLINE_FONT } from "../../lib/brand";
import {
  getAthletes,
  getAthlete,
  pronounWords,
  type Cause,
  type ContentItem,
} from "../../lib/athletes";
import ProductCarousel from "./ProductCarousel";
import Footer from "@/app/src/components/footer";

type PageProps = { params: Promise<{ slug: string }> };

// Re-check Airtable every 60 seconds (keep in sync with REVALIDATE_SECONDS in lib/athletes.ts)
export const revalidate = 60;
// Athletes added after the last deploy still get a page on first visit.
export const dynamicParams = true;

/** Pre-build a page for every published athlete in Airtable. */
export async function generateStaticParams() {
  const athletes = await getAthletes();
  return athletes.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const athlete = await getAthlete(slug);
  if (!athlete) return { title: "Athlete not found | Athletes Elevated" };
  return {
    title: `${athlete.name} | Athletes Elevated`,
    description: athlete.heroBlurb,
  };
}

export default async function AthleteSpotlightPage({ params }: PageProps) {
  const { slug } = await params;
  const athlete = await getAthlete(slug);
  if (!athlete) notFound();

  const { possessive, standsFor } = pronounWords(athlete.pronoun);

  return (
    <main className={`${montserrat.className} min-h-screen bg-white text-[#231f20]`}>
      {/* ============================ BREADCRUMB ============================ */}
      <div className="border-b border-[#c2c2c2]/60 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-3 md:px-10">
          <Link
            href="/athletes"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#231f20]/70 transition hover:text-[#006aac]"
          >
            <ArrowIcon className="rotate-180" />
            All Athletes
          </Link>
        </div>
      </div>

      {/* =========================== HERO + STATS =========================== */}
      <section className="grid bg-[#092866] lg:grid-cols-[42%_58%]">
        <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[560px]">
          {athlete.heroImage ? (
            <Image
              src={athlete.heroImage}
              alt={athlete.name}
              fill
              priority
              sizes="(min-width:1024px) 42vw, 100vw"
              className="object-cover"
            />
          ) : (
            <Placeholder label="Hero Photo" dark />
          )}
        </div>

        <div className="relative overflow-hidden px-6 py-14 text-white md:px-12 lg:px-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-[#52aafc] opacity-20 blur-3xl"
          />
          <div className="relative flex h-full max-w-2xl flex-col justify-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
              {athlete.sport}
            </p>
            <h1
              className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-6xl"
              style={{ fontFamily: HEADLINE_FONT }}
            >
              {athlete.name}
            </h1>
            <p className="mt-6 text-base font-light leading-relaxed text-white/80 md:text-lg">
              {athlete.heroBlurb}
            </p>

            {athlete.stats.length > 0 && (
              <ul className="mt-10 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
                {athlete.stats.map((s, i) => (
                  <li key={i} className="border-l-2 border-[#52aafc] pl-4">
                    <p className="text-sm font-semibold leading-snug text-white">{s.label}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <div className="h-1.5 w-full bg-[#52aafc]" />

      {/* ============ WHAT THEY USE (rotating)  |  WHAT THEY STAND FOR ============ */}
      <section className="bg-[#f4f6fb]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* ---------- Left: products, one at a time ---------- */}
          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#006aac]">
                  Athlete products
                </p>
                <SectionHeading>What {athlete.firstName} Uses</SectionHeading>
              </div>
              <Link
                href={athlete.marketplaceHref}
                className="inline-flex items-center gap-2 bg-[#092866] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#006aac]"
              >
                Shop {athlete.firstName}&apos;s Store
                <ArrowIcon />
              </Link>
            </div>
            <ProductCarousel
              products={athlete.products}
              firstName={athlete.firstName}
              storeHref={athlete.marketplaceHref}
            />
          </div>

          {/* ---------- Right: causes ---------- */}
          <aside className="border border-[#c2c2c2]/70 bg-white p-6 md:p-7 lg:mt-[76px]">
            <SectionHeading small>What {standsFor}</SectionHeading>
            <div className="mt-5 flex flex-col gap-4">
              {athlete.causes.length > 0 ? (
                athlete.causes.map((c, i) => <CauseCard key={i} cause={c} />)
              ) : (
                <div className="flex items-start gap-4 rounded-lg border border-dashed border-[#c2c2c2] p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#52aafc]/10 text-[#006aac]/40">
                    <HeartIcon />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#231f20]/35">Cause coming soon</h3>
                    <p className="mt-1 text-sm text-[#231f20]/35">The charity {athlete.firstName} supports will appear here.</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ========================= ORIGINAL CONTENT ========================= */}
      {(
        <section className="border-t border-[#c2c2c2]/60">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <SectionHeading>In {possessive} Words</SectionHeading>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {athlete.content.map((item, i) => (
                <ContentCard key={i} item={item} />
              ))}
              {athlete.content.length === 0 &&
                (["video", "article", "social"] as const).map((t) => (
                  <ContentCard key={t} item={{ type: t, title: "Coming soon", href: "#", slug: t, hasPage: false, body: [] }} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================== FOOTER ============================== */}
      
      <Footer />
    </main>
  );
}

/* ============================== COMPONENTS ============================== */

function SectionHeading({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <h2
      className={`font-extrabold uppercase tracking-tight text-[#092866] ${
        small ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
      }`}
      style={{ fontFamily: HEADLINE_FONT }}
    >
      {children}
    </h2>
  );
}

function CauseCard({ cause }: { cause: Cause }) {
  const inner = (
    <div className="flex items-start gap-4 rounded-lg border border-[#c2c2c2]/70 bg-white p-5 transition hover:border-[#52aafc]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#52aafc]/15 text-[#006aac]">
        <HeartIcon />
      </span>
      <div>
        <h3 className="text-sm font-bold text-[#231f20]">{cause.name}</h3>
        <p className="mt-1 text-sm text-[#231f20]/65">{cause.description}</p>
      </div>
    </div>
  );
  return cause.href ? (
    <Link href={cause.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </Link>
  ) : (
    inner
  );
}

function ContentCard({ item }: { item: ContentItem }) {
  const external = item.href.startsWith("http");
  return (
    <Link
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#eef4fb] to-[#dbe6f3]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width:768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#092866]/35">
            <ContentIcon type={item.type} />
          </div>
        )}
        {item.type === "video" && item.image && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#092866]/20">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#092866]">
              <ContentIcon type="video" />
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#52aafc] transition-transform duration-300 group-hover:scale-x-100" />
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#006aac]">
        {item.type}
      </p>
      <h3 className="mt-1 text-base font-bold text-[#231f20] group-hover:text-[#092866]">
        {item.title}
      </h3>
    </Link>
  );
}

function Placeholder({ label, dark, small }: { label?: string; dark?: boolean; small?: boolean }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 ${
        dark
          ? "bg-gradient-to-b from-[#12367f] to-[#0b2c6e] text-white/35"
          : "bg-gradient-to-b from-[#eef4fb] to-[#dbe6f3] text-[#092866]/35"
      }`}
    >
      <svg
        width={small ? 20 : 36}
        height={small ? 20 : 36}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
      </svg>
      {label && <span className="text-[11px] font-medium">{label}</span>}
    </div>
  );
}

function ContentIcon({ type }: { type: ContentItem["type"] }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 };
  if (type === "video")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="m10 8 6 4-6 4V8Z" />
      </svg>
    );
  if (type === "article")
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" />
    </svg>
  );
}