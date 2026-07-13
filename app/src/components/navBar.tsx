// Place this file at: src/components/navBar.tsx
'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BEBAS = "'Bebas Neue', sans-serif";

const navLinks = [
  { label: 'West Ham United', href: '/west-ham' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{ backgroundColor: '#080F1C', borderBottom: '1px solid rgba(255,255,255,0.18)' }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      {/* Main bar */}
      <div className="h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">

          {/* Logo — left */}
          <Link href="/" className="select-none flex-shrink-0">
            <Image
              src="/AthletesElevated_Final_color reverse.svg"
              alt="Athletes Elevated"
              width={180}
              height={50}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav — hidden on mobile */}
          {/* <div className="hidden md:flex items-center gap-14">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: BEBAS,
                  color: pathname === href ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  fontSize: 16,
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === href ? '#ffffff' : 'rgba(255,255,255,0.6)')}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/#waitlist"
              style={{
                fontFamily: BEBAS,
                backgroundColor: '#52aafc',
                color: '#000000',
                padding: '8px 24px',
                fontSize: 15,
                letterSpacing: '0.12em',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              EARLY ACCESS
            </Link>
          </div> */}

          {/* Hamburger — visible on mobile only */}
          {/* <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{
              display: 'block', width: 24, height: 2, backgroundColor: '#ffffff',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 24, height: 2, backgroundColor: '#ffffff',
              transition: 'opacity 0.2s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 24, height: 2, backgroundColor: '#ffffff',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button> */}

        </div>
      </div>

      {/* Mobile dropdown */}
      {/* {menuOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: '#080F1C',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '20px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: BEBAS,
                color: pathname === href ? '#ffffff' : 'rgba(255,255,255,0.7)',
                fontSize: 22,
                letterSpacing: '0.12em',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/#waitlist"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: BEBAS,
              backgroundColor: '#52aafc',
              color: '#000000',
              padding: '12px 24px',
              fontSize: 18,
              letterSpacing: '0.12em',
              textDecoration: 'none',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            EARLY ACCESS
          </Link>
        </div>
      )} */}
    </nav>
  );
}