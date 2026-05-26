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
    tag: "Inside Access",
    title: "First to what's next.",
    body: "New athletes. New partnerships. New drops across the Athletes Elevated ecosystem — Athlink, Teams Elevated, HERO, FIELDDAY. When something launches, you know before the rest.",
  },
  {
    n: "02",
    tag: "Real Stories",
    title: "Past the highlight reel.",
    body: "Not the scoreboard. Not the press conference. The story behind the athlete — the pressure, the purpose, the comeback, the legacy.",
  },
  {
    n: "03",
    tag: "Real Impact",
    title: "Following matters here.",
    body: "This isn't a passive feed. Every share, donation, click, and signup amplifies the athletes, nonprofits, communities, and projects built around purpose.",
  },
];
 
const FILMED = [
  { name: "Steve Young", sport: "NFL — QB", detail: "Hall of Fame · 2× Super Bowl Champion" },
  { name: "Jerry Rice", sport: "NFL — WR", detail: "Greatest receiver in NFL history" },
  { name: "Sir Nick Faldo", sport: "Golf", detail: "6× Major Champion · Ryder Cup Legend" },
  { name: "Picabo Street", sport: "Ski Racing", detail: "Olympic Gold · 1998 Nagano" },
  { name: "West Ham United", sport: "Premier League", detail: "3× FA Cup · European Cup Winners Cup" },
];
 
const NONPROFITS = [
  { name: "Park City Community Foundation", href: "https://parkcitycf.fcsuite.com/erp/donate" },
  { name: "West Ham United Foundation", href: "https://www.whufc.com/en/the-club/community/foundation" },
  { name: "McKenna Claire Foundation", href: "https://mckennaclairefoundation.org/donate/" },
];
 
const FIELDDAY_STATS = [
  { stat: "4", label: "Elite Managers", body: "Fans pick from pro-managed squads built around world-class track and field athletes." },
  { stat: "60", label: "Athletes", body: "Follow elite athletes across sprints, distance, jumps, throws, and relays." },
  { stat: "DL", label: "Diamond League", body: "A season-long fantasy built around real Diamond League competition." },
  { stat: "2027", label: "Mobile App", body: "iOS and Android. Built for season-long play." },
];
 
const MOVEMENT_CARDS = [
  { v: "3+", l: "Nonprofits supported", sub: "100% of donations pass through" },
  { v: "5", l: "Heroes already filmed", sub: "Steve Young, Jerry Rice & more" },
  { v: "4", l: "Connected products", sub: "HERO, Athlink, Teams Elevated, Eye In Teams" },
  { v: "2027", l: "HERO launches", sub: "In production now" },
];

const ATHLINK_HOW = [
  { n: "01", title: "Find your athlete", body: "Browse the Athlink marketplace and find the athletes you already follow." },
  { n: "02", title: "Visit their profile", body: "Every athlete has their own Athlink profile — their links, discount codes, and brand partnerships all in one place." },
  { n: "03", title: "Shop what they use", body: "Click through directly to the products and brands your favorite athletes actually promote. No middleman. No algorithm." },
];
 
function FloatingParticles({ count = 24, color = "rgba(82,170,252,0.5)" }: { count?: number; color?: string; }) {
  const particles = createParticles(count);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span key={i} className="absolute block rounded-full"
          style={{ width: `${p.size}px`, height: `${p.size}px`, left: `${p.left}%`, top: `${p.top}%`, background: color, opacity: 0, animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite` }} />
      ))}
    </div>
  );
}
 
export default function ForFansPage() {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeFilmed, setActiveFilmed] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
 
  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".sr, .sr-l, .sr-r").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
 
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
 
  const handleCardTilt = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1200px) rotateX(${-(y / rect.height) * 7}deg) rotateY(${(x / rect.width) * 7}deg) translateY(-6px)`;
  };
  const resetCardTilt = (e: ReactMouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ""; };
 
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/fans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      if (!response.ok) { alert("Something went wrong"); setSubmitting(false); return; }
      setSubscribed(true);
      setFirstName(""); setLastName(""); setEmail("");
    } catch {
      alert("Something went wrong");
      setSubmitting(false);
    }
  };
 
  return (
    <div className={`${barlow.variable} ${montserrat.variable} bg-white font-(family-name:--font-montserrat) text-[#092866] overflow-x-hidden`}>
      <style>{`
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes slide-up { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes word-in { from{opacity:0;transform:translateY(110%) skewY(4deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes fade { from{opacity:0} to{opacity:1} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.72)} }
        @keyframes scan { 0%{transform:translateY(-100%);opacity:0} 12%{opacity:.6} 100%{transform:translateY(100%);opacity:0} }
        @keyframes drift { 0%{opacity:0;transform:translate(0,0) scale(1)} 15%{opacity:1} 85%{opacity:.85} 100%{opacity:0;transform:translate(28px,-80px) scale(.6)} }
        @keyframes breathe-glow { 0%,100%{text-shadow:0 0 60px rgba(82,170,252,.45)} 50%{text-shadow:0 0 120px rgba(82,170,252,.9),0 0 30px rgba(82,170,252,.6)} }
        @keyframes arrow-bounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        @keyframes shimmer-line { 0%,100%{box-shadow:0 0 6px rgba(82,170,252,.5)} 50%{box-shadow:0 0 18px rgba(82,170,252,1)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes vertical-scan { 0%{transform:translateY(0)} 50%{transform:translateY(80px)} 100%{transform:translateY(0)} }
        @keyframes float-soft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes athlink-flow { 0%{opacity:0;transform:translateX(-16px)} 100%{opacity:1;transform:translateX(0)} }

        .sr { opacity:0; transform:translateY(34px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-38px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(38px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr-r.in { opacity:1; transform:translateX(0); }

        .ww { overflow:hidden; display:inline-block; vertical-align:bottom; }
        .w { display:inline-block; animation:word-in .85s cubic-bezier(.22,1,.36,1) both; }

        .accent-line { display:inline-block; height:2px; background:#52aafc; animation:shimmer-line 2.4s ease-in-out infinite; }
        .grain { background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E"); }
        .tech-grid { background-image:linear-gradient(rgba(82,170,252,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(82,170,252,.12) 1px,transparent 1px); background-size:52px 52px; }
        .spotlight { background:radial-gradient(circle 420px at var(--mx,70%) var(--my,30%),rgba(82,170,252,.22),transparent 65%); transition:background .15s ease; }
        .scanline { position:absolute; left:0; right:0; height:140px; background:linear-gradient(180deg,transparent,rgba(82,170,252,.18),transparent); mix-blend-mode:screen; pointer-events:none; animation:scan 9s ease-in-out infinite; animation-delay:1s; }
        .marquee-track { width:max-content; }
        .marquee-track:hover { animation-play-state:paused; }

        .btn-blue { background:#52aafc; color:#05070d; transition:transform .2s,box-shadow .2s; position:relative; }
        .btn-blue:hover { transform:translateY(-2px); box-shadow:0 0 44px rgba(82,170,252,.48),0 10px 30px rgba(82,170,252,.25); }
        .btn-blue:hover .arr { animation:arrow-bounce .55s ease-in-out infinite; }
        .btn-outline { border:1px solid rgba(82,170,252,.45); color:#52aafc; transition:background .2s,color .2s,transform .2s; }
        .btn-outline:hover { background:#52aafc; color:#05070d; transform:translateY(-2px); }
        .btn-outline:hover .arr { animation:arrow-bounce .55s ease-in-out infinite; }
        .btn-ghost-dark { border:1px solid rgba(255,255,255,.25); color:#fff; transition:border-color .2s,color .2s,transform .2s; }
        .btn-ghost-dark:hover { border-color:#52aafc; color:#52aafc; transform:translateY(-2px); }
        .btn-ghost-dark:hover .arr { animation:arrow-bounce .55s ease-in-out infinite; }

        .portal-card { border:1px solid rgba(82,170,252,.16); transition:transform .55s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .3s; transform-style:preserve-3d; will-change:transform; }
        .portal-card:hover { border-color:rgba(82,170,252,.6); box-shadow:0 30px 90px rgba(9,40,102,.16); }
        .portal-card:hover .portal-line { transform:scaleX(1); }
        .portal-line { transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.22,1,.36,1); }

        .stat-card { border:1px solid rgba(82,170,252,.16); transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s,background .3s,box-shadow .3s; }
        .stat-card:hover { transform:translateY(-5px); border-color:rgba(82,170,252,.55); background:rgba(82,170,252,.06); box-shadow:0 20px 50px rgba(9,40,102,.08); }

        .filmed-tab { transition:all .2s ease; border-left:2px solid transparent; }
        .filmed-tab.active { border-left-color:#52aafc; background:rgba(82,170,252,.08); }

        .reason-row { position:relative; border-bottom:1px solid rgba(9,40,102,.1); transition:background .25s,padding-left .25s,border-color .25s; }
        .reason-row:hover { background:rgba(82,170,252,.035); padding-left:10px; border-color:rgba(82,170,252,.25); }
        .reason-row::before { content:""; position:absolute; left:0; top:0; height:2px; width:100%; background:#52aafc; transform:scaleX(0); transform-origin:left; transition:transform .5s ease; }
        .reason-row:hover::before { transform:scaleX(1); }

        .nonprofit-link { position:relative; overflow:hidden; }
        .nonprofit-link::before { content:""; position:absolute; left:0; top:0; bottom:0; width:3px; background:#52aafc; transform:scaleY(0); transform-origin:top; transition:transform .3s ease; }
        .nonprofit-link:hover::before { transform:scaleY(1); }

        .live-dot { position:relative; display:inline-block; width:8px; height:8px; border-radius:9999px; background:#ff3b30; }
        .live-dot::before { content:""; position:absolute; inset:0; border-radius:9999px; background:#ff3b30; animation:pulse-ring 1.6s ease-out infinite; }

        /* Athlink section */
        .athlink-step { border:1px solid rgba(9,40,102,.08); transition:border-color .3s,transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s; }
        .athlink-step:hover { border-color:rgba(82,170,252,.45); transform:translateY(-4px); box-shadow:0 20px 60px rgba(9,40,102,.09); }
        .athlink-step:hover .athlink-num { color:rgba(82,170,252,.2); }
        .athlink-step:hover .athlink-line { transform:scaleX(1); }
        .athlink-num { transition:color .3s; color:rgba(9,40,102,.06); }
        .athlink-line { transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.22,1,.36,1); }

        .profile-mock { background:white; border:1px solid rgba(9,40,102,.1); box-shadow:0 32px 80px rgba(9,40,102,.12); }
      `}</style>
 
      <Navbar />
 
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#071936] pt-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(82,170,252,.35),transparent_30%),linear-gradient(135deg,#071936_0%,#092866_52%,#030814_100%)]" />
        <div className="tech-grid absolute inset-0 opacity-30" />
        <div className="spotlight pointer-events-none absolute inset-0" />
        <div className="scanline" />
        <FloatingParticles count={32} />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,8,20,.98)_0%,rgba(3,8,20,.7)_42%,rgba(3,8,20,.18)_100%)]" />
        <div className="pointer-events-none absolute right-0 top-24 font-(family-name:--font-barlow) text-[17vw] font-extrabold uppercase leading-none text-white/[0.035]" style={{ animation: "float-soft 12s ease-in-out infinite" }}>FANS</div>

        <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
          <div className="relative h-20 w-px overflow-hidden bg-white/20">
            <span className="absolute left-0 right-0 h-6 bg-[#52aafc]" style={{ animation: "vertical-scan 3s ease-in-out infinite" }} />
          </div>
          <span className="font-(family-name:--font-barlow) text-[10px] font-semibold uppercase tracking-[0.4em] text-white/72" style={{ writingMode: "vertical-rl" }}>More than watching</span>
          <div className="h-20 w-px bg-white/20" />
          <div className="h-2 w-2 rounded-full bg-[#52aafc]" style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }} />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-0 pt-20 md:px-12 lg:px-20">
          <div className="mb-8 flex items-center gap-3" style={{ animation: loaded ? "slide-up .6s ease .1s both" : "none", opacity: loaded ? undefined : 0 }}>
            <span className="accent-line w-10" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.35em] text-[#52aafc]">For Fans · Stories · Access · Impact</span>
          </div>

          <h1 className="font-(family-name:--font-barlow) max-w-[1100px] font-extrabold uppercase leading-[0.83] tracking-[-0.025em]" style={{ fontSize: "clamp(58px,12vw,170px)" }}>
            <div className="ww block"><span className="w" style={{ animationDelay: loaded ? ".12s" : "999s" }}>Not just</span></div>
            <div className="ww block">
              <span className="inline-block text-[#52aafc]" style={{ animation: loaded ? "breathe-glow 3s ease-in-out 1.4s infinite" : "none" }}>
                {"WATCHING.".split("").map((char, i) => (
                  <span key={i} className="w inline-block" style={{ animationDelay: loaded ? `${0.26 + i * 0.055}s` : "999s" }}>{char}</span>
                ))}
              </span>
            </div>
            <div className="ww block"><span className="w" style={{ animationDelay: loaded ? "1s" : "999s" }}>Part of it.</span></div>
          </h1>

          <div className="mt-9 flex flex-col gap-8 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[700px] text-[19px] font-normal leading-[1.75] text-white/88" style={{ animation: loaded ? "slide-up .7s ease 1.3s both" : "none", opacity: loaded ? undefined : 0 }}>
              {HERO_PROPOSITIONS.fans}
            </p>
            <div className="flex flex-wrap gap-3" style={{ animation: loaded ? "slide-up .65s ease 1.46s both" : "none", opacity: loaded ? undefined : 0 }}>
              <Link href="#athlink" className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
                {CTA.shopAthlink} <span className="arr inline-block">↓</span>
              </Link>
              <Link href="#newsletter" className="btn-ghost-dark inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
                {CTA.joinNewsletter} <span className="arr inline-block">↓</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 border-t border-white/10 bg-[#071936]/80 backdrop-blur-xl md:grid-cols-4" style={{ animation: loaded ? "fade .8s ease 1.55s both" : "none", opacity: loaded ? undefined : 0 }}>
          {[["ATHLINK", "Shop from athletes"], ["HERO", "Documentary access"], ["3+", "Nonprofits supported"], ["100%", "Donation pass-through"]].map(([v, l]) => (
            <div key={l} className="group relative border-r border-white/10 px-6 py-6 transition-colors last:border-r-0 hover:bg-white/[.03] md:px-10">
              <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#52aafc] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="font-(family-name:--font-barlow) text-[clamp(22px,3vw,42px)] font-extrabold leading-none text-[#52aafc]">{v}</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/78">{l}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#52aafc] py-3">
        <div className="marquee-track flex whitespace-nowrap" style={{ animation: "marquee 24s linear infinite" }}>
          {["For The Fans","HERO Documentary","FIELDDAY","Athletes Elevated","Real Stories","Community Impact","Athlink","The Movement",
            "For The Fans","HERO Documentary","FIELDDAY","Athletes Elevated","Real Stories","Community Impact","Athlink","The Movement"].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-7 px-7 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.2em] text-[#05070d]">
              {t}<span className="h-1 w-1 rounded-full bg-[#05070d]/35" />
            </span>
          ))}
        </div>
      </div>

      {/* ── ATHLINK — THE MAIN EVENT ──────────────────────────────────────── */}
      <section id="athlink" className="relative overflow-hidden bg-white px-6 py-32 md:px-12 lg:px-20">

        {/* ghost watermark */}
        <div className="pointer-events-none absolute right-0 top-0 font-(family-name:--font-barlow) text-[18vw] font-extrabold uppercase leading-none text-[#092866]/[0.03] select-none">SHOP</div>

        <div className="sr relative z-10 mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20 lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="accent-line w-8" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Athlink · The Athlete Marketplace</span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5.5vw,88px)] font-extrabold uppercase leading-[0.87] text-[#092866]">
              Shop from the<br />athletes you<br /><span className="inline-block text-[#52aafc]" style={{ animation: "breathe-glow 3s ease-in-out infinite" }}>follow.</span>
            </h2>
          </div>
          <div>
            <p className="mb-4 text-[18px] font-normal leading-[1.88] text-[#092866]/70">
              Athlink is the athlete marketplace built into Athletes Elevated. Every athlete has their own profile — a single link that holds their discount codes, brand partnerships, and product promotions.
            </p>
            <p className="text-[17px] font-normal leading-[1.88] text-[#092866]/62">
              As a fan, you visit their Athlink profile, click through to anything they&apos;re promoting, and shop it directly — no algorithm filtering what you see, no middleman between you and your athlete.
            </p>
          </div>
        </div>

        {/* Profile mockup + how it works side by side */}
        <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT — profile mockup from fan POV */}
          <div className="sr-l flex justify-center lg:justify-start">
            <div className="profile-mock w-full max-w-[400px] overflow-hidden rounded-2xl">
              {/* profile header */}
              <div className="flex h-[180px] items-end p-6" style={{ background: "linear-gradient(135deg,#092866 0%,#1a4db5 100%)" }}>
                <div className="flex items-end gap-4">
                  <div className="h-[72px] w-[72px] shrink-0 rounded-full border-4 border-white bg-[#52aafc]/30" />
                  <div>
                    <div className="font-(family-name:--font-barlow) text-[20px] font-extrabold uppercase text-white">Your Athlete</div>
                    <div className="text-[12px] font-light text-white/60">Sport · Team · Location</div>
                  </div>
                </div>
              </div>
              {/* profile body */}
              <div className="bg-white p-6">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#52aafc]">Their links & products</div>
                {[
                  { label: "Highlights", icon: "▶" },
                  { label: "Sponsors & Partners", icon: "🤝" },
                  { label: "Discount Codes", icon: "%" },
                  { label: "Shop My Gear", icon: "🛒" },
                  { label: "Contact & Booking", icon: "✉" },
                ].map((item) => (
                  <div key={item.label} className="mb-2 flex items-center gap-3 rounded-lg border border-[#092866]/8 px-4 py-3 transition-colors hover:border-[#52aafc]/40 hover:bg-[#f0f5fd]">
                    <span className="text-[14px]">{item.icon}</span>
                    <span className="text-[14px] font-medium text-[#092866]/65">{item.label}</span>
                    <span className="ml-auto text-[11px] text-[#52aafc]">→</span>
                  </div>
                ))}
                <div className="mt-4 rounded-lg bg-[#52aafc] py-3 text-center font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.1em] text-[#092866]">
                  View on Athlink Marketplace
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — how it works steps */}
          <div className="sr-r flex flex-col gap-4" style={{ transitionDelay: "100ms" }}>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#092866]/72">How it works for fans</div>
            {ATHLINK_HOW.map((step, i) => (
              <div key={step.n} className="athlink-step relative overflow-hidden bg-[#f0f5fd] p-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="athlink-line absolute left-0 top-0 h-[2px] w-full bg-[#52aafc]" />
                <div className="flex items-start gap-5">
                  <span className="athlink-num font-(family-name:--font-barlow) text-[42px] font-extrabold leading-none shrink-0">{step.n}</span>
                  <div>
                    <h3 className="font-(family-name:--font-barlow) mb-1 text-[18px] font-bold uppercase text-[#092866]">{step.title}</h3>
                    <p className="text-[17px] font-normal leading-[1.78] text-[#092866]/68">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FOLLOW */}
      <section className="relative overflow-hidden bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute right-0 top-0 font-(family-name:--font-barlow) text-[18vw] font-extrabold uppercase leading-none text-[#092866]/[0.035]">ACCESS</div>

        <div className="sr relative z-10 mb-20">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="accent-line w-8" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Why follow</span>
          </div>
          <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,84px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
            You&apos;re not<br />just a fan.<br />
            <span className="inline-block text-[#52aafc]" style={{ animation: "breathe-glow 3s ease-in-out infinite" }}>You&apos;re part of this.</span>
          </h2>
        </div>

        <div className="relative z-10 space-y-0 border-t border-[#092866]/10">
          {REASONS.map((r, i) => (
            <div key={r.n} className="reason-row sr grid grid-cols-1 py-12 md:grid-cols-[120px_1fr_1fr] md:gap-10" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="font-(family-name:--font-barlow) text-[68px] font-extrabold leading-none text-[#092866]/[.07]">{r.n}</div>
              <div className="mt-4 md:mt-0">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#52aafc]">{r.tag}</span>
                <h3 className="font-(family-name:--font-barlow) text-[24px] font-bold uppercase text-[#092866]">{r.title}</h3>
              </div>
              <p className="mt-3 text-[17px] font-normal leading-[1.85] text-[#092866]/68 md:mt-0">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* HERO DOCUMENTARY */}
      <section id="hero-doc" className="grain relative overflow-hidden bg-[#071936] text-white">
        <div className="tech-grid absolute inset-0 opacity-20" />
        <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#52aafc]/10 blur-3xl" style={{ animation: "float-soft 8s ease-in-out infinite" }} />
        <FloatingParticles count={26} />
        <div className="scanline" />

        <div className="relative z-10 grid min-h-[760px] grid-cols-1 lg:grid-cols-2">
          <div className="sr-l relative flex flex-col justify-end overflow-hidden px-8 py-20 md:px-16">
            <div className="pointer-events-none absolute -top-10 left-0 right-0 select-none text-center font-(family-name:--font-barlow) text-[30vw] font-extrabold uppercase leading-none text-white/[.035] lg:text-[15vw]">HERO</div>
            <div className="pointer-events-none absolute left-6 top-32 h-6 w-6 border-l-2 border-t-2 border-[#52aafc]/40" />
            <div className="pointer-events-none absolute right-6 top-32 h-6 w-6 border-r-2 border-t-2 border-[#52aafc]/40" />
            <div className="pointer-events-none absolute left-6 bottom-72 h-6 w-6 border-l-2 border-b-2 border-[#52aafc]/40" />
            <div className="pointer-events-none absolute right-6 bottom-72 h-6 w-6 border-r-2 border-b-2 border-[#52aafc]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071936] via-[#071936]/88 to-transparent" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="accent-line w-8" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Documentary · January 2027</span>
              </div>
              <h2 className="font-(family-name:--font-barlow) mb-6 text-[clamp(38px,5vw,82px)] font-extrabold uppercase leading-[0.88]">More than<br />a documentary.</h2>
              <p className="mb-8 max-w-[500px] text-[17px] font-normal leading-[1.9] text-white/76">
                HERO examines the evolving role athletes play in culture — from competition and leadership to influence, identity, and impact beyond the game.
              </p>
              <Link href="#newsletter" className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
                {CTA.heroUpdates} <span className="arr inline-block">→</span>
              </Link>
            </div>
          </div>

          <div className="sr flex flex-col justify-center border-l border-white/10 px-8 py-20 md:px-12 lg:px-16">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="live-dot" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]">On record</span>
            </div>
            {FILMED.map((a, i) => (
              <button key={a.name} onClick={() => setActiveFilmed(i)}
                className={`filmed-tab w-full px-5 py-5 text-left ${activeFilmed === i ? "active" : "hover:bg-white/[.03]"}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-(family-name:--font-barlow) text-[24px] font-bold uppercase transition-colors ${activeFilmed === i ? "text-[#52aafc]" : "text-white/78"}`}>{a.name}</span>
                  {activeFilmed === i && <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52aafc]/70">Filmed ✓</span>}
                </div>
                {activeFilmed === i && (
                  <div className="mt-2">
                    <p className="text-[11px] font-medium text-white/78">{a.sport}</p>
                    <p className="text-[16px] font-normal text-white/80">{a.detail}</p>
                  </div>
                )}
              </button>
            ))}
            <div className="mt-8 border border-[#52aafc]/25 bg-[#52aafc]/[.06] p-6">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]">In production</div>
              <div className="font-(family-name:--font-barlow) text-[14px] font-bold uppercase text-white">Directed by Melissa Tittl · Hathor Studios</div>
            </div>
          </div>
        </div>
      </section>
 
      {/* FIELDDAY */}
      <section className="relative overflow-hidden bg-white px-6 py-32 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute left-0 top-0 font-(family-name:--font-barlow) text-[18vw] font-extrabold uppercase leading-none text-[#092866]/[0.035]">PLAY</div>
        <div className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <div className="sr-l">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="accent-line w-8" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Fantasy Track & Field</span>
              <StatusChip status="Coming soon" tone="light" />
            </div>
            <h2 className="font-(family-name:--font-barlow) mb-6 text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              Play the<br />season.<br />
              <span className="inline-block text-[#52aafc]" style={{ animation: "breathe-glow 3s ease-in-out infinite" }}>Back your team.</span>
            </h2>
            <p className="mb-8 max-w-[500px] text-[17px] font-normal leading-[1.88] text-[#092866]/68">
              FIELDDAY turns Diamond League drama into a season-long fantasy league. Pick a pro-managed squad, follow live scoring, earn captain bonuses, and compete for prizes and experiences.
            </p>
            <a href="#newsletter"
              className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
              {CTA.fielddayWaitlist} <span className="arr inline-block">→</span>
            </a>
          </div>
          <div className="sr-r -mx-6 overflow-x-auto px-6 pb-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-4 md:grid md:w-auto md:grid-cols-2">
              {FIELDDAY_STATS.map((item, i) => (
                <div key={item.label} className="stat-card relative w-[260px] shrink-0 overflow-hidden bg-[#f0f5fd] p-6 md:w-auto" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]/40" style={{ animation: "shimmer-line 2.6s ease-in-out infinite" }} />
                  <div className="font-(family-name:--font-barlow) text-[56px] font-extrabold leading-none text-[#52aafc]" style={{ textShadow: "0 0 30px rgba(82,170,252,.2)" }}>{item.stat}</div>
                  <h3 className="mt-3 font-(family-name:--font-barlow) text-[20px] font-bold uppercase text-[#092866]">{item.label}</h3>
                  <p className="mt-2 text-[17px] font-normal leading-[1.75] text-[#092866]/66">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* MOVEMENT */}
      <section className="grain relative overflow-hidden bg-[#071936] px-6 py-32 text-white md:px-12 lg:px-20">
        <div className="tech-grid absolute inset-0 opacity-20" />
        <div className="absolute right-0 top-0 h-[650px] w-[650px] rounded-full bg-[#52aafc]/10 blur-3xl" style={{ animation: "float-soft 9s ease-in-out infinite" }} />
        <FloatingParticles count={28} />
        <div className="scanline" />
        <div className="relative z-10">
          <div className="sr mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="accent-line w-8" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">The Movement</span>
              </div>
              <h2 className="font-(family-name:--font-barlow) text-[clamp(38px,5vw,84px)] font-extrabold uppercase leading-[0.88]">
                Something<br />bigger is<br />
                <span className="inline-block text-[#52aafc]" style={{ animation: "breathe-glow 3s ease-in-out infinite" }}>happening.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-6 text-[18px] font-normal leading-[1.88] text-white/72">Athletes Elevated is building a system that connects athletes, brands, fans, and communities around shared values. Fans are the foundation.</p>
              <p className="text-[17px] font-normal leading-[1.88] text-white/72">From youth leagues to global documentaries, from athlete profiles to community fundraising — every piece of Athletes Elevated starts and ends with people who care.</p>
            </div>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-4">
              {MOVEMENT_CARDS.map((s, i) => (
                <div key={s.l} className="portal-card sr relative w-[280px] shrink-0 bg-white p-6 text-[#092866]" style={{ transitionDelay: `${i * 80}ms` }} onMouseMove={handleCardTilt} onMouseLeave={resetCardTilt}>
                  <div className="portal-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
                  <div className="font-(family-name:--font-barlow) text-[56px] font-extrabold leading-none text-[#52aafc]" style={{ textShadow: "0 0 24px rgba(82,170,252,.18)" }}>{s.v}</div>
                  <div className="mt-3 font-(family-name:--font-barlow) text-[18px] font-bold uppercase text-[#092866]">{s.l}</div>
                  <div className="mt-1 text-[12px] font-light text-[#092866]/62">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sr mt-10 border-t border-white/10 pt-10">
            <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
              <span className="live-dot" />
              Support the nonprofits we champion — 100% pass-through
            </div>
            <div className="flex flex-wrap gap-3">
              {NONPROFITS.map((np) => (
                <a key={np.name} href={np.href} target="_blank" rel="noreferrer"
                  className="nonprofit-link group relative inline-flex items-center gap-2 border border-white/12 px-5 py-3 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.12em] text-white/70 transition-all hover:border-[#52aafc] hover:pl-7 hover:text-[#52aafc]">
                  {np.name}<span className="arr inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* NEWSLETTER */}
      <section id="newsletter" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f0f5fd] px-6 py-32 text-center md:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(82,170,252,.1)_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#52aafc]/8 blur-3xl" style={{ animation: "float-soft 9s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute left-8 top-8 h-20 w-20 border-l-2 border-t-2 border-[#52aafc]/25" />
        <div className="pointer-events-none absolute right-8 top-8 h-20 w-20 border-r-2 border-t-2 border-[#52aafc]/15" />
        <div className="pointer-events-none absolute bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-[#52aafc]/15" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-[#52aafc]/25" />

        <div className="relative z-10 mx-auto max-w-[760px]">
          <div className="mb-6 inline-flex items-center gap-4">
            <span className="accent-line w-12" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.36em] text-[#52aafc]">The list</span>
            <span className="accent-line w-12" />
          </div>
          <h2 className="font-(family-name:--font-barlow) mb-5 text-[clamp(52px,10vw,130px)] font-extrabold uppercase leading-[0.84] tracking-[-0.03em] text-[#092866]">
            Be the<br />first to<br />
            <span className="inline-block text-[#52aafc]" style={{ animation: "breathe-glow 3s ease-in-out infinite" }}>know.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-[460px] text-[18px] font-normal leading-[1.82] text-[#092866]/68">
            HERO updates. Athlete stories. Community moments. FIELDDAY drops. New Athlink athlete profiles. New ecosystem launches. Before anyone else.
          </p>

          {subscribed ? (
            <div className="mx-auto max-w-[460px]">
              <div className="flex items-center justify-center gap-3 border border-[#52aafc]/25 bg-[#52aafc]/10 px-8 py-6">
                <div className="flex h-8 w-8 items-center justify-center bg-[#52aafc]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="#092866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-(family-name:--font-barlow) text-[16px] font-bold uppercase tracking-[0.1em] text-[#092866]">You&apos;re on the list.</span>
              </div>
              <p className="mt-4 text-[16px] leading-[1.65] text-[#092866]/70">
                We&apos;ll send HERO updates, Athlink launches, FIELDDAY access, and fan-only ecosystem news.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mx-auto flex max-w-[540px] flex-col gap-3">
              <p className="mb-3 border border-[#52aafc]/20 bg-white/65 p-4 text-left text-[16px] leading-[1.65] text-[#092866]/72">
                Join once for HERO updates, Athlink profiles, FIELDDAY access, and launch news. Required fields are marked.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="text-left">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#092866]/70">First name *</span>
                  <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"
                    className="w-full border border-[#092866]/10 bg-white px-5 py-4 text-[14px] font-light text-[#092866] placeholder-[#092866]/30 outline-none transition-colors focus:border-[#52aafc]" />
                </label>
                <label className="text-left">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#092866]/70">Last name *</span>
                  <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name"
                    className="w-full border border-[#092866]/10 bg-white px-5 py-4 text-[14px] font-light text-[#092866] placeholder-[#092866]/30 outline-none transition-colors focus:border-[#52aafc]" />
                </label>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex-1 text-left">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#092866]/70">Email *</span>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
                    className="w-full border border-[#092866]/10 bg-white px-5 py-4 text-[14px] font-light text-[#092866] placeholder-[#092866]/30 outline-none transition-colors focus:border-[#52aafc]" />
                </label>
                <button type="submit" disabled={submitting}
                  className="btn-blue inline-flex shrink-0 items-center justify-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.1em] disabled:cursor-not-allowed disabled:opacity-50 sm:self-end">
                  {submitting ? "Submitting..." : <><span>{CTA.joinNewsletter}</span><span className="arr inline-block">→</span></>}
                </button>
              </div>
            </form>
          )}
          <p className="mt-6 text-[11px] font-light text-[#092866]/70">No spam. Just the good stuff. Unsubscribe anytime.</p>
        </div>
      </section>
 
      <Footer />
    </div>
  );
}
