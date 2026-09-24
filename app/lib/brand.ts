/**
 * Athletes Elevated — shared brand tokens
 * Place at:  lib/brand.ts
 */
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Apotek Extended is an Adobe Fonts typeface. If your Adobe kit is loaded in
// layout.tsx, this family name picks it up; otherwise Montserrat 800 is used.
export const HEADLINE_FONT = `"apotek-extended", "Apotek Extended", ${montserrat.style.fontFamily}`;

/** Brand palette (for reference — the pages use these hex values in Tailwind classes). */
export const BRAND = {
  navy: "#092866",
  sky: "#52aafc",
  royal: "#006aac",
  gray: "#c2c2c2",
  charcoal: "#231f20",
} as const;