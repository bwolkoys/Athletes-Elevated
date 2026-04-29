import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import NewsletterForm from "../app/src/components/newsletterForm";

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

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative grid min-h-screen items-center overflow-hidden bg-[linear-gradient(135deg,#061a42_0%,#092866_45%,#0d3b8c_100%)] pt-18 lg:grid-cols-2">
        {/* soft glow only — no checkered/grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_75%_45%,rgba(82,170,252,0.16)_0%,transparent_68%),radial-gradient(ellipse_45%_50%_at_15%_85%,rgba(82,170,252,0.10)_0%,transparent_65%)]" />

        {/* left — copy */}
        <div className="relative z-10 px-6 py-16 sm:px-[8vw] lg:pr-[5vw]">
          <div className="mb-7 inline-flex max-w-full items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52aafc] sm:text-[11px] sm:tracking-[0.22em]">
            <span className="h-0.75 w-7 shrink-0 bg-[#52aafc] sm:w-8" />
            <span>Built for Athletes. Powered by Purpose.</span>
          </div>

          <h1 className="font-(family-name:--font-barlow) mb-7 max-w-full text-[clamp(50px,15vw,108px)] font-extrabold uppercase leading-[0.92] tracking-[0.01em] text-white">
            Performance
            <span className="block text-[#52aafc]">meets purpose.</span>
          </h1>

          <p className="mb-11 max-w-115 text-base font-light leading-[1.65] text-white/65 sm:text-lg">
            Athletes Elevated supports the people behind the results —
            connecting athletes, brands, and communities around shared values of
            integrity, impact, and growth.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <PrimaryButton href="#newsletter">Join The List</PrimaryButton>
            <OutlineButton
              href="https://www.wixforms.com/f/7396687400686060560"
              external
            >
              Partner With Us
            </OutlineButton>
          </div>
        </div>

        {/* right — stat cards */}
        <div className="relative z-10 hidden items-center justify-center px-[8vw] py-15 lg:flex lg:pr-0">
          <div className="flex flex-col items-start gap-0">
            {[
              ["3", "Nonprofits Supported"],
              ["100%", "Donations Pass-Through"],
              ["2026", "Big Things Coming"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="
            group w-64 border-l-[3px] border-l-[#52aafc] bg-white/4 px-8 py-7
            transition-all duration-300
            hover:bg-[#52aafc]/10 hover:border-l-[#52aafc] hover:pl-10
          "
              >
                <span className="font-(family-name:--font-barlow) block text-[52px] font-extrabold leading-none text-[#52aafc] tracking-tight transition-colors duration-200 group-hover:text-white">
                  {value}
                </span>
                <span className="mt-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/45 transition-colors duration-200 group-hover:text-white/70">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

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

// import Link from 'next/link';
// import { Bebas_Neue, DM_Sans, DM_Serif_Display } from 'next/font/google';
// import NewsletterForm from '../app/src/components/newsletterForm';

// const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });
// const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
// const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' });

// const tickerItems = [
//   'Community Connection',
//   'Impact',
//   'Growth',
//   'Athlete First',
//   'Performance With Purpose',
// ];

// const values = [
//   {
//     number: '01',
//     tag: 'Athlete First',
//     title: 'Built around people',
//     body: 'We show up for the human behind the results.',
//     icon: (
//       <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//     ),
//   },
//   {
//     number: '02',
//     tag: 'Success × Impact',
//     title: 'Performance with purpose',
//     body: 'Success is even sweeter when it lifts others. We tie performance to something bigger than a result.',
//     icon: (
//       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//     ),
//   },
//   {
//     number: '03',
//     tag: 'Community Connection',
//     title: 'Stronger together',
//     body: 'Strong communities make strong athletes — and athletes strengthen their communities right back.',
//     icon: (
//       <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
//     ),
//   },
// ];

// const serveCards = [
//   {
//     eyebrow: 'For Athletes',
//     title: 'Chase your potential.\nBuild your legacy.',
//     subtitle: 'Discipline. Courage. Growth.',
//     body: 'For those putting in the daily work — building a life around discipline, courage, and growth. We show up for you beyond the highlight reel.',
//     href: '#newsletter',
//     cta: 'Get Involved',
//     bg: 'bg-[#122863]',
//   },
//   {
//     eyebrow: 'For Brands',
//     title: 'Be part of the journey,\nnot just the moment.',
//     subtitle: 'Real. Lasting. Aligned.',
//     body: "Partners who want to support athletes in real, lasting ways. We're building a network of people and brands who believe in what athletes stand for.",
//     href: 'https://www.wixforms.com/f/7396687400686060560',
//     cta: 'Partner With Us',
//     bg: 'bg-[#1a3680]',
//   },
// ];

// const nonprofits = [
//   {
//     name: 'Park City Community Foundation',
//     body: 'Strengthening local nonprofits and addressing urgent community needs across Park City and Summit County.',
//     href: 'https://parkcitycf.fcsuite.com/erp/donate',
//   },
//   {
//     name: 'West Ham United Foundation',
//     body: 'Using the power of football to help communities thrive across East London and beyond.',
//     href: 'https://www.whufc.com/en/the-club/community/foundation',
//   },
//   {
//     name: 'McKenna Claire Foundation',
//     body: 'Advancing research and awareness for pediatric brain cancer — because no family should face this alone.',
//     href: 'https://mckennaclairefoundation.org/donate/',
//   },
// ];

// const partners = [
//   'Essex Mortgage',
//   'Salt Box PC',
//   'Holistic Beverages',
//   'TBX Golf',
//   'Essex Shield',
//   'Bloom Intelligence',
//   'Dos Amigos',
//   "Mother's Comfort Foods",
// ];

// function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
//   return (
//     <div
//       className={`mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${
//         light ? 'text-[#a8ccf8]' : 'text-[#69aaf6]'
//       }`}
//     >
//       <span className={`h-0.5 w-7 ${light ? 'bg-[#a8ccf8]' : 'bg-[#69aaf6]'}`} />
//       {children}
//     </div>
//   );
// }

// function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
//   return (
//     <Link
//       href={href}
//       className="inline-flex items-center gap-2 rounded bg-[#69aaf6] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0d1e4a] transition hover:-translate-y-0.5 hover:bg-[#a8ccf8]"
//     >
//       {children}
//     </Link>
//   );
// }

// function OutlineButton({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
//   return (
//     <Link
//       href={href}
//       target={external ? '_blank' : undefined}
//       rel={external ? 'noreferrer' : undefined}
//       className="inline-flex items-center gap-2 rounded border border-white/30 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition hover:border-[#69aaf6] hover:text-[#69aaf6]"
//     >
//       {children}
//     </Link>
//   );
// }

// export default function Page() {
//   return (
//     <main className={`${dmSans.className} overflow-x-hidden bg-white text-[#1a2340]`}>
//       <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#69aaf6]/15 bg-[rgba(18,40,99,0.96)] backdrop-blur-xl">
//         <div className="mx-auto flex h-18 max-w-400 items-center justify-between px-[5vw]">
//           <Link href="#" className={`${bebas.className} text-[22px] leading-none tracking-[0.06em] text-white`}>
//             ATHLETES <span className="text-[#69aaf6]">ELEVATED</span>
//           </Link>

//           <ul className="hidden items-center gap-9 md:flex">
//             <li><Link href="#values" className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/70 transition hover:text-[#69aaf6]">Values</Link></li>
//             <li><Link href="#serve" className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/70 transition hover:text-[#69aaf6]">Who We Serve</Link></li>
//             <li><Link href="#impact" className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/70 transition hover:text-[#69aaf6]">Impact</Link></li>
//             <li>
//               <Link href="#newsletter" className="rounded bg-[#69aaf6] px-5 py-[2.25 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0d1e4a] transition hover:-translate-y-px hover:bg-[#a8ccf8]">
//                 Join The List
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <section className="relative grid min-h-screen items-center overflow-hidden bg-[#0d1e4a] pt-18 lg:grid-cols-2">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(105,170,246,0.08)_0%,transparent_70%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(105,170,246,0.05)_0%,transparent_60%)]" />
//         <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(105,170,246,1)_1px,transparent_1px),linear-gradient(90deg,rgba(105,170,246,1)_1px,transparent_1px)]" />

//         <div className="relative z-10 px-[8vw] py-16 lg:pr-[5vw]">
//           <div className="mb-7 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69aaf6]">
//             <span className="h-0.5 w-8 bg-[#69aaf6]" />
//             Built for Athletes. Powered by Purpose.
//           </div>

//           <h1 className={`${bebas.className} mb-7 text-[clamp(72px,8vw,108px)] leading-[0.92] tracking-[0.01em] text-white`}>
//             Performance
//             <span className="block text-[#69aaf6]">meets purpose.</span>
//           </h1>

//           <p className="mb-11 max-w-115 text-lg font-light leading-[1.6] text-white/65">
//             Athletes Elevated supports the people behind the results — connecting athletes, brands, and communities around shared values of integrity, impact, and growth.
//           </p>

//           <div className="flex flex-wrap items-center gap-4">
//             <PrimaryButton href="#newsletter">Join The List</PrimaryButton>
//             <OutlineButton href="https://www.wixforms.com/f/7396687400686060560" external>
//               Partner With Us
//             </OutlineButton>
//           </div>
//         </div>

//         <div className="relative z-10 hidden items-center justify-center px-[8vw] py-15 lg:flex lg:pr-0">
//           <div className="relative flex flex-col items-center">

//             <div className="relative h-105 w-105">
//               <div className="absolute left-2.5 top-10 h-0 w-0 border-x-200 border-b-340 border-x-transparent border-b-[#69aaf6]/12" />
//               <div className="absolute left-15 top-22.5 h-0 w-0 border-x-150 border-b-260 border-x-transparent border-b-[#69aaf6]/18" />
//               <div className="absolute left-30 top-41 h-0 w-0 border-x-90 border-b-156 border-x-transparent border-b-[#69aaf6]" />
//               <div className="absolute left-37.5 top-53 h-0 w-0 border-x-60 border-b-104 border-x-transparent border-b-[#0d1e4a]" />

//               <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-0.5">
//                 {[
//                   ['3', 'Nonprofits Supported'],
//                   ['100%', 'Donations Pass-Through'],
//                   ['2026', 'Big Things Coming'],
//                 ].map(([value, label]) => (
//                   <div key={label} className="min-w-27.5 border border-[#69aaf6]/20 bg-[rgba(18,40,99,0.9)] px-6 py-5">
//                     <span className={`${bebas.className} block text-[40px] leading-none text-[#69aaf6]`}>{value}</span>
//                     <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">{label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="overflow-hidden bg-[#69aaf6] py-3.5">
//         <div className="flex min-w-max animate-[marquee_25s_linear_infinite] whitespace-nowrap">
//           {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
//             <span key={`${item}-${i}`} className={`${bebas.className} inline-flex items-center gap-12 px-12 text-[15px] tracking-[0.12em] text-[#0d1e4a] after:content-['▲'] after:text-[10px] after:opacity-50`}>
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>

//       <section id="values" className="px-[8vw] py-30">
//         <SectionLabel>Guided by Values</SectionLabel>
//         <h2 className={`${dmSerif.className} mb-4 text-[clamp(36px,4vw,54px)] leading-[1.1] text-[#1a2340]`}>
//           What we stand for
//         </h2>
//         <p className="max-w-135 text-[17px] font-light leading-[1.7] text-[#64748b]">
//           Every relationship we build starts with a shared commitment to the things that actually last.
//         </p>

//         <div className="mt-16 grid grid-cols-1 gap-0.5 md:grid-cols-3">
//           {values.map((value) => (
//             <div key={value.number} className="relative overflow-hidden border border-[#122863]/10 bg-white px-10 py-13 transition hover:-translate-y-1 hover:border-[#69aaf6]">
//               <span className={`${bebas.className} pointer-events-none absolute right-6 top-4 text-[80px] leading-none text-[#122863]/5`}>
//                 {value.number}
//               </span>
//               <div className="mb-7 flex h-12 w-12 items-center justify-center bg-[#122863]">
//                 <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#69aaf6]">
//                   {value.icon}
//                 </svg>
//               </div>
//               <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#69aaf6]">{value.tag}</span>
//               <h3 className={`${dmSerif.className} mb-2 text-2xl text-[#122863]`}>{value.title}</h3>
//               <p className="text-[15px] font-light leading-[1.7] text-[#64748b]">{value.body}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section id="serve" className="bg-[#f5f8ff] px-[8vw] py-30">
//         <SectionLabel>Who We Serve</SectionLabel>
//         <h2 className={`${dmSerif.className} mb-4 text-[clamp(36px,4vw,54px)] leading-[1.1] text-[#1a2340]`}>
//           Everyone plays a role
//           <br />
//           in elevation
//         </h2>
//         <p className="max-w-135 text-[17px] font-light leading-[1.7] text-[#64748b]">
//           Athletes Elevated is built for the people who move sport forward.
//         </p>

//         <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           {serveCards.map((card) => (
//             <div key={card.eyebrow} className={`relative overflow-hidden px-12 py-15 ${card.bg}`}>
//               <svg viewBox="0 0 280 280" fill="none" className="absolute -bottom-15 right-10 h-70 w-70 opacity-[0.06]">
//                 <polygon points="140,20 270,250 10,250" fill="white" />
//               </svg>
//               <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#69aaf6]">{card.eyebrow}</span>
//               <h3 className={`${dmSerif.className} mb-2 whitespace-pre-line text-[34px] leading-[1.1] text-white`}>{card.title}</h3>
//               <span className="mb-6 block text-sm font-medium tracking-[0.04em] text-[#a8ccf8]">{card.subtitle}</span>
//               <p className="mb-9 max-w-95 text-[15px] font-light leading-[1.75] text-white/60">{card.body}</p>
//               <Link
//                 href={card.href}
//                 target={card.href.startsWith('http') ? '_blank' : undefined}
//                 rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
//                 className="inline-flex items-center gap-2 border-b border-[#69aaf6]/40 pb-1 text-xs font-semibold uppercase tracking-widest text-[#69aaf6] transition hover:border-white hover:text-white"
//               >
//                 {card.cta} →
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section id="impact" className="bg-[#0d1e4a] px-[8vw] py-30">
//         <SectionLabel>Impact</SectionLabel>
//         <h2 className={`${dmSerif.className} mb-4 text-[clamp(36px,4vw,54px)] leading-[1.1] text-white`}>
//           Nonprofits we champion
//         </h2>
//         <p className="max-w-135 text-[17px] font-light leading-[1.7] text-white/60">
//           100% of donations go directly to organizations making a tangible difference.
//         </p>

//         <div className="mt-16 grid grid-cols-1 gap-0.5 md:grid-cols-3">
//           {nonprofits.map((item) => (
//             <div key={item.name} className="group relative border border-[#69aaf6]/10 bg-white/4 px-9 py-12 transition hover:border-[#69aaf6]/30 hover:bg-[#69aaf6]/6">
//               <div className="absolute left-0 top-0 h-0.75 w-full origin-left scale-x-0 bg-[#69aaf6] transition duration-300 group-hover:scale-x-100" />
//               <h3 className={`${dmSerif.className} mb-4 text-[22px] leading-[1.2] text-white`}>{item.name}</h3>
//               <p className="mb-7 text-sm font-light leading-[1.75] text-white/50">{item.body}</p>
//               <Link href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 border border-[#69aaf6]/30 px-4.5 py-2.25 text-[11px] font-bold uppercase tracking-[0.15em] text-[#69aaf6] transition hover:bg-[#69aaf6] hover:text-[#0d1e4a]">
//                 Donate →
//               </Link>
//             </div>
//           ))}
//         </div>

//         <div className="mt-10 inline-flex flex-wrap items-center gap-4 border-l-[3px] border-l-[#69aaf6] bg-[#69aaf6]/8 px-8 py-6">
//           <span className={`${bebas.className} text-5xl leading-none text-[#69aaf6]`}>100%</span>
//           <span className="max-w-115 text-[13px] font-light leading-normal text-white/60">
//             <strong className="block font-medium text-white">Donations pass-through</strong>
//             Every dollar donated goes directly to the nonprofit — no platform fees, no overhead deductions.
//           </span>
//         </div>
//       </section>

//       <section className="overflow-hidden bg-[#f5f8ff] py-20">
//         <div className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">Ecosystem Partners</div>
//         <div className="flex min-w-max animate-[marquee_30s_linear_infinite] whitespace-nowrap">
//           {[...partners, ...partners].map((partner, i) => (
//             <span key={`${partner}-${i}`} className="inline-flex items-center px-10 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#122863]/45 transition hover:text-[#122863]">
//               {partner}
//             </span>
//           ))}
//         </div>
//       </section>

//       <section className="relative flex flex-wrap items-center justify-between gap-12 overflow-hidden bg-[#122863] px-[8vw] py-25">
//         <div className="absolute right-15 top-15 h-100 w-100 rotate-45 border border-[#69aaf6]/10" />
//         <div className="absolute right-15 top-0 h-50 w-50 rotate-45 border border-[#69aaf6]/[0.07]" />

//         <div className="relative z-10">
//           <SectionLabel light>Get Involved</SectionLabel>
//           <h2 className={`${dmSerif.className} text-[clamp(36px,4vw,54px)] leading-[1.1] text-white`}>
//             Ready to be part of
//             <br />
//             something bigger?
//           </h2>
//         </div>

//         <div className="relative z-10 flex flex-wrap gap-4">
//           <PrimaryButton href="#newsletter">Join The List</PrimaryButton>
//           <OutlineButton href="https://www.wixforms.com/f/7396687400686060560" external>
//             Partner With Us
//           </OutlineButton>
//         </div>
//       </section>

//       <section id="newsletter" className="px-[8vw] py-30">
//         <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
//           <div>
//             <SectionLabel>Newsletter</SectionLabel>
//             <h2 className={`${dmSerif.className} mb-4 text-[clamp(36px,4vw,54px)] leading-[1.1] text-[#1a2340]`}>
//               Stay connected
//             </h2>
//             <p className="max-w-135 text-[17px] font-light leading-[1.7] text-[#64748b]">
//               Join our list to hear what&apos;s taking shape and where we&apos;re headed next.
//             </p>
//             <NewsletterForm />

//           </div>

//           <div className="pt-5">
//             <div className={`${bebas.className} mb-6 text-[clamp(60px,6vw,90px)] leading-[0.92] text-[#122863]`}>
//               BUILT FOR <span className="text-[#69aaf6]">WHAT&apos;S NEXT</span>
//             </div>

//           </div>
//         </div>
//       </section>

//       <footer className="bg-[#0d1e4a] px-[8vw] pb-8 pt-15">
//         <div className="flex flex-wrap items-start justify-between gap-12 border-b border-[#69aaf6]/10 pb-12">
//           <div>
//             <div className={`${bebas.className} mb-3 text-[28px] tracking-[0.06em] text-white`}>
//               ATHLETES <span className="text-[#69aaf6]">ELEVATED</span>
//             </div>
//             <p className="max-w-65 text-sm font-light leading-[1.6] text-white/40">
//               Built for athletes, powered by purpose, and focused on meaningful community impact.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-8">
//             <Link href="#values" className="text-[13px] text-white/40 transition hover:text-[#69aaf6]">Values</Link>
//             <Link href="#serve" className="text-[13px] text-white/40 transition hover:text-[#69aaf6]">Who We Serve</Link>
//             <Link href="#impact" className="text-[13px] text-white/40 transition hover:text-[#69aaf6]">Impact</Link>
//             <Link href="#newsletter" className="text-[13px] text-white/40 transition hover:text-[#69aaf6]">Newsletter</Link>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center justify-between gap-6 pt-7">
//           <p className="text-xs text-white/25">© 2026 Athletes Elevated. All rights reserved.</p>
//           <p className="max-w-120 text-[11px] italic leading-normal text-white/20">
//             Placeholder footer copy. Replace this with the exact disclaimer from your original file if you want a character-for-character migration.
//           </p>
//         </div>
//       </footer>
//     </main>
//   );
// }
