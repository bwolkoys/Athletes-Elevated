import type { Metadata } from "next";
import Navbar from "../../src/components/navBar";
import Footer from "../../src/components/footer";


/**
 *
 * EDITING CONTENT
 *   Every section's text lives in the RULES array below. Each section is
 *   a numbered block made of typed pieces (paragraph / subheading /
 *   indented lines / list) — edit the text there, the JSX beneath just
 *   renders it. URLs and email addresses anywhere in the text are turned
 *   into real links automatically (see Linkify at the bottom of the file).
 */

const HEADING = "var(--font-heading, 'Apotek Extended'), sans-serif";
const BODY = "var(--font-body, 'DM Sans'), sans-serif";
const HEADING_STYLE = { fontFamily: HEADING };
const EYEBROW = "uppercase tracking-[0.12em] text-sm font-bold";
const NAVY_GRADIENT_BG = "bg-[linear-gradient(180deg,#0B2560_0%,#081A45_100%)]";

export const metadata: Metadata = {
  title: "Official Rules | Road to Matchday",
  description:
    "Official Rules for the Road to Matchday: Call the Match Free Prize Draw, run by Athletes Elevated.",
};

/* ============================================================================
   CONTENT
============================================================================ */

const RULES_META = {
  eyebrow: "Road to Matchday",
  title: "Official Rules",
  subtitle: "Call the Match Free Prize Draw",
};

type RuleBlock =
  | { type: "p"; text: string }
  | { type: "subheading"; text: string }
  | { type: "lines"; items: string[] }
  | { type: "list"; ordered?: boolean; items: string[] };

const RULES: Array<{ number: number; heading: string; body: RuleBlock[] }> = [
  {
    number: 1,
    heading: "No Purchase Necessary",
    body: [
      {
        type: "p",
        text: "No purchase or payment of any kind is necessary to enter or win. A purchase will not increase an entrant's chances of winning.",
      },
    ],
  },
  {
    number: 2,
    heading: "Promoter",
    body: [
      { type: "p", text: "The promoter is:" },
      {
        type: "lines",
        items: ["Athletes Elevated, LLC", "2329 Creek Crossing Loop, Park City, UT 84098", "ae@athleteselevated.com"],
      },
      { type: "p", text: "West Ham United is not the promoter or administrator of this promotion." },
    ],
  },
  {
    number: 3,
    heading: "Eligibility",
    body: [
      {
        type: "p",
        text: "The promotion is open only to legal residents of Great Britain (England, Scotland and Wales) who are at least 18 years of age at the time of entry.",
      },
      {
        type: "p",
        text: "Employees, officers and directors of the Promoter, West Ham United, participating agencies, campaign partners and members of their immediate households are not eligible.",
      },
      { type: "p", text: "Void where prohibited or restricted by law." },
    ],
  },
  {
    number: 4,
    heading: "Promotion Period",
    body: [
      { type: "p", text: "The Promotion begins:" },
      { type: "lines", items: ["August 27, 2026"] },
      { type: "p", text: "and ends:" },
      { type: "lines", items: ["September 7, 2026 at 11:59pm BST"] },
      { type: "p", text: "Entries received after the closing time are not eligible." },
    ],
  },
  {
    number: 5,
    heading: "How to Enter",
    body: [
      {
        type: "p",
        text: "Visit https://www.athleteselevated.com/whu-wrexham during the Promotion Period and:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Complete the four Call the Match prediction questions.",
          "Provide the required entrant information.",
          "Confirm eligibility and acceptance of these Official Rules.",
          "Submit the entry form.",
        ],
      },
      { type: "p", text: "Limit one entry per person." },
      {
        type: "p",
        text: "The entrant's prediction answers have no effect on winner selection or odds of winning.",
      },
      {
        type: "p",
        text: "No purchase is necessary. Purchasing merchandise, participating in Buy for a Mate or otherwise making a purchase from Athletes Elevated does not create an entry, an additional entry or improve the entrant's odds.",
      },
      {
        type: "p",
        text: "Each valid Call the Match submission provides one entry into the random drawing for the Road to Matchday pre-game experience.",
      },
    ],
  },
  {
    number: 6,
    heading: "Prizes",
    body: [
      { type: "subheading", text: "Prize 1 — Road to Matchday Pre-Game Experience" },
      {
        type: "p",
        text: "One winner will receive admission for the winner and one guest to the Road to Matchday pre-game experience in London on September 11, 2026.",
      },
      {
        type: "p",
        text: "Includes: One winner + a guest will be invited to join Athletes Elevated for our Road to Matchday pre-match experience at an iconic West Ham pub in London on September 11 (winners will be notified of the exact location in the winner notification email on September 8). Joseph J. Jones will be performing. Food and beverage vouchers will be provided at the event.",
      },
      { type: "p", text: "Does not include:" },
      { type: "p", text: "TRAVEL, ACCOMMODATION, TRANSPORTATION, MATCH TICKETS OR OTHER EXPENSES." },
      { type: "p", text: "Approximate Value of pre-game experience: £100" },
      { type: "p", text: "Both winner and guest must be at least 18 years old and comply with venue rules." },
      {
        type: "p",
        text: "No cash alternative unless required by law. Promoter may substitute a prize of equal or greater value if the stated prize becomes unavailable for reasons outside its reasonable control.",
      },
    ],
  },
  {
    number: 7,
    heading: "Winner Selection and Odds",
    body: [
      {
        type: "p",
        text: "Road to Matchday winners will be selected at random from all eligible entries using a verifiably random computer process.",
      },
      {
        type: "p",
        text: "Entries close at 11:59pm BST on September 7, 2026. Winners will be selected on September 8, 2026.",
      },
      {
        type: "p",
        text: "The selected winner will receive the Road to Matchday pre-game experience for themselves and one guest.",
      },
      { type: "p", text: "Odds of winning depend on the number of eligible entries received." },
    ],
  },
  {
    number: 8,
    heading: "Winner Notification",
    body: [
      {
        type: "p",
        text: "Selected winners will be notified by email on September 8, 2026 using the email address provided at entry.",
      },
      {
        type: "p",
        text: "Each selected winner must respond and confirm attendance within 24 hours of the winner notification email being sent.",
      },
      { type: "p", text: "If a selected winner:" },
      {
        type: "list",
        items: [
          "cannot attend the Road to Matchday pre-game experience on September 11, 2026;",
          "does not respond within 24 hours of the winner notification email being sent;",
          "cannot verify eligibility; or",
          "otherwise fails to comply with these Official Rules,",
        ],
      },
      {
        type: "p",
        text: "that winner's prize may be forfeited and Athletes Elevated may randomly select an alternate winner from the remaining eligible entries.",
      },
      {
        type: "p",
        text: "The Promoter will make reasonable efforts to contact each selected winner using the information provided at entry.",
      },
    ],
  },
  {
    number: 9,
    heading: "Winner Information",
    body: [
      {
        type: "p",
        text: "The Promoter may make available information demonstrating that valid prizes were awarded. The Promoter will publish or make available information sufficient to demonstrate that valid prize awards took place, which may include images from the event across socials and/or email.",
      },
      {
        type: "p",
        text: "Entrants will be informed at or before the time of entry that this information may be published or made available. Entrants may object to the publication of their information or request that the amount of information published or made available be reduced by contacting ae@athleteselevated.com.",
      },
      {
        type: "p",
        text: "Where an entrant objects or requests reduced disclosure, the Promoter may still be required to provide the relevant winner information to the Advertising Standards Authority if challenged.",
      },
      { type: "p", text: "The privacy of prize winners will not be prejudiced by the publication of personal information." },
    ],
  },
  {
    number: 10,
    heading: "Privacy",
    body: [
      { type: "p", text: "Personal information collected to administer Call the Match will be used to:" },
      {
        type: "list",
        items: [
          "verify eligibility,",
          "administer entries,",
          "select and contact winners,",
          "deliver prizes,",
          "comply with legal obligations, and",
          "otherwise administer the Promotion.",
        ],
      },
      { type: "p", text: "Entering the prize draw does not require consenting to future marketing." },
      {
        type: "p",
        text: "Marketing communications will be sent only where the Promoter has an appropriate lawful basis. Entrants may unsubscribe from marketing at any time.",
      },
      {
        type: "p",
        text: "See our privacy policy for more details: https://www.athleteselevated.com/privacy-policy",
      },
    ],
  },
  {
    number: 11,
    heading: "General Conditions",
    body: [
      {
        type: "p",
        text: "The Promoter may disqualify entrants who tamper with the entry process, submit fraudulent information, attempt multiple entries or otherwise violate these Official Rules.",
      },
      {
        type: "p",
        text: "The Promoter is not responsible for entries that are lost, late, incomplete, corrupted or not received because of technical failures beyond its reasonable control.",
      },
      {
        type: "p",
        text: "The Promoter reserves the right to suspend, cancel or modify the Promotion if circumstances outside its reasonable control make fair administration impossible, subject to applicable law.",
      },
      { type: "p", text: "Prizes will be awarded as described or as reasonable equivalents where permitted by applicable law." },
    ],
  },
  {
    number: 12,
    heading: "Taxes",
    body: [
      {
        type: "p",
        text: "Any tax liability arising from receipt of a prize is the responsibility of the winner except where applicable law requires otherwise.",
      },
    ],
  },
  {
    number: 13,
    heading: "Filming Consent",
    body: [
      {
        type: "p",
        text: "By attending this event, you acknowledge that photography, video, and audio recording may take place, and that you may appear in these recordings. Athletes Elevated (and its appointed photographers/videographers) may use this content across our website, social media channels, marketing materials, and those of our partners, without further notice or compensation.",
      },
      {
        type: "p",
        text: "If you do not wish to be filmed or photographed, please inform a member of staff on arrival so that reasonable steps can be taken to avoid featuring you in close-up or identifiable shots. Please note we cannot guarantee exclusion from wide shots, crowd footage, or general event coverage.",
      },
    ],
  },
  {
    number: 14,
    heading: "Complaints Process",
    body: [
      {
        type: "p",
        text: "We're committed to running this giveaway fairly and transparently. If you have any complaint about how the giveaway has been conducted, please email us at ae@athleteselevated.com with your name and the details of your concern. We will acknowledge your complaint promptly and aim to resolve it within 14 days.",
      },
      {
        type: "p",
        text: "This giveaway is administered in accordance with the UK Code of Non-broadcast Advertising and Direct & Promotional Marketing (the CAP Code). If you are not satisfied with our response, you may refer your complaint to the Advertising Standards Authority (ASA) at asa.org.uk.",
      },
    ],
  },
];

/* ============================================================================
   PAGE
============================================================================ */

export default function OfficialRulesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F7F8FA] text-[#0F1A2E]" style={{ fontFamily: BODY }}>
        <section className={`text-white ${NAVY_GRADIENT_BG}`}>
          <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
            <p className={`${EYEBROW} text-[#52AAFC]`} style={HEADING_STYLE}>
              {RULES_META.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl uppercase leading-[0.95] text-white sm:text-5xl" style={HEADING_STYLE}>
              {RULES_META.title}
            </h1>
            <p className="mt-3 text-lg font-bold uppercase tracking-wide text-white/80" style={HEADING_STYLE}>
              {RULES_META.subtitle}
            </p>
          </div>
        </section>

        <section className="bg-[#F7F8FA] text-[#0F1A2E]">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
            {RULES.map((section) => (
              <div key={section.number} className="border-b border-black/10 py-10 first:pt-0 last:border-b-0">
                <h2 className="text-2xl uppercase leading-[0.95] text-[#0B2560]" style={HEADING_STYLE}>
                  {section.number}. {section.heading}
                </h2>
                <RuleBody blocks={section.body} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ============================================================================
   LOCAL SUB-COMPONENTS
============================================================================ */

function RuleBody({ blocks }: { blocks: RuleBlock[] }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="leading-relaxed text-[#0F1A2E]/80">
                <Linkify text={block.text} />
              </p>
            );
          case "subheading":
            return (
              <p key={i} className="text-lg font-bold text-[#6B2338]" style={HEADING_STYLE}>
                {block.text}
              </p>
            );
          case "lines":
            return (
              <p key={i} className="rounded-lg bg-black/[0.03] px-4 py-3 leading-relaxed text-[#0F1A2E]/80">
                {block.items.map((line, j) => (
                  <span key={j} className="block">
                    <Linkify text={line} />
                  </span>
                ))}
              </p>
            );
          case "list":
            return block.ordered ? (
              <ol key={i} className="list-inside list-decimal space-y-2 leading-relaxed text-[#0F1A2E]/80">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Linkify text={item} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="list-inside list-disc space-y-2 leading-relaxed text-[#0F1A2E]/80">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Linkify text={item} />
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// Turns any http(s) URL, email address, or the bare "asa.org.uk" domain
// found inside a string into a real, clickable link — everything else
// renders as plain text. Keeps RULES above as plain, easy-to-edit strings
// instead of needing hand-written <a> tags scattered through the content.
const LINK_SPLIT_RE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|asa\.org\.uk)/g;
const URL_RE = /^https?:\/\//;
const EMAIL_RE = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/;

function Linkify({ text }: { text: string }) {
    const parts = text.split(LINK_SPLIT_RE);
    return (
      <>
        {parts.map((part, i) => {
          if (!part) return null;
          if (URL_RE.test(part)) {
            return (
              <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="font-bold text-[#6B2338] underline">
                {part}
              </a>
            );
          }
          if (EMAIL_RE.test(part)) {
            return (
              <a key={i} href={`mailto:${part}`} className="font-bold text-[#6B2338] underline">
                {part}
              </a>
            );
          }
          if (part === "asa.org.uk") {
            return (
              <a key={i} href="https://www.asa.org.uk" target="_blank" rel="noopener noreferrer" className="font-bold text-[#6B2338] underline">
                {part}
              </a>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  }