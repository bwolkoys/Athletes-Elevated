"use client";

import { useEffect, useState } from "react";
import Footer from "../src/components/footer";
import Navbar from "../src/components/navBar";

type Product = {
  id: number;
  name: string;
  price: string;
  visual: string; // big watermark number (kits) or short monogram (accessories)
  description: string;
  features: string[];
  image: string;
  shopUrl: string;
  // Some kits (the Home/Away Elite shirts and their Women's versions) don't
  // include the Athletes Elevated back-of-shirt branding by default — it has
  // to be added as a free "personalisation" on the West Ham store. The Third
  // kit shirts already come printed with it, so they don't need the guide.
  needsPersonalization: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "West Ham 26/27 Elite Home Shirt",
    price: "£110",
    visual: "1",
    description:
      "Built for performance and inspired by the Club’s next chapter, the West Ham United x New Balance 2026/27 Elite Home Shirt combines iconic Claret and Blue colours with cutting-edge innovation. Designed to mirror the shirt worn by the players, it delivers premium comfort and a professional-level feel whether you're backing the Hammers from the stands or taking to the pitch yourself.",
    features: ["Official West Ham United x New Balance 2026/27 Elite Home Shirt", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Finished with official Club branding in classic West Ham colours", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteHome.png",
    shopUrl: "https://tidd.ly/4wb1AlG",
    needsPersonalization: true,
  },
  {
    id: 2,
    name: "West Ham 26/27 Elite Away Shirt",
    price: "£110",
    visual: "2",
    description: "Built for performance and inspired by the Club's next chapter, the West Ham United x New Balance 2026/27 Elite Away Shirt combines the iconic white Away colours with cutting-edge innovation. Designed to mirror the shirt worn at the highest level, it delivers premium comfort whether you're backing the Hammers from the stands or on the pitch yourself.",
    features: ["Official West Ham United x New Balance 2026/27 Elite Away Shirt", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Finished with official West Ham United Club crest and New Balance branding in classic Away styling", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteAway.png",
    shopUrl: "https://tidd.ly/4vFyGca",
    needsPersonalization: true,
  },
  {
    id: 3,
    name: "West Ham 26/27 Womens Elite Home Shirt",
    price: "£110",
    visual: "3",
    description: "A performance-led design made for the next chapter, the West Ham United x New Balance 2026/27 Women’s Elite Home Shirt combines iconic Claret and Blue style with advanced comfort and modern craftsmanship. Designed for supporters who want the same elite-level feel as the players, it delivers lightweight performance and freedom of movement throughout every moment of the season.",
    features: ["Official West Ham United x New Balance 2026/27 Women’s Elite Home Shirt", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric for a premium feel", "Short sleeve design for comfort and freedom of movement", "Finished with official Club branding in classic West Ham colours", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteHome.png",
    shopUrl: "https://tidd.ly/4prol1S",
    needsPersonalization: true,
  },
  {
    id: 4,
    name: "West Ham 26/27 Womens Elite Away Shirt",
    price: "£110",
    visual: "H",
    description:
      "Built for performance and inspired by the Club's next chapter, the West Ham United x New Balance 2026/27 Women’s Elite Away Shirt combines the iconic white Away colours with cutting-edge innovation. Designed for a tailored women’s fit and to mirror the shirt worn at the highest level, it delivers premium comfort whether you're backing the Hammers from the stands or on the pitch yourself.",
    features: ["Official West Ham United x New Balance 2026/27 Women’s Elite Away Shirt", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Designed for a women’s fit for enhanced comfort and wearability", "Finished with official West Ham United Club crest and New Balance branding in classic Away styling", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteAway.png",
    shopUrl: "https://tidd.ly/4f9lLdx",
    needsPersonalization: true,
  },
  {
    id: 5,
    name: "West Ham 26/27 ELITE Third Shirt",
    price: "£110",
    visual: "SC",
    description: "Bold, bright and contemporary, the West Ham United x New Balance 2026/27 Elite Third Shirt brings the vibrancy of summer to the pitch with a distinctive bleach blue colour and fluid tonal graphics. Inspired by the creative beating heart of modern East London, this premium performance jersey mirrors the shirt worn at the highest level, combining cutting-edge innovation with a striking design for players and supporters alike.",
    features: ["Official West Ham United x New Balance 2026/27 Elite Third Shirt", "Distinctive bleach blue colour with fluid tonal graphics inspired by the vibrancy of summer", "NB DRYx fast-drying technology helps wick moisture away from the skin", "HeiQ Smart Temp technology helps keep you cool and comfortable", "Lightweight engineered jacquard knit fabric", "Short sleeve design for unrestricted movement", "Finished with official West Ham United Club crest and New Balance branding", "Made from 90% recycled polyester and 10% elastane"],
    image: "/marketplace/eliteThird.png",
    shopUrl: "https://tidd.ly/4c3SLBW",
    needsPersonalization: false,
  },
  {
    id: 6,
    name: "West Ham 26/27 Womens Third Shirt",
    price: "£75",
    visual: "CP",
    description: "Represent the Hammers in comfort with the West Ham United x New Balance 2026/27 Unsponsored Third Shirt. Bold, bright and contemporary, the distinctive bleach blue colour is brought to life by fluid tonal graphics, creating a striking look inspired by the vibrancy of summer. Designed for game days and everyday support, this lightweight jersey combines fast-drying NB DRY technology with a smooth, comfortable fit.",
    features: ["Official West Ham United x New Balance 2026/27 Unsponsored Third Shirt", "Distinctive bleach blue colour with fluid tonal graphics", "Short sleeve design for a classic match-inspired look", "NB DRY fast-drying technology helps wick moisture away from the body", "Standard fit designed to provide a true-to-size feel", "Lightweight polyester material for a comfortable feel", "Finished with official West Ham United colours and club branding", "Made from 100% recycled polyester"],
    image: "/marketplace/third.png",
    shopUrl: "https://tidd.ly/4xk1TdP",
    needsPersonalization: false,
  },
  {
    id: 7,
    name: "West Ham 26/27 Third Shirt",
    price: "£75",
    visual: "BG",
    description:
      "Represent the Hammers in comfort with the West Ham United x New Balance 2026/27 Third Shirt. Bold, bright and contemporary, the distinctive bleach blue colour is brought to life by fluid tonal graphics, creating a striking look inspired by the vibrancy of summer. Designed for players and fans alike, this lightweight jersey combines fast-drying NB DRY technology with a comfortable fit to keep you feeling fresh throughout the season.",
    features: ["Official West Ham United x New Balance 2026/27 Third Shirt", "Distinctive bleach blue colour with fluid tonal graphics", "Short sleeve design for a classic match-inspired look", "NB DRY fast-drying technology helps wick moisture away from the body", "Standard fit designed to provide a true-to-size feel", "Lightweight polyester material for a comfortable feel", "Finished with official West Ham United colours and club branding", "Made from 100% recycled polyester"],
    image: "/marketplace/third.png",
    shopUrl: "https://tidd.ly/456TLBB",
    needsPersonalization: false,
  },
];

// --- Access gate + discount popup config ---------------------------------
// Key used to remember (in this browser) that the visitor already submitted
// the gate form, so they aren't asked again on repeat visits.
const ACCESS_STORAGE_KEY = "ae_marketplace_access";
const LEAD_STORAGE_KEY = "ae_marketplace_lead";
const DISCOUNT_CODE = "AE15OFF";

type LeadForm = {
  firstName: string;
  lastName: string;
  email: string;
};

// --- "How to add AE" walkthrough config -----------------------------------
// Shown on the product detail page, between the product card and "You might
// also like", for any kit that doesn't come with the Athletes Elevated
// branding built in (see `needsPersonalization` on Product above). Verified
// against the live West Ham store: on those shirts, click "Add
// Personalisation," then under step 3 — "Select Adults Athletes Elevated EFL
// Back of Shirt Sponsor" — choose that option (it's free).
type PersonalizationStep = {
  step: number;
  title: string;
  description: string;
  // TODO: replace with a real screenshot from the West Ham personalisation
  // flow, e.g. "/marketplace/personalize-step-1.png". Suggested crops:
  //   1. The product page with the "Add Personalisation" button visible.
  //   2. The opened panel scrolled to "3. Select Adults Athletes Elevated
  //      EFL Back of Shirt Sponsor," with that option visible.
  //   3. That option selected/checked, ready to add to bag.
  image: string;
};

const PERSONALIZATION_STEPS: PersonalizationStep[] = [
  {
    step: 1,
    title: "Click “Add Personalisation”",
    description:
      "On the product page over on the West Ham store, click Add Personalisation, just above Add to Bag.",
    image: "/marketplace/5.png",
  },
  {
    step: 2,
    title: "Choose the Athletes Elevated option",
    description:
      "Scroll to “Select Adults Athletes Elevated EFL Back of Shirt Sponsor” and choose it — it's a free add-on.",
    image: "/marketplace/6.png",
  },
  {
    step: 3,
    title: "Add to bag",
    description:
      "Finish any other personalisation you want, then add to bag. That's it — same shirt, same branding as the players.",
    image: "/marketplace/7.png",
  },
];

function StepVisual({ step }: { step: PersonalizationStep }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-neutral-100 sm:h-48">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={step.image}
        alt={step.title}
        className="h-full w-full object-cover"
      />
      <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#7A1F2B] text-sm font-bold text-white shadow-md">
        {step.step}
      </span>
    </div>
  );
}

function PersonalizationGuide() {
  return (
    <div className="mt-10 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-[#1B90BC]">
        Wear what the players wear
      </p>
      <h3 className="mt-1 text-xl font-bold text-neutral-900 sm:text-2xl">
        Add the Athletes Elevated personalisation and you&apos;re in the same
        shirt the players wear on the field.
      </h3>
      <p className="mt-2 text-sm text-neutral-500">
        This shirt doesn&apos;t come with the AE branding by default — here&apos;s
        how to add it for free on the West Ham United store.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PERSONALIZATION_STEPS.map((step) => (
          <div key={step.step}>
            <StepVisual step={step} />
            <p className="mt-3 text-sm font-semibold text-neutral-900">
              {step.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductVisual({ product, size }: { product: Product; size: "sm" | "lg" }) {
  const heightClass = size === "lg" ? "h-90 sm:h-110" : "h-50";

  if (product.image) {
    return (
      <div className={`${heightClass} w-full overflow-hidden rounded-2xl`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${heightClass} w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#8C2438] via-[#7A1F2B] to-[#4A121B] shadow-inner`}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 18px)",
        }}
      />
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#1BB1E7]/20 blur-2xl" />
      <div className="flex h-full w-full items-center justify-center">
        <span
          className={`select-none font-black italic text-white/15 ${
            size === "lg" ? "text-[9rem]" : "text-6xl"
          }`}
        >
          {product.visual}
        </span>
      </div>
    </div>
  );
}

const TICKER_TEXT = "Official merchandise";

// Awin affiliate banner for West Ham United. Keep the <img> and the tracked
// <a href> paired exactly as provided by Awin — separating them breaks
// commission tracking on any click-throughs.
const AWIN_LINK =
  "https://www.awin1.com/cread.php?s=4029952&v=19650&q=389560&r=2975489";
// Local hero image instead of Awin's dynamically-served (and blurry) banner.
// Drop the real file at public/whu-x-ae/hero-banner.jpg and adjust the path
// below if you name or place it differently.
const HERO_IMAGE = "/whu-wrexham-lp/2633.jpg";

function Header() {
  return (
    <div>
      <header className="w-full bg-black pt-16">
        <a rel="sponsored" href={AWIN_LINK} className="block w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="West Ham United — official partner offer"
            className="block h-auto w-full"
          />
        </a>
      </header>

      <div className="relative overflow-hidden border-y-2 border-[#1BB1E7] bg-[#7A1F2B] py-2.5">
        <style>{`
          @keyframes whuMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
        <div
          className="flex w-max whitespace-nowrap pt-4 pb-4"
          style={{ animation: "whuMarquee 45s linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {Array.from({ length: 8 }).map((_, j) => (
                <span
                  key={j}
                  className="mx-6 flex shrink-0 items-center gap-6 text-lg font-bold uppercase tracking-wide text-white"
                > <span className="text-[#8FD5F7]">•</span>
                  {TICKER_TEXT}
                  <span className="text-[#8FD5F7]">•</span>
                  West Ham United
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Full-screen form that must be completed before the marketplace is visible.
function AccessGate({
  onSubmit,
}: {
  onSubmit: (lead: LeadForm) => void;
}) {
  const [form, setForm] = useState<LeadForm>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");

  function handleChange(field: keyof LeadForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !email) {
      setError("Please fill out all fields.");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onSubmit({ firstName, lastName, email });
  }

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-wide text-[#1B90BC]">
          West Ham United x Athletes Elevated
        </p>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900">
          Enter to unlock the marketplace
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Tell us who you are and we&apos;ll get you straight in — plus a
          discount code for your first shirt.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange("firstName")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#7A1F2B] focus:ring-2 focus:ring-[#7A1F2B]/20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange("lastName")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#7A1F2B] focus:ring-2 focus:ring-[#7A1F2B]/20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#7A1F2B] focus:ring-2 focus:ring-[#7A1F2B]/20"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[#7A1F2B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7A1F2B]/30 transition hover:-translate-y-0.5 hover:bg-[#621826]"
          >
            Enter marketplace
          </button>
        </form>
      </div>
    </div>
  );
}

// Popup shown once, immediately after the access form is submitted, with a
// copyable discount code.
function DiscountPopup({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-neutral-400 transition hover:text-neutral-700"
        >
          ✕
        </button>

        <p className="text-xs font-bold uppercase tracking-wide text-[#1B90BC]">
          You&apos;re in!
        </p>
        <h2 className="mt-2 text-2xl font-bold text-neutral-900">
          Here&apos;s 15% off
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Use this code at checkout on your next shirt.
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border-2 border-dashed border-[#7A1F2B]/40 bg-[#7A1F2B]/5 px-4 py-3">
          <span className="text-lg font-bold tracking-widest text-[#7A1F2B]">
            {DISCOUNT_CODE}
          </span>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-lg bg-[#7A1F2B] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#621826]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Start shopping
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [selected, setSelected] = useState<Product | null>(null);

  // hasAccess: null = still checking localStorage, false = show gate,
  // true = gate passed, show the marketplace.
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [showDiscount, setShowDiscount] = useState(false);

  useEffect(() => {
    try {
      setHasAccess(localStorage.getItem(ACCESS_STORAGE_KEY) === "true");
    } catch {
      // localStorage unavailable (e.g. blocked) — fall back to always
      // showing the gate for this visit.
      setHasAccess(false);
    }
  }, []);

  function handleGateSubmit(lead: LeadForm) {
    try {
      localStorage.setItem(ACCESS_STORAGE_KEY, "true");
      localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(lead));
    } catch {
      // Ignore storage failures — access still granted for this session.
    }

    // Send the lead to our server so it's captured for future marketing
    // (see app/api/leads/route.ts). Fire-and-forget: a slow or failed
    // request shouldn't block the visitor from getting into the site.
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch((err) => {
      console.error("Failed to submit lead:", err);
    });

    setHasAccess(true);
    setShowDiscount(true);
  }

  const related = selected
    ? PRODUCTS.filter((p) => p.id !== selected.id).slice(0, 3)
    : [];

  // Avoid a flash of the gate (or the marketplace) before we've checked
  // localStorage on mount.
  if (hasAccess === null) {
    return <main className="min-h-screen bg-neutral-50" />;
  }

  if (!hasAccess) {
    return <AccessGate onSubmit={handleGateSubmit} />;
  }

  return (
    <main className="min-h-screen bg-neutral-50">
        <Navbar />
      <Header />

      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-12">
        {!selected ? (
          <>
          <p className="text-center pb-8 text-[#1B90BC] italic font-bold ">
          Add the Athletes Elevated personalization and step out in the exact shirt the players wear on the pitch — one click away.
        </p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelected(product)}
                  className="group rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7A1F2B]/10 hover:ring-[#1BB1E7]/40"
                >
                  <div className="relative">
                    <ProductVisual product={product} size="sm" />
                    <div className="absolute -right-2 -top-2 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#7A1F2B] shadow-md ring-1 ring-black/5">
                      {product.price}
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-neutral-900">
                    {product.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-[#1B90BC] opacity-0 transition group-hover:opacity-100">
                    View details
                    <span aria-hidden="true">→</span>
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelected(null)}
              className="mb-6 flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-[#7A1F2B]"
            >
              <span aria-hidden="true">←</span> Back to all products
            </button>
            <p className="text-center pb-8 text-[#1B90BC] italic font-bold">
            How to add the Athletes Elevated logo to your jersey, FREE, in 3 easy steps below, to ensure you have the official gameday kit that the players wear!
        </p>

            <div className="grid gap-10 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8 md:grid-cols-2">
              <ProductVisual product={selected} size="lg" />
              <div className="flex flex-col justify-center">
                <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
                  {selected.name}
                </h2>
                <p className="mt-2 text-xl font-semibold text-[#7A1F2B]">
                  {selected.price}
                </p>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {selected.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {selected.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1BB1E7]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={selected.shopUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-[#7A1F2B] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7A1F2B]/30 transition hover:-translate-y-0.5 hover:bg-[#621826] hover:shadow-xl"
                >
                  Shop on WHU
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="mt-3 text-xs text-neutral-400">
                  Opens on the official West Ham United store in a new tab.
                </p>
              </div>
            </div>

            {selected.needsPersonalization && <PersonalizationGuide />}

            <div className="mt-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                You might also like
              </p>
              <div className="grid grid-cols-3 gap-4">
                {related.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelected(product)}
                    className="group rounded-2xl bg-white p-2.5 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <ProductVisual product={product} size="sm" />
                    <p className="mt-2 truncate text-xs font-semibold text-neutral-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-neutral-500">{product.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
<Footer />

      {showDiscount && (
        <DiscountPopup onClose={() => setShowDiscount(false)} />
      )}
    </main>
  );
}