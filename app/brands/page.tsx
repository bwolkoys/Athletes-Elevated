// Place this file at: app/brands/page.tsx
'use client';

import { useState, useRef, ReactNode } from 'react';
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

// ─── Tokens ────────────────────────────────────────────────────────────────────
const NAVY    = '#080F1C';
const BLUE    = '#52aafc';
const DARK    = '#092866';
const GREEN   = '#9FD356';
const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Animation helpers ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {}, className = '' }: {
  children: ReactNode; delay?: number; style?: React.CSSProperties; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }} style={style} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className={className}>
      {children}
    </motion.div>
  );
}
function StaggerItem({ children, style = {} }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }} style={style}>
      {children}
    </motion.div>
  );
}

// Circular image placeholder
function CircleImg({ src, label, size = 96 }: { src: string; label: string; size?: number }) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        border: `3px solid ${BLUE}`,
        flexShrink: 0, overflow: 'hidden',
        position: 'relative',
      }}>
        <Image
          src={src}
          alt={label}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  }

// ─── Brand Application Form ────────────────────────────────────────────────────
function BrandForm() {
    const [form, setForm] = useState({
      firstName: '', lastName: '', email: '', phone: '',
      brandName: '', website: '', hqCity: '', hqCountry: '',
      industry: '', yearsOperating: '', distributionChannels: '', whyAFit: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
   
    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));
   
    const submit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('loading');
      try {
        const r = await fetch('/api/brands', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!r.ok) throw new Error();
        setStatus('success');
      } catch { setStatus('error'); }
    };
   
    const inputStyle: React.CSSProperties = {
      width: '100%', boxSizing: 'border-box' as const,
      fontFamily: BODY, fontSize: 14, fontWeight: 400,
      padding: '10px 14px', background: '#ffffff',
      border: '1px solid #d1d5db', borderRadius: 4,
      outline: 'none', color: '#111',
    };
    const labelStyle: React.CSSProperties = {
      fontFamily: BODY, fontSize: 12, fontWeight: 600,
      color: DARK, display: 'block', marginBottom: 6,
    };
    const row: React.CSSProperties = {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
    };
   
    if (status === 'success') return (
      <div style={{ padding: '32px 0', textAlign: 'center' as const }}>
        <p style={{ fontFamily: HEADING, color: DARK, fontSize: 20, fontWeight: 300, letterSpacing: '0.02em', marginBottom: 8 }}>Application received!</p>
        <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300 }}>Our team will review your application and be in touch shortly.</p>
      </div>
    );
   
    return (
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
   
        {/* Name row */}
        <div style={row}>
          <div>
            <label style={labelStyle}>First Name *</label>
            <input type="text" required value={form.firstName} onChange={set('firstName')} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Last Name *</label>
            <input type="text" required value={form.lastName} onChange={set('lastName')} style={inputStyle} />
          </div>
        </div>
   
        {/* Email + Phone */}
        <div style={row}>
          <div>
            <label style={labelStyle}>Email *</label>
            <input type="email" required value={form.email} onChange={set('email')} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input type="tel" value={form.phone} onChange={set('phone')} style={inputStyle} />
          </div>
        </div>
   
        {/* Brand Name + Website */}
        <div style={row}>
          <div>
            <label style={labelStyle}>Brand Name *</label>
            <input type="text" required value={form.brandName} onChange={set('brandName')} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Website</label>
            <input type="url" value={form.website} onChange={set('website')} placeholder="https://" style={inputStyle} />
          </div>
        </div>
   
        {/* HQ City + Country */}
        <div style={row}>
          <div>
            <label style={labelStyle}>HQ City</label>
            <input type="text" value={form.hqCity} onChange={set('hqCity')} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>HQ Country</label>
            <input type="text" value={form.hqCountry} onChange={set('hqCountry')} style={inputStyle} />
          </div>
        </div>
   
              {/* Industry */}
              <div>
          <label style={labelStyle}>Industry *</label>
          <div style={{ fontSize: 13, color: '#6b7280', margin: '2px 0 6px', lineHeight: 1.5 }}>
            <div>Health &amp; Wellness — beverages, supplements, pre-workout, protein.</div>
            <div>Sports &amp; Athletics — gear, apparel, or equipment for athletes or the sidelines.</div>
            <div>Other — not sure, or a charity looking to partner.</div>
          </div>
          <select value={form.industry} onChange={set('industry')} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Select…</option>
            {['Health & Wellness', 'Sports & Athletics', 'Other'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Years Operating */}
        <div>
          <label style={labelStyle}>Years Operating *</label>
          <input type="text" value={form.yearsOperating} onChange={set('yearsOperating')} placeholder="e.g. 3" style={inputStyle} />
        </div>
   
        {/* Distribution Channels */}
        <div>
          <label style={labelStyle}>Distribution Channels *</label>
          <input type="text" value={form.distributionChannels} onChange={set('distributionChannels')} placeholder="e.g. DTC, Retail, Amazon" style={inputStyle} />
        </div>
   
        {/* Why a Fit */}
        <div>
          <label style={labelStyle}>Why are you a fit for Athletes Elevated? *</label>
          <textarea required rows={4} value={form.whyAFit} onChange={set('whyAFit')} placeholder="Tell us about your brand and why it aligns with our athlete community…" style={{ ...inputStyle, resize: 'vertical' as const }} />
        </div>
   
        {status === 'error' && (
          <p style={{ fontFamily: BODY, color: '#DC2626', fontSize: 13 }}>Something went wrong. Please try again.</p>
        )}
   
        <motion.button
          type="submit" disabled={status === 'loading'}
          whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: BODY, fontWeight: 700, fontSize: 15,
            background: '#52aafc', border: 'none', color: '#fff',
            padding: '13px 0', borderRadius: 50, cursor: 'pointer',
            width: '100%', opacity: status === 'loading' ? 0.6 : 1,
            marginTop: 4,
          }}
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Application'}
        </motion.button>
      </form>
    );
  }

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function BrandsPage() {
  return (
    <>
      <style>{`
        /* ── 767px and below ─────────────────────────────── */
        @media (max-width: 767px) {
          .brands-hero-inner { flex-direction: column !important; }
          .brands-hero-img {
            width: 100% !important;
            height: 220px !important;
            aspect-ratio: unset !important;
            margin-top: 28px !important;
          }
          .brands-hero-headline { font-size: clamp(34px, 11vw, 52px) !important; }
          .brands-stats-cards { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .brands-benefits-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .brands-form-inner { flex-direction: column !important; gap: 32px !important; }
        }

        /* ── 480px and below (small phones) ─────────────── */
        @media (max-width: 480px) {
          .brands-stats-cards { grid-template-columns: 1fr !important; }
          .brands-benefits-grid { grid-template-columns: 1fr !important; }
          .brands-hero-headline { font-size: clamp(30px, 12vw, 44px) !important; }
        }
      `}</style>

      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO                                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #0D1B35 60%, #0A1628 100%)`,
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="brands-hero-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48 }}>

          {/* Left: text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 20, height: 1.5, backgroundColor: BLUE }} />
                <span style={{ fontFamily: BODY, color: BLUE, fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const }}>
                  For Brands
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="brands-hero-headline"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
              style={{ fontFamily: HEADING, fontSize: 'clamp(38px, 5.5vw, 64px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.01em', margin: '0 0 24px' }}
            >
              <span style={{ color: '#ffffff' }}>WHEN ATHLETES<br />INSPIRE,<br /></span>
              <span style={{ color: BLUE }}>FANS TAKE<br />ACTION.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              style={{ fontFamily: BODY, color: 'white', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 600, lineHeight: 1.8, maxWidth: 510, margin: 0 }}
            >
              Reach high-intent consumers through member storefronts, curated content, fan experiences, and community touchpoints in one connected athlete ecosystem.
            </motion.p>
          </div>

          {/* Right: athlete image */}
          <motion.div
            className="brands-hero-img"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            style={{
              position: 'relative',
              width: '42%', flexShrink: 0,
              aspectRatio: '4/3',
              borderRadius: 12, overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Image fill src="/brands/Brand.png" alt="Athletes" style={{ objectFit: 'cover' }} />
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 2. STATS — "MORE INSPIRED FANS. MORE MEANINGFUL SALES."              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F4F8FF', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header row */}
          <div className="brands-stats-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <Image
              src="/images/AthletesElevated_Final_Icon_dk blue_600px.png"
              alt="Athletes Elevated"
              width={62}
              height={62}
              style={{ objectFit: 'contain' }}
            />
            <span style={{ fontFamily: BODY, color: BLUE, fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const }}>
              Why Brands Join
            </span>
          </div>

          {/* Big headline */}
          <FadeUp style={{ textAlign: 'center' as const, marginBottom: 24 }}>
            <h2 style={{ fontFamily: HEADING, color: DARK, fontSize: 'clamp(24px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.01em', margin: '0 auto 24px', maxWidth: 700 }}>
              MORE INSPIRED FANS.<br />MORE MEANINGFUL SALES.
            </h2>
            <motion.a
              href="#apply"
              whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: BODY, fontWeight: 700, fontSize: 15, background: '#52aafc', color: '#fff', padding: '11px 28px', borderRadius: 50, textDecoration: 'none', display: 'inline-block' }}
            >
              Learn More
            </motion.a>
          </FadeUp>

          {/* 4 Stat cards */}
          <div className="brands-stats-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40 }}>
            {[
              { stat: '164%', desc: "Athlete's emotional bond with fans increases purchase intent by 164% vs. other influencers.",  delay: 0 },
              { stat: '$5.78', desc: 'For every $1 invested in athlete campaigns, brands receive an average of $5.78 in media value.', delay: 0.1 },
              { stat: '7x', desc: 'Brands see a 7x return on ad spend when utilizing athlete content.', delay: 0.2 },
              { stat: '3.7x', desc: 'Athlete creators generate over 3.7x more revenue per follower.', delay: 0.3 },
            ].map(({ stat, desc, delay }) => (
              <FadeUp key={stat} delay={delay} style={{ height: '100%' }}>
                <div style={{
                  border: `1.5px solid ${BLUE}`, borderRadius: 12,
                  padding: '24px 20px', textAlign: 'center' as const, height: '100%',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  boxSizing: 'border-box' as const, backgroundColor: '#ffffff',
                }}>
                  <p style={{ fontFamily: HEADING, color: DARK, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, lineHeight: 1, margin: 0 }}>{stat}</p>
                  <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 13, fontWeight: 600, lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 3. BENEFITS GRID                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: 'clamp(40px, 5vw, 72px) clamp(20px, 5vw, 80px)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header row */}
          <div className="brands-benefits-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
            <motion.a
              href="#apply"
              whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: BODY, fontWeight: 700, fontSize: 14, background: '#52aafc', color: '#fff', padding: '10px 24px', borderRadius: 50, textDecoration: 'none', display: 'inline-block' }}
            >
              Apply Today
            </motion.a>
            <span style={{ fontFamily: BODY, color: BLUE, fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const }}>
              Member Access
            </span>
          </div>

          {/* 3x2 benefits grid */}
          <div className="brands-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
            {[
              { title: 'Qualified Fan Demand', src: '/brands/fan-demand.jpg',   img: 'Fan image',              desc: 'Reach engaged, purchase-ready fans who follow athletes they trust — across every sport.',         delay: 0    },
              { title: 'Selective Brand Access', src: '/brands/ae.png', img: 'Brand access image',     desc: 'We curate brands that align with our athletes, community, and performance standards.',            delay: 0.1  },
              { title: 'Trackable Revenue', src: '/brands/graphh.png',      img: 'Revenue tracking image', desc: 'Proprietary platform CRM with revenue and reporting tracking.',                                   delay: 0.2  },
              { title: 'Athlete-Led Discovery', src: '/brands/athlete-led.jpg',  img: 'Athlete image',          desc: 'Products are recommended by athletes in authentic, close-attention moments.',                     delay: 0.05 },
              { title: 'Curated Content Mix', src: '/brands/Incrowd-art-1.png',    img: 'Content image',          desc: 'Collaborate with like-minded brands and athletes to tell stories that connect with target fans.', delay: 0.15 },
              { title: 'Youth Sports Affiliate', src: '/brands/Youth-Sports-Sponsorships.png', img: 'Youth sports image',     desc: 'Generational impact across youth sports clubs, camps, and families.',                            delay: 0.25 },
            ].map(({ title, src, img, desc, delay }) => (
              <FadeUp key={title} delay={delay}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  <h3 style={{ fontFamily: BODY, color: DARK, fontSize: 16, fontWeight: 1000, margin: 0, lineHeight: 1.2 }}>{title}</h3>
                  <CircleImg src={src} label={title} size={100} />
                  <p style={{ fontFamily: BODY, color: '#092866', fontSize: 13, fontWeight: 500, lineHeight: 1.75, margin: 0, textAlign: 'center' as const }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* 4. FORM — "JOIN ATHLETES ELEVATED"                                   */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section id="apply" style={{ backgroundColor: '#F4F8FF', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 80px)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="brands-form-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-start', gap: 64 }}>
 
          {/* Left: headline */}
          <FadeUp style={{ flex: 1 }}>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(40px, 6.5vw, 72px)', color: '#092866', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.01em', margin: '0 0 24px' }}>
              JOIN ATHLETES<br />ELEVATED
            </h2>
            <p style={{ fontFamily: BODY, color: BLUE, fontSize: 'clamp(14px, 1.8vw, 17px)', fontWeight: 600, lineHeight: 1.7, margin: 0 }}>
              Complete this form to start your membership application.
            </p>
          </FadeUp>
 
          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }} viewport={{ once: true }}
            style={{ width: '100%', maxWidth: 460, flexShrink: 0 }}
          >
            <BrandForm />
          </motion.div>
 
        </div>
      </section>
 
      <Footer />
    </>
  );
}
 