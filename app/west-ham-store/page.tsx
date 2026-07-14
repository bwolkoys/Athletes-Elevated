// Place this file at: app/west-ham-store/page.tsx
'use client';

import { ReactNode, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: EASE, delay }} style={style}>
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  );
}

// ─── Colors ────────────────────────────────────────────────────────────────────
const DARK = '#0A0A0A';
const BLUE = '#52aafc';
const GOLD = '#F5C500';

// ─── Fonts ─────────────────────────────────────────────────────────────────────
const BEBAS   = "'Bebas Neue', sans-serif";
const BODY    = "'DM Sans', sans-serif";
const HEADING = "'Apotek Extended', sans-serif";

// ─── Tags ──────────────────────────────────────────────────────────────────────
const TAGS = [
  'THE OFFICIAL PLAYER KIT',
  '·',
  'ATHLETE COLLABORATIONS',
  '·',
  'SURPRISE PRODUCT DROPS',
  '·',
  'MEMBER REWARDS',
  '·',
  'COMMUNITY CHALLENGES',
];

// ─── Section 1: Hero ───────────────────────────────────────────────────────────
function HeroSection() {
    return (
      <section style={{ backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
          {/* COYI watermark — aligned with left column text */}
          <div className="whu-coyi" style={{
            position: 'absolute', left: '1.5rem', top: '100%', transform: 'translateY(-50%)',
            fontFamily: BEBAS, fontSize: 'clamp(180px, 30vw, 420px)',
            color: 'transparent', WebkitTextStroke: '6px rgba(0,0,0,0.1)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none', zIndex: 0,
          }}>
            COYI
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
   
            {/* Left — headline */}
            <FadeUp>
              <h1 style={{
                fontFamily: BEBAS, color: BLUE,
                fontSize: 'clamp(64px, 10vw, 140px)',
                lineHeight: 0.9, letterSpacing: '0.02em',
                WebkitTextStroke: '3px',
              }}>
                FORGING THE<br />FUTURE OF<br />SPORT,<br />TOGETHER.
              </h1>
            </FadeUp>
   
            {/* Right — image placeholder + body text */}
            <FadeUp delay={0.15}>
              <div>
                {/* Forge image placeholder */}
                <img
                src="/images/JIM_1390.jpg"
                alt="Forging the future of sport"
                style={{ width: '100%', display: 'block', marginBottom: 32 }}
              />
   
                <p style={{ fontFamily: BODY, color: '#111111', fontSize: 16, lineHeight: 1.8, marginBottom: 20, textAlign: 'right' }}>
                  The Athletes Elevated x West Ham United partnership activates the power of sport to create meaningful opportunities for athletes, fans, and communities.
                </p>
                <p style={{ fontFamily: BODY, color: '#111111', fontSize: 16, lineHeight: 1.8, textAlign: 'right' }}>
                  Members don't simply support the game. They shape its future. You'll access limited-edition merchandise, athlete access and opportunities to turn rewards into meaningful impact.
                </p>
              </div>
            </FadeUp>
   
          </div>
        </div>
      </section>
    );
  }
   

// ─── Section 2: Marketplace ────────────────────────────────────────────────────
function MarketplaceSection() {
  return (
    <section style={{ backgroundColor: DARK }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Labels row */}
        <FadeIn>
          <div className="flex justify-between items-center" style={{ marginBottom: 58 }}>
            <p style={{ fontFamily: BEBAS, color: GOLD, fontSize: 22, letterSpacing: '0.2em', WebkitTextStroke: '1px' }}>
              THE INAUGURAL COLLECTION
            </p>
            <p style={{ fontFamily: BEBAS, color: GOLD, fontSize: 22, letterSpacing: '0.2em', WebkitTextStroke: '1px' }}>
              MARKETPLACE PREVIEW
            </p>
          </div>
        </FadeIn>

        {/* Two-column content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — shirt placeholder */}
          <FadeUp>
            <img
              src="/images/JIM_1226.jpg"
              alt="West Ham United kit"
              style={{ width: '100%', maxWidth: 420, maxHeight: 580, objectFit: 'cover', display: 'block', margin: '0 auto' }}
            />
          </FadeUp>

          {/* Right — "THIS ISN'T A STORE." headline */}
          <FadeUp delay={0.15}>
            <div>
              <h2 className="whu-store-outlined" style={{
                fontFamily: BEBAS,
                color: 'transparent',
                WebkitTextStroke: '4px #52aafc',
                fontSize: 'clamp(56px, 9vw, 120px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                marginBottom: 0,
                textAlign: 'right',
              }}>
                THIS ISN'T<br />A STORE.
              </h2>
              <h2 className="whu-store-solid" style={{
                fontFamily: BEBAS,
                color: BLUE,
                WebkitTextStroke: '4px',
                fontSize: 'clamp(56px, 9vw, 120px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                marginTop: 12,
                textAlign: 'right',
              }}>
                IT'S YOUR<br />PLACE IN<br />THE STORY.
              </h2>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Tags Strip ─────────────────────────────────────────────────────
function TagsStrip() {
  return (
    <section style={{ backgroundColor: '#060606', borderTop: `1px solid rgba(82,170,252,0.15)` }} className="py-6">
      <div className="max-w-7xl mx-auto px-2">
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-4">
            {TAGS.map((tag) => (
              <p
                key={tag}
                style={{
                  fontFamily: BEBAS,
                  color: BLUE,
                  fontSize: 'clamp(13px, 1.6vw, 17px)',
                  letterSpacing: '0.16em',
                  WebkitTextStroke: '0.5px',
                }}
              >
                {tag}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 4: CTA ───────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ backgroundColor: DARK }} className="py-10 md:py-18">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <p style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 20 }}>
            Athletes Elevated × West Ham United
          </p>
          <h2 style={{ fontFamily: BEBAS, color: '#ffffff', fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.0, letterSpacing: '0.02em', marginBottom: 32 }}>
            READY TO JOIN<br />EARLY ACCESS?
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              href="/west-ham#join"
              style={{
                fontFamily: BEBAS, backgroundColor: GOLD, color: '#000000',
                padding: '14px 56px', fontSize: 22, letterSpacing: '0.12em',
                display: 'inline-block', textDecoration: 'none',
              }}
            >
              JOIN NOW
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function WestHamStorePage() {
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .whu-store-outlined { -webkit-text-stroke: 2px #52aafc !important; }
          .whu-coyi { display: none !important; }
          .whu-store-outlined { -webkit-text-stroke: 1.5px #52aafc !important; text-align: right !important; font-size: 20vw !important; }
          .whu-store-solid { -webkit-text-stroke: 1.5px !important; text-align: right !important; font-size: 20vw !important; }
        }
      `}</style>
      <Navbar />
      <main>
        <HeroSection />
        <MarketplaceSection />
        <TagsStrip />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}