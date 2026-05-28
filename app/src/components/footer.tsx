import Link from "next/link";
import Image from "next/image";
import { CTA } from "../lib/uxContent";

const FOOTER_LINKS = [
  ["Ecosystem", "/ecosystem"],
  ["For Athletes", "/athletes"],
  ["For Brands", "/brands"],
  ["For Fans", "/fans"],
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "YouTube", href: "#", icon: "youtube" },
];

const LEGAL_LINKS = [
  ["Privacy", "/privacy"],
  ["Terms & Conditions", "/terms"],
];

function SocialIcon({ name }: { name: string }) {
  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M6.8 9.4V18H4.2V9.4h2.6ZM5.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5.4 3.4.1 1.2c.6-.9 1.6-1.4 2.9-1.4 2.1 0 3.6 1.4 3.6 4.3V18h-2.6v-4.1c0-1.4-.6-2.2-1.8-2.2-1.1 0-1.8.7-1.8 2.1V18H8.7V9.4h2.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M21 8.3a3 3 0 0 0-2.1-2.1C17 5.7 12 5.7 12 5.7s-5 0-6.9.5A3 3 0 0 0 3 8.3 31 31 0 0 0 2.5 12c0 1.2.1 2.5.5 3.7a3 3 0 0 0 2.1 2.1c1.9.5 6.9.5 6.9.5s5 0 6.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.5-2.5.5-3.7s-.1-2.5-.5-3.7ZM10.2 15.1V8.9l5.4 3.1-5.4 3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#092866] px-6 pb-10 pt-20 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="max-w-[420px]">
            <Link href="/" className="mb-5 inline-flex" aria-label="Athletes Elevated home">
              <Image
                src="/brand/athletes-elevated-color-reverse-display.svg"
                alt="Athletes Elevated"
                width={868}
                height={264}
                className="h-auto w-[220px] sm:w-[240px]"
              />
            </Link>
            <p className="max-w-80 text-[17px] font-normal leading-[1.72] text-white/78">
              Athlete media, marketplace tools, youth sports infrastructure,
              and brand relationships connected through one purpose-built
              ecosystem.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h2 className="mb-5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.22em] text-[#52aafc]">
                Site
              </h2>
              <nav className="flex flex-col items-start gap-3" aria-label="Footer navigation">
                {FOOTER_LINKS.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-[14px] font-semibold uppercase tracking-[0.12em] text-white/78 transition-colors hover:text-[#52aafc]"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="mb-5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.22em] text-[#52aafc]">
                Social
              </h2>
              <div className="flex flex-col items-start gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-disabled={href === "#"}
                    className="group inline-flex items-center gap-3 text-[14px] font-semibold uppercase tracking-[0.12em] text-white/78 transition-colors hover:text-[#52aafc]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center border border-white/12 text-white/72 transition-colors group-hover:border-[#52aafc]/50 group-hover:text-[#52aafc]">
                      <SocialIcon name={icon} />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.22em] text-[#52aafc]">
                Legal
              </h2>
              <div className="flex flex-col items-start gap-3">
                {LEGAL_LINKS.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-[14px] font-semibold uppercase tracking-[0.12em] text-white/78 transition-colors hover:text-[#52aafc]"
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/brands"
                  className="mt-3 border border-[#52aafc]/40 px-5 py-3 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.14em] text-[#52aafc] transition hover:bg-[#52aafc] hover:text-[#071936]"
                >
                  {CTA.partner}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[14px] text-white/72">
            © 2026 Athletes Elevated. All rights reserved.
          </p>
          <p className="text-[14px] italic text-white/72">
            Performance meets purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
