'use client';

// Place this file at: app/about/page.tsx

import { useState, useRef, ReactNode } from 'react';
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import Link from 'next/link';
import { motion, useInView, type Variants } from 'framer-motion';
 
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
 
function ImagePlaceholder({ label = 'Image coming soon' }: { label?: string }) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: '#1A2540', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontFamily: BODY, fontSize: 12, userSelect: 'none' as const, minHeight: 'inherit' }}>
      {label}
    </div>
  );
}
 
// ─── Section: Hero ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{ backgroundColor: NAVY_HERO, minHeight: '72vh', position: 'relative', overflow: 'hidden' }}
      className="flex items-end md:items-center pb-16 pt-28 md:py-0"
    >
      {/*
        Replace ImagePlaceholder with:
        <Image fill style={{ objectFit: 'cover', objectPosition: 'right center' }} src="/images/about-hero.jpg" alt="About hero" priority />
      */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ImagePlaceholder label="About hero image" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}CC 40%, ${NAVY_HERO}66 70%, transparent 100%)` }} />
        {/* Bottom fade into mission section */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to bottom, transparent, ${NAVY_HERO})` }} />
      </div>
 
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '580px' }}>
          {/* "ABOUT" label */}
          <HeroText delay={0}>
            <p style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 11, letterSpacing: '0.22em', fontWeight: 300, textTransform: 'uppercase' as const, marginBottom: 16 }}>
              About
            </p>
          </HeroText>
          <HeroText delay={0.15}>
            <h1
              style={{
                fontFamily: HEADING,
                color: '#ffffff',
                fontSize: 'clamp(38px, 6vw, 76px)',
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                marginBottom: 24,
              }}
            >
              Athletes Are More Than Their Sport.
            </h1>
          </HeroText>
          <HeroText delay={0.3}>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, maxWidth: 420 }}>
              Athletes Elevated exists to give them the network, resources, and opportunities to prove it.
            </p>
          </HeroText>
        </div>
      </div>
    </section>
  );
}
 
// ─── Section: Mission / Vision ─────────────────────────────────────────────────
function MissionVision() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
 
          {/* Mission */}
          <SlideInLeft>
            <div style={{ borderLeft: `3px solid #52aafc`, paddingLeft: 28 }}>
              <SectionLabel light>Mission</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>
                Why We Exist
              </h2>
              <p style={{ fontFamily: BODY, color: NAVY, fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, lineHeight: 1.8 }}>
                To empower athletes to transform their performance into purpose and their influence into lasting impact — through connection, opportunity, and storytelling.
              </p>
            </div>
          </SlideInLeft>
 
          {/* Vision */}
          <SlideInRight delay={0.1}>
            <div style={{ borderLeft: `3px solid #52aafc`, paddingLeft: 28 }}>
              <SectionLabel light>Vision</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>
                Where We're Going
              </h2>
              <p style={{ fontFamily: BODY, color: NAVY, fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, lineHeight: 1.8 }}>
                A place where athletes have the network, resources, and opportunities to create meaningful impact during and after their competitive career.
              </p>
            </div>
          </SlideInRight>
 
        </div>
      </div>
    </section>
  );
}
 
// ─── Section: Impact Banner ─────────────────────────────────────────────────────
function ImpactBanner() {
  const words = ['Connection.', 'Opportunity.', 'Storytelling.', 'Impact.'];
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-5">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 md:gap-x-8">
            {words.map((word, i) => (
              <span key={word} className="flex items-center gap-5 md:gap-8">
                <span style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(12px, 2vw, 26px)', fontWeight: 300, letterSpacing: '0.0em', textTransform: 'uppercase' as const }}>
                  {word}
                </span>
                {i < words.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>·</span>
                )}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
 
// ─── Section: The Platform ─────────────────────────────────────────────────────
const pillars = [
  {
    title: 'Connection',
    href: '/connection',
    desc: 'A private network built to create meaningful relationships between athletes, investors, brands, charities, and fans.',
    imgLabel: 'Connection pillar image',
  },
  {
    title: 'Opportunity',
    href: '/opportunity',
    desc: 'The Athletes Elevated Marketplace creates sustainable revenue streams for athletes and authentic partnerships for brands.',
    imgLabel: 'Opportunity pillar image',
  },
  {
    title: 'Storytelling',
    href: '/storytelling',
    desc: 'The Heroes Docuseries tells the stories behind athletic careers — the resilience, adversity, and purpose that define who these athletes are.',
    imgLabel: 'Storytelling pillar image',
  },
];
 
function ThePlatform() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionLabel>The Platform</SectionLabel>
          <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 16 }}>
            An Invite-Only Ecosystem
          </h2>
          <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8, maxWidth: 720, marginBottom: 48 }}>
            Athletes Elevated is an invite-only ecosystem connecting athletes, investors, brands, charities, and fans through opportunity, storytelling, and community. It is built around three core pillars — each one designed to serve athletes beyond the competition.
          </p>
        </FadeUp>
 
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {pillars.map(({ title, href, desc, imgLabel }) => (
            <StaggerItem key={title}>
              <MotionDiv whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)' }}>
                {/* Image */}
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  {/* Replace with: <Image fill style={{ objectFit: 'cover' }} src={`/images/${imgLabel}.jpg`} alt={title} /> */}
                  <ImagePlaceholder label={imgLabel} />
                </div>
 
                {/* Text */}
                <div style={{ padding: '24px 24px 28px' }}>
                  <h3 style={{ fontFamily: HEADING, color: '#092866', fontSize: 20, fontWeight: 300, letterSpacing: '0.03em', marginBottom: 10 }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.75, marginBottom: 18 }}>
                    {desc}
                  </p>
                  <Link href={href} style={{ fontFamily: BODY, color: '#52aafc', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }} className="hover:opacity-75 transition-opacity">
                    Learn More →
                  </Link>
                </div>
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
 
// ─── Section: Core Values Carousel ────────────────────────────────────────────
const coreValues = [
  {
    title: 'Opportunity',
    desc: 'We create pathways for athletes to build businesses, support causes, invest, mentor, and unlock new possibilities beyond competition.',
  },
  {
    title: 'Connection',
    desc: 'We believe that meaningful relationships are the foundation of meaningful outcomes. Every introduction is made with intention.',
  },
  {
    title: 'Integrity',
    desc: 'We hold ourselves to the same standard we expect of our members. Trust is earned through consistency, not promise.',
  },
  {
    title: 'Legacy',
    desc: 'We build for what endures. Every decision is made with the long game in mind — for athletes, their families, and the communities they serve.',
  },
  {
    title: 'Resilience',
    desc: 'The athletes we serve have faced adversity and kept going. We carry that same conviction in everything we build.',
  },
];
 
function CoreValues() {
  const [current, setCurrent] = useState(0);
 
  const prev = () => setCurrent((c) => (c - 1 + coreValues.length) % coreValues.length);
  const next = () => setCurrent((c) => (c + 1) % coreValues.length);
 
  return (
    <section style={{ backgroundColor: '#092866' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
 
          {/* Left — label + heading */}
          <SlideInLeft>
            <div>
              <SectionLabel light>Core Values</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1 }}>
                What We Stand For
              </h2>
            </div>
          </SlideInLeft>
 
          {/* Right — carousel card */}
          <div>
            {/* Card */}
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '32px 36px', minHeight: 180 }}
            >
              <h3 style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 20, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 14 }}>
                {coreValues[current].title}
              </h3>
              <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>
                {coreValues[current].desc}
              </p>
            </motion.div>
 
            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {coreValues.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to value ${i + 1}`}
                    style={{
                      width: i === current ? 22 : 8,
                      height: 8,
                      borderRadius: 9999,
                      backgroundColor: i === current ? BLUE : 'rgba(255,255,255,0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'width 0.3s, background-color 0.2s',
                    }}
                  />
                ))}
              </div>
 
              {/* Prev / Next arrows */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={prev}
                  aria-label="Previous value"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}
                  className="hover:bg-white/20"
                >
                  ‹
                </motion.button>
                <motion.button
                  onClick={next}
                  aria-label="Next value"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: BLUE, border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}
                  className="hover:opacity-90"
                >
                  ›
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
// ─── Section: CTA ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 36 }}>
            Transforming Performance Into Purpose. Influence Into Impact.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              href="/apply"
              style={{ fontFamily: BODY, border: `1.5px solid #52aafc`, background: '#52aafc',color: '#092866', padding: '13px 32px', borderRadius: 6, fontSize: 15, fontWeight: 600, letterSpacing: '0.02em', display: 'inline-block', transition: 'background 0.2s' }}
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
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <MissionVision />
        <ImpactBanner />
        <ThePlatform />
        <CoreValues />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}