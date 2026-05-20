"use client";
 
import {
  useState,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
} from "react";
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
 
type FormField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "multicheck";
  required?: boolean;
  placeholder?: string;
  helperText?: string;
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
    heading: "The basics",
    fields: [
      { id: "name", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { id: "email", label: "Email address", type: "email", required: true, placeholder: "you@email.com" },
      { id: "mobile", label: "Mobile number", type: "tel", placeholder: "+1 (000) 000-0000" },
      { id: "city", label: "Primary residence (city, state)", type: "text", placeholder: "e.g. Los Angeles, CA" },
      { id: "sport", label: "Primary sport", type: "select", required: true, options: SPORTS_LIST },
    ],
  },
  {
    step: 2,
    heading: "Your career",
    fields: [
      {
        id: "status",
        label: "Which best describes you?",
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
        label: "Where are you in your career?",
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
        label: "What career accomplishment are you most proud of?",
        type: "textarea",
        required: true,
        placeholder: "1–2 sentences",
      },
      {
        id: "verification",
        label: "One source we can use to verify your athletic credentials",
        type: "textarea",
        required: true,
        placeholder:
          "League profile URL, athletic department contact, agent name and email, recent verifiable article, or other public-facing source.",
      },
    ],
  },
  {
    step: 3,
    heading: "What you seek",
    fields: [
      {
        id: "interests",
        label: "Which Athletes Elevated capabilities matter most to you?",
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
        label: "What do you hope Athletes Elevated will do for you?",
        type: "textarea",
        required: true,
        placeholder:
          'Be plain. We would rather you say "I want to earn on Athlink" than dress it up as something else. There is no wrong answer — only an unclear one. (3–5 sentences)',
      },
    ],
  },
  {
    step: 4,
    heading: "What you bring",
    fields: [
      {
        id: "contribution",
        label: "What do you bring to this network beyond your name?",
        type: "textarea",
        required: true,
        placeholder:
          "Athletes Elevated only functions when members are active. Fan engagement, mentorship, expertise, introductions, content, time for younger members, capital — anything counts. (3–5 sentences)",
        helperText:
          "* Athletes Elevated reserves the right to remove inactive members.",
      },
    ],
  },
];
 
const FILMED = [
  { name: "Steve Young", sport: "NFL — Quarterback", detail: "Hall of Fame · 2× Super Bowl champion" },
  { name: "Jerry Rice", sport: "NFL — Wide Receiver", detail: "Greatest receiver in NFL history" },
  { name: "Sir Nick Faldo", sport: "Golf", detail: "6× Major champion · Ryder Cup legend" },
  { name: "Picabo Street", sport: "Alpine Ski Racing", detail: "Olympic gold medalist · 1998 Nagano" },
  { name: "West Ham United", sport: "Premier League", detail: "3× FA Cup · European Cup Winners Cup 1965" },
];
 
const TOOLS = [
  {
    name: "Athlink",
    tag: "Athlete Marketplace",
    desc: "Your storefront and your profile, in one place. Host your links, discount codes, and brand partnerships for fans to click through.",
  },
  {
    name: "Teams Elevated",
    tag: "Youth Sports",
    desc: "Payments, rosters, scheduling, and crowdfunding — so cost is never the reason a kid sits out.",
  },
  {
    name: "HERO",
    tag: "Documentary",
    desc: "A cinematic series on what it means to be a hero — beyond the arena, beyond the score.",
  },
  {
    name: "CRM",
    tag: "Operating System",
    desc: "The single system beneath every athlete, brand, and fan relationship — across every channel.",
  },
];
 
const SPORT_TICKER = [
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
];
 
const STATS = [
  { value: 5, suffix: "", label: "Heroes Filmed" },
  { value: 18, suffix: "+", label: "Sports Represented" },
  { value: 4, suffix: "", label: "Athlete Tools" },
  { value: 100, suffix: "%", label: "Athlete-First" },
];
 
/* ──────────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES
   ────────────────────────────────────────────────────────────────────────── */
type Particle = {
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};
 
function FloatingParticles({
  count = 24,
  color = "rgba(82,170,252,0.5)",
}: {
  count?: number;
  color?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
 
  useEffect(() => {
    const ps: Particle[] = Array.from({ length: count }).map(() => ({
      size: Math.random() * 2.4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 14 + 14,
      delay: Math.random() * 10,
    }));
    setParticles(ps);
  }, [count]);
 
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
 
/* ──────────────────────────────────────────────────────────────────────────
   COUNT-UP
   ────────────────────────────────────────────────────────────────────────── */
function CountUp({
  end,
  duration = 1800,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
 
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);
 
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(end * eased));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);
 
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
 
export default function ForAthletesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [liveTime, setLiveTime] = useState("");
 
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
 
  /* live time HUD */
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      const s = d.getSeconds().toString().padStart(2, "0");
      setLiveTime(`${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
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
 
  /* card tilt */
  const handleCardTilt = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rY = (x / rect.width) * 7;
    const rX = -(y / rect.height) * 7;
    card.style.transform = `perspective(1200px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-6px)`;
  };
  const resetCardTilt = (e: ReactMouseEvent<HTMLAnchorElement>) => {
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
      headers: { "Content-Type": "application/json" },
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
      className={`${barlow.variable} ${montserrat.variable} bg-white font-(family-name:--font-montserrat) text-[#092866] overflow-x-hidden`}
    >
      <style>{`
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes marqueeReverse { to { transform: translateX(50%); } }
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
 
        .sr { opacity:0; transform:translateY(34px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-38px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(38px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
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
          background-size: 52px 52px;
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
          color:#05070d;
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
          color:#05070d;
          transform:translateY(-2px);
        }
        .btn-outline:hover .arr { animation: arrow-bounce .55s ease-in-out infinite; }
 
        .btn-ghost-dark {
          border:1px solid rgba(255,255,255,.25);
          color:#fff;
          transition:border-color .2s,color .2s,transform .2s;
        }
        .btn-ghost-dark:hover {
          border-color:#52aafc;
          color:#52aafc;
          transform:translateY(-2px);
        }
        .btn-ghost-dark:hover .arr { animation: arrow-bounce .55s ease-in-out infinite; }
 
        .portal-card {
          border:1px solid rgba(82,170,252,.18);
          transition:transform .55s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .3s;
          transform-style:preserve-3d;
          will-change:transform;
        }
        .portal-card:hover {
          border-color:rgba(82,170,252,.65);
          box-shadow:0 30px 90px rgba(9,40,102,.22);
        }
        .portal-card:hover .portal-line { transform:scaleX(1); }
        .portal-line {
          transform:scaleX(0);
          transform-origin:left;
          transition:transform .45s cubic-bezier(.22,1,.36,1);
        }
 
        .filmed-row {
          transition:padding-left .25s ease,background .25s,border-color .25s;
          border-bottom:1px solid rgba(9,40,102,.08);
        }
        .filmed-row:hover {
          padding-left:12px;
          background:rgba(82,170,252,.04);
          border-color:rgba(82,170,252,.3);
        }
 
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
        className="grain relative flex min-h-screen flex-col justify-end overflow-hidden bg-[#071936] pt-24 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(82,170,252,.35),transparent_30%),linear-gradient(135deg,#071936_0%,#092866_52%,#030814_100%)]" />
        <div className="tech-grid absolute inset-0 opacity-30" />
 
        {/* mouse-tracked spotlight */}
        <div className="spotlight pointer-events-none absolute inset-0" />
 
        {/* periodic scanline */}
        <div className="scanline" />
 
        {/* floating particles */}
        <FloatingParticles count={32} />
 
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,8,20,.98)_0%,rgba(3,8,20,.72)_44%,rgba(3,8,20,.18)_100%)]" />
 
        {/* LIVE HUD */}
        <div
          className="absolute z-30 hidden items-center gap-3 px-6 md:flex md:px-12 lg:px-20"
          style={{
            top: "96px",
            animation: loaded ? "fade .8s ease .4s both" : "none",
            opacity: loaded ? undefined : 0,
          }}
        >
          <span className="live-dot" />
          <span className="font-(family-name:--font-barlow) text-[10px] font-bold uppercase tracking-[0.4em] text-white/85">
            Live
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="font-(family-name:--font-barlow) tabular-nums text-[10px] font-bold uppercase tracking-[0.32em] text-[#52aafc]">
            {liveTime || "00:00:00"}
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="font-(family-name:--font-barlow) text-[10px] font-bold uppercase tracking-[0.32em] text-white/40">
            Members Only
          </span>
        </div>
 
        {/* right scroll indicator */}
        <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
          <div className="relative h-20 w-px overflow-hidden bg-white/20">
            <span
              className="absolute left-0 right-0 h-6 bg-[#52aafc]"
              style={{ animation: "vertical-scan 3s ease-in-out infinite" }}
            />
          </div>
          <span
            className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.4em] text-white/35"
            style={{ writingMode: "vertical-rl" }}
          >
            Enter
          </span>
          <div className="h-20 w-px bg-white/20" />
          <div
            className="h-2 w-2 rounded-full bg-[#52aafc]"
            style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
          />
        </div>
 
        <div className="relative z-20 px-6 pb-0 pt-20 md:px-12 lg:px-20">
          <div
            className="mb-7 flex items-center gap-3"
            style={{
              animation: loaded ? "slide-up .6s ease .1s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <span className="accent-line w-10" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.35em] text-[#52aafc]">
              By Invitation · For Athletes Beyond the Arena
            </span>
          </div>
 
          <h1
            className="font-(family-name:--font-barlow) max-w-[1050px] font-extrabold uppercase leading-[0.83] tracking-[-0.025em]"
            style={{ fontSize: "clamp(58px,11vw,160px)" }}
          >
            <div className="ww block">
              <span className="w" style={{ animationDelay: loaded ? ".12s" : "999s" }}>
                More
              </span>
            </div>
            <div className="ww block">
              <span className="w" style={{ animationDelay: loaded ? ".24s" : "999s" }}>
                than
              </span>
            </div>
 
            {/* punch line: character-split + breathing glow on the whole phrase */}
            <div className="ww block">
              <span
                className="inline-block text-[#52aafc]"
                style={{
                  animation: loaded
                    ? "breathe-glow 3s ease-in-out 1.6s infinite"
                    : "none",
                }}
              >
                {"YOUR SPORT.".split("").map((char, i) => (
                  <span
                    key={i}
                    className="w inline-block"
                    style={{
                      animationDelay: loaded ? `${0.38 + i * 0.05}s` : "999s",
                    }}
                  >
                    {char === " " ? " " : char}
                  </span>
                ))}
              </span>
            </div>
          </h1>
 
          <div className="mt-9 flex flex-col gap-8 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <p
              className="max-w-[520px] text-[16px] font-light leading-[1.88] text-white/62"
              style={{
                animation: loaded ? "slide-up .7s ease 1.05s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              A private membership for athletes turning performance into platform — and platform into legacy. The tools, the access, and the room only members reach.
            </p>
 
            <div
              className="flex flex-wrap gap-3"
              style={{
                animation: loaded ? "slide-up .65s ease 1.2s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              <button
                onClick={openModal}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
              >
                Apply for Induction <span className="arr inline-block">→</span>
              </button>
 
              <Link
                href="#hero-doc"
                className="btn-ghost-dark inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
              >
                Watch HERO <span className="arr inline-block">↓</span>
              </Link>
            </div>
          </div>
        </div>
 
        <div
          className="relative z-20 grid grid-cols-2 border-t border-white/10 bg-[#071936]/80 backdrop-blur-xl md:grid-cols-4"
          style={{
            animation: loaded ? "fade .8s ease 1.3s both" : "none",
            opacity: loaded ? undefined : 0,
          }}
        >
          {[
            ["ATHLINK", "Identity"],
            ["HERO", "Story"],
            ["CRM", "Network"],
            ["IMPACT", "Legacy"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="group relative border-r border-white/10 px-6 py-6 transition-colors last:border-r-0 hover:bg-white/[.03] md:px-10"
            >
              <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="font-(family-name:--font-barlow) text-[clamp(24px,3vw,44px)] font-extrabold leading-none text-[#52aafc]">
                {v}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/42">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* SPORT TICKER (pause on hover) */}
      <div className="overflow-hidden bg-[#52aafc] py-3">
        <div
          className="marquee-track flex whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...SPORT_TICKER, ...SPORT_TICKER].map((sport, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-7 px-7 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.2em] text-[#05070d]"
            >
              {sport}
              <span className="h-1 w-1 rounded-full bg-[#05070d]/35" />
            </span>
          ))}
        </div>
      </div>
 
      {/* VALUES */}
      <section className="relative overflow-hidden bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute right-0 top-0 font-(family-name:--font-barlow) text-[19vw] font-extrabold uppercase leading-none text-[#092866]/[0.035]">
          ATHLETE
        </div>
 
        <div className="sr relative z-10 mb-20">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="accent-line w-8" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
              Our principles
            </span>
          </div>
 
          <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,84px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
            Built around
            <br />
            the athlete.
          </h2>
        </div>
 
        <div className="relative z-10 space-y-0 border-t border-[#092866]/10">
          {[
            {
              n: "01",
              tag: "Identity",
              title: "Not just the result",
              body: "Athletes Elevated is built for the entire athlete — the ambition, the story, the network, the next chapter, and the imprint you intend to leave.",
            },
            {
              n: "02",
              tag: "Opportunity",
              title: "Attention into leverage",
              body: "Visibility means little without connection. We turn your story into the relationships — with brands, with fans, with builders — that compound over time.",
            },
            {
              n: "03",
              tag: "Legacy",
              title: "Build past the whistle",
              body: "Every tool, platform, and partnership is designed to help athletes build something that continues long after competition ends.",
            },
          ].map((v, i) => (
            <div
              key={v.n}
              className="sr group grid grid-cols-1 border-b border-[#092866]/10 py-12 transition-colors hover:bg-white/35 md:grid-cols-[120px_1fr_1fr] md:gap-10"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-(family-name:--font-barlow) text-[66px] font-extrabold leading-none text-[#092866]/[.07] transition-colors group-hover:text-[#52aafc]/20">
                {v.n}
              </div>
 
              <div className="mt-4 md:mt-0">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#52aafc]">
                  {v.tag}
                </span>
                <h3 className="font-(family-name:--font-barlow) text-[24px] font-bold uppercase text-[#092866]">
                  {v.title}
                </h3>
              </div>
 
              <p className="mt-3 text-[14px] font-light leading-[1.85] text-[#092866]/50 md:mt-0">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>
 
      {/* TOOLS */}
      <section className="relative overflow-hidden bg-[#071936] px-6 py-28 text-white md:px-12 lg:px-20">
        <div className="tech-grid absolute inset-0 opacity-20" />
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#52aafc]/10 blur-3xl"
          style={{ animation: "float-soft 8s ease-in-out infinite" }}
        />
        <FloatingParticles count={26} />
        <div className="scanline" />
 
        <div className="relative z-10">
          <div className="sr mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="accent-line w-8" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  The Ecosystem
                </span>
              </div>
 
              <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,88px)] font-extrabold uppercase leading-[0.88] text-white">
                Built for
                <br />
                the athlete.
              </h2>
            </div>
 
            <p className="max-w-[420px] text-[15px] font-light leading-[1.85] text-white/48">
              Identity, story, audience, brand, and impact — connected through a single athlete-first system.
            </p>
          </div>
 
          <div className="-mx-6 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-4">
              {TOOLS.map((tool, i) => (
                <div
                  key={tool.name}
                  className="portal-card sr relative flex w-[320px] shrink-0 flex-col overflow-hidden bg-white text-[#092866] md:w-[380px]"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="portal-line absolute left-0 top-0 z-20 h-0.5 w-full bg-[#52aafc]" />
 
                  {/* art-directed empty state */}
                  <div
                    className="relative flex h-[200px] items-center justify-center overflow-hidden bg-[#d7e5fb]"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg,rgba(9,40,102,.18),rgba(82,170,252,.1))",
                    }}
                  >
                    <div className="tech-grid absolute inset-0 opacity-20" />
                    <div className="absolute right-5 top-5 h-2 w-2 animate-pulse rounded-full bg-[#52aafc]" />
                    {/* corner brackets */}
                    <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#52aafc]/40" />
                    <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#52aafc]/40" />
                    <span className="font-(family-name:--font-barlow) text-[110px] font-extrabold leading-none text-[#092866]/[0.08]">
                      0{i + 1}
                    </span>
                  </div>
 
                  <div className="flex flex-1 flex-col p-7">
                    <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[#52aafc]">
                      {tool.tag}
                    </span>
 
                    <h3 className="font-(family-name:--font-barlow) mb-3 text-[32px] font-extrabold uppercase leading-none text-[#092866]">
                      {tool.name}
                    </h3>
 
                    <p className="mb-7 flex-1 text-[13px] font-light leading-[1.78] text-[#092866]/48">
                      {tool.desc}
                    </p>
 
                    <div className="inline-flex items-center gap-2 border-b border-[#52aafc]/35 pb-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* HERO DOC */}
      <section id="hero-doc" className="relative overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="sr-l relative flex min-h-[680px] flex-col justify-end overflow-hidden bg-white px-8 py-20 md:px-16">
            <div className="pointer-events-none absolute -top-8 left-0 right-0 select-none text-center font-(family-name:--font-barlow) text-[28vw] font-extrabold uppercase leading-none text-[#092866]/[.04] lg:text-[14vw]">
              HERO
            </div>
 
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="accent-line w-8" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                  Documentary · January 2027
                </span>
              </div>
 
              <h2 className="font-(family-name:--font-barlow) mb-6 text-[clamp(34px,4.5vw,72px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
                Legends that
                <br />
                become <span className="text-[#52aafc]">catalysts</span>.
              </h2>
 
              <p className="mb-8 max-w-[460px] text-[15px] font-light leading-[1.88] text-[#092866]/52">
                HERO examines the moment athletes become cultural forces — from myth and competition to leadership, identity, and the imprint left beyond the arena.
              </p>
 
              <button
                onClick={openModal}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
              >
                Apply for Induction <span className="arr inline-block">→</span>
              </button>
            </div>
          </div>
 
          <div className="sr relative flex flex-col justify-center bg-white px-8 py-20 md:px-12 lg:px-16">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="live-dot" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]">
                On record
              </span>
            </div>
 
            <div className="space-y-0">
              {FILMED.map((a) => (
                <div key={a.name} className="filmed-row group py-7 last:border-b-0">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-(family-name:--font-barlow) block text-[24px] font-bold uppercase text-[#092866] transition-colors group-hover:text-[#52aafc]">
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
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52aafc]">
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
                Directed by Melissa Tittl · Hathor Studios
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="relative overflow-hidden bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
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
              <span className="accent-line w-8" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                The threshold
              </span>
            </div>
            <h2 className="font-(family-name:--font-barlow) mb-6 text-[clamp(40px,5.5vw,88px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              Your legacy
              <br />
              starts
              <br />
              <span
                className="inline-block text-[#52aafc]"
                style={{ animation: "breathe-glow 3s ease-in-out infinite" }}
              >
                here.
              </span>
            </h2>
            <p className="max-w-[420px] text-[15px] font-light leading-[1.85] text-[#092866]/55">
              Whether you&apos;re an athlete building what comes next, or a brand seeking alignment with something true.
            </p>
          </div>
 
          <div className="flex flex-col gap-4">
            <button
              onClick={openModal}
              className="btn-blue inline-flex items-center justify-center gap-2 px-10 py-5 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-widest"
            >
              Apply for Induction <span className="arr inline-block">→</span>
            </button>
            <Link
              href="/brands"
              className="btn-outline inline-flex items-center justify-center gap-2 px-10 py-5 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-widest"
            >
              I&apos;m a Brand <span className="arr inline-block">→</span>
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
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col bg-white"
            style={{ animation: "slide-up .3s ease both" }}
          >
            <div className="h-[3px] w-full shrink-0 bg-[#092866]/8">
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
                    You&apos;re in.
                  </h3>
 
                  <p className="text-[14px] font-light leading-[1.75] text-[#092866]/50">
                    We&apos;ll be in touch.
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
                              onChange={(e) => handleField(field.id, e.target.value)}
                            />
                            {field.helperText && (
                              <p className="mt-2 text-[12px] italic leading-relaxed text-[#092866]/30">
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
                                    onClick={() => handleMultiCheck(field.id, opt)}
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
                        className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#092866]/38 hover:text-[#092866]"
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}
 
                    <button
                      onClick={handleNext}
                      className="btn-blue inline-flex items-center gap-2 px-8 py-3.5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.18em]"
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