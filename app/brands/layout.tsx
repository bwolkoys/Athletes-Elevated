import type { Metadata } from "next";
import { PAGE_METADATA } from "../src/lib/uxContent";

export const metadata: Metadata = {
  title: PAGE_METADATA.brands.title,
  description: PAGE_METADATA.brands.description,
  openGraph: PAGE_METADATA.brands,
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.brands.title,
    description: PAGE_METADATA.brands.description,
  },
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
