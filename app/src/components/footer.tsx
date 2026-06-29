import Link from 'next/link';
import Image from "next/image";

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Connection', href: '/connection' },
  { label: 'Opportunity', href: '/opportunity' },
  { label: 'Storytelling', href: '/storytelling' },
  { label: 'Partnership', href: '/partnerships' },
  { label: 'Apply', href: '/apply' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(to right, #0D2A5E 0%, #080F1C 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Left column — Logo + tagline + blurb */}
          <div className="flex flex-col gap-5 items-start">
            <Link href="/" className="flex items-start select-none">
              <Image
                src="/AthletesElevated_Final_color reverse.svg"
                alt="Athletes Elevated"
                width={190}
                height={50}
                priority
                className="h-14 w-auto"
              />
            </Link>

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
                  fontSize: '36px',
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

          {/* Middle column — Links (centered) */}
          <div className="flex flex-col items-start md:items-center">
            <div className="w-full max-w-[160px]">
              <h4
                style={{
                  fontFamily: 'var(--font-label)',
                  color: '#4E9AF5',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  paddingBottom: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                }}
                className="mb-5"
              >
                Links
              </h4>
              <ul className="flex flex-col">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 300,
                      }}
                      className="hover:text-white transition-colors duration-200 py-1.5 block min-h-[36px] flex items-center"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-label)',
                color: '#4E9AF5',
                fontSize: '11px',
                letterSpacing: '0.16em',
                fontWeight: 600,
                textTransform: 'uppercase',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
              }}
              className="mb-5"
            >
              Contact Info
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@athleteselevated.com"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 300,
                }}
                className="hover:text-white transition-colors duration-200"
              >
                info@athleteselevated.com
              </a>
              <address
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  lineHeight: '1.65',
                  fontWeight: 300,
                }}
              >
                1417 N. Magnolia Ave.<br />
                Ocala, FL 34475
              </address>
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