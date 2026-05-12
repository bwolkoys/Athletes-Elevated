"use client";

import { useState, useEffect } from "react";
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

const SPORTS_LIST = [
  "Baseball",
  "Basketball",
  "Cycling",
  "Football",
  "Golf",
  "Gymnastics",
  "Hockey",
  "Lacrosse",
  "MMA / Combat Sports",
  "Rowing",
  "Rugby",
  "Skiing / Snowboarding",
  "Soccer",
  "Softball",
  "Swimming / Diving",
  "Tennis",
  "Track & Field",
  "Volleyball",
  "Wrestling",
  "Other",
];

const FORM_STEPS = [
  {
    step: 1,
    heading: "The basics",
    fields: [
      {
        id: "name",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Your full name",
      },
      {
        id: "email",
        label: "Email address",
        type: "email",
        required: true,
        placeholder: "you@email.com",
      },
      {
        id: "mobile",
        label: "Mobile number",
        type: "tel",
        placeholder: "+1 (000) 000-0000",
      },
      {
        id: "city",
        label: "City and state of primary residence",
        type: "text",
        placeholder: "e.g. Los Angeles, CA",
      },
      {
        id: "sport",
        label: "Primary sport",
        type: "select",
        required: true,
        options: SPORTS_LIST,
      },
    ],
  },
  {
    step: 2,
    heading: "Your athletic career",
    fields: [
      {
        id: "status",
        label: "Which best describes you today?",
        type: "select",
        required: true,
        options: [
          "Active NCAA athlete with active NIL deal(s)",
          "Active NCAA athlete pursuing NIL opportunities",
          "Active professional athlete",
          "Retired or transitioning professional athlete",
        ],
      },
      {
        id: "career_stage",
        label: "Where are you in your athletic career right now?",
        type: "select",
        required: true,
        options: [
          "Active NCAA, pre-professional decision",
          "Active NCAA, balancing NIL and academics",
          "Early career, building reputation",
          "Established mid-career",
          "Late career, looking past the sport",
          "Recently retired (within 2 years)",
          "Retired more than 2 years ago",
        ],
      },
      {
        id: "accomplishment",
        label: "What is your top career accomplishment you're most proud of?",
        type: "textarea",
        required: true,
        placeholder: "1–2 sentences",
      },
      {
        id: "verification",
        label:
          "Provide one verification source we can use to confirm your athletic credentials",
        type: "textarea",
        required: true,
        placeholder:
          "League profile URL, athletic department contact, agent name and email, recent verifiable article, or other public-facing source.",
      },
    ],
  },
  {
    step: 3,
    heading: "What you're looking for",
    fields: [
      {
        id: "interests",
        label:
          "What features that Athletes Elevated offers are you most interested in?",
        type: "multicheck",
        required: true,
        options: [
          "Business networking",
          "Athlink",
          "Fan engagement",
          "Mentorship opportunities",
          "CRM / Marketing",
        ],
      },
      {
        id: "goals",
        label: "What are you hoping Athletes Elevated will do for you?",
        type: "textarea",
        required: true,
        placeholder:
          'Be honest. We would rather you say "I want to make money on Athlink" than dress it up as something else. There is no wrong answer; there is only an unclear one. (3–5 sentences)',
      },
    ],
  },
  {
    step: 4,
    heading: "What you bring",
    fields: [
      {
        id: "contribution",
        label: "What can you contribute to this network beyond your name?",
        type: "textarea",
        required: true,
        placeholder:
          "AE only functions if all members are active and engaged. Fan engagement, mentorship, industry expertise, introductions, content, time for younger members, capital — anything counts. (3–5 sentences)",
        helperText:
          "* AE reserves the right to remove members who are not actively utilizing the platform.",
      },
    ],
  },
];

const FILMED = [
  {
    name: "Steve Young",
    sport: "NFL — Quarterback",
    detail: "Hall of Fame · 2× Super Bowl champion",
  },
  {
    name: "Jerry Rice",
    sport: "NFL — Wide Receiver",
    detail: "Greatest receiver in NFL history",
  },
  {
    name: "Sir Nick Faldo",
    sport: "Golf",
    detail: "6× Major champion · Ryder Cup legend",
  },
  {
    name: "Picabo Street",
    sport: "Alpine Ski Racing",
    detail: "Olympic gold medalist · 1998 Nagano",
  },
  {
    name: "West Ham United",
    sport: "Premier League",
    detail: "3× FA Cup · European Cup Winners Cup 1965",
  },
];

const TOOLS = [
  {
    name: "Athlink",
    tag: "Athlete Profile",
    desc: "One link for everything you are. Stats, highlights, social, contact — all in one place brands can find.",
    href: "/ecosystem/athlink",
    cta: "Get your link",
  },
  {
    name: "Teams Elevated",
    tag: "Youth Sports",
    desc: "Built for coaches and leagues. Payments, rosters, scheduling, and crowdfunding so cost is never why a kid sits out.",
    href: "/ecosystem/teams-elevated",
    cta: "Learn more",
  },
  {
    name: "HERO",
    tag: "Documentary — Jan 2027",
    desc: "Legends that become catalysts for change. A cinematic series redefining what it means to be a hero-athlete.",
    href: "/hero",
    cta: "Join the waitlist",
  },
  {
    name: "CRM",
    tag: "Modern Operating System",
    desc: "A unified CRM for managing athlete, brand, and fan relationships across email, text, calls, marketing, and both B2B and B2C communication.",
    href: "/ecosystem",
    cta: "Learn more",
  },
];

export default function ForAthletesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string | string[]>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
    document.querySelectorAll(".sr").forEach((el) => io.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const currentStep = FORM_STEPS.find((s) => s.step === step)!;
  const handleField = (id: string, value: string) =>
    setFormData((p) => ({ ...p, [id]: value }));
  const handleMultiCheck = (id: string, opt: string) =>
    setFormData((p) => {
      const arr = (p[id] as string[] | undefined) ?? [];
      return {
        ...p,
        [id]: arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt],
      };
    });
    const handleNext = async () => {
        const missingField = currentStep.fields.find((field) => {
          if (!field.required) return false;
      
          const value = formData[field.id];
      
          if (Array.isArray(value)) return value.length === 0;
      
          return !value || value.toString().trim() === "";
        });
      
        if (missingField) {
          alert(`${missingField.label} is required`);
          return;
        }
      
        if (step < FORM_STEPS.length) {
          setStep(step + 1);
          return;
        }
      
        const response = await fetch("/api/airtable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      
        if (!response.ok) {
          alert("Something went wrong. Please try again.");
          return;
        }
      
        setSubmitted(true);
      };
      
      const openModal = () => {
        setModalOpen(true);
        setStep(1);
        setSubmitted(false);
      };
      
      const closeModal = () => setModalOpen(false);

  return (
    <div
      className={`${barlow.variable} ${montserrat.variable} font-(family-name:--font-montserrat) bg-white text-[#092866] overflow-x-hidden`}
    >
      <style>{`
        @keyframes marquee  { to { transform: translateX(-50%); } }
        @keyframes slide-up { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes word-in  { from{opacity:0;transform:translateY(110%)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade     { from{opacity:0} to{opacity:1} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes glow     { 0%,100%{opacity:.08} 50%{opacity:.03} }
 
        .sr { opacity:0; transform:translateY(30px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-32px); transition:opacity .8s ease,transform .8s ease; }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(32px); transition:opacity .8s ease,transform .8s ease; }
        .sr-r.in { opacity:1; transform:translateX(0); }
 
        .ww { overflow:hidden; display:inline-block; vertical-align:bottom; }
        .w  { display:inline-block; animation:word-in .85s cubic-bezier(.22,1,.36,1) both; }
 
        .btn-blue { background:#52aafc; color:#06080f; transition:transform .2s,box-shadow .2s; }
        .btn-blue:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(82,170,252,.5),0 8px 24px rgba(82,170,252,.25); }
        .btn-ghost { border:1px solid rgba(9,40,102,.2); color:#092866; transition:border-color .2s,color .2s; }
        .btn-ghost:hover { border-color:#52aafc; color:#52aafc; }
 
        .tool-card { border:1px solid rgba(9,40,102,.08); transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s,border-color .3s; }
        .tool-card:hover { transform:translateY(-6px); box-shadow:0 32px 80px rgba(9,40,102,.1); border-color:rgba(82,170,252,.5); }
        .tool-card .bar { transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.22,1,.36,1); }
        .tool-card:hover .bar { transform:scaleX(1); }
        .tool-card .arr { transition:transform .3s; }
        .tool-card:hover .arr { transform:translateX(5px); }
 
        .filmed-row { transition:padding-left .25s ease; border-bottom:1px solid rgba(9,40,102,.08); }
        .filmed-row:hover { padding-left:12px; border-color:rgba(82,170,252,.3); }
        .filmed-row .filmed-cta { opacity:0; transform:translateX(-8px); transition:opacity .25s,transform .25s; }
        .filmed-row:hover .filmed-cta { opacity:1; transform:translateX(0); }
 
        .nav-lnk::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#52aafc; transition:width .3s; }
        .nav-lnk:hover::after, .nav-lnk.active::after { width:100%; }
 
        .ph { background:linear-gradient(135deg,#daeeff 0%,#b8d8f8 45%,#8fc0f2 100%); }
      `}</style>

      <Navbar />

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-25">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg,#c5ddf8 0%,#93c2f4 40%,#5fa8e8 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-(family-name:--font-barlow) text-[13px] font-semibold uppercase tracking-[0.3em] text-white/40">
              Full-bleed athlete photo goes here
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(9,40,102,.92) 0%, rgba(9,40,102,.6) 40%, rgba(9,40,102,.1) 80%, transparent 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute -right-48 -top-48 z-10 h-162.5 w-162.5 rounded-full border border-white/6"
          style={{ animation: "spin 50s linear infinite" }}
        />

        <div className="relative z-20 px-6 pb-0 pt-20 md:px-12 lg:px-20">
          <div
            className="mb-6 flex items-center gap-3"
            style={{
              animation: loaded ? "slide-up .6s ease .1s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <span
              className="h-0.5 w-10 bg-[#52aafc]"
              style={{ boxShadow: "0 0 10px rgba(82,170,252,.8)" }}
            />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]">
              For Athletes
            </span>
          </div>

          <h1 className="font-(family-name:--font-barlow) text-[clamp(56px,11vw,152px)] font-extrabold uppercase leading-[0.85] tracking-[-0.01em] text-white">
            <div className="ww block">
              <span
                className="w"
                style={{ animationDelay: loaded ? ".12s" : "999s" }}
              >
                You
              </span>
            </div>
            <div className="ww block">
              <span
                className="w"
                style={{ animationDelay: loaded ? ".24s" : "999s" }}
              >
                Are
              </span>
            </div>
            <div className="ww block">
              <span
                className="w"
                style={{ animationDelay: loaded ? ".38s" : "999s" }}
              >
                More
              </span>
            </div>
            <div className="ww block">
              <span
                className="w text-[#52aafc]"
                style={{
                  animationDelay: loaded ? ".52s" : "999s",
                  textShadow: "0 0 80px rgba(82,170,252,.7)",
                }}
              >
                Than
              </span>
            </div>
            <div className="ww block">
              <span
                className="w text-white"
                style={{ animationDelay: loaded ? ".65s" : "999s" }}
              >
                Your
              </span>
            </div>
            <div className="ww block">
              <span
                className="w text-[#52aafc]"
                style={{
                  animationDelay: loaded ? ".78s" : "999s",
                  textShadow: "0 0 80px rgba(82,170,252,.7)",
                }}
              >
                Sport.
              </span>
            </div>
          </h1>

          <div className="mt-8 flex flex-col gap-8 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <p
              className="max-w-105 text-[16px] font-light leading-[1.85] text-white/65"
              style={{
                animation: loaded ? "slide-up .7s ease .8s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              We built Athletes Elevated for the people behind the results —
              connecting you with tools, brands, and communities that understand
              performance goes far beyond the final score.
            </p>
            <div
              className="flex flex-wrap gap-3"
              style={{
                animation: loaded ? "slide-up .65s ease .95s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              <button
                onClick={openModal}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
              >
                Get Involved →
              </button>
              <Link
                href="#hero-doc"
                className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest text-white transition-all hover:border-[#52aafc] hover:text-[#52aafc]"
              >
                Watch HERO ↓
              </Link>
            </div>
          </div>
        </div>

        <div
          className="relative z-20 grid grid-cols-2 border-t border-white/12 md:grid-cols-4"
          style={{
            animation: loaded ? "fade .8s ease 1.05s both" : "none",
            opacity: loaded ? undefined : 0,
            background: "rgba(9,40,102,.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          {[
            ["3+", "Nonprofits supported"],
            ["100%", "Donations pass-through"],
            ["5", "Heroes already filmed"],
            ["Jan 2027", "HERO launches"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="border-r border-white/10 px-6 py-6 last:border-r-0 md:px-10"
            >
              <div
                className="font-(family-name:--font-barlow) text-[clamp(24px,3vw,46px)] font-extrabold leading-none text-[#52aafc]"
                style={{ textShadow: "0 0 20px rgba(82,170,252,.4)" }}
              >
                {v}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPORT TICKER */}
      <div className="overflow-hidden border-b border-[#092866]/8 bg-white py-4">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee 30s linear infinite",
            width: "max-content",
          }}
        >
          {[
            "Football",
            "Soccer",
            "Basketball",
            "Baseball",
            "Track & Field",
            "Tennis",
            "Golf",
            "Volleyball",
            "Lacrosse",
            "Swimming",
            "Wrestling",
            "Hockey",
            "Softball",
            "Rugby",
            "Rowing",
            "Gymnastics",
            "MMA",
            "Cycling",
            "Football",
            "Soccer",
            "Basketball",
            "Baseball",
            "Track & Field",
            "Tennis",
            "Golf",
            "Volleyball",
            "Lacrosse",
            "Swimming",
            "Wrestling",
            "Hockey",
            "Softball",
            "Rugby",
            "Rowing",
            "Gymnastics",
            "MMA",
            "Cycling",
          ].map((sport, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-5 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.2em] text-[#092866]/35 transition-colors hover:text-[#52aafc]"
            >
              {sport} <span className="h-1 w-1 rounded-full bg-[#52aafc]/40" />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. VALUES
      ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-32 md:px-12 lg:px-20 bg-[#f0f5fd]">
        <div className="sr mb-20">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-0.5 w-8 bg-[#52aafc]" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
              What we stand for
            </span>
          </div>
          <h2 className="font-(family-name:--font-barlow) text-[clamp(32px,4.5vw,66px)] font-extrabold uppercase leading-[0.92] text-[#092866]">
            Built around
            <br />
            the <span className="text-[#52aafc]">athlete.</span>
          </h2>
        </div>

        <div className="space-y-0 border-t border-[#092866]/8">
          {[
            {
              n: "01",
              tag: "Athlete First",
              title: "The human behind the result",
              body: "We show up for you beyond the highlight reel — for the grind, the setbacks, the comeback, and everything in between.",
            },
            {
              n: "02",
              tag: "Performance + Purpose",
              title: "More than a score",
              body: "Your success is even sweeter when it lifts others. We tie what you do on the field to something that lasts.",
            },
            {
              n: "03",
              tag: "Community",
              title: "Stronger together",
              body: "The best athletes are made by strong communities. We connect you to the people and tools that help both grow.",
            },
          ].map((v, i) => (
            <div
              key={v.n}
              className="sr group grid grid-cols-1 border-b border-[#092866]/8 py-12 transition-colors hover:bg-[#f0f5fd] md:grid-cols-[120px_1fr_1fr] md:gap-10"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-(family-name:--font-barlow) text-[56px] font-extrabold leading-none text-[#092866]/[.07] transition-colors group-hover:text-[#52aafc]/15 md:text-[72px]">
                {v.n}
              </div>
              <div className="mt-4 md:mt-0">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#52aafc]">
                  {v.tag}
                </span>
                <h3 className="font-(family-name:--font-barlow) text-[22px] font-bold uppercase text-[#092866]">
                  {v.title}
                </h3>
              </div>
              <p className="mt-3 text-[14px] font-light leading-[1.85] text-[#092866]/48 md:mt-0">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. HERO DOC
      ══════════════════════════════════════════════════════ */}
      <section id="hero-doc" className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="sr-l relative flex flex-col justify-end overflow-hidden bg-[#f0f5fd] px-8 py-20 md:px-16">
            <div className="pointer-events-none absolute -top-6 left-0 right-0 text-center font-[family-name:var(--font-barlow)] text-[28vw] font-extrabold uppercase leading-none text-[#092866]/[.04] select-none lg:text-[14vw]">
              HERO
            </div>
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#52aafc]" />
                <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  Documentary — January 2027
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-barlow)] mb-6 text-[clamp(34px,4.5vw,72px)] font-extrabold uppercase leading-[0.90] text-[#092866]">
                Legends that
                <br />
                become <span className="text-[#52aafc]">catalysts</span>
                <br />
                for change.
              </h2>
              <p className="mb-6 max-w-[440px] text-[15px] font-light leading-[1.88] text-[#092866]/50">
                From the gods of Olympus to modern high-performing athletes —
                HERO uncovers the timeless archetype of the hero-athlete,
                exploring how mythical warriors evolved into modern icons
                shaping culture and society.
              </p>
              <blockquote className="mb-8 border-l-[2px] border-[#52aafc] pl-6 text-[16px] font-light italic text-[#092866]/55">
                "The hero of today doesn't slay the dragon —<br />
                they inspire us to face it together."
              </blockquote>
              <div className="mb-10 space-y-0">
                {[
                  [
                    "1 — Origin of the Hero",
                    "Cave art, myth, Gilgamesh, Ancient Olympics",
                  ],
                  [
                    "2 — Super Humans",
                    "The rise of modern sport as ritual revival",
                  ],
                  [
                    "3 — The New Olympian",
                    "Athletes changing humanity through activism",
                  ],
                  [
                    "4 — Beyond the Arena",
                    "Social justice, education, mental health",
                  ],
                ].map(([ep, desc]) => (
                  <div
                    key={ep}
                    className="border-b border-[#092866]/8 py-4 last:border-b-0"
                  >
                    <span className="font-[family-name:var(--font-barlow)] block text-[13px] font-bold uppercase text-[#092866]">
                      {ep}
                    </span>
                    <span className="mt-0.5 block text-[12px] font-light text-[#092866]/42">
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
              >
                Join the HERO waitlist
              </button>
            </div>
          </div>

          <div
            className="sr relative flex flex-col justify-center bg-white px-8 py-20 md:px-12"
            style={{ transitionDelay: "130ms" }}
          >
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]">
              Already filmed
            </div>
            <div className="space-y-0">
              {FILMED.map((a) => (
                <div
                  key={a.name}
                  className="filmed-row group py-7 last:border-b-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-(family-name:--font-barlow) block text-[22px] font-bold uppercase text-[#092866] transition-colors group-hover:text-[#52aafc]">
                        {a.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] font-light text-[#092866]/42">
                        {a.detail}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#092866]/30">
                        {a.sport}
                      </span>
                      <span className="filmed-cta block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52aafc]">
                        Filmed ✓
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 border border-[#52aafc]/20 bg-[#52aafc]/5 p-6">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#52aafc]">
                In production
              </div>
              <div className="font-(family-name:--font-barlow) text-[14px] font-bold uppercase text-[#092866]">
                Created by Melissa Tittl · Hathor Studios
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. TOOLS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                The AE Ecosystem
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(30px,4vw,60px)] font-extrabold uppercase leading-[0.92] text-[#092866]">
              Tools built
              <br />
              for <span className="text-[#52aafc]">athletes.</span>
            </h2>
          </div>
          <p
            className="max-w-85 text-[14px] font-light leading-[1.8] text-[#092866]/45"
            style={{ transitionDelay: "120ms" }}
          >
            Everything we build starts with one question: does this make an
            athlete's life better?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {TOOLS.map((tool, i) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="tool-card sr relative overflow-hidden bg-white"
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className="bar absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
              <div className="absolute right-5 top-4 font-(family-name:--font-barlow) text-[90px] font-extrabold leading-none text-[#092866]/5 select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="ph flex h-50 w-full items-center justify-center">
                <span className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.3em] text-[#092866]/30">
                  Photo coming soon
                </span>
              </div>
              <div className="p-8">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[#52aafc]">
                  {tool.tag}
                </span>
                <h3 className="font-(family-name:--font-barlow) mb-3 text-[26px] font-extrabold uppercase text-[#092866]">
                  {tool.name}
                </h3>
                <p className="mb-7 text-[13px] font-light leading-[1.82] text-[#092866]/45">
                  {tool.desc}
                </p>
                <div className="inline-flex items-center gap-2 border-b border-[#52aafc]/35 pb-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
                  {tool.cta} <span className="arr">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#ffffff] px-6 py-32 md:px-12 lg:px-20">
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[40%]"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%,rgba(9,40,102,.08) 0%,transparent 65%)",
          }}
        />
        <div className="pointer-events-none absolute left-8 top-8 h-18 w-18 border-l-2 border-t-2 border-[#092866]/12" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-18 w-18 border-b-2 border-r-2 border-[#092866]/12" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Ready?
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-barlow)] mb-6 text-[clamp(40px,5.5vw,88px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              Your story
              <br />
              starts
              <br />
              <span
                className="text-[#52aafc]"
                style={{ textShadow: "0 0 40px rgba(82,170,252,.25)" }}
              >
                here.
              </span>
            </h2>
            <p className="max-w-[420px] text-[15px] font-light leading-[1.85] text-[#092866]/55">
              Whether you're an athlete chasing your next chapter or a brand
              looking to align with something real.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 bg-[#52aafc] px-10 py-5 font-[family-name:var(--font-barlow)] text-[14px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d347f]"
            >
              Get Involved →
            </button>
            <Link
              href="/brands"
              className="inline-flex items-center justify-center gap-2 border border-[#092866]/15 bg-transparent px-10 py-5 font-[family-name:var(--font-barlow)] text-[14px] font-bold uppercase tracking-widest text-[#092866] transition-all hover:border-[#52aafc] hover:text-[#52aafc]"
            >
              I'm a Brand →
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── MODAL ─────────────────────────────────────────────────────────── */}
      {modalOpen && (
  <div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-[#092866]/80 px-4 backdrop-blur-sm"
    onClick={(e) => {
      if (e.target === e.currentTarget) closeModal();
    }}
    style={{ animation: "fade .2s ease both" }}
  >
    <div
      className="relative flex max-h-[90vh] w-full max-w-lg flex-col bg-white"
      style={{ animation: "slide-up .3s ease both" }}
    >
      {/* progress bar */}
      <div className="h-[3px] w-full shrink-0 bg-[#092866]/8">
        <div
          className="h-full bg-[#52aafc] transition-all duration-500"
          style={{
            width: submitted
              ? "100%"
              : `${(step / FORM_STEPS.length) * 100}%`,
          }}
        />
      </div>

      {/* close */}
      <button
        onClick={closeModal}
        aria-label="Close"
        className="absolute right-4 top-4 text-[#092866]/30 transition-colors hover:text-[#092866]"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 4l12 12M16 4L4 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* scrollable body */}
      <div className="overflow-y-auto px-8 py-8">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-[#52aafc]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L19 7"
                  stroke="#092866"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="font-(family-name:--font-barlow) mb-3 text-[28px] font-extrabold uppercase text-[#092866]">
              You're in.
            </h3>

            <p className="text-[14px] font-light leading-[1.75] text-[#092866]/50">
              We'll be in touch soon.
            </p>

            <button
              onClick={closeModal}
              className="mt-8 inline-flex items-center gap-2 bg-[#092866] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-[#0d3a8c]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* step dots */}
            <div className="mb-6 flex items-center gap-2">
              {FORM_STEPS.map((s) => (
                <div
                  key={s.step}
                  className={`h-[2px] flex-1 transition-colors duration-300 ${
                    s.step <= step ? "bg-[#52aafc]" : "bg-[#092866]/10"
                  }`}
                />
              ))}
            </div>

            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#52aafc]">
              Step {step} of {FORM_STEPS.length}
            </span>

            <h3 className="font-(family-name:--font-barlow) mb-6 text-[26px] font-extrabold uppercase text-[#092866]">
              {currentStep.heading}
            </h3>

            <div className="space-y-5">
              {currentStep.fields.map((field) => {
                if (field.type === "select")
                  return (
                    <div key={field.id}>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-[#52aafc]">*</span>
                        )}
                      </label>

                      <select
                        required={field.required}
                        className="w-full border border-[#092866]/15 bg-white px-4 py-3 text-[14px] font-light text-[#092866] outline-none focus:border-[#52aafc]"
                        value={(formData[field.id] as string) ?? ""}
                        onChange={(e) =>
                          handleField(field.id, e.target.value)
                        }
                      >
                        <option value="">Select...</option>
                        {field.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  );

                if (field.type === "textarea")
                  return (
                    <div key={field.id}>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-[#52aafc]">*</span>
                        )}
                      </label>

                      <textarea
                        rows={4}
                        required={field.required}
                        className="w-full resize-none border border-[#092866]/15 bg-white px-4 py-3 text-[14px] font-light text-[#506ba0] outline-none focus:border-[#52aafc]"
                        placeholder={field.placeholder}
                        value={(formData[field.id] as string) ?? ""}
                        onChange={(e) =>
                          handleField(field.id, e.target.value)
                        }
                      />

                      {field.helperText && (
                        <p className="mt-2 text-[12px] leading-relaxed text-[#092866]/25 italic">
                          {field.helperText}
                        </p>
                      )}
                    </div>
                  );

                if (field.type === "multicheck") {
                  const selected = (formData[field.id] as string[]) ?? [];

                  return (
                    <div key={field.id}>
                      <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-[#52aafc]">*</span>
                        )}
                      </label>

                      <div className="grid grid-cols-2 gap-2">
                        {field.options?.map((opt) => {
                          const checked = selected.includes(opt);

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                handleMultiCheck(field.id, opt)
                              }
                              className={`flex items-center gap-2.5 border px-3.5 py-2.5 text-left text-[12px] font-medium transition-all ${
                                checked
                                  ? "border-[#52aafc] bg-[#52aafc]/8 text-[#092866]"
                                  : "border-[#092866]/12 text-[#092866]/50 hover:border-[#52aafc]/50"
                              }`}
                            >
                              <span
                                className={`h-3.5 w-3.5 shrink-0 border transition-colors ${
                                  checked
                                    ? "border-[#52aafc] bg-[#52aafc]"
                                    : "border-[#092866]/30"
                                }`}
                              >
                                {checked && (
                                  <svg
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    className="h-full w-full p-px"
                                  >
                                    <path
                                      d="M1.5 5l2.5 2.5 4.5-4.5"
                                      stroke="#fff"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                )}
                              </span>

                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={field.id}>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-[#52aafc]">*</span>
                      )}
                    </label>

                    <input
                      type={field.type}
                      required={field.required}
                      className="w-full border border-[#092866]/15 bg-white px-4 py-3 text-[14px] font-light text-[#092866] outline-none focus:border-[#52aafc]"
                      placeholder={field.placeholder}
                      value={(formData[field.id] as string) ?? ""}
                      onChange={(e) =>
                        handleField(field.id, e.target.value)
                      }
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#092866]/38 hover:text-[#092866]"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}

              <button
                onClick={handleNext}
                className="btn-blue inline-flex items-center gap-2 px-8 py-3.5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.12em]"
              >
                {step === FORM_STEPS.length ? "Submit" : "Next →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
