"use client";
 
import {
  useEffect,
  useState,
  useRef,
  MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";
import StatusChip from "../src/components/statusChip";
import { createParticles } from "../src/lib/particles";
import { CTA, HERO_PROPOSITIONS } from "../src/lib/uxContent";
 
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
 
const REASONS = [
  {
    n: "01",
    title: "Athlete-First Audience",
    body: "Athletes, fans, families, and communities who actually care about the ecosystem.",
  },
  {
    n: "02",
    title: "Cultural Alignment",
    body: "Partnerships built around shared values, storytelling, and long-form impact.",
  },
  {
    n: "03",
    title: "One Partnership, Every Surface",
    body: "A single relationship that lives across athlete profiles, youth sports, fan engagement, and live experiences.",
  },
];
 
const ECOSYSTEM_REACH = [
  {
    product: "Athlink",
    desc: "The marketplace where fans buy from the athletes they follow — and where brands get found.",
    stat: "Live now",
  },
  {
    product: "Teams Elevated",
    desc: "Youth leagues across the country",
    stat: "Soccer + growing",
  },
  {
    product: "Eye In Teams",
    desc: "The relationship system connecting brands to athletes at scale",
    stat: "Built in-house",
  },
  {
    product: "Social Media",
    desc: "Original athlete-driven content meeting fans where culture lives.",
    stat: "Growing Daily",
  },
];
 
const PARTNERS = [
  "Essex Mortgage",
  "Salt Box PC",
  "Holistic Beverages",
  "TeeBox Golf",
  "Bloom Intelligence",
  "Dos Amigos",
  "Mother's Comfort Foods",
];
 
type FormField = {
  id: string;
  label: string;
  type: "text" | "email" | "select" | "textarea" | "multicheck";
  placeholder?: string;
  required?: boolean;
  options?: string[];
};
 
type FormStep = {
  step: number;
  heading: string;
  fields: FormField[];
};
 
const FORM_STEPS: FormStep[] = [
  {
    step: 1,
    heading: "Tell us about your brand",
    fields: [
      { id: "company", label: "Company name", type: "text", placeholder: "Your company", required: true },
      { id: "name", label: "Your name", type: "text", placeholder: "Full name", required: true },
      { id: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true },
    ],
  },
  {
    step: 2,
    heading: "Your goals",
    fields: [
      {
        id: "tier",
        label: "Partnership tier",
        type: "select",
        required: true,
        options: ["Community", "Partner", "Premier", "Not sure yet"],
      },
      {
        id: "budget",
        label: "Estimated budget",
        type: "select",
        options: [
          "Under $5k",
          "$5k – $15k",
          "$15k – $50k",
          "$50k+",
          "Prefer not to say",
        ],
      },
      {
        id: "goals",
        label: "Primary goals",
        type: "multicheck",
        options: [
          "Brand awareness",
          "Athlete partnerships",
          "Community impact",
          "Youth sports reach",
          "Content creation",
        ],
      },
    ],
  },
  {
    step: 3,
    heading: "Anything else",
    fields: [
      {
        id: "timeline",
        label: "Timeline",
        type: "select",
        options: ["ASAP", "1–3 months", "3–6 months", "Just exploring"],
      },
      { id: "message", label: "Tell us more", type: "textarea", placeholder: "Optional..." },
    ],
  },
];
 
/* ──────────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES
   ────────────────────────────────────────────────────────────────────────── */
function FloatingParticles({
  count = 24,
  color = "rgba(82,170,252,0.5)",
}: {
  count?: number;
  color?: string;
}) {
  const particles = createParticles(count);
 
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute block rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: color,
            opacity: 0,
            animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
 
export default function BrandsPage() {
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
 
  const heroRef = useRef<HTMLElement | null>(null);
 
  /* scroll reveal + load */
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
 
    document.querySelectorAll(".sr, .sr-l, .sr-r").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
 
  /* mouse spotlight on hero */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
 
  /* card tilt — used on the Why Partner rows */
  const handleCardTilt = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rY = (x / rect.width) * 4;
    const rX = -(y / rect.height) * 4;
    card.style.transform = `perspective(1400px) rotateX(${rX}deg) rotateY(${rY}deg)`;
  };
  const resetCardTilt = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };
 
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
 
  const handleNext = () => {
    if (submitting) return;

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
    } else {
      setSubmitting(true);
      setSubmitted(true);
      setSubmitting(false);
    }
  };
 
  const openModal = () => {
    setModalOpen(true);
    setStep(1);
    setSubmitted(false);
    setSubmitting(false);
    setFormData({});
  };
 
  const closeModal = () => setModalOpen(false);
 
  return (
    <div
      className={`${barlow.variable} ${montserrat.variable} bg-white overflow-x-hidden font-(family-name:--font-montserrat) text-[#092866]`}
    >
      <style>{`
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes slide-up { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes word-in { from{opacity:0;transform:translateY(110%) skewY(4deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes fade { from{opacity:0} to{opacity:1} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.7)} }
        @keyframes scan { 0%{transform:translateY(-100%);opacity:0} 12%{opacity:.6} 100%{transform:translateY(100%);opacity:0} }
        @keyframes drift {
          0% { opacity:0; transform:translate(0,0) scale(1); }
          15% { opacity:1; }
          85% { opacity:.85; }
          100% { opacity:0; transform:translate(28px,-80px) scale(.6); }
        }
        @keyframes breathe-glow {
          0%,100% { text-shadow:0 0 60px rgba(82,170,252,.45); }
          50% { text-shadow:0 0 120px rgba(82,170,252,.9), 0 0 30px rgba(82,170,252,.6); }
        }
        @keyframes arrow-bounce {
          0%,100% { transform:translateX(0); }
          50% { transform:translateX(6px); }
        }
        @keyframes shimmer-line {
          0%,100% { box-shadow:0 0 6px rgba(82,170,252,.5); }
          50% { box-shadow:0 0 18px rgba(82,170,252,1); }
        }
        @keyframes pulse-ring {
          0% { transform:scale(1); opacity:.7; }
          100% { transform:scale(2.4); opacity:0; }
        }
        @keyframes vertical-scan {
          0% { transform:translateY(0); }
          50% { transform:translateY(80px); }
          100% { transform:translateY(0); }
        }
        @keyframes float-soft {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(-6px); }
        }
        @keyframes shimmer-bar {
          0%,100% { opacity:.4; }
          50% { opacity:1; }
        }
 
        .sr { opacity:0; transform:translateY(32px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-40px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(40px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-r.in { opacity:1; transform:translateX(0); }
 
        .ww { overflow:hidden; display:inline-block; vertical-align:bottom; }
        .w { display:inline-block; animation:word-in .85s cubic-bezier(.22,1,.36,1) both; }
 
        .accent-line {
          display:inline-block;
          height:2px;
          background:#52aafc;
          animation:shimmer-line 2.4s ease-in-out infinite;
        }
 
        .grain {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
        }
 
        .tech-grid {
          background-image:
            linear-gradient(rgba(82,170,252,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(82,170,252,.12) 1px, transparent 1px);
          background-size:52px 52px;
        }
 
        .spotlight {
          background: radial-gradient(circle 420px at var(--mx,70%) var(--my,30%), rgba(82,170,252,.22), transparent 65%);
          transition: background .15s ease;
        }
 
        .scanline {
          position:absolute; left:0; right:0; height:140px;
          background: linear-gradient(180deg, transparent, rgba(82,170,252,.18), transparent);
          mix-blend-mode: screen;
          pointer-events:none;
          animation: scan 9s ease-in-out infinite;
          animation-delay: 1s;
        }
 
        .marquee-track { width:max-content; }
        .marquee-track:hover { animation-play-state:paused; }
 
        .btn-blue {
          background:#52aafc;
          color:#06111f;
          transition:transform .2s,box-shadow .2s;
          position:relative;
        }
        .btn-blue:hover {
          transform:translateY(-2px);
          box-shadow:0 0 44px rgba(82,170,252,.48),0 10px 30px rgba(82,170,252,.25);
        }
        .btn-blue:hover .arr { animation: arrow-bounce .55s ease-in-out infinite; }
 
        .btn-outline {
          border:1px solid rgba(82,170,252,.45);
          color:#52aafc;
          transition:background .2s,color .2s,transform .2s;
        }
        .btn-outline:hover {
          background:#52aafc;
          color:#06111f;
          transform:translateY(-2px);
        }
        .btn-outline:hover .arr { animation: arrow-bounce .55s ease-in-out infinite; }
 
        .btn-light-outline {
          border:1px solid rgba(9,40,102,.15);
          color:#092866;
          transition:border-color .2s,color .2s,transform .2s;
        }
        .btn-light-outline:hover {
          border-color:#52aafc;
          color:#52aafc;
          transform:translateY(-2px);
        }
        .btn-light-outline:hover .arr { animation: arrow-bounce .55s ease-in-out infinite; }
 
        .portal-card {
          border:1px solid rgba(82,170,252,.14);
          transition:transform .55s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .3s;
          transform-style:preserve-3d;
          will-change:transform;
        }
        .portal-card:hover {
          border-color:rgba(82,170,252,.55);
          box-shadow:0 30px 80px rgba(9,40,102,.14);
        }
        .portal-card:hover .portal-line { transform:scaleX(1); }
        .portal-line {
          transform:scaleX(0);
          transform-origin:left;
          transition:transform .4s ease;
        }
 
        .eco-row {
          position:relative;
          border-bottom:1px solid rgba(255,255,255,.06);
          transition:padding-left .25s ease,background .25s,border-color .25s;
        }
        .eco-row:hover {
          padding-left:14px;
          background:rgba(82,170,252,.045);
          border-bottom-color:rgba(82,170,252,.3);
        }
        .eco-row::before {
          content:""; position:absolute; left:0; top:0; bottom:0;
          width:2px; background:#52aafc; transform:scaleY(0);
          transform-origin:top; transition:transform .35s ease;
        }
        .eco-row:hover::before { transform:scaleY(1); }
 
        .live-dot {
          position:relative;
          display:inline-block;
          width:8px; height:8px;
          border-radius:9999px;
          background:#ff3b30;
        }
        .live-dot::before {
          content:""; position:absolute; inset:0;
          border-radius:9999px;
          background:#ff3b30;
          animation: pulse-ring 1.6s ease-out infinite;
        }
      `}</style>
 
      <Navbar />
 
      {/* HERO */}
      <section
        ref={heroRef}
        className="grain relative flex min-h-screen overflow-hidden bg-[#071936] pt-24 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(82,170,252,.35),transparent_30%),linear-gradient(135deg,#071936_0%,#092866_55%,#030814_100%)]" />
        <div className="tech-grid absolute inset-0 opacity-20" />
 
        {/* mouse-tracked spotlight */}
        <div className="spotlight pointer-events-none absolute inset-0" />
 
        {/* periodic scanline */}
        <div className="scanline" />
 
        {/* floating particles */}
        <FloatingParticles count={32} />
 
        {/* corner watermark */}
        <div
          className="pointer-events-none absolute right-0 top-24 font-(family-name:--font-barlow) text-[17vw] font-extrabold uppercase leading-none text-white/[0.035]"
          style={{ animation: "float-soft 12s ease-in-out infinite" }}
        >
          BRANDS
        </div>
 
        {/* bottom right glow */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-[70vh] w-[55vw] bg-[radial-gradient(circle_at_60%_55%,rgba(82,170,252,.18),transparent_62%)]" />
 
        {/* right scroll indicator */}
        <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
          <div className="relative h-20 w-px overflow-hidden bg-white/20">
            <span
              className="absolute left-0 right-0 h-6 bg-[#52aafc]"
              style={{ animation: "vertical-scan 3s ease-in-out infinite" }}
            />
          </div>
          <span
            className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.4em] text-white/72"
            style={{ writingMode: "vertical-rl" }}
          >
            Accepting partners
          </span>
          <div className="h-20 w-px bg-white/20" />
          <div
            className="h-2 w-2 rounded-full bg-[#52aafc]"
            style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
          />
        </div>
 
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-20">
          <div
            className="mb-8 flex items-center gap-3"
            style={{
              animation: loaded ? "slide-up .6s ease .1s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <span className="accent-line w-10" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.35em] text-[#52aafc]">
              For Brands
            </span>
            <StatusChip status="Invite-only" />
          </div>
 
          <h1
            className="max-w-[1100px] font-(family-name:--font-barlow) font-extrabold uppercase leading-[0.84] tracking-[-0.03em]"
            style={{ fontSize: "clamp(58px,11vw,170px)" }}
          >
            <div className="ww block">
              <span
                className="w"
                style={{ animationDelay: loaded ? ".12s" : "999s" }}
              >
                More than
              </span>
            </div>
 
            {/* punch line: character-split + breathing glow */}
            <div className="block">
              <span
                className="inline-block text-[#52aafc]"
                style={{
                  animation: loaded
                    ? "breathe-glow 3s ease-in-out 1.4s infinite"
                    : "none",
                }}
              >
                {"A SPONSOR.".split("").map((char, i) => (
                  <span
                    key={i}
                    className="w inline-block"
                    style={{
                      animationDelay: loaded ? `${0.32 + i * 0.06}s` : "999s",
                    }}
                  >
                    {char === " " ? " " : char}
                  </span>
                ))}
              </span>
            </div>
          </h1>
 
          <p
            className="mt-10 max-w-[700px] text-[19px] font-normal leading-[1.75] text-white/88"
            style={{
              animation: loaded ? "slide-up .7s ease 1.1s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            {HERO_PROPOSITIONS.brands}
          </p>
 
          <div
            className="mt-10 flex flex-wrap gap-4"
            style={{
              animation: loaded ? "slide-up .65s ease 1.25s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <button
              onClick={openModal}
              className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.15em]"
            >
              {CTA.partner} <span className="arr inline-block">→</span>
            </button>
 
            <Link
              href="/ecosystem"
              className="btn-outline inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.15em]"
            >
              {CTA.exploreEcosystem} <span className="arr inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>
 
      {/* MARQUEE (pause on hover) */}
      <div className="overflow-hidden bg-[#52aafc] py-3">
        <div
          className="marquee-track flex whitespace-nowrap"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {[
            "ATHLETE-FIRST",
            "COMMUNITY IMPACT",
            "YOUTH SPORTS",
            "BRAND PARTNERSHIPS",
            "STORYTELLING",
            "ATHLINK",
            "HERO",
            "EYE IN TEAMS",
            "ATHLETE-FIRST",
            "COMMUNITY IMPACT",
            "YOUTH SPORTS",
            "BRAND PARTNERSHIPS",
            "STORYTELLING",
            "ATHLINK",
            "HERO",
            "EYE IN TEAMS",
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-7 px-7 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.2em] text-[#071936]"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-[#071936]/35" />
            </span>
          ))}
        </div>
      </div>
 
      {/* WHY PARTNER */}
      <section className="relative overflow-hidden bg-white px-6 py-32 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute right-0 top-0 font-(family-name:--font-barlow) text-[18vw] font-extrabold uppercase leading-none text-[#092866]/[0.035]">
          PURPOSE
        </div>
 
        <div className="sr relative z-10 mb-20">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="accent-line w-8" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
              Why partner
            </span>
          </div>
 
          <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,84px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
            Partnerships
            <br />
            with <span className="text-[#52aafc]">purpose.</span>
          </h2>
        </div>
 
        <div className="relative z-10 space-y-0 border-t border-[#092866]/10">
          {REASONS.map((r, i) => (
            <div
              key={r.n}
              className="sr group relative grid grid-cols-1 gap-6 border-b border-[#092866]/10 py-12 transition-all hover:bg-[#52aafc]/[0.025] md:grid-cols-[120px_1fr_1fr]"
              style={{
                transitionDelay: `${i * 90}ms`,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleCardTilt}
              onMouseLeave={resetCardTilt}
            >
              <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
 
              <div className="font-(family-name:--font-barlow) text-[72px] font-extrabold leading-none text-[#092866]/[0.06] transition-colors group-hover:text-[#52aafc]/20">
                {r.n}
              </div>
 
              <h3 className="font-(family-name:--font-barlow) text-[26px] font-bold uppercase text-[#092866] transition-colors group-hover:text-[#52aafc]">
                {r.title}
              </h3>
 
              <p className="text-[17px] font-normal leading-[1.9] text-[#092866]/68">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>
 
      {/* PARTNERSHIP PROCESS */}
      <section className="relative overflow-hidden bg-[#f0f5fd] px-6 py-24 md:px-12 lg:px-20">
        <div className="sr mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="accent-line w-8" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Partnership process
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(34px,4.5vw,76px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
              Clear path.
              <br />
              Real launch.
            </h2>
          </div>
          <p className="max-w-[430px] text-[17px] font-normal leading-[1.85] text-[#092866]/70">
            Brand conversations should feel specific quickly. This is the working path from first contact to reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 border-y border-[#092866]/10 md:grid-cols-5">
          {["Apply", "Discovery", "Proposal", "Launch", "Reporting"].map((stepName, i) => (
            <div
              key={stepName}
              className="sr group relative border-b border-[#092866]/10 px-6 py-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="font-(family-name:--font-barlow) text-[48px] font-extrabold leading-none text-[#092866]/[.08]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-(family-name:--font-barlow) text-[21px] font-bold uppercase text-[#092866]">
                {stepName}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ECOSYSTEM (dark, energized) */}
      <section className="relative overflow-hidden bg-[#071936]">
        <div className="tech-grid absolute inset-0 opacity-15" />
        <FloatingParticles count={22} />
        <div className="scanline" />
 
        <div className="relative z-10 grid min-h-[600px] grid-cols-1 lg:grid-cols-2">
          {/* left — big stats */}
          <div
            className="relative flex flex-col justify-center px-8 py-20 md:px-16"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%,rgba(82,170,252,.1) 0%,transparent 65%)",
            }}
          >
            <div
              className="absolute left-0 top-1/2 hidden h-[300px] w-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(82,170,252,.08),transparent_70%)] blur-3xl lg:block"
              style={{ animation: "float-soft 9s ease-in-out infinite" }}
            />
 
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3">
                <span className="accent-line w-8" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  Ecosystem Reach
                </span>
              </div>
 
              <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,86px)] font-extrabold uppercase leading-[0.88] text-white">
                One brand.
                <br />
                <span
                  className="inline-block text-[#52aafc]"
                  style={{ animation: "breathe-glow 3s ease-in-out infinite" }}
                >
                  Every touchpoint.
                </span>
              </h2>
 
              <p className="mb-12 mt-6 max-w-[400px] text-[17px] font-normal leading-[1.85] text-white/68">
                Partner with Athletes Elevated and your brand shows up across the entire system — athlete platforms, youth sports, original content, events, and community-led experiences.
              </p>
 
              <div className="grid grid-cols-2 gap-6">
                {[
                  { v: "4", l: "Connected products" },
                  { v: "100%", l: "Athlete-first" },
                  { v: "Global", l: "Content reach" },
                  { v: "Growing", l: "Athlete network" },
                ].map((s, i) => (
                  <div key={s.l} className="group relative pl-4">
                    <span
                      className="absolute left-0 top-0 block h-full w-[2px] bg-[#52aafc]"
                      style={{
                        animation: "shimmer-bar 2.6s ease-in-out infinite",
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                    <div
                      className="font-(family-name:--font-barlow) text-[clamp(24px,3vw,42px)] font-extrabold leading-none text-[#52aafc] transition-transform group-hover:translate-x-1"
                      style={{ textShadow: "0 0 30px rgba(82,170,252,.25)" }}
                    >
                      {s.v}
                    </div>
 
                    <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/76">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* right — product list */}
          <div
            className="sr relative flex flex-col justify-center border-l border-white/[.06] px-8 py-20 md:px-12"
            style={{ transitionDelay: "130ms" }}
          >
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="live-dot" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]">
                Where your brand appears
              </span>
            </div>
 
            <div className="space-y-0 border-t border-white/[.06]">
              {ECOSYSTEM_REACH.map((item, i) => (
                <div
                  key={item.product}
                  className="eco-row group px-2 py-7"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-(family-name:--font-barlow) text-[24px] font-extrabold uppercase text-white transition-colors group-hover:text-[#52aafc]">
                        {item.product}
                      </div>
                      <div className="mt-0.5 text-[12px] font-light text-white/60">
                        {item.desc}
                      </div>
                    </div>
 
                    <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#52aafc]/30 px-3 py-1">
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#52aafc] animate-pulse" />
                      <span className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.14em] text-[#52aafc]/85">
                        {item.stat}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
 
            <div className="mt-10">
              <button
                onClick={openModal}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.15em]"
              >
                {CTA.partner} <span className="arr inline-block">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
 
      {/* PARTNERS */}
      <section className="bg-white px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="accent-line w-8" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
              In the room
            </span>
            <span className="accent-line w-8" />
          </div>
 
          <h2 className="font-(family-name:--font-barlow) text-[clamp(34px,5vw,76px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
            Brands that
            <br />
            believe in <span className="text-[#52aafc]">more.</span>
          </h2>
        </div>
 
        <div className="overflow-hidden border-y border-[#092866]/10 py-6">
          <div
            className="marquee-track flex whitespace-nowrap"
            style={{ animation: "marquee 26s linear infinite" }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-10 px-10 font-(family-name:--font-barlow) text-[15px] font-bold uppercase tracking-[0.12em] text-[#092866]/68 transition-colors hover:text-[#52aafc]"
              >
                {p}
                <span className="h-1 w-1 rounded-full bg-[#092866]/20" />
              </span>
            ))}
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f0f5fd] px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(82,170,252,.08)_0%,transparent_65%)]" />
 
        {/* subtle corner brackets */}
        <div className="pointer-events-none absolute left-8 top-8 h-20 w-20 border-l-2 border-t-2 border-[#092866]/12" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-[#092866]/12" />
        <div className="pointer-events-none absolute right-8 top-8 h-20 w-20 border-r-2 border-t-2 border-[#092866]/8" />
        <div className="pointer-events-none absolute bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-[#092866]/8" />
 
        {/* soft floating gradient orb */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#52aafc]/8 blur-3xl"
          style={{ animation: "float-soft 9s ease-in-out infinite" }}
        />
 
        <div className="sr relative z-10 max-w-[900px]">
          <div className="mb-8 inline-flex items-center gap-4">
            <span className="accent-line w-10" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.35em] text-[#52aafc]">
              The invitation
            </span>
            <span className="accent-line w-10" />
          </div>
 
          <h2
            className="font-(family-name:--font-barlow) font-extrabold uppercase leading-[0.84] tracking-[-0.03em] text-[#092866]"
            style={{ fontSize: "clamp(52px,11vw,150px)" }}
          >
            LET&apos;S
            <br />
            BUILD
            <br />
            <span
              className="inline-block text-[#52aafc]"
              style={{ animation: "breathe-glow 3s ease-in-out infinite" }}
            >
              SOMETHING.
            </span>
          </h2>
 
          <p className="mx-auto mt-8 max-w-[420px] text-[18px] font-normal leading-[1.85] text-[#092866]/66">
            Tell us about your brand and what you&rsquo;re seeking. We&rsquo;ll build something meaningful together.
          </p>
 
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={openModal}
              className="btn-blue inline-flex items-center gap-2 px-12 py-5 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-[0.15em]"
            >
              {CTA.partner} <span className="arr inline-block">→</span>
            </button>
 
            <Link
              href="/athletes"
              className="btn-light-outline inline-flex items-center gap-2 px-12 py-5 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-[0.15em]"
            >
              I&apos;m An Athlete <span className="arr inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>
 
      <Footer />
 
      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#030814]/85 px-4 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          style={{ animation: "fade .2s ease both" }}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden bg-white"
            style={{ animation: "slide-up .3s ease both" }}
          >
            <div className="h-[3px] bg-[#092866]/10">
              <div
                className="h-full bg-[#52aafc] transition-all duration-500"
                style={{
                  width: submitted ? "100%" : `${(step / FORM_STEPS.length) * 100}%`,
                }}
              />
            </div>
 
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 text-[#092866]/68 transition-colors hover:text-[#092866]"
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
 
            <div className="p-8">
              {submitted ? (
                <div className="py-10 text-center">
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
 
                  <h3 className="font-(family-name:--font-barlow) text-[28px] font-extrabold uppercase text-[#092866]">
                    We&apos;ll be in touch.
                  </h3>
 
                  <p className="mt-3 text-[17px] font-normal leading-[1.8] text-[#092866]/68">
                    Thanks for reaching out. We review partnership inquiries manually and will follow up by email with fit, timing, and next-step questions.
                  </p>
 
                  <button
                    onClick={closeModal}
                    className="btn-blue mt-8 inline-flex items-center gap-2 px-8 py-3.5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.18em]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
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
 
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#52aafc]">
                    Step {step} of {FORM_STEPS.length}
                  </span>
 
                  <h3 className="font-(family-name:--font-barlow) mb-8 text-[30px] font-extrabold uppercase text-[#092866]">
                    {currentStep.heading}
                  </h3>

                  <p className="mb-6 border border-[#52aafc]/20 bg-[#52aafc]/8 p-4 text-[16px] leading-[1.65] text-[#092866]/62">
                    Takes about 2 minutes. Required fields are marked with
                    <span className="px-1 font-semibold text-[#52aafc]">*</span>
                    and the AE team follows up manually.
                  </p>
 
                  <div className="space-y-5">
                    {currentStep.fields.map((field) => {
                      if (field.type === "select") {
                        return (
                          <div key={field.id}>
                            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#092866]/70">
                              {field.label}
                              {field.required && <span className="ml-1 text-[#52aafc]">*</span>}
                            </label>
                            <select
                              required={field.required}
                              className="w-full border border-[#092866]/12 px-4 py-3 text-[14px] outline-none focus:border-[#52aafc]"
                              value={(formData[field.id] as string) ?? ""}
                              onChange={(e) => handleField(field.id, e.target.value)}
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
                      }
 
                      if (field.type === "textarea") {
                        return (
                          <div key={field.id}>
                            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#092866]/70">
                              {field.label}
                              {field.required && <span className="ml-1 text-[#52aafc]">*</span>}
                            </label>
                            <textarea
                              rows={4}
                              className="w-full resize-none border border-[#092866]/12 px-4 py-3 text-[14px] outline-none focus:border-[#52aafc]"
                              placeholder={field.placeholder}
                              value={(formData[field.id] as string) ?? ""}
                              onChange={(e) => handleField(field.id, e.target.value)}
                            />
                          </div>
                        );
                      }
 
                      if (field.type === "multicheck") {
                        const selected = (formData[field.id] as string[]) ?? [];
                        return (
                          <div key={field.id}>
                            <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#092866]/70">
                              {field.label}
                              {field.required && <span className="ml-1 text-[#52aafc]">*</span>}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {field.options?.map((opt) => {
                                const checked = selected.includes(opt);
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleMultiCheck(field.id, opt)}
                                    className={`border px-3 py-3 text-left text-[12px] transition-all ${
                                      checked
                                        ? "border-[#52aafc] bg-[#52aafc]/10 text-[#092866]"
                                        : "border-[#092866]/10 text-[#092866]/70 hover:border-[#52aafc]/40"
                                    }`}
                                  >
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
                          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#092866]/70">
                            {field.label}
                            {field.required && <span className="ml-1 text-[#52aafc]">*</span>}
                          </label>
                          <input
                            type={field.type}
                            required={field.required}
                            className="w-full border border-[#092866]/12 px-4 py-3 text-[14px] outline-none focus:border-[#52aafc]"
                            placeholder={field.placeholder}
                            value={(formData[field.id] as string) ?? ""}
                            onChange={(e) => handleField(field.id, e.target.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
 
                  <div className="mt-8 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#092866]/70 hover:text-[#092866]"
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}
 
                    <button
                      onClick={handleNext}
                      disabled={submitting}
                      className="btn-blue inline-flex items-center gap-2 px-8 py-3.5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.15em]"
                    >
                      {submitting ? "Submitting..." : step === FORM_STEPS.length ? "Submit inquiry" : "Next →"}
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
