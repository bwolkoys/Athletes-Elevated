import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import NewsletterForm from "../app/src/components/newsletterForm";
import HeroSection from "./heroSection";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const tickerItems = [
  "Community Connection",
  "Impact",
  "Growth",
  "Athlete First",
  "Performance With Purpose",
];

const values = [
  {
    number: "01",
    tag: "Athlete First",
    title: "Built around people",
    body: "We show up for the human behind the results.",
    icon: (
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    ),
  },
  {
    number: "02",
    tag: "Success × Impact",
    title: "Performance with purpose",
    body: "Success is even sweeter when it lifts others. We tie performance to something bigger than a result.",
    icon: (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    ),
  },
  {
    number: "03",
    tag: "Community Connection",
    title: "Stronger together",
    body: "Strong communities make strong athletes — and athletes strengthen their communities right back.",
    icon: (
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    ),
  },
];

const serveCards = [
  {
    eyebrow: "For Athletes",
    title: "Chase your potential.\nBuild your legacy.",
    subtitle: "Discipline. Courage. Growth.",
    body: "For those putting in the daily work — building a life around discipline, courage, and growth. We show up for you beyond the highlight reel.",
    href: "#newsletter",
    cta: "Get Involved",
    // primary navy
    bg: "bg-[#092866]",
  },
  {
    eyebrow: "For Brands",
    title: "Be part of the journey,\nnot just the moment.",
    subtitle: "Real. Lasting. Aligned.",
    body: "Partners who want to support athletes in real, lasting ways. We're building a network of people and brands who believe in what athletes stand for.",
    href: "https://www.wixforms.com/f/7396687400686060560",
    cta: "Partner With Us",
    // mid blue — creates contrast between the two cards
    bg: "bg-[#006aac]",
  },
];

const nonprofits = [
  {
    name: "Park City Community Foundation",
    body: "Strengthening local nonprofits and addressing urgent community needs across Park City and Summit County.",
    href: "https://parkcitycf.fcsuite.com/erp/donate",
  },
  {
    name: "West Ham United Foundation",
    body: "Using the power of football to help communities thrive across East London and beyond.",
    href: "https://www.whufc.com/en/the-club/community/foundation",
  },
  {
    name: "McKenna Claire Foundation",
    body: "Advancing research and awareness for pediatric brain cancer — because no family should face this alone.",
    href: "https://mckennaclairefoundation.org/donate/",
  },
];

const partners = [
  "Essex Mortgage",
  "Salt Box PC",
  "Holistic Beverages",
  "TBX Golf",
  "Essex Shield",
  "Bloom Intelligence",
  "Dos Amigos",
  "Mother's Comfort Foods",
];

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
        light ? "text-[#52aafc]" : "text-[#52aafc]"
      }`}
    >
      {/* 3px tall rule to match brand weight */}
      <span className="h-.75 w-7 bg-[#52aafc] shrink-0" />
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center gap-2 bg-[#52aafc] px-8 py-4
        text-[13px] font-semibold uppercase tracking-widest text-[#092866]
        transition-all duration-200
        hover:-translate-y-0.5 hover:bg-[#7dc0fd] hover:shadow-[0_8px_24px_rgba(82,170,252,0.35)]
        active:translate-y-0 active:shadow-none
      "
    >
      {children}
    </Link>
  );
}

function OutlineButton({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="
        inline-flex items-center gap-2 border border-white/25 px-8 py-3.5
        text-[13px] font-medium uppercase tracking-widest text-white
        transition-all duration-200
        hover:border-[#52aafc] hover:text-[#52aafc] hover:bg-[#52aafc]/8
      "
    >
      {children}
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main
      className={`${montserrat.variable} ${barlow.variable} font-(family-name:--font-montserrat) overflow-x-hidden bg-white text-[#231f20]`}
    >
      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#52aafc]/15 bg-[rgba(9,40,102,0.97)] backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-350 items-center justify-between px-[5vw]">
          {/* wordmark — Barlow Condensed 800 to match brand "ELEVATED" weight */}
          <Link
            href="#"
            className="font-(family-name:--font-barlow) text-[22px] font-extrabold leading-none tracking-[0.06em] text-white transition-opacity hover:opacity-80"
          >
            ATHLETES <span className="text-[#52aafc]">ELEVATED</span>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {(["Values", "Who We Serve", "Impact"] as const).map((label) => (
              <li key={label}>
                <Link
                  href={`#${
                    label === "Who We Serve" ? "serve" : label.toLowerCase()
                  }`}
                  className="
                    text-[13px] font-medium uppercase tracking-[0.08em] text-white/60
                    relative after:absolute after:-bottom-0.5 after:left-0 after:h-0.5
                    after:w-0 after:bg-[#52aafc] after:transition-all after:duration-250
                    hover:text-[#52aafc] hover:after:w-full transition-colors duration-200
                  "
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#newsletter"
                className="
                  bg-[#52aafc] px-5 py-2.5 text-[13px] font-semibold uppercase
                  tracking-[0.08em] text-[#092866]
                  transition-all duration-200
                  hover:-translate-y-px hover:bg-[#7dc0fd] hover:shadow-[0_4px_16px_rgba(82,170,252,0.4)]
                "
              >
                Join The List
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <HeroSection />

      {/* ── TICKER — blue background per brand ─────────────────────────────── */}
      <div className="overflow-hidden bg-[#52aafc] py-3.5">
        <div className="flex min-w-max animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-(family-name:--font-barlow) inline-flex items-center gap-10 px-10 text-[15px] font-bold tracking-[0.14em] uppercase text-[#092866] after:content-['▲'] after:text-[9px] after:opacity-40"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── VALUES ─────────────────────────────────────────────────────────── */}
      <section id="values" className="px-[8vw] py-28">
        <SectionLabel>Guided by Values</SectionLabel>
        <h2 className="font-(family-name:--font-barlow) mb-4 text-[clamp(36px,4vw,56px)] font-extrabold uppercase leading-none tracking-[0.01em] text-[#092866]">
          What we stand for
        </h2>
        <p className="max-w-135 text-[17px] font-light leading-[1.75] text-[#231f20]/55">
          Every relationship we build starts with a shared commitment to the
          things that actually last.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-0.5 bg-[#092866]/8 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.number}
              className="
                group relative overflow-hidden border border-[#092866]/10 bg-white px-10 py-12
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(9,40,102,0.1)]
                hover:border-[#52aafc]
              "
            >
              {/* animated top bar on hover */}
              <div className="absolute left-0 top-0 h-0.75 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-350 group-hover:scale-x-100" />

              <span className="font-(family-name:--font-barlow) pointer-events-none absolute right-5 top-3 text-[80px] font-extrabold leading-none text-[#092866]/4 transition-all duration-300 group-hover:text-[#52aafc]/10 group-hover:right-3">
                {value.number}
              </span>

              {/* icon box — slides up slightly on hover */}
              <div className="mb-7 flex h-12 w-12 items-center justify-center bg-[#092866] transition-all duration-300 group-hover:bg-[#52aafc] group-hover:-translate-y-1">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-[#52aafc] transition-colors duration-300 group-hover:fill-[#092866]"
                >
                  {value.icon}
                </svg>
              </div>

              <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#52aafc]">
                {value.tag}
              </span>
              <h3 className="font-(family-name:--font-barlow) mb-3 text-[22px] font-bold uppercase tracking-[0.02em] text-[#092866] transition-colors duration-200 group-hover:text-[#006aac]">
                {value.title}
              </h3>
              <p className="text-[15px] font-light leading-[1.75] text-[#231f20]/55">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE SERVE ───────────────────────────────────────────────────── */}
      <section id="serve" className="bg-[#f0f5fd] px-[8vw] py-28">
        <SectionLabel>Who We Serve</SectionLabel>
        <h2 className="font-(family-name:--font-barlow) mb-4 text-[clamp(36px,4vw,56px)] font-extrabold uppercase leading-none tracking-[0.01em] text-[#092866]">
          Everyone plays a role
          <br />
          in elevation
        </h2>
        <p className="max-w-135 text-[17px] font-light leading-[1.75] text-[#231f20]/55">
          Athletes Elevated is built for the people who move sport forward.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-1 lg:grid-cols-2">
          {serveCards.map((card) => (
            <div
              key={card.eyebrow}
              className={`group relative overflow-hidden px-12 py-14 ${card.bg} transition-all duration-300 hover:brightness-110`}
            >
              {/* decorative triangle — shifts on hover */}
              <svg
                viewBox="0 0 280 280"
                fill="none"
                className="absolute -bottom-14 right-8 h-64 w-64 opacity-[0.07] transition-all duration-500 group-hover:opacity-[0.12] group-hover:-bottom-8 group-hover:right-4"
              >
                <polygon points="140,20 270,250 10,250" fill="white" />
              </svg>

              <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#52aafc]">
                {card.eyebrow}
              </span>
              <h3 className="font-(family-name:--font-barlow) mb-2 whitespace-pre-line text-[36px] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-white">
                {card.title}
              </h3>
              <span className="mb-6 block text-sm font-medium tracking-[0.06em] text-[#52aafc]/70">
                {card.subtitle}
              </span>
              <p className="mb-9 max-w-95 text-[15px] font-light leading-[1.8] text-white/55">
                {card.body}
              </p>
              <Link
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                className="
                  inline-flex items-center gap-2 border-b border-[#52aafc]/35 pb-1
                  text-xs font-bold uppercase tracking-widest text-[#52aafc]
                  transition-all duration-200
                  hover:gap-4 hover:border-white hover:text-white
                "
              >
                {card.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPACT ─────────────────────────────────────────────────────────── */}
      <section id="impact" className="bg-[#092866] px-[8vw] py-28">
        <SectionLabel>Impact</SectionLabel>
        <h2 className="font-(family-name:--font-barlow) mb-4 text-[clamp(36px,4vw,56px)] font-extrabold uppercase leading-none tracking-[0.01em] text-white">
          Nonprofits we champion
        </h2>
        {/* 100% callout */}
        <div className="mt-10 inline-flex flex-wrap items-center gap-4 border-l-[3px] border-l-[#52aafc] bg-[#52aafc]/8 px-8 py-6">
          <span className="font-(family-name:--font-barlow) text-5xl font-extrabold leading-none text-[#52aafc]">
            100%
          </span>
          <span className="max-w-115 text-[13px] font-light leading-normal text-white/55">
            <strong className="block font-semibold text-white">
              Donations pass-through
            </strong>
            Every dollar donated goes directly to the nonprofit — no platform
            fees, no overhead deductions.
          </span>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-0.5 md:grid-cols-3">
          {nonprofits.map((item) => (
            <div
              key={item.name}
              className="
                group relative overflow-hidden border border-[#52aafc]/12
                bg-white/4 px-9 py-11
                transition-all duration-300
                hover:border-[#52aafc]/35 hover:bg-[#52aafc]/[0.07]
                hover:-translate-y-1
              "
            >
              {/* reveal bar */}
              <div className="absolute left-0 top-0 h-0.75 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-350 group-hover:scale-x-100" />

              <h3 className="font-(family-name:--font-barlow) mb-4 text-[22px] font-bold uppercase leading-[1.2] tracking-[0.02em] text-white">
                {item.name}
              </h3>
              <p className="mb-8 text-sm font-light leading-[1.8] text-white/50">
                {item.body}
              </p>
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-1 border border-[#52aafc]/30
                  px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#52aafc]
                  transition-all duration-200
                  hover:bg-[#52aafc] hover:text-[#092866] hover:border-[#52aafc]
                  hover:gap-3 hover:px-5
                "
              >
                Donate →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERS ───────────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-white py-20 border-y border-[#092866]/8">
        <div className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c2c2c2]">
          Ecosystem Partners
        </div>
        <div className="flex min-w-max animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...partners, ...partners].map((partner, i) => (
            <span
              key={`${partner}-${i}`}
              className="
                font-(family-name:--font-barlow) inline-flex items-center px-10
                text-[15px] font-semibold uppercase tracking-widest text-[#092866]/30
                transition-colors duration-200 cursor-default
                hover:text-[#52aafc]
              "
            >
              {partner}
            </span>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────────────────────── */}
      <section id="newsletter" className="px-[8vw] bg-[#f0f5fd] py-28">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div>
            <SectionLabel>Get Involved</SectionLabel>
            <h2 className="font-(family-name:--font-barlow) mb-4 text-[clamp(36px,4vw,56px)] font-extrabold uppercase leading-none tracking-[0.01em] text-[#092866]">
              Stay connected
            </h2>
            <p className="max-w-120 text-[17px] font-light leading-[1.75] text-[#231f20]/55">
              Join our list to hear what&apos;s taking shape and where
              we&apos;re headed next.
            </p>
            <NewsletterForm />
          </div>

          <div className="pt-5">
            <div className="font-(family-name:--font-barlow) mb-6 text-[clamp(60px,6vw,90px)] font-extrabold uppercase leading-[0.92] tracking-[0.01em] text-[#092866]">
              READY TO BE APART OF
              <span className="text-[#52aafc]"> SOMETHING BIGGER?</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#092866] px-[8vw] pb-8 pt-14">
        <div className="flex flex-wrap items-start justify-between gap-12 border-b border-[#52aafc]/10 pb-12">
          <div>
            <div className="font-(family-name:--font-barlow) mb-3 text-[28px] font-extrabold tracking-[0.06em] text-white uppercase">
              ATHLETES <span className="text-[#52aafc]">ELEVATED</span>
            </div>
            <p className="max-w-65 text-sm font-light leading-[1.65] text-white/35">
              Built for athletes, powered by purpose, and focused on meaningful
              community impact.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            {[
              { label: "Values", href: "#values" },
              { label: "Who We Serve", href: "#serve" },
              { label: "Impact", href: "#impact" },
              { label: "Newsletter", href: "#newsletter" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[13px] text-white/35 transition-colors duration-200 hover:text-[#52aafc]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-7">
          <p className="text-xs text-white/22">
            © 2026 Athletes Elevated. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
