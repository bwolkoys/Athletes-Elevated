'use client';


import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Connection', href: '/connection' },
  { label: 'Opportunity', href: '/opportunity' },
  { label: 'Storytelling', href: '/storytelling' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{ backgroundColor: '#080F1C', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

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

        {/* Desktop nav links — DM Sans */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Apply button — DM Sans SemiBold */}
        <div className="hidden md:block">
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
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '15px',
                fontWeight: 400,
              }}
              className="hover:text-white transition-colors py-2 block min-h-[44px] flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <Link
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
          </Link>
        </div>
      )}
    </nav>
  );
}

// 'use client';
 
// import { useState } from 'react';
// import Link from 'next/link';
 
// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
 
//   const navLinks = [
//     { label: 'Home', href: '/' },
//     { label: 'Connection', href: '/connection' },
//     { label: 'Opportunity', href: '/opportunity' },
//     { label: 'Storytelling', href: '/storytelling' },
//     { label: 'About', href: '/about' },
//   ];
 
//   return (
//     <nav
//       style={{
//         backgroundColor: '#0B1220',
//         borderBottom: '1px solid rgba(255,255,255,0.06)',
//       }}
//       className="fixed top-0 left-0 right-0 z-50 w-full"
//     >
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
 
//         {/* Logo */}
//         <Link href="/" className="flex flex-col leading-none select-none">
//           <span
//             style={{ color: '#ffffff', letterSpacing: '0.15em', fontSize: '10px' }}
//             className="font-light tracking-widest uppercase"
//           >
//             Athletes
//           </span>
//           <span
//             style={{ color: '#ffffff', letterSpacing: '0.15em', fontSize: '13px' }}
//             className="font-extrabold tracking-widest uppercase"
//           >
//             Elevated
//           </span>
//         </Link>
 
//         {/* Desktop nav links */}
//         <ul className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}
//                 className="hover:text-white transition-colors duration-200 tracking-wide"
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
 
//         {/* Apply button */}
//         <div className="hidden md:flex items-center gap-3">
//           <Link
//             href="/apply"
//             style={{
//               backgroundColor: '#1A6EF0',
//               color: '#ffffff',
//               fontSize: '13px',
//               padding: '8px 22px',
//               borderRadius: '9999px',
//               fontWeight: '600',
//               letterSpacing: '0.03em',
//               transition: 'background-color 0.2s',
//             }}
//             className="hover:opacity-90"
//           >
//             Apply
//           </Link>
//         </div>
 
//         {/* Mobile hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
//           aria-label="Toggle menu"
//         >
//           <span
//             style={{ backgroundColor: '#ffffff', height: '2px', width: '22px', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
//           />
//           <span
//             style={{ backgroundColor: '#ffffff', height: '2px', width: '22px', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }}
//           />
//           <span
//             style={{ backgroundColor: '#ffffff', height: '2px', width: '22px', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}
//           />
//         </button>
//       </div>
 
//       {/* Mobile menu */}
//       {menuOpen && (
//         <div
//           style={{ backgroundColor: '#0B1220', borderTop: '1px solid rgba(255,255,255,0.08)' }}
//           className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-4"
//         >
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}
//               className="hover:text-white transition-colors py-2 block min-h-[44px] flex items-center"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <Link
//             href="/apply"
//             onClick={() => setMenuOpen(false)}
//             style={{
//               backgroundColor: '#1A6EF0',
//               color: '#ffffff',
//               fontSize: '14px',
//               padding: '10px 22px',
//               borderRadius: '9999px',
//               fontWeight: '600',
//               textAlign: 'center',
//               marginTop: '8px',
//             }}
//           >
//             Apply
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }