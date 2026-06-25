'use client';

// Place this file at: app/about/page.tsx

import { useState } from 'react';
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import Link from 'next/link';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const NAVY       = '#080F1C';
const NAVY_HERO  = '#0B1220';
const BLUE       = '#1A6EF0';
const BLUE_MID   = '#1559C7';
const BLUE_LIGHT = '#4E9AF5';

// ─── Font shorthands ──────────────────────────────────────────────────────────
const HEADING = "'Montserrat', sans-serif";
const BODY    = "'DM Sans', sans-serif";

// ─── Reusable ─────────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: light ? 'rgba(255,255,255,0.7)' : BLUE_LIGHT, display: 'inline-block', flexShrink: 0 }} />
      <span style={{ fontFamily: HEADING, color: light ? 'rgba(255,255,255,0.6)' : BLUE_LIGHT, fontSize: 11, letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase' as const }}>
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
          {/* "ABOUT" label — plain text style, no dot on this page */}
          <p style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 11, letterSpacing: '0.22em', fontWeight: 600, textTransform: 'uppercase' as const, marginBottom: 16 }}>
            About
          </p>
          <h1
            style={{
              fontFamily: HEADING,
              color: '#ffffff',
              fontSize: 'clamp(38px, 6vw, 76px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: 24,
              textTransform: 'uppercase' as const,
            }}
          >
            Athletes Are More Than Their Sport.
          </h1>
          <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, maxWidth: 420 }}>
            Athletes Elevated exists to give them the network, resources, and opportunities to prove it.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Mission / Vision ─────────────────────────────────────────────────
function MissionVision() {
  return (
    <section style={{ backgroundColor: NAVY_HERO }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Mission */}
          <div style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: 28 }}>
            <SectionLabel light>Mission</SectionLabel>
            <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, lineHeight: 1.15, textTransform: 'uppercase' as const, marginBottom: 16 }}>
              Why We Exist
            </h2>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, lineHeight: 1.8 }}>
              To empower athletes to transform their performance into purpose and their influence into lasting impact — through connection, opportunity, and storytelling.
            </p>
          </div>

          {/* Vision */}
          <div style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: 28 }}>
            <SectionLabel light>Vision</SectionLabel>
            <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, lineHeight: 1.15, textTransform: 'uppercase' as const, marginBottom: 16 }}>
              Where We're Going
            </h2>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, lineHeight: 1.8 }}>
              A place where athletes have the network, resources, and opportunities to create meaningful impact during and after their competitive career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Impact Banner ─────────────────────────────────────────────────────
function ImpactBanner() {
  const words = ['Connection', 'Opportunity', 'Storytelling', 'Impact'];
  return (
    <section style={{ backgroundColor: BLUE_MID }} className="py-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 md:gap-x-8">
          {words.map((word, i) => (
            <span key={word} className="flex items-center gap-5 md:gap-8">
              <span style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(12px, 2vw, 16px)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>
                {word}
              </span>
              {i < words.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>·</span>
              )}
            </span>
          ))}
        </div>
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
        <SectionLabel>The Platform</SectionLabel>
        <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
          An Invite-Only Ecosystem
        </h2>
        <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8, maxWidth: 720, marginBottom: 48 }}>
          Athletes Elevated is an invite-only ecosystem connecting athletes, investors, brands, charities, and fans through opportunity, storytelling, and community. It is built around three core pillars — each one designed to serve athletes beyond the competition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {pillars.map(({ title, href, desc, imgLabel }) => (
            <div key={title} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)' }}>
              {/* Image */}
              <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                {/* Replace with: <Image fill style={{ objectFit: 'cover' }} src={`/images/${imgLabel}.jpg`} alt={title} /> */}
                <ImagePlaceholder label={imgLabel} />
              </div>

              {/* Text */}
              <div style={{ padding: '24px 24px 28px' }}>
                <h3 style={{ fontFamily: HEADING, color: BLUE, fontSize: 16, fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase' as const, marginBottom: 10 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.75, marginBottom: 18 }}>
                  {desc}
                </p>
                <Link href={href} style={{ fontFamily: BODY, color: BLUE, fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }} className="hover:opacity-75 transition-opacity">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
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
    <section style={{ backgroundColor: NAVY_HERO }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left — label + heading */}
          <div>
            <SectionLabel light>Core Values</SectionLabel>
            <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase' as const }}>
              What We Stand For
            </h2>
          </div>

          {/* Right — carousel card */}
          <div>
            {/* Card */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '32px 36px', minHeight: 180 }}>
              <h3 style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 18, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
                {coreValues[current].title}
              </h3>
              <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>
                {coreValues[current].desc}
              </p>
            </div>

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
                <button
                  onClick={prev}
                  aria-label="Previous value"
                  style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}
                  className="hover:bg-white/20"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  aria-label="Next value"
                  style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: BLUE, border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}
                  className="hover:opacity-90"
                >
                  ›
                </button>
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
        <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', textTransform: 'uppercase' as const, marginBottom: 36 }}>
          Transforming Performance Into Purpose. Influence Into Impact.
        </h2>
        <Link
          href="/apply"
          style={{ fontFamily: BODY, border: `1.5px solid ${BLUE}`, color: BLUE, padding: '13px 32px', borderRadius: 6, fontSize: 15, fontWeight: 600, letterSpacing: '0.02em', display: 'inline-block', transition: 'background 0.2s' }}
          className="hover:bg-blue-50"
        >
          Request an Invitation →
        </Link>
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