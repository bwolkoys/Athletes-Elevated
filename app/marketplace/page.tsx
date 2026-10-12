/**
 * Athletes Elevated — Marketplace home (single file)
 * Place at:  app/marketplace/page.tsx
 *
 * Reads live from the "Athlete Details on Website" Airtable base:
 *   • Athletes  → Featured storefront + "Shop by athlete" cards
 *   • Products  → product count + 3 thumbnails on each athlete card
 *   • Brands    → "Shop by brand" tiles + "Partner stores"
 * Add or edit a row in Airtable and the page updates within about a minute.
 * Every section always shows: empty slots display "coming soon" placeholder
 * cards until there's content in Airtable.
 *
 * Uses the same env variables as the athletes pages:
 *   AIRTABLE_TOKEN_ATHDETAILS, AIRTABLE_BASE_ID_ATHDETAILS
 * Photos load through /api/airtable-image (add `brands: "Brands"` to TABLES
 * in app/lib/athletes.ts so brand photos work too).
 */

import type { Metadata } from "next";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Marketplace | Athletes Elevated",
  description:
    "Shop what athletes actually use. Every storefront is built by an athlete from the products they use and stand behind.",
};

/* ============================================================================
 * SETTINGS — edit here
 * ========================================================================= */

/** The full Athletes Elevated store (Shopify). */
const STORE_URL = "https://athleteselevatedmarketplace.com/";

/**
 * "All products" section — the 4 product images in the collage.
 * Put the image files in /public/marketplace/ and list them here, e.g.
 *   "/marketplace/all-products-1.png"
 * Any slot left as "" falls back to a product photo from Airtable (if there is one).
 */
const ALL_PRODUCTS_IMAGES = [
  "/marketplace/chair.png", // image 1
  "/marketplace/finder.png", // image 2
  "/marketplace/holistic.png", // image 3
  "/marketplace/tablet.png", // image 4
];

/** Airtable table + column names. Change these if you rename anything in Airtable. */
const T = { athletes: "Athletes", products: "Products", brands: "Brands" } as const;

const A = {
  name: "Name",
  slug: "Slug",
  tagline: "Card Tagline",
  sport: "Sport",
  photo: "Card Photo",
  quote: "Quote",
  storefront: "Storefront Link",
  featured: "Featured",
  published: "Published",
  sort: "Sort Order",
} as const;

const P = { athletes: "Athletes", image: "Image", live: "Live" } as const;

const B = {
  name: "Name",
  tagline: "Tagline",
  description: "Description",
  photo: "Photo",
  logo: "Logo",
  storefront: "Storefront Link",
  partner: "Partner Store",
  published: "Published",
  sort: "Sort Order",
} as const;

/** "How it works" — draft copy, needs legal review for commission disclosure. */
const HOW_IT_WORKS = [
  {
    icon: "user",
    title: "From the athlete",
    body: "Every product is something an athlete uses, relies on or helps bring to market. It sits on their storefront with their name on it.",
  },
  {
    icon: "medal",
    title: "The athlete benefits",
    body: "When you buy through an athlete's storefront, the athlete earns a commission. We say so up front.",
  },
  {
    icon: "heart",
    title: "Their cause benefits",
    body: "A share of every sale also supports a charity the athlete chooses.",
  },
  {
    icon: "star",
    title: "You earn rewards",
    body: "Collect points on every order and redeem them on your next one.",
    link: { label: "See rewards", href: "https://athleteselevatedmarketplace.com/pages/athletes-elevated-rewards" },
  },
] as { icon: string; title: string; body: string; link?: { label: string; href: string } }[];

/** Minimum number of cards shown per section. Empty slots show a placeholder card. */
const MIN_ATHLETE_CARDS = 4;
const MIN_BRAND_TILES = 4;
/** Brand photos are 4:5 portrait (e.g. 1080×1350 or 1200×1500) — tiles match so the whole image shows. */

/* ============================================================================
 * BRAND TOKENS (Athletes Elevated)
 * ========================================================================= */
const NIGHT = "#080F1C";
const NAVY = "#092866";
const SKY = "#52aafc";
const ROYAL = "#006aac";
const GRAY = "#c2c2c2";
const CHARCOAL = "#231f20";
const HEADING = "var(--font-heading), 'Apotek Extended', 'Montserrat', sans-serif";

/* ============================================================================
 * AIRTABLE
 * ========================================================================= */
type Rec = { id: string; fields: Record<string, unknown> };
type Attachment = { id: string };

async function fetchTable(table: string, filterByFormula?: string): Promise<Rec[]> {
  const token = process.env.AIRTABLE_TOKEN_ATHDETAILS;
  const baseId = process.env.AIRTABLE_BASE_ID_ATHDETAILS;
  if (!token || !baseId) return [];

  const out: Rec[] = [];
  let offset: string | undefined;
  try {
    do {
      const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`);
      url.searchParams.set("pageSize", "100");
      if (filterByFormula) url.searchParams.set("filterByFormula", filterByFormula);
      // Gives this page its own cache entry, separate from the /athletes pages.
      url.searchParams.set("returnFieldsByFieldId", "false");
      if (offset) url.searchParams.set("offset", offset);
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate, tags: ["airtable"] },
      });
      // A missing table (e.g. Brands not created yet) just hides that section.
      if (!res.ok) return out;
      const json = (await res.json()) as { records: Rec[]; offset?: string };
      out.push(...json.records);
      offset = json.offset;
    } while (offset);
  } catch {
    return out;
  }
  return out;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "");
const num = (v: unknown) => (typeof v === "number" ? v : Number.MAX_SAFE_INTEGER);
const links = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
const toSlug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Stable image URL through the site's Airtable image route (links never expire). */
function img(tableKey: "athletes" | "products" | "brands", recordId: string, v: unknown): string {
  const first = Array.isArray(v) ? (v[0] as Attachment | undefined) : undefined;
  return first?.id ? `/api/airtable-image/${tableKey}/${recordId}/${first.id}` : "";
}

type AthleteCard = {
  name: string;
  firstName: string;
  slug: string;
  tagline: string;
  photo: string;
  quote: string;
  storefront: string;
  featured: boolean;
  productCount: number;
  thumbs: string[];
  sort: number;
};

type Brand = {
  name: string;
  tagline: string;
  description: string;
  photo: string;
  logo: string;
  storefront: string;
  partner: boolean;
  sort: number;
};

async function getMarketplace() {
  const [athleteRows, productRows, brandRows] = await Promise.all([
    fetchTable(T.athletes, `{${A.published}}`),
    fetchTable(T.products),
    fetchTable(T.brands, `{${B.published}}`),
  ]);

  // Live products, grouped by linked athlete
  const byAthlete = new Map<string, string[]>();
  for (const r of productRows) {
    if (P.live in r.fields && !r.fields[P.live]) continue;
    const thumb = img("products", r.id, r.fields[P.image]);
    for (const id of links(r.fields[P.athletes])) {
      const list = byAthlete.get(id) ?? [];
      list.push(thumb);
      byAthlete.set(id, list);
    }
  }

  const athletes: AthleteCard[] = athleteRows
    .map((r) => {
      const f = r.fields;
      const name = str(f[A.name]);
      const products = byAthlete.get(r.id) ?? [];
      return {
        name,
        firstName: name.split(" ")[0],
        slug: str(f[A.slug]) ? toSlug(str(f[A.slug])) : toSlug(name),
        tagline: str(f[A.tagline]) || str(f[A.sport]),
        photo: img("athletes", r.id, f[A.photo]),
        quote: str(f[A.quote]),
        storefront: str(f[A.storefront]),
        featured: Boolean(f[A.featured]),
        productCount: products.length,
        thumbs: products.filter(Boolean).slice(0, 3),
        sort: num(f[A.sort]),
      };
    })
    .filter((a) => a.name)
    .sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));

  const brands: Brand[] = brandRows
    .map((r) => {
      const f = r.fields;
      return {
        name: str(f[B.name]),
        tagline: str(f[B.tagline]),
        description: str(f[B.description]),
        photo: img("brands", r.id, f[B.photo]),
        logo: img("brands", r.id, f[B.logo]),
        storefront: str(f[B.storefront]),
        partner: Boolean(f[B.partner]),
        sort: num(f[B.sort]),
      };
    })
    .filter((b) => b.name)
    .sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));

  // Featured storefront rotates daily through athletes ticked "Featured"
  const pool = athletes.filter((a) => a.featured).length ? athletes.filter((a) => a.featured) : athletes;
  const day = Math.floor(Date.now() / 86_400_000);
  const featured = pool.length ? pool[day % pool.length] : undefined;

  return {
    featured,
    athletes,
    // Every published brand shows in "Shop by brand"; partner stores also get their own section.
    shopBrands: brands,
    partners: brands.filter((b) => b.partner),
  };
}

/* ============================================================================
 * PAGE
 * ========================================================================= */
export default async function MarketplacePage() {
  const { featured, athletes, shopBrands, partners } = await getMarketplace();

  return (
    <>
      <Navbar />
      <main className="bg-white pt-16" style={{ fontFamily: "'Montserrat', sans-serif", color: NAVY }}>
        <style>{`
          .mk-btn { transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease; }
          .mk-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -14px ${SKY}; }
        `}</style>

        {/* ============================== INTRO ============================== */}
        <section className="relative overflow-hidden" style={{ backgroundColor: NIGHT }}>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
            style={{ backgroundColor: SKY }}
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
            <div className="text-white">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: SKY }}>
                Marketplace
              </p>
              <h1
                className="text-5xl uppercase leading-[0.92] md:text-7xl"
                style={{ fontFamily: HEADING, fontWeight: 900 }}
              >
                Shop what athletes <span style={{ color: SKY }}>actually use.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
                Every storefront is built by an athlete from what they use and stand behind. Start with a
                person, or browse everything.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#athletes"
                  className="mk-btn inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-extrabold uppercase tracking-[0.2em]"
                  style={{ backgroundColor: SKY, color: NIGHT }}
                >
                  Choose an Athlete
                </a>
                <a
                  href={STORE_URL}
                  className="inline-flex items-center justify-center gap-2 border border-white/40 px-7 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-[#080F1C]"
                >
                  Browse All Products
                </a>
              </div>
            </div>

            {featured ? <FeaturedStorefront athlete={featured} /> : <FeaturedPlaceholder />}
          </div>
        </section>
        <div className="h-1.5 w-full" style={{ backgroundColor: SKY }} />

        {/* ========================= SHOP BY ATHLETE ========================= */}
        {(
          <section id="athletes" className="scroll-mt-20 px-6 py-20 md:py-24">
            <div className="mx-auto max-w-7xl">
              <SectionHead
                eyebrow="Shop by athlete"
                title="Start with someone you follow."
                sub="Every storefront is what that athlete uses and trusts."
                link={{ label: "See all athletes", href: "/athletes" }}
              />
              <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                {athletes.map((a) => (
                  <AthleteStoreCard key={a.slug} a={a} />
                ))}
                {Array.from({ length: Math.max(0, MIN_ATHLETE_CARDS - athletes.length) }).map((_, i) => (
                  <AthletePlaceholderCard key={`athlete-slot-${i}`} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================== SHOP BY BRAND ========================== */}
        {(
          <section id="brands" className="scroll-mt-20 px-6 py-20 md:py-24" style={{ backgroundColor: "#f4f6fb" }}>
            <div className="mx-auto max-w-7xl">
              <SectionHead
                eyebrow="Shop by brand"
                title="The brands behind the athletes."
                sub="Every brand is vetted before it earns a storefront here."
              />
              {/* Brand cards are capped at ~220px wide so the row reads smaller than the athlete cards. */}
              <div className="mt-12 grid max-w-[960px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {shopBrands.map((b) => (
                  <BrandTile key={b.name} b={b} />
                ))}
                {Array.from({ length: Math.max(0, MIN_BRAND_TILES - shopBrands.length) }).map((_, i) => (
                  <BrandPlaceholderTile key={`brand-slot-${i}`} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================== ALL PRODUCTS ========================== */}
        <section className="overflow-hidden px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ROYAL }}>
                All products
              </p>
              <h2 className="text-3xl uppercase leading-[0.95] md:text-5xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
                The full catalog.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: CHARCOAL }}>
                Every product from every athlete and brand, on the Athletes Elevated store. Filter by athlete
                or category once you&apos;re in.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href={STORE_URL}
                  className="mk-btn inline-flex items-center gap-2 px-7 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  Shop All Products <ArrowUpRight />
                </a>
                <span className="text-xs font-medium" style={{ color: CHARCOAL }}>
                  Secure checkout on the store.
                </span>
              </div>
            </div>
            <ProductCollage
              thumbs={(() => {
                const fromAirtable = athletes.flatMap((a) => a.thumbs);
                let next = 0;
                return ALL_PRODUCTS_IMAGES.map((src) => src || fromAirtable[next++] || "");
              })()}
            />
          </div>
        </section>

        {/* =========================== HOW IT WORKS ========================== */}
        {/* Draft copy: needs legal review for commission disclosure. */}
        <section className="px-6 py-20 text-white md:py-24" style={{ backgroundColor: NIGHT }}>
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: SKY }}>
              How it works
            </p>
            <h2 className="text-3xl uppercase leading-[0.95] md:text-5xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
              Every purchase does more.
            </h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {HOW_IT_WORKS.map((s) => (
                <li key={s.title}>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,0.35)", color: SKY }}
                  >
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {s.body}
                    {s.link && (
                      <>
                        {" "}
                        <a
                          href={s.link.href}
                          {...ext(s.link.href)}
                          className="font-semibold text-white underline underline-offset-4 hover:text-[#52aafc]"
                        >
                          {s.link.label}
                        </a>
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-12 border-t border-white/15 pt-6 text-xs text-white/60">
              Brands sell and ship your order. You check out securely on the Athletes Elevated store.
            </p>
          </div>
        </section>

        {/* ========================== PARTNER STORES ========================= */}
        {(
          <section className="px-6 py-20 md:py-24">
            <div className="mx-auto max-w-7xl">
              <SectionHead eyebrow="Partner stores" title="Official partner stores." />
              <div className="mt-10 grid gap-5">
                {partners.map((p) => (
                  <PartnerRow key={p.name} p={p} />
                ))}
                {partners.length === 0 && <PartnerPlaceholderRow />}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

/* ============================================================================
 * COMPONENTS
 * ========================================================================= */

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function ext(href: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function SectionHead({
  eyebrow,
  title,
  sub,
  link,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ROYAL }}>
          {eyebrow}
        </p>
        <h2 className="text-3xl uppercase leading-[0.95] md:text-5xl" style={{ fontFamily: HEADING, fontWeight: 900 }}>
          {title}
        </h2>
        {sub && (
          <p className="mt-3 max-w-xl text-sm md:text-base" style={{ color: CHARCOAL }}>
            {sub}
          </p>
        )}
      </div>
      {link && (
        <a href={link.href} className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em]">
          {link.label}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
}

function Photo({
  src,
  alt,
  label,
  className = "",
  contain,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  contain?: boolean;
}) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`h-full w-full ${contain ? "bg-white object-contain p-6" : "object-cover object-[center_20%]"} ${className}`}
    />
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#eef4fb] to-[#dbe6f3] text-[#092866]/35">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}

function FeaturedStorefront({ athlete: a }: { athlete: AthleteCard }) {
  const shop = a.storefront || STORE_URL;
  return (
    <div className="grid overflow-hidden bg-white sm:grid-cols-[0.9fr_1.1fr]">
      <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[340px]">
        <Photo src={a.photo} alt={a.name} label="Athlete photo" />
      </div>
      <div className="flex flex-col justify-center p-7 md:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ROYAL }}>
          Featured storefront
        </p>
        <h2 className="mt-3 text-3xl uppercase leading-none" style={{ fontFamily: HEADING, fontWeight: 900 }}>
          {a.name}
        </h2>
        {a.tagline && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: CHARCOAL }}>
            {a.tagline}
          </p>
        )}
        {a.quote && (
          <blockquote className="mt-5 border-l-2 pl-4 text-sm italic leading-relaxed" style={{ borderColor: SKY, color: CHARCOAL }}>
            &ldquo;{a.quote}&rdquo;
          </blockquote>
        )}
        <a
          href={shop}
          {...ext(shop)}
          className="mk-btn mt-7 inline-flex w-fit items-center gap-2 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white"
          style={{ backgroundColor: NAVY }}
        >
          Shop {a.firstName}&apos;s Store <ArrowUpRight />
        </a>
      </div>
    </div>
  );
}

function AthleteStoreCard({ a }: { a: AthleteCard }) {
  const shop = a.storefront || STORE_URL;
  return (
    <article
      className="group flex flex-col overflow-hidden border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-26px_rgba(9,40,102,0.55)]"
      style={{ borderColor: `${GRAY}aa` }}
    >
      <a href={shop} {...ext(shop)} className="relative block aspect-square overflow-hidden">
        <Photo src={a.photo} alt={a.name} label="Athlete photo" className="transition duration-700 group-hover:scale-105" />
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: SKY }} />
      </a>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-sm font-extrabold leading-tight sm:text-lg">{a.name}</h3>
        {a.tagline && <p className="mt-1 text-[10px] leading-snug sm:text-xs" style={{ color: CHARCOAL }}>{a.tagline}</p>}
        {a.quote ? (
          <p className="mt-2 text-xs italic leading-snug sm:mt-3 sm:text-sm" style={{ color: CHARCOAL }}>
            &ldquo;{a.quote}&rdquo;
          </p>
        ) : (
          <p className="mt-2 text-xs italic leading-snug text-[#092866]/35 sm:mt-3 sm:text-sm">Quote coming soon.</p>
        )}

        <ProductThumbs thumbs={a.thumbs} count={a.productCount} />

        <div className="mt-auto pt-3 sm:pt-5">
          <a
            href={shop}
            {...ext(shop)}
            className="mk-btn flex w-full items-center justify-center gap-2 px-1 py-2.5 text-center text-[9px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white sm:py-3.5 sm:text-[11px] sm:tracking-[0.2em]"
            style={{ backgroundColor: NAVY }}
          >
            Shop {a.firstName}&apos;s Store
          </a>
          <a
            href={`/athletes/${a.slug}`}
            className="mt-1 block py-1.5 text-center text-[11px] font-semibold underline-offset-4 hover:underline sm:mt-2 sm:text-xs"
            style={{ color: ROYAL }}
          >
            View profile
          </a>
        </div>
      </div>
    </article>
  );
}

function BrandTile({ b }: { b: Brand }) {
  const href = b.storefront || STORE_URL;
  return (
    <a
      href={href}
      {...ext(href)}
      className="group flex flex-col overflow-hidden border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-26px_rgba(9,40,102,0.5)]"
      style={{ borderColor: `${GRAY}aa` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Photo
          src={b.photo || b.logo}
          alt={b.name}
          label="Brand photo"
          contain={!b.photo && Boolean(b.logo)}
          className="transition duration-700 group-hover:scale-105"
        />
        {b.photo && b.logo && (
          <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.logo} alt="" className="h-full w-full object-contain" />
          </span>
        )}
      </div>
      <div className="flex flex-1 items-start justify-between gap-2 p-3">
        <div>
          <h3 className="text-sm font-extrabold">{b.name}</h3>
          {b.tagline && <p className="mt-1 text-[11px]" style={{ color: CHARCOAL }}>{b.tagline}</p>}
        </div>
        <span className="mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: ROYAL }}>
          <ArrowUpRight />
        </span>
      </div>
    </a>
  );
}

function ProductCollage({ thumbs }: { thumbs: string[] }) {
  const tiles = [0, 1, 2, 3].map((i) => thumbs[i] ?? "");
  const offsets = ["mt-10", "mt-0", "mt-16", "mt-4"];
  return (
    <div className="grid grid-cols-4 gap-3" aria-hidden>
      {tiles.map((t, i) => (
        <div key={i} className={`aspect-[4/5] overflow-hidden ${offsets[i]}`}>
          <Photo src={t} alt="" label="" />
        </div>
      ))}
    </div>
  );
}

function PartnerRow({ p }: { p: Brand }) {
  const href = p.storefront || STORE_URL;
  return (
    <div className="grid overflow-hidden border md:grid-cols-[240px_1fr_auto] md:items-center" style={{ borderColor: `${GRAY}aa` }}>
      {/* Image fills its box edge to edge at the 4:5 brand-photo shape, so the whole photo shows. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f6fb]">
        {p.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : p.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.logo} alt={p.name} className="absolute inset-0 h-full w-full object-contain p-8" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#092866]/35">
            Partner logo
          </span>
        )}
      </div>
      <div className="p-6 md:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ROYAL }}>
          Partner store
        </p>
        <h3 className="mt-2 text-2xl font-extrabold">{p.name}</h3>
        {(p.description || p.tagline) && (
          <p className="mt-2 max-w-xl text-sm" style={{ color: CHARCOAL }}>
            {p.description || p.tagline}
          </p>
        )}
      </div>
      <div className="px-6 pb-6 md:p-8">
        <a
          href={href}
          {...ext(href)}
          className="mk-btn inline-flex items-center gap-2 border-2 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em]"
          style={{ borderColor: NAVY }}
        >
          Visit the Store <ArrowUpRight />
        </a>
      </div>
    </div>
  );
}

function ProductThumbs({ thumbs, count }: { thumbs: string[]; count: number }) {
  return (
    <div className="mt-3 sm:mt-4">
      <div className="flex gap-1.5 sm:gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-9 w-9 overflow-hidden sm:h-14 sm:w-14" style={{ backgroundColor: "#eef4fb" }}>
            {thumbs[i] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbs[i]} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] font-semibold sm:text-[11px]" style={{ color: count ? ROYAL : "rgba(9,40,102,0.4)" }}>
        {count ? `${count} ${count === 1 ? "product" : "products"}` : "Products coming soon"}
      </p>
    </div>
  );
}

function FeaturedPlaceholder() {
  return (
    <div className="grid overflow-hidden bg-white sm:grid-cols-[0.9fr_1.1fr]">
      <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[340px]">
        <Photo src="" alt="" label="Athlete photo" />
      </div>
      <div className="flex flex-col justify-center p-7 md:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ROYAL }}>
          Featured storefront
        </p>
        <h2 className="mt-3 text-3xl uppercase leading-none text-[#092866]/30" style={{ fontFamily: HEADING, fontWeight: 900 }}>
          Coming soon
        </h2>
        <p className="mt-4 text-sm text-[#092866]/45">Our featured athlete storefront will appear here.</p>
        <a
          href={STORE_URL}
          className="mk-btn mt-7 inline-flex w-fit items-center gap-2 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white"
          style={{ backgroundColor: NAVY }}
        >
          Browse the Store <ArrowUpRight />
        </a>
      </div>
    </div>
  );
}

function AthletePlaceholderCard() {
  return (
    <article className="flex flex-col overflow-hidden border border-dashed bg-white" style={{ borderColor: GRAY }}>
      <div className="relative aspect-square overflow-hidden">
        <Photo src="" alt="" label="Athlete photo" />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-sm font-extrabold leading-tight text-[#092866]/30 sm:text-lg">Athlete coming soon</h3>
        <p className="mt-1 text-[10px] text-[#092866]/30 sm:text-xs">Sport · Team or hometown</p>
        <p className="mt-2 text-xs italic leading-snug text-[#092866]/30 sm:mt-3 sm:text-sm">Quote coming soon.</p>
        <ProductThumbs thumbs={[]} count={0} />
        <div className="mt-auto pt-3 sm:pt-5">
          <span className="flex w-full items-center justify-center px-1 py-2.5 text-center text-[9px] font-extrabold uppercase leading-tight tracking-[0.08em] text-[#092866]/35 ring-1 ring-inset ring-[#092866]/15 sm:py-3.5 sm:text-[11px] sm:tracking-[0.2em]">
            Store coming soon
          </span>
          <span className="mt-2 block py-1.5 text-center text-xs font-semibold text-[#092866]/30">View profile</span>
        </div>
      </div>
    </article>
  );
}

function BrandPlaceholderTile() {
  return (
    <div className="flex flex-col overflow-hidden border border-dashed bg-white" style={{ borderColor: GRAY }}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Photo src="" alt="" label="Brand photo" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-extrabold text-[#092866]/30">Brand coming soon</h3>
        <p className="mt-1 text-[11px] text-[#092866]/30">New storefronts launching</p>
      </div>
    </div>
  );
}

function PartnerPlaceholderRow() {
  return (
    <div className="grid overflow-hidden border border-dashed md:grid-cols-[240px_1fr_auto] md:items-center" style={{ borderColor: GRAY }}>
      <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#f4f6fb]">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#092866]/35">Partner logo</span>
      </div>
      <div className="p-6 md:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ROYAL }}>
          Partner store
        </p>
        <h3 className="mt-2 text-2xl font-extrabold text-[#092866]/30">Coming soon</h3>
        <p className="mt-2 max-w-xl text-sm text-[#092866]/40">Official partner stores will appear here.</p>
      </div>
      <div className="px-6 pb-6 md:p-8">
        <span className="inline-flex items-center gap-2 border-2 border-[#092866]/15 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#092866]/35">
          Visit the Store
        </span>
      </div>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 9 9 3M4 3h5v5" />
    </svg>
  );
}

function Icon({ name }: { name: string }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  if (name === "user")
    return (
      <svg {...p} aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    );
  if (name === "medal")
    return (
      <svg {...p} aria-hidden>
        <circle cx="12" cy="15" r="6" />
        <path d="M8.5 3h7L13 9.5h-2z" />
      </svg>
    );
  if (name === "heart")
    return (
      <svg {...p} aria-hidden>
        <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
      </svg>
    );
  return (
    <svg {...p} aria-hidden>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" />
    </svg>
  );
}
