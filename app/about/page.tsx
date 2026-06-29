'use client';

import { useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
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
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 3px 0 0 rgba(82,170,252,0)' },
  hover: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 3px 0 0 rgba(82,170,252,1)', transition: { duration: 0.2, ease: 'easeOut' } },
};

const MotionDiv = motion.div;

const NAVY      = '#080F1C';
const NAVY_HERO = '#0B1220';
const BLUE      = '#1A6EF0';
const BLUE_LIGHT = '#4E9AF5';
const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 12, letterSpacing: '0.28em', fontWeight: 600, textTransform: 'uppercase' as const, borderLeft: '1.5px solid #52aafc', paddingLeft: 10, display: 'inline-block' }}>
        {children}
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }} className="flex items-end md:items-center pb-16 pt-28 md:py-0 min-h-[55vh] md:min-h-[80vh]">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', objectPosition: 'right center' }} src="/images/AdobeStock_848348603.jpeg" alt="About hero" priority />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}CC 40%, ${NAVY_HERO}66 70%, transparent 100%)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to bottom, transparent, ${NAVY_HERO})` }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '580px' }}>
          <HeroText delay={0}>
            <p style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 11, letterSpacing: '0.28em', fontWeight: 300, textTransform: 'uppercase' as const, marginBottom: 16, borderLeft: '1.5px solid #52aafc', paddingLeft: 10, display: 'inline-block' }}>About</p>
          </HeroText>
          <HeroText delay={0.15}>
            <h1 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(38px, 6vw, 76px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 24 }}>
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

function MissionVision() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <SlideInLeft>
            <div style={{ borderLeft: `3px solid #52aafc`, paddingLeft: 28 }}>
              <SectionLabel>Mission</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>Why We Exist</h2>
              <p style={{ fontFamily: BODY, color: NAVY, fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, lineHeight: 1.8 }}>
                To empower athletes to transform their performance into purpose and their influence into lasting impact — through connection, opportunity, and storytelling.
              </p>
            </div>
          </SlideInLeft>
          <SlideInRight delay={0.1}>
            <div style={{ borderLeft: `3px solid #52aafc`, paddingLeft: 28 }}>
              <SectionLabel>Vision</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>Where We're Going</h2>
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

function ImpactBanner() {
  const words = ['Connection.', 'Opportunity.', 'Storytelling.', 'Impact.'];
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-5">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{ flex: 1, maxWidth: 64, height: '0.5px', background: 'rgba(9,40,102,0.25)' }} />
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 md:gap-x-8">
              {words.map((word, i) => (
                <span key={word} className="flex items-center gap-5 md:gap-8">
                  <span style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(11px, 2vw, 22px)', fontWeight: 300, letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>
                    {word}
                  </span>
                  {i < words.length - 1 && <span style={{ color: 'rgba(9,40,102,0.2)', fontSize: 14 }}></span>}
                </span>
              ))}
            </div>
            <div style={{ flex: 1, maxWidth: 64, height: '0.5px', background: 'rgba(9,40,102,0.25)' }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const pillars = [
  { title: 'Connection', href: '/connection', desc: 'A private network built to create meaningful relationships between athletes, investors, brands, charities, and fans.', img: '/images/AdobeStock_758246697.jpeg' },
  { title: 'Opportunity', href: '/opportunity', desc: 'The Athletes Elevated Marketplace creates sustainable revenue streams for athletes and authentic partnerships for brands.', img: '/images/cvg-sponsorship-mosaic2-01.png' },
  { title: 'Storytelling', href: '/storytelling', desc: 'The Heroes Docuseries tells the stories behind athletic careers — the resilience, adversity, and purpose that define who these athletes are.', img: '/images/AdobeStock_1275667575.jpeg' },
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
          {pillars.map(({ title, href, desc, img }) => (
            <StaggerItem key={title}>
              <MotionDiv whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants} style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', borderTop: '1.5px solid #092866' }}>
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  <Image fill style={{ objectFit: 'cover' }} src={img} alt={title} />
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <h3 style={{ fontFamily: HEADING, color: '#092866', fontSize: 20, fontWeight: 300, letterSpacing: '0.03em', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.75, marginBottom: 18 }}>{desc}</p>
                  <Link href={href} style={{ fontFamily: BODY, color: '#092866', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', borderBottom: '1px solid rgba(9,40,102,0.35)', paddingBottom: 2, display: 'inline-block' }} className="hover:opacity-60 transition-opacity">
                    Learn More
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

const coreValues = [
  { title: 'Opportunity', desc: 'We create pathways for athletes to build businesses, support causes, invest, mentor, and unlock new possibilities beyond competition.' },
  { title: 'Connection', desc: 'We believe that meaningful relationships are the foundation of meaningful outcomes. Every introduction is made with intention.' },
  { title: 'Integrity', desc: 'We hold ourselves to the same standard we expect of our members. Trust is earned through consistency, not promise.' },
  { title: 'Legacy', desc: 'We build for what endures. Every decision is made with the long game in mind — for athletes, their families, and the communities they serve.' },
  { title: 'Resilience', desc: 'The athletes we serve have faced adversity and kept going. We carry that same conviction in everything we build.' },
];

function CoreValues() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + coreValues.length) % coreValues.length);
  const next = () => setCurrent((c) => (c + 1) % coreValues.length);

  return (
    <section style={{ backgroundColor: '#092866' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <SlideInLeft>
            <div>
              <SectionLabel light>Core Values</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1 }}>What We Stand For</h2>
            </div>
          </SlideInLeft>
          <div>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '1.5px solid rgba(82,170,252,0.6)', borderRadius: 4, padding: '32px 36px', minHeight: 180 }}
            >
              <h3 style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 20, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 14 }}>{coreValues[current].title}</h3>
              <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>{coreValues[current].desc}</p>
            </motion.div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                {coreValues.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to value ${i + 1}`} style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 9999, backgroundColor: i === current ? '#52aafc' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s, background-color 0.2s' }} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <motion.button onClick={prev} aria-label="Previous value" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} className="hover:bg-white/20">‹</motion.button>
                <motion.button onClick={next} aria-label="Next value" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#52aafc', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} className="hover:opacity-90">›</motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          <motion.div whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link href="/apply" style={{ fontFamily: BODY, border: `1.5px solid #092866`, background: 'transparent', color: '#092866', padding: '13px 32px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block' }} className="hover:opacity-70 transition-opacity">
              Apply for Membership →
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

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