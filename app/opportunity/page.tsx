// Place this file at: app/opportunity/page.tsx
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
        <Image fill style={{ objectFit: 'cover', objectPosition: 'top' }} src="/images/AdobeStock_2045098548.png" alt="Opportunity hero" priority />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 40%, ${NAVY_HERO}80 65%, ${NAVY_HERO}33 100%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '540px' }}>
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
              Your Career Was Just the Beginning.
            </h1>
          </HeroText>
          <HeroText delay={0.2}>
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
              Athletes Elevated creates pathways for athletes to build businesses, support charitable initiatives, invest strategically, and unlock new possibilities that only exist on the other side of competition.
            </p>
          </HeroText>
          <HeroText delay={0.35}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/apply"
                style={{
                  fontFamily: BODY,
                  border: '1.5px solid #52aafc',
                  background: '#52aafc',
                  color: '#092866',
                  padding: '13px 28px',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  display: 'inline-block',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                className="hover:border-white hover:bg-white/10"
              >
                Apply for Membership →
              </Link>
            </motion.div>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Stats Banner ─────────────────────────────────────────────────────
function StatsBanner() {
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-6">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <p
            style={{
              fontFamily: BODY,
              color: '#092866',
              fontSize: 'clamp(13px, 4vw, 26px)',
              fontWeight: 1000,
              letterSpacing: '0.0em',
              textTransform: 'uppercase' as const,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            The average professional athletic career ends at 33. The rest of life is where it matters most.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section: Pathways Beyond Competition ──────────────────────────────────────
const pathways = [
  {
    title: 'Build Businesses',
    desc: 'Athletes have the discipline, resilience, and network to build extraordinary companies. We provide the connections, capital introductions, and mentorship to help them do exactly that.',
    img: '/images/Team.jpeg',
  },
  {
    title: 'Support Causes',
    desc: 'Athletes carry influence. We help them direct that influence toward charitable initiatives and community organizations aligned with what they genuinely believe in.',
    img: '/images/basketball-team.jpg',
  },
  {
    title: 'Invest Strategically',
    desc: "From early-stage startups to established brands, the network surfaces investment opportunities that match an athlete's goals, values, and risk profile.",
    img: '/images/AdobeStock_802902722.jpeg',
  },
  {
    title: 'Mentor & Lead',
    desc: "Some of the most meaningful opportunities aren't financial — they're human. Athletes who mentor the next generation create ripple effects that outlast any competition result.",
    img: '/images/AdobeStock_504801118-scaled.jpeg',
  },
];

function PathwaysSection() {
  return (
    <section style={{ backgroundColor: 'white', position: 'relative', overflow: 'hidden' }} className="py-16 md:py-24">
      {/* Subtle background image behind the whole section */}
      <div className="absolute inset-0" style={{ zIndex: 0, opacity: 0.15 }}>
        <Image fill style={{ objectFit: 'cover' }} src="/images/pathways-bg.png" alt="" />
      </div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="mb-12">
          <FadeUp>
            <SectionLabel light>What We Create</SectionLabel>
            <h2
              style={{
                fontFamily: HEADING,
                color: '#092866',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 16,
              }}
            >
              Pathways Beyond Competition
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              style={{
                fontFamily: BODY,
                color: NAVY,
                fontSize: 'clamp(15px, 2vw, 16px)',
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 680,
              }}
            >
              We don't just connect athletes to opportunity — we help them see what's possible and give them the resources to pursue it with the same conviction they brought to their sport.
            </p>
          </FadeUp>
        </div>

        {/* 2×2 pathway cards */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pathways.map(({ title, desc, img }) => (
            <StaggerItem key={title}>
              <MotionDiv
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={cardHoverVariants}
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}
                className="flex flex-col sm:flex-row overflow-hidden"
              >
                {/* Thumbnail image */}
                <div className="sm:w-36 sm:flex-shrink-0 min-h-[160px] sm:min-h-0 relative overflow-hidden">
                  <Image fill style={{ objectFit: 'cover' }} src={img} alt={title} />
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3
                    style={{
                      fontFamily: HEADING,
                      color: NAVY,
                      fontSize: 18,
                      fontWeight: 300,
                      letterSpacing: '0.04em',
                      marginBottom: 10,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: BODY,
                      color: NAVY,
                      fontSize: 14,
                      fontWeight: 300,
                      lineHeight: 1.75,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

// ─── Section: Marketplace ──────────────────────────────────────────────────────
const marketplaceFeatures = [
  {
    title: 'Athlete Storefront',
    desc: 'Each athlete member can showcase and sell products through a curated personal storefront — extending their brand beyond sport.',
    highlight: false,
  },
  {
    title: 'Brand Partnerships',
    desc: 'Brands gain access to authentic athlete relationships, not transactional endorsements. Partnerships are matched to values, not follower counts.',
    highlight: true,
  },
  {
    title: 'Commission Revenue',
    desc: 'Athletes earn commissions from every purchase in their storefront, building a sustainable income stream that compounds over time.',
    highlight: false,
  },
  {
    title: 'Fan Participation',
    desc: 'Fans are not spectators here. They participate, support, and are rewarded for their loyalty — creating a community built on reciprocity.',
    highlight: false,
  },
];

function MarketplaceSection() {
  return (
    <section style={{ backgroundColor: '#092866' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Left — heading + description + CTA */}
          <SlideInLeft>
            <div className="flex flex-col justify-center">
              <SectionLabel>The Marketplace</SectionLabel>
              <h2
                style={{
                  fontFamily: HEADING,
                  color: "#ffffff",
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  marginBottom: 24,
                }}
              >
                Built to Create Revenue For Athletes.
              </h2>
              <p
                style={{
                  fontFamily: BODY,
                  color: '#ffffff',
                  fontSize: 'clamp(15px, 2vw, 16px)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  marginBottom: 36,
                }}
              >
                Through the Athletes Elevated Marketplace, athletes and brands can showcase products, earn commissions, engage fans, and build sustainable revenue streams — while rewarding supporters for their participation.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link
                  href="https://athleteselevatedmarketplace.com/"
                  style={{
                    fontFamily: BODY,
                    background: '#52aafc',
                    border: `1.5px solid #52aafc`,
                    color: NAVY,
                    padding: '13px 28px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    display: 'inline-block',
                    transition: 'background 0.2s',
                  }}
                  className="hover:bg-black/5 w-full sm:w-auto text-center sm:text-left"
                >
                  Join the Marketplace →
                </Link>
              </motion.div>
            </div>
          </SlideInLeft>

          {/* Right — feature list */}
          <SlideInRight delay={0.15}>
            <div>
              <h3
                style={{
                  fontFamily: HEADING,
                  color: '#ffffff',
                  fontSize: 28,
                  fontWeight: 300,
                  letterSpacing: '0.14em',
                  marginBottom: 20,
                }}
              >
                Marketplace Features
              </h3>

              <div className="flex flex-col gap-3">
                {marketplaceFeatures.map(({ title, desc, highlight }) => (
                  <MotionDiv
                    key={title}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={cardHoverVariants}
                    style={{
                      backgroundColor: highlight ? BLUE : '#F4F8FF',
                      borderRadius: 8,
                      padding: '20px 22px',
                      border: highlight ? 'none' : '1px solid rgba(26,110,240,0.08)',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: HEADING,
                        color: highlight ? '#ffffff' : BLUE,
                        fontSize: 18,
                        fontWeight: 300,
                        letterSpacing: '0.03em',
                        marginBottom: 8,
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      style={{
                        fontFamily: BODY,
                        color: highlight ? 'rgba(255,255,255,0.85)' : '#4A5568',
                        fontSize: 14,
                        fontWeight: 300,
                        lineHeight: 1.7,
                      }}
                    >
                      {desc}
                    </p>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </SlideInRight>
        </div>
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
            The Opportunity Doesn't Wait.
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
            Membership is by invitation only. If you've been referred, we'd like to hear from you.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
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
              Apply for Membership →
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function OpportunityPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <StatsBanner />
        <PathwaysSection />
        <MarketplaceSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}