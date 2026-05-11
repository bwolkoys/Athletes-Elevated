'use client';
 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Barlow_Condensed, Montserrat } from 'next/font/google';
import Navbar from '../src/components/navBar';
 
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400','600','700','800'], variable: '--font-barlow' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-montserrat' });
 
const PRODUCTS = [
  { id: 'hero',          label: 'HERO',           sub: 'Documentary Series' },
  { id: 'athlink',       label: 'Athlink',         sub: 'Athlete Platform' },
  { id: 'teams',         label: 'Teams Elevated',  sub: 'Youth Sports Management' },
  { id: 'crm',           label: 'Eye In Teams',    sub: 'CRM Platform' },
];
 
const FILMED = [
  { name: 'Steve Young',     detail: 'Hall of Fame QB · 2× Super Bowl Champion' },
  { name: 'Jerry Rice',      detail: 'Greatest WR in NFL History' },
  { name: 'Nick Faldo',      detail: '6× Major Champion · Ryder Cup Legend' },
  { name: 'Picabo Street',   detail: 'Olympic Gold · 1998 Nagano · World Champion' },
  { name: 'West Ham United', detail: '3× FA Cup · European Cup Winners Cup 1965' },
];
 
const ATHLINK_FEATURES = [
  { icon: '🔗', title: 'One Link',         desc: 'Everything about you — one clean URL to share everywhere.' },
  { icon: '📊', title: 'Stats & Highlights', desc: 'Showcase your numbers, clips, and career milestones.' },
  { icon: '📱', title: 'All Your Socials',  desc: 'Connect every platform in one discoverable profile.' },
  { icon: '🤝', title: 'Brand Discovery',  desc: 'Get found by brands actively looking for athletes like you.' },
  { icon: '✉️', title: 'Direct Contact',   desc: 'One tap for brands to reach out directly.' },
  { icon: '⚡', title: 'Instant Setup',    desc: 'Live in minutes. No tech skills needed.' },
];
 
const TEAMS_FEATURES = [
  { n: '01', title: 'League & Team Management',      desc: 'Full roster management, scheduling, and tournament tools for leagues of any size.' },
  { n: '02', title: 'Payments & Banking',            desc: 'Leagues create their own bank accounts to collect fees from registrations, camps, uniforms, and gear.' },
  { n: '03', title: 'Built-in Crowdfunding',         desc: 'Proprietary crowdfunding and split payment options so cost is never why a kid sits out.' },
  { n: '04', title: 'Parent Communication',          desc: 'Automated updates, announcements, and messaging that keeps every family in the loop.' },
  { n: '05', title: 'Sponsor & Fundraising Tools',   desc: 'Outreach and fundraising automation built for volunteer coaches who are already stretched thin.' },
];
 
const CRM_FEATURES = [
  { title: 'Email Campaigns',      desc: 'Build, send, and track large-scale email campaigns with custom templates.' },
  { title: 'SMS & Calls',          desc: 'Text and call directly from the platform — all logged automatically.' },
  { title: 'Marketing Templates',  desc: 'Create branded templates for every touchpoint in your pipeline.' },
  { title: 'Contact Import',       desc: 'Import your entire contact database in seconds.' },
  { title: 'Post-Close Surveys',   desc: 'Built-in feedback tool — no separate platform needed.' },
  { title: 'Automated Outreach',   desc: 'Set sequences and let the platform handle follow-ups at scale.' },
  { title: 'B2B & B2C Pipelines',  desc: 'Manage both business and consumer relationships in one place.' },
  { title: 'Analytics Dashboard',  desc: 'Track opens, clicks, calls, and conversions in real time.' },
];
 
export default function EcosystemPage() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded]     = useState(false);
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
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
 
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
 
  return (
    <div className={`${barlow.variable} ${montserrat.variable} font-(family-name:--font-montserrat) bg-white text-[#092866] overflow-x-hidden`}>
 
      <style>{`
        @keyframes marquee  { to { transform: translateX(-50%); } }
        @keyframes word-in  { from{opacity:0;transform:translateY(110%)} to{opacity:1;transform:translateY(0)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade     { from{opacity:0} to{opacity:1} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glow-orb { 0%,100%{opacity:.12} 50%{opacity:.05} }
        @keyframes line-x   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
 
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
        .btn-ghost { border:1px solid rgba(9,40,102,.2); color:#092866; transition:border-color .2s,color .2s; }
        .btn-ghost:hover { border-color:#52aafc; color:#52aafc; }
        .btn-navy  { background:#092866; color:white; transition:transform .2s,box-shadow .2s; }
        .btn-navy:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(9,40,102,.3); }
 
        .product-link { transition:all .25s ease; border-left:2px solid transparent; }
        .product-link:hover { border-left-color:#52aafc; padding-left:12px; }
 
        .athlink-card { border:1px solid rgba(9,40,102,.08); transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .25s; }
        .athlink-card:hover { transform:translateY(-5px); box-shadow:0 24px 60px rgba(9,40,102,.09); border-color:rgba(82,170,252,.4); }
 
        .teams-row { transition:background .25s,padding-left .25s; border-bottom:1px solid rgba(9,40,102,.08); }
        .teams-row:hover { background:rgba(82,170,252,.04); padding-left:8px; }
 
        .crm-card { border:1px solid rgba(9,40,102,.08); transition:border-color .3s,background .3s; }
        .crm-card:hover { border-color:rgba(82,170,252,.5); background:rgba(82,170,252,.06); }
        .crm-card:hover .crm-line { transform:scaleX(1); }
        .crm-line { transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
 
        .filmed-tab { transition:all .2s ease; border-left:2px solid transparent; }
        .filmed-tab.active { border-left-color:#52aafc; background:rgba(82,170,252,.07); }
 
        .nav-lnk::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#52aafc; transition:width .3s; }
        .nav-lnk:hover::after { width:100%; }
 
        .ph      { background:linear-gradient(135deg,#daeeff 0%,#b8d8f8 45%,#8fc0f2 100%); }
        .ph-dark { background:linear-gradient(135deg,#0d2f6e 0%,#092866 55%,#061b44 100%); }
 
        /* athlink profile mockup */
        .profile-mock { background:white; border:1px solid rgba(9,40,102,.1); box-shadow:0 32px 80px rgba(9,40,102,.12); }
      `}</style>
 
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <Navbar />
 
      {/* ══════════════════════════════════════════════════════════════════
          1. HERO — dark navy, massive headline, product TOC right
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-white pt-17">
 
        {/* glow orb */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{background:'radial-gradient(circle,rgba(82,170,252,.06) 0%,transparent 65%)',animation:'glow-orb 9s ease-in-out infinite'}} />
 
        {/* dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[.12]"
          style={{backgroundImage:'radial-gradient(rgba(9,40,102,.15) 1px,transparent 1px)',backgroundSize:'44px 44px'}} />
 
        {/* spinning ring */}
        <div className="pointer-events-none absolute -right-52 -top-52 h-175 w-175 rounded-full border border-[#52aafc]/10"
          style={{animation:'spin 55s linear infinite'}} />
 
        <div className="relative z-10 grid flex-1 grid-cols-1 gap-0 lg:grid-cols-2">
 
          {/* left — headline */}
          <div className="flex flex-col justify-center px-6 py-24 md:px-12 lg:px-20">
            <div className="mb-8 flex items-center gap-3"
              style={{animation: loaded?'slide-up .6s ease .1s both':'none',opacity:loaded?undefined:0}}>
              <span className="h-0.5 w-10 bg-[#52aafc]"  />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]">The AE Ecosystem</span>
            </div>
 
            <h1 className="font-(family-name:--font-barlow) text-[clamp(52px,9vw,140px)] font-extrabold uppercase leading-[0.85] tracking-[-0.01em] text-white">
              <div className="ww block"><span className="w text-[#092866]" style={{animationDelay:loaded?'.12s':'999s'}}>Every</span></div>
              <div className="ww block"><span className="w text-[#092866]" style={{animationDelay:loaded?'.24s':'999s'}}>Tool.</span></div>
              <div className="ww block"><span className="w text-[#092866]" style={{animationDelay:loaded?'.38s':'999s'}}>One</span></div>
              <div className="ww block">
                <span className="w text-[#52aafc]" style={{animationDelay:loaded?'.52s':'999s',textShadow:'0 0 40px rgba(82,170,252,.3)'}}>Mission.</span>
              </div>
            </h1>
 
            <p className="mt-8 max-w-105 text-[16px] font-light leading-[1.85] text-[#092866]/52"
              style={{animation:loaded?'slide-up .7s ease .7s both':'none',opacity:loaded?undefined:0}}>
              Four products. All built for athletes, coaches, and the communities around them. Each one solves a real problem — together they change the game.
            </p>
          </div>
 
          {/* right — product TOC */}
          <div className="flex flex-col justify-center border-l border-[#092866]/10 bg-[#f7f9ff] px-8 py-24 md:px-12 lg:px-16"
            style={{animation:loaded?'fade .8s ease .8s both':'none',opacity:loaded?undefined:0}}>
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]/45">
              In this ecosystem
            </div>
            <div className="space-y-0">
              {PRODUCTS.map((p, i) => (
                <button key={p.id} onClick={() => scrollTo(p.id)}
                  className="product-link group flex w-full items-center justify-between border-b border-[#092866]/10 py-7 pl-3 text-left last:border-b-0 hover:border-[#52aafc]/20">
                  <div>
                    <div className="font-(family-name:--font-barlow) text-[clamp(24px,3vw,36px)] font-extrabold uppercase text-white transition-colors group-hover:text-[#52aafc]">
                      {p.label}
                    </div>
                    <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#092866]/42">{p.sub}</div>
                  </div>
                  <span className="text-[20px] text-white/20 transition-all group-hover:translate-x-2 group-hover:text-[#52aafc]">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
 
        {/* bottom strip */}
        <div className="relative z-10 grid grid-cols-2 border-t border-[#092866]/10 md:grid-cols-4"
          style={{animation:loaded?'fade .8s ease 1.1s both':'none',opacity:loaded?undefined:0,background:'#f0f5fd'}}>
          {[['4','Products built for athletes'],['HERO','Documentary in production'],['Athlink','Athlete profile platform'],['Teams Elevated','Youth sports management']].map(([v,l])=>(
            <div key={l} className="border-r border-[#092866]/10 px-6 py-5 last:border-r-0 md:px-10">
              <div className="font-(family-name:--font-barlow) text-[clamp(18px,2.5vw,32px)] font-extrabold leading-none text-[#092866]">{v}</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#092866]/45">{l}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          2. HERO DOC — cinematic dark, film poster + tabbed athletes
      ══════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden bg-[#f0f5fd]">
 
        {/* dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[.1]"
          style={{backgroundImage:'radial-gradient(rgba(9,40,102,.15) 1px,transparent 1px)',backgroundSize:'44px 44px'}} />
 
        {/* ghost HERO */}
        <div className="pointer-events-none absolute -bottom-16 -right-8 select-none font-(family-name:--font-barlow) text-[22vw] font-extrabold uppercase leading-none text-[#092866]/6">HERO</div>
 
        <div className="relative z-10 grid min-h-175 grid-cols-1 lg:grid-cols-2">
 
          {/* left — poster */}
          <div className="flex flex-col justify-end px-8 py-20 md:px-16"
            style={{background:'radial-gradient(ellipse at 40% 30%,rgba(82,170,252,.05) 0%,transparent 65%)'}}>
            <div className="sr mb-5 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]"  />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Documentary · January 2026</span>
            </div>
            <h2 className="sr font-(family-name:--font-barlow) mb-6 text-[clamp(38px,5.5vw,84px)] font-extrabold uppercase leading-[0.89] text-white" style={{transitionDelay:'80ms'}}>
              Legends that<br />become <span className="text-[#52aafc]" style={{textShadow:'0 0 30px rgba(82,170,252,.25)'}}>catalysts</span><br />for change.
            </h2>
            <p className="sr mb-8 max-w-115 text-[15px] font-light leading-[1.88] text-[#092866]/52" style={{transitionDelay:'160ms'}}>
              From the gods of Olympus to modern high-performing athletes — HERO uncovers the timeless archetype of the hero-athlete, exploring how mythical warriors evolved into modern icons shaping culture, justice, and society.
            </p>
 
            {/* episode arc */}
            <div className="sr mb-10 border-l-2 border-[#52aafc]/25 pl-6" style={{transitionDelay:'220ms'}}>
              {[['1 — Origin of the Hero','Cave art, myth, Gilgamesh, Ancient Olympics'],
                ['2 — Super Humans','The rise of modern sport as ritual revival'],
                ['3 — The New Olympian','Athletes changing humanity through activism'],
                ['4 — Beyond the Arena','Social justice, education, mental health']].map(([ep,desc])=>(
                <div key={ep} className="border-b border-[#092866]/8 py-3.5 last:border-b-0">
                  <span className="font-(family-name:--font-barlow) block text-[13px] font-bold uppercase text-white">{ep}</span>
                  <span className="mt-0.5 block text-[11px] font-light text-[#092866]/45">{desc}</span>
                </div>
              ))}
            </div>
 
            <blockquote className="sr mb-10 text-[16px] font-light italic text-[#092866]/52" style={{transitionDelay:'280ms'}}>
              "The hero of today doesn't slay the dragon —<br />they inspire us to face it together."
            </blockquote>
 
            <div className="sr flex flex-wrap gap-3" style={{transitionDelay:'320ms'}}>
              <Link href="/athletes" className="btn-blue inline-flex items-center gap-2 px-7 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
                Join the waitlist
              </Link>
              <button className="btn-navy inline-flex items-center gap-2 px-7 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
                Learn more →
              </button>
            </div>
          </div>
 
          {/* right — tabbed filmed list */}
          <div className="sr flex flex-col justify-center border-l border-[#092866]/8 px-8 py-20 md:px-12" style={{transitionDelay:'130ms'}}>
            <div className="mb-7 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#52aafc]/44">Already filmed</div>
 
            {FILMED.map((a, i) => (
              <button key={a.name} onClick={() => setActiveFilmed(i)}
                className={`filmed-tab w-full px-5 py-5 text-left transition-all ${activeFilmed===i?'active':'hover:bg-[#092866]/2'}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-(family-name:--font-barlow) text-[22px] font-bold uppercase transition-colors ${activeFilmed===i?'text-[#52aafc]':'text-[#092866]/60 hover:text-white'}`}>
                    {a.name}
                  </span>
                  {activeFilmed===i && <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52aafc]/60">Filmed ✓</span>}
                </div>
                {activeFilmed===i && <p className="mt-1.5 text-[12px] font-light text-[#092866]/45">{a.detail}</p>}
              </button>
            ))}
 
            <div className="mt-8 border border-[#52aafc]/25 bg-[#52aafc]/6 p-6">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]/50">In production</div>
              <div className="font-(family-name:--font-barlow) text-[14px] font-bold uppercase text-white">Created by Melissa Tittl · Hathor Studios</div>
              <div className="mt-1 text-[12px] font-light text-[#092866]/45">Targeting Netflix · ESPN · Apple TV+ · Disney+</div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          3. ATHLINK — bright white, profile mockup + features grid
      ══════════════════════════════════════════════════════════════════ */}
      <section id="athlink" className="bg-white px-6 py-32 md:px-12 lg:px-20">
 
        <div className="sr mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#52aafc]" />
              <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Athlete Platform</span>
            </div>
            <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,80px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
              Athlink.<br />
              <span className="text-[#52aafc]">One link.</span><br />
              Everything.
            </h2>
          </div>
          <p className="max-w-90 text-[15px] font-light leading-[1.85] text-[#092866]/48" style={{transitionDelay:'120ms'}}>
            Think Linktree — but built specifically for athletes. Your stats, highlights, socials, and contact info all in one profile that brands can actually discover and connect with.
          </p>
        </div>
 
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
 
          {/* left — profile mockup */}
          <div className="sr-l flex justify-center lg:justify-start">
            <div className="profile-mock w-full max-w-95 overflow-hidden rounded-2xl">
              {/* profile header */}
              <div className="ph flex h-45 items-end p-6"
                style={{background:'linear-gradient(135deg,#092866 0%,#1a4db5 100%)'}}>
                <div className="flex items-end gap-4">
                  <div className="ph h-18 w-18 rounded-full border-4 border-white" />
                  <div>
                    <div className="font-(family-name:--font-barlow) text-[20px] font-extrabold uppercase text-white">Athlete Name</div>
                    <div className="text-[12px] font-light text-[#092866]/65">Sport · Team · Location</div>
                  </div>
                </div>
              </div>
              {/* profile body */}
              <div className="p-6">
                {/* stat row */}
                <div className="mb-5 grid grid-cols-3 gap-3">
                  {[['4.8s','40 Yard'],['6\'2"','Height'],['215','Weight']].map(([v,l])=>(
                    <div key={l} className="rounded-lg bg-[#f0f5fd] p-3 text-center">
                      <div className="font-(family-name:--font-barlow) text-[18px] font-extrabold text-[#092866]">{v}</div>
                      <div className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#092866]/45">{l}</div>
                    </div>
                  ))}
                </div>
                {/* social links */}
                <div className="mb-4 space-y-2">
                  {['Instagram','Twitter / X','Hudl Highlights','Personal Website'].map((s)=>(
                    <div key={s} className="flex items-center gap-3 rounded-lg border border-[#092866]/8 px-4 py-3">
                      <div className="h-5 w-5 rounded-full bg-[#52aafc]/20" />
                      <span className="text-[13px] font-medium text-[#092866]/60">{s}</span>
                      <span className="ml-auto text-[#52aafc]">→</span>
                    </div>
                  ))}
                </div>
                {/* contact button */}
                <div className="rounded-lg bg-[#52aafc] py-3 text-center font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest text-[#092866]">
                  Contact This Athlete
                </div>
              </div>
            </div>
          </div>
 
          {/* right — feature grid */}
          <div className="sr-r grid grid-cols-1 gap-4 sm:grid-cols-2" style={{transitionDelay:'120ms'}}>
            {ATHLINK_FEATURES.map((f, i) => (
              <div key={f.title} className="athlink-card p-6" style={{transitionDelay:`${i*60}ms`}}>
                <div className="mb-3 text-[28px]">{f.icon}</div>
                <h3 className="font-(family-name:--font-barlow) mb-2 text-[17px] font-bold uppercase text-[#092866]">{f.title}</h3>
                <p className="text-[13px] font-light leading-[1.75] text-[#092866]/48">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
 
        {/* CTA */}
        <div className="sr mt-16 flex flex-col items-center gap-4 border-t border-[#092866]/8 pt-16 sm:flex-row sm:justify-between">
          <div>
            <div className="font-(family-name:--font-barlow) text-[clamp(20px,2.5vw,32px)] font-extrabold uppercase text-[#092866]">
              Ready to build your Athlink profile?
            </div>
            <p className="mt-1 text-[14px] font-light text-[#092866]/45">Live in minutes. Free to get started.</p>
          </div>
          <Link href="/athletes" className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
            Get your Athlink →
          </Link>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          4. TEAMS ELEVATED — f0f5fd, feature rows left, visual right
      ══════════════════════════════════════════════════════════════════ */}
      <section id="teams" className="bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
 
        <div className="sr mb-16">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-0.5 w-8 bg-[#52aafc]" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Youth Sports Management</span>
          </div>
          <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,80px)] font-extrabold uppercase leading-[0.88] text-[#092866]">
            Teams<br />
            <span className="text-[#52aafc]">Elevated.</span>
          </h2>
        </div>
 
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
 
          {/* left — feature rows */}
          <div className="sr-l">
            <p className="mb-10 text-[16px] font-light leading-[1.85] text-[#092866]/50">
              The comprehensive youth sports management platform that handles all the administrative complexity coaches, league organizers, and parents deal with behind the scenes. Cost should never be the reason a child can't play.
            </p>
            <div className="space-y-0">
              {TEAMS_FEATURES.map((f, i) => (
                <div key={f.n} className="teams-row group py-6 pr-4" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="flex items-start gap-5">
                    <span className="font-(family-name:--font-barlow) mt-1 shrink-0 text-[13px] font-bold text-[#52aafc]">{f.n}</span>
                    <div>
                      <h3 className="font-(family-name:--font-barlow) mb-1 text-[18px] font-bold uppercase text-[#092866] transition-colors group-hover:text-[#52aafc]">{f.title}</h3>
                      <p className="text-[13px] font-light leading-[1.75] text-[#092866]/48">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* right — visual platform breakdown */}
          <div className="sr-r flex flex-col gap-5" style={{transitionDelay:'130ms'}}>
 
            {/* big stat */}
            <div className="bg-[#092866] p-8">
              <div className="font-(family-name:--font-barlow) mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52aafc]/60">The mission</div>
              <div className="font-(family-name:--font-barlow) text-[clamp(32px,4vw,56px)] font-extrabold uppercase leading-[0.92] text-white">
                Cost should<br />never keep a<br /><span className="text-[#52aafc]">kid off the field.</span>
              </div>
            </div>
 
            {/* capability pills */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {v:'League & Team','label':'Toolkit'},
                {v:'Payments','label':'& Banking'},
                {v:'Crowdfunding','label':'Built-in'},
                {v:'Parent','label':'Communication'},
                {v:'Sponsor','label':'Outreach'},
                {v:'Split','label':'Payments'},
              ].map((item)=>(
                <div key={item.v} className="border border-[#092866]/10 bg-white p-5 transition-colors hover:border-[#52aafc]/40">
                  <div className="font-(family-name:--font-barlow) text-[17px] font-extrabold uppercase text-[#092866]">{item.v}</div>
                  <div className="text-[11px] font-light text-[#092866]/45">{item.label}</div>
                </div>
              ))}
            </div>
 
            {/* CTA */}
            <Link href="https://www.teamselevated.com" target="_blank" rel="noreferrer"
              className="btn-navy inline-flex items-center justify-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
              Visit Teams Elevated →
            </Link>
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          5. EYE IN TEAMS CRM — dark navy, feature grid
      ══════════════════════════════════════════════════════════════════ */}
      <section id="crm" className="relative overflow-hidden bg-[#092866] px-6 py-32 md:px-12 lg:px-20">
 
        {/* glow orb */}
        <div className="pointer-events-none absolute right-0 top-0 h-125 w-125 rounded-full"
          style={{background:'radial-gradient(circle,rgba(82,170,252,.05) 0%,transparent 65%)',animation:'glow-orb 10s ease-in-out infinite'}} />
 
        <div className="relative z-10">
          <div className="sr mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#52aafc]" />
                <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">CRM Platform</span>
              </div>
              <h2 className="font-(family-name:--font-barlow) text-[clamp(36px,5vw,80px)] font-extrabold uppercase leading-[0.88] text-white">
                Eye In<br />
                <span className="text-[#52aafc]" style={{textShadow:'0 0 30px rgba(82,170,252,.2)'}}>Teams.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[16px] font-light leading-[1.85] text-[#092866]/52">
                A purpose-built CRM designed to disrupt legacy competitors. Everything any other CRM can do — B2B, B2C, email, text, calls, marketing templates, contact import — all in one platform built in-house.
              </p>
              <div className="inline-flex items-center gap-2 border-b border-[#52aafc]/50 pb-1 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
                Built to replace your entire stack →
              </div>
            </div>
          </div>
 
          {/* feature grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CRM_FEATURES.map((f, i) => (
              <div key={f.title} className="sr crm-card relative overflow-hidden p-6" style={{transitionDelay:`${i*60}ms`}}>
                <div className="crm-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
                <h3 className="font-(family-name:--font-barlow) mb-2 text-[16px] font-bold uppercase text-white">{f.title}</h3>
                <p className="text-[12px] font-light leading-[1.75] text-white/40">{f.desc}</p>
              </div>
            ))}
          </div>
 
          {/* bottom callout */}
          <div className="sr mt-10 grid grid-cols-1 gap-6 border-t border-[#092866]/10 pt-10 sm:grid-cols-3" style={{transitionDelay:'200ms'}}>
            {[
              {v:'B2B + B2C', label:'Communication pipelines'},
              {v:'Post-Close', label:'Built-in survey tool'},
              {v:'Large-Scale', label:'Automated marketing'},
            ].map((s)=>(
              <div key={s.v} className="flex items-center gap-4">
                <div className="h-0.5 w-6 bg-[#52aafc]"  />
                <div>
                  <div className="font-(family-name:--font-barlow) text-[18px] font-extrabold uppercase text-[#52aafc]">{s.v}</div>
                  <div className="text-[11px] font-light text-white/40">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          6. CTA — light, two CTAs side by side
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f0f5fd] px-6 py-28 md:px-12 lg:px-20">
        <div className="sr mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-4">
            <span className="h-0.5 w-8 bg-[#52aafc]" />
            <span className="font-(family-name:--font-barlow) text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Get Started</span>
            <span className="h-0.5 w-8 bg-[#52aafc]" />
          </div>
          <h2 className="font-(family-name:--font-barlow) text-[clamp(32px,4.5vw,68px)] font-extrabold uppercase leading-[0.9] text-[#092866]">
            Which part of the<br />ecosystem is <span className="text-[#52aafc]">yours?</span>
          </h2>
        </div>
 
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* athlete card */}
          <div className="sr group relative overflow-hidden bg-[#092866] p-10" style={{transitionDelay:'0ms'}}>
            <div className="pointer-events-none absolute -bottom-8 -right-8 font-(family-name:--font-barlow) text-[120px] font-extrabold uppercase leading-none text-[#092866]/6 select-none">AE</div>
            <div className="relative z-10">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">For Athletes</div>
              <h3 className="font-(family-name:--font-barlow) mb-4 text-[clamp(24px,3vw,44px)] font-extrabold uppercase leading-[0.92] text-white">
                Build your<br />legacy.
              </h3>
              <p className="mb-8 max-w-85 text-[14px] font-light leading-[1.8] text-[#092866]/52">
                Get your Athlink profile, join the HERO waitlist, and connect with the AE community.
              </p>
              <Link href="/athletes" className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
                Get Involved →
              </Link>
            </div>
          </div>
 
          {/* brands card */}
          <div className="sr group relative overflow-hidden bg-white p-10 border border-[#092866]/10" style={{transitionDelay:'100ms'}}>
            <div className="pointer-events-none absolute -bottom-8 -right-8 font-(family-name:--font-barlow) text-[120px] font-extrabold uppercase leading-none text-[#092866]/4 select-none">AE</div>
            <div className="relative z-10">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">For Brands</div>
              <h3 className="font-(family-name:--font-barlow) mb-4 text-[clamp(24px,3vw,44px)] font-extrabold uppercase leading-[0.92] text-[#092866]">
                Be part of<br />the journey.
              </h3>
              <p className="mb-8 max-w-85 text-[14px] font-light leading-[1.8] text-[#092866]/45">
                Partner with us to reach athletes in a real, lasting way. We're building something bigger.
              </p>
              <Link href="/brands" className="btn-navy inline-flex items-center gap-2 px-8 py-4 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-widest">
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#092866] px-6 pb-10 pt-20 md:px-12">
        <div className="mb-14 flex flex-wrap items-start justify-between gap-10 border-b border-[#092866]/10 pb-14">
          <div>
            <div className="mb-3 font-(family-name:--font-barlow) text-[28px] font-extrabold uppercase tracking-[0.05em] text-white">
              ATHLETES <span className="text-[#52aafc]">ELEVATED</span>
            </div>
            <p className="max-w-67.5 text-[13px] font-light leading-[1.72] text-white/26">
              Built for athletes, powered by purpose, focused on meaningful community impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-5">
            {[['For Athletes','/athletes'],['For Brands','/brands'],['Ecosystem','/ecosystem'],['Impact','/impact'],['HERO','/hero']].map(([l,h])=>(
              <Link key={l} href={h} className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/26 transition-colors hover:text-[#52aafc]">{l}</Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-[#092866]/25">© 2026 Athletes Elevated. All rights reserved.</p>
          <p className="text-[11px] italic text-[#092866]/18">Performance meets purpose.</p>
        </div>
      </footer>
 
    </div>
  );
}