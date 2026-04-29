'use client';

import Link from 'next/link';

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        inline-flex w-full items-center justify-center gap-2 bg-[#52aafc] px-8 py-4
        text-center text-[13px] font-semibold uppercase tracking-[0.1em] text-[#092866]
        transition-all duration-200 sm:w-auto
        hover:-translate-y-0.5 hover:bg-[#7dc0fd] hover:shadow-[0_8px_24px_rgba(82,170,252,0.35)]
        active:translate-y-0 active:shadow-none
      "
    >
      {children}
    </Link>
  );
}

function OutlineButton({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="
        inline-flex w-full items-center justify-center gap-2 border border-white/25 px-8 py-3.5
        text-center text-[13px] font-medium uppercase tracking-[0.1em] text-white
        transition-all duration-200 sm:w-auto
        hover:border-[#52aafc] hover:bg-[#52aafc]/8 hover:text-[#52aafc]
      "
    >
      {children}
    </Link>
  );
}

const stats = [
  ['3', 'Nonprofits Supported'],
  ['100%', 'Donations Pass-Through'],
  ['2026', 'Big Things Coming'],
];

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes orb-drift-1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(40px, -30px) scale(1.08); }
          66%  { transform: translate(-20px, 20px) scale(0.96); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes orb-drift-2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-50px, 30px) scale(1.06); }
          70%  { transform: translate(25px, -15px) scale(0.94); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes beam-slide {
          0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(300%) skewX(-15deg); opacity: 0; }
        }

        @keyframes ring-pulse {
          0%   { transform: scale(0.92); opacity: 0.5; }
          50%  { transform: scale(1.06); opacity: 0.15; }
          100% { transform: scale(0.92); opacity: 0.5; }
        }

        @keyframes ring-pulse-2 {
          0%   { transform: scale(1); opacity: 0.25; }
          50%  { transform: scale(1.12); opacity: 0.08; }
          100% { transform: scale(1); opacity: 0.25; }
        }

        @keyframes fade-up-1 {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up-2 {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up-3 {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up-4 {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes stat-slide {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes line-grow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        @keyframes float-dot {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50%      { transform: translateY(-12px); opacity: 1; }
        }

        .hero-eyebrow { opacity: 0; animation: fade-up-1 0.7s ease 0.2s forwards; }
        .hero-h1 { opacity: 0; animation: fade-up-2 0.8s ease 0.45s forwards; }
        .hero-body { opacity: 0; animation: fade-up-3 0.7s ease 0.7s forwards; }
        .hero-actions { opacity: 0; animation: fade-up-4 0.7s ease 0.9s forwards; }

        .stat-item-0 { opacity: 0; animation: stat-slide 0.6s ease 1.0s forwards; }
        .stat-item-1 { opacity: 0; animation: stat-slide 0.6s ease 1.15s forwards; }
        .stat-item-2 { opacity: 0; animation: stat-slide 0.6s ease 1.3s forwards; }

        .hero-beam {
          animation: beam-slide 5s ease-in-out 1.5s infinite;
        }
      `}</style>

      <section
        className="relative grid min-h-screen items-center overflow-hidden pt-18 lg:grid-cols-2"
        style={{
          background:
            'linear-gradient(135deg, #061a42 0%, #092866 45%, #0d3b8c 100%)',
        }}
      >
        {/* Mobile-safe animated orbs */}
        <div
          className="
            pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full
            sm:right-[5%] sm:top-[10%] sm:h-[520px] sm:w-[520px]
          "
          style={{
            background:
              'radial-gradient(circle, rgba(82,170,252,0.13) 0%, transparent 70%)',
            animation: 'orb-drift-1 14s ease-in-out infinite',
          }}
        />

        <div
          className="
            pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full
            sm:bottom-[5%] sm:left-[30%] sm:h-[380px] sm:w-[380px]
          "
          style={{
            background:
              'radial-gradient(circle, rgba(82,170,252,0.09) 0%, transparent 70%)',
            animation: 'orb-drift-2 18s ease-in-out infinite',
          }}
        />

        <div
          className="
            pointer-events-none absolute left-[-80px] top-[55%] hidden h-[260px] w-[260px] rounded-full
            sm:block
          "
          style={{
            background:
              'radial-gradient(circle, rgba(0,106,172,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Sweeping beam */}
        <div
          className="hero-beam pointer-events-none absolute inset-y-0 hidden sm:block"
          style={{
            left: 0,
            width: '35%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(82,170,252,0.04) 50%, transparent 100%)',
          }}
        />

        {/* Dot grid hidden on mobile */}
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.18] sm:block"
          style={{
            backgroundImage:
              'radial-gradient(rgba(82,170,252,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Left: copy */}
        <div className="relative z-10 px-5 pb-8 pt-12 sm:px-[8vw] sm:py-16 lg:pr-[5vw]">
          <div className="hero-eyebrow mb-5 inline-flex max-w-full items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#52aafc] sm:mb-6 sm:gap-2.5 sm:text-[11px] sm:tracking-[0.22em]">
            <span className="h-[3px] w-6 shrink-0 bg-[#52aafc] sm:w-8" />
            <span className="leading-tight">
              Built for Athletes. Powered by Purpose.
            </span>
          </div>

          <h1 className="hero-h1 font-[family-name:var(--font-barlow)] mb-6 max-w-full text-[clamp(43px,13vw,108px)] font-extrabold uppercase leading-[0.94] tracking-[0.005em] text-white sm:mb-7 sm:leading-[0.92]">
            Performance
            <span
              className="block text-[#52aafc]"
              style={{ textShadow: '0 0 60px rgba(82,170,252,0.35)' }}
            >
              meets purpose.
            </span>
          </h1>

          <p className="hero-body mb-8 max-w-[460px] text-[15px] font-light leading-[1.65] text-white/65 sm:mb-10 sm:text-lg sm:leading-[1.65]">
            Athletes Elevated supports the people behind the results —
            connecting athletes, brands, and communities around shared values of
            integrity, impact, and growth.
          </p>

          <div className="hero-actions flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <PrimaryButton href="#newsletter">Join The List</PrimaryButton>
            <OutlineButton
              href="https://www.wixforms.com/f/7396687400686060560"
              external
            >
              Partner With Us
            </OutlineButton>
          </div>
        </div>

        {/* Right: stats */}
        <div className="relative z-10 px-5 pb-12 sm:px-[8vw] lg:flex lg:items-center lg:justify-center lg:px-[8vw] lg:py-15 lg:pr-0">
          {/* Mobile/tablet stats */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:hidden">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="border border-[#52aafc]/20 bg-white/[0.05] px-5 py-5"
              >
                <span className="font-[family-name:var(--font-barlow)] block text-[36px] font-extrabold leading-none tracking-tight text-[#52aafc]">
                  {value}
                </span>
                <span className="mt-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop stats */}
          <div className="relative hidden lg:block">
            <div
              className="pointer-events-none absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                height: 320,
                borderRadius: '50%',
                border: '1px solid rgba(82,170,252,0.18)',
                animation: 'ring-pulse 4s ease-in-out infinite',
              }}
            />

            <div
              className="pointer-events-none absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 440,
                height: 440,
                borderRadius: '50%',
                border: '1px solid rgba(82,170,252,0.09)',
                animation: 'ring-pulse-2 4s ease-in-out 0.8s infinite',
              }}
            />

            <div
              className="absolute left-0 top-0 h-full w-[3px] origin-top bg-[#52aafc]"
              style={{ animation: 'line-grow 0.8s ease 1s both' }}
            />

            <div className="flex flex-col">
              {stats.map(([value, label], i) => (
                <div
                  key={label}
                  className={`stat-item-${i} group relative border-b border-[#52aafc]/12 last:border-b-0`}
                >
                  <div
                    className="
                      w-72 bg-white/[0.03] py-8 pl-10 pr-8
                      transition-all duration-300
                      hover:bg-[#52aafc]/10 hover:pl-12
                    "
                  >
                    <div
                      className="mb-3 h-1.5 w-1.5 rounded-full bg-[#52aafc]"
                      style={{
                        animation: `float-dot ${
                          2.5 + i * 0.4
                        }s ease-in-out ${i * 0.3}s infinite`,
                      }}
                    />

                    <span
                      className="font-[family-name:var(--font-barlow)] block text-[56px] font-extrabold leading-none tracking-tight text-[#52aafc] transition-all duration-300 group-hover:text-white"
                      style={{
                        textShadow: '0 0 40px rgba(82,170,252,0.2)',
                      }}
                    >
                      {value}
                    </span>

                    <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 group-hover:text-white/65">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}