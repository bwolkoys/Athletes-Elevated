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

const NAVY      = '#080F1C';
const NAVY_HERO = '#0B1220';
const BLUE      = '#1A6EF0';
const BLUE_LIGHT = '#4E9AF5';
const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 12, letterSpacing: '0.28em', fontWeight: 600, textTransform: 'uppercase' as const, borderLeft: '1.5px solid #52aafc', paddingLeft: 10, display: 'inline-block' }}>
        {children}
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }} className="flex items-center py-24 md:py-0 min-h-[55vh] md:min-h-[80vh]">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', objectPosition: 'top' }} src="/images/AdobeStock_2045098548.png" alt="Opportunity hero" priority />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 40%, ${NAVY_HERO}80 65%, ${NAVY_HERO}33 100%)` }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '540px' }}>
          <HeroText delay={0}>
            <h1 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 24 }}>
              Your Career Was Just the Beginning.
            </h1>
          </HeroText>
          <HeroText delay={0.2}>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, marginBottom: 40, maxWidth: 460 }}>
              Athletes Elevated creates pathways for athletes to build businesses, support charitable initiatives, invest strategically, and unlock new possibilities that only exist on the other side of competition.
            </p>
          </HeroText>
          <HeroText delay={0.35}>
            <motion.div whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}>
              <Link href="/apply" style={{ fontFamily: BODY, border: '1.5px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block' }} className="hover:border-white transition-all">
                Apply for Membership →
              </Link>
            </motion.div>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-6">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{ flex: 1, maxWidth: 64, height: '0.5px', background: 'rgba(9,40,102,0.25)' }} />
            <p style={{ fontFamily: BODY, color: '#092866', fontSize: 'clamp(12px, 3vw, 18px)', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase' as const, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
              The average professional athletic career ends at 33. The rest of life is where it matters most.
            </p>
            <div style={{ flex: 1, maxWidth: 64, height: '0.5px', background: 'rgba(9,40,102,0.25)' }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const pathways = [
  { title: 'Build Businesses', desc: 'Athletes have the discipline, resilience, and network to build extraordinary companies. We provide the connections, capital introductions, and mentorship to help them do exactly that.', img: '/images/Team.jpeg' },
  { title: 'Support Causes', desc: 'Athletes carry influence. We help them direct that influence toward charitable initiatives and community organizations aligned with what they genuinely believe in.', img: '/images/basketball-team.jpg' },
  { title: 'Invest Strategically', desc: "From early-stage startups to established brands, the network surfaces investment opportunities that match an athlete's goals, values, and risk profile.", img: '/images/AdobeStock_802902722.jpeg' },
  { title: 'Mentor & Lead', desc: "Some of the most meaningful opportunities aren't financial — they're human. Athletes who mentor the next generation create ripple effects that outlast any competition result.", img: '/images/AdobeStock_504801118-scaled.jpeg' },
];

function PathwaysSection() {
  return (
    <section style={{ backgroundColor: 'white', position: 'relative', overflow: 'hidden' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mb-12">
          <FadeUp>
            <SectionLabel light>What We Create</SectionLabel>
            <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 16 }}>
              Pathways Beyond Competition
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p style={{ fontFamily: BODY, color: NAVY, fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.75, maxWidth: 680 }}>
              We don't just connect athletes to opportunity — we help them see what's possible and give them the resources to pursue it with the same conviction they brought to their sport.
            </p>
          </FadeUp>
        </div>
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pathways.map(({ title, desc, img }) => (
            <StaggerItem key={title}>
              <MotionDiv whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants} style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', borderTop: '1.5px solid #092866', borderRadius: 4 }} className="flex flex-col sm:flex-row overflow-hidden">
                <div className="sm:w-36 sm:flex-shrink-0 min-h-[160px] sm:min-h-0 relative overflow-hidden">
                  <Image fill style={{ objectFit: 'cover' }} src={img} alt={title} />
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: HEADING, color: NAVY, fontSize: 17, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontFamily: BODY, color: NAVY, fontSize: 14, fontWeight: 300, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

const drops = [
  { name: 'Anton Ferdinand', label: 'Ferdinand Collective', status: 'live' as const },
  { name: 'Next Athlete', label: 'Members notified first', status: 'soon' as const, date: 'Jul 28' },
  { name: 'Next Athlete', label: 'Members notified first', status: 'soon' as const, date: 'Aug 18' },
];

const rewardsSteps = [
  { step: 'Shop', desc: 'Browse athlete storefronts and buy from people you believe in.' },
  { step: 'Earn Rewards', desc: 'Every purchase builds your rewards balance automatically.' },
  { step: 'Unlock Experiences', desc: 'Redeem for athlete access, private events, and moments that dont exist anywhere else.' },
];

function MarketplaceSection() {
  return (
    <section style={{ backgroundColor: '#092866', position: 'relative', overflow: 'hidden' }} className="py-16 md:py-24">
      <div style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(82,170,252,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <style>{`
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.6); } }
        .live-dot-opp { animation: pulse-dot 1.8s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <FadeUp>
          <SectionLabel>The Marketplace</SectionLabel>
          <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 16, maxWidth: 660 }}>
            Built to Create Revenue For Athletes.
          </h2>
          <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.8, marginBottom: 52, maxWidth: 660 }}>
            Through the Athletes Elevated Marketplace, athletes and brands showcase products, earn commissions, and engage fans — while rewarding supporters for their participation.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* Founding Drops box */}
          <SlideInLeft delay={0.1}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '28px 28px 24px' }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 11, letterSpacing: '0.24em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Founding Drops</p>
                <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 300 }}>25 athletes, one at a time</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {drops.map(({ name, label, status, date }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      backgroundColor: status === 'live' ? 'rgba(82,170,252,0.12)' : 'rgba(255,255,255,0.03)',
                      border: status === 'live' ? '1px solid rgba(82,170,252,0.3)' : '1px solid rgba(255,255,255,0.06)',
                      borderLeft: status === 'live' ? '3px solid #52aafc' : '3px solid rgba(255,255,255,0.12)',
                      borderRadius: 4,
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: HEADING, color: status === 'live' ? '#ffffff' : 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{name}</p>
                      <p style={{ fontFamily: BODY, color: status === 'live' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)', fontSize: 12, fontWeight: 300 }}>{label}</p>
                    </div>
                    <div style={{ flexShrink: 0, marginLeft: 12 }}>
                      {status === 'live' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: BODY, color: '#52aafc', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          <span className="live-dot-opp" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#52aafc', display: 'inline-block' }} />
                          Live Now
                        </span>
                      ) : (
                        <span style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.25)', fontSize: 12, fontWeight: 300, letterSpacing: '0.04em' }}>{date}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SlideInLeft>

          {/* Rewards flow box */}
          <SlideInRight delay={0.1}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '28px 28px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 11, letterSpacing: '0.24em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Every purchase earns rewards</p>
                <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 300, lineHeight: 1.7 }}>
                  Members build rewards with every marketplace purchase. Those rewards unlock exclusive experiences — athlete access, private events, and moments that don't exist anywhere else.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
                {rewardsSteps.map(({ step, desc }, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.1 }}
                    style={{ display: 'flex', gap: 14, paddingBottom: i < rewardsSteps.length - 1 ? 16 : 0 }}
                  >
                    {/* Step indicator + connector */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#52aafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontFamily: HEADING, color: '#092866', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                      </div>
                      {i < rewardsSteps.length - 1 && (
                        <div style={{ width: 1, flex: 1, minHeight: 16, backgroundColor: 'rgba(82,170,252,0.25)', marginTop: 4 }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < rewardsSteps.length - 1 ? 8 : 0 }}>
                      <p style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{step}</p>
                      <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 300, lineHeight: 1.65 }}>{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SlideInRight>
        </div>

        {/* CTA */}
        <FadeUp delay={0.2}>
          <motion.div whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link href="https://athleteselevatedmarketplace.com/" style={{ fontFamily: BODY, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', padding: '13px 28px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block' }} className="hover:border-white transition-all">
              Join the Marketplace →
            </Link>
          </motion.div>
        </FadeUp>

      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ backgroundColor: '#F7F9FC' }} className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 style={{ fontFamily: HEADING, color: '#092866', fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 20 }}>
            The Opportunity Doesn't Wait.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, marginBottom: 40 }}>
            Membership is by invitation only. If you've been referred, we'd like to hear from you.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <motion.div whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.97 }}>
            <Link href="/apply" style={{ fontFamily: BODY, background: 'transparent', border: `1.5px solid #092866`, color: '#092866', padding: '13px 32px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block' }} className="hover:opacity-70 transition-opacity">
              Apply for Membership →
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

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