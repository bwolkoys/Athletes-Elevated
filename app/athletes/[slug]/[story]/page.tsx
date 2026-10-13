/**
 * Athletes Elevated — Athlete story page (article / video / social)
 * Place at:  app/athletes/[slug]/[story]/page.tsx
 *
 * e.g. /athletes/picabo-street/why-i-trust-purity-coffee
 * Opens when a story card is clicked on an athlete's page, or from
 * "Read the full story" on a product. Everything comes from the Airtable
 * Content table (Title, Author, Publish Date, Body, Pull Quote, Thumbnail,
 * Video URL, Product). A story gets its own page when Body or Video URL is
 * filled in; otherwise its card links straight out to the Link column.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { montserrat, HEADLINE_FONT } from "../../../lib/brand";
import { getAthletes, getStory, type ContentItem, type Product } from "../../../lib/athletes";
import Footer from "@/app/src/components/footer";

type PageProps = { params: Promise<{ slug: string; story: string }> };

export const revalidate = 60;
export const dynamicParams = true;

/** Commission disclosure under the product card — draft copy, needs legal review. */
const DISCLOSURE = (first: string, pronoun: string) =>
  `${first} earns a commission when you buy through ${pronoun} store, and a share supports ${pronoun} chosen charity.`;

export async function generateStaticParams() {
  const athletes = await getAthletes();
  return athletes.flatMap((a) =>
    a.content.filter((c) => c.hasPage).map((c) => ({ slug: a.slug, story: c.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, story } = await params;
  const data = await getStory(slug, story);
  if (!data) return { title: "Story not found | Athletes Elevated" };
  return {
    title: `${data.story.title} | ${data.athlete.name} | Athletes Elevated`,
    description: data.story.body[0]?.slice(0, 160),
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug, story: storySlug } = await params;
  const data = await getStory(slug, storySlug);
  if (!data) notFound();
  const { athlete, story, more } = data;

  const her = athlete.pronoun === "she" ? "her" : athlete.pronoun === "he" ? "his" : "their";
  const embed = story.videoUrl ? toEmbed(story.videoUrl) : undefined;
  const product = story.product;
  const productHref = product?.href || athlete.marketplaceHref;

  // Pull quote sits after the second paragraph (or at the end of shorter stories).
  const quoteAt = Math.min(2, story.body.length);
  const meta = [
    story.author && `By ${story.author}`,
    story.date,
    story.readMinutes && `${story.readMinutes} min read`,
  ].filter(Boolean);

  return (
    <main className={`${montserrat.className} min-h-screen bg-white text-[#231f20]`}>
      {/* ============================ BREADCRUMB ============================ */}
      <div className="border-b border-[#c2c2c2]/60 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-3 md:px-10">
          <Link
            href={`/athletes/${athlete.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#231f20]/70 transition hover:text-[#006aac]"
          >
            <ArrowIcon className="rotate-180" />
            Back to {athlete.name}
          </Link>
        </div>
      </div>

      {/* ============================== HEADER ============================== */}
      <header className="mx-auto max-w-7xl px-6 pt-10 md:px-10 md:pt-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#006aac]">
          {product ? `Used by ${athlete.name}` : `${story.type} · ${athlete.name}`}
        </p>
        <h1
          className="mt-3 max-w-4xl text-3xl font-extrabold leading-[1.05] tracking-tight text-[#092866] md:text-5xl"
          style={{ fontFamily: HEADLINE_FONT }}
        >
          {story.title}
        </h1>
        {meta.length > 0 && <p className="mt-3 text-sm text-[#231f20]/60">{meta.join(" · ")}</p>}
      </header>

      {/* ============================ HERO MEDIA ============================ */}
      <div className="mx-auto mt-8 max-w-7xl px-6 md:px-10">
        <div className="relative aspect-video w-full overflow-hidden bg-[#eef4fb]">
          {embed?.kind === "iframe" ? (
            <iframe
              src={embed.src}
              title={story.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : embed?.kind === "video" ? (
            <video src={embed.src} poster={story.image} controls className="absolute inset-0 h-full w-full object-cover" />
          ) : story.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={story.image} alt={story.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <Placeholder label="Story image or video" />
          )}
        </div>
      </div>

      {/* ======================= BODY  |  PRODUCT CARD ======================= */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:px-10 md:py-16 lg:grid-cols-[1fr_380px] lg:items-start">
        <article className="max-w-3xl space-y-5 text-[16px] leading-relaxed text-[#231f20]/85 md:text-[17px]">
          {story.body.length === 0 && (
            <p className="text-[#231f20]/45">The full story is coming soon.</p>
          )}
          {story.body.map((para, i) => (
            <div key={i} className="space-y-5">
              <p>{para}</p>
              {story.pullQuote && i === quoteAt - 1 && <PullQuote text={story.pullQuote} />}
            </div>
          ))}
          {story.pullQuote && story.body.length === 0 && <PullQuote text={story.pullQuote} />}
          {story.externalHref && (
            <p className="pt-2">
              <a
                href={story.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-[0.15em] text-[#006aac] underline-offset-4 hover:underline"
              >
                {story.type === "social" ? "View the original post" : "Read the original"} ↗
              </a>
            </p>
          )}
        </article>

        <aside className="border border-[#c2c2c2]/70 bg-[#f4f6fb] p-6 lg:sticky lg:top-24">
          {product ? (
            <ProductCard product={product} href={productHref} />
          ) : (
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#006aac]">
              Shop {athlete.firstName}&apos;s picks
            </p>
          )}
          <Link
            href={athlete.marketplaceHref}
            className={`flex w-full items-center justify-center gap-2 border-2 border-[#092866] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#092866] transition hover:bg-[#092866] hover:text-white ${
              product ? "mt-3" : "mt-4"
            }`}
          >
            Shop {athlete.firstName}&apos;s Store <ArrowIcon />
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-[#231f20]/55">{DISCLOSURE(athlete.firstName, her)}</p>
        </aside>
      </section>

      {/* ========================= MORE FROM ATHLETE ========================= */}
      <section className="border-t border-[#c2c2c2]/60 bg-[#f4f6fb]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              className="text-2xl font-extrabold uppercase tracking-tight text-[#092866] md:text-3xl"
              style={{ fontFamily: HEADLINE_FONT }}
            >
              More from {athlete.firstName}
            </h2>
            <Link
              href={`/athletes/${athlete.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#092866] hover:text-[#006aac]"
            >
              Back to {athlete.firstName}&apos;s page <ArrowIcon />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((item) => (
              <MoreCard key={item.slug} item={item} />
            ))}
            {Array.from({ length: Math.max(0, 3 - more.length) }).map((_, i) => (
              <MoreCard key={`slot-${i}`} placeholder />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ============================== HELPERS ============================== */

/** YouTube / Vimeo links become embeds; direct .mp4/.webm/.mov links play in a video tag. */
function toEmbed(url: string): { kind: "iframe" | "video"; src: string } | undefined {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return { kind: "iframe", src: `https://www.youtube.com/embed/${u.pathname.slice(1)}` };
    if (host.endsWith("youtube.com")) {
      const id = u.searchParams.get("v") || u.pathname.split("/").filter(Boolean).pop();
      return id ? { kind: "iframe", src: `https://www.youtube.com/embed/${id}` } : undefined;
    }
    if (host.endsWith("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? { kind: "iframe", src: `https://player.vimeo.com/video/${id}` } : undefined;
    }
    if (/\.(mp4|webm|mov)(\?|$)/i.test(u.pathname)) return { kind: "video", src: url };
  } catch {
    return undefined;
  }
  return undefined;
}

/* ============================== COMPONENTS ============================== */

function PullQuote({ text }: { text: string }) {
  return (
    <blockquote
      className="my-8 border-l-4 border-[#52aafc] pl-5 text-xl font-extrabold leading-snug text-[#092866] md:text-2xl"
      style={{ fontFamily: HEADLINE_FONT }}
    >
      &ldquo;{text}&rdquo;
    </blockquote>
  );
}

function ProductCard({ product, href }: { product: Product; href: string }) {
  const external = /^https?:\/\//.test(href);
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#006aac]">Featured in this story</p>
      <div className="relative mt-4 aspect-[4/3] overflow-hidden bg-white">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Placeholder label="Product photo" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-[#092866]">{product.name}</h3>
      {product.brand && (
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#231f20]/55">{product.brand}</p>
      )}
      {product.price && <p className="mt-1 text-sm font-bold text-[#092866]">{product.price}</p>}
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-5 flex w-full items-center justify-center gap-2 bg-[#092866] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#006aac]"
      >
        View product on the store ↗
      </a>
    </div>
  );
}

function MoreCard({ item, placeholder }: { item?: ContentItem; placeholder?: boolean }) {
  if (placeholder || !item) {
    return (
      <div>
        <div className="aspect-[16/9] w-full overflow-hidden border border-dashed border-[#c2c2c2]">
          <Placeholder label="" />
        </div>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#006aac]/50">Story</p>
        <h3 className="mt-1 text-base font-bold text-[#231f20]/35">Coming soon</h3>
      </div>
    );
  }
  const external = /^https?:\/\//.test(item.href);
  return (
    <Link
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#eef4fb]">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <Placeholder label="" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#52aafc] transition-transform duration-300 group-hover:scale-x-100" />
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#006aac]">{item.type}</p>
      <h3 className="mt-1 text-base font-bold text-[#231f20] group-hover:text-[#092866]">{item.title}</h3>
    </Link>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#eef4fb] to-[#dbe6f3] text-[#092866]/35">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
      </svg>
      {label && <span className="text-[11px] font-medium">{label}</span>}
    </div>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" />
    </svg>
  );
}
