import type { Metadata } from "next";
import { PAGE_METADATA } from "../src/lib/uxContent";

export const metadata: Metadata = {
  title: PAGE_METADATA.ecosystem.title,
  description: PAGE_METADATA.ecosystem.description,
  openGraph: PAGE_METADATA.ecosystem,
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.ecosystem.title,
    description: PAGE_METADATA.ecosystem.description,
  },
};

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
