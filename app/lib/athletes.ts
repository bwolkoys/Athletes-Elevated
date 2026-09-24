/**
 * Athletes Elevated — athlete data, pulled live from Airtable
 * Place at:  lib/athletes.ts
 *
 * Both /athletes (grid) and /athletes/[slug] (spotlight) read from here.
 * Add a row in Airtable, tick "Published", and it appears on the site within
 * about a minute. No code changes needed.
 *
 * Needs two environment variables (.env.local, and in your hosting settings):
 *   AIRTABLE_TOKEN=pat...      (Personal Access Token, scope: data.records:read)
 *   AIRTABLE_BASE_ID=app...    (from the base URL: airtable.com/appXXXXXXXX/...)
 *
 * Airtable image links expire after a few hours, so photos are served through
 * /api/airtable-image/... (see app/api/airtable-image), which always fetches a
 * fresh link. You can upload photos straight into Airtable attachment fields.
 */

/* ============================================================================
 * AIRTABLE NAMES — if you rename a table or column in Airtable, change it here.
 * ========================================================================= */
export const TABLES = {
    athletes: "Athletes",
    products: "Products",
    content: "Content",
  } as const;
  
  const F = {
    // Athletes table
    name: "Name",
    slug: "Slug",
    firstName: "First Name",
    pronoun: "Pronoun",
    sport: "Sport",
    category: "Category",
    tagline: "Card Tagline",
    cardPhoto: "Card Photo",
    heroPhoto: "Hero Photo",
    heroBlurb: "Hero Blurb",
    bio: "Bio",
    supportingPhoto: "Supporting Photo",
    marketplaceLink: "Marketplace Link",
    published: "Published",
    sortOrder: "Sort Order",
    // Stat 1 Value … Stat 3 Value — the full stat as one line of text
    statLabel: (n: number) => `Stat ${n} Value`,
    // First cause: "Cause Name" / "Cause Description" / "Cause Link"
    // Optional second cause: "Cause 2 Name" / "Cause 2 Description" / "Cause 2 Link"
    causeName: (n: number) => (n === 1 ? "Cause Name" : `Cause ${n} Name`),
    causeDescription: (n: number) => (n === 1 ? "Cause Description" : `Cause ${n} Description`),
    causeLink: (n: number) => (n === 1 ? "Cause Link" : `Cause ${n} Link`),
  
    // Products table
    productName: "Name",
    productBrand: "Brand",
    productPrice: "Price",
    productImage: "Image",
    productLink: "Product Link",
    productAthlete: "Athletes",
    productSort: "Sort Order",
    productLive: "Live",
  
    // Content table
    contentTitle: "Title",
    contentType: "Type",
    contentLink: "Link",
    contentThumb: "Thumbnail",
    contentAthlete: "Athlete",
    contentSort: "Sort Order",
  } as const;
  
  /** How often (seconds) the site re-checks Airtable for changes. */
  export const REVALIDATE_SECONDS = 60;
  
  /* ============================================================================
   * TYPES used by the pages
   * ========================================================================= */
  export type Pronoun = "she" | "he" | "they";
  export type Stat = { label: string };
  export type Cause = { name: string; description: string; href?: string };
  export type Product = { name: string; brand?: string; price?: string; image?: string; href: string };
  export type ContentItem = {
    type: "video" | "article" | "social";
    title: string;
    href: string;
    image?: string;
  };
  
  export type Athlete = {
    slug: string;
    name: string;
    firstName: string;
    pronoun: Pronoun;
    sport: string;
    category: string;
    tagline: string;
    image?: string;
    heroImage?: string;
    heroBlurb: string;
    stats: Stat[];
    bio: string[];
    supportingImage?: string;
    causes: Cause[];
    marketplaceHref: string;
    products: Product[];
    content: ContentItem[];
  };
  
  /* ============================================================================
   * AIRTABLE FETCHING
   * ========================================================================= */
  type AirtableAttachment = { id: string; url: string; filename?: string };
  type AirtableRecord = { id: string; fields: Record<string, unknown> };
  
  const API = "https://api.airtable.com/v0";
  
  function credentials() {
    const token = process.env.AIRTABLE_TOKEN_ATHDETAILS;
    const baseId = process.env.AIRTABLE_BASE_ID_ATHDETAILS;
    if (!token || !baseId) {
      throw new Error(
        "Missing AIRTABLE_TOKEN or AIRTABLE_BASE_ID. Add them to .env.local (and your hosting environment variables)."
      );
    }
    return { token, baseId };
  }
  
  /** Fetch every record in a table (handles Airtable's 100-row pages). */
  export async function fetchAllRecords(
    table: string,
    opts: { filterByFormula?: string; cache?: RequestCache } = {}
  ): Promise<AirtableRecord[]> {
    const { token, baseId } = credentials();
    const records: AirtableRecord[] = [];
    let offset: string | undefined;
  
    do {
      const url = new URL(`${API}/${baseId}/${encodeURIComponent(table)}`);
      url.searchParams.set("pageSize", "100");
      if (opts.filterByFormula) url.searchParams.set("filterByFormula", opts.filterByFormula);
      if (offset) url.searchParams.set("offset", offset);
  
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        ...(opts.cache
          ? { cache: opts.cache }
          : { next: { revalidate: REVALIDATE_SECONDS, tags: ["airtable"] } }),
      });
      if (!res.ok) {
        throw new Error(`Airtable ${table}: ${res.status} ${await res.text()}`);
      }
      const json = (await res.json()) as { records: AirtableRecord[]; offset?: string };
      records.push(...json.records);
      offset = json.offset;
    } while (offset);
  
    return records;
  }
  
  /* ---------- small field readers ---------- */
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "");
  const num = (v: unknown) => (typeof v === "number" ? v : Number.MAX_SAFE_INTEGER);
  const links = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
  
  /** Turn an Airtable attachment field into a stable URL served by our image route. */
  function imageUrl(table: string, recordId: string, v: unknown): string {
    const first = Array.isArray(v) ? (v[0] as AirtableAttachment | undefined) : undefined;
    if (!first?.id) return "";
    const key = (Object.keys(TABLES) as (keyof typeof TABLES)[]).find((k) => TABLES[k] === table);
    return `/api/airtable-image/${key}/${recordId}/${first.id}`;
  }
  
  function formatPrice(v: unknown): string | undefined {
    if (typeof v === "number") {
      return v.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }
    return str(v) || undefined;
  }
  
  function toSlug(s: string) {
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  
  function toPronoun(v: unknown): Pronoun {
    const p = str(v).toLowerCase();
    if (p.startsWith("she") || p === "her") return "she";
    if (p.startsWith("he") || p === "him" || p === "his") return "he";
    return "they";
  }
  
  function toContentType(v: unknown): ContentItem["type"] {
    const t = str(v).toLowerCase();
    if (t.startsWith("vid")) return "video";
    if (t.startsWith("art")) return "article";
    return "social";
  }
  
  /* ============================================================================
   * PUBLIC FUNCTIONS used by the pages
   * ========================================================================= */
  
  /** All published athletes, with their products and content attached. */
  export async function getAthletes(): Promise<Athlete[]> {
    const [athleteRows, productRows, contentRows] = await Promise.all([
      fetchAllRecords(TABLES.athletes, { filterByFormula: `{${F.published}}` }),
      fetchAllRecords(TABLES.products),
      fetchAllRecords(TABLES.content),
    ]);
  
    // Group products & content by the athlete they're linked to
    const productsByAthlete = new Map<string, { sort: number; product: Product }[]>();
    for (const r of productRows) {
      const f = r.fields;
      if (F.productLive in f && !f[F.productLive]) continue; // skip if "Live" unticked
      const name = str(f[F.productName]);
      if (!name) continue;
      const product: Product = {
        name,
        brand: str(f[F.productBrand]) || undefined,
        price: formatPrice(f[F.productPrice]),
        image: imageUrl(TABLES.products, r.id, f[F.productImage]) || undefined,
        href: str(f[F.productLink]),
      };
      for (const athleteId of links(f[F.productAthlete])) {
        const list = productsByAthlete.get(athleteId) ?? [];
        list.push({ sort: num(f[F.productSort]), product });
        productsByAthlete.set(athleteId, list);
      }
    }
  
    const contentByAthlete = new Map<string, { sort: number; item: ContentItem }[]>();
    for (const r of contentRows) {
      const f = r.fields;
      const title = str(f[F.contentTitle]);
      if (!title) continue;
      const item: ContentItem = {
        type: toContentType(f[F.contentType]),
        title,
        href: str(f[F.contentLink]) || "#",
        image: imageUrl(TABLES.content, r.id, f[F.contentThumb]) || undefined,
      };
      for (const athleteId of links(f[F.contentAthlete])) {
        const list = contentByAthlete.get(athleteId) ?? [];
        list.push({ sort: num(f[F.contentSort]), item });
        contentByAthlete.set(athleteId, list);
      }
    }
  
    const athletes = athleteRows
      .map((r) => {
        const f = r.fields;
        const name = str(f[F.name]);
        if (!name) return null;
        const sport = str(f[F.sport]);
        const marketplaceHref = str(f[F.marketplaceLink]) || "/marketplace";
  
        const stats: Stat[] = [1, 2, 3]
          .map((n) => ({ label: str(f[F.statLabel(n)]) }))
          .filter((s) => s.label);
  
        const causes: Cause[] = [1, 2]
          .map((n) => ({
            name: str(f[F.causeName(n)]),
            description: str(f[F.causeDescription(n)]),
            href: str(f[F.causeLink(n)]) || undefined,
          }))
          .filter((c) => c.name);
  
        const products = (productsByAthlete.get(r.id) ?? [])
          .sort((a, b) => a.sort - b.sort)
          .map(({ product }) => ({ ...product, href: product.href || marketplaceHref }));
  
        const content = (contentByAthlete.get(r.id) ?? [])
          .sort((a, b) => a.sort - b.sort)
          .map(({ item }) => item);
  
        const athlete: Athlete & { _sort: number } = {
          _sort: num(f[F.sortOrder]),
          slug: str(f[F.slug]) ? toSlug(str(f[F.slug])) : toSlug(name),
          name,
          firstName: str(f[F.firstName]) || name.split(" ")[0],
          pronoun: toPronoun(f[F.pronoun]),
          sport,
          category: str(f[F.category]),
          tagline: str(f[F.tagline]) || sport,
          image: imageUrl(TABLES.athletes, r.id, f[F.cardPhoto]) || undefined,
          heroImage:
            imageUrl(TABLES.athletes, r.id, f[F.heroPhoto]) ||
            imageUrl(TABLES.athletes, r.id, f[F.cardPhoto]) ||
            undefined,
          heroBlurb: str(f[F.heroBlurb]),
          stats,
          // Blank lines (or single line breaks) in the Bio field become paragraphs
          bio: str(f[F.bio])
            .split(/\n+/)
            .map((p) => p.trim())
            .filter(Boolean),
          supportingImage: imageUrl(TABLES.athletes, r.id, f[F.supportingPhoto]) || undefined,
          causes,
          marketplaceHref,
          products,
          content,
        };
        return athlete;
      })
      .filter((a): a is Athlete & { _sort: number } => a !== null)
      .sort((a, b) => a._sort - b._sort || a.name.localeCompare(b.name));
  
    return athletes.map(({ _sort, ...a }) => a);
  }
  
  export async function getAthlete(slug: string): Promise<Athlete | undefined> {
    const athletes = await getAthletes();
    return athletes.find((a) => a.slug === slug);
  }
  
  /** "Her" / "His" / "Their" and "She Stands" / "He Stands" / "They Stand" */
  export function pronounWords(p: Pronoun) {
    switch (p) {
      case "she":
        return { possessive: "Her", standsFor: "She Stands For" };
      case "he":
        return { possessive: "His", standsFor: "He Stands For" };
      default:
        return { possessive: "Their", standsFor: "They Stand For" };
    }
  }