import type { Metadata } from "next";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";

export const metadata: Metadata = {
  title: "Official Rules | Road to Matchday",
  description:
    "Official Rules for the Road to Matchday: Call the Match Free Prize Draw, run by Athletes Elevated.",
};

/* ============================================================================
   PAGE
============================================================================ */

export default function OfficialRulesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F7F8FA] text-[#0F1A2E]">

      </main>
      <Footer />
    </>
  );
}
