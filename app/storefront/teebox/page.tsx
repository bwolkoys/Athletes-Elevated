import Navbar from "../components/navBar";

// Athletes Elevated — Brand Storefront
// Data-driven so this same component can be reused for every onboarding brand;
// just pass a different `brand` object in. Defaults below are TeeBox Golf.
//
// Each product takes an optional `image` (a URL or local /public path, e.g.
// "/teebox/tour-cap.jpg"). Leave it "" and that tile falls back to the
// gradient placeholder, so you can fill photos in one at a time.
//
// heroBackgroundMobile is optional — a tighter/more-vertical crop of the
// hero photo for phones, so the subject doesn't get cut off by object-cover
// on a narrow screen. Leave it out and mobile just reuses heroBackground.

const DEFAULT_BRAND = {
  name: "TeeBox Golf",
  category: "Golf",
  tagline: "SHOP THE TEEBOX GOLF COLLECTION",
  heroBackground: "/teebox/teebg.png",
  heroBackgroundMobile: "",
  story:
    "TeeBox Golf builds performance gear for players who take the course seriously without taking themselves too seriously. Every piece is designed, tested, and vetted before it ever lands on Athletes Elevated — built for the swing, the walk, and the nineteenth hole after.",
  heroImageLabel: "/teebox/youth-golf-academy-5.webp",
  badges: ["Coaching", "Clubs", "Community", "Developing every golfer"],
  products: [
    { name: "Crown Blade Polo", price: "$65.00", image: "/teebox/crownBlade.png" },
    { name: "UNRL Men's Ultra Hooded Long Sleeve", price: "$71.00", image: "/teebox/hoodie.png" },
    { name: "UNRL Women's Essence Lounge Short", price: "$81.00", image: "/teebox/shorts.png" },
    { name: "UNRL Men's Performance Pant", price: "$81.00", image: "/teebox/perpant.png" },
    { name: "CPG Eagle Hat", price: "$30.00", image: "/teebox/hat.png" },
  ],
};

function ProductImage({ image, name }: { image?: string; name: string }) {
  if (image) {
    return (
      <div className="mb-2.5 h-[280px] overflow-hidden rounded-lg bg-[#e6ecf7] sm:h-[400px]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="mb-2.5 h-[280px] rounded-lg bg-gradient-to-br from-[#e6ecf7] to-[#c3d1ec] sm:h-[400px]" />
  );
}

function Marquee({ items }: { items: string[] }) {
  // Two copies of the same list sit side by side; animating the track to
  // -50% (exactly one copy's width) makes the loop seamless.
  const track = [...items, ...items];

  return (
    <div className="group overflow-hidden border-y border-[#0a2f77] bg-[#092866] py-8">
      <style>{`
        @keyframes ae-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ae-marquee-track {
          animation: ae-marquee-scroll 22s linear infinite;
        }
        .ae-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ae-marquee-track {
            animation: none;
          }
        }
      `}</style>
      <div className="flex w-max whitespace-nowrap ae-marquee-track">
        {track.map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 text-xs font-bold uppercase tracking-[0.2em] text-white/80"
          >
            {item}
            <span className="text-[#52aafc]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BrandStorefront({ brand = DEFAULT_BRAND }) {
  const marqueeItems = [...brand.badges];

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="bg-white text-[#092866]"
    >
      <Navbar />

      {/* Hero — just the background photo, buttons pinned to the bottom */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden px-6 pb-8 text-center text-white sm:min-h-[520px] sm:pb-10 md:min-h-[640px] md:px-10 md:pb-14">
        {/* Background photo — a differently-cropped mobile version is optional */}
        {brand.heroBackground ? (
          <picture>
            {brand.heroBackgroundMobile && (
              <source media="(max-width: 767px)" srcSet={brand.heroBackgroundMobile} />
            )}
            <img
              src={brand.heroBackground}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </picture>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#092866] to-[#071c4a]" />
        )}

        {/* Just a bottom fade so the buttons stay legible over any photo */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent sm:h-40" />

        {/* Buttons only, pinned to the bottom */}
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <a
            href="#products"
            className="w-full rounded-sm border border-[#52aafc] bg-[#52aafc] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#092866] sm:w-auto sm:py-3"
          >
            {brand.tagline}
          </a>
          <a
            href="#story"
            className="w-full rounded-sm border border-white/70 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white sm:w-auto sm:py-3"
          >
            About {brand.name}
          </a>
        </div>
      </section>

      {/* Scrolling marquee */}
      <Marquee items={marqueeItems} />

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

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brand.products.map((item, i) => (
            <div key={i} className="text-left">
              <ProductImage image={item.image} name={item.name} />
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

          <div className="h-64 overflow-hidden rounded-lg bg-gradient-to-br from-[#c7d6f0] to-[#8fa9d6] md:h-96">
            {brand.heroImageLabel?.startsWith("/") || brand.heroImageLabel?.startsWith("http") ? (
              <img
                src={brand.heroImageLabel}
                alt={brand.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-bold uppercase tracking-wide text-[#3a4a70]">
                {brand.heroImageLabel}
              </div>
            )}
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