"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";
import ProductCard from "../src/components/productCard";
import StatusChip from "../src/components/statusChip";
import { CTA, HERO_PROPOSITIONS, PRODUCTS as SHARED_PRODUCTS } from "../src/lib/uxContent";
 
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
 
const PRODUCT_NAV = [
  { id: "hero", label: "HERO", sub: "Documentary" },
  { id: "athlink", label: "Athlink", sub: "The Athlete Marketplace" },
  { id: "teams", label: "Teams Elevated", sub: "Youth Sports Operations" },
  { id: "crm", label: "Eye In Teams", sub: "The Relationship OS" },
];
 
const FILMED = [
  { name: "Steve Young", detail: "Hall of Fame QB · 2× Super Bowl Champion" },
  { name: "Jerry Rice", detail: "Greatest WR in NFL History" },
  { name: "Sir Nick Faldo", detail: "6× Major Champion · Ryder Cup Legend" },
  {
    name: "Picabo Street",
    detail: "Olympic Gold · 1998 Nagano · World Champion",
  },
  {
    name: "West Ham United",
    detail: "3× FA Cup · European Cup Winners Cup 1965",
  },
];
 
const ATHLINK_FEATURES = [
  {
    icon: "01",
    title: "Your Athlink Profile",
    desc: "Every link, code, and partnership in one clean URL you share everywhere.",
  },
  {
    icon: "02",
    title: "The Marketplace",
    desc: "Fans click your links and land in the Athlink marketplace — where they can shop products you promote, directly from you.",
  },
  {
    icon: "03",
    title: "Your Narrative",
    desc: "The career you've built, the brand you're becoming, the story only you can tell.",
  },
  {
    icon: "04",
    title: "Built Around You",
    desc: "Upload your products, add your links, set your codes. Your profile is yours to build exactly how you want it.",
  },
];
 
const TEAMS_FEATURES = [
  {
    n: "01",
    title: "League & Roster Management",
    desc: "Rosters, scheduling, and tournament tools at any scale.",
  },
  {
    n: "02",
    title: "Payments & Banking",
    desc: "Leagues hold their own accounts — collecting registrations, camp fees, uniforms, and gear in one flow.",
  },
  {
    n: "03",
    title: "Crowdfunding, Built In",
    desc: "Crowdfunding and split-pay so cost is never the reason a kid sits out.",
  },
  {
    n: "04",
    title: "Family Communication",
    desc: "Automated updates, announcements, and messaging that keep every family in the loop.",
  },
  {
    n: "05",
    title: "Sponsorship & Fundraising",
    desc: "Outreach and fundraising automation built for the volunteer coaches already stretched thin.",
  },
];
 
const CRM_FEATURES = [
  {
    title: "Email Campaigns",
    desc: "Send, track, and refine email at scale — with custom templates built in.",
  },
  {
    title: "SMS & Calls",
    desc: "Text and call from inside the platform. Every interaction logged.",
  },
  {
    title: "Branded Templates",
    desc: "Branded assets for every touchpoint in your pipeline.",
  },
  {
    title: "Contact Import",
    desc: "Migrate your entire contact database in seconds.",
  },
  {
    title: "Post-Close Surveys",
    desc: "Native feedback collection. No second platform required.",
  },
  {
    title: "Automated Outreach",
    desc: "Set the sequence. The system handles follow-up at scale.",
  },
  {
    title: "B2B & B2C Pipelines",
    desc: "Business and consumer relationships, managed side by side.",
  },
  {
    title: "Live Analytics",
    desc: "Opens, clicks, calls, and conversions — tracked in real time.",
  },
];
 
export default function EcosystemPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeFilmed, setActiveFilmed] = useState(0);
 
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
      { threshold: 0.06 }
    );
 
    document
      .querySelectorAll(".sr, .sr-l, .sr-r")
      .forEach((el) => io.observe(el));
 
    return () => {
      io.disconnect();
    };
  }, []);
 
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
 
  return (
    <div
      className={`${barlow.variable} ${montserrat.variable} bg-white font-(family-name:--font-montserrat) text-[#092866] overflow-x-hidden`}
    >
      <style>{`
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes marqueeReverse { to { transform: translateX(50%); } }
        @keyframes word-in { from{opacity:0;transform:translateY(110%) skewY(4deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade { from{opacity:0} to{opacity:1} }
        @keyframes scan { 0%{transform:translateY(-100%);opacity:0} 20%{opacity:.5} 100%{transform:translateY(100%);opacity:0} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.72)} }
        @keyframes glow-orb { 0%,100%{opacity:.13;transform:scale(1)} 50%{opacity:.04;transform:scale(1.14)} }
        @keyframes breathe-glow {
          0%,100% { text-shadow:0 0 60px rgba(82,170,252,.45); }
          50% { text-shadow:0 0 120px rgba(82,170,252,.9), 0 0 30px rgba(82,170,252,.6); }
        }
 
        .sr { opacity:0; transform:translateY(34px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-38px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(38px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-r.in { opacity:1; transform:translateX(0); }
 
        .ww { overflow:hidden; display:inline-block; vertical-align:bottom; }
        .w { display:inline-block; animation:word-in .9s cubic-bezier(.22,1,.36,1) both; }
 
        .grain {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
        }
 
        .tech-grid {
          background-image:
            linear-gradient(rgba(82,170,252,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(82,170,252,.12) 1px, transparent 1px);
          background-size:52px 52px;
        }
 
        .btn-blue { background:#52aafc; color:#05070d; transition:transform .2s,box-shadow .2s; }
        .btn-blue:hover { transform:translateY(-2px); box-shadow:0 0 44px rgba(82,170,252,.48),0 10px 30px rgba(82,170,252,.25); }
 
        .btn-navy { background:#092866; color:white; transition:transform .2s,box-shadow .2s; }
        .btn-navy:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(9,40,102,.25); }
 
        .btn-outline { border:1px solid rgba(82,170,252,.45); color:#52aafc; transition:background .2s,color .2s,transform .2s; }
        .btn-outline:hover { background:#52aafc; color:#05070d; transform:translateY(-2px); }
 
        .product-link { transition:all .25s ease; border-left:2px solid transparent; }
        .product-link:hover { border-left-color:#52aafc; padding-left:18px; }
 
        .portal-card { border:1px solid rgba(82,170,252,.18); transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .3s; }
        .portal-card:hover { transform:translateY(-8px); border-color:rgba(82,170,252,.65); box-shadow:0 30px 90px rgba(9,40,102,.22); }
        .portal-card:hover .portal-line { transform:scaleX(1); }
        .portal-line { transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.22,1,.36,1); }
 
        .filmed-tab { transition:all .2s ease; border-left:2px solid transparent; }
        .filmed-tab.active { border-left-color:#52aafc; background:rgba(82,170,252,.08); }
 
        .profile-mock { background:white; border:1px solid rgba(9,40,102,.1); box-shadow:0 32px 80px rgba(9,40,102,.12); }
 
        .teams-row { transition:background .25s,padding-left .25s,border-color .25s; border-bottom:1px solid rgba(9,40,102,.08); }
        .teams-row:hover { background:rgba(82,170,252,.04); padding-left:10px; border-color:rgba(82,170,252,.25); }
 
        .crm-card { border:1px solid rgba(255,255,255,.1); transition:border-color .3s,background .3s,transform .3s; }
        .crm-card:hover { border-color:rgba(82,170,252,.55); background:rgba(82,170,252,.06); transform:translateY(-3px); }
        .crm-card:hover .crm-line { transform:scaleX(1); }
        .crm-line { transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
 
        .nav-lnk::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#52aafc; transition:width .3s; }
        .nav-lnk:hover::after { width:100%; }
      `}</style>
 
      <Navbar />
 
      {/* HERO */}
      <section className="grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#071936] pt-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(82,170,252,.35),transparent_30%),linear-gradient(135deg,#071936_0%,#092866_52%,#030814_100%)]" />
        <div className="tech-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,8,20,.98)_0%,rgba(3,8,20,.7)_42%,rgba(3,8,20,.16)_100%)]" />
 
        <div className="pointer-events-none absolute right-0 top-24 font-(family-name:--font-barlow) text-[17vw] font-extrabold uppercase leading-none text-white/[0.035]">
          SYSTEM
        </div>
 
        <div className="relative z-10 grid flex-1 grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-24 md:px-12 lg:px-20">
            <div
              className="mb-8 flex items-center gap-3"
              style={{
                animation: loaded ? "slide-up .6s ease .1s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              <span className="h-0.5 w-10 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.35em] text-[#52aafc]">
                The Ecosystem
              </span>
            </div>
 
            <h1
              className="font-(family-name:--font-barlow) max-w-[980px] font-extrabold uppercase leading-[0.83] tracking-[-0.025em]"
              style={{ fontSize: "clamp(56px,11vw,160px)" }}
            >
              <div className="ww block">
                <span className="w" style={{ animationDelay: loaded ? ".12s" : "999s" }}>
                  Every
                </span>
              </div>
              <div className="ww block">
                <span className="w" style={{ animationDelay: loaded ? ".24s" : "999s" }}>
                  tool.
                </span>
              </div>
              <div className="block">
                <span
                  className="w inline-block text-[#52aafc]"
                  style={{
                    animationDelay: loaded ? ".38s" : "999s",
                    animationName: loaded ? "word-in, breathe-glow" : "word-in",
                    animationDuration: loaded ? ".9s, 3s" : ".9s",
                    animationTimingFunction: loaded ? "cubic-bezier(.22,1,.36,1), ease-in-out" : "cubic-bezier(.22,1,.36,1)",
                    animationFillMode: loaded ? "both, both" : "both",
                    animationIterationCount: loaded ? "1, infinite" : "1",
                  }}
                >
                  One mission.
                </span>
              </div>
            </h1>
 
            <p
              className="mt-9 max-w-[700px] text-[19px] font-normal leading-[1.75] text-white/88"
              style={{
                animation: loaded ? "slide-up .7s ease .72s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              {HERO_PROPOSITIONS.ecosystem}
            </p>
          </div>
 
          <div
            className="flex flex-col justify-center border-l border-white/10 bg-white/[.03] px-8 py-24 backdrop-blur-sm md:px-12 lg:px-16"
            style={{
              animation: loaded ? "fade .8s ease .8s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]/70">
              Enter the system
            </div>
 
            <div className="space-y-0">
              {PRODUCT_NAV.map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollTo(p.id)}
                  className="product-link group flex w-full items-center justify-between border-b border-white/10 py-7 pl-3 text-left last:border-b-0 hover:border-[#52aafc]/25"
                >
                  <div>
                    <div className="font-(family-name:--font-barlow) text-[clamp(26px,3vw,42px)] font-extrabold uppercase text-white transition-colors group-hover:text-[#52aafc]">
                      {p.label}
                    </div>
                    <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/78">
                      {p.sub}
                    </div>
                  </div>
 
                  <span className="text-[22px] text-white/25 transition-all group-hover:translate-x-2 group-hover:text-[#52aafc]">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
 
        <div
          className="relative z-10 grid grid-cols-2 border-t border-white/10 bg-[#071936]/80 backdrop-blur-xl md:grid-cols-4"
          style={{
            animation: loaded ? "fade .8s ease 1.1s both" : "none",
            opacity: loaded ? undefined : 0,
          }}
        >
          {[
            ["HERO", "Documentary in production"],
            ["ATHLINK", "Athlete marketplace"],
            ["TEAMS", "Youth sports operations"],
            ["EYE IN TEAMS", "Relationship CRM"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="border-r border-white/10 px-6 py-6 last:border-r-0 md:px-10"
            >
              <div className="font-(family-name:--font-barlow) text-[clamp(22px,3vw,40px)] font-extrabold leading-none text-[#52aafc]">
                {v}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/78">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* PRODUCT TICKER */}
      <div className="overflow-hidden bg-[#52aafc] py-3">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 24s linear infinite", width: "max-content" }}
        >
          {[
            "HERO",
            "Athlink",
            "Teams Elevated",
            "Eye In Teams",
            "Athlete Identity",
            "Fan Engagement",
            "Sports Technology",
            "Community Impact",
            "HERO",
            "Athlink",
            "Teams Elevated",
            "Eye In Teams",
            "Athlete Identity",
            "Fan Engagement",
            "Sports Technology",
            "Community Impact",
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-7 px-7 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.2em] text-[#05070d]"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-[#05070d]/35" />
            </span>
          ))}
        </div>
      </div>
 
      {/* ECOSYSTEM MAP */}
      <section className="relative overflow-hidden bg-[#f0f5fd] px-6 py-28 md:px-12 lg:px-20">
        <div className="sr mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Product model
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,82px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
              What is live,
              <br />
              what is next.
            </h2>
          </div>
          <p className="max-w-[460px] text-[17px] font-normal leading-[1.85] text-[#092866]/72">
            Each product has a role, audience, status, and action so visitors can understand the system without decoding internal language.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {SHARED_PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      {/* HERO DOC */}
      <section id="hero" className="relative overflow-hidden bg-[#071936] text-white">
        <div className="tech-grid absolute inset-0 opacity-20" />
        <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#52aafc]/10 blur-3xl" />
 
        <div className="relative z-10 grid min-h-[760px] grid-cols-1 lg:grid-cols-2">
          <div className="sr-l relative flex flex-col justify-end overflow-hidden px-8 py-20 md:px-16">
            <div className="pointer-events-none absolute -top-10 left-0 right-0 text-center font-(family-name:--font-barlow) text-[30vw] font-extrabold uppercase leading-none text-white/[.035] select-none lg:text-[15vw]">
              HERO
            </div>
 
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-(family-name:--font-barlow) text-[11px] font-bold uppercase tracking-[0.28em] text-white/25">
                Film still / video placeholder
              </span>
            </div>
 
            <div className="absolute inset-0 bg-gradient-to-t from-[#071936] via-[#071936]/88 to-transparent" />
 
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#52aafc]" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  Documentary · January 2027
                </span>
                <StatusChip status="In production" tone="light" />
              </div>
 
              <h2 className="font-(family-name:--font-barlow) mb-6 text-[clamp(38px,5vw,82px)] font-extrabold uppercase leading-[0.88]">
                Legends become
                <br />
                <span className="text-[#52aafc]">catalysts.</span>
              </h2>
 
              <p className="mb-8 max-w-[500px] text-[17px] font-normal leading-[1.9] text-white/76">
                HERO examines the moment athletes become cultural forces — the figures who shape conversations, move communities, and influence the world beyond the arena.
              </p>
            </div>
          </div>
 
          <div className="sr flex flex-col justify-center border-l border-white/10 px-8 py-20 md:px-12 lg:px-16">
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]/70">
              On record
            </div>
 
            {FILMED.map((a, i) => (
              <button
                key={a.name}
                onClick={() => setActiveFilmed(i)}
                className={`filmed-tab w-full px-5 py-5 text-left ${
                  activeFilmed === i ? "active" : "hover:bg-white/[.03]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`font-(family-name:--font-barlow) text-[24px] font-bold uppercase transition-colors ${
                      activeFilmed === i ? "text-[#52aafc]" : "text-white/78"
                    }`}
                  >
                    {a.name}
                  </span>
 
                  {activeFilmed === i && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52aafc]/70">
                      Filmed ✓
                    </span>
                  )}
                </div>
 
                {activeFilmed === i && (
                  <p className="mt-2 text-[16px] font-normal text-white/80">
                    {a.detail}
                  </p>
                )}
              </button>
            ))}
 
            <div className="mt-8 border border-[#52aafc]/25 bg-[#52aafc]/[.06] p-6">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]">
                In production
              </div>
              <div className="font-(family-name:--font-barlow) text-[14px] font-bold uppercase text-white">
                Directed by Melissa Tittl · Hathor Studios
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ATHLINK */}
      <section id="athlink" className="relative overflow-hidden bg-white px-6 py-32 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute right-0 top-0 font-(family-name:--font-barlow) text-[18vw] font-extrabold uppercase leading-none text-[#092866]/[0.035]">
          PROFILE
        </div>
 
        <div className="sr relative z-10 mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                The Athlete Marketplace
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              One profile.
              <br />
              One marketplace.
            </h2>
          </div>
 
          <p className="max-w-[460px] text-[17px] font-normal leading-[1.85] text-[#092866]/68">
          Athlink is two things working together — a profile that hosts all your links, discount codes, and partnerships, and a marketplace where fans discover and buy directly from the athletes they follow.
          </p>
        </div>
 
        <div className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="sr-l flex justify-center lg:justify-start">
            <div className="profile-mock w-full max-w-[390px] overflow-hidden rounded-2xl bg-white">
              <div className="flex h-[210px] items-end p-6 bg-[linear-gradient(135deg,#092866_0%,#1a4db5_100%)]">
                <div className="flex items-end gap-4">
                  <div className="h-[76px] w-[76px] rounded-full border-4 border-white/80 bg-white/20" />
                  <div>
                    <div className="font-(family-name:--font-barlow) text-[22px] font-extrabold uppercase text-white">
                      Athlete Name
                    </div>
                    <div className="text-[12px] font-light text-white/70">
                      Sport · Team · Location
                    </div>
                  </div>
                </div>
              </div>
 
              <div className="p-6">
                <div className="mb-5 grid grid-cols-3 gap-3">
                </div>
 
                <div className="space-y-2">
                  {["Highlights", "Sponsors", "Socials", "Contact"].map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-3 border border-[#092866]/8 px-4 py-3"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#52aafc]/20" />
                      <span className="text-[14px] font-medium text-[#092866]/72">
                        {s}
                      </span>
                      <span className="ml-auto text-[#52aafc]">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
 
          <div className="sr-r grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ATHLINK_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="portal-card relative overflow-hidden bg-white p-6 shadow-sm"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="portal-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
                <div className="mb-4 font-(family-name:--font-barlow) text-[48px] font-extrabold leading-none text-[#092866]/[.08]">
                  {f.icon}
                </div>
                <h3 className="font-(family-name:--font-barlow) mb-2 text-[20px] font-bold uppercase text-[#092866]">
                  {f.title}
                </h3>
                <p className="text-[17px] font-normal leading-[1.75] text-[#092866]/66">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* TRANSITION */}
      <div className="relative h-24 overflow-hidden bg-[#f0f5fd]">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f0f5fd]" />
      </div>
 
      {/* TEAMS */}
      <section id="teams" className="relative overflow-hidden bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute left-0 top-10 font-(family-name:--font-barlow) text-[18vw] font-extrabold uppercase leading-none text-[#092866]/[0.035]">
          TEAMS
        </div>
 
        <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="sr-l">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Youth Sports Operations
              </span>
            </div>
 
            <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              Teams
              <br />
              <span className="text-[#52aafc]">Elevated.</span>
            </h2>
 
            <p className="mt-10 max-w-[540px] text-[18px] font-normal leading-[1.85] text-[#092866]/68">
              The youth sports operating system. Built to absorb the administrative weight coaches, league organizers, and parents carry behind the scenes.
            </p>
 
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                ["Payments", "Built-in collection"],
                ["Rosters", "Roster management"],
                ["Funding", "Crowdfunding tools"],
                ["Comms", "Family updates"],
              ].map(([v, l]) => (
                <div key={v} className="bg-white p-5">
                  <div className="font-(family-name:--font-barlow) text-[24px] font-extrabold uppercase text-[#52aafc]">
                    {v}
                  </div>
                  <div className="text-[11px] font-light text-[#092866]/62">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          <div className="sr-r space-y-0">
            {TEAMS_FEATURES.map((f, i) => (
              <div
                key={f.n}
                className="teams-row group py-6 pr-4"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-5">
                  <span className="font-(family-name:--font-barlow) mt-1 shrink-0 text-[16px] font-bold text-[#52aafc]">
                    {f.n}
                  </span>
 
                  <div>
                    <h3 className="font-(family-name:--font-barlow) mb-1 text-[20px] font-bold uppercase text-[#092866] transition-colors group-hover:text-[#52aafc]">
                      {f.title}
                    </h3>
                    <p className="text-[17px] font-normal leading-[1.75] text-[#092866]/66">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* CRM */}
      <section id="crm" className="grain relative overflow-hidden bg-[#071936] px-6 py-32 text-white md:px-12 lg:px-20">
        <div className="tech-grid absolute inset-0 opacity-20" />
        <div className="absolute right-0 top-0 h-[650px] w-[650px] rounded-full bg-[#52aafc]/10 blur-3xl" />
 
        <div className="relative z-10">
          <div className="sr mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#52aafc]" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  The Relationship OS
                </span>
              </div>
 
              <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88]">
                Eye In
                <br />
                <span className="text-[#52aafc]">Teams.</span>
              </h2>
            </div>
 
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-[18px] font-normal leading-[1.85] text-white/72">
                A purpose-built relationship CRM designed to retire scattered tools and legacy systems. Email, text, calls, templates, imports, surveys, and pipelines — under one roof.
              </p>
 
              <div className="inline-flex w-fit items-center gap-2 border-b border-[#52aafc]/50 pb-1 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
                Built to retire your stack →
              </div>
            </div>
          </div>
 
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {CRM_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="crm-card sr relative min-h-[204px] overflow-hidden p-6"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="crm-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
                <h3 className="font-(family-name:--font-barlow) mb-2 text-[18px] font-bold uppercase text-white">
                  {f.title}
                </h3>
                <p className="text-[17px] font-normal leading-[1.75] text-white/78">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
 
          <div className="sr mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
            {[
              { v: "B2B + B2C", label: "Communication pipelines" },
              { v: "Post-Close", label: "Native feedback" },
              { v: "Large-Scale", label: "Automated marketing" },
            ].map((s) => (
              <div key={s.v} className="flex items-center gap-4">
                <div className="h-0.5 w-6 bg-[#52aafc]" />
                <div>
                  <div className="font-(family-name:--font-barlow) text-[20px] font-extrabold uppercase text-[#52aafc]">
                    {s.v}
                  </div>
                  <div className="text-[11px] font-light text-white/78">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="bg-[#f0f5fd] px-6 py-28 md:px-12 lg:px-20">
        <div className="sr mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-4">
            <span className="h-0.5 w-8 bg-[#52aafc]" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
              Choose your entry
            </span>
            <span className="h-0.5 w-8 bg-[#52aafc]" />
          </div>
 
          <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,78px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
            Which part of the
            <br />
            ecosystem is <span className="text-[#52aafc]">yours?</span>
          </h2>
        </div>
 
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[
            {
              tag: "For Athletes",
              title: "Build your legacy.",
              body: "Claim your Athlink profile, build your presence, and step into the Athletes Elevated network.",
              href: "/athletes",
              cta: `${CTA.applyAthlete} →`,
              dark: true,
            },
            {
              tag: "For Brands",
              title: "Be part of the journey.",
              body: "Partner with us to reach athletes the way relationships were meant to be built — real, sustained, true.",
              href: "/brands",
              cta: `${CTA.partner} →`,
              dark: false,
            },
            {
              tag: "For Fans",
              title: "Follow what’s next.",
              body: "Athlete stories, new launches, and everything moving across Athletes Elevated — first.",
              href: "/fans",
              cta: `${CTA.joinNewsletter} →`,
              dark: false,
            },
          ].map((card, i) => (
            <div
              key={card.tag}
              className={`portal-card sr relative flex min-h-[342px] flex-col overflow-hidden p-10 ${
                card.dark
                  ? "bg-[#092866] text-white"
                  : "bg-white text-[#092866]"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="pointer-events-none absolute -bottom-8 -right-8 font-(family-name:--font-barlow) text-[120px] font-extrabold uppercase leading-none opacity-[.06] select-none">
                AE
              </div>
 
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  {card.tag}
                </div>
 
                <h3 className="font-(family-name:--font-barlow) mb-4 text-[clamp(28px,3vw,46px)] font-extrabold uppercase leading-[0.92]">
                  {card.title}
                </h3>
 
                <p
                  className={`text-[17px] font-normal leading-[1.8] ${
                    card.dark ? "text-white/78" : "text-[#092866]/66"
                  }`}
                >
                  {card.body}
                </p>

                <Link
                  href={card.href}
                  className={
                    card.dark
                      ? "btn-blue mt-auto inline-flex w-fit items-center px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
                      : "btn-navy mt-auto inline-flex w-fit items-center px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
                  }
                >
                  {card.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      <Footer />
    </div>
  );
}
