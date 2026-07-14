// Place this file at: app/west-ham/page.tsx
'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: EASE, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function HeroText({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay }} style={style}>
      {children}
    </motion.div>
  );
}

// ─── Colors ────────────────────────────────────────────────────────────────────
const DARK      = '#0A0A0A';
const BLUE      = '#52aafc';
const GOLD      = '#F5C500';

// ─── Fonts ─────────────────────────────────────────────────────────────────────
const BEBAS   = "'Bebas Neue', sans-serif";
const BODY    = "'DM Sans', sans-serif";
const HEADING = "'Apotek Extended', sans-serif";

// ─── Countdown hook ────────────────────────────────────────────────────────────
const TARGET_DATE = new Date('2026-08-10T00:00:00');

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 }); return; }
      setTimeLeft({
        days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins:  Math.floor((diff / (1000 * 60)) % 60),
        secs:  Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

// ─── Section: Hero (with CTA at bottom) ───────────────────────────────────────
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.preload = 'auto';

    // Shift video right on mobile so the background looks better
    const isMob = window.innerWidth < 768;
    video.style.cssText = `display:block;width:100%;height:100%;object-fit:cover;object-position:${isMob ? '10% center' : 'center center'}`;

    const source = document.createElement('source');
    source.src = '/home/whu-home.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
    container.appendChild(video);

    video.load();
    video.play().catch(() => {});

    // iOS fallback: play on first touch
    const onTouch = () => { video.play().catch(() => {}); };
    document.addEventListener('touchstart', onTouch, { once: true, passive: true });

    return () => {
      document.removeEventListener('touchstart', onTouch);
      if (container.contains(video)) container.removeChild(video);
    };
  }, []);

  return (
    <section className="whu-hero-section" style={{ backgroundColor: DARK, position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Video background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.2) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 100, background: 'linear-gradient(to bottom, transparent, #0A0A0A)', pointerEvents: 'none' }} />
      </div>

      {/* Main hero content */}
      <div className="flex-1 flex items-center" style={{ position: 'relative', zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-6 w-full pt-12">
          <HeroText delay={0.1}>
            {/* Headline: ALL IN ON THE IRONS with crest below */}
            <h1
              className="whu-hero-h1"
              style={{ fontFamily: BEBAS, color: 'transparent', WebkitTextStroke: '5px #52aafc', fontSize: 'clamp(80px, 14vw, 200px)', paddingTop: '12px', lineHeight: 0.88, letterSpacing: '0.02em', marginBottom: 0 }}
            >
              ALL IN ON<br />
              <span className="whu-irons" style={{ color: BLUE, WebkitTextStroke: '5px' }}>THE IRONS.</span>
            </h1>
            {/* Crest sits below the headline */}
            <div style={{ marginTop: 'clamp(14px, 2vw, 28px)', marginBottom: 'clamp(12px, 1.5vw, 20px)' }}>
              <img src="/images/WHU_logo.png" alt="West Ham United" style={{ height: 'clamp(60px, 10vw, 140px)', width: 'auto' }} />
            </div>
          </HeroText>
          <HeroText delay={0.48}>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(13px, 1.6vw, 16px)', fontWeight: 300, lineHeight: 1.7, maxWidth: 540, marginTop: 14 }}>
              Athletes Elevated is West Ham United&apos;s exclusive rewards marketplace, giving fans access to limited-edition products, rewards and unique experiences.
            </p>
          </HeroText>
        </div>
      </div>

      {/* CTA strip — pinned to bottom of hero */}
      <div className="py-4" style={{ position: 'relative', zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 text-right md:text-left">
            <p className="whu-cta-text" style={{ fontFamily: BEBAS, color: GOLD, fontSize: 'clamp(18px, 2.5vw, 26px)', letterSpacing: '0.1em', WebkitTextStroke: '1px' }}>ARE YOU IN?</p>
            {/* Both buttons together */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const, justifyContent: 'flex-end' }}>
              <motion.a
                href="#join"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontFamily: BEBAS, backgroundColor: GOLD, color: '#000000', padding: '12px 52px', fontSize: 20, letterSpacing: '0.12em', display: 'inline-block', textDecoration: 'none' }}
              >
                JOIN THE CLUB
              </motion.a>
              <Link
                href="/west-ham-store"
                style={{ fontFamily: BEBAS, backgroundColor: 'transparent', border: `1.5px solid ${GOLD}`, color: GOLD, padding: '12px 52px', fontSize: 18, letterSpacing: '0.12em', display: 'inline-block', textDecoration: 'none' }}
              >
                LEARN MORE
              </Link>
            </div>
            <p className="whu-cta-text" style={{ fontFamily: BEBAS, color: GOLD, fontSize: 'clamp(13px, 1.6vw, 17px)', WebkitTextStroke: '1px', letterSpacing: '0.06em', textAlign: 'right' as const }}>MEMBERS GET EXCLUSIVE<br />ACCESS LIMITED-EDITION GEAR</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Feature Cards ────────────────────────────────────────────────────
const features = [
  { tag: 'FANS',  title: 'BEFORE THE REVEAL.',           desc: 'Be a founding member of the AExWHU Marketplace.' },
  { tag: 'GEAR',  title: 'PRIORITY ACCESS. FIRST DROPS.', desc: 'Limited-Edition merchandise available only to members.' },
  { tag: 'REWARDS', title: 'MEMBER BENEFITS.',            desc: "Sign up to unlock exclusive drops, rewards points, Club collaborations and experiences." },
];

function FeatureCards() {
  return (
    <section style={{ backgroundColor: DARK }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ tag, title, desc }, i) => (
            <FadeUp key={tag} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, borderLeftColor: GOLD }}
                transition={{ duration: 0.2 }}
                style={{ background: 'linear-gradient(to bottom, #3a3a3a, #111111)', borderRadius: 4, padding: '32px 28px', borderLeft: `3px solid ${BLUE}`, height: '100%' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 20, height: 1, backgroundColor: GOLD }} />
                  <p style={{ fontFamily: BEBAS, color: GOLD, fontSize: 15, letterSpacing: '0.18em', WebkitTextStroke: '0.5px' }}>{tag}</p>
                </div>
                <h3 className="whu-card-title" style={{ fontFamily: BEBAS, color: '#ffffff', fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '0.02em', marginBottom: 14, WebkitTextStroke: '1.5px' }}>{title}</h3>
                <p style={{ fontFamily: BODY, color: '#ffffff', fontSize: 14, fontWeight: 300, lineHeight: 1.75 }}>{desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Countdown ────────────────────────────────────────────────────────
function CountdownSection() {
  const { days, hours, mins, secs } = useCountdown(TARGET_DATE);
  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [
    { label: 'DAYS',  value: pad(days) },
    { label: 'HOURS', value: pad(hours) },
    { label: 'MINS',  value: pad(mins) },
    { label: 'SECS',  value: pad(secs) },
  ];

  return (
    <section style={{ backgroundColor: DARK }} className="py-2 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — countdown */}
          <FadeIn>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0 }}>
                {units.map(({ value, label }, i) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ textAlign: 'center' as const }}>
                      <div style={{ fontFamily: BEBAS, color: BLUE, fontSize: 'clamp(48px, 9vw, 110px)', lineHeight: 1, letterSpacing: '0.02em' }}>
                        {value}
                      </div>
                      <p style={{ fontFamily: BEBAS, color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '0.14em', marginTop: 6 }}>{label}</p>
                    </div>
                    {i < units.length - 1 && (
                      <span style={{ fontFamily: BEBAS, color: BLUE, fontSize: 'clamp(48px, 9vw, 110px)', lineHeight: 1, marginBottom: 24, opacity: 0.6 }}>:</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — tagline */}
          <FadeUp delay={0.15}>
            <div>
              <h2 className="whu-countdown-title" style={{ fontFamily: BEBAS, color: BLUE, fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 24, WebkitTextStroke: '3px' }}>
                SHOW UP.<br />STAND OUT.
              </h2>
              <p style={{ fontFamily: BODY, color: '#ffffff', fontSize: 18, fontWeight: 300, lineHeight: 1.8, paddingBottom: '12px', maxWidth: '400px' }}>
                More than a marketplace — the place to earn exclusive rewards just for being a fan.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Stadium Form ─────────────────────────────────────────────────────
function StadiumForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  // All three start unchecked — required by GDPR
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Belt-and-suspenders: block submit if required boxes aren't checked
    if (!ageConfirmed || !termsAccepted) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/west-ham', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ageConfirmed, marketingConsent, termsAccepted }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', backgroundColor: '#ffffff',
    border: 'none', padding: '12px 14px', fontFamily: BODY,
    fontSize: 14, color: '#000000', outline: 'none', borderRadius: 0,
  };

  return (
    <section id="join" style={{ backgroundColor: DARK, position: 'relative', overflow: 'hidden' }} className="py-24 md:py-32">
      {/* Stadium background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill src="/images/London_Stadium_abmsh0.png" alt="London Stadium" style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.65 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.85) 100%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — headline + sub-text */}
          <FadeUp>
            <h2 className="whu-form-title" style={{ fontFamily: BEBAS, color: GOLD, fontSize: 'clamp(64px, 10vw, 140px)', lineHeight: 0.88, letterSpacing: '0.02em', WebkitTextStroke: '5px' }}>
              BE A PART<br />OF THEIR<br />STORY.
            </h2>
            {/* Announcement release language */}
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(14px, 1.6vw, 16px)', fontWeight: 300, lineHeight: 1.75, maxWidth: 420, marginTop: 20 }}>
              West Ham United fans are among the first invited to join Athletes Elevated. Sign up for early access to selected drops, experiences, hospitality opportunities and more.
            </p>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.15}>
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: 'rgba(255,255,255,0.65)', padding: '44px 32px', textAlign: 'center' as const }}>
                <p style={{ fontFamily: BEBAS, color: '#000', fontSize: 30, letterSpacing: '0.06em', marginBottom: 10 }}>YOU'RE SIGNED UP.</p>
                <p style={{ fontFamily: BODY, color: '#555', fontSize: 14, fontWeight: 300 }}>We'll be in touch with your exclusive member details soon.</p>
              </motion.div>
            ) : (
              <div style={{ backgroundColor: 'rgba(255,255,255,0.60)', padding: '36px 32px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6 }}>First Name *</label>
                    <input type="text" required value={form.firstName} onChange={update('firstName')} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6 }}>Last Name *</label>
                    <input type="text" required value={form.lastName} onChange={update('lastName')} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6 }}>Email Address *</label>
                    <input type="email" required value={form.email} onChange={update('email')} style={inputStyle} />
                  </div>

                  {/* ─── Consent checkboxes ──────────────────────────────── */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>

                    {/* Age confirmation — required */}
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        required
                        checked={ageConfirmed}
                        onChange={e => setAgeConfirmed(e.target.checked)}
                        style={{ marginTop: 2, flexShrink: 0, accentColor: GOLD, width: 15, height: 15, cursor: 'pointer' }}
                      />
                      <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 400, color: 'rgba(0,0,0,0.65)', lineHeight: 1.55 }}>
                        I confirm I am 16 years of age or older.{' '}
                        <span style={{ color: '#DC2626' }}>*</span>
                      </span>
                    </label>

                    {/* Marketing consent — optional */}
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={e => setMarketingConsent(e.target.checked)}
                        style={{ marginTop: 2, flexShrink: 0, accentColor: GOLD, width: 15, height: 15, cursor: 'pointer' }}
                      />
                      <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 400, color: 'rgba(0,0,0,0.65)', lineHeight: 1.55 }}>
                        I want to receive marketing communications from Athletes Elevated, including updates on new athletes, brand partners, product drops, rewards, and events. I can unsubscribe at any time.
                      </span>
                    </label>

                    {/* Terms & Privacy — required */}
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        required
                        checked={termsAccepted}
                        onChange={e => setTermsAccepted(e.target.checked)}
                        style={{ marginTop: 2, flexShrink: 0, accentColor: GOLD, width: 15, height: 15, cursor: 'pointer' }}
                      />
                      <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 400, color: 'rgba(0,0,0,0.65)', lineHeight: 1.55 }}>
                        I have read and agree to the{' '}
                        <a href="/privacy" style={{ color: '#000000', textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy Policy</a>
                        {' '}and{' '}
                        <a href="/terms" style={{ color: '#000000', textDecoration: 'underline', textUnderlineOffset: 2 }}>Terms of Use</a>.{' '}
                        <span style={{ color: '#DC2626' }}>*</span>
                      </span>
                    </label>

                    <p style={{ fontFamily: BODY, fontSize: 10, fontWeight: 300, color: 'rgba(0,0,0,0.4)', marginTop: 2 }}>
                      <span style={{ color: '#DC2626' }}>*</span> Required
                    </p>
                  </div>

                  {status === 'error' && (
                    <p style={{ fontFamily: BODY, color: '#DC2626', fontSize: 13, fontWeight: 300 }}>Something went wrong. Please try again.</p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={status === 'submitting' || !ageConfirmed || !termsAccepted}
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: BEBAS, backgroundColor: GOLD, color: '#000000', border: 'none', padding: '14px 24px', fontSize: 22, letterSpacing: '0.1em', cursor: (status === 'submitting' || !ageConfirmed || !termsAccepted) ? 'not-allowed' : 'pointer', opacity: (status === 'submitting' || !ageConfirmed || !termsAccepted) ? 0.45 : 1, width: '100%', marginTop: 4 }}
                  >
                    {status === 'submitting' ? 'SIGNING UP...' : 'SIGN UP FOR PRIORITY ACCESS'}
                  </motion.button>
                  <p style={{ fontFamily: BODY, color: 'rgba(0,0,0,0.4)', fontSize: 11, fontWeight: 300, textAlign: 'center' as const }}>
                    Your information is kept private. We never share or sell your data.
                  </p>
                </form>
              </div>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Bottom Banner ────────────────────────────────────────────────────
function BottomBanner() {
  return (
    <section style={{ backgroundColor: '#060606' }} className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="whu-banner-title" style={{ fontFamily: BEBAS, color: BLUE, fontSize: 'clamp(36px, 7vw, 96px)', lineHeight: 1.0, letterSpacing: '0.02em', marginBottom: 20, WebkitTextStroke: '3px' }}>
            AN EXCLUSIVE <br /> FAN-FIRST ECOSYSTEM.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p style={{ fontFamily: BEBAS, color: BLUE, fontSize: 'clamp(13px, 1.8vw, 17px)', letterSpacing: '0.12em', marginBottom: 36 }}>
            ATHLETES ELEVATED BELIEVES THAT THE FUTURE OF SPORT IS BUILT TOGETHER TO GROW TOGETHER.
          </p>
        </FadeUp>

        {/* Partnership lock-up: AE + WHU logos side by side with official designation */}
        <FadeUp delay={0.25}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 14 }}>
            <Image
              src="/AthletesElevated_Final_color reverse.svg"
              alt="Athletes Elevated"
              width={160}
              height={56}
              style={{ height: 52, width: 'auto' }}
            />
            <div style={{ width: 1, height: 48, backgroundColor: 'rgba(82,170,252,0.3)' }} />
            <img
              src="/images/WHU_logo.png"
              alt="West Ham United"
              style={{ height: 65, width: 'auto' }}
            />
          </div>
          <p style={{ fontFamily: BEBAS, color: 'rgba(255,255,255,0.45)', fontSize: 12, letterSpacing: '0.2em', marginBottom: 36 }}>
            OFFICIAL BACK OF SHIRT PARTNER OF WEST HAM UNITED
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              href="/west-ham-store"
              style={{ fontFamily: BEBAS, backgroundColor: GOLD, color: '#000000', padding: '14px 52px', fontSize: 20, letterSpacing: '0.14em', display: 'inline-block', textDecoration: 'none' }}
            >
              LEARN MORE
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function WestHamPage() {
  return (
    <>
      {/* Mobile stroke overrides — keeps text readable on small screens */}
      <style>{`
        @media (max-width: 767px) {
          .whu-hero-h1   { -webkit-text-stroke: 2px #52aafc !important; }
          .whu-hero-section { min-height: 65vh !important; }
          .whu-irons     { -webkit-text-stroke: 2px !important; }
          .whu-hero-sub  { -webkit-text-stroke: 0px !important; }
          .whu-cta-text  { -webkit-text-stroke: 0px !important; }
          .whu-card-title     { -webkit-text-stroke: 0.5px !important; }
          .whu-countdown-title { -webkit-text-stroke: 1px !important; }
          .whu-form-title { -webkit-text-stroke: 2px !important; }
          .whu-banner-title   { -webkit-text-stroke: 1px !important; }
        }
      `}</style>
      <Navbar />
      <main className="pt-10">
        <Hero />
        <FeatureCards />
        {/* <CountdownSection /> */}
        <StadiumForm />
        <BottomBanner />
      </main>
      <Footer />
    </>
  );
}