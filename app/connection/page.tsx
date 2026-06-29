'use client';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import Image from 'next/image';
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';
import Link from 'next/link';

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

const NAVY      = '#092866';
const NAVY_HERO = '#0B1220';
const BLUE      = '#1A6EF0';
const BLUE_LIGHT = '#4E9AF5';
const CARD_BG   = '#F4F8FF';
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

function IconAthletes() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7 7 0 0 1 13 0"/></svg>;
}
function IconInvestors() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}
function IconBrands() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><path d="M8 7V5a2 2 0 0 0-4 0v2"/></svg>;
}
function IconCharity() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
function IconMentors() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function IconFans() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}

function Hero() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, minHeight: '80vh', position: 'relative', overflow: 'hidden' }} className="flex items-center py-24 md:py-0">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', objectPosition: 'center' }} src="/images/AdobeStock_1873466064.jpeg" alt="Connection hero" priority />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_HERO} 0%, ${NAVY_HERO}E6 35%, ${NAVY_HERO}99 65%, ${NAVY_HERO}40 100%)` }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '500px' }}>
          <HeroText delay={0}>
            <h1 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 24 }}>
              The Right People. The Right Room.
            </h1>
          </HeroText>
          <HeroText delay={0.2}>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              Athletes Elevated is a private network built around the belief that meaningful relationships create meaningful outcomes. We bring together athletes, investors, brands, charities, mentors, and fans — not by chance, but by design.
            </p>
          </HeroText>
          <HeroText delay={0.35}>
            <motion.div whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link href="/apply" style={{ fontFamily: BODY, border: '1.5px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block' }} className="hover:border-white transition-all">
                Request an Invitation →
              </Link>
            </motion.div>
          </HeroText>
        </div>
      </div>
    </section>
  );
}

function MembershipBanner() {
  return (
    <section style={{ backgroundColor: '#52aafc' }} className="py-5">
      <div className="max-w-7xl mx-auto px-6 flex justify-center">
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 48, height: '0.5px', background: 'rgba(9,40,102,0.3)' }} />
            <p style={{ fontFamily: BODY, color: '#092866', fontSize: 'clamp(11px, 3vw, 18px)', fontWeight: 300, letterSpacing: '0.22em', textTransform: 'uppercase' as const, textAlign: 'center', margin: 0 }}>
              Membership Is Not Discovered. It Is Earned.
            </p>
            <div style={{ width: 48, height: '0.5px', background: 'rgba(9,40,102,0.3)' }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const memberTypes = [
  { Icon: IconAthletes, title: 'Professional Athletes', desc: 'Current and former competitors seeking to build, invest, and create impact beyond sport.' },
  { Icon: IconInvestors, title: 'Investors', desc: 'Early-stage and experienced investors looking to partner with purpose-driven athlete founders.' },
  { Icon: IconBrands, title: 'Brands & Partners', desc: 'Companies seeking authentic relationships with elite athletes and like-minded communities.' },
  { Icon: IconCharity, title: 'Charitable Organizations', desc: 'Mission-driven nonprofits aligned with the values athletes carry into the world.' },
  { Icon: IconMentors, title: 'Mentors & Industry Leaders', desc: 'Experienced professionals offering guidance, perspective, and access to those still climbing.' },
  { Icon: IconFans, title: 'Fans & Community', desc: 'Supporters who want to be part of something bigger than the scoreboard.' },
];

function WhoIsInside() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-14 md:mb-16">
          <SlideInLeft>
            <div>
              <SectionLabel>The Network</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em' as const }}>Who is Inside</h2>
            </div>
          </SlideInLeft>
          <SlideInRight>
            <div className="flex items-center">
              <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 16px)', fontWeight: 300, lineHeight: 1.75 }}>
                Every member has a role. Every role serves the athlete at the center. This is not a database — it is a community built with purpose.
              </p>
            </div>
          </SlideInRight>
        </div>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {memberTypes.map(({ Icon, title, desc }) => (
            <StaggerItem key={title}>
              <MotionDiv whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants} style={{ backgroundColor: CARD_BG, borderRadius: 4, padding: '28px 24px', border: '1px solid rgba(82,170,252,0.12)', borderTop: '1.5px solid #092866' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#52aafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon />
                </div>
                <h3 style={{ fontFamily: HEADING, color: '#092866', fontSize: 15, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 10, textTransform: 'uppercase' as const }}>{title}</h3>
                <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.75 }}>{desc}</p>
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

const members = [
  { name: 'Picabo', sport: 'Alpine Ski Racer', img: '/images/picabo-street-thumbnail.png' },
  { name: 'Lauren', sport: 'Alpine Ski Racer', img: '/images/Lauren-Macuga.jpg' },
  { name: 'Anton', sport: 'Professional Footballer', img: '/images/anton.jpeg' },
  { name: 'Marlon', sport: 'Professional Footballer', img: '/images/Marlon_Harewood.JPG' },
];

function LockIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}

function MembersSection() {
  return (
    <section style={{ backgroundColor: NAVY_HERO }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-12">
          <SlideInLeft>
            <div>
              <SectionLabel light>The Network</SectionLabel>
              <h2 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em' }}>The Members</h2>
            </div>
          </SlideInLeft>
        </div>
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map(({ name, sport, img }) => (
            <StaggerItem key={name}>
              <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', aspectRatio: '4/4', backgroundColor: '#1a2540' }}>
                <Image fill src={img} alt="" style={{ objectFit: 'cover', filter: 'blur(10px) brightness(0.55)', transform: 'scale(1.08)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(9,40,102,0.92) 0%, rgba(9,40,102,0.4) 50%, transparent 100%)' }} />
                <div className="absolute top-3 right-3" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 2, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>
                  <LockIcon />
                  <span style={{ fontFamily: HEADING, letterSpacing: '0.12em', fontSize: 9 }}>MEMBER</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0" style={{ padding: '16px 14px' }}>
                  <p style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 15, fontWeight: 300, letterSpacing: '0.04em', marginBottom: 4 }}>{name}</p>
                  <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 300, letterSpacing: '0.04em' }}>{sport}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <FadeUp delay={0.2}>
          <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 300, textAlign: 'center', marginTop: 36, letterSpacing: '0.06em' }}>
            Member identities are kept private. Names and details are illustrative.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

const steps = [
  { num: '01', title: 'Invitation Only', desc: 'Every member joins through a trusted referral. This is not a platform you discover — it is one you are welcomed into.' },
  { num: '02', title: 'Purposeful Matching', desc: 'Upon joining, members complete an intake process. Connections are surfaced based on goals, values, and mutual opportunity — not proximity or follower count.' },
  { num: '03', title: 'Meaningful Outcomes', desc: "Introductions are made with intention. The goal is never volume — it is alignment. Every connection should open a door worth walking through." },
];

function HowItWorks() {
  return (
    <section style={{ backgroundColor: '#F7F9FC' }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionLabel>How It Works</SectionLabel>
          <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em' as const, marginBottom: 48 }}>
            Intentional by Design
          </h2>
        </FadeUp>
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ num, title, desc }) => (
            <StaggerItem key={num}>
              <MotionDiv whileHover="hover" initial="rest" animate="rest" variants={cardHoverVariants} style={{ backgroundColor: '#ffffff', borderRadius: 4, padding: '32px 28px', border: '1px solid rgba(0,0,0,0.06)', borderTop: '1.5px solid #092866' }}>
                <MotionDiv whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.2 }} style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${BLUE} 0%, #52aafc 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <span style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 15, fontWeight: 800, letterSpacing: '0.04em' }}>{num}</span>
                </MotionDiv>
                <h3 style={{ fontFamily: HEADING, color: NAVY, fontSize: 17, fontWeight: 300, letterSpacing: '0.04em', textTransform: 'uppercase' as const, marginBottom: 12 }}>{title}</h3>
                <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 14, fontWeight: 300, lineHeight: 1.75 }}>{desc}</p>
              </MotionDiv>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section style={{ backgroundColor: NAVY_HERO, position: 'relative', overflow: 'hidden' }} className="py-20 md:py-16">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image fill style={{ objectFit: 'cover', opacity: 0.65, objectPosition: 'center top' }} src="/images/AthleteCityView.png" alt="" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,15,28,0.82)' }} />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn delay={0.1}>
          <div style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 'clamp(56px, 8vw, 96px)', lineHeight: 0.8, fontWeight: 900, marginBottom: 24, userSelect: 'none' }} aria-hidden="true">"</div>
        </FadeIn>
        <FadeUp delay={0.25}>
          <blockquote>
            <p style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(20px, 3.5vw, 36px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, letterSpacing: '-0.01em', marginBottom: 28 }}>
              Meaningful relationships create meaningful outcomes.
            </p>
            <cite style={{ fontFamily: BODY, color: '#52aafc', fontSize: 12, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', fontStyle: 'normal' }}>Athletes Elevated — Core Value</cite>
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em' as const, marginBottom: 20 }}>
            You Were Referred. Now It's Your Move.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p style={{ fontFamily: BODY, color: '#4A5568', fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, lineHeight: 1.75, marginBottom: 40 }}>
            Membership is by invitation only. If someone believed you belonged here, we'd like to hear from you.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <motion.div whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link href="/apply" style={{ fontFamily: BODY, border: `1.5px solid #092866`, color: '#092866', padding: '13px 32px', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block', background: 'transparent' }} className="hover:opacity-70 transition-opacity">
              Request an Invitation →
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function ConnectionPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <MembershipBanner />
        <WhoIsInside />
        <MembersSection />
        <HowItWorks />
        <QuoteSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}