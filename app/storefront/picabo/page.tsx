import Navbar from "../components/navBar";

// Athletes Elevated — Athlete Storefront
// Data-driven so this same component can be reused for every athlete;
// just pass a different `athlete` object in. Defaults below are Picabo Street.

const DEFAULT_ATHLETE = {
  name: "Picabo Street",
  sport: "Alpine Skiing · Olympic Gold Medalist",
  tagline: "SHOP PICABO'S PICKS",
  bio: "Two-time Olympic medalist and the first American woman to win the World Cup overall title, Picabo Street built a career on speed, grit, and refusing to back down. Her storefront is a hand-picked lineup from the brands she actually trusts — on the mountain and off it.",
  heroImageLabel: "Picabo Street — hero photo",
  picks: [
    { brand: "TeeBox Golf", name: "Performance Polo", price: "$68.00" },
    { brand: "TeeBox Golf", name: "Tour Cap", price: "$32.00" },
    { brand: "Parkit", name: "Insulated Tumbler", price: "$28.00" },
    { brand: "Pinned Golf", name: "Rangefinder Pro", price: "$199.00" },
    { brand: "West Ham United", name: "Training Jacket", price: "$85.00" },
    { brand: "Brand Name", name: "Product Name", price: "$0.00" },
  ],
  impactNote:
    "Every purchase from this page supports Picabo directly and contributes to the charity she's chosen to back.",
};

export default function AthleteStorefront({ athlete = DEFAULT_ATHLETE }) {
  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="bg-white text-[#092866]"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#092866] to-[#071c4a] px-6 py-20 text-center text-white md:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#52aafc]">
          Member Spotlight · Athlete Storefront
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          {athlete.name.toUpperCase()}
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-[#d7e2f7]">
          {athlete.sport}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#d7e2f7] md:text-base">
          {athlete.bio}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#picks"
            className="rounded-sm border border-[#52aafc] bg-[#52aafc] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#092866]"
          >
            {athlete.tagline}
          </a>
          <a
            href="#story"
            className="rounded-sm border border-white/50 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Her Story
          </a>
        </div>
      </section>

      {/* Picks grid */}
      <section
        id="picks"
        className="mx-auto max-w-[1200px] px-6 py-16 md:px-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#146FF8]">
              Curated by {athlete.name}
            </p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Her Picks</h2>
            <p className="mt-1 max-w-md text-sm text-[#5b5f6b]">
              Pulled from across the marketplace — every piece she'd actually
              wear or use.
            </p>
          </div>
          <a className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-[#146FF8]">
            View all picks →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {athlete.picks.map((item, i) => (
            <div key={i} className="text-left">
              <div className="mb-2.5 h-28 rounded-lg bg-gradient-to-br from-[#e6ecf7] to-[#c3d1ec]" />
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#5b5f6b]">
                {item.brand}
              </p>
              <p className="mb-1 text-sm font-bold">{item.name}</p>
              <p className="text-xs text-[#5b5f6b]">{item.price}</p>
              <a className="mt-1.5 inline-block text-xs font-bold uppercase tracking-wide text-[#146FF8]">
                Shop →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Story / impact */}
      <section id="story" className="bg-[#f4f4f4] px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 md:items-center">
          <div className="flex h-64 items-center justify-center rounded-lg bg-gradient-to-br from-[#c7d6f0] to-[#8fa9d6] text-xs font-bold uppercase tracking-wide text-[#3a4a70]">
            {athlete.heroImageLabel}
          </div>
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#146FF8]">
              Why It Matters
            </p>
            <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">
              More than a storefront.
            </h2>
            <p className="text-sm leading-relaxed text-[#5b5f6b] md:text-base">
              {athlete.impactNote}
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-gradient-to-br from-[#092866] to-[#071c4a] px-6 py-14 text-center text-white md:px-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#52aafc]">
          Join the Marketplace
        </p>
        <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">
          Shop {athlete.name}'s storefront — and every other athlete's, too.
        </h2>
        <a className="mt-2 inline-block rounded-sm border border-[#52aafc] bg-[#52aafc] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#092866]">
          Become a Member
        </a>
      </section>
    </div>
  );
}
