'use client';
 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Barlow_Condensed, Montserrat } from 'next/font/google';
import Navbar from '../src/components/navBar'
import Footer from '../src/components/footer';
 
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400','600','700','800'], variable: '--font-barlow' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-montserrat' });

const CYCLING_WORDS = [];
 
const REASONS = [
  {
    n: '01',
    tag: 'Inside Access',
    title: 'First access to what is next.',
    body: "New athletes. New partnerships. New drops from the AE ecosystem — Athlink, Teams Elevated, HERO. When something launches, you'll know first. No algorithm. No middleman. Straight from us to you.",
  },
  {
    n: '02',
    tag: 'Real Stories',
    title: "You'll see the athletes nobody else shows you.",
    body: 'Not the highlight reel. Not the press conference. The real journey — before the fame, after the final game, and everything in between that never makes the news.',
  },
  {
    n: '03',
    tag: 'Be Part of the Movement',
    title: 'Your support actually does something.',
    body: "Following AE isn't passive. Every share, every donation, every click funds real nonprofits and real communities. You're not just a fan. You're part of what makes athletes' impact possible off the field.",
  },
];
 
const FILMED = [
  { name: 'Steve Young',     sport: 'NFL — QB',          detail: 'Hall of Fame · 2× Super Bowl Champion' },
  { name: 'Jerry Rice',      sport: 'NFL — WR',          detail: 'Greatest receiver in NFL history' },
  { name: 'Sir Nick Faldo',      sport: 'Golf',              detail: '6× Major Champion · Ryder Cup Legend' },
  { name: 'Picabo Street',   sport: 'Ski Racing',        detail: 'Olympic Gold · 1998 Nagano' },
  { name: 'West Ham United', sport: 'Premier League',    detail: '3× FA Cup · European Cup Winners Cup' },
];
 
const SOCIALS = [
  { platform: 'Instagram',  handle: '@athleteselevated', desc: 'Daily athlete stories, behind-the-scenes, and community moments.', href: 'https://instagram.com', color: '#E1306C', bg: '#fff0f5' },
  { platform: 'TikTok',     handle: '@athleteselevated', desc: 'Short-form athlete content, HERO clips, and movement updates.', href: 'https://tiktok.com', color: '#000000', bg: '#f5f5f5' },
  { platform: 'YouTube',    handle: 'Athletes Elevated', desc: 'Long-form documentaries, athlete profiles, and ecosystem deep-dives.', href: 'https://youtube.com', color: '#FF0000', bg: '#fff5f5' },
];
 
const NONPROFITS = [
  { name: 'Park City Community Foundation', href: 'https://parkcitycf.fcsuite.com/erp/donate' },
  { name: 'West Ham United Foundation',     href: 'https://www.whufc.com/en/the-club/community/foundation' },
  { name: 'McKenna Claire Foundation',      href: 'https://mckennaclairefoundation.org/donate/' },
];
 
export default function ForFansPage() {
  const [scrolled, setScrolled]       = useState(false);
  const [loaded, setLoaded]           = useState(false);
  const [wordIndex, setWordIndex]     = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [email, setEmail]             = useState('');
  const [subscribed, setSubscribed]   = useState(false);
  const [activeFilmed, setActiveFilmed] = useState(0);
 
  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
 
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.06 }
    );
    document.querySelectorAll('.sr').forEach((el) => io.observe(el));
 
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
 
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIndex(i => (i + 1) % CYCLING_WORDS.length); setWordVisible(true); }, 350);
    }, 2400);
 
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); clearInterval(cycle); };
  }, []);
 
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };
 
  return (
    <div className={`${barlow.variable} ${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white text-[#092866] overflow-x-hidden`}>
 
      <style>{`
        @keyframes marquee   { to { transform: translateX(-50%); } }
        @keyframes word-in   { from{opacity:0;transform:translateY(110%)} to{opacity:1;transform:translateY(0)} }
        @keyframes slide-up  { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade      { from{opacity:0} to{opacity:1} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glow-orb  { 0%,100%{opacity:.07} 50%{opacity:.03} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
 
        .sr { opacity:0; transform:translateY(30px); transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1); }
        .sr.in { opacity:1; transform:translateY(0); }
        .sr-l { opacity:0; transform:translateX(-36px); transition:opacity .8s ease,transform .8s ease; }
        .sr-l.in { opacity:1; transform:translateX(0); }
        .sr-r { opacity:0; transform:translateX(36px); transition:opacity .8s ease,transform .8s ease; }
        .sr-r.in { opacity:1; transform:translateX(0); }
 
        .ww { overflow:hidden; display:inline-block; vertical-align:bottom; }
        .w  { display:inline-block; animation:word-in .9s cubic-bezier(.22,1,.36,1) both; }
 
        .btn-blue  { background:#52aafc; color:#06080f; transition:transform .2s,box-shadow .2s; }
        .btn-blue:hover  { transform:translateY(-2px); box-shadow:0 0 40px rgba(82,170,252,.5),0 8px 24px rgba(82,170,252,.25); }
        .btn-navy  { background:#092866; color:white; transition:transform .2s,box-shadow .2s; }
        .btn-navy:hover  { transform:translateY(-2px); box-shadow:0 8px 24px rgba(9,40,102,.3); }
        .btn-ghost { border:1px solid rgba(9,40,102,.2); color:#092866; transition:border-color .2s,color .2s; }
        .btn-ghost:hover { border-color:#52aafc; color:#52aafc; }
 
        .reason-row { border-bottom:1px solid rgba(9,40,102,.08); transition:background .25s,padding-left .25s; }
        .reason-row:hover { background:rgba(82,170,252,.03); }
 
        .social-card { transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s,border-color .3s; border:1px solid rgba(9,40,102,.08); }
        .social-card:hover { transform:translateY(-6px); box-shadow:0 32px 80px rgba(9,40,102,.1); border-color:rgba(82,170,252,.4); }
        .social-card:hover .sc-arrow { transform:translateX(5px); }
        .sc-arrow { transition:transform .3s ease; }
        .social-card:hover .sc-bar { transform:scaleX(1); }
        .sc-bar { transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.22,1,.36,1); }
 
        .filmed-tab { transition:all .2s ease; border-left:2px solid transparent; }
        .filmed-tab.active { border-left-color:#52aafc; background:rgba(82,170,252,.06); }
 
        .stat-pill { border:1px solid rgba(9,40,102,.08); transition:border-color .3s,background .3s; }
        .stat-pill:hover { border-color:rgba(82,170,252,.4); background:rgba(82,170,252,.04); }
 
        .np-row { border-bottom:1px solid rgba(255,255,255,.08); transition:padding-left .25s,border-color .25s; }
        .np-row:hover { padding-left:10px; border-color:rgba(82,170,252,.25); }
 
        .nav-lnk::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#52aafc; transition:width .3s; }
        .nav-lnk:hover::after, .nav-lnk.active::after { width:100%; }
 
        .ph { background:linear-gradient(135deg,#daeeff 0%,#b8d8f8 45%,#8fc0f2 100%); }
      `}</style>
 
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <Navbar />
 
      {/* ══════════════════════════════════════════════════════════════════
          1. HERO — light, full viewport, cycling headline
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-white pt-[68px]">
 
        {/* spinning rings */}
        <div className="pointer-events-none absolute -right-52 -top-52 h-[700px] w-[700px] rounded-full border border-[#52aafc]/10"
          style={{animation:'spin 55s linear infinite'}} />
        <div className="pointer-events-none absolute -right-28 -top-28 h-[440px] w-[440px] rounded-full border border-[#092866]/[.05]"
          style={{animation:'spin 80s linear infinite reverse'}} />
 
        {/* diagonal blue wash */}
        <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[46vw]"
          style={{background:'linear-gradient(215deg,#daeeff 0%,#c0d9f7 55%,transparent 100%)',clipPath:'polygon(100% 0,100% 100%,26% 100%,0 0)'}} />
 
        {/* copy */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-14 md:px-12 lg:px-20">
          <div className="mb-7 flex items-center gap-3"
            style={{animation:loaded?'slide-up .6s ease .1s both':'none',opacity:loaded?undefined:0}}>
            <span className="h-[2px] w-10 bg-[#52aafc]" />
            <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]">For Fans</span>
          </div>
 
          <h1 className="font-[family-name:var(--font-barlow)] text-[clamp(58px,11vw,152px)] font-extrabold uppercase leading-[0.85] tracking-[-0.01em] text-[#092866]">
            <div className="ww block">
              <span className="w" style={{animationDelay:loaded?'.12s':'999s'}}>For</span>
            </div>
            <div className="ww block">
              <span className="w" style={{animationDelay:loaded?'.24s':'999s'}}>The</span>
            </div>
            <div className="ww block">
              <span className="w text-[#52aafc]" style={{animationDelay:loaded?'.38s':'999s'}}>Fans.</span>
            </div>
            {/* cycling word */}
          </h1>
 
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[440px] text-[16px] font-light leading-[1.85] text-[#092866]/48"
              style={{animation:loaded?'slide-up .7s ease .78s both':'none',opacity:loaded?undefined:0}}>
              Athletes Elevated isn't just for athletes and brands. Fans are the foundation of this movement — your support, your passion, and your voice are what push athletes to become something bigger.
            </p>
            <div className="flex flex-wrap gap-3"
              style={{animation:loaded?'slide-up .65s ease .94s both':'none',opacity:loaded?undefined:0}}>
              <Link href="#social"
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em]">
                Follow Us →
              </Link>
              <Link href="#newsletter"
                className="btn-ghost inline-flex items-center gap-2 px-8 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em]">
                Join the List ↓
              </Link>
            </div>
          </div>
        </div>
 
        {/* floating photo placeholders */}
        <div className="pointer-events-none absolute bottom-28 right-8 hidden flex-col gap-4 lg:flex"
          style={{animation:loaded?'fade .9s ease .65s both':'none',opacity:loaded?undefined:0}}>
          <div className="ph h-[190px] w-[150px] rounded-sm" style={{animation:'float 5s ease-in-out infinite'}} />
          <div className="ph h-[124px] w-[150px] rounded-sm opacity-60" style={{animation:'float 5s ease-in-out 1s infinite'}} />
        </div>
        <div className="pointer-events-none absolute bottom-40 right-52 hidden lg:block"
          style={{animation:loaded?'fade .9s ease .82s both':'none',opacity:loaded?undefined:0}}>
          <div className="ph h-[108px] w-[172px] rounded-sm opacity-40" style={{animation:'float 7s ease-in-out .5s infinite'}} />
        </div>
 
        {/* stat strip */}
        <div className="relative z-10 grid grid-cols-2 border-t border-[#092866]/8 md:grid-cols-4"
          style={{animation:loaded?'fade .8s ease 1.05s both':'none',opacity:loaded?undefined:0}}>
          {[
            ['5',        'Heroes already filmed'],
            ['Jan 2027', 'HERO documentary'],
            ['3',        'Nonprofits supported'],
            ['100%',     'Donations pass-through'],
          ].map(([v,l])=>(
            <div key={l} className="border-r border-[#092866]/8 px-6 py-6 last:border-r-0 md:px-10">
              <div className="font-[family-name:var(--font-barlow)] text-[clamp(22px,3vw,42px)] font-extrabold leading-none text-[#52aafc]">{v}</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#092866]/38">{l}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#52aafc] py-[13px]">
        <div className="flex whitespace-nowrap" style={{animation:'marquee 24s linear infinite',width:'max-content'}}>
          {['For The Fans','HERO Documentary','Athletes Elevated','Community','Follow Along','Impact','Real Stories','The Movement',
            'For The Fans','HERO Documentary','Athletes Elevated','Community','Follow Along','Impact','Real Stories','The Movement',
            'For The Fans','HERO Documentary','Athletes Elevated','Community','Follow Along','Impact','Real Stories','The Movement'].map((t,i)=>(
            <span key={i} className="inline-flex items-center gap-7 px-7 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.2em] text-[#06080f]">
              {t}<span className="h-[4px] w-[4px] rounded-full bg-[#06080f]/30" />
            </span>
          ))}
        </div>
      </div>
 
      {/* ══════════════════════════════════════════════════════════════════
          2. WHY FOLLOW — white, numbered rows
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-20">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#52aafc]" />
            <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Why Follow AE</span>
          </div>
          <h2 className="font-[family-name:var(--font-barlow)] text-[clamp(32px,4.5vw,68px)] font-extrabold uppercase leading-[0.91] text-[#092866]">
            You're not just<br />a fan. You're<br /><span className="text-[#52aafc]">part of this.</span>
          </h2>
        </div>
 
        <div className="space-y-0 border-t border-[#092866]/8">
          {REASONS.map((r, i) => (
            <div key={r.n}
              className="reason-row sr grid grid-cols-1 py-12 md:grid-cols-[100px_1fr_1fr] md:gap-10"
              style={{transitionDelay:`${i*100}ms`}}>
              <div className="font-[family-name:var(--font-barlow)] text-[60px] font-extrabold leading-none text-[#092866]/[.06] md:text-[80px]">
                {r.n}
              </div>
              <div className="mt-4 md:mt-0">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#52aafc]">{r.tag}</span>
                <h3 className="font-[family-name:var(--font-barlow)] text-[22px] font-bold uppercase text-[#092866]">{r.title}</h3>
              </div>
              <p className="mt-3 text-[15px] font-light leading-[1.85] text-[#092866]/48 md:mt-0">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          3. HERO DOC — f0f5fd left / white right, fan angle
      ══════════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
 
          {/* left — cinematic copy */}
          <div className="relative flex flex-col justify-end overflow-hidden bg-white px-8 py-20 md:px-16">

  {/* background word */}
  <div className="pointer-events-none absolute -top-6 left-0 right-0 text-center font-[family-name:var(--font-barlow)] text-[22vw] font-extrabold uppercase leading-none text-[#092866]/[.04] select-none lg:text-[12vw]">
    HERO
  </div>

  <div className="relative z-10">

    {/* label */}
    <div className="mb-4 inline-flex items-center gap-3">

      <span className="h-[2px] w-8 bg-[#52aafc]" />

      <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">
        Documentary · January 2027
      </span>

    </div>

    {/* title */}
    <h2 className="font-[family-name:var(--font-barlow)] mb-6 text-[clamp(34px,4.5vw,72px)] font-extrabold uppercase leading-[0.90] text-[#092866]">
      More than
      <br />
      a documentary.
      <br />
    </h2>

    {/* paragraph */}
    <p className="mb-6 max-w-[440px] text-[15px] font-light leading-[1.88] text-[#092866]/55">
      HERO explores the evolving role athletes play in culture today —
      from competition and leadership to influence, identity, and impact
      beyond the game.
    </p>

    {/* quote */}
    <blockquote className="mb-8 border-l-[2px] border-[#52aafc] pl-6 text-[16px] font-light italic text-[#092866]/55">
      "Athletes shape far more than the scoreboard."
    </blockquote>

    {/* buttons */}
    <div className="flex flex-wrap gap-3">

      <Link
        href="#newsletter"
        className="inline-flex items-center gap-2 bg-[#092866] px-7 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0d347f]"
      >
        Join the waitlist
      </Link>

      {/* <Link
        href="/ecosystem"
        className="inline-flex items-center gap-2 border border-[#092866]/12 px-7 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em] text-[#092866] transition-all hover:border-[#52aafc] hover:text-[#52aafc]"
      >
        Learn more →
      </Link> */}

    </div>

  </div>

</div>
 
          {/* right — filmed athletes */}
          <div className="sr relative flex flex-col justify-center bg-white px-8 py-20 md:px-12" style={{transitionDelay:'130ms'}}>
            <div className="mb-7 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]">Already filmed</div>
            {FILMED.map((a, i) => (
              <button key={a.name} onClick={() => setActiveFilmed(i)}
                className={`filmed-tab w-full px-5 py-5 text-left transition-all ${activeFilmed===i?'active':'hover:bg-[#092866]/[.02]'}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-[family-name:var(--font-barlow)] text-[22px] font-bold uppercase transition-colors ${activeFilmed===i?'text-[#52aafc]':'text-[#092866]/55'}`}>
                    {a.name}
                  </span>
                  {activeFilmed===i && <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52aafc]/60">Filmed ✓</span>}
                </div>
                {activeFilmed===i && (
                  <div className="mt-1">
                    <p className="text-[11px] font-medium text-[#092866]/45">{a.sport}</p>
                    <p className="text-[11px] font-light text-[#092866]/35">{a.detail}</p>
                  </div>
                )}
              </button>
            ))}
            <div className="mt-8 border border-[#52aafc]/20 bg-[#52aafc]/[.05] p-6">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#52aafc]">In production</div>
              <div className="mt-1 text-[12px] font-light text-[#092866]/42">Created by Melissa Tittl · Hathor Studios</div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          4. THE MOVEMENT — f0f5fd, big stats + impact angle
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#52aafc]" />
              <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">The Movement</span>
            </div>
            <h2 className="font-[family-name:var(--font-barlow)] text-[clamp(32px,4.5vw,68px)] font-extrabold uppercase leading-[0.91] text-[#092866]">
              Something<br />bigger is<br /><span className="text-[#52aafc]">happening.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-[16px] font-light leading-[1.88] text-[#092866]/50">
              Athletes Elevated is building an ecosystem that connects athletes, brands, and communities around shared values. Fans are the foundation. When you follow and show up — you're helping build something that lasts.
            </p>
            <p className="text-[14px] font-light leading-[1.88] text-[#092866]/35">
              From youth leagues to global documentaries, from athlete profiles to community fundraising — every part of AE starts and ends with people who care.
            </p>
          </div>
        </div>
 
        {/* stat grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { v:'3', l:'Nonprofits supported', sub:'100% of donations pass-through' },
            { v:'5', l:'Heroes already filmed', sub:'Steve Young, Jerry Rice & more' },
            { v:'4', l:'Ecosystem products', sub:'HERO, Athlink, Teams Elevated, CRM' },
            { v:'Jan 2027', l:'HERO launches', sub:'In Production' },
          ].map((s, i) => (
            <div key={s.l} className="sr stat-pill bg-white p-6" style={{transitionDelay:`${i*80}ms`}}>
              <div className="font-[family-name:var(--font-barlow)] text-[clamp(28px,4vw,52px)] font-extrabold leading-none text-[#52aafc]">{s.v}</div>
              <div className="mt-2 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase text-[#092866]">{s.l}</div>
              <div className="mt-1 text-[11px] font-light text-[#092866]/40">{s.sub}</div>
            </div>
          ))}
        </div>
 
        {/* nonprofit donate strip */}
        <div className="sr mt-10 border-t border-[#092866]/8 pt-10" style={{transitionDelay:'320ms'}}>
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#092866]/40">
            Support the nonprofits we champion — 100% of donations go directly to them
          </div>
          <div className="flex flex-wrap gap-3">
            {NONPROFITS.map((np) => (
              <a key={np.name} href={np.href} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[#092866]/12 bg-white px-5 py-3 font-[family-name:var(--font-barlow)] text-[12px] font-bold uppercase tracking-[0.12em] text-[#092866] transition-all hover:border-[#52aafc] hover:text-[#52aafc]">
                {np.name} →
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          5. SOCIAL — white, 4 platform cards
      ══════════════════════════════════════════════════════════════════ */}
      <section id="social" className="bg-white px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#52aafc]" />
              <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Follow Along</span>
            </div>
            <h2 className="font-[family-name:var(--font-barlow)] text-[clamp(30px,4vw,60px)] font-extrabold uppercase leading-[0.91] text-[#092866]">
              Find us<br /><span className="text-[#52aafc]">everywhere.</span>
            </h2>
          </div>
          <p className="max-w-[340px] text-[15px] font-light leading-[1.85] text-[#092866]/45">
            Follow, share, and stay connected. Every platform has its own flavour of AE content — find the one that fits you.
          </p>
        </div>
 
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIALS.map((s, i) => (
            <a key={s.platform} href={s.href} target="_blank" rel="noreferrer"
              className="social-card sr relative overflow-hidden bg-white p-8"
              style={{transitionDelay:`${i*80}ms`}}>
              <div className="sc-bar absolute left-0 top-0 h-[3px] w-full" style={{background:s.color}} />
 
              {/* platform icon placeholder circle */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                style={{background:s.bg}}>
                <span className="font-[family-name:var(--font-barlow)] text-[11px] font-extrabold uppercase" style={{color:s.color}}>
                  {s.platform.charAt(0)}
                </span>
              </div>
 
              <h3 className="font-[family-name:var(--font-barlow)] mb-1 text-[22px] font-extrabold uppercase text-[#092866]">{s.platform}</h3>
              <div className="mb-3 text-[11px] font-semibold text-[#092866]/40">{s.handle}</div>
              <p className="mb-6 text-[13px] font-light leading-[1.75] text-[#092866]/48">{s.desc}</p>
 
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
                Follow <span className="sc-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          6. NEWSLETTER — navy, full email signup
      ══════════════════════════════════════════════════════════════════ */}
      <section
  id="newsletter"
  className="relative overflow-hidden bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20"
>

  {/* glow orb */}
  <div
    className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
    style={{
      background:
        "radial-gradient(circle,rgba(9,40,102,.08) 0%,transparent 65%)",
      animation: "glow-orb 8s ease-in-out infinite",
    }}
  />

  {/* corner brackets */}
  <div className="pointer-events-none absolute left-8 top-8 h-[72px] w-[72px] border-l-2 border-t-2 border-[#092866]/12" />
  <div className="pointer-events-none absolute bottom-8 right-8 h-[72px] w-[72px] border-b-2 border-r-2 border-[#092866]/12" />

  <div className="relative z-10 mx-auto max-w-[700px] text-center">

    <div className="mb-6 inline-flex items-center gap-4">
      <span className="h-[1px] w-12 bg-[#092866]/20" />

      <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.36em] text-[#52aafc]">
        Stay Connected
      </span>

      <span className="h-[1px] w-12 bg-[#092866]/20" />
    </div>

    <h2 className="font-[family-name:var(--font-barlow)] mb-4 text-[clamp(40px,6vw,90px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
      Be the first
      <br />
      to{" "}
      <span
        className="text-[#52aafc]"
        style={{
          textShadow: "0 0 30px rgba(82,170,252,.18)",
        }}
      >
        know.
      </span>
    </h2>

    <p className="mx-auto mb-12 max-w-[420px] text-[16px] font-light leading-[1.82] text-[#092866]/50">
      HERO updates. Athlete stories. Community moments. New ecosystem
      launches. All delivered straight to you before anyone else.
    </p>

    {subscribed ? (
      <div className="mx-auto max-w-[460px]">

        <div className="flex items-center justify-center gap-3 rounded-sm border border-[#52aafc]/25 bg-[#52aafc]/8 px-8 py-6">

          <div className="flex h-8 w-8 items-center justify-center bg-[#52aafc]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8l3.5 3.5 6.5-7"
                stroke="#092866"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="font-[family-name:var(--font-barlow)] text-[16px] font-bold uppercase tracking-[0.1em] text-[#092866]">
            You're on the list!
          </span>

        </div>

      </div>
    ) : (
      <form
        onSubmit={handleSubscribe}
        className="mx-auto flex max-w-[500px] flex-col gap-3 sm:flex-row"
      >

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 border border-[#092866]/10 bg-white px-5 py-4 text-[14px] font-light text-[#092866] placeholder-[#092866]/30 outline-none transition-colors focus:border-[#52aafc]"
        />

        <button
          type="submit"
          className="shrink-0 bg-[#092866] px-8 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0d347f]"
        >
          Join the List
        </button>

      </form>
    )}

    <p className="mt-6 text-[11px] font-light text-[#092866]/35">
      No spam. Just the good stuff. Unsubscribe anytime.
    </p>

  </div>

</section>
 
      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}