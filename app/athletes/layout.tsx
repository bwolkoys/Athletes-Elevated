import type { Metadata } from "next";
import { PAGE_METADATA } from "../src/lib/uxContent";

export const metadata: Metadata = {
  title: PAGE_METADATA.athletes.title,
  description: PAGE_METADATA.athletes.description,
  openGraph: PAGE_METADATA.athletes,
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.athletes.title,
    description: PAGE_METADATA.athletes.description,
  },
};

export default function AthletesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
