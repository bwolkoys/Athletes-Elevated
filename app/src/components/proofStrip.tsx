import { PROOF_POINTS } from "../lib/uxContent";

export default function ProofStrip({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const isDark = tone === "dark";

  return (
    <div
      className={`grid grid-cols-2 border-t ${
        isDark ? "border-white/10 bg-[#071936]/78" : "border-[#092866]/10 bg-white"
      } md:grid-cols-4`}
      aria-label="Athletes Elevated proof points"
    >
      {PROOF_POINTS.map((point) => (
        <div
          key={point.label}
          className={`border-r px-5 py-5 last:border-r-0 md:px-8 ${
            isDark ? "border-white/10" : "border-[#092866]/10"
          }`}
        >
          <div className="font-(family-name:--font-barlow) text-[clamp(24px,3vw,42px)] font-extrabold leading-none text-[#52aafc]">
            {point.value}
          </div>
          <div
            className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
              isDark ? "text-white/52" : "text-[#092866]/66"
            }`}
          >
            {point.label}
          </div>
        </div>
      ))}
    </div>
  );
}
