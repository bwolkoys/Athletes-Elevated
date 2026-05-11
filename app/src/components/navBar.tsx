'use client';
 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
 
const NAV_LINKS = [
  ['For Athletes', '/athletes'],
  ['Ecosystem',    '/ecosystem'],
  ['For Brands',   '/brands'],
  ['For Fans',     '/fans'],
];
 
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  // close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);
 
  // prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
 
  return (
    <>
      <style>{`
        .nav-lnk::after {
          content:''; position:absolute; left:0; bottom:-2px;
          width:0; height:2px; background:#52aafc;
          transition:width .3s ease;
        }
        .nav-lnk:hover::after, .nav-lnk.active::after { width:100%; }
 
        @keyframes menu-slide-down {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes menu-item-in {
          from { opacity:0; transform:translateX(-16px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .menu-panel { animation: menu-slide-down .25s ease both; }
        .menu-item  { animation: menu-item-in .3s ease both; }
 
        /* hamburger lines */
        .bar {
          display:block; width:22px; height:2px;
          background:#092866; border-radius:2px;
          transition:transform .3s ease, opacity .3s ease;
          transform-origin:center;
        }
        .bar-top.open    { transform:translateY(7px) rotate(45deg); }
        .bar-mid.open    { opacity:0; transform:scaleX(0); }
        .bar-bot.open    { transform:translateY(-7px) rotate(-45deg); }
      `}</style>
 
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled || menuOpen
          ? 'bg-white/97 backdrop-blur-xl shadow-[0_1px_0_rgba(9,40,102,.08)]'
          : 'bg-transparent'
      }`}>
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-6 md:px-12">
 
          {/* Wordmark */}
          <Link href="/"
            className="font-[family-name:var(--font-barlow)] text-[21px] font-extrabold uppercase tracking-[0.06em] text-[#092866]"
            onClick={() => setMenuOpen(false)}>
            ATHLETES <span className="text-[#52aafc]">ELEVATED</span>
          </Link>
 
          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(([l, h]) => (
              <li key={l}>
                <Link href={h}
                  className={`nav-lnk relative text-[12px] font-medium uppercase tracking-[0.1em] transition-colors ${
                    pathname === h ? 'active text-[#52aafc]' : 'text-[#092866]/50 hover:text-[#092866]'
                  }`}>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
 
          {/* Desktop CTA */}
          {/* <Link href="/athletes"
            className="hidden md:inline-flex items-center gap-2 bg-[#52aafc] px-5 py-[10px] font-[family-name:var(--font-barlow)] text-[13px] font-bold uppercase tracking-[0.1em] text-[#06080f] transition-all hover:-translate-y-px hover:bg-[#7dc0fd] hover:shadow-[0_4px_16px_rgba(82,170,252,.4)]">
            Get Involved
          </Link> */}
 
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex md:hidden flex-col justify-center gap-[5px] p-2 -mr-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}>
            <span className={`bar bar-top ${menuOpen ? 'open' : ''}`} />
            <span className={`bar bar-mid ${menuOpen ? 'open' : ''}`} />
            <span className={`bar bar-bot ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
 
        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="menu-panel md:hidden bg-white border-t border-[#092866]/8 px-6 pb-8 pt-4">
 
            {/* Links */}
            <ul className="mb-6 space-y-0">
              {NAV_LINKS.map(([l, h], i) => (
                <li key={l} className="menu-item border-b border-[#092866]/8 last:border-b-0"
                  style={{animationDelay:`${i*50}ms`}}>
                  <Link href={h}
                    className={`flex items-center justify-between py-4 font-[family-name:var(--font-barlow)] text-[18px] font-bold uppercase tracking-[0.05em] transition-colors ${
                      pathname === h ? 'text-[#52aafc]' : 'text-[#092866] hover:text-[#52aafc]'
                    }`}
                    onClick={() => setMenuOpen(false)}>
                    {l}
                    {pathname === h
                      ? <span className="h-2 w-2 rounded-full bg-[#52aafc]" />
                      : <span className="text-[#092866]/25 text-[16px]">→</span>
                    }
                  </Link>
                </li>
              ))}
            </ul>
 
            {/* Mobile CTA */}
            {/* <Link href="/athletes"
              className="menu-item flex items-center justify-center gap-2 bg-[#52aafc] px-6 py-4 font-[family-name:var(--font-barlow)] text-[14px] font-bold uppercase tracking-[0.1em] text-[#06080f] transition-all active:scale-[.98]"
              style={{animationDelay:'250ms'}}
              onClick={() => setMenuOpen(false)}>
              Get Involved →
            </Link> */}
 
            {/* Social quick links */}
            {/* <div className="menu-item mt-6 flex items-center gap-4" style={{animationDelay:'300ms'}}>
              {[
                ['IG', 'https://instagram.com'],
                ['TT', 'https://tiktok.com'],
                ['YT', 'https://youtube.com'],
                ['X',  'https://twitter.com'],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-[#092866]/12 font-[family-name:var(--font-barlow)] text-[11px] font-bold text-[#092866]/40 transition-colors hover:border-[#52aafc] hover:text-[#52aafc]">
                  {label}
                </a>
              ))}
              <span className="ml-auto text-[11px] font-light text-[#092866]/28">@athleteselevated</span>
            </div> */}
          </div>
        )}
      </nav>
    </>
  );
}