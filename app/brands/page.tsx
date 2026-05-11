'use client';
 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Barlow_Condensed, Montserrat } from 'next/font/google';
import Navbar from '../src/components/navBar';
 
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400','600','700','800'], variable: '--font-barlow' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-montserrat' });
 
const CYCLING_WORDS = ['AMPLIFIED.', 'ELEVATED.', 'CONNECTED.', 'REAL.'];
 
const REASONS = [
  { n: '01', title: 'Athlete-First Audience', body: 'Every person in the AE ecosystem is there because they care about athletes and the communities around them. Your brand shows up in a context that actually matters.' },
  { n: '02', title: 'Real, Lasting Alignment', body: 'We don\'t do one-off placements. Every brand partnership is built around shared values — integrity, impact, and growth. You\'re not buying an ad. You\'re joining a movement.' },
  { n: '03', title: 'Multi-Platform Reach', body: 'From youth leagues to a global documentary to an athlete profile platform — AE touches athletes and communities at every level. One partnership, multiple touchpoints.' },
];
 
const TIERS = [
  {
    name: 'Community',
    price: 'Entry Level',
    tag: 'Get started',
    accent: '#092866',
    featured: false,
    perks: [
      'Logo placement on AE website',
      'Social media mention',
      'Newsletter feature',
      'Partner page listing',
      'Access to athlete network',
    ],
  },
  {
    name: 'Partner',
    price: 'Mid Tier',
    tag: 'Most popular',
    accent: '#52aafc',
    featured: true,
    perks: [
      'Everything in Community',
      'Athlink profile integration',
      'Co-branded content',
      'Teams Elevated exposure',
      'Quarterly impact report',
      'Direct athlete introductions',
    ],
  },
  {
    name: 'Premier',
    price: 'Top Tier',
    tag: 'Full ecosystem',
    accent: '#006aac',
    featured: false,
    perks: [
      'Everything in Partner',
      'HERO documentary association',
      'Exclusive event presence',
      'Custom campaign strategy',
      'Priority athlete matching',
      'Executive relationship',
      'Annual partnership review',
    ],
  },
];
 
const ECOSYSTEM_REACH = [
  { product: 'HERO', desc: 'Documentary targeting Netflix, ESPN, Apple TV+', stat: 'Jan 2026' },
  { product: 'Athlink', desc: 'Athlete profiles discoverable by brands', stat: 'Live now' },
  { product: 'Teams Elevated', desc: 'Youth leagues across the country', stat: 'Soccer + growing' },
  { product: 'Eye In Teams', desc: 'CRM connecting brands to athletes at scale', stat: 'Built in-house' },
];
 
const PARTNERS = ['Essex Mortgage', 'Salt Box PC', 'Holistic Beverages', 'TBX Golf', 'Essex Shield', 'Bloom Intelligence', 'Dos Amigos', "Mother's Comfort Foods"];
 
const FORM_STEPS = [
  {
    step: 1,
    heading: 'Tell us about your brand',
    fields: [
      { id: 'company', label: 'Company name', type: 'text',  placeholder: 'Your company' },
      { id: 'name',    label: 'Your name',    type: 'text',  placeholder: 'Full name' },
      { id: 'email',   label: 'Email',        type: 'email', placeholder: 'you@company.com' },
    ],
  },
  {
    step: 2,
    heading: 'Your goals',
    fields: [
      { id: 'tier', label: 'Partnership tier interest', type: 'select',
        options: ['Community', 'Partner', 'Premier', 'Not sure yet'] },
      { id: 'budget', label: 'Estimated budget', type: 'select',
        options: ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+', 'Prefer not to say'] },
      { id: 'goals', label: 'Primary goal', type: 'multicheck',
        options: ['Brand awareness', 'Athlete partnerships', 'Community impact', 'HERO association', 'Youth sports reach', 'Content creation'] },
    ],
  },
  {
    step: 3,
    heading: 'Anything else?',
    fields: [
      { id: 'timeline', label: 'Timeline', type: 'select',
        options: ['ASAP', '1–3 months', '3–6 months', 'Just exploring'] },
      { id: 'message', label: 'Tell us more about what you\'re looking for', type: 'textarea', placeholder: 'Optional...' },
    ],
  },
];
 
export default function ForBrandsPage() {
  const [scrolled, setScrolled]   = useState(false);
  const [loaded, setLoaded]       = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep]           = useState(1);
  const [formData, setFormData]   = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
 
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
 
  const currentStep = FORM_STEPS.find((s) => s.step === step)!;
  const handleField = (id: string, value: string) => setFormData((p) => ({ ...p, [id]: value }));
  const handleMultiCheck = (id: string, opt: string) => setFormData((p) => {
    const arr = (p[id] as string[] | undefined) ?? [];
    return { ...p, [id]: arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt] };
  });
  const handleNext = () => { if (step < FORM_STEPS.length) setStep(step + 1); else setSubmitted(true); };
  const openModal  = () => { setModalOpen(true); setStep(1); setSubmitted(false); };
  const closeModal = () => setModalOpen(false);
 
  return (
    <div className={`${barlow.variable} ${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white text-[#092866] overflow-x-hidden`}>
 
      <style>{`
        @keyframes marquee  { to { transform: translateX(-50%); } }
        @keyframes word-in  { from{opacity:0;transform:translateY(110%)} to{opacity:1;transform:translateY(0)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade     { from{opacity:0} to{opacity:1} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glow-orb { 0%,100%{opacity:.07} 50%{opacity:.03} }
 
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
        .btn-ghost-light { border:1px solid rgba(9,40,102,.2); color:#092866; transition:border-color .2s,color .2s; }
        .btn-ghost-light:hover { border-color:#52aafc; color:#52aafc; }
 
        .reason-row { border-bottom:1px solid rgba(9,40,102,.08); transition:background .25s,padding-left .25s; }
        .reason-row:hover { background:rgba(82,170,252,.03); padding-left:8px; }
 
        .tier-card { border:1px solid rgba(9,40,102,.1); transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s,border-color .3s; }
        .tier-card:hover { transform:translateY(-6px); box-shadow:0 32px 80px rgba(9,40,102,.1); }
        .tier-card.featured { border-color:#52aafc; box-shadow:0 0 0 1px rgba(82,170,252,.3),0 24px 60px rgba(9,40,102,.1); }
        .tier-card.featured:hover { box-shadow:0 0 0 1px rgba(82,170,252,.5),0 40px 80px rgba(9,40,102,.15); }
 
        .eco-row { border-bottom:1px solid rgba(255,255,255,.08); transition:padding-left .25s,border-color .25s; }
        .eco-row:hover { padding-left:10px; border-color:rgba(82,170,252,.25); }
 
        .partner-card { border:1px solid rgba(9,40,102,.08); transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .3s; }
        .partner-card:hover { transform:translateY(-4px); box-shadow:0 20px 50px rgba(9,40,102,.08); border-color:rgba(82,170,252,.35); }
        .partner-card:hover .pc-line { transform:scaleX(1); }
        .pc-line { transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
 
        .nav-lnk::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#52aafc; transition:width .3s; }
        .nav-lnk:hover::after { width:100%; }
 
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
 
        {/* diagonal blue wash top-right */}
        <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[46vw]"
          style={{background:'linear-gradient(215deg,#daeeff 0%,#c0d9f7 55%,transparent 100%)',clipPath:'polygon(100% 0,100% 100%,26% 100%,0 0)'}} />
 
        {/* copy */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-14 md:px-12 lg:px-20">
          <div className="mb-7 flex items-center gap-3"
            style={{animation:loaded?'slide-up .6s ease .1s both':'none',opacity:loaded?undefined:0}}>
            <span className="h-[2px] w-10 bg-[#52aafc]" />
            <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]">For Brands</span>
          </div>
 
          <h1 className="font-[family-name:var(--font-barlow)] text-[clamp(52px,10vw,140px)] font-extrabold uppercase leading-[0.85] tracking-[-0.01em] text-[#092866]">
            <div className="ww block">
              <span className="w" style={{animationDelay:loaded?'.12s':'999s'}}>Your</span>
            </div>
            <div className="ww block">
              <span className="w" style={{animationDelay:loaded?'.24s':'999s'}}>Brand.</span>
            </div>
            <div className="ww block">
              <span className="w" style={{animationDelay:loaded?'.38s':'999s'}}>Their</span>
            </div>
            <div className="ww block">
              <span className="w text-[#52aafc]" style={{animationDelay:loaded?'.52s':'999s'}}>Legacy.</span>
            </div>
          </h1>
 
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[440px] text-[16px] font-light leading-[1.85] text-[#092866]/48"
              style={{animation:loaded?'slide-up .7s ease .78s both':'none',opacity:loaded?undefined:0}}>
              We're building a network of brands that believe in what athletes stand for — real, lasting partnerships that go beyond a logo placement.
            </p>
            <div className="flex flex-wrap gap-3"
              style={{animation:loaded?'slide-up .65s ease .94s both':'none',opacity:loaded?undefined:0}}>
              <button onClick={openModal}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em]">
                Partner With Us →
              </button>
              <Link href="#tiers"
                className="btn-ghost-light inline-flex items-center gap-2 px-8 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em]">
                View Tiers ↓
              </Link>
            </div>
          </div>
        </div>
 
        {/* floating photo placeholders — desktop */}
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
            ['4',        'AE Ecosystem products'],
            ['5',        'Heroes already filmed'],
            ['100%',     'Donations pass-through'],
            ['Jan 2026', 'HERO launches'],
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
          {['Partner With Us','Brand Alignment','Community Impact','Athlete First','Real Partnerships','HERO Documentary','Teams Elevated','Athlink',
            'Partner With Us','Brand Alignment','Community Impact','Athlete First','Real Partnerships','HERO Documentary','Teams Elevated','Athlink',
            'Partner With Us','Brand Alignment','Community Impact','Athlete First','Real Partnerships','HERO Documentary','Teams Elevated','Athlink'].map((t,i)=>(
            <span key={i} className="inline-flex items-center gap-7 px-7 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.2em] text-[#06080f]">
              {t}<span className="h-[4px] w-[4px] rounded-full bg-[#06080f]/30" />
            </span>
          ))}
        </div>
      </div>
 
      {/* ══════════════════════════════════════════════════════════════════
          2. WHY PARTNER — white, magazine-style numbered rows
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-20">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#52aafc]" />
            <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Why Partner With AE</span>
          </div>
          <h2 className="font-[family-name:var(--font-barlow)] text-[clamp(32px,4.5vw,68px)] font-extrabold uppercase leading-[0.91] text-[#092866]">
            Be part of the<br />journey, not just<br /><span className="text-[#52aafc]">the moment.</span>
          </h2>
        </div>
 
        <div className="space-y-0 border-t border-[#092866]/8">
          {REASONS.map((r, i) => (
            <div key={r.n}
              className="reason-row sr grid grid-cols-1 py-12 md:grid-cols-[100px_1fr_1fr] md:gap-10"
              style={{transitionDelay:`${i*100}ms`}}>
              <div className="font-[family-name:var(--font-barlow)] text-[60px] font-extrabold leading-none text-[#092866]/[.06] transition-colors group-hover:text-[#52aafc]/15 md:text-[80px]">
                {r.n}
              </div>
              <div className="mt-4 md:mt-0">
                <h3 className="font-[family-name:var(--font-barlow)] text-[22px] font-bold uppercase text-[#092866]">{r.title}</h3>
              </div>
              <p className="mt-3 text-[15px] font-light leading-[1.85] text-[#092866]/48 md:mt-0">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          3. TIERS — f0f5fd, 3 cards, center featured
      ══════════════════════════════════════════════════════════════════ */}
      <section id="tiers" className="bg-[#f0f5fd] px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#52aafc]" />
              <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Partnership Tiers</span>
            </div>
            <h2 className="font-[family-name:var(--font-barlow)] text-[clamp(32px,4.5vw,68px)] font-extrabold uppercase leading-[0.91] text-[#092866]">
              Find your<br /><span className="text-[#52aafc]">level.</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] font-light leading-[1.85] text-[#092866]/48">
            Every partnership is customized. These tiers are a starting point — reach out and we'll build something that actually works for your brand.
          </p>
        </div>
 
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <div key={tier.name}
              className={`tier-card sr relative overflow-hidden bg-white p-8 ${tier.featured ? 'featured' : ''}`}
              style={{transitionDelay:`${i*100}ms`}}>
 
              {/* top accent bar */}
              <div className="absolute left-0 top-0 h-[3px] w-full" style={{background:tier.accent}} />
 
              {/* featured badge */}
              {tier.featured && (
                <div className="absolute right-6 top-5 rounded-full bg-[#52aafc] px-3 py-1 font-[family-name:var(--font-barlow)] text-[9px] font-bold uppercase tracking-[0.2em] text-[#092866]">
                  {tier.tag}
                </div>
              )}
 
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em]" style={{color:tier.accent}}>{tier.price}</div>
              <h3 className="font-[family-name:var(--font-barlow)] mb-6 text-[36px] font-extrabold uppercase text-[#092866]">{tier.name}</h3>
 
              <div className="mb-8 space-y-3">
                {tier.perks.map((perk) => (
                  <div key={perk} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:tier.accent}} />
                    <span className="text-[13px] font-light leading-[1.7] text-[#092866]/60">{perk}</span>
                  </div>
                ))}
              </div>
 
              <button onClick={openModal}
                className={`w-full py-3.5 font-[family-name:var(--font-barlow)] text-[12px] font-bold uppercase tracking-[0.12em] transition-all ${tier.featured ? 'btn-blue' : 'btn-ghost-light'}`}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
 
        <p className="sr mt-8 text-center text-[13px] font-light text-[#092866]/38" style={{transitionDelay:'300ms'}}>
          All tiers are customizable. <button onClick={openModal} className="text-[#52aafc] underline underline-offset-2">Contact us</button> to build a partnership that's right for you.
        </p>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          4. ECOSYSTEM REACH — navy split, stats left, products right
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#092866] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
 
          {/* left — big stats */}
          <div className="sr-l relative flex flex-col justify-center px-8 py-20 md:px-16"
            style={{background:'radial-gradient(ellipse at 30% 50%,rgba(82,170,252,.1) 0%,transparent 65%)'}}>
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#52aafc]" />
              <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Ecosystem Reach</span>
            </div>
            <h2 className="font-[family-name:var(--font-barlow)] mb-10 text-[clamp(32px,4vw,64px)] font-extrabold uppercase leading-[0.91] text-white">
              One partnership.<br /><span className="text-[#52aafc]" style={{textShadow:'0 0 40px rgba(82,170,252,.4)'}}>Every touchpoint.</span>
            </h2>
            <p className="mb-12 max-w-[380px] text-[15px] font-light leading-[1.85] text-white/45">
              When you partner with Athletes Elevated, your brand shows up across our entire ecosystem — from youth leagues to a global documentary to athlete profiles worldwide.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                {v:'4', l:'AE products'},
                {v:'100%', l:'Impact pass-through'},
                {v:'Global', l:'Documentary reach'},
                {v:'Growing', l:'Athlete network'},
              ].map((s)=>(
                <div key={s.l} className="border-l-[2px] border-[#52aafc]/40 pl-4">
                  <div className="font-[family-name:var(--font-barlow)] text-[clamp(24px,3vw,42px)] font-extrabold leading-none text-[#52aafc]">{s.v}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/38">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
 
          {/* right — product list */}
          <div className="sr relative flex flex-col justify-center border-l border-white/[.06] px-8 py-20 md:px-12" style={{transitionDelay:'130ms'}}>
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#52aafc]/50">Where your brand appears</div>
            <div className="space-y-0">
              {ECOSYSTEM_REACH.map((item, i) => (
                <div key={item.product}
                  className="eco-row group py-7 last:border-b-0"
                  style={{transitionDelay:`${i*80}ms`}}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-[family-name:var(--font-barlow)] text-[24px] font-extrabold uppercase text-white transition-colors group-hover:text-[#52aafc]">
                        {item.product}
                      </div>
                      <div className="mt-0.5 text-[12px] font-light text-white/40">{item.desc}</div>
                    </div>
                    <div className="shrink-0 rounded-full border border-[#52aafc]/30 px-3 py-1 font-[family-name:var(--font-barlow)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#52aafc]/70">
                      {item.stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <button onClick={openModal}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em]">
                Partner With Us →
              </button>
            </div>
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          5. CURRENT PARTNERS — white, marquee + partner cards
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-32 md:px-12 lg:px-20">
        <div className="sr mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#52aafc]" />
              <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#52aafc]">Ecosystem Partners</span>
            </div>
            <h2 className="font-[family-name:var(--font-barlow)] text-[clamp(30px,4vw,60px)] font-extrabold uppercase leading-[0.91] text-[#092866]">
              Brands that<br /><span className="text-[#52aafc]">believe.</span>
            </h2>
          </div>
          <p className="max-w-[340px] text-[15px] font-light leading-[1.85] text-[#092866]/45">
            These brands understand that supporting athletes is more than a marketing play — it's a commitment to something bigger.
          </p>
        </div>
 
        {/* scrolling marquee */}
        <div className="mb-16 overflow-hidden border-y border-[#092866]/8 py-6"
          style={{maskImage:'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)'}}>
          <div className="flex whitespace-nowrap" style={{animation:'marquee 28s linear infinite',width:'max-content'}}>
            {[...PARTNERS,...PARTNERS].map((p,i)=>(
              <span key={i} className="inline-flex items-center gap-10 px-10 font-[family-name:var(--font-barlow)] text-[15px] font-semibold uppercase tracking-[0.1em] text-[#092866]/30 transition-colors hover:text-[#52aafc]">
                {p}<span className="h-1 w-1 rounded-full bg-[#092866]/18" />
              </span>
            ))}
          </div>
        </div>
 
        {/* partner spotlight cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { name:'Essex Mortgage', type:'Financial Services', quote:'Athletes Elevated gave us a meaningful way to connect with the communities we serve.' },
            { name:'TBX Golf', type:'Sports Equipment', quote:'The alignment with AE\'s athlete-first values made this an easy decision for our brand.' },
            { name:'Holistic Beverages', type:'Health & Wellness', quote:'Partnering with AE connects us directly to athletes who share our commitment to performance.' },
          ].map((p, i) => (
            <div key={p.name} className="partner-card sr relative overflow-hidden bg-white p-8" style={{transitionDelay:`${i*100}ms`}}>
              <div className="pc-line absolute left-0 top-0 h-[2px] w-full bg-[#52aafc]" />
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#52aafc]">{p.type}</div>
              <h3 className="font-[family-name:var(--font-barlow)] mb-4 text-[22px] font-extrabold uppercase text-[#092866]">{p.name}</h3>
              <p className="text-[13px] font-light italic leading-[1.8] text-[#092866]/48">"{p.quote}"</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════════════
          6. CTA — full viewport, "LET'S BUILD SOMETHING."
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f0f5fd] px-6 text-center">
 
        {/* subtle glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{background:'radial-gradient(circle,rgba(82,170,252,.07) 0%,transparent 65%)',animation:'glow-orb 8s ease-in-out infinite'}} />
 
        {/* corner brackets */}
        <div className="pointer-events-none absolute left-8 top-8 h-[80px] w-[80px] border-l-2 border-t-2 border-[#52aafc]/25" />
        <div className="pointer-events-none absolute right-8 top-8 h-[80px] w-[80px] border-r-2 border-t-2 border-[#52aafc]/25" />
        <div className="pointer-events-none absolute bottom-8 left-8 h-[80px] w-[80px] border-b-2 border-l-2 border-[#52aafc]/25" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-[80px] w-[80px] border-b-2 border-r-2 border-[#52aafc]/25" />
 
        <div className="sr relative z-10 w-full max-w-[900px]">
          <div className="mb-8 inline-flex items-center gap-4">
            <span className="h-[1px] w-12 bg-[#52aafc]/50" />
            <span className="font-[family-name:var(--font-barlow)] text-[11px] font-semibold uppercase tracking-[0.36em] text-[#52aafc]/70">Ready to partner?</span>
            <span className="h-[1px] w-12 bg-[#52aafc]/50" />
          </div>
 
          <h2 className="font-[family-name:var(--font-barlow)] font-extrabold uppercase leading-[0.84] text-[#092866]"
            style={{fontSize:'clamp(60px,14vw,180px)'}}>
            LET'S<br />
            BUILD<br />
            <span className="text-[#52aafc]">SOME</span><span style={{WebkitTextStroke:'2px rgba(9,40,102,.35)',color:'transparent'}}>THING.</span>
          </h2>
 
          <p className="mx-auto mb-14 mt-8 max-w-[420px] text-[16px] font-light leading-[1.82] text-[#092866]/45">
            Tell us about your brand and what you're looking for. We'll take it from there.
          </p>
 
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={openModal}
              className="btn-blue inline-flex items-center gap-2 px-12 py-5 font-[family-name:var(--font-barlow)] text-[14px] font-bold uppercase tracking-[0.1em]">
              Partner With Us →
            </button>
            <Link href="/athletes"
              className="btn-ghost-light inline-flex items-center gap-2 px-12 py-5 font-[family-name:var(--font-barlow)] text-[14px] font-bold uppercase tracking-[0.1em]">
              I'm an Athlete →
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#092866] px-6 pb-10 pt-20 md:px-12">
        <div className="mb-14 flex flex-wrap items-start justify-between gap-10 border-b border-white/[.08] pb-14">
          <div>
            <div className="mb-3 font-[family-name:var(--font-barlow)] text-[28px] font-extrabold uppercase tracking-[0.05em] text-white">
              ATHLETES <span className="text-[#52aafc]">ELEVATED</span>
            </div>
            <p className="max-w-[270px] text-[13px] font-light leading-[1.72] text-white/26">
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
          <p className="text-[11px] text-white/16">© 2026 Athletes Elevated. All rights reserved.</p>
          <p className="text-[11px] italic text-white/12">Performance meets purpose.</p>
        </div>
      </footer>
 
      {/* ── MODAL ───────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#092866]/80 px-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{animation:'fade .2s ease both'}}>
          <div className="relative w-full max-w-lg bg-white" style={{animation:'slide-up .3s ease both'}}>
 
            <div className="h-[3px] w-full bg-[#092866]/8">
              <div className="h-full bg-[#52aafc] transition-all duration-500"
                style={{width:submitted?'100%':`${(step/FORM_STEPS.length)*100}%`}} />
            </div>
 
            <button onClick={closeModal} aria-label="Close"
              className="absolute right-4 top-4 text-[#092866]/30 transition-colors hover:text-[#092866]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
 
            <div className="px-8 py-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-[#52aafc]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L19 7" stroke="#092866" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-barlow)] mb-3 text-[28px] font-extrabold uppercase text-[#092866]">We'll be in touch.</h3>
                  <p className="text-[14px] font-light leading-[1.75] text-[#092866]/50">Thanks for reaching out. Someone from our team will contact you shortly.</p>
                  <button onClick={closeModal}
                    className="mt-8 inline-flex items-center gap-2 bg-[#092866] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-[#0d3a8c]">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center gap-2">
                    {FORM_STEPS.map((s) => (
                      <div key={s.step} className={`h-[2px] flex-1 transition-colors duration-300 ${s.step <= step ? 'bg-[#52aafc]' : 'bg-[#092866]/10'}`} />
                    ))}
                  </div>
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#52aafc]">Step {step} of {FORM_STEPS.length}</span>
                  <h3 className="font-[family-name:var(--font-barlow)] mb-6 text-[26px] font-extrabold uppercase text-[#092866]">{currentStep.heading}</h3>
 
                  <div className="space-y-5">
                    {currentStep.fields.map((field) => {
                      if (field.type === 'select') return (
                        <div key={field.id}>
                          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">{field.label}</label>
                          <select className="w-full border border-[#092866]/15 bg-white px-4 py-3 text-[14px] font-light text-[#092866] outline-none focus:border-[#52aafc]"
                            value={(formData[field.id] as string) ?? ''}
                            onChange={(e) => handleField(field.id, e.target.value)}>
                            <option value="">Select...</option>
                            {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      );
                      if (field.type === 'textarea') return (
                        <div key={field.id}>
                          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">{field.label}</label>
                          <textarea rows={3} className="w-full resize-none border border-[#092866]/15 bg-white px-4 py-3 text-[14px] font-light text-[#092866] outline-none focus:border-[#52aafc]"
                            placeholder={field.placeholder} value={(formData[field.id] as string) ?? ''}
                            onChange={(e) => handleField(field.id, e.target.value)} />
                        </div>
                      );
                      if (field.type === 'multicheck') {
                        const selected = (formData[field.id] as string[]) ?? [];
                        return (
                          <div key={field.id}>
                            <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">{field.label}</label>
                            <div className="grid grid-cols-2 gap-2">
                              {field.options?.map((opt) => {
                                const checked = selected.includes(opt);
                                return (
                                  <button key={opt} type="button" onClick={() => handleMultiCheck(field.id, opt)}
                                    className={`flex items-center gap-2.5 border px-3.5 py-2.5 text-left text-[12px] font-medium transition-all ${checked ? 'border-[#52aafc] bg-[#52aafc]/8 text-[#092866]' : 'border-[#092866]/12 text-[#092866]/50 hover:border-[#52aafc]/50'}`}>
                                    <span className={`h-3.5 w-3.5 shrink-0 border transition-colors ${checked ? 'border-[#52aafc] bg-[#52aafc]' : 'border-[#092866]/30'}`}>
                                      {checked && <svg viewBox="0 0 10 10" fill="none" className="h-full w-full p-[1px]"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}
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
                          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092866]/55">{field.label}</label>
                          <input type={field.type} className="w-full border border-[#092866]/15 bg-white px-4 py-3 text-[14px] font-light text-[#092866] outline-none focus:border-[#52aafc]"
                            placeholder={field.placeholder} value={(formData[field.id] as string) ?? ''}
                            onChange={(e) => handleField(field.id, e.target.value)} />
                        </div>
                      );
                    })}
                  </div>
 
                  <div className="mt-8 flex items-center justify-between">
                    {step > 1
                      ? <button onClick={() => setStep(step-1)} className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#092866]/38 hover:text-[#092866]">← Back</button>
                      : <span />}
                    <button onClick={handleNext}
                      className="btn-blue inline-flex items-center gap-2 px-8 py-3.5 font-[family-name:var(--font-barlow)] text-[12px] font-bold uppercase tracking-[0.12em]">
                      {step === FORM_STEPS.length ? 'Submit' : 'Next →'}
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