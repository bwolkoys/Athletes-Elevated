'use client';

import Navbar from './src/components/navBar';
import Footer from './src/components/footer';
import Image from 'next/image';
import Link from 'next/link';
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

const NAVY      = '#092866';
const NAVY_HERO = '#080F1C';
const BLUE      = '#52aafc';
const BLUE_LIGHT = '#52aafc';
const CARD_BG   = '#EBF2FF';

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        style={{
          fontFamily: 'var(--font-label)',
          color: light ? '#52aafc' : BLUE_LIGHT,
          fontSize: '14px',
          letterSpacing: '0.18em',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
    </div>
  );
}

function ExploreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
      <Link
        href={href}
        style={{
          fontFamily: 'var(--font-body)',
          color: BLUE,
          fontSize: '14px',
          fontWeight: 900,
          letterSpacing: '0.02em',
        }}
        className="hover:opacity-75 transition-opacity"
      >
        {children} →
      </Link>
    </motion.div>
  );
}

function ImagePlaceholder({ label = 'Image coming soon' }: { label?: string }) {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: '#1A2540',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.2)',
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        letterSpacing: '0.05em',
        userSelect: 'none',
        minHeight: 'inherit',
      }}
    >
      {label}
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }}
      className="flex items-center py-24 md:py-0 min-h-[55vh] md:min-h-[80vh]"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          src="/images/AdobeStock_2064460536.jpeg"
          alt="Hero"
          priority
        />
        {/* Mobile: heavy overlay */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: `linear-gradient(to bottom, ${NAVY_HERO}D9 0%, ${NAVY_HERO}BF 100%)` }}
        />
        {/* Desktop: left-fade so text stays readable */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}D9 20%, ${NAVY_HERO}80 50%, transparent 80%)` }}
        />
      </div>

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '660px' }}>
          <HeroText delay={0}>
            <SectionLabel light>An Invite-Only Ecosystem</SectionLabel>
          </HeroText>

          <HeroText delay={0.15}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#ffffff',
                fontSize: 'clamp(40px, 5vw, 80px)',
                fontWeight: 300,
                lineHeight: '1.0',
                letterSpacing: '0.01em',
                marginTop: '16px',
                marginBottom: '24px',
              }}
            >
              Transforming<br />Performance<br />Into Purpose.
            </h1>
          </HeroText>

          <HeroText delay={0.3}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 'clamp(15px, 2vw, 16px)',
                fontWeight: 300,
                lineHeight: '1.75',
                marginBottom: '40px',
                maxWidth: '420px',
              }}
            >
              Athletes Elevated connects athletes, investors, brands, charities,
              and fans through connection, opportunity, and storytelling.
            </p>
          </HeroText>

          <HeroText delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/apply"
                  style={{
                    fontFamily: 'var(--font-body)',
                    border: '1.5px solid #52aafc',
                    backgroundColor: '#52aafc',
                    color: '#ffffff',
                    padding: '13px 26px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    textAlign: 'center',
                    transition: 'border-color 0.2s, background 0.2s',
                    display: 'block',
                  }}
                  className="hover:border-white hover:bg-white/10"
                >
                  Apply for Membership →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#what-we-are"
                  style={{
                    fontFamily: 'var(--font-body)',
                    border: '1.5px solid #52aafc',
                    color: 'rgba(255,255,255,0.75)',
                    padding: '13px 26px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    textAlign: 'center',
                    transition: 'border-color 0.2s',
                    display: 'block',
                  }}
                  className="hover:border-white/60 hover:text-white"
                >
                  Learn More ↓
                </a>
              </motion.div>
            </div>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

// ─── What We Are ───────────────────────────────────────────────────────────────
function WhatWeAre() {
  return (
    <section id="what-we-are" style={{ backgroundColor: '#ffffff' }} className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionLabel>What We Are</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: NAVY,
              fontSize: 'clamp(26px, 3vw, 44px)',
              fontWeight: 300,
              lineHeight: '1.15',
              letterSpacing: '0.01em',
              marginBottom: '20px',
              maxWidth: '2000px',
            }}
          >
            Built Around Athletes. Built for What Comes Next.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#4A5568',
              fontSize: 'clamp(15px, 1.5vw, 16px)',
              fontWeight: 300,
              lineHeight: '1.75',
              maxWidth: '1000px',
            }}
          >
            Athletes Elevated is an invite-only ecosystem designed to unlock opportunities beyond
            competition. We bring together the right people, create meaningful revenue streams, and
            tell the stories that inspire future generations.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Connection ────────────────────────────────────────────────────────────────
function ConnectionSection() {
  return (
    <section style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="min-h-[280px] md:min-h-[440px] relative overflow-hidden">
          <Image fill style={{ objectFit: 'cover' }} src="/images/AdobeStock_758246697.jpeg" alt="Connection" />
        </div>
        <MotionDiv
          whileHover="hover"
          initial="rest"
          animate="rest"
          variants={cardHoverVariants}
          style={{ backgroundColor: CARD_BG }}
          className="px-6 py-12 md:px-12 md:py-16 flex flex-col justify-center"
        >
          <SlideInLeft>
            <SectionLabel>Connection</SectionLabel>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                color: NAVY,
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                fontWeight: 300,
                lineHeight: '1.15',
                letterSpacing: '0.01em',
                marginBottom: '16px',
              }}
            >
              The Right People. The Right Room.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#4A5568',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: '1.75',
                marginBottom: '28px',
              }}
            >
              A private network bringing together athletes, investors, brands, charities,
              mentors, and fans — built to create meaningful outcomes through meaningful
              relationships.
            </p>
            <ExploreLink href="/connection">Explore Connection</ExploreLink>
          </SlideInLeft>
        </MotionDiv>
      </div>
    </section>
  );
}

// ─── Opportunity ───────────────────────────────────────────────────────────────
function OpportunitySection() {
  return (
    <section style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="order-1 md:order-2 min-h-[280px] md:min-h-[440px] relative overflow-hidden">
          <Image fill style={{ objectFit: 'cover' }} src="/images/AdobeStock_618947628.jpeg" alt="Opportunity" />
        </div>
        <MotionDiv
          whileHover="hover"
          initial="rest"
          animate="rest"
          variants={cardHoverVariants}
          style={{ backgroundColor: CARD_BG }}
          className="order-2 md:order-1 px-6 py-12 md:px-12 md:py-16 flex flex-col justify-center"
        >
          <SlideInRight>
            <SectionLabel>Opportunity</SectionLabel>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                color: NAVY,
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                fontWeight: 300,
                lineHeight: '1.15',
                letterSpacing: '0.01em',
                marginBottom: '16px',
              }}
            >
              Your Career Was Just the Beginning.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#4A5568',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: '1.75',
                marginBottom: '28px',
              }}
            >
              Through the Athletes Elevated Marketplace, athletes and brands showcase products,
              earn commissions, engage fans, and build sustainable revenue — rewarding everyone
              who participates.
            </p>
            <ExploreLink href="/opportunity">Explore Opportunity</ExploreLink>
          </SlideInRight>
        </MotionDiv>
      </div>
    </section>
  );
}

// ─── Storytelling ──────────────────────────────────────────────────────────────
function StorytellingSection() {
  return (
    <section style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="min-h-[280px] md:min-h-[440px] relative overflow-hidden">
          <Image fill style={{ objectFit: 'cover' }} src="/images/AdobeStock_1275667575.jpeg" alt="Storytelling" />
        </div>
        <MotionDiv
          whileHover="hover"
          initial="rest"
          animate="rest"
          variants={cardHoverVariants}
          style={{ backgroundColor: CARD_BG }}
          className="px-6 py-12 md:px-12 md:py-16 flex flex-col justify-center"
        >
          <SlideInLeft>
            <SectionLabel>Storytelling</SectionLabel>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                color: NAVY,
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                fontWeight: 300,
                lineHeight: '1.15',
                letterSpacing: '0.01em',
                marginBottom: '16px',
              }}
            >
              Every Athlete Has a Story Worth Telling.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#4A5568',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: '1.75',
                marginBottom: '28px',
              }}
            >
              Through the Heroes Docuseries, athletes share the resilience, adversity, and
              purpose behind their success — inspiring future generations to see that character
              is what makes a hero.
            </p>
            <ExploreLink href="/storytelling">Explore Storytelling</ExploreLink>
          </SlideInLeft>
        </MotionDiv>
      </div>
    </section>
  );
}

// ─── Impact Banner ─────────────────────────────────────────────────────────────
function ImpactBanner() {
  const words = ['Connection.', 'Opportunity.', 'Storytelling.', 'Impact.'];
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-7 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 md:gap-x-8">
            {words.map((word, i) => (
              <span key={word} className="flex items-center gap-1 md:gap-1">
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#092866',
                    fontSize: 'clamp(13px, 3.5vw, 26px)',
                    fontWeight: 300,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                  }}
                >
                  {word}
                </span>
                {i < words.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '18px', lineHeight: 1 }}></span>
                )}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Membership ────────────────────────────────────────────────────────────────
function MembershipSection() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <SlideInLeft>
            <div>
              <SectionLabel>Membership</SectionLabel>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: NAVY,
                  fontSize: 'clamp(28px, 3vw, 50px)',
                  fontWeight: 300,
                  lineHeight: '1.1',
                  letterSpacing: '0.01em',
                  marginBottom: '32px',
                }}
              >
                Membership Is Not Discovered. It Is Earned.
              </h2>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link
                  href="/apply"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: '#52aafc',
                    border: '1.5px solid #52aafc',
                    color: NAVY,
                    padding: '13px 26px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    display: 'inline-block',
                    transition: 'background 0.2s',
                  }}
                  className="hover:bg-black/5 w-full sm:w-auto text-center sm:text-left"
                >
                  Apply for Membership →
                </Link>
              </motion.div>
            </div>
          </SlideInLeft>
          <SlideInRight>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#4A5568',
                  fontSize: 'clamp(15px, 2vw, 16px)',
                  fontWeight: 300,
                  lineHeight: '1.8',
                }}
              >
                Athletes Elevated is invite-only. Every member joins through a trusted referral.
                Every connection is made with intention. This is not a platform you stumble
                upon — it is one you are welcomed into.
              </p>
            </div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <WhatWeAre />
        <ConnectionSection />
        <OpportunitySection />
        <StorytellingSection />
        <ImpactBanner />
        <MembershipSection />
      </main>
      <Footer />
    </>
  );
}