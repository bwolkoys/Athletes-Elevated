"use client";

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
  predictionsCloseISO: "2026-09-07T17:59:00-04:00", // "Sept 7th at 11:59 PM EST / 4:59 BST"
};

const HERO = {
  badge: SITE.matchLabel,
  backgroundImage: "/whu-wrexham-lp/homeBG.png",
  titleLine1: "Road To",
  titleLine2: "Matchday",
  subheadLine1: "Marlon's called it. Now you call it.",
  subheadLine2: "Now you call it.",
  body: "Marlon has made his predictions. Now we want yours. Everyone who calls the match is in the running for the Athletes Elevated pre-match fan experience. Make three quick picks and receive one free entry for the chance to join us for a fan pre-match experience.",
  primaryCta: { label: "Call The Match", href: "#predict" },
  secondaryCta: { label: "See Marlon's Picks", href: "#marlon" },
  disclaimer:
    "Free to enter. No purchase necessary. Purchase does not increase your chances of winning.",
};

const HOW_IT_WORKS = {
  eyebrow: "How It Works",
  title: "Three Steps to Matchday",
  steps: [
    {
      number: 1,
      title: "Watch Marlon Call It",
      body: "He's given us his score, his first scorer, the minute the first one goes in and how many shots on goal WHU has. No hedging.",
    },
    {
      number: 2,
      title: "Call It Yourself",
      body: "Answer the same four questions. Takes under a minute. You're automatically entered into the pre-match fan experience.",
    },
    {
      number: 3,
      title: "Match-day Experience",
      body: "You'll be notified by email on September 8th if you've won the September 11th match-day experience for you and a guest.",
    },
  ],
};

const MARLON = {
  picksTitle: "Marlon's Picks",
  fourTitle: "Marlon's Four",
  videoUrl: "", // TODO: swap for the real video embed URL once Marlon's call is filmed.
  videoPlaceholderLabel: "Marlon's call — video coming soon",
  fourAnswers: [
    { label: "1. Final Score", value: "WHU ?? vs Wrexham ??" }, // TODO
    { label: "2. Who'll score the first goal", value: "????? ?????" }, // TODO
    { label: "3. Minute of the First Goal", value: "??:??" }, // TODO
    { label: "4. WHU shots on goal", value: "??:??" },
  ],
  ritualsTitle: "Marlon's Matchday Rituals",
  ritualsQuote: "Placeholder text. Quote Marlon's ritual here.", // TODO
  beatHisPicksCta: { label: "Beat His Picks", href: "#predict" },
};

const PLAYER_OPTIONS: string[] = [];

const PREDICTIONS = {
  eyebrow: "Make Your Predictions",
  titleLine1: "Three Questions.",
  titleLine2: "One Minute.",
  body: "Same three questions Marlon answered. Answer them honestly — the results get published either way.",
  bullets: [
    {
      strong: "Everyone who enters",
      rest: "is in the draw for the Athletes Elevated pre-match fan experience on September 11.",
    },
    {
      strong: "Your predictions are for fun and bragging rights.",
      rest: "Prediction accuracy does not affect your chances of winning. Eligible winners are selected at random.",
    },
    {
      strong: "No purchase required.",
      rest: "Free to enter, one entry per supporter.",
    },
  ],
  closesPill: "Predictions Close: Sept 7th at 11:59 PM BST",
  formNote: "One entry per supporter. Predictions close Sept 7th.",
};

const WHATS_ON_THE_LINE = {
  eyebrow: "What's on the Line",
  titleLine1: "Two Chances to Win.",
  titleLine2: "Your chance to join road to matchday.",
  cardTag: "Sept 11 | Pre-Match",
  cardTitle: "The Athletes Elevated Fan Experience",
  winnerLine:
    "One winner + one guest",
  body: "Join Athletes Elevated for our Road to Matchday pre-game experience in London on September 11 before West Ham vs. Wrexham. This will take place at one of your favorite London pubs.",
  includes: [
    "Free food and drink voucher a performance by Joseph J. Jones. And who knows, perhaps Marlon will make an appearance?",
  ],
  excludes: ["Travel to/from London, accommodation or tickets to the game."],
  eligibility:
    "Selected winners must be 18+, available in London on September 11 and respond within 24 hours of the winner notification email being sent. If a selected winner does not respond within that 24-hour period, Athletes Elevated may select an alternate winner. Please note: Athletes Elevated plans to photograph and film the Road to Matchday experience and may use this content in post-event coverage across its website, email and social channels.",
  oddsNote:
    "Everyone who calls the match is entered. Accuracy does not matter.",
  entryClosesLabel: "Entry Closes Sept 7",
  winnersNotifiedLabel: "Winners Notified Sept 8",
};

const MARKETPLACE_OFFER = {
  liveDateLabel: "Live Sept 1",
  titleLine1: "Get 15% Off",
  titleLine2: "The Marketplace",
  body: "Sign up to the Athletes Elevated Marketplace with your first name, last name and email, and we'll send you 15% off — kit, gifting and more, all in one place.",
  cta: { label: "Sign Up for 15% Off", href: "#" }, // TODO: real marketplace signup URL
  fulfilmentNote:
    "Discount code sent by email after signup. Offer managed through the Athletes Elevated Marketplace.",
  // TODO: replace with real product photography, names, descriptions and prices.
  products: [
    {
      image: "/whu-wrexham-lp/home.png",
      name: "West Ham 26/27 Elite Home Shirt",
      description:
        "The West Ham United x New Balance 2026/27 Elite Home Shirt — iconic Claret and Blue, built to player-level performance.",
    },
    {
      image: "/whu-wrexham-lp/away.png",
      name: "West Ham 26/27 Elite Away Shirt",
      description:
        "The West Ham United x New Balance 2026/27 Elite Away Shirt — iconic Away white, built to player-level performance.",
    },
    {
      image: "/whu-wrexham-lp/third.png",
      name: "West Ham 26/27 Third Shirt",
      description:
        "The West Ham United x New Balance 2026/27 Third Shirt — bold bleach blue with fast-drying NB DRY comfort.",
    },
  ],
  marketplaceCta: { label: "Visit the Marketplace", href: "#" },
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
      title: "15% Off Goes Live",
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

type FaqItem = {
  question: string;
  answer: string;
  answerLinkText?: string;
  answerLinkHref?: string;
};

const FAQ = {
  eyebrow: "The Details",
  title: "Before You Call It",
  items: [
    {
      question: "Does it cost anything to enter?",
      answer:
        "No. Entry to Road to Matchday is completely free and no purchase is necessary to enter.",
    },
    {
      question: "When do predictions close?",
      answer:
        "Predictions close on September 7th at 11:59pm BST. Late entries received after this time will not be accepted.",
    },
    {
      question: "How are the pre-match experience places chosen?",
      answer:
        "Winners are selected entirely at random using an independent random selection process, in accordance with the promotion's full Terms and Conditions.",
    },
    {
      question: "What counts as calling the match correctly?",
      answer:
        "The supporter(s) whose predictions most closely match the final result across all four questions will be recognised when results are published. This is for recognition purposes only and has no effect on your chances of winning the pre-match experience, which is decided by random draw.",
    },
    {
      question: "Who can enter?",
      answer:
        "Entry is open to individuals aged 18 or over. Full eligibility criteria are set out in the Terms and Conditions.",
    },
    {
      question: "Can I change my predictions?",
      answer:
        "No. Once submitted, predictions are final and cannot be amended. Please review your answers carefully before submitting, as only one entry is permitted per supporter.",
    },
    {
      question: "What happens to my details?",
      answer:
        "The information you provide is used solely to administer this promotion, including verifying entries and contacting winners, and is handled in accordance with our Privacy Policy. It will not be used for marketing purposes unless you have separately opted in.",
    },
    {
      question: "Full terms and conditions.",
      answer:
        "Full Terms and Conditions for Road to Matchday are available here.",
      answerLinkText: "here",
      answerLinkHref: "/whu-wrexham/rules",
    },
  ],
};

const CLOSING_CTA = {
  eyebrow: "Last Thing",
  titleLine1: "He's Called It.",
  titleLine2: "It's Your Turn.",
  body: "Three questions, one minute, and a reason to care about every touch on September 11.",
  cta: { label: "Call the Match", href: "#predict" },
};

const FOOTER = {
  legalLine1:
    "Road to Matchday is a fan campaign from Athletes Elevated. No purchase necessary. Open to entrants aged 18 and over in Great Britain. Prize draw entry closes September 7th at 11:59pm BST.",
  legalLine2: {
    text: "Read the terms and rules here",
    href: "/whu-wrexham/rules",
  },
  copyright:
    "© 2026 Athletes Elevated. All rights reserved. West Ham United and the West Ham United crest are trademarks of West Ham United Football Club Limited.",
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
      <main
        className="bg-[#F7F8FA] text-[#0F1A2E]"
        style={{ fontFamily: BODY }}
      >
        {/* ============================ HERO ============================ */}
        <section className="relative overflow-hidden text-white">
          <Image
            src={HERO.backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Left-to-right fade so the headline stays legible over the photo,
              matching the reference: solid navy behind the text, fading out
              to the photo on the right. Tune the opacity stops if your photo
              needs more/less darkening. */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B2560_0%,rgba(11,37,96,0.92)_30%,rgba(11,37,96,0.55)_55%,rgba(11,37,96,0.1)_80%,transparent_100%)]" />

          <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-14 sm:px-10 sm:pt-20 lg:pt-24">
            <h1
              className="text-6xl font-semibold uppercase leading-[0.95] text-[#52AAFC] sm:text-7xl lg:text-8xl"
              style={HEADING_STYLE}
            >
              {HERO.titleLine1}
              <br />
              {HERO.titleLine2}
            </h1>

            <p
              className="mt-3 text-2xl font-bold uppercase text-white sm:text-3xl"
              style={HEADING_STYLE}
            >
              {HERO.subheadLine1}
            </p>

            <div className="mt-8 h-px w-24 bg-white/40" />

            {/* Match info + crests, inline — replaces the old floating
                eyebrow pill, matching the reference's calendar-icon row. */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 text-[#52AAFC]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
              </svg>
              <p
                className="text-sm font-bold uppercase tracking-wide text-white sm:text-base"
                style={HEADING_STYLE}
              >
                {HERO.badge}
              </p>
              <span className="flex items-center gap-2">
                <Image
                  src="/images/WHU_logo.png"
                  alt="West Ham United crest"
                  width={72}
                  height={72}
                  className="h-9 w-auto"
                />
                <span
                  className="text-sm font-bold uppercase text-white/70"
                  style={HEADING_STYLE}
                >
                  v
                </span>
                <Image
                  src="/images/Wrexham_A.F.C._Logo.png"
                  alt="Wrexham AFC crest"
                  width={72}
                  height={72}
                  className="h-9 w-auto"
                />
              </span>
            </div>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
              {HERO.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={HERO.primaryCta.href}
                className={BTN_ACCENT}
                style={HEADING_STYLE}
              >
                {HERO.primaryCta.label}
              </a>
              <a
                href={HERO.secondaryCta.href}
                className={BTN_OUTLINE}
                style={HEADING_STYLE}
              >
                {HERO.secondaryCta.label}
              </a>
            </div>

            <p className="mt-8 max-w-2xl text-xs leading-relaxed text-white/70">
              {HERO.disclaimer}
            </p>
          </div>

          {/* Countdown bar — full-bleed white strip pinned to the bottom of
              the hero, matching the reference. Sits outside the max-w-6xl
              content div above so it spans edge-to-edge. */}
          <div className="relative">
            <Countdown targetISO={SITE.predictionsCloseISO} />
          </div>
        </section>

        {/* ======================== HOW IT WORKS ========================= */}
        <section className={`text-white ${CLARET_GRADIENT_BG}`}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
            <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
              {HOW_IT_WORKS.eyebrow}
            </p>
            <h2
              className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl"
              style={HEADING_STYLE}
            >
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
                    <h3
                      className="text-base font-bold uppercase tracking-wide text-white"
                      style={HEADING_STYLE}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {step.body}
                    </p>
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
                <h2
                  className="text-3xl uppercase leading-[0.95] text-[#52AAFC] sm:text-4xl"
                  style={HEADING_STYLE}
                >
                  {MARLON.picksTitle}
                </h2>
                <div className="mt-6 flex aspect-video items-center justify-center rounded-2xl border-2 border-[#52AAFC]/70 bg-[#123073]">
                  {MARLON.videoUrl ? (
                    <video
                      controls
                      className="h-full w-full rounded-2xl"
                      src={MARLON.videoUrl}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-white/70">
                      <span className="flex h-20 w-28 items-center justify-center rounded-2xl bg-[#FF0000]">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-10 w-10 fill-white"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7-11-7z" />
                        </svg>
                      </span>
                      <span className="text-xs uppercase tracking-wide">
                        {MARLON.videoPlaceholderLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2
                  className="text-3xl uppercase leading-[0.95] text-[#52AAFC] sm:text-4xl"
                  style={HEADING_STYLE}
                >
                  {MARLON.fourTitle}
                </h2>
                <div className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-[#52AAFC]/70 p-6 sm:p-8">
                  {MARLON.fourAnswers.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-full bg-[#6B2338] px-6 py-4 text-left"
                    >
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
              <h2
                className="text-3xl uppercase leading-[0.95] text-[#52AAFC] sm:text-4xl"
                style={HEADING_STYLE}
              >
                {MARLON.ritualsTitle}
              </h2>
              <div className="mt-6 rounded-2xl bg-[#6B2338] px-8 py-10">
                <p className="text-lg italic leading-relaxed text-white/90">
                  &ldquo;{MARLON.ritualsQuote}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-14 flex justify-center">
              <a
                href={MARLON.beatHisPicksCta.href}
                className={BTN_ACCENT}
                style={HEADING_STYLE}
              >
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
                <p
                  className={`${EYEBROW} text-[#6B2338]`}
                  style={HEADING_STYLE}
                >
                  {PREDICTIONS.eyebrow}
                </p>
                <h2
                  className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-[#0B2560] sm:text-5xl"
                  style={HEADING_STYLE}
                >
                  {PREDICTIONS.titleLine1}
                  <br />
                  <span className="text-[#6B2338]">
                    {PREDICTIONS.titleLine2}
                  </span>
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#0F1A2E]/80">
                  {PREDICTIONS.body}
                </p>

                <ul className="mt-8 flex flex-col gap-4">
                  {PREDICTIONS.bullets.map((bullet) => (
                    <li key={bullet.strong} className="text-[#0F1A2E]/80">
                      <span className="font-bold text-[#0F1A2E]">
                        {bullet.strong}
                      </span>{" "}
                      {bullet.rest}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 inline-block rounded-full bg-[#0B2560] px-6 py-3">
                  <span
                    className="text-sm font-bold uppercase tracking-wide text-white"
                    style={HEADING_STYLE}
                  >
                    {PREDICTIONS.closesPill}
                  </span>
                </div>
              </div>

              <PredictionForm
                playerOptions={PLAYER_OPTIONS}
                formNote={PREDICTIONS.formNote}
              />
            </div>
          </div>
        </section>

        {/* ========================= WHAT'S ON THE LINE ==================== */}
        <section className={`text-white ${CLARET_GRADIENT_BG}`}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
            <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
              {WHATS_ON_THE_LINE.eyebrow}
            </p>
            <h2
              className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl"
              style={HEADING_STYLE}
            >
              {WHATS_ON_THE_LINE.titleLine1}
              <br />
              {WHATS_ON_THE_LINE.titleLine2}
            </h2>

            <div className="mt-12 rounded-2xl border-2 border-[#52AAFC] bg-[#0B2560] p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3
                  className="text-2xl font-bold uppercase text-white"
                  style={HEADING_STYLE}
                >
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
              <p className="mt-4 leading-relaxed text-white/80">
                {WHATS_ON_THE_LINE.body}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p
                    className="text-sm font-bold uppercase tracking-wide text-[#52AAFC]"
                    style={HEADING_STYLE}
                  >
                    Includes
                  </p>
                  <ul className="mt-2 list-inside list-disc text-white/80">
                    {WHATS_ON_THE_LINE.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-sm font-bold uppercase tracking-wide text-[#52AAFC]"
                    style={HEADING_STYLE}
                  >
                    Does Not Include
                  </p>
                  <ul className="mt-2 list-inside list-disc text-white/80">
                    {WHATS_ON_THE_LINE.excludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/70">
                {WHATS_ON_THE_LINE.eligibility}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {WHATS_ON_THE_LINE.oddsNote}
              </p>

              <p
                className="mt-8 text-center text-sm font-bold uppercase tracking-wide text-[#52AAFC]"
                style={HEADING_STYLE}
              >
                {WHATS_ON_THE_LINE.entryClosesLabel} &middot;{" "}
                {WHATS_ON_THE_LINE.winnersNotifiedLabel}
              </p>
            </div>
          </div>
        </section>

        {/* =========================== BUY FOR A MATE ====================== */}
        <section className="bg-white text-[#0F1A2E]">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
            <p className={`${EYEBROW} text-[#6B2338]`} style={HEADING_STYLE}>
              {MARKETPLACE_OFFER.liveDateLabel}
            </p>

            <div className="mt-3 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <h2
                className="text-4xl uppercase font-semibold leading-[0.95] text-[#0B2560] sm:text-5xl"
                style={HEADING_STYLE}
              >
                {MARKETPLACE_OFFER.titleLine1}
                <br />
                {MARKETPLACE_OFFER.titleLine2}
              </h2>
              <p className="text-lg leading-relaxed text-[#0F1A2E]/80">
                {MARKETPLACE_OFFER.body}
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {MARKETPLACE_OFFER.products.map((product) => (
                <div
                  key={product.name}
                  className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
                >
                  <div className="relative aspect-square w-full bg-black/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <p
                        className="text-lg font-bold text-[#0B2560]"
                        style={HEADING_STYLE}
                      >
                        {product.name}
                      </p>
                      <p className="text-sm text-[#0F1A2E]/60">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
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
              <a
                href={MARKETPLACE_OFFER.marketplaceCta.href}
                className={BTN_NAVY_OUTLINE}
                style={HEADING_STYLE}
              >
                {MARKETPLACE_OFFER.marketplaceCta.label} &rarr;
              </a>
            </div>

            <p className="mt-6 text-center text-xs text-[#0F1A2E]/50">
              {MARKETPLACE_OFFER.fulfilmentNote}
            </p>
          </div>
        </section>

        {/* ============================ TIMELINE =========================== */}
        <section className={`text-white ${NAVY_GRADIENT_BG}`}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
            <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
              {TIMELINE.eyebrow}
            </p>
            <h2
              className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl"
              style={HEADING_STYLE}
            >
              {TIMELINE.titleLine1}
              <br />
              {TIMELINE.titleLine2}
            </h2>

            <ol className="mt-14 border-l-2 border-[#6B2338]/60 pl-8 sm:pl-10">
              {TIMELINE.milestones.map((m) => (
                <li key={m.title} className="relative pb-12 last:pb-0">
                  <span
                    className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 sm:-left-[49px] ${
                      m.status === "current"
                        ? "border-[#52AAFC] bg-[#52AAFC]"
                        : "border-[#6B2338] bg-[#0B2560]"
                    }`}
                  />
                  <p
                    className="text-sm font-bold uppercase tracking-wide text-[#52AAFC]"
                    style={HEADING_STYLE}
                  >
                    {m.date}
                  </p>
                  <p
                    className="mt-1 text-xl font-bold uppercase text-white"
                    style={HEADING_STYLE}
                  >
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
            <h2
              className="mt-3 text-4xl uppercase leading-[0.95] text-white sm:text-5xl"
              style={HEADING_STYLE}
            >
              {CLOSING_CTA.titleLine1}
              <br />
              {CLOSING_CTA.titleLine2}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {CLOSING_CTA.body}
            </p>
            <a
              href={CLOSING_CTA.cta.href}
              className={`${BTN_ACCENT} mt-8`}
              style={HEADING_STYLE}
            >
              {CLOSING_CTA.cta.label} &rarr;
            </a>
          </div>
        </section>

        <div className="bg-[#070B14] px-6 py-8 text-xs leading-relaxed text-white/50 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <p>{FOOTER.legalLine1}</p>
            <p className="mt-3">
              <a
                href={FOOTER.legalLine2.href}
                className="underline hover:text-white"
              >
                {FOOTER.legalLine2.text}
              </a>
            </p>
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
  type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

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
    <div className="flex w-full flex-wrap items-center justify-between gap-4 bg-white px-6 py-5 text-[#0B2560] sm:px-10">
      <span
        className="hidden shrink-0 text-xs font-bold uppercase tracking-wide text-[#52AAFC] sm:inline"
        style={HEADING_STYLE}
      >
        To Submit Your Picks
      </span>

      {closed ? (
        <p
          className="mx-auto text-lg font-bold uppercase tracking-wide text-[#6B2338]"
          style={HEADING_STYLE}
        >
          Predictions are closed.
        </p>
      ) : (
        <div
          className="mx-auto flex flex-wrap items-baseline justify-center gap-6 sm:gap-10"
          suppressHydrationWarning
        >
          {units.map((unit) => (
            <p key={unit.key} className="whitespace-nowrap" style={HEADING_STYLE}>
              <span className="text-2xl font-bold sm:text-3xl" suppressHydrationWarning>
                {display[unit.key]}
              </span>{" "}
              <span className="text-base font-semibold text-[#0B2560]/70 sm:text-lg">
                {unit.label.toLowerCase()}
              </span>
            </p>
          ))}
        </div>
      )}

      <span
        className="hidden shrink-0 text-xs font-bold uppercase tracking-wide text-[#52AAFC] sm:inline"
        style={HEADING_STYLE}
      >
        To Submit Your Picks
      </span>
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      country: String(data.get("country") || "").trim(),
      westHamScore: Number(data.get("westHamScore")),
      wrexhamScore: Number(data.get("wrexhamScore")),
      firstScorer: String(data.get("firstScorer") || "").trim(),
      goalMinute: Number(data.get("goalMinute")),
      shotsGoal: Number(data.get("shotsGoal")),
      agreedToTerms: data.get("agreedToTerms") === "on",
      optedInToUpdates: data.get("optedInToUpdates") === "on",
    };

    setStatus("submitting");
    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  const fieldLabelClass =
    "text-sm font-bold uppercase tracking-wide text-[#0F1A2E]";

  if (status === "success") {
    return (
      <div className="rounded-2xl border-4 border-[#6B2338] bg-white p-8 text-center sm:p-10">
        <h3
          className="text-2xl font-bold uppercase text-[#6B2338]"
          style={HEADING_STYLE}
        >
          Call Locked In
        </h3>
        <p className="mt-3 text-[#0F1A2E]/80">
          You&rsquo;re in the running for the Athletes Elevated pre-match fan
          experience. We&rsquo;ll publish full results the day after the match —
          you against Marlon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border-4 border-[#6B2338] bg-white p-6 sm:p-8"
    >
      <fieldset className="border-b border-black/10 pb-6">
        <legend className={fieldLabelClass} style={HEADING_STYLE}>
          1 / What Will the Final Score Be?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">
          90 minutes plus stoppage time.
        </p>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-[#0F1A2E]/60">
              West Ham
            </span>
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
            <span className="text-xs font-bold uppercase tracking-wide text-[#0F1A2E]/60">
              Wrexham
            </span>
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
        <p className="mt-1 text-sm text-[#0F1A2E]/60">
          Pick a player, or call it goalless.
        </p>
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
          3 / What Minute Will the First Goal Be Scored?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">
          1–90. If you&rsquo;ve called no goals, put 0.
        </p>
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
      <fieldset className="border-b border-black/10 py-6">
        <legend className={fieldLabelClass} style={HEADING_STYLE}>
          4 / How many shots on goal will WHU have?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">
          0+
        </p>
        <div className="mt-4 flex items-center gap-3">
          <input
            required
            type="number"
            name="shotsGoal"
            min={0}
            max={100}
            placeholder="00"
            className="w-28 rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 text-lg focus:border-[#6B2338] focus:outline-none"
          />
          <span className="text-sm text-[#0F1A2E]/60">shots on goal</span>
        </div>
      </fieldset>


      <fieldset className="py-6">
        <legend
          className="text-lg font-bold uppercase text-[#0F1A2E]"
          style={HEADING_STYLE}
        >
          And You Are?
        </legend>
        <p className="mt-1 text-sm text-[#0F1A2E]/60">
          We need this to tell you if you&rsquo;ve won.
        </p>
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
        <input
          required
          type="text"
          name="country"
          placeholder="Country"
          className="mt-4 w-full rounded-lg border border-black/15 bg-[#F7F8FA] px-4 py-3 focus:border-[#6B2338] focus:outline-none"
        />
        
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-black/10 pt-6">
        <label className="flex gap-3 text-sm text-[#0F1A2E]/80">
          <input
            required
            type="checkbox"
            name="agreedToTerms"
            className="mt-1 h-4 w-4 shrink-0"
          />
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
          <input
            type="checkbox"
            name="optedInToUpdates"
            className="mt-1 h-4 w-4 shrink-0"
          />
          <span>
            Keep me posted on Road to Matchday and what Athletes Elevated does
            next.
          </span>
        </label>
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
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
        <h2
          className="mt-3 text-4xl uppercase font-semibold leading-[0.95] text-white sm:text-5xl"
          style={HEADING_STYLE}
        >
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
                  <span
                    className="text-lg font-bold uppercase tracking-wide text-white"
                    style={HEADING_STYLE}
                  >
                    {item.question}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-5 w-5 shrink-0 fill-none stroke-[#52AAFC] stroke-2 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {open && (
                  <p className="pb-5 leading-relaxed text-white/80">
                    <FaqAnswer item={item} />
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqAnswer({ item }: { item: FaqItem }) {
  if (!item.answerLinkText || !item.answerLinkHref) {
    return <>{item.answer}</>;
  }

  const splitIndex = item.answer.indexOf(item.answerLinkText);
  if (splitIndex === -1) {
    return <>{item.answer}</>;
  }

  const before = item.answer.slice(0, splitIndex);
  const linkText = item.answer.slice(
    splitIndex,
    splitIndex + item.answerLinkText.length
  );
  const after = item.answer.slice(splitIndex + item.answerLinkText.length);

  return (
    <>
      {before}
      <a
        href={item.answerLinkHref}
        className="font-bold text-[#52AAFC] underline"
      >
        {linkText}
      </a>
      {after}
    </>
  );
}