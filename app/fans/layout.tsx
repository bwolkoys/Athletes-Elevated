import type { Metadata } from "next";
import { PAGE_METADATA } from "../src/lib/uxContent";

export const metadata: Metadata = {
  title: PAGE_METADATA.fans.title,
  description: PAGE_METADATA.fans.description,
  openGraph: PAGE_METADATA.fans,
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.fans.title,
    description: PAGE_METADATA.fans.description,
  },
};

export default function FansLayout({ children }: { children: React.ReactNode }) {
  return children;
}
