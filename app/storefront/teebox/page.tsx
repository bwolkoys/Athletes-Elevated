import Navbar from "../components/navBar";

// Athletes Elevated — Brand Storefront
// Data-driven so this same component can be reused for every onboarding brand;
// just pass a different `brand` object in. Defaults below are TeeBox Golf.

const DEFAULT_BRAND = {
  name: "TeeBox Golf",
  category: "Golf",
  tagline: "SHOP THE TEEBOX GOLF COLLECTION",
  story:
    "TeeBox Golf builds performance gear for players who take the course seriously without taking themselves too seriously. Every piece is designed, tested, and vetted before it ever lands on Athletes Elevated — built for the swing, the walk, and the nineteenth hole after.",
  heroImageLabel: "TeeBox Golf — hero photo",
  badges: ["Vetted Brand", "Golf", "Member-Exclusive Drops"],
  products: [
    { name: "Performance Polo", price: "$68.00" },
    { name: "Tour Cap", price: "$32.00" },
    { name: "Rangefinder Pro", price: "$199.00" },
    { name: "Performance Glove", price: "$32.00" },
    { name: "Weatherproof Quarter-Zip", price: "$94.00" },
    { name: "Alignment Stick Set", price: "$24.00" },
  ],
};

export default function BrandStorefront({ brand = DEFAULT_BRAND }) {
  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="bg-white text-[#092866]"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#092866] to-[#071c4a] px-6 py-20 text-center text-white md:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#52aafc]">
          Brand Spotlight · {brand.category}
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          {brand.name.toUpperCase()}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#d7e2f7] md:text-base">
          {brand.story}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="rounded-sm border border-[#52aafc] bg-[#52aafc] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#092866]"
          >
            {brand.tagline}
          </a>
          <a
            href="#story"
            className="rounded-sm border border-white/50 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            About {brand.name}
          </a>
        </div>
      </section>

      {/* Badges */}
      <section className="flex flex-wrap items-center justify-center gap-3 border-b border-[#eeeeee] px-6 py-6">
        {brand.badges.map((b) => (
          <span
            key={b}
            className="rounded-full bg-[#e3f0ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#146FF8]"
          >
            {b}
          </span>
        ))}
      </section>

      {/* Products grid */}
      <section
        id="products"
        className="mx-auto max-w-[1200px] px-6 py-16 md:px-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#146FF8]">
              Featured Products
            </p>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Shop {brand.name}
            </h2>
            <p className="mt-1 max-w-md text-sm text-[#5b5f6b]">
              Every piece hand-picked and vetted before it earns a spot here.
            </p>
          </div>
          <a className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-[#146FF8]">
            View full collection →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {brand.products.map((item, i) => (
            <div key={i} className="text-left">
              <div className="mb-2.5 h-28 rounded-lg bg-gradient-to-br from-[#e6ecf7] to-[#c3d1ec]" />
              <p className="mb-1 text-sm font-bold">{item.name}</p>
              <p className="text-xs text-[#5b5f6b]">{item.price}</p>
              <a className="mt-1.5 inline-block text-xs font-bold uppercase tracking-wide text-[#146FF8]">
                Shop →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="bg-[#f4f4f4] px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#146FF8]">
              About the Brand
            </p>
            <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">
              Why {brand.name} is here.
            </h2>
            <p className="text-sm leading-relaxed text-[#5b5f6b] md:text-base">
              {brand.story}
            </p>
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gradient-to-br from-[#c7d6f0] to-[#8fa9d6] text-xs font-bold uppercase tracking-wide text-[#3a4a70]">
            {brand.heroImageLabel}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-gradient-to-br from-[#092866] to-[#071c4a] px-6 py-14 text-center text-white md:px-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#52aafc]">
          Join the Marketplace
        </p>
        <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">
          Shop {brand.name} — and every other vetted brand, too.
        </h2>
        <a className="mt-2 inline-block rounded-sm border border-[#52aafc] bg-[#52aafc] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#092866]">
          Become a Member
        </a>
      </section>
    </div>
  );
}
