"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import Navbar from "./src/components/navBar";
import Footer from "./src/components/footer";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

const NONPROFITS = [
  {
    name: "Park City Community Foundation",
    desc: "Strengthening local nonprofits across Park City and Summit County.",
    href: "https://parkcitycf.fcsuite.com/erp/donate",
  },
  {
    name: "West Ham United Foundation",
    desc: "Using the power of football to help communities thrive in East London.",
    href: "https://www.whufc.com/en/the-club/community/foundation",
  },
  {
    name: "McKenna Claire Foundation",
    desc: "Advancing research for pediatric brain cancer — no family should face this alone.",
    href: "https://mckennaclairefoundation.org/donate/",
  },
];

const PARTNERS = [
  "Essex Mortgage",
  "Salt Box PC",
  "Holistic Beverages",
  "TBX Golf",
  "Essex Shield",
  "Bloom Intelligence",
  "Dos Amigos",
  "Mother's Comfort Foods",
];

const FILMED = [
  "Steve Young",
  "Jerry Rice",
  "Sir Nick Faldo",
  "Picabo Street",
  "West Ham United",
];
const CYCLING_WORDS = [
  "COMMUNITIES",
  "PURPOSE",
  "ATHLETES",
  "THE FUTURE",
  "IMPACT",
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeFilmed, setActiveFilmed] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05 }
    );
    document.querySelectorAll(".sr").forEach((el) => io.observe(el));

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    // cycle words — fade out, swap, fade in
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2200);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearInterval(cycle);
    };
  }, []);

  return (
    <div
      className={`${barlow.variable} ${montserrat.variable} font-(family-name:--font-montserrat) bg-white text-[#092866] overflow-x-hidden`}
    >
      <style>{`
        @keyframes marquee   { to { transform: translateX(-50%); } }
        @keyframes marquee-d { to { transform: translateX(50%); } }
        @keyframes glow-orb  { 0%,100%{opacity:.08;transform:scale(1)} 50%{opacity:.03;transform:scale(1.12)} }
        @keyframes word-in   { from{opacity:0;transform:translateY(115%) skewY(4deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes slide-up  { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slide-r   { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fade      { from{opacity:0} to{opacity:1} }
        @keyframes count-up  { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
        @keyframes line-grow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spin-ring { to{transform:rotate(360deg)} }
        @keyframes shimmer   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
 
        .sr { opacity:0; transform:translateY(32px); transition:opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-36px); transition:opacity .8s ease, transform .8s ease; }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(36px); transition:opacity .8s ease, transform .8s ease; }
        .sr-r.in { opacity:1; transform:translateX(0); }
 
        .ww { overflow:hidden; display:inline-block; vertical-align:bottom; }
        .w  { display:inline-block; animation: word-in .9s cubic-bezier(.22,1,.36,1) both; }
 
        .btn-blue {
          background:#52aafc; color:#06080f;
          transition:transform .2s, box-shadow .2s;
        }
        .btn-blue:hover {
          transform:translateY(-2px);
          box-shadow:0 0 40px rgba(82,170,252,.55), 0 8px 24px rgba(82,170,252,.3);
        }
        .btn-ghost {
          border:1px solid rgba(82,170,252,.3); color:white;
          transition:border-color .2s, color .2s, box-shadow .2s;
        }
        .btn-ghost:hover { border-color:#52aafc; color:#52aafc; box-shadow:0 0 20px rgba(82,170,252,.15); }
 
        /* ecosystem horizontal scroll */
        .eco-track { display:flex; gap:20px; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; -ms-overflow-style:none; }
        .eco-track::-webkit-scrollbar { display:none; }
        .eco-item { flex:0 0 320px; scroll-snap-align:start; border:1px solid rgba(9,40,102,.1); transition:border-color .3s, transform .4s cubic-bezier(.22,1,.36,1); }
        .eco-item:hover { border-color:rgba(82,170,252,.6); transform:translateY(-6px); }
        .eco-item:hover .eco-bar { transform:scaleX(1); }
        .eco-bar { transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.22,1,.36,1); }
 
        /* filmed tab */
        .filmed-tab { transition:color .2s, border-color .2s; }
        .filmed-tab.active { color:#52aafc; border-left-color:#52aafc; }
 
        /* np card */
        .np-card { transition:transform .35s cubic-bezier(.22,1,.36,1), border-color .3s; border:1px solid rgba(9,40,102,.08); }
        .np-card:hover { transform:translateY(-4px); border-color:rgba(82,170,252,.5); }
        .np-card:hover .np-line { transform:scaleX(1); }
        .np-line { transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
 
        /* nav */
        .nav-lnk::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#52aafc; transition:width .3s; }
        .nav-lnk:hover::after { width:100%; }
 
        /* grain */
        .grain { background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.02'/%3E%3C/svg%3E"); }
      `}</style>

      {/* ═══ NAV ════════════════════════════════════════════════════════════ */}
      <Navbar />

      {/* ═══ 1. HERO — full-bleed photo, headline overlaid ════════════════ */}
      <section className="grain relative flex min-h-screen flex-col justify-end overflow-hidden pt-27">
        {/* full-bleed photo placeholder */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg,#b8d8f8 0%,#7ab8ee 40%,#4a9ad4 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-(family-name:--font-barlow) text-[13px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Full-bleed athlete photo goes here
            </span>
          </div>
        </div>

        {/* dark gradient overlay — bottom heavy */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top,rgba(9,40,102,.95) 0%,rgba(9,40,102,.65) 40%,rgba(9,40,102,.15) 75%,transparent 100%)",
          }}
        />

        {/* vertical scroll label — right edge */}
        <div
          className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
          style={{
            animation: loaded ? "fade .8s ease 1.2s both" : "none",
            opacity: loaded ? undefined : 0,
          }}
        >
          <div className="h-16 w-px bg-white/20" />
          <span
            className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.4em] text-white/30"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll to explore
          </span>
          <div className="h-16 w-px bg-white/20" />
          <div
            className="h-2 w-2 rounded-full bg-[#52aafc]"
            style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }}
          />
        </div>

        {/* headline — bottom left, overlaid */}
        <div className="relative z-20 px-6 pb-0 pt-20 md:px-12 lg:px-16">
          <div
            className="mb-7 inline-flex items-center gap-3"
            style={{
              animation: loaded ? "slide-up .6s ease .1s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <span
              className="h-0.5 w-10 bg-[#52aafc]"
              style={{ boxShadow: "0 0 10px rgba(82,170,252,.8)" }}
            />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.35em] text-[#52aafc]">
              Athletes · Brands · Community · Impact
            </span>
          </div>

          <h1
            className="font-(family-name:--font-barlow) font-extrabold uppercase leading-[0.85] tracking-[-0.02em]"
            style={{ fontSize: "clamp(72px,14vw,200px)" }}
          >
            <div className="ww block">
              <span
                className="w text-white"
                style={{ animationDelay: loaded ? ".1s" : "999s" }}
              >
                ELEV
              </span>
              <span
                className="w text-[#52aafc]"
                style={{
                  animationDelay: loaded ? ".18s" : "999s",
                  textShadow: "0 0 100px rgba(82,170,252,.8)",
                }}
              >
                ATE
              </span>
            </div>
            <div className="block" style={{ minHeight: "1em" }}>
              <span
                className="block text-white/85"
                style={{
                  transition: "opacity .35s ease,transform .35s ease",
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? "translateY(0)" : "translateY(14px)",
                }}
              >
                {CYCLING_WORDS[wordIndex]}
              </span>
            </div>
          </h1>
        </div>

        {/* bottom bar — frosted glass over photo */}
        <div
          className="relative z-20 mt-0 grid grid-cols-1 gap-0 border-t border-white/10 lg:grid-cols-3"
          style={{
            animation: loaded ? "fade .8s ease 1s both" : "none",
            opacity: loaded ? undefined : 0,
            background: "rgba(9,40,102,.75)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="border-r border-white/10 px-6 py-8 md:px-12 lg:px-16">
            <p className="max-w-70 text-[14px] font-light leading-[1.8] text-white/60">
              We connect athletes, brands, and communities around integrity,
              impact, and growth — from youth leagues to the world stage.
            </p>
          </div>

          <div className="grid grid-cols-2 border-r border-white/10">
            {[
              { val: "100%", label: "Donations direct" },
              { val: "5", label: "Heroes filmed" },
              { val: "3+", label: "Nonprofits" },
              { val: "2027", label: "HERO launches" },
            ].map((s) => (
              <div
                key={s.label}
                className="border-b border-r border-white/10 px-6 py-6 last:border-b-0 even:border-r-0"
              >
                <div
                  className="font-(family-name:--font-barlow) text-[28px] font-extrabold leading-none text-[#52aafc]"
                  style={{ textShadow: "0 0 20px rgba(82,170,252,.4)" }}
                >
                  {s.val}
                </div>
                <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-3 px-6 py-8 md:px-12">
            <Link
              href="/athletes"
              className="btn-blue inline-flex items-center justify-center gap-2 px-7 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
            >
              I'm an Athlete →
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center justify-center gap-2 border border-[#52aafc] bg-transparent px-7 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest text-[#52aafc] transition-colors hover:bg-[#15225d] hover:text-white"
            >
              I'm a Brand →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden bg-[#52aafc] py-3.25">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee 22s linear infinite",
            width: "max-content",
          }}
        >
          {[
            "Athletes Elevated",
            "Performance With Purpose",
            "Teams Elevated",
            "Athlete First",
            "HERO — Jan 2027",
            "Athlink",
            "Community Connection",
            "Impact",
            "Athletes Elevated",
            "Performance With Purpose",
            "Teams Elevated",
            "Athlete First",
            "HERO — Jan 2027",
            "Athlink",
            "Community Connection",
            "Impact",
            "Athletes Elevated",
            "Performance With Purpose",
            "Teams Elevated",
            "Athlete First",
            "HERO — Jan 2027",
            "Athlink",
            "Community Connection",
            "Impact",
          ].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-7 px-7 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.2em] text-[#06080f]"
            >
              {t}
              <span className="h-1 w-1 rounded-full bg-[#06080f]/30" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══ 2. MISSION — brutalist, ONE giant number dominates ═════════════ */}
      <section className="relative overflow-hidden bg-white px-6 py-0 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-150">
          {/* left — giant 100% */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-[#d7e5fb] p-10 lg:p-14">
          </div>

          {/* right — copy stacked */}
          <div
            className="sr flex flex-col justify-center px-8 py-20 md:px-16 lg:px-20"
            style={{ transitionDelay: "150ms" }}
          >
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Our Mission
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) mb-8 text-[clamp(32px,3.5vw,54px)] font-extrabold uppercase leading-[0.93] text-[#092866]">
              Built for the human
              <br />
              behind the result.
            </h2>
            <p className="mb-6 text-[16px] font-light leading-[1.88] text-[#092866]/52">
              Athletes Elevated is an ecosystem built around one belief: the
              impact of an athlete doesn't stop at the final whistle. We connect
              athletes with tools, communities, and partners that help them
              become something bigger.
            </p>
            <p className="text-[14px] font-light leading-[1.88] text-[#092866]/35">
              From a youth soccer league in Park City to a global documentary
              featuring the world's greatest — every part of AE starts with the
              athlete and works outward.
            </p>
          </div>
        </div>

        {/* three pillars below, full width */}
        <div className="grid grid-cols-1 border-t border-[#092866]/10 md:grid-cols-3">
          {[
            {
              n: "01",
              tag: "Athlete First",
              body: "We show up for the human behind the results.",
            },
            {
              n: "02",
              tag: "Performance With Purpose",
              body: "Success is sweeter when it lifts others.",
            },
            {
              n: "03",
              tag: "Community Connection",
              body: "Strong communities make strong athletes.",
            },
          ].map((v, i) => (
            <div
              key={v.n}
              className="sr group relative border-r border-[#092866]/10 px-8 py-12 last:border-r-0 hover:bg-[#092866]/2 transition-colors"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="mb-4 font-(family-name:--font-barlow) text-[64px] font-extrabold leading-none text-[#092866]/[0.07] group-hover:text-[#52aafc]/10 transition-colors duration-300">
                {v.n}
              </div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#52aafc]">
                {v.tag}
              </div>
              <p className="text-[14px] font-light leading-[1.8] text-[#092866]/48">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. ECOSYSTEM — horizontal scroll, Netflix-style ════════════════ */}
      <section className="bg-[#d7e5fb] px-6 py-24 md:px-12 lg:px-20">
        <div className="sr mb-10 flex items-end justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                The Ecosystem
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(30px,4vw,60px)] font-extrabold uppercase leading-[0.92] text-white">
              Everything we build
              <br />
              starts with <span className="text-[#52aafc]">athletes.</span>
            </h2>
          </div>
          <div className="hidden items-center gap-2 text-[11px] font-medium text-[#092866]/40 md:flex">
            <span>Scroll to explore</span>
            <span className="font-(family-name:--font-barlow) text-[16px]">
              →
            </span>
          </div>
        </div>

        {/* horizontal scroll track */}
        <div className="eco-track pb-4">
          {[
            {
              tag: "Documentary",
              name: "HERO",
              sub: "Legends that become catalysts for change.",
              detail:
                "A cinematic series from ancient myth to modern icons. Launching January 2027.",
              href: "/hero",
              num: "01",
              extra: (
                <div className="mt-4 border-t border-[#092866]/10 pt-4">
                  {[
                    "Steve Young",
                    "Jerry Rice",
                    "Sir Nick Faldo",
                    "Picabo Street",
                    "West Ham United",
                  ].map((n) => (
                    <div
                      key={n}
                      className="py-0.5 text-[11px] text-[#092866]/45"
                    >
                      — {n}
                    </div>
                  ))}
                </div>
              ),
            },
            {
              tag: "Athlete Platform",
              name: "Athlink",
              sub: "One link for everything you are.",
              detail:
                "Stats, highlights, social, contact — all in one profile brands can find.",
              href: "/ecosystem/athlink",
              num: "02",
              extra: null,
            },
            {
              tag: "Youth Sports",
              name: "Teams Elevated",
              sub: "Cost should never keep a kid off the field.",
              detail:
                "Payments, crowdfunding, rosters, and communication in one platform.",
              href: "/ecosystem/teams-elevated",
              num: "03",
              extra: null,
            },
            {
              tag: "CRM",
              name: "Eye In Teams",
              sub: "Modern operating system for athlete, brands and fan relationships",
              detail:
                "B2B/B2C communication, email, text, calls, and marketing — all in one.",
              href: "/ecosystem/crm",
              num: "04",
              extra: null,
            },
          ].map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className="eco-item sr relative flex flex-col bg-white"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="eco-bar absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]"
                style={{ boxShadow: "0 0 8px rgba(82,170,252,.4)" }}
              />

              {/* photo placeholder — top half */}
              <div
                className="flex h-50 shrink-0 items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(82,170,252,.12) 0%,rgba(9,40,102,.08) 100%)",
                }}
              >
                <div className="font-(family-name:--font-barlow) text-[80px] font-extrabold leading-none text-[#092866]/[0.07]">
                  {item.num}
                </div>
              </div>

              {/* text — bottom half */}
              <div className="flex flex-1 flex-col p-7">
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]">
                  {item.tag}
                </span>
                <h3 className="font-(family-name:--font-barlow) mb-2 text-[26px] font-extrabold uppercase text-white">
                  {item.name}
                </h3>
                <p className="mb-1 text-[12px] font-semibold text-[#092866]/65">
                  {item.sub}
                </p>
                <p className="text-[12px] font-light leading-[1.7] text-[#092866]/42">
                  {item.detail}
                </p>
                {item.extra}
                <div className="mt-auto pt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* scroll hint dots */}
        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === 0 ? "w-6 bg-[#52aafc]" : "w-2 bg-[#092866]/15"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ═══ 4. HERO DOC — cinematic film poster split ════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f7f9ff]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-175">
          {/* left — film poster */}
          <div
            className="sr-l relative flex flex-col justify-end overflow-hidden bg-[#f0f5fd] px-8 py-16 md:px-16"
            style={{
              background: "linear-gradient(135deg,#f0f5fd 0%,#e0ecfa 100%)",
            }}
          >
            {/* dot texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[.08]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(9,40,102,.15) 1px,transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
          </div>

          {/* right — tabbed filmed list */}
          <div
            className="sr relative flex flex-col justify-center border-l border-[#092866]/10 bg-white px-8 py-16 md:px-12"
            style={{ transitionDelay: "140ms" }}
          >
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]/45">
              Already filmed
            </div>

            <div className="space-y-0">
              {FILMED.map((name, i) => (
                <button
                  key={name}
                  onClick={() => setActiveFilmed(i)}
                  className={`filmed-tab w-full border-l-[3px] px-6 py-5 text-left transition-all duration-200 text-[#092866] ${
                    activeFilmed === i
                      ? "active bg-[#52aafc]/10 border-[#52aafc]"
                      : "border-transparent hover:border-white/20 hover:bg-[#092866]/2"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-(family-name:--font-barlow) text-[22px] font-bold uppercase transition-colors ${
                        activeFilmed === i
                          ? "text-[#52aafc]"
                          : "text-[#092866]/60"
                      }`}
                    >
                      {name}
                    </span>
                    {activeFilmed === i && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52aafc]/70">
                        Filmed ✓
                      </span>
                    )}
                  </div>
                  {activeFilmed === i && (
                    <p className="mt-2 text-[12px] font-light text-[#092866]/45">
                      {
                        [
                          "Hall of Fame QB · 2× Super Bowl Champion",
                          "Greatest WR in NFL history · 3× Super Bowl",
                          "6× Major Champion · Ryder Cup legend",
                          "Olympic Gold · 1998 Nagano · World Champion",
                          "3× FA Cup · European Cup Winners Cup 1965",
                        ][i]
                      }
                    </p>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 border border-[#52aafc]/15 bg-[#52aafc]/8 p-6">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]">
                In production
              </div>
              <div className="font-(family-name:--font-barlow) text-[14px] font-bold uppercase text-[#092866]">
                Created by Melissa Tittl · Hathor Studios
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. IMPACT — asymmetric card grid, 100% overlaps ════════════════ */}
      <section className="bg-white px-6 py-28 md:px-12 lg:px-20">
        <div className="sr mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Impact
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(30px,4vw,60px)] font-extrabold uppercase leading-[0.92] text-white">
              Nonprofits we champion.
            </h2>
          </div>
          <p className="max-w-85 text-[14px] font-light leading-[1.8] text-[#092866]/45">
            No fees. No overhead. Every dollar donated goes straight to the
            people who need it.
          </p>
        </div>

        {/* asymmetric grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* all 3 cards — same size */}
          {NONPROFITS.map((np, i) => (
            <div
              key={np.name}
              className="sr np-card relative overflow-hidden bg-[#f0f5fd] p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="np-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
              {/* watermark on first card */}
              {i === 0 && (
                <div className="pointer-events-none absolute -bottom-4 -right-4 font-(family-name:--font-barlow) text-[100px] font-extrabold leading-none text-[#092866]/[0.07] select-none">
                  100%
                </div>
              )}
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]">
                    100% Pass-Through
                  </div>
                  <h3 className="font-(family-name:--font-barlow) mb-3 text-[22px] font-extrabold uppercase leading-[1.1] text-[#092866]">
                    {np.name}
                  </h3>
                  <p className="text-[13px] font-light leading-[1.8] text-[#092866]/48">
                    {np.desc}
                  </p>
                </div>
                <a
                  href={np.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 border-b border-[#52aafc]/40 pb-1 font-(family-name:--font-barlow) text-[11px] font-bold uppercase tracking-[0.2em] text-[#52aafc] transition-all hover:gap-4"
                >
                  Donate →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 6. CTA — full viewport, nothing but JOIN ════════════════════════ */}
      <section className="grain relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden bg-[#092866] px-6 py-20 text-center">
        {" "}
        {/* center mega-glow */}{" "}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(82,170,252,.11) 0%,transparent 60%)",
            animation: "glow-orb 8s ease-in-out infinite",
          }}
        />{" "}
        {/* corner brackets */}{" "}
        <div className="pointer-events-none absolute left-8 top-8 h-17.5 w-17.5 border-l-2 border-t-2 border-[#52aafc]/25" />{" "}
        <div className="pointer-events-none absolute right-8 top-8 h-17.5 w-17.5 border-r-2 border-t-2 border-[#52aafc]/25" />{" "}
        <div className="pointer-events-none absolute bottom-8 left-8 h-17.5 w-17.5 border-b-2 border-l-2 border-[#52aafc]/25" />{" "}
        <div className="pointer-events-none absolute bottom-8 right-8 h-17.5 w-17.5 border-b-2 border-r-2 border-[#52aafc]/25" />{" "}
        <div className="sr relative z-10 w-full max-w-212.5">
          {" "}
          {/* tiny label */}{" "}
          <div className="mb-6 inline-flex items-center gap-4">
            {" "}
            <span className="h-px w-10 bg-[#52aafc]/50" />{" "}
            <span className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]/60">
              {" "}
              Ready to be part of something bigger?{" "}
            </span>{" "}
            <span className="h-px w-10 bg-[#52aafc]/50" />{" "}
          </div>{" "}
          {/* hero text */}{" "}
          <div
            className="font-(family-name:--font-barlow) font-extrabold uppercase text-white"
            style={{
              fontSize: "clamp(60px,14vw,180px)",
              lineHeight: 0.88,
              textShadow: "0 0 80px rgba(255,255,255,.05)",
            }}
          >
            {" "}
            YOUR <br />{" "}
            <span
              className="text-[#52aafc]"
              style={{ textShadow: "0 0 80px rgba(82,170,252,.6)" }}
            >
              {" "}
              STORY{" "}
            </span>{" "}
            <br /> STARTS <br />{" "}
            <span
              style={{
                WebkitTextStroke: "2px rgba(82,170,252,.45)",
                color: "transparent",
              }}
            >
              {" "}
              HERE.{" "}
            </span>{" "}
          </div>{" "}
          {/* buttons */}{" "}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {" "}
            <Link
              href="/athletes"
              className="inline-flex items-center gap-2 bg-[#52aafc] px-10 py-4 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#3d97e8]"
            >
              {" "}
              I'm an Athlete →{" "}
            </Link>{" "}
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 border border-[#52aafc] bg-transparent px-10 py-4 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-widest text-[#52aafc] transition-colors hover:bg-[#52aafc] hover:text-white"
            >
              {" "}
              I'm a Brand →{" "}
            </Link>{" "}
          </div>{" "}
        </div>
      </section>

      {/* ═══ PARTNERS — diagonal dual marquee ═══════════════════════════════ */}
      <section className="overflow-hidden bg-[#f7f9ff] border-y border-[#092866]/8 py-16">
        <div className="sr mb-10 text-center font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.36em] text-[#092866]/25">
          Ecosystem Partners
        </div>
        {/* forward marquee */}
        <div
          className="overflow-hidden mb-3"
          style={{
            maskImage:
              "linear-gradient(90deg,transparent,black 12%,black 88%,transparent)",
          }}
        >
          <div
            className="flex whitespace-nowrap"
            style={{
              animation: "marquee 28s linear infinite",
              width: "max-content",
            }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-9 px-9 font-(family-name:--font-barlow) text-[14px] font-semibold uppercase tracking-widest text-[#092866]/22 transition-colors hover:text-[#52aafc]"
              >
                {p}
                <span className="h-0.75 w-0.75 rounded-full bg-white/12" />
              </span>
            ))}
          </div>
        </div>
        {/* reverse marquee */}
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg,transparent,black 12%,black 88%,transparent)",
          }}
        >
          <div
            className="flex whitespace-nowrap"
            style={{
              animation: "marquee-d 34s linear infinite",
              width: "max-content",
              transform: "translateX(-50%)",
            }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-9 px-9 font-(family-name:--font-barlow) text-[14px] font-semibold uppercase tracking-widest text-[#092866]/15 transition-colors hover:text-[#52aafc]"
              >
                {p}
                <span className="h-0.75 w-0.75 rounded-full bg-white/10" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
