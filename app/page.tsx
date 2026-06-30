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

// Left border reveal instead of lift
const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 3px 0 0 rgba(82,170,252,0)' },
  hover: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 3px 0 0 rgba(82,170,252,1)', transition: { duration: 0.2, ease: 'easeOut' } },
};

const MotionDiv = motion.div;

const NAVY      = '#092866';
const NAVY_HERO = '#080F1C';
const BLUE      = '#52aafc';
const BLUE_LIGHT = '#52aafc';
const CARD_BG   = '#EBF2FF';

// Left border rule + wider tracking
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        style={{
          fontFamily: 'var(--font-label)',
          color: '#52aafc',
          fontSize: '12px',
          letterSpacing: '0.28em',
          fontWeight: 700,
          textTransform: 'uppercase',
          borderLeft: '1.5px solid #52aafc',
          paddingLeft: '10px',
          display: 'inline-block',
        }}
      >
        {children}
      </span>
    </div>
  );
}

// Uppercase underline explore link
function ExploreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ opacity: 0.65 }} style={{ display: 'inline-block' }}>
      <Link
        href={href}
        style={{
          fontFamily: 'var(--font-body)',
          color: NAVY,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          borderBottom: '1px solid rgba(9,40,102,0.4)',
          paddingBottom: '2px',
          display: 'inline-block',
          transition: 'opacity 0.2s',
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }}
      className="flex items-center py-24 md:py-0 min-h-[55vh] md:min-h-[80vh]"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', objectPosition: 'center' }} src="/images/AdobeStock_2064460536.jpeg" alt="Hero" priority />
        <div className="absolute inset-0 md:hidden" style={{ background: `linear-gradient(to bottom, ${NAVY_HERO}D9 0%, ${NAVY_HERO}BF 100%)` }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}D9 20%, ${NAVY_HERO}80 50%, transparent 80%)` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '660px' }}>
          <HeroText delay={0}><SectionLabel light>An Invite-Only Ecosystem</SectionLabel></HeroText>
          <HeroText delay={0.15}>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 300, lineHeight: '1.0', letterSpacing: '0.01em', marginTop: '16px', marginBottom: '24px' }}>
              Transforming<br />Performance<br />Into Purpose.
            </h1>
          </HeroText>
          <HeroText delay={0.3}>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: '1.75', marginBottom: '40px', maxWidth: '420px' }}>
              Athletes Elevated connects athletes, investors, brands, charities, and fans through connection, opportunity, and storytelling.
            </p>
          </HeroText>
          <HeroText delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/apply" style={{ fontFamily: 'var(--font-body)', border: '1.5px solid #52aafc', backgroundColor: '#52aafc', color: '#ffffff', padding: '13px 26px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em', textAlign: 'center', display: 'block' }} className="hover:border-white hover:bg-white/10 transition-all">
                  Apply for Membership →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a href="#what-we-are" style={{ fontFamily: 'var(--font-body)', border: '1.5px solid #52aafc', color: 'rgba(255,255,255,0.75)', padding: '13px 26px', borderRadius: '4px', fontSize: '14px', fontWeight: 400, letterSpacing: '0.02em', textAlign: 'center', display: 'block' }} className="hover:border-white/60 hover:text-white transition-all">
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
          <h2 style={{ fontFamily: 'var(--font-heading)', color: NAVY, fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 300, lineHeight: '1.15', letterSpacing: '0.01em', marginBottom: '20px', maxWidth: '2000px' }}>
            Built Around Athletes. Built for What Comes Next.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p style={{ fontFamily: 'var(--font-body)', color: '#4A5568', fontSize: 'clamp(15px, 1.5vw, 16px)', fontWeight: 300, lineHeight: '1.75', maxWidth: '1000px' }}>
            Athletes Elevated is an invite-only ecosystem designed to unlock opportunities beyond competition. We bring together the right people, create meaningful revenue streams, and tell the stories that inspire future generations.
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
          whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants}
          style={{ backgroundColor: CARD_BG, borderTop: '1.5px solid #092866' }}
          className="px-6 py-12 md:px-12 md:py-16 flex flex-col justify-center"
        >
          <SlideInLeft>
            <SectionLabel>Connection</SectionLabel>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: NAVY, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 300, lineHeight: '1.15', letterSpacing: '0.01em', marginBottom: '16px' }}>
              The Right People. The Right Room.
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', color: '#4A5568', fontSize: '15px', fontWeight: 300, lineHeight: '1.75', marginBottom: '28px' }}>
              A private network bringing together athletes, investors, brands, charities, mentors, and fans — built to create meaningful outcomes through meaningful relationships.
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
          whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants}
          style={{ backgroundColor: CARD_BG, borderTop: '1.5px solid #092866' }}
          className="order-2 md:order-1 px-6 py-12 md:px-12 md:py-16 flex flex-col justify-center"
        >
          <SlideInRight>
            <SectionLabel>Opportunity</SectionLabel>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: NAVY, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 300, lineHeight: '1.15', letterSpacing: '0.01em', marginBottom: '16px' }}>
              Your Career Was Just the Beginning.
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', color: '#4A5568', fontSize: '15px', fontWeight: 300, lineHeight: '1.75', marginBottom: '28px' }}>
              Through the Athletes Elevated Marketplace, athletes and brands showcase products, earn commissions, engage fans, and build sustainable revenue — rewarding everyone who participates.
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
          whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants}
          style={{ backgroundColor: CARD_BG, borderTop: '1.5px solid #092866' }}
          className="px-6 py-12 md:px-12 md:py-16 flex flex-col justify-center"
        >
          <SlideInLeft>
            <SectionLabel>Storytelling</SectionLabel>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: NAVY, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 300, lineHeight: '1.15', letterSpacing: '0.01em', marginBottom: '16px' }}>
              Every Athlete Has a Story Worth Telling.
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', color: '#4A5568', fontSize: '15px', fontWeight: 300, lineHeight: '1.75', marginBottom: '28px' }}>
              Through the Heroes Docuseries, athletes share the resilience, adversity, and purpose behind their success — inspiring future generations to see that character is what makes a hero.
            </p>
            <ExploreLink href="/storytelling">Explore Storytelling</ExploreLink>
          </SlideInLeft>
        </MotionDiv>
      </div>
    </section>
  );
}

// ─── Marketplace ───────────────────────────────────────────────────────────────
const drops = [
  { name: 'Anton Ferdinand', label: 'Ferdinand Collective', status: 'live' as const },
  { name: 'Next Athlete', label: 'Members only', status: 'soon' as const, date: 'Jul 28' },
  { name: 'Next Athlete', label: 'Members only', status: 'soon' as const, date: 'Aug 18' },
];

function MarketplaceSection() {
  return (
    <section style={{ backgroundColor: '#092866', position: 'relative', overflow: 'hidden' }} className="py-16 md:py-24">
      {/* Subtle radial glow behind the content */}
      <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(82,170,252,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <style>{`
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }
        .live-dot { animation: pulse-dot 1.8s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left — copy */}
          <SlideInLeft>
            <SectionLabel>Marketplace</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: 'clamp(28px, 3vw, 50px)', fontWeight: 300, lineHeight: '1.1', letterSpacing: '0.01em', marginBottom: '20px' }}>
              The Marketplace Is Live.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: '1.8', marginBottom: '12px' }}>
              Athletes curate their own storefront — products they trust, causes they care about. One founding athlete at a time.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: '1.8', marginBottom: '32px' }}>
              Members gaine xclusive access to every drop.
            </p>
            <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start', // keeps them left-aligned
  }}
>
<motion.div whileHover={{ opacity: 0.8 }} style={{ display: 'inline-block' }}>
              <a
                href="/opportunity"
                style={{ fontFamily: 'var(--font-body)', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', padding: '13px 26px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block' }}
              >
                Learn More →
              </a>
            </motion.div>
            <motion.div whileHover={{ opacity: 0.8 }} style={{ display: 'inline-block' }}>
              <a
                href="https://athleteselevatedmarketplace.com/"
                style={{ fontFamily: 'var(--font-body)', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', padding: '13px 26px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block' }}
              >
                Join the Marketplace →
              </a>
            </motion.div>
            </div>
          </SlideInLeft>

          {/* Right — drop list */}
          <SlideInRight delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {drops.map(({ name, label, status, date }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    backgroundColor: status === 'live' ? 'rgba(82,170,252,0.12)' : 'rgba(255,255,255,0.04)',
                    border: status === 'live' ? '1px solid rgba(82,170,252,0.35)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    borderLeft: status === 'live' ? '3px solid #52aafc' : '3px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', color: status === 'live' ? '#ffffff' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', color: status === 'live' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 300 }}>
                      {label}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                    {status === 'live' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', color: '#52aafc', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        <span className="live-dot" style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#52aafc', display: 'inline-block' }} />
                        Live Now
                      </span>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.25)', fontSize: 12, fontWeight: 300, letterSpacing: '0.06em' }}>
                        {date}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
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
    <section style={{ backgroundColor: '#52aafc' }} className="py-7 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{ flex: 1, maxWidth: 64, height: '0.5px', background: 'rgba(9,40,102,0.25)' }} />
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 md:gap-x-8">
              {words.map((word, i) => (
                <span key={word} className="flex items-center gap-1 md:gap-1">
                  <span style={{ fontFamily: 'var(--font-heading)', color: '#092866', fontSize: 'clamp(11px, 3.5vw, 22px)', fontWeight: 300, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    {word}
                  </span>
                  {i < words.length - 1 && <span style={{ color: 'rgba(9,40,102,0.2)', fontSize: '18px', lineHeight: 1 }}></span>}
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

// ─── Membership ────────────────────────────────────────────────────────────────
function MembershipSection() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <SlideInLeft>
            <div>
              <SectionLabel>Membership</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: NAVY, fontSize: 'clamp(28px, 3vw, 50px)', fontWeight: 300, lineHeight: '1.1', letterSpacing: '0.01em', marginBottom: '32px' }}>
                Membership Is Not Discovered. It Is Earned.
              </h2>
              <motion.div whileHover={{ opacity: 0.8 }} style={{ display: 'inline-block' }}>
                <Link
                  href="/apply"
                  style={{ fontFamily: 'var(--font-body)', background: 'transparent', border: '1.5px solid #092866', color: NAVY, padding: '13px 26px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block' }}
                  className="hover:bg-navy/5 w-full sm:w-auto text-center sm:text-left transition-opacity"
                >
                  Apply for Membership →
                </Link>
              </motion.div>
            </div>
          </SlideInLeft>
          <SlideInRight>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: '1.8' }}>
                Athletes Elevated is invite-only. Every member joins through a trusted referral. Every connection is made with intention. This is not a platform you stumble upon — it is one you are welcomed into.
              </p>
            </div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}

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
        <MarketplaceSection />
        <ImpactBanner />
        <MembershipSection />
      </main>
      <Footer />
    </>
  );
}