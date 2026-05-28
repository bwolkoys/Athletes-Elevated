import type { ProductStatus } from "../lib/uxContent";

const STATUS_STYLES: Record<ProductStatus, string> = {
  Live: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  Private: "border-[#52aafc]/45 bg-[#52aafc]/10 text-[#52aafc]",
  "Invite-only": "border-[#52aafc]/45 bg-[#52aafc]/10 text-[#52aafc]",
  "In production": "border-amber-300/45 bg-amber-300/10 text-amber-200",
  "Coming soon": "border-white/30 bg-white/8 text-white/75",
  "Internal system": "border-slate-300/30 bg-white/8 text-slate-200",
};

export default function StatusChip({
  status,
  tone = "dark",
}: {
  status: ProductStatus;
  tone?: "dark" | "light";
}) {
  const lightStyle: Record<ProductStatus, string> = {
    Live: "border-emerald-500/30 bg-emerald-50 text-emerald-700",
    Private: "border-[#52aafc]/40 bg-[#52aafc]/10 text-[#0f62aa]",
    "Invite-only": "border-[#52aafc]/40 bg-[#52aafc]/10 text-[#0f62aa]",
    "In production": "border-[#f2a51a]/55 bg-[#fff6df] text-[#b85200]",
    "Coming soon": "border-[#092866]/15 bg-[#092866]/5 text-[#092866]/65",
    "Internal system": "border-[#092866]/15 bg-[#092866]/5 text-[#092866]/65",
  };

  return (
    <span
      className={`inline-flex h-7 w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 font-(family-name:--font-barlow) text-[11px] font-extrabold uppercase leading-none tracking-[0.12em] ${
        tone === "light" ? lightStyle[status] : STATUS_STYLES[status]
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
