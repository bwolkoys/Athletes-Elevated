import Link from 'next/link';
import Image from "next/image";

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Connection', href: '/connection' },
  { label: 'Opportunity', href: '/opportunity' },
  { label: 'Storytelling', href: '/storytelling' },
  { label: 'Apply', href: '/apply' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080F1C' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Left column — Logo + tagline + blurb */}
          <div className="flex flex-col gap-5">

          <Link href="/" className="flex items-center select-none">
  <Image
    src="/AthletesElevated_Final_color reverse.svg"
    alt="Athletes Elevated"
    width={190}
    height={50}
    priority
    className="h-10 w-auto"
  />
</Link>

            {/* Tagline badge — Montserrat */}
            <p
              style={{
                fontFamily: 'var(--font-label)',
                color: '#4E9AF5',
                fontSize: '9px',
                letterSpacing: '0.14em',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
            >
              Invite-Only Network · Athlete-First Access
            </p>

            {/* Heading + blurb */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  fontSize: '24px',
                  lineHeight: '1.2',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                }}
              >
                Performance Meets<br />Purpose.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '13px',
                  marginTop: '10px',
                  lineHeight: '1.65',
                  fontWeight: 300,
                }}
              >
                Transforming performance into purpose and influence into impact.
              </p>
            </div>
          </div>

          {/* Middle column — Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-label)',
                color: '#4E9AF5',
                fontSize: '11px',
                letterSpacing: '0.16em',
                fontWeight: 600,
                textTransform: 'uppercase',
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
                      color: 'rgba(255,255,255,0.6)',
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
                  color: 'rgba(255,255,255,0.6)',
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
                  color: 'rgba(255,255,255,0.6)',
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
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '48px', paddingTop: '20px' }}
          className="flex items-center justify-center md:justify-start"
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.3)',
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

// import Link from 'next/link';
 
// const footerLinks = [
//   { label: 'Home', href: '/' },
//   { label: 'About', href: '/about' },
//   { label: 'Connection', href: '/connection' },
//   { label: 'Opportunity', href: '/opportunity' },
//   { label: 'Storytelling', href: '/storytelling' },
//   { label: 'Apply', href: '/apply' },
// ];
 
// export default function Footer() {
//   return (
//     <footer style={{ backgroundColor: '#080F1C' }}>
//       <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
 
//           {/* Left column — Logo + tagline + performance blurb */}
//           <div className="flex flex-col gap-5">
//             {/* Logo */}
//             <Link href="/" className="flex flex-col leading-none select-none w-fit">
//               <span
//                 style={{ color: '#ffffff', letterSpacing: '0.18em', fontSize: '10px' }}
//                 className="font-light tracking-widest uppercase"
//               >
//                 Athletes
//               </span>
//               <span
//                 style={{ color: '#ffffff', letterSpacing: '0.18em', fontSize: '13px' }}
//                 className="font-extrabold tracking-widest uppercase"
//               >
//                 Elevated
//               </span>
//             </Link>
 
//             {/* Tagline badge */}
//             <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', letterSpacing: '0.12em' }} className="uppercase tracking-widest">
//               Invite-Only Network · Athlete-First Access
//             </p>
 
//             {/* Hero text */}
//             <div>
//               <h3 style={{ color: '#ffffff', fontSize: '22px', lineHeight: '1.25', fontWeight: '700' }}>
//                 Performance Meets<br />Purpose.
//               </h3>
//               <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '10px', lineHeight: '1.6' }}>
//                 Transforming performance into purpose and influence into impact.
//               </p>
//             </div>
//           </div>
 
//           {/* Middle column — Links */}
//           <div>
//             <h4
//               style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.16em' }}
//               className="uppercase tracking-widest mb-5"
//             >
//               Links
//             </h4>
//             <ul className="flex flex-col gap-3">
//               {footerLinks.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}
//                     className="hover:text-white transition-colors duration-200 py-1 block min-h-[36px] flex items-center"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
 
//           {/* Right column — Contact */}
//           <div>
//             <h4
//               style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.16em' }}
//               className="uppercase tracking-widest mb-5"
//             >
//               Contact Info
//             </h4>
//             <div className="flex flex-col gap-3">
//               <a
//                 href="mailto:info@athleteselevated.com"
//                 style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}
//                 className="hover:text-white transition-colors duration-200"
//               >
//                 info@athleteselevated.com
//               </a>
//               <address style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontStyle: 'normal', lineHeight: '1.6' }}>
//                 1417 N. Magnolia Ave.<br />
//                 Ocala, FL 34475
//               </address>
//             </div>
//           </div>
//         </div>
 
//         {/* Bottom bar */}
//         <div
//           style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '48px', paddingTop: '20px' }}
//           className="flex flex-col md:flex-row items-center justify-between gap-3"
//         >
//           <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
//             © 2026 Athletes Elevated. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }