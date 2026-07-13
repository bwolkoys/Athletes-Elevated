// Place this file at: src/components/footer.tsx
'use client'

import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(to right, #0D2A5E 0%, #080F1C 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-44">

          {/* Logo left on desktop, stacked on top on mobile */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">

            {/* Logo */}
            <Link href="/" className="flex items-start select-none shrink-0">
              <Image
                src="/AthletesElevated_Final_color reverse.svg"
                alt="Athletes Elevated"
                width={290}
                height={100}
                priority
                className="h-24 w-auto"
              />
            </Link>

            {/* Tagline + heading + blurb */}
            <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
              <p style={{ fontFamily: 'var(--font-label)', color: '#4E9AF5', fontSize: '8px', letterSpacing: '0.14em', fontWeight: 500, textTransform: 'uppercase' }}>
                Invite-Only Network · Athlete-First Access
              </p>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: 'clamp(26px, 5vw, 36px)', lineHeight: '1', fontWeight: 300 }}>
                  Performance Meets<br />Purpose.
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', color: '#ffffff', fontSize: '15px', marginTop: '10px', lineHeight: '1.65', fontWeight: 300, maxWidth: '300px' }}>
                  Transforming performance into purpose and influence into impact.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.3)', marginTop: '48px', paddingTop: '20px' }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* T&C link */}
          <a
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-body)', color: '#ffffff', fontSize: '12px', fontWeight: 300, textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Terms &amp; Conditions
          </a>

          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-body)', color: '#ffffff', fontSize: '12px', fontWeight: 300, textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Privacy Policy
          </a>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>

            {/* Instagram */}
            <a href="https://www.instagram.com/athleteselevated/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              style={{ color: '#ffffff', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a href="https://x.com/athelevated?s=21" target="_blank" rel="noopener noreferrer" aria-label="X"
              style={{ color: '#ffffff', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@athletes.elevated?_r=1&_t=ZP-980hVbezLVH" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
              style={{ color: '#ffffff', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/athletes-elevated/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              style={{ color: '#ffffff', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

          </div>

          {/* Copyright */}
          <p style={{ fontFamily: 'var(--font-body)', color: '#ffffff', fontSize: '12px', fontWeight: 300 }}>
            © 2026 Athletes Elevated. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}