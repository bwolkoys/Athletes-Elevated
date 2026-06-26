// Place this file at: app/storytelling/page.tsx
'use client';

import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: EASE, delay }} className={className} style={style}>{children}</motion.div>;
}

function FadeIn({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay }} className={className} style={style}>{children}</motion.div>;
}

function SlideInLeft({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, ease: EASE, delay }} className={className} style={style}>{children}</motion.div>;
}

function SlideInRight({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, ease: EASE, delay }} className={className} style={style}>{children}</motion.div>;
}

function ScaleIn({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, ease: EASE, delay }} className={className} style={style}>{children}</motion.div>;
}

function StaggerGrid({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className={className} style={style}>{children}</motion.div>;
}

function StaggerItem({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <motion.div variants={{ hidden: { opacity: 0, y: 28, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } } }} className={className} style={style}>{children}</motion.div>;
}

function HeroText({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay }} className={className} style={style}>{children}</motion.div>;
}

const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  hover: { y: -6, boxShadow: '0 16px 40px rgba(26,110,240,0.15)', transition: { duration: 0.25, ease: 'easeOut' } },
};

const MotionDiv = motion.div;

// ─── Color tokens ─────────────────────────────────────────────────────────────
const NAVY       = '#080F1C';
const NAVY_HERO  = '#0B1220';
const BLUE       = '#1A6EF0';
const BLUE_MID   = '#1559C7';
const BLUE_LIGHT = '#4E9AF5';

// ─── Font shorthands ──────────────────────────────────────────────────────────
const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";

// ─── Reusable ─────────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ fontFamily: HEADING, color: light ? '#52aafc' : BLUE_LIGHT, fontSize: 15, letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase' as const }}>
        {children}
      </span>
    </div>
  );
}

// ─── Section: Hero ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }}
      className="flex items-center py-24 md:py-0 min-h-[55vh] md:min-h-[80vh]"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', objectPosition: 'right center' }} src="/images/AdobeStock_1894201700.png" alt="Storytelling hero" priority />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 40%, ${NAVY_HERO}80 65%, ${NAVY_HERO}26 100%)` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '560px' }}>
          <HeroText delay={0}>
            <h1
              style={{
                fontFamily: HEADING,
                color: '#ffffff',
                fontSize: 'clamp(40px, 5vw, 80px)',
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                marginBottom: 24,
              }}
            >
              Every Athlete Has a Story Worth Telling.
            </h1>
          </HeroText>
          <HeroText delay={0.3}>
            <p
              style={{
                fontFamily: BODY,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 'clamp(15px, 2vw, 17px)',
                fontWeight: 300,
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 460,
              }}
            >
              Through the Heroes Docuseries, athletes share the resilience, adversity, and purpose that define their journeys — not to relive the past, but to inspire what comes next.
            </p>
          </HeroText>
          <HeroText delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/apply"
                  style={{ fontFamily: BODY, border: '1.5px solid #52aafc', background: '#52aafc', color: '#092866', padding: '13px 28px', borderRadius: 6, fontSize: 14, fontWeight: 600, letterSpacing: '0.02em', textAlign: 'center', transition: 'border-color 0.2s, background 0.2s', display: 'block' }}
                  className="hover:border-white hover:bg-white/10"
                >
                  Request an Invitation →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#the-series"
                  style={{ fontFamily: BODY, border: '1.5px solid #52aafc', color: 'rgba(255,255,255,0.75)', padding: '13px 28px', borderRadius: 6, fontSize: 14, fontWeight: 400, letterSpacing: '0.02em', textAlign: 'center', transition: 'border-color 0.2s', display: 'block' }}
                  className="hover:border-white/60 hover:text-white"
                >
                  The Heroes Series ↓
                </a>
              </motion.div>
            </div>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Scrolling Ticker ─────────────────────────────────────────────────
function Ticker() {
  const words = ['Resilience', 'Adversity', 'Purpose', 'Impact', 'Courage', 'Character', 'Perseverance', 'Legacy'];
  const repeated = [...words, ...words, ...words];

  return (
    <FadeIn>
      <section style={{ backgroundColor: '#52aafc', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }} className="py-6">
        <style>{`
          @keyframes ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker-scroll 22s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="ticker-track">
          {repeated.map((word, i) => (
            <span key={i} className="flex items-center">
              <span
                style={{
                  fontFamily: HEADING,
                  color: '#092866',
                  fontSize: 28,
                  fontWeight: 300,
                  letterSpacing: '0.0em',
                  textTransform: 'uppercase' as const,
                  whiteSpace: 'nowrap',
                  padding: '0 24px',
                }}
              >
                {word}
              </span>
              <span style={{ color: BLUE_LIGHT, fontSize: 10 }}>·</span>
            </span>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}

// ─── Section: Heroes Docuseries ────────────────────────────────────────────────
function DocuseriesSection() {
  return (
    <section id="the-series" style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <FadeUp>
          <div className="max-w-3xl mb-12">
            <SectionLabel>The Movie</SectionLabel>
            <h2
              style={{
                fontFamily: HEADING,
                color: '#092866',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 20,
              }}
            >
              Heroes Documentary
            </h2>
            <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8, marginBottom: 12 }}>
              Heroes is the storytelling arm of Athletes Elevated — a documentary series that goes behind the medal, the contract, and the headline to find what actually made these athletes who they are.
            </p>
            <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8 }}>
              Each episode is built around a single athlete, a single truth, and the belief that courage, character, and perseverance — not just talent — are what make someone a hero.
            </p>
          </div>
        </FadeUp>

        {/* Video player placeholder */}
        <ScaleIn delay={0.15}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 960, borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9', backgroundColor: '#0B1220' }} className="mx-auto">
            <Image fill style={{ objectFit: 'cover' }} src="/images/pic.jpeg" alt="Heroes Documentary" />

            {/* Play button overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(8,15,28,0.35)' }}
            >
              <a href="https://drive.google.com/file/d/1CdeePbYiqLYS0w-O5x4cq5EzUKpUE4bg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(8,15,28,0.35)' }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '2px solid rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '20px solid rgba(255,255,255,0.9)', marginLeft: 4 }} />
              </div>
              </a>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}

// ─── Section: Quote ────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }} className="py-16 md:py-16">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 55 }} src="/images/maxresdefault.jpg" alt="" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,15,28,0.8)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <div
            style={{
              fontFamily: HEADING,
              color: BLUE,
              fontSize: 'clamp(64px, 10vw, 110px)',
              lineHeight: 0.75,
              fontWeight: 900,
              marginBottom: 2,
              userSelect: 'none' as const,
            }}
            aria-hidden="true"
          >
            "
          </div>
        </FadeIn>
        <blockquote>
          <FadeUp delay={0.25}>
            <p
              style={{
                fontFamily: HEADING,
                color: '#ffffff',
                fontSize: 'clamp(18px, 3vw, 34px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
              }}
            >
              The series exists to inspire future generations by showing that what truly makes someone a hero is not the result — it is the decision to keep going when the result was uncertain.
            </p>
          </FadeUp>
        </blockquote>
      </div>
    </section>
  );
}

// ─── Section: Why It Matters ───────────────────────────────────────────────────
const reasons = [
  {
    title: 'For Athletes',
    desc: 'Your story is your most durable asset. Long after the competition ends, the person who overcame — and what they did with it — is what people remember and follow.',
    img: '/images/360_F_781926021_ejEZxJH5oiCtZt0RlVThxUhNRntxxl9o.jpg',
  },
  {
    title: 'For Future Generations',
    desc: "Young athletes don't need highlight reels. They need proof that someone who doubted like them, fell like them — got back up and built something.",
    img: '/images/Connection.png',
  },
  {
    title: 'For the Culture',
    desc: 'Sport shapes culture. The stories of athletes — told honestly and with depth — elevate what we all believe is possible.',
    img: '/images/AdobeStock_1974622747.jpeg',
  },
];

function WhyItMatters() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div>
            <SectionLabel>Why It Matters</SectionLabel>
            <h2
              style={{
                fontFamily: HEADING,
                color: '#092866',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 48,
              }}
            >
              Stories That Outlast Sport
            </h2>
          </div>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map(({ title, desc, img }) => (
            <StaggerItem key={title}>
              <MotionDiv whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                {/* Image */}
                <div style={{ height: 200, borderRadius: 10, overflow: 'hidden', marginBottom: 20, position: 'relative' }}>
                  <Image fill style={{ objectFit: 'cover' }} src={img} alt={title} />
                </div>

                <h3
                  style={{
                    fontFamily: HEADING,
                    color: NAVY,
                    fontSize: 16,
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase' as const,
                    marginBottom: 12,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: BODY,
                    color: '#4A5568',
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.8,
                  }}
                >
                  {desc}
                </p>
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

// ─── Section: CTA ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ backgroundColor: '#F7F9FC' }} className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2
            style={{
              fontFamily: HEADING,
              color: '#092866',
              fontSize: 'clamp(26px, 4vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: 20,
            }}
          >
            Your Story Deserves an Audience.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p
            style={{
              fontFamily: BODY,
              color: '#4A5568',
              fontSize: 'clamp(15px, 2vw, 17px)',
              fontWeight: 300,
              lineHeight: 1.75,
              marginBottom: 40,
            }}
          >
            Athletes Elevated is building something that lasts. If you have a story worth telling, we want to tell it.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              href="/apply"
              style={{
                fontFamily: BODY,
                background: '#52aafc',
                border: `1.5px solid #52aafc`,
                color: '#092866',
                padding: '13px 32px',
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '0.02em',
                display: 'inline-block',
                transition: 'background 0.2s, color 0.2s',
              }}
              className="hover:bg-blue-50"
            >
              Request an Invitation →
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function StorytellingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <Ticker />
        <DocuseriesSection />
        <QuoteSection />
        <WhyItMatters />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}