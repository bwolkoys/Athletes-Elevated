import Link from "next/link";
import type { Product } from "../lib/uxContent";
import StatusChip from "./statusChip";

export default function ProductCard({ product }: { product: Product }) {
  const isExternal = product.href.startsWith("http");

  const content = (
    <>
      <div className="min-h-[104px]">
        <div className="flex min-h-8 items-center justify-between gap-3">
          <span
            className="block max-w-[220px] truncate whitespace-nowrap text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#52aafc]"
            title={product.category}
          >
            {product.category}
          </span>
          <StatusChip status={product.status} tone="light" />
        </div>

        <h3 className="mt-4 font-(family-name:--font-barlow) text-[clamp(26px,2vw,32px)] font-extrabold uppercase leading-[0.95] text-[#092866]">
          {product.name}
        </h3>
      </div>

      <p className="mt-1 min-h-6 text-[15px] font-semibold leading-snug text-[#092866]/72">
        {product.audience}
      </p>

      <p className="mt-5 min-h-[128px] text-[17px] font-normal leading-[1.68] text-[#092866]/76">
        {product.summary}
      </p>

      <div className="mt-6 flex min-h-[76px] content-start flex-wrap gap-2">
        {product.features.map((feature) => (
          <span
            key={feature}
            className="h-fit whitespace-nowrap border border-[#092866]/10 bg-[#092866]/[.03] px-3 py-1.5 text-[11px] font-medium text-[#092866]/72"
          >
            {feature}
          </span>
        ))}
      </div>

      <span className="mt-auto flex w-full items-center justify-between border-t border-[#52aafc]/35 pt-7 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
        <span className="truncate pr-4">{product.ctaLabel}</span>
        <span aria-hidden="true">→</span>
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className="portal-card sr relative flex h-full min-h-[444px] flex-col overflow-hidden bg-white p-7 text-[#092866]"
      >
        <div className="portal-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
        {content}
      </a>
    );
  }

  return (
    <Link
      href={product.href}
      className="portal-card sr relative flex h-full min-h-[444px] flex-col overflow-hidden bg-white p-7 text-[#092866]"
    >
      <div className="portal-line absolute left-0 top-0 h-0.5 w-full bg-[#52aafc]" />
      {content}
    </Link>
  );
}
