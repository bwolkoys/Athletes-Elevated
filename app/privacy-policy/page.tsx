// Place this file at: app/privacy/page.tsx
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';

const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";
const NAVY    = '#080F1C';

export const metadata = {
  title: 'Privacy Policy | Athletes Elevated',
};

const sections = [
  {
    number: '1.',
    title: 'Who we are',
    content: `Athletes Elevated LLC is the data controller responsible for your personal information. We are a Nevada limited liability company with our principal place of business at 2329 Creek Crossing Loop, Park City, UT 84098.\n\nFor users in the United Kingdom or European Economic Area, our EU/UK representative can be reached at ae@athleteselevated.com.`,
  },
  {
    number: '2.',
    title: 'Information we collect',
    content: `At this stage of our launch, we collect a limited set of information:`,
    list: [
      'Information you give us directly. When you sign up for priority access, we collect your first name, last name, and email address.',
      'Information collected automatically. When you use our website, we and our service providers may collect device and usage information through cookies and similar technologies, including IP address, browser type, pages visited, referring URLs, and time spent on the site. We use Google Analytics for these purposes. We may add additional analytics and advertising technologies over time (including marketing pixels and campaign tracking parameters), which we will disclose in our Cookie Notice below and through our cookie consent banner.',
      'Information from third parties. If you reach us through a partner (for example, through West Ham United), we may receive information confirming the referral source. We do not receive personal information about you from partners without your knowledge.',
    ],
    after: 'As our services expand to include marketplace features, rewards, athlete partnerships, and payments, we will update this policy to describe any additional information collected.',
  },
  {
    number: '3.',
    title: 'How we use your information',
    content: `We use your information to:`,
    list: [
      'Confirm your priority access sign-up and communicate with you about the platform',
      'Send you marketing communications about Athletes Elevated, including updates on athletes, brand partners, product drops, rewards, and events, where you have opted in',
      'Measure and improve website performance and user experience',
      'Prevent fraud, enforce our Terms of Use, and comply with legal obligations',
      'Communicate with you about material changes to our services',
    ],
  },
  {
    number: '4.',
    title: 'Legal basis for processing (UK and EU users)',
    content: `If you are located in the United Kingdom or European Economic Area, we rely on the following legal bases under the UK GDPR and EU GDPR:`,
    list: [
      'Consent. We rely on your consent to send you marketing communications and to place non-essential cookies. You can withdraw your consent at any time.',
      'Legitimate interests. We rely on our legitimate interests to operate and secure our website, measure basic performance, prevent fraud, and communicate with you about your sign-up. Where we rely on legitimate interests, we have assessed that these do not override your rights and freedoms.',
      'Legal obligation. We process information where necessary to comply with applicable law.',
    ],
  },
  {
    number: '5.',
    title: 'How we share your information',
    content: `We do not sell your personal information. We share information only as follows:`,
    list: [
      'Service providers. We share information with vendors who help us operate the website and communicate with you, including our email marketing platform, CRM system (Eye in Teams), analytics providers, and hosting providers. These vendors are contractually required to protect your information and use it only for the services they provide to us.',
      'Corporate affiliates. Athletes Elevated is part of a family of companies. We may share information with our affiliates for operational purposes, subject to this policy.',
      'Legal and safety reasons. We may disclose information if required by law, legal process, or to protect the rights, property, or safety of Athletes Elevated, our users, or others.',
      'Business transactions. If Athletes Elevated is involved in a merger, acquisition, financing, or sale of assets, your information may be transferred as part of that transaction.',
    ],
  },
  {
    number: '6.',
    title: 'International data transfers',
    content: `Athletes Elevated is based in the United States. If you access our services from outside the United States, your information will be transferred to, stored in, and processed in the United States. Where required by law, we rely on approved transfer mechanisms, including the UK Addendum to the EU Standard Contractual Clauses and the EU Standard Contractual Clauses, to protect your information during international transfer.`,
  },
  {
    number: '7.',
    title: 'How long we keep your information',
    content: `We keep your information for as long as your sign-up remains active and for a reasonable period after that to comply with legal obligations, resolve disputes, and enforce our agreements. If you unsubscribe from marketing communications, we will keep a minimal record of your opt-out to ensure we honor your choice. You can request deletion of your information at any time as described in Section 9.`,
  },
  {
    number: '8.',
    title: 'Cookies and tracking',
    content: `We use cookies and similar technologies to operate our website and to understand how visitors use it. Cookies fall into the following categories:`,
    list: [
      'Strictly necessary cookies are required for the website to function and cannot be switched off.',
      'Analytics cookies help us understand how visitors interact with the website. We currently use Google Analytics.',
      'Marketing and advertising cookies may be used in the future to measure and personalize advertising campaigns. We will update this policy and our cookie banner when these are added.',
    ],
    after: 'Our cookie consent banner lets you accept, reject, or manage non-essential cookies. You can also control cookies through your browser settings. If you are located in the United Kingdom or European Economic Area, non-essential cookies will only be set if you actively consent to them.',
  },
  {
    number: '9.',
    title: 'Your rights',
    content: `Depending on where you live, you may have the following rights regarding your personal information:`,
    list: [
      'Access a copy of the information we hold about you',
      'Correct information that is inaccurate or incomplete',
      'Delete your information, subject to certain legal exceptions',
      'Restrict or object to certain processing of your information',
      'Portability of your information in a machine-readable format',
      'Withdraw consent to processing that is based on your consent',
      'Lodge a complaint with a supervisory authority (in the UK, the Information Commissioner\'s Office; in the EU, your local data protection authority)',
    ],
    after: 'To exercise any of these rights, contact us at ae@athleteselevated.com. We will respond within the timeframe required by applicable law. We may need to verify your identity before we can act on your request.',
  },
  {
    number: '10.',
    title: 'Marketing communications',
    content: `If you have opted in to marketing communications, you can unsubscribe at any time by clicking the unsubscribe link in any marketing email or by contacting us at ae@athleteselevated.com. Unsubscribing from marketing does not affect service-related communications about your sign-up or account.`,
  },
  {
    number: '11.',
    title: 'California and other U.S. state privacy rights',
    content: `If you are a resident of California, Colorado, Connecticut, Virginia, Utah, Texas, Oregon, Montana, Delaware, or another U.S. state with a comprehensive privacy law, you have specific rights under those laws, including the rights described in Section 9 above.\n\nCalifornia residents: Under the California Consumer Privacy Act as amended by the California Privacy Rights Act, you have the right to know what personal information we collect about you, request deletion of your information, correct inaccurate information, and opt out of the "sale" or "sharing" of your personal information (as those terms are defined under California law). We do not sell your personal information as that term is commonly understood. To exercise your California rights, contact us at ae@athleteselevated.com.\n\nWe do not discriminate against users who exercise their privacy rights.`,
  },
  {
    number: '12.',
    title: 'Children\'s privacy',
    content: `Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from anyone under 16. If we learn that we have collected information from a child under 16, we will delete it. If you believe a child has provided us with personal information, contact us at ae@athleteselevated.com.`,
  },
  {
    number: '13.',
    title: 'Security',
    content: `We use reasonable technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security.`,
  },
  {
    number: '14.',
    title: 'Changes to this policy',
    content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you by updating the "Last updated" date at the top of this policy and, where required by law, by providing additional notice such as an email or a prominent notice on our website. Your continued use of our services after any update means you accept the revised policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#ffffff', paddingTop: 96 }}>

        {/* Header */}
        <div style={{ backgroundColor: NAVY, padding: '64px 24px 56px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16, borderLeft: '1.5px solid #52aafc', paddingLeft: 10, display: 'inline-block' }}>
              Legal
            </p>
            <h1 style={{ fontFamily: HEADING, color: '#ffffff', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 20 }}>
              Privacy Policy
            </h1>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 300, lineHeight: 1.6 }}>
              Effective date: July 11, 2026 &nbsp;·&nbsp; Last updated: July 11, 2026
            </p>
          </div>
        </div>

        {/* Intro */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 0' }}>
          <p style={{ fontFamily: BODY, color: '#374151', fontSize: 16, fontWeight: 300, lineHeight: 1.85, borderLeft: '3px solid #52aafc', paddingLeft: 20 }}>
            This Privacy Policy explains how Athletes Elevated LLC ("Athletes Elevated," "we," "us," or "our") collects, uses, and shares personal information when you visit our website at{' '}
            <a href="https://www.athleteselevated.com" style={{ color: '#52aafc', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              https://www.athleteselevated.com
            </a>{' '}
            or interact with our services. It also explains your rights and how to exercise them. If you have any questions, contact us at{' '}
            <a href="mailto:privacy@athleteselevated.com" style={{ color: '#52aafc', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              ae@athleteselevated.com
            </a>.
          </p>
        </div>

        {/* Sections */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
          {sections.map(({ number, title, content, list, after }: { number: string; title: string; content: string; list?: string[]; after?: string }) => (
            <div key={number} style={{ marginBottom: 44, paddingBottom: 44, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 14 }}>
                <span style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 13, fontWeight: 300, letterSpacing: '0.04em', flexShrink: 0 }}>
                  {number}
                </span>
                <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
                  {title}
                </h2>
              </div>
              {content.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontFamily: BODY, color: '#374151', fontSize: 15, fontWeight: 300, lineHeight: 1.85, marginBottom: 14 }}>
                  {para}
                </p>
              ))}
              {list && (
                <ul style={{ margin: '12px 0', padding: 0, listStyle: 'none' }}>
                  {list.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                      <span style={{ color: '#52aafc', fontSize: 12, marginTop: 5, flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: BODY, color: '#374151', fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {after && (
                <p style={{ fontFamily: BODY, color: '#374151', fontSize: 15, fontWeight: 300, lineHeight: 1.85, marginTop: 14 }}>
                  {after}
                </p>
              )}
            </div>
          ))}

          {/* Contact section */}
          <div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 13, fontWeight: 300, letterSpacing: '0.04em' }}>15.</span>
              <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
                Contact us
              </h2>
            </div>
            <address style={{ fontStyle: 'normal', fontFamily: BODY, color: '#374151', fontSize: 15, fontWeight: 300, lineHeight: 2 }}>
              Athletes Elevated LLC<br />
              2329 Creek Crossing Loop<br />
              Park City, UT 84098<br />
              <a href="mailto:privacy@athleteselevated.com" style={{ color: '#52aafc', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                ae@athleteselevated.com
              </a>
            </address>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}