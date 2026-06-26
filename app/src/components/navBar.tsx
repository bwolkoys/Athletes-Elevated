'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Connection', href: '/connection' },
  { label: 'Opportunity', href: '/opportunity' },
  { label: 'Storytelling', href: '/storytelling' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      style={{ backgroundColor: '#080F1C', borderBottom: '1px solid rgba(255,255,255,0.18)' }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center h-16" style={{ position: 'relative' }}>

        {/* Logo — left */}
        <Link href="/" className="flex items-center select-none">
          <Image
            src="/AthletesElevated_Final_color reverse.svg"
            alt="Athletes Elevated"
            width={180}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav links — absolutely centered */}
        <ul
          className="hidden md:flex items-center gap-8"
          style={{ position: 'absolute', left: '55%', transform: 'translateX(-50%)' }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} style={{ position: 'relative', paddingBottom: '4px' }}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.75)',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.02em',
                    transition: 'color 0.2s',
                  }}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#1A6EF0',
                    borderRadius: '9999px',
                  }} />
                )}
              </li>
            );
          })}
        </ul>

        {/* Apply button — commented out */}
        {/* <div className="hidden md:block ml-auto">
          <Link
            href="/apply"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: '#1A6EF0',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              padding: '8px 22px',
              borderRadius: '9999px',
              letterSpacing: '0.03em',
              display: 'inline-block',
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Apply
          </Link>
        </div> */}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 ml-auto"
          aria-label="Toggle menu"
        >
          <span style={{ backgroundColor: '#ffffff', height: '2px', width: '22px', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ backgroundColor: '#ffffff', height: '2px', width: '22px', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ backgroundColor: '#ffffff', height: '2px', width: '22px', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{ backgroundColor: '#0B1220', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="md:hidden px-6 pb-6 pt-2 flex flex-col"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.8)',
                  fontSize: '15px',
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: isActive ? '2px solid #1A6EF0' : '2px solid transparent',
                  paddingLeft: '12px',
                  transition: 'color 0.2s',
                }}
                className="hover:text-white py-2 block min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            );
          })}
          {/* Apply button — commented out */}
          {/* <Link
            href="/apply"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: '#1A6EF0',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 22px',
              borderRadius: '9999px',
              textAlign: 'center',
              marginTop: '12px',
              display: 'block',
            }}
          >
            Apply
          </Link> */}
        </div>
      )}
    </nav>
  );
}