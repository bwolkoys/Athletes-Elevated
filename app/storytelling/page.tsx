// Place this file at: app/storytelling/page.tsx

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
      style={{ backgroundColor: NAVY_HERO, minHeight: '80vh', position: 'relative', overflow: 'hidden' }}
      className="flex items-center py-24 md:py-0"
    >
      {/*
        Replace ImagePlaceholder with:
        <Image fill style={{ objectFit: 'cover', objectPosition: 'right center' }} src="/images/storytelling-hero.jpg" alt="Storytelling hero" priority />
      */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ImagePlaceholder label="Storytelling hero image" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 40%, ${NAVY_HERO}80 65%, ${NAVY_HERO}26 100%)` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '560px' }}>
          <h1
            style={{
              fontFamily: HEADING,
              color: '#ffffff',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: 24,
              textTransform: 'uppercase' as const,
            }}
          >
            Every Athlete Has a Story Worth Telling.
          </h1>
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
            Through the Heroes Docuseries, athletes share the resilience, adversity, and purpose that define their journeys — not to relive the past, but to inspire what comes next.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/apply"
              style={{ fontFamily: BODY, border: '1.5px solid rgba(255,255,255,0.55)', color: '#ffffff', padding: '13px 28px', borderRadius: 6, fontSize: 14, fontWeight: 600, letterSpacing: '0.02em', textAlign: 'center', transition: 'border-color 0.2s, background 0.2s' }}
              className="hover:border-white hover:bg-white/10"
            >
              Request an Invitation →
            </Link>
            <a
              href="#the-series"
              style={{ fontFamily: BODY, border: '1.5px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.75)', padding: '13px 28px', borderRadius: 6, fontSize: 14, fontWeight: 400, letterSpacing: '0.02em', textAlign: 'center', transition: 'border-color 0.2s' }}
              className="hover:border-white/60 hover:text-white"
            >
              The Heroes Series ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Scrolling Ticker ─────────────────────────────────────────────────
function Ticker() {
  const words = ['Resilience', 'Adversity', 'Purpose', 'Impact', 'Courage', 'Character', 'Perseverance', 'Legacy'];
  // Duplicate the list so the loop is seamless
  const repeated = [...words, ...words, ...words];

  return (
    <section style={{ backgroundColor: NAVY_HERO, borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }} className="py-4">
      {/* CSS keyframes defined inline — no globals.css change needed */}
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 22s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ticker-track">
        {repeated.map((word, i) => (
          <span key={i} className="flex items-center">
            <span
              style={{
                fontFamily: HEADING,
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                whiteSpace: 'nowrap',
                padding: '0 24px',
              }}
            >
              {word}
            </span>
            <span style={{ color: BLUE_LIGHT, fontSize: 10 }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Heroes Docuseries ────────────────────────────────────────────────
function DocuseriesSection() {
  return (
    <section id="the-series" style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <SectionLabel>The Series</SectionLabel>
          <h2
            style={{
              fontFamily: HEADING,
              color: NAVY,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase' as const,
              marginBottom: 20,
            }}
          >
            Heroes Docuseries
          </h2>
          <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8, marginBottom: 12 }}>
            Heroes is the storytelling arm of Athletes Elevated — a documentary series that goes behind the medal, the contract, and the headline to find what actually made these athletes who they are.
          </p>
          <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8 }}>
            Each episode is built around a single athlete, a single truth, and the belief that courage, character, and perseverance — not just talent — are what make someone a hero.
          </p>
        </div>

        {/* Video player placeholder */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 960, borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9', backgroundColor: '#0B1220' }}>
          {/*
            Replace this block with your video embed:
            <video src="/videos/heroes-trailer.mp4" poster="/images/heroes-poster.jpg" controls />
            or an iframe for YouTube/Vimeo
          */}
          <ImagePlaceholder label="Heroes Docuseries trailer" />

          {/* Play button overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(8,15,28,0.35)' }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              {/* Play triangle */}
              <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '20px solid rgba(255,255,255,0.9)', marginLeft: 4 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Quote ────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }} className="py-20 md:py-28">
      {/*
        Replace ImagePlaceholder with:
        <Image fill style={{ objectFit: 'cover', opacity: 0.2 }} src="/images/crowd-bg.jpg" alt="" />
      */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ImagePlaceholder label="Quote background image" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,15,28,0.8)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Blue double-quote mark */}
        <div
          style={{
            fontFamily: HEADING,
            color: BLUE,
            fontSize: 'clamp(64px, 10vw, 110px)',
            lineHeight: 0.75,
            fontWeight: 900,
            marginBottom: 32,
            userSelect: 'none' as const,
          }}
          aria-hidden="true"
        >
          "
        </div>
        <blockquote>
          <p
            style={{
              fontFamily: HEADING,
              color: '#ffffff',
              fontSize: 'clamp(18px, 3vw, 34px)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
            }}
          >
            The series exists to inspire future generations by showing that what truly makes someone a hero is not the result — it is the decision to keep going when the result was uncertain.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

// ─── Section: Why It Matters ───────────────────────────────────────────────────
const reasons = [
  {
    title: 'For Athletes',
    desc: 'Your story is your most durable asset. Long after the competition ends, the person who overcame — and what they did with it — is what people remember and follow.',
    imgLabel: 'For athletes image',
  },
  {
    title: 'For Future Generations',
    desc: "Young athletes don't need highlight reels. They need proof that someone who doubted like them, fell like them — got back up and built something.",
    imgLabel: 'For future generations image',
  },
  {
    title: 'For the Culture',
    desc: 'Sport shapes culture. The stories of athletes — told honestly and with depth — elevate what we all believe is possible.',
    imgLabel: 'For the culture image',
  },
];

function WhyItMatters() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel>Why It Matters</SectionLabel>
        <h2
          style={{
            fontFamily: HEADING,
            color: NAVY,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase' as const,
            marginBottom: 48,
          }}
        >
          Stories That Outlast Sport
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map(({ title, desc, imgLabel }) => (
            <div key={title}>
              {/* Image */}
              <div style={{ height: 200, borderRadius: 10, overflow: 'hidden', marginBottom: 20, position: 'relative' }}>
                {/* Replace with: <Image fill style={{ objectFit: 'cover' }} src={`/images/${imgLabel}.jpg`} alt={title} /> */}
                <ImagePlaceholder label={imgLabel} />
              </div>

              <h3
                style={{
                  fontFamily: HEADING,
                  color: BLUE,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase' as const,
                  marginBottom: 12,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: BODY,
                  color: '#4A5568',
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
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
        <h2
          style={{
            fontFamily: HEADING,
            color: NAVY,
            fontSize: 'clamp(26px, 4vw, 48px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase' as const,
            marginBottom: 20,
          }}
        >
          Your Story Deserves an Audience.
        </h2>
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
          Athletes Elevated is building something that lasts. If you have a story worth telling, we want to tell it.
        </p>
        <Link
          href="/apply"
          style={{
            fontFamily: BODY,
            border: `1.5px solid ${BLUE}`,
            color: BLUE,
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
          Request an Invitation →
        </Link>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function StorytellingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <Ticker />
        <DocuseriesSection />
        <QuoteSection />
        <WhyItMatters />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}