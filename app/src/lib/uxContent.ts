export const CTA = {
  applyAthlete: "Apply as athlete",
  partner: "Partner with AE",
  exploreEcosystem: "Explore ecosystem",
  shopAthlink: "Shop Athlink",
  joinNewsletter: "Join newsletter",
  heroUpdates: "Get HERO updates",
  fielddayWaitlist: "Join FIELDDAY waitlist",
  athleteTools: "Explore athlete tools",
} as const;

export const HERO_PROPOSITIONS = {
  home:
    "An invite-only ecosystem helping athletes turn performance into platform through media, marketplace tools, youth sports infrastructure, and brand relationships.",
  athletes:
    "Build your profile, partnerships, story, and post-game opportunity inside the Athletes Elevated network.",
  ecosystem:
    "A connected product system for athlete storytelling, fan commerce, youth sports operations, and relationship management.",
  brands:
    "Partner with athletes across content, marketplace, youth sports, and community touchpoints through one relationship.",
  fans:
    "Shop athlete products, follow real stories, support impact, and get early access to what AE launches next.",
} as const;

export type ProductStatus =
  | "Live"
  | "Private"
  | "Invite-only"
  | "In production"
  | "Coming soon"
  | "Internal system";

export type Product = {
  name: string;
  category: string;
  audience: string;
  status: ProductStatus;
  summary: string;
  features: string[];
  ctaLabel: string;
  href: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Athlink",
    category: "Athlete marketplace",
    audience: "Athletes, fans, brands",
    status: "Private",
    summary:
      "Athlete profiles and marketplace storefronts where fans shop products, discount codes, and brand partnerships from athletes they follow.",
    features: ["Profile links", "Discount codes", "Marketplace discovery"],
    ctaLabel: CTA.shopAthlink,
    href: "https://myathlink.com/",
  },
  {
    name: "HERO",
    category: "Documentary media",
    audience: "Fans, athletes, brands",
    status: "In production",
    summary:
      "A documentary and media platform exploring athletes as cultural catalysts beyond performance.",
    features: ["Original stories", "Filmed legends", "Culture and legacy"],
    ctaLabel: CTA.heroUpdates,
    href: "/fans#newsletter",
  },
  {
    name: "Teams Elevated",
    category: "Youth sports ops",
    audience: "Leagues, families, sponsors",
    status: "Invite-only",
    summary:
      "Operations infrastructure for rosters, payments, crowdfunding, communication, and sponsorship in youth sports.",
    features: ["Payments", "Rosters", "Crowdfunding"],
    ctaLabel: "Explore Teams Elevated",
    href: "/ecosystem#teams",
  },
  {
    name: "Eye In Teams",
    category: "Relationship CRM",
    audience: "Athletes, brands, operators",
    status: "Internal system",
    summary:
      "A relationship operating system for outreach, contacts, campaigns, templates, surveys, pipelines, and analytics.",
    features: ["Email + SMS", "Pipelines", "Analytics"],
    ctaLabel: "Explore Eye In Teams",
    href: "/ecosystem#crm",
  },
  {
    name: "FIELDDAY",
    category: "Fantasy track",
    audience: "Fans",
    status: "Coming soon",
    summary:
      "A fantasy track and field fan product built around Diamond League competition, managed squads, scoring, and rewards.",
    features: ["Managed squads", "Live scoring", "Season play"],
    ctaLabel: CTA.fielddayWaitlist,
    href: "/fans#newsletter",
  },
];

export const PROOF_POINTS = [
  { value: "5", label: "Legends filmed" },
  { value: "4+", label: "Connected products" },
  { value: "3+", label: "Nonprofits supported" },
  { value: "100%", label: "Donation pass-through" },
];

export const PAGE_METADATA = {
  home: {
    title: "Athletes Elevated | Athlete Media, Marketplace, and Impact Ecosystem",
    description:
      "Athletes Elevated helps athletes turn performance into platform through media, marketplace tools, youth sports infrastructure, brand relationships, and community impact.",
  },
  athletes: {
    title: "For Athletes | Athletes Elevated",
    description:
      "Apply to join Athletes Elevated and build your profile, partnerships, story, fan relationships, and post-game opportunity.",
  },
  ecosystem: {
    title: "Ecosystem | Athletes Elevated",
    description:
      "Explore the Athletes Elevated ecosystem: Athlink, HERO, Teams Elevated, Eye In Teams, and FIELDDAY.",
  },
  brands: {
    title: "For Brands | Partner with Athletes Elevated",
    description:
      "Partner with athletes across storytelling, marketplace, youth sports, relationship tools, and community impact through Athletes Elevated.",
  },
  fans: {
    title: "For Fans | Athletes Elevated",
    description:
      "Shop Athlink, follow HERO updates, support athlete impact, and join the fan list for new Athletes Elevated launches.",
  },
} as const;
