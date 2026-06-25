// Place this file at: app/opportunity/page.tsx

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

// Image placeholder — replace each with <Image fill style={{objectFit:'cover'}} src="..." alt="..." />
function ImagePlaceholder({ label = 'Image coming soon', rounded = false }: { label?: string; rounded?: boolean }) {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: '#1A2540',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.2)',
        fontFamily: BODY,
        fontSize: 12,
        userSelect: 'none' as const,
        minHeight: 'inherit',
        borderRadius: rounded ? 8 : 0,
      }}
    >
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
        <Image fill style={{ objectFit: 'cover' }} src="/images/opportunity-hero.jpg" alt="Opportunity hero" priority />
      */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ImagePlaceholder label="Opportunity hero image" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 40%, ${NAVY_HERO}80 65%, ${NAVY_HERO}33 100%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '580px' }}>
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
            Your Career Was Just the Beginning.
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
            Athletes Elevated creates pathways for athletes to build businesses, support charitable initiatives, invest strategically, and unlock new possibilities that only exist on the other side of competition.
          </p>
          <Link
            href="/apply"
            style={{
              fontFamily: BODY,
              border: '1.5px solid rgba(255,255,255,0.55)',
              color: '#ffffff',
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
            Request an Invitation →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Stats Banner ─────────────────────────────────────────────────────
function StatsBanner() {
  return (
    <section style={{ backgroundColor: BLUE_MID }} className="py-6">
      <div className="max-w-5xl mx-auto px-6">
        <p
          style={{
            fontFamily: HEADING,
            color: '#ffffff',
            fontSize: 'clamp(12px, 2vw, 16px)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          The average professional athletic career ends at 33. The rest of life is where it matters most.
        </p>
      </div>
    </section>
  );
}

// ─── Section: Pathways Beyond Competition ──────────────────────────────────────
const pathways = [
  {
    title: 'Build Businesses',
    desc: 'Athletes have the discipline, resilience, and network to build extraordinary companies. We provide the connections, capital introductions, and mentorship to help them do exactly that.',
    imgLabel: 'Build businesses image',
  },
  {
    title: 'Support Causes',
    desc: 'Athletes carry influence. We help them direct that influence toward charitable initiatives and community organizations aligned with what they genuinely believe in.',
    imgLabel: 'Support causes image',
  },
  {
    title: 'Invest Strategically',
    desc: "From early-stage startups to established brands, the network surfaces investment opportunities that match an athlete's goals, values, and risk profile.",
    imgLabel: 'Invest strategically image',
  },
  {
    title: 'Mentor & Lead',
    desc: "Some of the most meaningful opportunities aren't financial — they're human. Athletes who mentor the next generation create ripple effects that outlast any competition result.",
    imgLabel: 'Mentor and lead image',
  },
];

function PathwaysSection() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }} className="py-16 md:py-24">
      {/* Subtle background image behind the whole section */}
      <div className="absolute inset-0" style={{ zIndex: 0, opacity: 0.15 }}>
        {/* Replace with: <Image fill style={{ objectFit: 'cover' }} src="/images/pathways-bg.jpg" alt="" /> */}
        <ImagePlaceholder label="" />
      </div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="mb-12">
          <SectionLabel light>What We Create</SectionLabel>
          <h2
            style={{
              fontFamily: HEADING,
              color: '#ffffff',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase' as const,
              marginBottom: 16,
            }}
          >
            Pathways Beyond Competition
          </h2>
          <p
            style={{
              fontFamily: BODY,
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'clamp(15px, 2vw, 16px)',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 680,
            }}
          >
            We don't just connect athletes to opportunity — we help them see what's possible and give them the resources to pursue it with the same conviction they brought to their sport.
          </p>
        </div>

        {/* 2×2 pathway cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pathways.map(({ title, desc, imgLabel }) => (
            <div
              key={title}
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}
              className="flex flex-col sm:flex-row overflow-hidden"
            >
              {/* Thumbnail image */}
              <div className="sm:w-36 sm:flex-shrink-0 min-h-[160px] sm:min-h-0 relative overflow-hidden">
                {/* Replace with: <Image fill style={{ objectFit: 'cover' }} src={`/images/${imgLabel}.jpg`} alt={title} /> */}
                <ImagePlaceholder label={imgLabel} />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3
                  style={{
                    fontFamily: HEADING,
                    color: BLUE_LIGHT,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase' as const,
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: BODY,
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.75,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
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
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Left — heading + description + CTA */}
          <div className="flex flex-col justify-center">
            <SectionLabel>The Marketplace</SectionLabel>
            <h2
              style={{
                fontFamily: HEADING,
                color: NAVY,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase' as const,
                marginBottom: 24,
              }}
            >
              Built to Create Revenue For Athletes.
            </h2>
            <p
              style={{
                fontFamily: BODY,
                color: '#4A5568',
                fontSize: 'clamp(15px, 2vw, 16px)',
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              Through the Athletes Elevated Marketplace, athletes and brands can showcase products, earn commissions, engage fans, and build sustainable revenue streams — while rewarding supporters for their participation.
            </p>
            <Link
              href="/marketplace"
              style={{
                fontFamily: BODY,
                border: `1.5px solid ${NAVY}`,
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
          </div>

          {/* Right — feature list */}
          <div>
            <h3
              style={{
                fontFamily: HEADING,
                color: NAVY,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
                marginBottom: 20,
              }}
            >
              Marketplace Features
            </h3>

            <div className="flex flex-col gap-3">
              {marketplaceFeatures.map(({ title, desc, highlight }) => (
                <div
                  key={title}
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
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '0.03em',
                      marginBottom: 8,
                      textTransform: 'uppercase' as const,
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
                </div>
              ))}
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
          The Opportunity Doesn't Wait.
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
          Membership is by invitation only. If you've been referred, we'd like to hear from you.
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