'use client';
 
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CTA } from '../lib/uxContent';
 
const NAV_LINKS = [
  ['Ecosystem',    '/ecosystem'],
  ['For Athletes', '/athletes'],
  ['For Brands',   '/brands'],
  ['For Fans',     '/fans'],
];
 
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  useEffect(() => {
    const id = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);
 
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
 
  return (
    <>
      <style>{`
        .nav-lnk::after {
          content:''; position:absolute; left:0; bottom:-2px;
          width:0; height:2px; background:#52aafc;
          transition:width .3s ease;
        }

        .nav-lnk:hover::after,
        .nav-lnk.active::after {
          width:100%;
        }
 
        @keyframes menu-slide-down {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @keyframes menu-item-in {
          from { opacity:0; transform:translateX(-16px); }
          to   { opacity:1; transform:translateX(0); }
        }

        .menu-panel {
          animation: menu-slide-down .25s ease both;
        }

        .menu-item {
          animation: menu-item-in .3s ease both;
        }
 
        .bar {
          display:block;
          width:22px;
          height:2px;
          border-radius:2px;
          transition:transform .3s ease, opacity .3s ease, background .3s ease;
          transform-origin:center;
        }

        .bar-top.open {
          transform:translateY(7px) rotate(45deg);
        }

        .bar-mid.open {
          opacity:0;
          transform:scaleX(0);
        }

        .bar-bot.open {
          transform:translateY(-7px) rotate(-45deg);
        }
      `}</style>
 
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
          scrolled || menuOpen
            ? 'bg-[#092866]/97 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => setMenuOpen(false)}
            aria-label="Athletes Elevated home"
          >
            <Image
              src="/brand/athletes-elevated-color-reverse.svg"
              alt="Athletes Elevated"
              width={1200}
              height={355}
              priority
              className="h-auto w-[158px] sm:w-[176px] lg:w-[190px]"
            />
          </Link>
 
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(([l, h]) => (
              <li key={l}>
                <Link
                  href={h}
                  className={`nav-lnk relative px-1 py-3 text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    pathname === h
                      ? 'active text-[#52aafc]'
                      : scrolled || menuOpen
                        ? 'text-white/75 hover:text-white'
                        : 'text-white hover:text-white'
                  }`}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/athletes"
              className="border border-[#52aafc]/45 bg-[#52aafc] px-4 py-2.5 font-[family-name:var(--font-barlow)] text-[12px] font-bold uppercase tracking-[0.14em] text-[#071936] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(82,170,252,.28)]"
            >
              {CTA.applyAthlete}
            </Link>
          </div>
 
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex -mr-2 flex-col justify-center gap-[5px] p-2 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`bar bar-top ${menuOpen ? 'open' : ''}`}
              style={{ background: scrolled || menuOpen ? '#fff' : '#092866' }}
            />
            <span
              className={`bar bar-mid ${menuOpen ? 'open' : ''}`}
              style={{ background: scrolled || menuOpen ? '#fff' : '#092866' }}
            />
            <span
              className={`bar bar-bot ${menuOpen ? 'open' : ''}`}
              style={{ background: scrolled || menuOpen ? '#fff' : '#092866' }}
            />
          </button>
        </div>
 
        {menuOpen && (
          <div className="menu-panel border-t border-white/10 bg-[#092866] px-6 pb-8 pt-4 md:hidden">
            <ul className="mb-6 space-y-0">
              {NAV_LINKS.map(([l, h], i) => (
                <li
                  key={l}
                  className="menu-item border-b border-white/10 last:border-b-0"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link
                    href={h}
                    className={`flex items-center justify-between py-4 font-[family-name:var(--font-barlow)] text-[18px] font-bold uppercase tracking-[0.05em] transition-colors ${
                      pathname === h
                        ? 'text-[#52aafc]'
                        : 'text-white hover:text-[#52aafc]'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l}

                    {pathname === h ? (
                      <span className="h-2 w-2 rounded-full bg-[#52aafc]" />
                    ) : (
                      <span className="text-white/72 text-[16px]">→</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/athletes"
              className="flex items-center justify-center bg-[#52aafc] px-5 py-4 font-[family-name:var(--font-barlow)] text-[14px] font-bold uppercase tracking-[0.14em] text-[#071936]"
              onClick={() => setMenuOpen(false)}
            >
              {CTA.applyAthlete}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
