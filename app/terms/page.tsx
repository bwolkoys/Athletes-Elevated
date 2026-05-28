import Link from "next/link";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import Footer from "../src/components/footer";
import Navbar from "../src/components/navBar";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

export default function TermsPage() {
  return (
    <div className={`${barlow.variable} ${montserrat.variable} bg-white font-(family-name:--font-montserrat) text-[#092866]`}>
      <Navbar />
      <main className="px-6 pb-24 pt-36 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <p className="mb-4 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.24em] text-[#52aafc]">
            Legal
          </p>
          <h1 className="font-(family-name:--font-barlow) text-[clamp(48px,8vw,112px)] font-extrabold uppercase leading-[0.86]">
            Terms & Conditions
          </h1>
          <p className="mt-8 text-[18px] leading-[1.75] text-[#092866]/72">
            By using the Athletes Elevated website, you agree to use it responsibly and understand that application, partnership, product, and launch information may change over time.
          </p>
          <div className="mt-12 space-y-8 border-t border-[#092866]/10 pt-10 text-[17px] leading-[1.8] text-[#092866]/72">
            <section>
              <h2 className="mb-3 font-(family-name:--font-barlow) text-[28px] font-bold uppercase text-[#092866]">Website Use</h2>
              <p>The content on this website is provided for informational purposes. Access to athlete membership, products, partnerships, or experiences may be limited, invite-only, or subject to approval.</p>
            </section>
            <section>
              <h2 className="mb-3 font-(family-name:--font-barlow) text-[28px] font-bold uppercase text-[#092866]">Submissions</h2>
              <p>Submitting a form does not guarantee acceptance, partnership, placement, sponsorship, or participation in any Athletes Elevated product or program.</p>
            </section>
            <section>
              <h2 className="mb-3 font-(family-name:--font-barlow) text-[28px] font-bold uppercase text-[#092866]">Content</h2>
              <p>All brand names, product names, copy, visuals, and media on this website are owned by Athletes Elevated or their respective owners unless otherwise stated.</p>
            </section>
          </div>
          <Link href="/" className="mt-12 inline-flex border-b border-[#52aafc]/50 pb-1 font-(family-name:--font-barlow) text-[13px] font-bold uppercase tracking-[0.18em] text-[#52aafc]">
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
