"use client";

/**
 * Athletes Elevated × Live PC Give PC — landing page (single file)
 * Place at:  app/live-pc-give-pc/page.tsx
 *
 * EDIT THE ATHLETES LIST BELOW:
 *   donationUrl — paste each athlete's Live PC Give PC donation page link.
 *                 Leave "" and the button shows "Link coming soon".
 *   image       — e.g. "/images/nate-robinson.jpg" (put the file in /public/images).
 *                 Leave "" to show the athlete's initials instead.
 *   cause       — optional: the nonprofit the athlete is giving for.
 */

import { useEffect, useState } from "react";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";

/* ============================================================================
 * CONTENT — edit here
 * ========================================================================= */

type Athlete = {
  name: string;
  sport: string;
  highlight: string;
  image: string;
  donationUrl: string;
  cause?: string;
};

const ATHLETES: Athlete[] = [
  {
    name: "Picabo Street",
    sport: "Alpine Skiing",
    highlight: "Olympic gold medalist · 2× World Cup downhill champion",
    image: "/images/picabo-street-thumbnail.png",
    donationUrl: "https://www.livepcgivepc.org/group/pstreet",
    cause: "",
  },
  {
    name: "Steven Nyman",
    sport: "Alpine Skiing",
    highlight: "3× Olympian · 3 World Cup downhill wins",
    image: "/lpcgpc/steven_nyman.jpg",
    donationUrl: "https://www.livepcgivepc.org/group/snyman",
    cause: "",
  },
  {
    name: "Lauren Macuga",
    sport: "Alpine Skiing",
    highlight: "Park City native · World Cup super-G winner · 2025 Worlds bronze",
    image: "/lpcgpc/Lauren-Macuga.png",
    donationUrl: "https://www.livepcgivepc.org/group/lmacuga",
    cause: "",
  },
  {
    name: "Nate Roberts",
    sport: "Moguls",
    highlight: "Park City · 2005 world champion · 2010 Olympian",
    image: "",
    donationUrl: "https://www.livepcgivepc.org/group/nroberts",
    cause: "",
  },
  {
    name: "Hannah Kearney",
    sport: "Moguls",
    highlight: "Olympic gold (2010) & bronze (2014) · 46 World Cup wins",
    image: "/lpcgpc/hannah_kearney.webp",
    donationUrl: "https://www.livepcgivepc.org/group/hkearney",
    cause: "",
  },
  {
    name: "Devin Logan",
    sport: "Freeskiing",
    highlight: "Olympic silver medalist, slopestyle (2014)",
    image: "/lpcgpc/devin_logan.jpeg",
    donationUrl: "https://www.livepcgivepc.org/group/dlogan",
    cause: "",
  },
  {
    name: "Nick Page",
    sport: "Moguls",
    highlight: "Park City · 2× Olympian (2022, 2026)",
    image: "/lpcgpc/nick-page.jpg",
    donationUrl: "https://www.livepcgivepc.org/group/npaige",
    cause: "",
  },
  {
    name: "Ashley Battersby",
    sport: "Freeskiing",
    highlight: "X Games medalist · U.S. Open slopestyle champion",
    image: "/lpcgpc/ashley_battersby.webp",
    donationUrl: "https://www.livepcgivepc.org/group/abattersby",
    cause: "",
  },
];

const EVENT = {
  // Giving day runs midnight to midnight, Mountain Time (MST = UTC-7 in November).
  start: "2026-11-06T00:00:00-07:00",
  end: "2026-11-07T00:00:00-07:00",
  dateLabel: "Friday, Nov. 6, 2026",
  officialSite: "https://www.livepcgivepc.org/",
  lastYear: "$5.5M",
};

/* ============================================================================
 * BRAND TOKENS
 * ========================================================================= */
// Athletes Elevated brand palette
const NIGHT = "#080F1C"; // matches the site navbar
const NAVY = "#092866"; // AE navy
const SKY = "#52aafc"; // AE sky blue (accent)
const ROYAL = "#006aac"; // AE royal blue
const GRAY = "#c2c2c2"; // AE light gray
const CHARCOAL = "#231f20"; // AE charcoal
const HEADING = "var(--font-heading), 'Apotek Extended', 'Montserrat', sans-serif";

/* ============================================================================
 * PAGE
 * ========================================================================= */
export default function LivePcGivePc() {
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#ffffff", color: NAVY }}>
      <PageStyles />
      <Navbar />

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden pt-16 text-white" style={{ backgroundColor: NIGHT }}>
        <Mountains className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: SKY }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
          <p className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
            <span>Athletes Elevated</span>
            <span style={{ color: SKY }}>×</span>
            <span>Live PC Give PC</span>
          </p>

          <h1
            className="max-w-4xl text-5xl uppercase leading-[0.92] md:text-7xl lg:text-8xl"
            style={{ fontFamily: HEADING, fontWeight: 900 }}
          >
            Nine athletes. <span style={{ color: SKY }}>One town.</span> One day to give.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            On {EVENT.dateLabel}, Park City and Summit County come together for Live PC Give PC — 24
            hours of giving to local nonprofits. Nine Athletes Elevated athletes are rallying their
            fans behind it. Pick an athlete and give through their donation page.
          </p>

          <Countdown />

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#athletes"
              className="lp-btn inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em]"
              style={{ backgroundColor: SKY, color: NIGHT }}
            >
              Choose an Athlete <Arrow />
            </a>
            <a
              href={EVENT.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/40 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-[#080F1C]"
            >
              About Live PC Give PC
            </a>
          </div>
        </div>
      </section>
      <div className="h-1.5 w-full" style={{ backgroundColor: SKY }} />

      {/* ========================== HOW IT WORKS ========================== */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: SKY }}>
            How it works
          </p>
          <h2 className="max-w-3xl text-3xl uppercase leading-[0.95] md:text-5xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
            Three steps. Real local impact.
          </h2>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Pick your athlete",
                body: "Choose one of the nine Athletes Elevated athletes below — your favorite, your hometown hero, or all nine.",
              },
              {
                title: "Give on their page",
                body: "Each button opens that athlete's Live PC Give PC donation page, where you give securely in a few clicks.",
              },
              {
                title: "Park City wins",
                body: "Gifts go to local nonprofits through Live PC Give PC, powered by the Park City Community Foundation.",
              },
            ].map((step, i) => (
              <li key={step.title} className="relative border bg-white p-8" style={{ borderColor: GRAY }}>
                <span
                  className="text-5xl leading-none"
                  style={{ fontFamily: HEADING, fontWeight: 900, color: SKY }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: CHARCOAL }}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ ATHLETES ============================ */}
      <section id="athletes" className="scroll-mt-20 px-6 py-20 md:py-24" style={{ backgroundColor: "#f4f6fb" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: SKY }}>
                Give with an athlete
              </p>
              <h2 className="text-3xl uppercase leading-[0.95] md:text-5xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
                Team Athletes Elevated
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#092866]/70">
              Olympians, world champions and a three-time Slam Dunk champ — all giving back to the
              mountain town that shaped them.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ATHLETES.map((a, i) => (
              <AthleteCard key={a.name} athlete={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ IMPACT ============================== */}
      <section className="relative overflow-hidden px-6 py-20 text-white md:py-24" style={{ backgroundColor: NAVY }}>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: ROYAL }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: SKY }}>
              Why it matters
            </p>
            <h2 className="text-3xl uppercase leading-[0.95] md:text-5xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
              One day. The whole community.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
              Live PC Give PC is Park City&apos;s annual day of giving, powered by the Park City
              Community Foundation. Every gift — big or small — helps the local nonprofits that keep
              this community strong all year long.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/15">
            {[
              { value: EVENT.lastYear, label: "Raised in 24 hours last year" },
              { value: "24", label: "Hours to give" },
              { value: "9", label: "Athletes Elevated athletes" },
              { value: "1", label: "Community" },
            ].map((s) => (
              <div key={s.label} className="p-6" style={{ backgroundColor: NAVY }}>
                <p className="text-4xl md:text-5xl" style={{ fontFamily: HEADING, fontWeight: 900, color: SKY }}>
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FINAL CTA =========================== */}
      <section
        className="px-6 py-20 text-center text-white md:py-24"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${ROYAL} 100%)` }}
      >
        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: SKY }}>{EVENT.dateLabel} · 24 hours</p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-4xl uppercase leading-[0.95] md:text-6xl"
          style={{ fontFamily: HEADING, fontWeight: 900 }}
        >
          Live PC. Give PC.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-medium text-white/80">
          Choose your athlete, make your gift, and help Park City do what it does best — show up
          for each other.
        </p>
        <a
          href="#athletes"
          className="lp-btn mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em]"
          style={{ backgroundColor: SKY, color: NIGHT }}
        >
          Give with an Athlete <Arrow />
        </a>
      </section>

      <Footer />
    </div>
  );
}

/* ============================================================================
 * COMPONENTS
 * ========================================================================= */

function AthleteCard({ athlete, index }: { athlete: Athlete; index: number }) {
  const first = athlete.name.split(" ")[0];
  const initials = athlete.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const live = Boolean(athlete.donationUrl);

  return (
    <article className="group flex flex-col overflow-hidden border border-[#092866]/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(9,40,102,0.55)]">
      <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: NIGHT }}>
        {athlete.image ? (
          <img
            src={athlete.image}
            alt={athlete.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            <Mountains className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-60" />
            <span
              className="relative text-7xl text-white/90"
              style={{ fontFamily: HEADING, fontWeight: 900 }}
            >
              {initials}
            </span>
          </div>
        )}
        <span
          className="absolute left-4 top-4 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em]"
          style={{ backgroundColor: SKY, color: NIGHT }}
        >
          {athlete.sport}
        </span>
        <span className="absolute right-4 top-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
          {String(index + 1).padStart(2, "0")} / 09
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl uppercase leading-tight" style={{ fontFamily: HEADING, fontWeight: 900 }}>
          {athlete.name}
        </h3>
        <p className="mt-2 text-sm text-[#092866]/70">{athlete.highlight}</p>
        {athlete.cause && (
          <p className="mt-3 text-xs font-semibold text-[#092866]">
            Giving for: <span style={{ color: ROYAL }}>{athlete.cause}</span>
          </p>
        )}

        <div className="mt-auto pt-6">
          {live ? (
            <a
              href={athlete.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-btn flex w-full items-center justify-center gap-2 py-3.5 text-xs font-extrabold uppercase tracking-[0.2em]"
              style={{ backgroundColor: SKY, color: NIGHT }}
            >
              Donate with {first} <Arrow />
            </a>
          ) : (
            <span className="flex w-full cursor-not-allowed items-center justify-center py-3.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#092866]/45 ring-1 ring-inset ring-[#092866]/15">
              Donation link coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/** Live countdown to the giving day, then "live now", then "thank you". */
function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(EVENT.start).getTime();
  const end = new Date(EVENT.end).getTime();

  if (now === null) return <div className="mt-10 h-[92px]" aria-hidden />;

  if (now >= end) {
    return (
      <p className="mt-10 inline-block border-l-4 pl-4 text-lg font-extrabold" style={{ borderColor: SKY }}>
        Thank you, Park City. Live PC Give PC 2026 is a wrap.
      </p>
    );
  }

  const live = now >= start;
  const diff = Math.max(0, (live ? end : start) - now);
  const parts = [
    { label: "Days", value: Math.floor(diff / 86_400_000) },
    { label: "Hours", value: Math.floor((diff / 3_600_000) % 24) },
    { label: "Minutes", value: Math.floor((diff / 60_000) % 60) },
    { label: "Seconds", value: Math.floor((diff / 1000) % 60) },
  ];

  return (
    <div className="mt-10">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: SKY }}>
        {live && <span className="lp-pulse inline-block h-2 w-2 rounded-full" style={{ backgroundColor: SKY }} />}
        {live ? "Giving is live — time left" : "Giving opens in"}
      </p>
      <div className="flex gap-2 sm:gap-3" role="timer" aria-live="off">
        {parts.map((p) => (
          <div key={p.label} className="min-w-[68px] border border-white/15 bg-white/5 px-3 py-3 text-center backdrop-blur sm:min-w-[84px]">
            <p className="text-3xl tabular-nums sm:text-4xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
              {String(p.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">{p.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Layered mountain ridgeline — a nod to the Wasatch. */
function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden>
      <path d="M0 400 L0 250 L180 140 L320 230 L520 90 L700 210 L860 120 L1040 230 L1220 110 L1440 220 L1440 400 Z" fill="#0f1d38" />
      <path d="M0 400 L0 300 L220 210 L400 290 L600 180 L780 280 L980 200 L1180 290 L1440 230 L1440 400 Z" fill="#132a52" />
      <path d="M520 90 L560 118 L540 116 L520 130 L500 116 L480 118 Z M1220 110 L1256 134 L1238 133 L1220 146 L1202 133 L1184 134 Z" fill="#ffffff" opacity="0.5" />
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
      .lp-btn { transition: transform .2s ease, box-shadow .2s ease; }
      .lp-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -12px ${SKY}; }
      @keyframes lp-pulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }
      .lp-pulse { animation: lp-pulse 1.4s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) { .lp-pulse { animation: none; } }
    `}</style>
  );
}
