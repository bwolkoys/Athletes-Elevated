"use client";

/**
 * Athletes Elevated — "What [Athlete] Uses" product carousel
 * Place at:  app/athletes/[slug]/ProductCarousel.tsx
 *
 * Shows one product at a time from the athlete's linked Products in Airtable.
 * Auto-advances every few seconds and pauses while hovered or focused.
 * Content per slide comes from these Products columns:
 *   Image · Name · Brand · Why I Use It · Story Link · Product Link
 */

import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../lib/athletes";

const NAVY = "#092866";
const ROYAL = "#006aac";
const CHARCOAL = "#231f20";
const AUTO_ADVANCE_MS = 6000;

export default function ProductCarousel({
  products,
  firstName,
  storeHref,
}: {
  products: Product[];
  firstName: string;
  storeHref: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = products.length;

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [count, paused]);

  if (count === 0) {
    return (
      <div className="grid overflow-hidden border border-dashed border-[#c2c2c2] bg-white md:grid-cols-[0.9fr_1.1fr]">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[320px]">
          <PhotoPlaceholder />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#092866]/35">Featured now</p>
          <h3 className="mt-2 text-xl font-extrabold text-[#092866]/30">Products coming soon</h3>
          <p className="mt-3 text-sm text-[#092866]/40">
            {firstName}&apos;s go-to gear will show up here as it&apos;s added.
          </p>
        </div>
      </div>
    );
  }

  const p = products[index];
  const productHref = p.href || storeHref;
  const ext = (h: string) => (/^https?:\/\//.test(h) ? { target: "_blank", rel: "noopener noreferrer" } : {});

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={`What ${firstName} uses`}
    >
      <style>{`
        @keyframes pc-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .pc-fade { animation: pc-fade .45s ease both; }
        @media (prefers-reduced-motion: reduce) { .pc-fade { animation: none; } }
      `}</style>

      <article
        key={index}
        className="pc-fade grid overflow-hidden border border-[#c2c2c2]/80 bg-white md:grid-cols-[0.9fr_1.1fr]"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${count}`}
      >
        <a href={productHref} {...ext(productHref)} className="relative block aspect-[4/3] overflow-hidden bg-[#eef4fb] md:aspect-auto md:min-h-[320px]">
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <PhotoPlaceholder />
          )}
        </a>

        <div className="flex flex-col p-6 md:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em]" style={{ color: ROYAL }}>
            Featured now · {index + 1} of {count}
          </p>
          <h3 className="mt-2 text-xl font-extrabold leading-tight md:text-2xl" style={{ color: NAVY }}>
            {p.name}
          </h3>
          {p.brand && (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: `${CHARCOAL}99` }}>
              {p.brand}
            </p>
          )}
          {p.blurb && (
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: `${CHARCOAL}cc` }}>
              {p.blurb}
            </p>
          )}

          <div className="mt-auto border-t border-[#c2c2c2]/60 pt-5">
            {p.storyHref && (
              <a
                href={p.storyHref}
                {...ext(p.storyHref)}
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] underline-offset-4 hover:underline"
                style={{ color: NAVY }}
              >
                Read the full story <span aria-hidden>→</span>
              </a>
            )}
            <a
              href={productHref}
              {...ext(productHref)}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold hover:underline"
              style={{ color: ROYAL }}
            >
              View product on the store <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </article>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {products.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show product ${i + 1}`}
                aria-current={i === index}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === index ? 22 : 6, backgroundColor: i === index ? NAVY : "#c2c2c2" }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs sm:inline" style={{ color: `${CHARCOAL}80` }}>
              {paused ? "Paused" : "Auto-advances · hover to pause"}
            </span>
            <ArrowButton dir="prev" onClick={() => go(index - 1)} />
            <ArrowButton dir="next" onClick={() => go(index + 1)} />
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous product" : "Next product"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#092866]/30 bg-white transition hover:border-[#092866] hover:bg-[#092866] hover:text-white"
      style={{ color: NAVY }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {dir === "prev" ? <path d="M9 2 4 7l5 5" /> : <path d="m5 2 5 5-5 5" />}
      </svg>
    </button>
  );
}

function PhotoPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#eef4fb] to-[#dbe6f3] text-[#092866]/35">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
        Product photo
      </span>
    </div>
  );
}
