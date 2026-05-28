import Link from "next/link";

type ClarityStripProps = {
  proposition: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tertiary?: { label: string; href: string };
  tone?: "dark" | "light";
};

export default function ClarityStrip({
  proposition,
  primary,
  secondary,
  tertiary,
  tone = "dark",
}: ClarityStripProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`grid grid-cols-1 gap-5 border ${
        isDark
          ? "border-white/10 bg-[#071936]/82 text-white"
          : "border-[#092866]/10 bg-white text-[#092866]"
      } p-5 backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-center md:p-6`}
    >
      <p
        className={`max-w-[760px] text-[18px] leading-[1.7] ${
          isDark ? "text-white/86" : "text-[#092866]/76"
        }`}
      >
        {proposition}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href={primary.href}
          className="btn-blue inline-flex items-center justify-center gap-2 px-6 py-3.5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-widest md:px-7"
        >
          {primary.label} <span className="arr inline-block">→</span>
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className={`inline-flex items-center justify-center gap-2 border px-6 py-3.5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-widest transition md:px-7 ${
              isDark
                ? "border-white/22 text-white hover:border-[#52aafc] hover:text-[#52aafc]"
                : "border-[#092866]/16 text-[#092866] hover:border-[#52aafc] hover:text-[#52aafc]"
            }`}
          >
            {secondary.label} <span className="arr inline-block">→</span>
          </Link>
        )}
        {tertiary && (
          <Link
            href={tertiary.href}
            className={`inline-flex items-center justify-center gap-2 px-2 py-3.5 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-widest transition ${
              isDark ? "text-white/76 hover:text-white" : "text-[#092866]/54 hover:text-[#092866]"
            }`}
          >
            {tertiary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
