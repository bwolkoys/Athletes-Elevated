// Place this file at: src/components/footer.tsx
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

            {/* Tagline + heading + blurb — centered on mobile, left on desktop */}
            <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
              <p
                style={{
                  fontFamily: 'var(--font-label)',
                  color: '#4E9AF5',
                  fontSize: '8px',
                  letterSpacing: '0.14em',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }}
              >
                Invite-Only Network · Athlete-First Access
              </p>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#ffffff',
                    fontSize: 'clamp(26px, 5vw, 36px)',
                    lineHeight: '1',
                    fontWeight: 300,
                  }}
                >
                  Performance Meets<br />Purpose.
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#ffffff',
                    fontSize: '15px',
                    marginTop: '10px',
                    lineHeight: '1.65',
                    fontWeight: 300,
                    maxWidth: '300px',
                  }}
                >
                  Transforming performance into purpose and influence into impact.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.3)', marginTop: '48px', paddingTop: '20px' }}
          className="flex items-center justify-center md:justify-end"
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 300,
            }}
          >
            © 2026 Athletes Elevated. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}