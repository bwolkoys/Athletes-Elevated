// Place this file at: app/apply/page.tsx
'use client';

import { useState } from 'react';
import { useRef, ReactNode } from 'react';
import Image from 'next/image';
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: EASE, delay }} className={className} style={style}>{children}</motion.div>;
}

function HeroText({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay }} className={className} style={style}>{children}</motion.div>;
}

// ─── Color tokens ─────────────────────────────────────────────────────────────
const NAVY      = '#092866';
const NAVY_HERO = '#0B1220';
const BLUE      = '#1A6EF0';
const BLUE_LIGHT = '#4E9AF5';

// ─── Font shorthands ──────────────────────────────────────────────────────────
const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";

// ─── Form field types ─────────────────────────────────────────────────────────
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  sportOrIndustry: string;
  referredBy: string;
  whyJoin: string;
  website: string;
};

const ROLES = [
  'Professional Athlete',
  'Former / Retired Athlete',
  'Investor',
  'Brand / Company',
  'Charitable Organization',
  'Mentor / Industry Leader',
  'Fan / Community Member',
];

// ─── Input component ──────────────────────────────────────────────────────────
function Field({ label, required = false, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontFamily: HEADING, color: NAVY, fontSize: 11, letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase' as const }}>
        {label}{required && <span style={{ color: '#52aafc', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: BODY,
  fontSize: 15,
  fontWeight: 300,
  color: NAVY,
  backgroundColor: '#F4F8FF',
  border: '1px solid rgba(9,40,102,0.15)',
  borderRadius: 6,
  padding: '12px 16px',
  outline: 'none',
  width: '100%',
};

// ─── Section: Hero ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }}
      className="flex items-center min-h-[55vh] md:min-h-[72vh] py-24 md:py-0"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} src="/images/apply-hero.png" alt="Apply hero" priority />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 40%, ${NAVY_HERO}99 70%, ${NAVY_HERO}66 100%)` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '540px' }} className="text-center md:text-left mx-auto md:mx-0">
          <HeroText delay={0}>
            <p style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 11, letterSpacing: '0.22em', fontWeight: 300, textTransform: 'uppercase' as const, marginBottom: 16 }}>
              Membership
            </p>
          </HeroText>
          <HeroText delay={0.15}>
            <h1 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(38px, 5.5vw, 76px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 24 }}>
              You Were Referred. We're Listening.
            </h1>
          </HeroText>
          <HeroText delay={0.3}>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, maxWidth: 440 }}>
              Athletes Elevated membership is extended by invitation only. Complete the form below and our team will be in touch.
            </p>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Application Form ────────────────────────────────────────────────
function ApplicationForm() {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    sportOrIndustry: '',
    referredBy: '',
    whyJoin: '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section style={{ backgroundColor: '#F7F9FC' }} className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#52aafc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 16 }}>
              Application Received.
            </h2>
            <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 16, fontWeight: 300, lineHeight: 1.75, marginBottom: 36 }}>
              Thank you for applying. Our team reviews every application personally. We'll be in touch if there's a fit.
            </p>
            <Link href="/" style={{ fontFamily: BODY, background: '#52aafc', border: '1.5px solid #52aafc', color: NAVY, padding: '13px 28px', borderRadius: 6, fontSize: 14, fontWeight: 600, letterSpacing: '0.02em', display: 'inline-block' }}>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: '#F7F9FC' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left — context */}
          <div className="lg:col-span-1">
            <FadeUp>
              <div style={{ borderLeft: '3px solid #52aafc', paddingLeft: 24, marginBottom: 40 }}>
                <p style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 11, letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase' as const, marginBottom: 10 }}>
                  What to Expect
                </p>
                <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.8 }}>
                  Every application is reviewed by our team. We're not looking for followers — we're looking for fit. You'll hear from us within 5–7 business days.
                </p>
              </div>

              <div style={{ borderLeft: '3px solid #52aafc', paddingLeft: 24, marginBottom: 40 }}>
                <p style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 11, letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase' as const, marginBottom: 10 }}>
                  Membership Is Earned
                </p>
                <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.8 }}>
                  Athletes Elevated does not accept unsolicited applications. If you are here, someone believed you belonged.
                </p>
              </div>

              <div style={{ borderLeft: '3px solid #52aafc', paddingLeft: 24 }}>
                <p style={{ fontFamily: HEADING, color: BLUE_LIGHT, fontSize: 11, letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase' as const, marginBottom: 10 }}>
                  Questions?
                </p>
                <a href="mailto:info@athleteselevated.com" style={{ fontFamily: BODY, color: NAVY, fontSize: 14, fontWeight: 300, lineHeight: 1.8 }}>
                  info@athleteselevated.com
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-2">
            <FadeUp delay={0.1}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="First Name" required>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={update('firstName')}
                      placeholder="John"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Last Name" required>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={update('lastName')}
                      placeholder="Smith"
                      style={inputStyle}
                    />
                  </Field>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Email Address" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="john@example.com"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+1 (555) 000-0000"
                      style={inputStyle}
                    />
                  </Field>
                </div>

                {/* Role */}
                <Field label="I am a..." required>
                  <select
                    required
                    value={form.role}
                    onChange={update('role')}
                    style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23092866' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40, cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select your role</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>

                {/* Sport / Industry */}
                <Field label="Sport or Industry" required>
                  <input
                    type="text"
                    required
                    value={form.sportOrIndustry}
                    onChange={update('sportOrIndustry')}
                    placeholder="e.g. NFL, Venture Capital, Sports Media..."
                    style={inputStyle}
                  />
                </Field>

                {/* Referred by */}
                <Field label="Who Referred You?" required>
                  <input
                    type="text"
                    required
                    value={form.referredBy}
                    onChange={update('referredBy')}
                    placeholder="Name of the member who referred you"
                    style={inputStyle}
                  />
                </Field>

                {/* Why join */}
                <Field label="Why Do You Want to Join?" required>
                  <textarea
                    required
                    value={form.whyJoin}
                    onChange={update('whyJoin')}
                    placeholder="Tell us what you're looking to build, give, or gain through the network..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                  />
                </Field>

                {/* Website */}
                <Field label="Website or Social Profile">
                  <input
                    type="url"
                    value={form.website}
                    onChange={update('website')}
                    placeholder="https://..."
                    style={inputStyle}
                  />
                </Field>

                {/* Error */}
                {status === 'error' && (
                  <p style={{ fontFamily: BODY, color: '#E53E3E', fontSize: 14, fontWeight: 300 }}>
                    Something went wrong. Please try again or email us directly at info@athleteselevated.com.
                  </p>
                )}

                {/* Submit */}
                <div className="flex justify-start pt-2">
                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ scale: status === 'submitting' ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      fontFamily: BODY,
                      background: '#52aafc',
                      border: '1.5px solid #52aafc',
                      color: NAVY,
                      padding: '14px 36px',
                      borderRadius: 6,
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      opacity: status === 'submitting' ? 0.7 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Application →'}
                  </motion.button>
                </div>

                <p style={{ fontFamily: BODY, color: '#9CA3AF', fontSize: 12, fontWeight: 300, lineHeight: 1.7 }}>
                  By submitting this form you agree to be contacted by the Athletes Elevated team. Your information is never shared or sold.
                </p>
              </form>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}