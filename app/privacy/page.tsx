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

export default function PrivacyPage() {
  return (
    <div className={`${barlow.variable} ${montserrat.variable} bg-white font-(family-name:--font-montserrat) text-[#092866]`}>
      <Navbar />
      <main className="px-6 pb-24 pt-36 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <p className="mb-4 font-(family-name:--font-barlow) text-[12px] font-bold uppercase tracking-[0.24em] text-[#52aafc]">
            Legal
          </p>
          <h1 className="font-(family-name:--font-barlow) text-[clamp(48px,8vw,112px)] font-extrabold uppercase leading-[0.86]">
            Privacy Policy
          </h1>
          <p className="mt-8 text-[18px] leading-[1.75] text-[#092866]/72">
            Athletes Elevated collects information submitted through forms and newsletter signups to respond to inquiries, review applications, and send relevant updates. We do not sell personal information.
          </p>
          <div className="mt-12 space-y-8 border-t border-[#092866]/10 pt-10 text-[17px] leading-[1.8] text-[#092866]/72">
            <section>
              <h2 className="mb-3 font-(family-name:--font-barlow) text-[28px] font-bold uppercase text-[#092866]">Information We Collect</h2>
              <p>We may collect names, email addresses, phone numbers, company details, athlete credentials, interests, messages, and other information voluntarily submitted through this website.</p>
            </section>
            <section>
              <h2 className="mb-3 font-(family-name:--font-barlow) text-[28px] font-bold uppercase text-[#092866]">How We Use It</h2>
              <p>We use submitted information to respond to applications, partnership inquiries, newsletter signups, and operational requests related to Athletes Elevated.</p>
            </section>
            <section>
              <h2 className="mb-3 font-(family-name:--font-barlow) text-[28px] font-bold uppercase text-[#092866]">Contact</h2>
              <p>For privacy questions, contact the Athletes Elevated team through the relevant application or partnership form.</p>
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
