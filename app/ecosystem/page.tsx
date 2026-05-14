"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";

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

const PRODUCTS = [
  { id: "hero", label: "HERO", sub: "Documentary Series" },
  { id: "athlink", label: "Athlink", sub: "Athlete Platform" },
  { id: "teams", label: "Teams Elevated", sub: "Youth Sports Management" },
  { id: "crm", label: "Eye In Teams", sub: "CRM Platform" },
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
    title: "One Link",
    desc: "Everything about you — one clean URL to share everywhere.",
  },
  {
    icon: "02",
    title: "Stats & Highlights",
    desc: "Showcase your numbers, clips, and career milestones.",
  },
  {
    icon: "03",
    title: "Sponsorships",
    desc: "Showcase the brands, partnerships, and sponsors you’re connected with.",
  },
  {
    icon: "04",
    title: "Instant Setup",
    desc: "Live in minutes. No tech skills needed.",
  },
];

const TEAMS_FEATURES = [
  {
    n: "01",
    title: "League & Team Management",
    desc: "Full roster management, scheduling, and tournament tools for leagues of any size.",
  },
  {
    n: "02",
    title: "Payments & Banking",
    desc: "Leagues create their own bank accounts to collect fees from registrations, camps, uniforms, and gear.",
  },
  {
    n: "03",
    title: "Built-in Crowdfunding",
    desc: "Proprietary crowdfunding and split payment options so cost is never why a kid sits out.",
  },
  {
    n: "04",
    title: "Parent Communication",
    desc: "Automated updates, announcements, and messaging that keeps every family in the loop.",
  },
  {
    n: "05",
    title: "Sponsor & Fundraising Tools",
    desc: "Outreach and fundraising automation built for volunteer coaches who are already stretched thin.",
  },
];

const CRM_FEATURES = [
  {
    title: "Email Campaigns",
    desc: "Build, send, and track large-scale email campaigns with custom templates.",
  },
  {
    title: "SMS & Calls",
    desc: "Text and call directly from the platform — all logged automatically.",
  },
  {
    title: "Marketing Templates",
    desc: "Create branded templates for every touchpoint in your pipeline.",
  },
  {
    title: "Contact Import",
    desc: "Import your entire contact database in seconds.",
  },
  {
    title: "Post-Close Surveys",
    desc: "Built-in feedback tool — no separate platform needed.",
  },
  {
    title: "Automated Outreach",
    desc: "Set sequences and let the platform handle follow-ups at scale.",
  },
  {
    title: "B2B & B2C Pipelines",
    desc: "Manage both business and consumer relationships in one place.",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track opens, clicks, calls, and conversions in real time.",
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
                The AE Ecosystem
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
              <div className="ww block">
                <span
                  className="w text-[#52aafc]"
                  style={{
                    animationDelay: loaded ? ".38s" : "999s",
                    textShadow: "0 0 90px rgba(82,170,252,.65)",
                  }}
                >
                  One mission.
                </span>
              </div>
            </h1>

            <p
              className="mt-9 max-w-[540px] text-[16px] font-light leading-[1.88] text-white/62"
              style={{
                animation: loaded ? "slide-up .7s ease .72s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              Four products. One athlete-first ecosystem. Built to power storytelling, identity, youth sports, brand relationships, fan connection, and community impact.
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
              Explore the platform
            </div>

            <div className="space-y-0">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollTo(p.id)}
                  className="product-link group flex w-full items-center justify-between border-b border-white/10 py-7 pl-3 text-left last:border-b-0 hover:border-[#52aafc]/25"
                >
                  <div>
                    <div className="font-(family-name:--font-barlow) text-[clamp(26px,3vw,42px)] font-extrabold uppercase text-white transition-colors group-hover:text-[#52aafc]">
                      {p.label}
                    </div>
                    <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/42">
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
            ["ATHLINK", "Athlete profile platform"],
            ["TEAMS", "Youth sports management"],
            ["CRM", "Relationship operating system"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="border-r border-white/10 px-6 py-6 last:border-r-0 md:px-10"
            >
              <div className="font-(family-name:--font-barlow) text-[clamp(22px,3vw,40px)] font-extrabold leading-none text-[#52aafc]">
                {v}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/42">
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
              </div>

              <h2 className="font-(family-name:--font-barlow) mb-6 text-[clamp(38px,5vw,82px)] font-extrabold uppercase leading-[0.88]">
                Legends become
                <br />
                <span className="text-[#52aafc]">catalysts.</span>
              </h2>

              <p className="mb-8 max-w-[500px] text-[15px] font-light leading-[1.9] text-white/58">
                HERO explores how athletes evolve beyond competition to become cultural forces who shape conversations, inspire communities, and influence the world around them.
              </p>
            </div>
          </div>

          <div className="sr flex flex-col justify-center border-l border-white/10 px-8 py-20 md:px-12 lg:px-16">
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]/70">
              Already filmed
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
                      activeFilmed === i ? "text-[#52aafc]" : "text-white/62"
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
                  <p className="mt-2 text-[12px] font-light text-white/38">
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
                Created by Melissa Tittl · Hathor Studios
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
                Athlete Platform
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              One link.
              <br />
              Everything.
            </h2>
          </div>

          <p className="max-w-[460px] text-[15px] font-light leading-[1.85] text-[#092866]/50">
            Think Linktree — but built specifically for athletes. Your stats, highlights, socials, sponsors, and contact information all in one profile that brands can discover.
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
                  {/* {[
                    ["NIL", "Ready"],
                    ["4.8K", "Fans"],
                    ["12", "Brands"],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-[#f0f5fd] p-3 text-center">
                      <div className="font-(family-name:--font-barlow) text-[20px] font-extrabold text-[#092866]">
                        {v}
                      </div>
                      <div className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#092866]/45">
                        {l}
                      </div>
                    </div>
                  ))} */}
                </div>

                <div className="space-y-2">
                  {["Highlights", "Sponsors", "Socials", "Contact"].map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-3 border border-[#092866]/8 px-4 py-3"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#52aafc]/20" />
                      <span className="text-[13px] font-medium text-[#092866]/60">
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
                <p className="text-[13px] font-light leading-[1.75] text-[#092866]/48">
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
                Youth Sports Management
              </span>
            </div>

            <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              Teams
              <br />
              <span className="text-[#52aafc]">Elevated.</span>
            </h2>

            <p className="mt-10 max-w-[540px] text-[16px] font-light leading-[1.85] text-[#092866]/50">
              The comprehensive youth sports management platform that handles the administrative complexity coaches, league organizers, and parents deal with behind the scenes.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                ["Payments", "Built-in collection"],
                ["Rosters", "Team management"],
                ["Funding", "Crowdfunding tools"],
                ["Comms", "Parent updates"],
              ].map(([v, l]) => (
                <div key={v} className="bg-white p-5">
                  <div className="font-(family-name:--font-barlow) text-[24px] font-extrabold uppercase text-[#52aafc]">
                    {v}
                  </div>
                  <div className="text-[11px] font-light text-[#092866]/42">
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
                    <p className="text-[13px] font-light leading-[1.75] text-[#092866]/48">
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
                  CRM Platform
                </span>
              </div>

              <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88]">
                Eye In
                <br />
                <span className="text-[#52aafc]">Teams.</span>
              </h2>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-5 text-[16px] font-light leading-[1.85] text-white/55">
                A purpose-built relationship operating system designed to replace scattered tools and legacy CRMs. Email, text, calls, templates, contact import, surveys, B2B, and B2C pipelines — all in one platform.
              </p>

              <div className="inline-flex w-fit items-center gap-2 border-b border-[#52aafc]/50 pb-1 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
                Built to replace your entire stack →
              </div>
            </div>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-3">
              {CRM_FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className="crm-card sr relative w-[260px] shrink-0 overflow-hidden p-6"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="crm-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
                  <h3 className="font-(family-name:--font-barlow) mb-2 text-[18px] font-bold uppercase text-white">
                    {f.title}
                  </h3>
                  <p className="text-[12px] font-light leading-[1.75] text-white/42">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="sr mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
            {[
              { v: "B2B + B2C", label: "Communication pipelines" },
              { v: "Post-Close", label: "Built-in survey tool" },
              { v: "Large-Scale", label: "Automated marketing" },
            ].map((s) => (
              <div key={s.v} className="flex items-center gap-4">
                <div className="h-0.5 w-6 bg-[#52aafc]" />
                <div>
                  <div className="font-(family-name:--font-barlow) text-[20px] font-extrabold uppercase text-[#52aafc]">
                    {s.v}
                  </div>
                  <div className="text-[11px] font-light text-white/42">
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
              Get Started
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
              body: "Get your Athlink profile, build your presence, and connect with the AE community.",
              href: "/athletes",
              cta: "Apply as an Athlete →",
              dark: true,
            },
            {
              tag: "For Brands",
              title: "Be part of the journey.",
              body: "Partner with us to reach athletes in a real, lasting way.",
              href: "/brands",
              cta: "Apply as a Brand →",
              dark: false,
            },
            {
              tag: "For Fans",
              title: "Follow what’s next.",
              body: "Get access to athlete stories, new launches, and everything happening across AE.",
              href: "/fans",
              cta: "Join The Circle →",
              dark: false,
            },
          ].map((card, i) => (
            <div
              key={card.tag}
              className={`portal-card sr relative overflow-hidden p-10 ${
                card.dark
                  ? "bg-[#092866] text-white"
                  : "bg-white text-[#092866]"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="pointer-events-none absolute -bottom-8 -right-8 font-(family-name:--font-barlow) text-[120px] font-extrabold uppercase leading-none opacity-[.06] select-none">
                AE
              </div>

              <div className="relative z-10">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  {card.tag}
                </div>

                <h3 className="font-(family-name:--font-barlow) mb-4 text-[clamp(28px,3vw,46px)] font-extrabold uppercase leading-[0.92]">
                  {card.title}
                </h3>

                <p
                  className={`mb-8 text-[14px] font-light leading-[1.8] ${
                    card.dark ? "text-white/62" : "text-[#092866]/48"
                  }`}
                >
                  {card.body}
                </p>

                <Link
                  href={card.href}
                  className={
                    card.dark
                      ? "btn-blue inline-flex items-center px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
                      : "btn-navy inline-flex items-center px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
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
