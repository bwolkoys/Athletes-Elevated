// Place this file at: src/components/navBar.tsx
'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [

];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{ backgroundColor: '#080F1C', borderBottom: '1px solid rgba(255,255,255,0.18)', position: 'relative' }}
      className="fixed top-0 left-0 right-0 z-50 w-full h-16"
    >
      {/* Logo — centered in the full nav width so hamburger doesn't affect it */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <Link href="/" className="select-none" style={{ pointerEvents: 'auto' }}>
          <Image
            src="/AthletesElevated_Final_color reverse.svg"
            alt="Athletes Elevated"
            width={180}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>
      </div>
    </nav>
  );
}