import type { Metadata } from "next";
import { getAthletes } from "../lib/athletes";
import AthletesGrid from "./AthletesGrid";
import Navbar from "../src/components/navBar";
import Footer from "../src/components/footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Athletes | Athletes Elevated",
  description:
    "Athletes who build their brand, give back, and bring fans inside their world — on the field and off it.",
};

export default async function AthletesPage() {
  const athletes = await getAthletes();

  return (
    <>
      <Navbar />
      <AthletesGrid athletes={athletes} />
      <Footer />
    </>
  );
}