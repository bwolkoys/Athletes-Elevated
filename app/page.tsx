"use client";
 
import {
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import Navbar from "./src/components/navBar";
import Footer from "./src/components/footer";
import ProductCard from "./src/components/productCard";
import StatusChip from "./src/components/statusChip";
import { createParticles } from "./src/lib/particles";
import { CTA, HERO_PROPOSITIONS, PRODUCTS as SHARED_PRODUCTS } from "./src/lib/uxContent";
 
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
 
const CYCLING_WORDS = ["ATHLETES", "COMMUNITIES", "TECHNOLOGY", "LEGACY"];
 
const FILMED = [
  "Steve Young",
  "Jerry Rice",
  "Sir Nick Faldo",
  "Picabo Street",
  "West Ham United",
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
 
const STATS = [
  { value: 5, suffix: "", label: "Legends Filmed" },
  { value: 4, suffix: "", label: "Ecosystem Engines" },
  { value: 3, suffix: "+", label: "Nonprofits Supported" },
  { value: 100, suffix: "%", label: "Pass-Through Donations" },
];
 
/* ──────────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES — drifting dots for atmosphere in dark sections
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
 
/* ──────────────────────────────────────────────────────────────────────────
   COUNT-UP — animates from 0 → target when scrolled into view
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
 
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [activeFilmed, setActiveFilmed] = useState(0);
  const [liveTime, setLiveTime] = useState("");
 
  const heroRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
 
  /* load + scroll reveal + cycling word + video play */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
 
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(".sr, .sr-l, .sr-r")
      .forEach((el) => io.observe(el));
 
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2200);
 
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        const v = heroVideoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.45 }
    );
    if (heroVideoRef.current) videoObserver.observe(heroVideoRef.current);
 
    return () => {
      clearTimeout(t);
      io.disconnect();
      videoObserver.disconnect();
      clearInterval(cycle);
    };
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
 
  return (
    <div
      className={`${barlow.variable} ${montserrat.variable} bg-white font-(family-name:--font-montserrat) text-[#092866] overflow-x-hidden`}
    >
      <style>{`
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes marqueeReverse { to { transform: translateX(50%); } }
        @keyframes word-in { from { opacity:0; transform:translateY(110%) skewY(4deg); } to { opacity:1; transform:translateY(0) skewY(0); } }
        @keyframes fade { from { opacity:0; } to { opacity:1; } }
        @keyframes slide-up { from { opacity:0; transform:translateY(44px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.35; transform:scale(.72); } }
        @keyframes scan { 0% { transform:translateY(-100%); opacity:0; } 12% { opacity:.6; } 100% { transform:translateY(100%); opacity:0; } }
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
 
        .sr { opacity:0; transform:translateY(34px); transition:opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-38px); transition:opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(38px); transition:opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-r.in { opacity:1; transform:translateX(0); }
 
        .ww { overflow:hidden; display:inline-block; vertical-align:bottom; }
        .w { display:inline-block; animation:word-in .9s cubic-bezier(.22,1,.36,1) both; }
 
        .accent-line {
          display:inline-block;
          height:2px;
          background:#52aafc;
          animation:shimmer-line 2.4s ease-in-out infinite;
        }
 
        .grain {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
        }
 
        .tech-grid {
          background-image:
            linear-gradient(rgba(82,170,252,.11) 1px, transparent 1px),
            linear-gradient(90deg, rgba(82,170,252,.11) 1px, transparent 1px);
          background-size: 56px 56px;
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
          transition:transform .2s, box-shadow .2s;
          position:relative;
        }
        .btn-blue:hover {
          transform:translateY(-2px);
          box-shadow:0 0 40px rgba(82,170,252,.5), 0 10px 30px rgba(82,170,252,.25);
        }
        .btn-blue:hover .arr { animation: arrow-bounce .55s ease-in-out infinite; }
 
        .btn-outline {
          border:1px solid rgba(82,170,252,.45);
          color:#52aafc;
          transition:background .2s, color .2s, transform .2s;
        }
        .btn-outline:hover {
          background:#52aafc;
          color:#05070d;
          transform:translateY(-2px);
        }
        .btn-outline:hover .arr { animation: arrow-bounce .55s ease-in-out infinite; }
 
        .portal-card {
          border:1px solid rgba(82,170,252,.18);
          transition:transform .55s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .3s;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .portal-card:hover {
          border-color:rgba(82,170,252,.65);
          box-shadow:0 30px 90px rgba(9,40,102,.18);
        }
        .portal-card:hover .portal-line {
          transform:scaleX(1);
        }
        .portal-line {
          transform:scaleX(0);
          transform-origin:left;
          transition:transform .45s cubic-bezier(.22,1,.36,1);
        }
 
        .filmed-tab {
          transition:background .25s, border-color .25s, color .25s;
        }
        .filmed-tab.active {
          background:rgba(82,170,252,.09);
          border-left-color:#52aafc;
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
        className="grain relative min-h-screen overflow-hidden bg-[#071936] pt-24 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(82,170,252,.32),transparent_32%),linear-gradient(135deg,#071936_0%,#092866_52%,#030814_100%)]" />
        <div className="tech-grid absolute inset-0 opacity-30" />
 
        {/* mouse-tracked spotlight */}
        <div className="spotlight pointer-events-none absolute inset-0" />
 
        {/* periodic scanline sweep */}
        <div className="scanline" />
 
        {/* floating particles */}
        <FloatingParticles count={32} />
 
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,8,20,.96)_0%,rgba(3,8,20,.72)_42%,rgba(3,8,20,.22)_100%)]" />
 
        {/* LIVE HUD */}
        <div
          className="absolute z-30 hidden items-center gap-3 px-6 md:flex md:px-12 lg:px-16"
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
          <span className="font-(family-name:--font-barlow) text-[10px] font-bold uppercase tracking-[0.32em] text-white/60">
            Park City · UT
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
            className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.4em] text-white/72"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll to enter the ecosystem
          </span>
          <div className="h-20 w-px bg-white/20" />
          <div
            className="h-2 w-2 rounded-full bg-[#52aafc]"
            style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
          />
        </div>
 
        <div className="relative z-10 flex min-h-[calc(100vh-96px)] flex-col justify-end px-6 pb-0 md:px-12 lg:px-16">
          <div
            className="mb-8 inline-flex items-center gap-3"
            style={{
              animation: loaded ? "slide-up .7s ease .1s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <span className="accent-line w-10" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.35em] text-[#52aafc]">
              Sports · Media · Technology · Impact
            </span>
          </div>
 
          <h1
            className="font-(family-name:--font-barlow) max-w-[1200px] font-extrabold uppercase leading-[0.83] tracking-[-0.025em]"
            style={{ fontSize: "clamp(62px,13vw,190px)" }}
          >
            {/* character-split ELEVATE */}
            <div className="ww block">
              {"ELEVATE".split("").map((char, i) => (
                <span
                  key={i}
                  className="w inline-block text-white"
                  style={{
                    animationDelay: loaded ? `${0.12 + i * 0.055}s` : "999s",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
 
            {/* cycling word with breathing glow */}
            <div className="block min-h-[.9em] text-[#52aafc]">
              <span
                className="block"
                style={{
                  transition: "opacity .35s ease, transform .35s ease",
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? "translateY(0)" : "translateY(18px)",
                  animation: wordVisible
                    ? "breathe-glow 3s ease-in-out infinite"
                    : "none",
                }}
              >
                {CYCLING_WORDS[wordIndex]}
              </span>
            </div>
          </h1>
 
          {/* cycling word progress dots */}
          <div
            className="mt-6 flex items-center gap-2"
            style={{
              animation: loaded ? "fade .8s ease 1.2s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            {CYCLING_WORDS.map((w, i) => (
              <span
                key={w}
                className="block h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: i === wordIndex ? "36px" : "10px",
                  background:
                    i === wordIndex ? "#52aafc" : "rgba(255,255,255,.18)",
                  boxShadow:
                    i === wordIndex ? "0 0 12px rgba(82,170,252,.7)" : "none",
                }}
              />
            ))}
            <span className="ml-3 font-(family-name:--font-barlow) text-[10px] font-bold uppercase tracking-[0.3em] text-white/72">
              {String(wordIndex + 1).padStart(2, "0")} /{" "}
              {String(CYCLING_WORDS.length).padStart(2, "0")}
            </span>
          </div>
 
          <div
            className="mt-10 grid grid-cols-1 border-t border-white/10 bg-[#071936]/80 backdrop-blur-xl lg:grid-cols-[1fr_1fr_360px]"
            style={{
              animation: loaded ? "fade .8s ease 1s both" : "none",
              opacity: loaded ? undefined : 0,
            }}
          >
            <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
              <p className="max-w-[700px] text-[19px] font-normal leading-[1.75] text-white/88">
                {HERO_PROPOSITIONS.home}
              </p>
            </div>
 
            <div className="grid grid-cols-2 border-b border-white/10 lg:border-b-0 lg:border-r">
              {[
                ["HERO", "Documentary"],
                ["ATHLINK", "Athlete platform"],
                ["TEAMS", "Youth sports"],
                ["IMPACT", "Community"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="group relative border-b border-r border-white/10 p-5 transition-colors even:border-r-0 hover:bg-white/[.03]"
                >
                  <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="font-(family-name:--font-barlow) text-[26px] font-extrabold text-[#52aafc]">
                    {value}
                  </div>
                  <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/76">
                    {label}
                  </div>
                </div>
              ))}
            </div>
 
            <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
              <Link
                href="/athletes"
                className="btn-blue inline-flex items-center justify-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
              >
                {CTA.applyAthlete} <span className="arr inline-block">→</span>
              </Link>
              <Link
                href="/brands"
                className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest"
              >
                {CTA.partner} <span className="arr inline-block">→</span>
              </Link>
              <Link
                href="/ecosystem"
                className="inline-flex items-center justify-center gap-2 px-8 py-2 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-widest text-white/76 transition hover:text-white"
              >
                {CTA.exploreEcosystem}
              </Link>
            </div>
          </div>
        </div>
      </section>
 
      {/* MARQUEE (pause-on-hover) */}
      <div className="overflow-hidden bg-[#52aafc] py-3">
        <div
          className="marquee-track flex whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {[
            "Athletes Elevated",
            "Sports Technology",
            "Community Impact",
            "Athlink",
            "HERO",
            "Teams Elevated",
            "Athletes Elevated",
            "Sports Technology",
            "Community Impact",
            "Athlink",
            "HERO",
            "Teams Elevated",
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
 
      {/* MISSION */}
      <section className="relative overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[430px] overflow-hidden bg-[#d7e5fb] lg:min-h-[760px]">
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                backgroundImage: "url('/home/PicaboStreet.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "65%",
                backgroundAttachment: "fixed",
              }}
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{
                backgroundImage: "url('/home/PicaboStreet.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center top",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#092866]/20 to-transparent" />
          </div>
 
          <div className="sr flex flex-col justify-center px-8 py-20 md:px-16 lg:px-20">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="accent-line w-8" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Our Mission
              </span>
            </div>
 
            <h2 className="font-(family-name:--font-barlow) mb-8 text-[clamp(34px,4.5vw,72px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
              Built for the
              <br />
              human behind
              <br />
              the result.
            </h2>
 
            <p className="mb-6 max-w-[520px] text-[18px] font-normal leading-[1.9] text-[#092866]/70">
              Athletes Elevated is an ecosystem built around one belief: the
              impact of an athlete does not stop at the final whistle.
            </p>
 
            <p className="max-w-[520px] text-[17px] font-normal leading-[1.9] text-[#092866]/62">
              We connect athletes with platforms, partners, fans, and
              communities that help turn performance into purpose, visibility
              into opportunity, and legacy into impact.
            </p>
          </div>
        </div>
 
        <div className="grid grid-cols-1 border-y border-[#092866]/10 md:grid-cols-3">
          {[
            ["01", "Athlete First", "We show up for the person behind the scoreboard."],
            ["02", "Community Connection", "Strong communities make strong athletes."],
            ["03", "Technology That Connects", "We build systems that turn attention into opportunity."],
          ].map(([n, tag, body], i) => (
            <div
              key={tag}
              className="sr group relative border-r border-[#092866]/10 px-8 py-12 last:border-r-0 transition-colors hover:bg-[#092866]/[.02]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="mb-4 font-(family-name:--font-barlow) text-[72px] font-extrabold leading-none text-[#092866]/[.06] transition-colors group-hover:text-[#52aafc]/15">
                {n}
              </div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#52aafc]">
                {tag}
              </div>
              <p className="text-[17px] font-normal leading-[1.8] text-[#092866]/66">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ECOSYSTEM */}
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
                One movement.
                <br />
                Multiple engines.
              </h2>
            </div>
 
            <p className="max-w-[420px] text-[17px] font-normal leading-[1.85] text-white/68">
              Media, athlete profiles, youth sports, fan engagement, Eye In Teams, and
              community impact — connected through one elevated sports
              ecosystem.
            </p>
          </div>
 
          <div className="-mx-6 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-4">
              {SHARED_PRODUCTS.slice(0, 4).map((product, i) => (
                <div
                  key={product.name}
                  className="w-[330px] shrink-0 snap-start md:w-[390px]"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* HERO MOVIE */}
      <section className="relative overflow-hidden bg-[#f7f9ff]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="sr relative flex flex-col justify-center bg-white px-8 py-20 md:px-12 lg:px-16">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="live-dot" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]">
                HERO Documentary · January 2027
              </span>
              <StatusChip status="In production" tone="light" />
            </div>
 
            <h2 className="font-(family-name:--font-barlow) mb-8 text-[clamp(36px,5vw,78px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
              Legends become
              <br />
              catalysts.
            </h2>
 
            <div className="space-y-0 border-t border-[#092866]/10">
              {FILMED.map((name, i) => (
                <button
                  key={name}
                  onClick={() => setActiveFilmed(i)}
                  className={`filmed-tab w-full border-b border-l-[3px] border-b-[#092866]/10 px-5 py-5 text-left ${
                    activeFilmed === i
                      ? "active border-l-[#52aafc]"
                      : "border-l-transparent hover:bg-[#092866]/[.02]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`font-(family-name:--font-barlow) text-[24px] font-bold uppercase ${
                        activeFilmed === i
                          ? "text-[#52aafc]"
                          : "text-[#092866]/65"
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
                    <p className="mt-2 text-[16px] font-normal text-[#092866]/72">
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
          </div>

          <div className="relative min-h-[680px] overflow-hidden bg-[#092866]">
              <video
              ref={heroVideoRef}
              src="/home/SirNickFaldoPreview.MP4"
              muted
              playsInline
              autoPlay
              loop
              controls
              poster="/home/heroes.png"
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

        </div>
      </section>
 
      {/* IMPACT */}
      {/* <section className="bg-white px-6 py-28 md:px-12 lg:px-20">
        <div className="sr mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="accent-line w-8" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                Impact
              </span>
            </div>
 
            <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,82px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
              Built to
              <br />
              move people.
            </h2>
          </div>
 
          <p className="max-w-[420px] text-[17px] font-normal leading-[1.85] text-[#092866]/64">
            Every part of AE is designed to create opportunity, tell better
            stories, and direct attention toward real communities.
          </p>
        </div>
 
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {NONPROFITS.map((np, i) => (
            <div
              key={np.name}
              className="portal-card sr relative overflow-hidden bg-[#f0f5fd] p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseMove={handleCardTilt}
              onMouseLeave={resetCardTilt}
            >
              <div className="portal-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
 
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]">
                100% Pass-Through
              </div>
 
              <h3 className="font-(family-name:--font-barlow) mb-4 text-[24px] font-extrabold uppercase leading-[1.05] text-[#092866]">
                {np.name}
              </h3>
 
              <p className="mb-8 text-[17px] font-normal leading-[1.85] text-[#092866]/66">
                {np.desc}
              </p>
 
              <a
                href={np.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-b border-[#52aafc]/40 pb-1 font-(family-name:--font-barlow) text-[11px] font-bold uppercase tracking-[0.2em] text-[#52aafc] transition-all hover:gap-4"
              >
                Donate <span className="arr inline-block">→</span>
              </a>
            </div>
          ))}
        </div>
      </section> */}
 
      {/* CTA */}
      <section className="grain relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden bg-[#071936] px-6 py-24 text-center text-white">
        <div className="tech-grid absolute inset-0 opacity-20" />
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#52aafc]/10 blur-3xl"
          style={{ animation: "float-soft 9s ease-in-out infinite" }}
        />
        <FloatingParticles count={30} />
        <div className="scanline" />
 
        <div className="sr relative z-10 max-w-[980px]">
          <div className="mb-6 inline-flex items-center gap-4">
            <span className="h-px w-10 bg-[#52aafc]/50" />
            <span className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]">
              Ready to be part of something bigger?
            </span>
            <span className="h-px w-10 bg-[#52aafc]/50" />
          </div>
 
          <h2
            className="font-(family-name:--font-barlow) font-extrabold uppercase leading-[0.86]"
            style={{ fontSize: "clamp(58px,13vw,170px)" }}
          >
            Your story
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
 
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/athletes"
              className="btn-blue inline-flex items-center gap-2 px-10 py-4 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-widest"
            >
              {CTA.applyAthlete} <span className="arr inline-block">→</span>
            </Link>
 
            <Link
              href="/brands"
              className="btn-outline inline-flex items-center gap-2 px-10 py-4 font-(family-name:--font-barlow) text-[14px] font-bold uppercase tracking-widest"
            >
              {CTA.partner} <span className="arr inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>
 
      {/* PARTNERS */}
      <section className="overflow-hidden border-y border-[#092866]/8 bg-[#f7f9ff] py-16">
        <div className="sr mb-10 text-center font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.36em] text-[#092866]/25">
          Ecosystem Partners
        </div>
 
        <div
          className="mb-3 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg,transparent,black 12%,black 88%,transparent)",
          }}
        >
          <div
            className="marquee-track flex whitespace-nowrap"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-9 px-9 font-(family-name:--font-barlow) text-[14px] font-semibold uppercase tracking-widest text-[#092866]/25"
              >
                {p}
                <span className="h-1 w-1 rounded-full bg-[#092866]/12" />
              </span>
            ))}
          </div>
        </div>
 
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg,transparent,black 12%,black 88%,transparent)",
          }}
        >
          <div
            className="marquee-track flex whitespace-nowrap"
            style={{
              animation: "marqueeReverse 34s linear infinite",
              transform: "translateX(-50%)",
            }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-9 px-9 font-(family-name:--font-barlow) text-[14px] font-semibold uppercase tracking-widest text-[#092866]/15"
              >
                {p}
                <span className="h-1 w-1 rounded-full bg-[#092866]/10" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STAT STRIP — count-up numbers */}
      <section className="relative overflow-hidden bg-[#030814] py-20 text-white">
        <div className="tech-grid absolute inset-0 opacity-15" />
        <FloatingParticles count={18} />
        <div className="scanline" />
 
        <div className="relative z-10 px-6 md:px-12 lg:px-20">
          <div className="sr mb-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex items-center gap-3">
              <span className="accent-line w-8" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
                By The Numbers
              </span>
            </div>
            <span className="font-(family-name:--font-barlow) text-[11px] font-bold uppercase tracking-[0.28em] text-white/62">
              Live · Updated Continuously
            </span>
          </div>
 
          <div className="grid grid-cols-2 gap-px bg-white/8 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden bg-[#030814] px-6 py-10 transition-colors hover:bg-[#071936] md:px-8 md:py-12"
              >
                <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
                <div
                  className="font-(family-name:--font-barlow) text-[clamp(56px,8vw,120px)] font-extrabold leading-none text-white"
                  style={{ textShadow: "0 0 60px rgba(82,170,252,.25)" }}
                >
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]">
                  {s.label}
                </div>
                <div className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-[#52aafc] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <Footer />
    </div>
  );
}
