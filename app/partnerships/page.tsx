// Place this file at: app/partnerships/page.tsx
'use client';

import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, ReactNode, useState } from 'react';

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

const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 3px 0 0 rgba(82,170,252,0)' },
  hover: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 3px 0 0 rgba(82,170,252,1)', transition: { duration: 0.2, ease: 'easeOut' } },
};

const MotionDiv = motion.div;

// ─── Color tokens ─────────────────────────────────────────────────────────────
const NAVY      = '#092866';
const NAVY_HERO = '#0B1220';
const BLUE      = '#1A6EF0';
const BLUE_LIGHT = '#4E9AF5';

// ─── Font shorthands ──────────────────────────────────────────────────────────
const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";

// ─── Reusable ─────────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 12, letterSpacing: '0.28em', fontWeight: 600, textTransform: 'uppercase' as const, borderLeft: '1.5px solid #52aafc', paddingLeft: 10, display: 'inline-block' }}>
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
        <Image fill style={{ objectFit: 'cover', objectPosition: 'center' }} src="/images/AdobeStock_618947628.jpeg" alt="Partnerships hero" priority />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 40%, ${NAVY_HERO}80 65%, ${NAVY_HERO}33 100%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '560px' }}>
          <HeroText delay={0}>
            <SectionLabel light>Partnerships & Sponsorships</SectionLabel>
          </HeroText>
          <HeroText delay={0.15}>
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
              Align Your Brand With Purpose.
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
              Athletes Elevated connects brands and sponsors with an elite, invite-only network of athletes, investors, and community leaders. Every partnership is built on shared values — not just shared visibility.
            </p>
          </HeroText>
          <HeroText delay={0.45}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <a
                href="#inquiry-form"
                style={{
                  fontFamily: BODY,
                  border: '1.5px solid #52aafc',
                  background: '#52aafc',
                  color: '#092866',
                  padding: '13px 28px',
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  display: 'inline-block',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                Get in Touch ↓
              </a>
            </motion.div>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Banner ───────────────────────────────────────────────────────────
function Banner() {
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-5">
      <div className="max-w-7xl mx-auto px-6 flex justify-center">
        <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{ flex: 1, maxWidth: 64, height: '0.5px', background: 'rgba(9,40,102,0.25)' }} />
            <p style={{ fontFamily: BODY, color: '#092866', fontSize: 'clamp(13px, 4vw, 18px)', fontWeight: 300, letterSpacing: '0.16em', textTransform: 'uppercase' as const, textAlign: 'center', margin: 0 }}>
              Partnerships Built on Values. Not Just Visibility.
            </p>
            <div style={{ flex: 1, maxWidth: 64, height: '0.5px', background: 'rgba(9,40,102,0.25)' }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section: Our Partners ─────────────────────────────────────────────────────
// Drop logo files into /public/images/partners/ and update the src paths below.
// Recommended: use the color version of each logo (white bg, color logo).
const partners = [
  {
    name: 'West Ham United',
    src: '/images/WHU.png',
    // Adjust width/height to suit the aspect ratio of the actual logo file.
    // These values target a consistent visual weight across different logo shapes.
    width: 160,
    height: 100,
  },
  {
    name: 'Teams Elevated',
    src: '/images/TE.svg',
    width: 200,
    height: 80,
  },
  {
    name: 'USF 7 F',
    src: '/images/USF7F.png',
    width: 160,
    height: 110,
  },
];

function OurPartners() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <FadeUp>
          <div className="text-left mb-14 md:mb-18">
            <SectionLabel>Our Partners</SectionLabel>
            <h2
              style={{
                fontFamily: HEADING,
                color: NAVY,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 16,
              }}
            >
              Trusted By the Best in Sport.
            </h2>
            <p
              style={{
                fontFamily: BODY,
                color: '#4A5568',
                fontSize: 'clamp(15px, 2vw, 16px)',
                fontWeight: 300,
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              Athletes Elevated partners with organizations that share our commitment to athletes, community, and purpose-driven impact.
            </p>
          </div>
        </FadeUp>

        {/* Logo grid */}
        <StaggerGrid
          className="flex flex-wrap items-center justify-center"
          style={{ gap: '48px 72px' }}
        >
          {partners.map(({ name, src, width, height }) => (
            <StaggerItem key={name}>
              <MotionDiv
                whileHover={{ scale: 1.05, opacity: 1 }}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px 32px',
                  minWidth: 200,
                  minHeight: 120,
                }}
              >
                <Image
                  src={src}
                  alt={name}
                  width={width}
                  height={height}
                  style={{ objectFit: 'contain', maxWidth: width, maxHeight: height }}
                />
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Subtle divider line */}
        <FadeIn delay={0.3}>
          <div
            style={{
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.07)',
              marginTop: 64,
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section: Partnership Types ────────────────────────────────────────────────
function PartnershipTypes() {
  return (
    <section style={{ backgroundColor: '#092866' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionLabel light>How We Work Together</SectionLabel>
          <h2
            style={{
              fontFamily: HEADING,
              color: '#ffffff',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: 16,
              maxWidth: 560,
            }}
          >
            Two Ways to Be Part of What We're Building.
          </h2>
          <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8, maxWidth: 640, marginBottom: 52 }}>
            Whether you're looking to sponsor a specific initiative or build a deeper, ongoing brand partnership, we have a path for you. We start with a conversation.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sponsorship */}
          <SlideInLeft delay={0.1}>
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                padding: '36px 32px',
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#52aafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 22, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 14 }}>
                Sponsorship
              </h3>
              <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 300, lineHeight: 1.8, marginBottom: 20 }}>
                Support a specific event, initiative, content series, or season. Sponsorships are defined in scope and designed for brands that want direct, visible association with a marquee moment or platform.
              </p>
              <ul style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 300, lineHeight: 2, listStyle: 'none', padding: 0 }}>
                {['Event & activation sponsorships', 'Heroes Docuseries episode sponsorships', 'Marketplace campaign sponsorships', 'Content & media placement'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#52aafc', flexShrink: 0, display: 'inline-block' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SlideInLeft>

          {/* Partnership */}
          <SlideInRight delay={0.1}>
            <div
              style={{
                backgroundColor: BLUE,
                border: 'none',
                borderRadius: 4,
                padding: '36px 32px',
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 22, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 14 }}>
                Strategic Partnership
              </h3>
              <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 300, lineHeight: 1.8, marginBottom: 20 }}>
                A deeper, ongoing collaboration where your brand becomes embedded in the Athletes Elevated ecosystem. Strategic partners don't just sponsor — they co-create, contribute, and grow alongside the network.
              </p>
              <ul style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 300, lineHeight: 2, listStyle: 'none', padding: 0 }}>
                {['Long-term brand integration', 'Exclusive athlete access & introductions', 'Co-branded content & storytelling', 'Marketplace preferred placement', 'Event & community co-ownership'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)', flexShrink: 0, display: 'inline-block' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}
// ─── Section: Inquiry Form ─────────────────────────────────────────────────────
type FormState = 'idle' | 'submitting' | 'success' | 'error';

const inputStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  backgroundColor: '#F4F8FF',
  border: '1px solid rgba(26,110,240,0.15)',
  borderRadius: 4,
  padding: '13px 16px',
  fontSize: 14,
  fontWeight: 300,
  color: '#080F1C',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Apotek Extended', sans-serif",
  color: '#092866',
  fontSize: 11,
  letterSpacing: '0.14em',
  fontWeight: 600,
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 6,
};

function InquiryForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    phone: '',
    inquiryType: '',
    heardAbout: '',
    message: '',
  });
  const [status, setStatus] = useState<FormState>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getFocusStyle = (field: string): React.CSSProperties =>
    focusedField === field
      ? { ...inputStyle, border: '1px solid #52aafc', backgroundColor: '#ffffff' }
      : inputStyle;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({ firstName: '', lastName: '', organization: '', email: '', phone: '', inquiryType: '', heardAbout: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="inquiry-form" style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Left — copy */}
          <SlideInLeft>
            <div>
              <SectionLabel>Get In Touch</SectionLabel>
              <h2
                style={{
                  fontFamily: HEADING,
                  color: NAVY,
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  marginBottom: 20,
                }}
              >
                Start the Conversation.
              </h2>
              <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 15, fontWeight: 300, lineHeight: 1.8, marginBottom: 32 }}>
                Whether you're interested in sponsoring an initiative or exploring a long-term brand partnership, we'd like to hear from you. Fill out the form and we'll be in touch within 2–3 business days.
              </p>

              {/* Contact details */}
              <div style={{ borderLeft: '3px solid #52aafc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: HEADING, color: NAVY, fontSize: 11, letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Email</p>
                  <a href="mailto:info@athleteselevated.com" style={{ fontFamily: BODY, color: '#52aafc', fontSize: 14, fontWeight: 300 }}>
                    info@athleteselevated.com
                  </a>
                </div>
                <div>
                  <p style={{ fontFamily: HEADING, color: NAVY, fontSize: 11, letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Location</p>
                  <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.65 }}>
                    1417 N. Magnolia Ave.<br />Ocala, FL 34475
                  </p>
                </div>
              </div>
            </div>
          </SlideInLeft>

          {/* Right — form */}
          <SlideInRight delay={0.1}>
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                  backgroundColor: '#EBF2FF',
                  border: '1px solid rgba(82,170,252,0.3)',
                  borderRadius: 4,
                  padding: '48px 36px',
                  textAlign: 'center',
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#52aafc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: HEADING, color: NAVY, fontSize: 22, fontWeight: 300, letterSpacing: '0.02em', marginBottom: 12 }}>
                  Message Received
                </h3>
                <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>
                  Thank you for reaching out. We'll review your inquiry and be in touch within 2–3 business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle} htmlFor="firstName">First Name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      style={getFocusStyle('firstName')}
                      placeholder="First"
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="lastName">Last Name *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      style={getFocusStyle('lastName')}
                      placeholder="Last"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label style={labelStyle} htmlFor="organization">Organization / Company *</label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    required
                    value={form.organization}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('organization')}
                    onBlur={() => setFocusedField(null)}
                    style={getFocusStyle('organization')}
                    placeholder="Your company or organization"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle} htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      style={getFocusStyle('email')}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      style={getFocusStyle('phone')}
                      placeholder="(Optional)"
                    />
                  </div>
                </div>

                {/* Inquiry type */}
                <div>
                  <label style={labelStyle} htmlFor="inquiryType">Type of Inquiry *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={form.inquiryType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('inquiryType')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getFocusStyle('inquiryType'), color: form.inquiryType ? '#080F1C' : '#9CA3AF', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select one</option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Strategic Partnership">Strategic Partnership</option>
                    <option value="Not Sure Yet">Not Sure Yet — I'd Like to Learn More</option>
                  </select>
                </div>

                {/* How they heard */}
                <div>
                  <label style={labelStyle} htmlFor="heardAbout">How Did You Hear About Us?</label>
                  <input
                    id="heardAbout"
                    name="heardAbout"
                    type="text"
                    value={form.heardAbout}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('heardAbout')}
                    onBlur={() => setFocusedField(null)}
                    style={getFocusStyle('heardAbout')}
                    placeholder="Referral, social media, event, etc."
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle} htmlFor="message">Tell Us About Your Interest *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getFocusStyle('message'), resize: 'vertical' }}
                    placeholder="What are you hoping to accomplish? What does your brand stand for? What kind of partnership are you envisioning?"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p style={{ fontFamily: BODY, color: '#DC2626', fontSize: 13, fontWeight: 400 }}>
                    Something went wrong. Please try again or email us directly at info@athleteselevated.com.
                  </p>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={status !== 'submitting' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'submitting' ? { scale: 0.98 } : {}}
                  style={{
                    fontFamily: BODY,
                    backgroundColor: status === 'submitting' ? 'rgba(82,170,252,0.6)' : '#52aafc',
                    border: 'none',
                    borderRadius: 4,
                    color: '#092866',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    padding: '14px 28px',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                    alignSelf: 'flex-start',
                  }}
                >
                  {status === 'submitting' ? 'Sending…' : 'Submit Inquiry →'}
                </motion.button>
              </form>
            )}
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function PartnershipsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <Banner />
        <OurPartners />
        <PartnershipTypes />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}