// Place this file at: app/page.tsx
'use client';

import { useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Navbar from './src/components/navBar';
import Footer from './src/components/footer';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Animation primitives ──────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.9, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function SlideInLeft({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, ease: EASE, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function SlideInRight({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, ease: EASE, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, ease: EASE, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function StaggerGrid({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 32, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } } }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function HeroText({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE, delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

// Stagger words in a banner row
function StaggerWords({ words }: { words: string[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 md:gap-x-8">
      {words.map((word, i) => (
        <motion.span key={word} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }} className="flex items-center gap-5 md:gap-8">
          <span style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 300, letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>
            {word}
          </span>
          {i < words.length - 1 && <span style={{ color: 'rgba(9,40,102,0.2)', fontSize: 14 }}></span>}
        </motion.span>
      ))}
    </motion.div>
  );
}

const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 3px 0 0 rgba(82,170,252,0)' },
  hover: { y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12), inset 3px 0 0 rgba(82,170,252,1)', transition: { duration: 0.25, ease: 'easeOut' } },
};

const MotionDiv = motion.div;

const NAVY      = '#080F1C';
const NAVY_HERO = '#0B1220';
const HEADING   = "'Apotek Extended', sans-serif";
const BODY      = "'DM Sans', sans-serif";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 12, letterSpacing: '0.28em', fontWeight: 600, textTransform: 'uppercase' as const, borderLeft: '1.5px solid #52aafc', paddingLeft: 10, display: 'inline-block' }}>
        {children}
      </span>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: BODY,
  fontSize: 14,
  fontWeight: 300,
  color: '#092866',
  backgroundColor: '#F4F8FF',
  border: '1px solid rgba(9,40,102,0.15)',
  borderRadius: 4,
  padding: '13px 18px',
  outline: 'none',
  width: '100%',
};

// ─── Waitlist Form ─────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ padding: '28px 32px', backgroundColor: 'rgba(82,170,252,0.08)', border: '1px solid rgba(82,170,252,0.25)', borderRadius: 4, textAlign: 'center' }}>
        <p style={{ fontFamily: HEADING, color: '#092866', fontSize: 18, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 8 }}>You're on the list.</p>
        <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300 }}>We'll reach out with early access details soon.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input
          type="text"
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First name"
          style={inputStyle}
        />
        <input
          type="text"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last name"
          style={inputStyle}
        />
      </div>
      {/* Email + submit row */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          style={{ ...inputStyle, flex: 1, minWidth: 200 }}
        />
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={{ opacity: status === 'submitting' ? 1 : 0.85 }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: BODY,
            background: '#52aafc',
            border: 'none',
            color: '#092866',
            padding: '13px 24px',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            opacity: status === 'submitting' ? 0.6 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'submitting' ? 'Joining…' : 'Join the Waitlist'}
        </motion.button>
      </div>
      {status === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: BODY, color: '#DC2626', fontSize: 13, fontWeight: 300 }}>
          Something went wrong — try again or email us at info@athleteselevated.com.
        </motion.p>
      )}
    </form>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }} className="flex items-end md:items-center pb-16 pt-28 md:py-0 min-h-[55vh] md:min-h-[85vh]">
      {/* Background video — no absolute/inset shorthand, explicit positioning */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
        >
          <source src="/home/Tech.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}CC 0%, ${NAVY_HERO}66 20%, transparent 100%)` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 128, background: `linear-gradient(to bottom, transparent, ${NAVY_HERO})` }} />
      </div>
 
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '580px' }}>
          <HeroText delay={0.1}>
            <p style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 11, letterSpacing: '0.28em', fontWeight: 300, textTransform: 'uppercase' as const, marginBottom: 18, borderLeft: '1.5px solid #52aafc', paddingLeft: 10, display: 'inline-block' }}>Athletes Elevated</p>
          </HeroText>
          <HeroText delay={0.25}>
            <h1 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(38px, 6vw, 76px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 26 }}>
              Where Athletes<br />and Fans Come<br />Together.
            </h1>
          </HeroText>
          <HeroText delay={0.45}>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, maxWidth: 420, marginBottom: 40 }}>
              Athletes Elevated exists to connect players, entrepreneurship, and philanthropy to a purpose beyond the pitch.
            </p>
          </HeroText>
          <HeroText delay={0.6}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <a
                href="#waitlist"
                style={{
                  fontFamily: BODY,
                  background: '#52aafc',
                  border: '1.5px solid #52aafc',
                  color: '#092866',
                  padding: '14px 32px',
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                }}
              >
                Join the Waitlist →
              </a>
            </motion.div>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

// ─── Mission & Vision ──────────────────────────────────────────────────────────
function MissionVision() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <SlideInLeft>
            <motion.div
              whileHover={{ borderLeftColor: '#092866' }}
              transition={{ duration: 0.25 }}
              style={{ borderLeft: '3px solid #52aafc', paddingLeft: 28 }}
            >
              <SectionLabel>Mission</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>Why We Exist</h2>
              <p style={{ fontFamily: BODY, color: NAVY, fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, lineHeight: 1.85 }}>
                To empower athletes to transform their performance into purpose and their influence into lasting impact — through connection, opportunity, and storytelling.
              </p>
            </motion.div>
          </SlideInLeft>
          <SlideInRight delay={0.1}>
            <motion.div
              whileHover={{ borderLeftColor: '#092866' }}
              transition={{ duration: 0.25 }}
              style={{ borderLeft: '3px solid #52aafc', paddingLeft: 28 }}
            >
              <SectionLabel>Vision</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>Where We're Going</h2>
              <p style={{ fontFamily: BODY, color: NAVY, fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, lineHeight: 1.85 }}>
                A place where athletes have the network, resources, and opportunities to create meaningful impact during and after their competitive career.
              </p>
            </motion.div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}

// ─── Impact Banner ─────────────────────────────────────────────────────────────
function ImpactBanner() {
  const words = ['Connection.', 'Opportunity.', 'Storytelling.', 'Impact.'];
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-5">
      <div className="max-w-7xl mx-auto px-6">
        <StaggerWords words={words} />
      </div>
    </section>
  );
}

// ─── The Platform ──────────────────────────────────────────────────────────────
const pillars = [
  { title: 'Connection', href: '/connection', desc: 'A private network built to create meaningful relationships between athletes, investors, brands, charities, and fans.', img: '/images/AdobeStock_758246697.jpeg' },
  { title: 'Opportunity', href: '/opportunity', desc: 'The Athletes Elevated Marketplace creates sustainable revenue streams for athletes and authentic partnerships for brands.', img: '/images/cvg-sponsorship-mosaic2-01.png' },
  { title: 'Storytelling', href: '/storytelling', desc: 'The Heroes Docuseries tells the stories behind athletic careers — the resilience, adversity, and purpose that define who these athletes are.', img: '/images/AdobeStock_1275667575.jpeg' },
];

function ThePlatform() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionLabel>The Platform</SectionLabel>
          <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 16 }}>
            An Invite-Only Ecosystem
          </h2>
          <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.85, maxWidth: 720, marginBottom: 52 }}>
            Athletes Elevated is an invite-only ecosystem connecting athletes, investors, brands, charities, and fans through opportunity, storytelling, and community. It is built around three core pillars — each one designed to serve athletes beyond the competition.
          </p>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {pillars.map(({ title, href, desc, img }) => (
            <StaggerItem key={title}>
              <MotionDiv whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants} style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', borderTop: '1.5px solid #092866', height: '100%' }}>
                {/* Image with zoom on hover */}
                <div style={{ height: 210, position: 'relative', overflow: 'hidden' }}>
                  <motion.div style={{ position: 'absolute', inset: 0 }} variants={{ rest: { scale: 1 }, hover: { scale: 1.06, transition: { duration: 0.5, ease: EASE } } }}>
                    <Image fill style={{ objectFit: 'cover' }} src={img} alt={title} />
                  </motion.div>
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <h3 style={{ fontFamily: HEADING, color: '#092866', fontSize: 20, fontWeight: 300, letterSpacing: '0.03em', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.75, marginBottom: 18 }}>{desc}</p>
                </div>
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

// ─── Core Values ───────────────────────────────────────────────────────────────
const coreValues = [
  { title: 'Opportunity', desc: 'We create pathways for athletes to build businesses, support causes, invest, mentor, and unlock new possibilities beyond competition.' },
  { title: 'Connection', desc: 'We believe that meaningful relationships are the foundation of meaningful outcomes. Every introduction is made with intention.' },
  { title: 'Integrity', desc: 'We hold ourselves to the same standard we expect of our members. Trust is earned through consistency, not promise.' },
  { title: 'Legacy', desc: 'We build for what endures. Every decision is made with the long game in mind — for athletes, their families, and the communities they serve.' },
  { title: 'Resilience', desc: 'The athletes we serve have faced adversity and kept going. We carry that same conviction in everything we build.' },
];

function CoreValues() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (idx: number) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => go((current - 1 + coreValues.length) % coreValues.length);
  const next = () => go((current + 1) % coreValues.length);

  return (
    <section style={{ backgroundColor: '#092866' }} className="py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left */}
          <SlideInLeft>
            <div>
              <SectionLabel>Core Values</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 24 }}>What We Stand For</h2>
              {/* All values listed as nav */}
              <StaggerGrid style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {coreValues.map((v, i) => (
                  <StaggerItem key={v.title}>
                    <motion.button
                      onClick={() => go(i)}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: BODY,
                        fontSize: 14,
                        fontWeight: i === current ? 600 : 300,
                        color: i === current ? '#52aafc' : 'rgba(255,255,255,0.45)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        padding: '4px 0',
                        letterSpacing: '0.04em',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      {i === current && (
                        <motion.span layoutId="value-dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#52aafc', display: 'inline-block', flexShrink: 0 }} />
                      )}
                      {i !== current && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'transparent', display: 'inline-block', flexShrink: 0 }} />}
                      {v.title}
                    </motion.button>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          </SlideInLeft>

          {/* Right — animated card */}
          <div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={current}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '1.5px solid rgba(82,170,252,0.6)', borderRadius: 4, padding: '36px 40px', minHeight: 200 }}
                >
                  <p style={{ fontFamily: HEADING, color: 'rgba(82,170,252,0.35)', fontSize: 11, letterSpacing: '0.22em', fontWeight: 300, marginBottom: 12, textTransform: 'uppercase' }}>
                    {String(current + 1).padStart(2, '0')} / {coreValues.length}
                  </p>
                  <h3 style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 24, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 16 }}>{coreValues[current].title}</h3>
                  <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 300, lineHeight: 1.85 }}>{coreValues[current].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                {coreValues.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to value ${i + 1}`}
                    animate={{ width: i === current ? 22 : 8, backgroundColor: i === current ? '#52aafc' : 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.3 }}
                    style={{ height: 8, borderRadius: 9999, border: 'none', cursor: 'pointer', padding: 0 }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <motion.button onClick={prev} aria-label="Previous" whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,255,255,0.15)' }} whileTap={{ scale: 0.93 }} style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>‹</motion.button>
                <motion.button onClick={next} aria-label="Next" whileHover={{ scale: 1.12, backgroundColor: '#3d9ef5' }} whileTap={{ scale: 0.93 }} style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#52aafc', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>›</motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Waitlist Section ──────────────────────────────────────────────────────────
function WaitlistSection() {
  return (
    <section id="waitlist" style={{ backgroundColor: '#F4F8FF', position: 'relative', overflow: 'hidden' }} className="py-20 md:py-32">
      <div className="max-w-xl mx-auto px-6" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <FadeUp>
          <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 20 }}>
            Be the First to Know.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.8, marginBottom: 36 }}>
            Athletes Elevated is opening its doors. Join the waitlist for early access to athlete storefronts, the Heroes Docuseries, exclusive drops, and community events — before anyone else.
          </p>
        </FadeUp>
        <ScaleIn delay={0.25}>
          <WaitlistForm />
          <p style={{ fontFamily: BODY, color: 'rgba(9,40,102,0.35)', fontSize: 12, fontWeight: 300, marginTop: 14, letterSpacing: '0.04em' }}>
            No spam. Early access only.
          </p>
        </ScaleIn>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '0px' }}>
        <Hero />
        <MissionVision />
        <ImpactBanner />
        <ThePlatform />
        <CoreValues />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}