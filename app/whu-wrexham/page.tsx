"use client";

/**
 
 * WHAT ELSE THIS PAGE NEEDS (delivered alongside this file, in sibling
 * folders — see the project README for the full integration guide):
 *   - app/api/predictions/route.ts   (the fetch() call below posts here)
 *   - lib/airtable.ts                 (used by that API route)
 *   - public/images/crest-west-ham.png
 *   - public/images/crest-wrexham.png
 */

import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";

// Site type system — reads the same CSS custom properties your
// globals.css already defines on :root (--font-heading, --font-body), so
// this page automatically matches whatever the rest of the site does with
// those variables instead of guessing at a raw font-family string. The
// literal names after the comma are just a fallback in case those
// variables are ever undefined for some reason.
const HEADING = "var(--font-heading, 'Apotek Extended'), sans-serif";
const BODY = "var(--font-body, 'DM Sans'), sans-serif";

const SITE = {
  matchLabel: "West Ham vs. Wrexham | Friday, September 11th",
  predictionsCloseISO: "2026-09-09T23:59:00-04:00", // "Sept 9th at 11:59 PM EST / 4:59 BST"
};

const HERO = {
  badge: SITE.matchLabel,
  titleLine1: "Road To",
  titleLine2: "Matchday",
  subheadLine1: "Marlon's called it.",
  subheadLine2: "Now you call it.",
  body: "Four questions. One match. Put your name to a scoreline and get closer to West Ham vs. Wrexham than the fixture list will ever get you — through Marlon, through the supporters around you, and through Athletes Elevated.",
  primaryCta: { label: "Make Your Picks", href: "#predict" },
  secondaryCta: { label: "See Marlon's Picks", href: "#marlon" },
  disclaimer:
    "Free to enter. Everyone who calls the match is in the running for the Athletes Elevated pre-match fan experience on September 11. No purchase necessary. Purchase does not increase your chances of winning.",
};

const HOW_IT_WORKS = {
  eyebrow: "How It Works",
  title: "Three Steps to Matchday",
  steps: [
    {
      number: 1,
      title: "Watch Marlon Call It",
      body: "He's given us his score, his first scorer, his Bowen shout and the minute the first one goes in. No hedging.",
    },
    {
      number: 2,
      title: "Call It Yourself",
      body: "Answer the same four questions. Takes under a minute. You're then in for the pre-match fan experience on September 11.",
    },
    {
      number: 3,
      title: "Find Out How You Did",
      body: "We'll publish the results the day after the match — you against Marlon, and you against every other supporter who called it.",
    },
  ],
};

const MARLON = {
  picksTitle: "Marlon's Picks",
  fourTitle: "Marlon's Four",
  videoUrl: "", // TODO: swap for the real video embed URL once Marlon's call is filmed.
  videoPlaceholderLabel: "Marlon's call — video coming soon",
  fourAnswers: [
    { label: "Final Score", value: "WHU ?? vs Wrexham ??" }, // TODO
    { label: "Name of First Scorer", value: "????? ?????" }, // TODO
    { label: "Jarrod Bowen Scores?", value: "Yes / No" }, // TODO
    { label: "Minute of the First Goal", value: "??:??" }, // TODO
  ],
  ritualsTitle: "Marlon's Matchday Rituals",
  ritualsQuote: "Placeholder text. Quote Marlon's ritual here.", // TODO
  beatHisPicksCta: { label: "Beat His Picks", href: "#predict" },
};

// TODO: populate with the real matchday squad list once confirmed, e.g.
// ["Jarrod Bowen", "Niclas Füllkrug", "Mohammed Kudus", ...].
// Leaving this empty makes the form fall back to a free-text field instead
// of a dropdown, so the page still works before the squad is finalized.
const PLAYER_OPTIONS: string[] = [];

const PREDICTIONS = {
  eyebrow: "Make Your Predictions",
  titleLine1: "Four Questions.",
  titleLine2: "One Minute.",
  body: "Same four questions Marlon answered. Answer them honestly — the results get published either way.",
  bullets: [
    {
      strong: "Everyone who enters",
      rest: "is in the draw for the Athletes Elevated pre-match fan experience on September 11.",
    },
    {
      strong: "Your predictions are for fun and bragging rights.",
      rest: "Prediction accuracy does not affect your chances of winning. Eligible winners are selected at random.",
    },
    { strong: "No purchase required.", rest: "Free to enter, one entry per supporter." },
  ],
  closesPill: "Predictions Close: Sept 9th at 11:59 PM EST/4:59 BST",
  formNote: "One entry per supporter. Predictions close Sept 9th.",
};

const WHATS_ON_THE_LINE = {
  eyebrow: "What's on the Line",
  titleLine1: "One Way to Win.",
  titleLine2: "Multiple Winners.",
  cardTag: "Sept 11 | Pre-Match",
  cardTitle: "The Athletes Elevated Fan Experience",
  winnerLine: "One winner + one guest (multiple winners chosen, each winner can bring a guest)",
  body: "Join Athletes Elevated for our Road to Matchday pre-game experience in London on September 11 before West Ham vs. Wrexham.",
  includes: ["Free food and drink voucher"],
  excludes: ["Travel to/from London, accommodation or tickets to the game."],
  eligibility:
    "The selected winners must be 18+ and be in London on September 11 and respond to winner notification within 24 hours or an alternate winner may be selected.",
  oddsNote: "Everyone who calls the match is entered. Accuracy does not matter.",
  entryClosesLabel: "Entry Closes Sept 9", // TODO: confirm exact date ("Sept __" in source design)
  winnersNotifiedLabel: "Winners Notified Sept 8",
};

const BUY_FOR_A_MATE = {
  liveDateLabel: "Live Sept 1",
  titleLine1: "Buy For",
  titleLine2: "A Mate",
  body: "Someone in your group chat has called it wrong every week since August. Sort them out. Selected West Ham kit and gifting, straight through Athletes Elevated.",
  marketplaceIntro: "Visit the Marketplace for More Options!",
  // TODO: replace with real product photography, names, descriptions and prices.
  products: [
    { name: "Product One", description: "Describe what it is", cost: "£00.00" },
    { name: "Product Two", description: "Describe what it is", cost: "£00.00" },
    { name: "Product Three", description: "Describe what it is", cost: "£00.00" },
  ],
  marketplaceCta: { label: "Visit the Marketplace", href: "#" },
  fulfilmentNote: "Ordering and fulfilment handled through Athletes Elevated.", // TODO: add shipping cut-off if anything needs to land before September 11.
};

const TIMELINE = {
  eyebrow: "The Road",
  titleLine1: "What Happens",
  titleLine2: "Between Now and Then",
  milestones: [
    {
      date: "Thursday, August 27",
      title: "Call the Match Opens",
      body: "Marlon makes the first call. Predictions open to every supporter.",
      status: "past",
    },
    {
      date: "Tuesday, September 1",
      title: "Buy for a Mate Goes Live",
      body: "Selected West Ham kit and gifting opens through Athletes Elevated.",
      status: "past",
    },
    {
      date: "Friday, September 4",
      title: "Matchday Momentum",
      body: "Matchday rituals, Marlon vs. the fans, and where the supporter predictions are landing.",
      status: "past",
    },
    {
      date: "Monday, September 7",
      title: "Last Call",
      body: "Final chance to get your predictions in before they close.",
      status: "past",
    },
    {
      date: "Tuesday, September 8",
      title: "Pre-Match Experience Winners",
      body: "Selected supporters are notified by email.",
      status: "past",
    },
    {
      date: "Friday, September 11",
      title: "West Ham vs. Wrexham",
      body: "Matchday. Pre-match meetup, then the ninety minutes everyone's been calling.",
      status: "current",
    },
    {
      date: "Saturday, September 12",
      title: "How Did You Do?",
      body: "Full results, you against Marlon. Did you beat Marlon's picks?",
      status: "future",
    },
  ],
};

const FAQ = {
  eyebrow: "The Details",
  title: "Before You Call It",
  // TODO: fill in real answers before launch — placeholders kept from the source design.
  items: [
    { question: "Does it cost anything to enter?", answer: "Answer" },
    { question: "When do predictions close?", answer: "Answer" },
    { question: "How are the pre-match experience places chosen?", answer: "Answer" },
    { question: "What counts as calling the match correctly?", answer: "Answer" },
    { question: "Who can enter?", answer: "Answer" },
    { question: "Can I change my predictions?", answer: "Answer" },
    { question: "What happens to my details?", answer: "Answer" },
    { question: "Full terms and conditions.", answer: "Answer" },
  ],
};

const CLOSING_CTA = {
  eyebrow: "Last Thing",
  titleLine1: "He's Called It.",
  titleLine2: "It's Your Turn.",
  body: "Four questions, one minute, and a reason to care about every touch on September 11.",
  cta: { label: "Call the Match", href: "#predict" },
};

const FOOTER = {
  legalLine1:
    "Road to Matchday is a fan campaign from Athletes Elevated. [Insert the exact West Ham United relationship wording that Matthew clears with the club — e.g. \"in partnership with\" vs. \"supported by\". Do not publish a club relationship claim that hasn't been approved.]",
  legalLine2:
    "No purchase necessary. Open to entrants aged 18 and over in [eligible territories]. Prize draw entry closes [date/time]. Full terms apply.",
  copyright:
    "© 2026 Athletes Elevated. All rights reserved. West Ham United and the West Ham United crest are trademarks of West Ham United Football Club Limited.",
  links: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Shop", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

/* ============================================================================
   SHARED STYLE STRINGS — small helpers so repeated Tailwind combos
   (buttons, eyebrow labels) aren't retyped everywhere below. None of these
   set font-family — apply HEADING/BODY via the `style` prop at each usage.
============================================================================ */

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 px-7 py-3 uppercase tracking-wide text-sm font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0";
const BTN_ACCENT = `${BTN_BASE} border-[#52AAFC] bg-[#52AAFC] text-[#081A45] hover:bg-[#8FC8FD]`;
const BTN_OUTLINE = `${BTN_BASE} border-[#52AAFC]/70 bg-transparent text-white hover:bg-white/10`;
const BTN_CLARET = `${BTN_BASE} border-[#7C2C41] bg-[#6B2338] text-white hover:bg-[#7C2C41]`;
const BTN_NAVY_OUTLINE = `${BTN_BASE} border-[#0B2560] bg-transparent text-[#0B2560] hover:bg-[#0B2560] hover:text-white`;
const EYEBROW = "uppercase tracking-[0.12em] text-sm font-bold";
const HEADING_STYLE = { fontFamily: HEADING };

const CLARET_GRADIENT_BG =
  "bg-[radial-gradient(120%_140%_at_15%_0%,#7C2C41_0%,#4A1826_55%,#3A121D_100%)]";
const NAVY_GRADIENT_BG = "bg-[linear-gradient(180deg,#0B2560_0%,#081A45_100%)]";

/* ============================================================================
   PAGE
============================================================================ */

export default function WHUxWrexham() {
  // Smooth-scrolls the in-page "#predict" / "#marlon" anchor links without
  // needing to touch the host site's <html> element.
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#F7F8FA] text-[#0F1A2E]" style={{ fontFamily: BODY }}>
      {/* ============================ HERO ============================ */}
      <section className={`relative overflow-hidden text-white ${CLARET_GRADIENT_BG}`}>
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 sm:px-10 sm:pt-20 lg:pt-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <span
                className={`${EYEBROW} inline-block rounded-full border-2 border-[#52AAFC] px-5 py-2 text-[#52AAFC]`}
                style={HEADING_STYLE}
              >
                {HERO.badge}
              </span>

              <h1
                className="mt-8 text-6xl font-semibold uppercase leading-[0.95] text-white sm:text-7xl lg:text-8xl"
                style={HEADING_STYLE}
              >
                {HERO.titleLine1}
                <br />
                <span className="text-[#52AAFC]">{HERO.titleLine2}</span>
              </h1>

              <div className="mt-8 h-px w-24 bg-white/40" />

              <p className="mt-8 text-2xl font-bold sm:text-3xl" style={HEADING_STYLE}>
                {HERO.subheadLine1}
                <br />
                <span className="text-[#52AAFC]">{HERO.subheadLine2}</span>
              </p>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{HERO.body}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href={HERO.primaryCta.href} className={BTN_ACCENT} style={HEADING_STYLE}>
                  {HERO.primaryCta.label}
                </a>
                <a href={HERO.secondaryCta.href} className={BTN_OUTLINE} style={HEADING_STYLE}>
                  {HERO.secondaryCta.label}
                </a>
              </div>

              <p className="mt-8 max-w-2xl text-xs leading-relaxed text-white/70">
                {HERO.disclaimer}
              </p>
            </div>

            <div className="relative flex items-center justify-center gap-6 py-6 lg:justify-end lg:py-0">
              <Image
                src="/images/WHU_logo.png"
                alt="West Ham United crest"
                width={180}
                height={200}
                className="h-32 w-auto drop-shadow-lg sm:h-40 lg:h-44"
                priority
              />
              {/* <div className="h-32 w-px rotate-[20deg] bg-white/50 sm:h-40 lg:h-44" />
              <Image
                src="/images/Wrexham_A.F.C._Logo.png"
                alt="Wrexham AFC crest"
                width={160}
                height={200}
                className="h-32 w-auto drop-shadow-lg sm:h-40 lg:h-44"
                priority
              /> */}
            </div>
          </div>

          <div className="mt-14 border-t border-white/20 pt-10">
            <Countdown targetISO={SITE.predictionsCloseISO} />
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ========================= */}
      <section className={`text-white ${NAVY_GRADIENT_BG}`}>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
            {HOW_IT_WORKS.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl" style={HEADING_STYLE}>
            {HOW_IT_WORKS.title}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {HOW_IT_WORKS.steps.map((step) => (
              <div key={step.number} className="relative pt-6">
                <div
                  className="absolute -top-2 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#6B2338] text-xl text-white ring-4 ring-[#0B2560]"
                  style={HEADING_STYLE}
                >
                  {step.number}
                </div>
                <div className="h-full rounded-2xl border-2 border-[#52AAFC]/70 px-6 pb-8 pt-10 text-center">
                  <h3 className="text-base font-bold uppercase tracking-wide text-white" style={HEADING_STYLE}>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= MARLON'S PICKS ======================= */}
      <section id="marlon" className="bg-[#0B2560] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl uppercase leading-[0.95] text-[#52AAFC] sm:text-4xl" style={HEADING_STYLE}>
                {MARLON.picksTitle}
              </h2>
              <div className="mt-6 flex aspect-video items-center justify-center rounded-2xl border-2 border-[#52AAFC]/70 bg-[#123073]">
                {MARLON.videoUrl ? (
                  <video controls className="h-full w-full rounded-2xl" src={MARLON.videoUrl} />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-white/70">
                    <span className="flex h-20 w-28 items-center justify-center rounded-2xl bg-[#FF0000]">
                      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white" aria-hidden="true">
                        <path d="M8 5v14l11-7-11-7z" />
                      </svg>
                    </span>
                    <span className="text-xs uppercase tracking-wide">{MARLON.videoPlaceholderLabel}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-3xl uppercase leading-[0.95] text-[#52AAFC] sm:text-4xl" style={HEADING_STYLE}>
                {MARLON.fourTitle}
              </h2>
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-[#52AAFC]/70 p-6 sm:p-8">
                {MARLON.fourAnswers.map((item) => (
                  <div key={item.label} className="rounded-full bg-[#6B2338] px-6 py-4 text-center">
                    <span
                      className="text-sm font-bold uppercase tracking-wide text-white sm:text-base"
                      style={HEADING_STYLE}
                    >
                      {item.label}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl uppercase leading-[0.95] text-[#52AAFC] sm:text-4xl" style={HEADING_STYLE}>
              {MARLON.ritualsTitle}
            </h2>
            <div className="mt-6 rounded-2xl bg-[#6B2338] px-8 py-10">
              <p className="text-lg italic leading-relaxed text-white/90">&ldquo;{MARLON.ritualsQuote}&rdquo;</p>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <a href={MARLON.beatHisPicksCta.href} className={BTN_ACCENT} style={HEADING_STYLE}>
              {MARLON.beatHisPicksCta.label} &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ======================== MAKE YOUR PREDICTIONS ================= */}
      <section id="predict" className="bg-[#F7F8FA] text-[#0F1A2E]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#6B2338]`} style={HEADING_STYLE}>
                {PREDICTIONS.eyebrow}
              </p>
              <h2 className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-[#0B2560] sm:text-5xl" style={HEADING_STYLE}>
                {PREDICTIONS.titleLine1}
                <br />
                <span className="text-[#6B2338]">{PREDICTIONS.titleLine2}</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#0F1A2E]/80">{PREDICTIONS.body}</p>

              <ul className="mt-8 flex flex-col gap-4">
                {PREDICTIONS.bullets.map((bullet) => (
                  <li key={bullet.strong} className="text-[#0F1A2E]/80">
                    <span className="font-bold text-[#0F1A2E]">{bullet.strong}</span> {bullet.rest}
                  </li>
                ))}
              </ul>

              <div className="mt-10 inline-block rounded-full bg-[#0B2560] px-6 py-3">
                <span className="text-sm font-bold uppercase tracking-wide text-white" style={HEADING_STYLE}>
                  {PREDICTIONS.closesPill}
                </span>
              </div>
            </div>

            <PredictionForm playerOptions={PLAYER_OPTIONS} formNote={PREDICTIONS.formNote} />
          </div>
        </div>
      </section>

      {/* ========================= WHAT'S ON THE LINE ==================== */}
      <section className={`text-white ${CLARET_GRADIENT_BG}`}>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
            {WHATS_ON_THE_LINE.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl" style={HEADING_STYLE}>
            {WHATS_ON_THE_LINE.titleLine1}
            <br />
            {WHATS_ON_THE_LINE.titleLine2}
          </h2>

          <div className="mt-12 rounded-2xl border-2 border-[#52AAFC] bg-[#0B2560] p-8 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="text-2xl font-bold uppercase text-white" style={HEADING_STYLE}>
                {WHATS_ON_THE_LINE.cardTitle}
              </h3>
              <span
                className={`${EYEBROW} shrink-0 rounded-full border-2 border-[#52AAFC] px-4 py-2 text-[#52AAFC]`}
                style={HEADING_STYLE}
              >
                {WHATS_ON_THE_LINE.cardTag}
              </span>
            </div>

            <p className="mt-6 font-bold text-white/90" style={HEADING_STYLE}>
              {WHATS_ON_THE_LINE.winnerLine}
            </p>
            <p className="mt-4 leading-relaxed text-white/80">{WHATS_ON_THE_LINE.body}</p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#52AAFC]" style={HEADING_STYLE}>
                  Includes
                </p>
                <ul className="mt-2 list-inside list-disc text-white/80">
                  {WHATS_ON_THE_LINE.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#52AAFC]" style={HEADING_STYLE}>
                  Does Not Include
                </p>
                <ul className="mt-2 list-inside list-disc text-white/80">
                  {WHATS_ON_THE_LINE.excludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/70">{WHATS_ON_THE_LINE.eligibility}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{WHATS_ON_THE_LINE.oddsNote}</p>

            <p
              className="mt-8 text-center text-sm font-bold uppercase tracking-wide text-[#52AAFC]"
              style={HEADING_STYLE}
            >
              {WHATS_ON_THE_LINE.entryClosesLabel} &middot; {WHATS_ON_THE_LINE.winnersNotifiedLabel}
            </p>
          </div>
        </div>
      </section>

      {/* =========================== BUY FOR A MATE ====================== */}
      <section className="bg-white text-[#0F1A2E]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <p className={`${EYEBROW} text-[#6B2338]`} style={HEADING_STYLE}>
            {BUY_FOR_A_MATE.liveDateLabel}
          </p>

          <div className="mt-3 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="text-4xl uppercase font-semibold leading-[0.95] text-[#0B2560] sm:text-5xl" style={HEADING_STYLE}>
              {BUY_FOR_A_MATE.titleLine1}
              <br />
              {BUY_FOR_A_MATE.titleLine2}
            </h2>
            <p className="text-lg leading-relaxed text-[#0F1A2E]/80">{BUY_FOR_A_MATE.body}</p>
          </div>

          <h3 className="mt-14 text-2xl uppercase leading-[0.95] text-[#52AAFC]" style={HEADING_STYLE}>
            {BUY_FOR_A_MATE.marketplaceIntro}
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {BUY_FOR_A_MATE.products.map((product) => (
              <div
                key={product.name}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
              >
                <div className="aspect-square w-full bg-gradient-to-br from-black/5 to-black/10" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <p className="text-lg font-bold text-[#0B2560]" style={HEADING_STYLE}>
                      {product.name}
                    </p>
                    <p className="text-sm text-[#0F1A2E]/60">{product.description}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-[#0F1A2E]" style={HEADING_STYLE}>
                      {product.cost}
                    </span>
                    <button
                      type="button"
                      className="rounded-full bg-[#0B2560] px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#123073]"
                      style={HEADING_STYLE}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a href={BUY_FOR_A_MATE.marketplaceCta.href} className={BTN_NAVY_OUTLINE} style={HEADING_STYLE}>
              {BUY_FOR_A_MATE.marketplaceCta.label} &rarr;
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-[#0F1A2E]/50">{BUY_FOR_A_MATE.fulfilmentNote}</p>
        </div>
      </section>

      {/* ============================ TIMELINE =========================== */}
      <section className={`text-white ${NAVY_GRADIENT_BG}`}>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
            {TIMELINE.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl" style={HEADING_STYLE}>
            {TIMELINE.titleLine1}
            <br />
            {TIMELINE.titleLine2}
          </h2>

          <ol className="mt-14 border-l-2 border-[#6B2338]/60 pl-8 sm:pl-10">
            {TIMELINE.milestones.map((m) => (
              <li key={m.title} className="relative pb-12 last:pb-0">
                <span
                  className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 sm:-left-[49px] ${
                    m.status === "current" ? "border-[#52AAFC] bg-[#52AAFC]" : "border-[#6B2338] bg-[#0B2560]"
                  }`}
                />
                <p className="text-sm font-bold uppercase tracking-wide text-[#52AAFC]" style={HEADING_STYLE}>
                  {m.date}
                </p>
                <p className="mt-1 text-xl font-bold uppercase text-white" style={HEADING_STYLE}>
                  {m.title}
                </p>
                <p className="mt-1 max-w-2xl text-white/75">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================ FAQ ============================= */}
      <FaqSection />

      {/* =========================== CLOSING CTA =========================== */}
      <section className={`text-white ${NAVY_GRADIENT_BG}`}>
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:px-10 sm:py-24">
          <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
            {CLOSING_CTA.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl uppercase leading-[0.95] text-white sm:text-5xl" style={HEADING_STYLE}>
            {CLOSING_CTA.titleLine1}
            <br />
            {CLOSING_CTA.titleLine2}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">{CLOSING_CTA.body}</p>
          <a href={CLOSING_CTA.cta.href} className={`${BTN_ACCENT} mt-8`} style={HEADING_STYLE}>
            {CLOSING_CTA.cta.label} &rarr;
          </a>
        </div>
      </section>

      <div className="bg-[#070B14] px-6 py-8 text-xs leading-relaxed text-white/50 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p>{FOOTER.legalLine1}</p>
          <p className="mt-3">{FOOTER.legalLine2}</p>
          <p className="mt-3">{FOOTER.copyright}</p>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}

/* ============================================================================
   LOCAL SUB-COMPONENTS
   Kept in this same file on purpose — the whole page ships as one .tsx.
   They reference the module-level HEADING/BODY constants directly.
============================================================================ */

function Countdown({ targetISO }: { targetISO: string }) {
  type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

  const target = new Date(targetISO).getTime();
  const getTimeLeft = (): TimeLeft => {
    const diff = Math.max(0, target - Date.now());
    const seconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const display = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const closed = timeLeft !== null && target - Date.now() <= 0;
  const units: Array<{ key: keyof TimeLeft; label: string }> = [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Minutes" },
    { key: "seconds", label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 sm:items-start">
      <p className="text-xl font-bold uppercase tracking-wide text-white sm:text-2xl" style={HEADING_STYLE}>
        Time Until Picks <span className="text-[#52AAFC]">Close</span>
      </p>
      {closed ? (
        <p className="text-lg font-bold uppercase tracking-wide text-[#52AAFC]" style={HEADING_STYLE}>
          Predictions are closed.
        </p>
      ) : (
        <div className="flex gap-3 sm:gap-4" suppressHydrationWarning>
          {units.map((unit) => (
            <div key={unit.key} className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#52AAFC] bg-[#0B2560] sm:h-20 sm:w-20">
                <span className="text-3xl text-white sm:text-4xl" style={HEADING_STYLE} suppressHydrationWarning>
                  {String(display[unit.key]).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest text-white/80 sm:text-sm"
                style={HEADING_STYLE}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PredictionForm({
  playerOptions,
  formNote,
}: {
  playerOptions: string[];
  formNote: string;
}) {
  type Status = "idle" | "submitting" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [bowenScores, setBowenScores] = useState<"Yes" | "No" | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      westHamScore: Number(data.get("westHamScore")),
      wrexhamScore: Number(data.get("wrexhamScore")),
      firstScorer: String(data.get("firstScorer") || "").trim(),
      bowenScores,
      goalMinute: Number(data.get("goalMinute")),
      agreedToTerms: data.get("agreedToTerms") === "on",
      optedInToUpdates: data.get("optedInToUpdates") === "on",
    };

    if (!bowenScores) {
      setErrorMessage("Let us know whether you think Bowen scores.");
      return;
    }

    setStatus("submitting");
    try {
      // Posts to app/api/predictions/route.ts (delivered alongside this
      // page) which validates the payload and writes it to Airtable.
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setBowenScores(null);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const fieldLabelClass = "text-sm font-bold uppercase tracking-wide text-[#0F1A2E]";

  if (status === "success") {
    return (
      <div className="rounded-2xl border-4 border-[#6B2338] bg-white p-8 text-center sm:p-10">
        <h3 className="text-2xl font-bold uppercase text-[#6B2338]" style={HEADING_STYLE}>
          Call Locked In
        </h3>
        <p className="mt-3 text-[#0F1A2E]/80">
          You&rsquo;re in the running for the Athletes Elevated pre-match fan experience. We&rsquo;ll publish full
          results the day after the match — you against Marlon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border-4 border-[#6B2338] bg-white p-6 sm:p-8">
      <fieldset className="border-b border-black/10 pb-6">
        <legend className={fieldLabelClass} style={HEADING_STYLE}>
          1 / What Will the Final Score Be?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">90 minutes plus stoppage time.</p>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-[#0F1A2E]/60">West Ham</span>
            <input
              required
              type="number"
              name="westHamScore"
              min={0}
              max={30}
              placeholder="0"
              className="mt-1 w-full rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 text-lg focus:border-[#6B2338] focus:outline-none"
            />
          </label>
          <span className="pb-3 text-xl font-bold text-[#0F1A2E]/40">–</span>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-[#0F1A2E]/60">Wrexham</span>
            <input
              required
              type="number"
              name="wrexhamScore"
              min={0}
              max={30}
              placeholder="0"
              className="mt-1 w-full rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 text-lg focus:border-[#6B2338] focus:outline-none"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="border-b border-black/10 py-6">
        <legend className={fieldLabelClass} style={HEADING_STYLE}>
          2 / Who Will Score the First Goal?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">Pick a player, or call it goalless.</p>
        {playerOptions.length > 0 ? (
          <select
            required
            name="firstScorer"
            defaultValue=""
            className="mt-4 w-full rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 text-[#0F1A2E] focus:border-[#6B2338] focus:outline-none"
          >
            <option value="" disabled>
              Select a player...
            </option>
            {playerOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
            <option value="Goalless">Goalless</option>
          </select>
        ) : (
          <input
            required
            type="text"
            name="firstScorer"
            placeholder="Type a player name, or “Goalless”"
            className="mt-4 w-full rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 text-[#0F1A2E] focus:border-[#6B2338] focus:outline-none"
          />
        )}
      </fieldset>

      <fieldset className="border-b border-black/10 py-6">
        <legend className={fieldLabelClass} style={HEADING_STYLE}>
          3 / Will Jarrod Bowen Score?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">Any time in the match.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {(["Yes", "No"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBowenScores(option)}
              aria-pressed={bowenScores === option}
              className={`rounded-lg border-2 px-4 py-3 font-bold uppercase tracking-wide transition-colors ${
                bowenScores === option
                  ? "border-[#6B2338] bg-[#6B2338] text-white"
                  : "border-black/15 bg-[#F7F8FA] text-[#0F1A2E] hover:border-[#6B2338]/50"
              }`}
              style={HEADING_STYLE}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-b border-black/10 py-6">
        <legend className={fieldLabelClass} style={HEADING_STYLE}>
          4 / What Minute Will the First Goal Be Scored?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">1–90. If you&rsquo;ve called no goals, put 0.</p>
        <div className="mt-4 flex items-center gap-3">
          <input
            required
            type="number"
            name="goalMinute"
            min={0}
            max={90}
            placeholder="00"
            className="w-28 rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 text-lg focus:border-[#6B2338] focus:outline-none"
          />
          <span className="text-sm text-[#0F1A2E]/60">minutes</span>
        </div>
      </fieldset>

      <fieldset className="py-6">
        <legend className="text-lg font-bold uppercase text-[#0F1A2E]" style={HEADING_STYLE}>
          And You Are?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">We need this to tell you if you&rsquo;ve won.</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            type="text"
            name="firstName"
            placeholder="First name"
            autoComplete="given-name"
            className="rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 focus:border-[#6B2338] focus:outline-none"
          />
          <input
            required
            type="text"
            name="lastName"
            placeholder="Last name"
            autoComplete="family-name"
            className="rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 focus:border-[#6B2338] focus:outline-none"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          className="mt-4 w-full rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 focus:border-[#6B2338] focus:outline-none"
        />
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-black/10 pt-6">
        <label className="flex gap-3 text-sm text-[#0F1A2E]/80">
          <input required type="checkbox" name="agreedToTerms" className="mt-1 h-4 w-4 shrink-0" />
          <span>
            * I&rsquo;m 18 or over and I agree to the{" "}
            <a href="#" className="font-bold text-[#6B2338] underline">
              campaign terms
            </a>{" "}
            and the{" "}
            <a href="#" className="font-bold text-[#6B2338] underline">
              Athletes Elevated privacy policy
            </a>
            .
          </span>
        </label>
        <label className="flex gap-3 text-sm text-[#0F1A2E]/80">
          <input type="checkbox" name="optedInToUpdates" className="mt-1 h-4 w-4 shrink-0" />
          <span>Keep me posted on Road to Matchday and what Athletes Elevated does next.</span>
        </label>
      </div>

      {errorMessage && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`${BTN_CLARET} mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60`}
        style={HEADING_STYLE}
      >
        {status === "submitting" ? "Locking In..." : "Lock In My Call"}
      </button>
      <p className="mt-4 text-center text-xs text-[#0F1A2E]/50">{formNote}</p>
    </form>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`text-white ${CLARET_GRADIENT_BG}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
          {FAQ.eyebrow}
        </p>
        <h2 className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl" style={HEADING_STYLE}>
          {FAQ.title}
        </h2>

        <div className="mt-10 divide-y divide-white/20 border-y border-white/20">
          {FAQ.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-lg font-bold uppercase tracking-wide text-white" style={HEADING_STYLE}>
                    {item.question}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-5 w-5 shrink-0 fill-none stroke-[#52AAFC] stroke-2 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open && <p className="pb-5 leading-relaxed text-white/80">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}