import Link from "next/link";

export default function Footer() {
    return (
        <>
        <section className="bg-[#092866] px-6 pb-10 pt-20 md:px-12">
        <div className="mb-14 flex flex-wrap items-start justify-between gap-10 border-b border-white/8 pb-14">
          <div>
            <div className="mb-3 font-(family-name:--font-barlow) text-[28px] font-extrabold uppercase tracking-[0.05em] text-white">
              ATHLETES <span className="text-[#52aafc]">ELEVATED</span>
            </div>
            <p className="max-w-67.5 text-[13px] font-light leading-[1.72] text-white">
              Built for athletes, powered by purpose, focused on meaningful
              community impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-5">
            {[
              ["For Athletes", "/athletes"],
              ["Ecosystem", "/ecosystem"],
              ["For Brands", "/brands"],
              ["For Fans", "/fans"],
            ].map(([l, h]) => (
              <Link
                key={l}
                href={h}
                className="text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:text-[#52aafc]"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-white">
            © 2026 Athletes Elevated. All rights reserved.
          </p>
          <p className="text-[11px] italic text-white">
            Performance meets purpose.
          </p>
        </div>
      </section>
        </>
    )
}