"use client";

import { useState } from "react";

// Athletes Elevated brand colors
// navy: #092866  |  navy-dark: #071c4a  |  blue: #52aafc  |  blue-strong: #146FF8
// Font: Montserrat (ideally loaded once via next/font in your root layout;
// the inline fontFamily here is just a safety net for this component in isolation).

const NAV_LINKS = [
  { label: "Athletes", href: "/storefront/picabo" },
  { label: "Brands", href: "/storefront/teebox" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[#eeeeee] bg-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <a href="/" className="text-lg font-extrabold tracking-wide text-[#092866]">
          ATHLETES <span className="text-[#146FF8]">ELEVATED</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wider text-[#092866] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#146FF8]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden items-center gap-5 text-[#092866] md:flex">
          <button aria-label="Search" type="button">
            <SearchIcon />
          </button>
          <button aria-label="Account" type="button">
            <UserIcon />
          </button>
          <button aria-label="Bag" type="button">
            <BagIcon />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex items-center justify-center md:hidden"
          aria-label="Menu"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#eeeeee] bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider text-[#092866]">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex gap-5 text-[#092866]">
            <SearchIcon />
            <UserIcon />
            <BagIcon />
          </div>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function MenuIcon({ open = false }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}