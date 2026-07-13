// Place this file at: app/terms/page.tsx
import Navbar from '../src/components/navBar';
import Footer from '../src/components/footer';

const HEADING = "'Apotek Extended', sans-serif";
const BODY    = "'DM Sans', sans-serif";
const NAVY    = '#080F1C';

export const metadata = {
  title: 'Terms of Use | Athletes Elevated',
};

const sections = [
  {
    number: '1.',
    title: 'Who we are',
    content: `The Services are provided by Athletes Elevated LLC, a Nevada limited liability company with its principal place of business at 2329 Creek Crossing Loop, Park City, UT 84098 ("Athletes Elevated," "we," "us," or "our").`,
  },
  {
    number: '2.',
    title: 'Eligibility',
    content: `You must be at least 16 years old to use the Services. By using the Services, you represent that you are 16 or older and that you have the legal capacity to enter into these Terms. If you are using the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.`,
  },
  {
    number: '3.',
    title: 'Your account and sign-up',
    content: `At this stage, our sign-up captures your first name, last name, and email address to give you priority access to the Athletes Elevated platform as it launches. You agree that the information you provide is accurate and current. You are responsible for maintaining the confidentiality of any credentials associated with your sign-up and for all activity under your sign-up.`,
  },
  {
    number: '4.',
    title: 'Acceptable use',
    content: `When using the Services, you agree not to:`,
    list: [
      'Use the Services in violation of any law or regulation',
      'Impersonate any person or entity or misrepresent your affiliation with any person or entity',
      'Submit false, misleading, or fraudulent information',
      'Interfere with, disrupt, or attempt to gain unauthorized access to the Services or any related systems or networks',
      'Introduce viruses, malware, or other harmful code',
      'Use any automated system (including bots, scrapers, or spiders) to access the Services without our written permission',
      'Use the Services to send spam, unauthorized advertising, or other commercial communications',
      'Copy, modify, distribute, sell, or lease any part of the Services',
      'Reverse engineer or attempt to extract source code from the Services',
      'Use the Services in any manner that could damage, disable, or impair the Services or interfere with any other users use of the Services',
    ],
  },
  {
    number: '5.',
    title: 'Marketing communications',
    content: `If you opt in to marketing communications during sign-up, you will receive emails from Athletes Elevated about the platform, athletes, brand partners, product drops, rewards, and events. You can unsubscribe at any time by clicking the unsubscribe link in any marketing email or by contacting us at ae@athleteselevated.com. Our handling of your personal information is described in our Privacy Policy at https://www.athleteselevated.com/privacy-policy.`,
  },
  {
    number: '6.',
    title: 'Intellectual property',
    content: `The Services, including all content, features, and functionality (such as text, graphics, logos, images, video, software, and design), are owned by Athletes Elevated or its licensors and are protected by copyright, trademark, and other intellectual property laws.\n\nThe names "Athletes Elevated," the Athletes Elevated logo, and related marks are trademarks of Athletes Elevated LLC. Other names, logos, and trademarks appearing on the Services are the property of their respective owners, including West Ham United and other partners. You may not use any of these marks without our prior written permission or the permission of the applicable owner.\n\nWe grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal, non-commercial use. This license does not include any right to copy, modify, distribute, or create derivative works from the Services.`,
  },
  {
    number: '7.',
    title: 'Third-party links and partners',
    content: `The Services may contain links to third-party websites and services, including our partners such as West Ham United. We do not control and are not responsible for the content, policies, or practices of any third party. Your use of any third-party website or service is subject to the terms and policies of that third party.`,
  },
  {
    number: '8.',
    title: 'Feedback',
    content: `If you send us feedback, suggestions, or ideas about the Services, you agree that we may use that feedback without any obligation to you and that you have no rights in any resulting products or services.`,
  },
  {
    number: '9.',
    title: 'Disclaimers',
    content: `The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied. To the maximum extent permitted by law, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, secure, or free from harmful components.`,
  },
  {
    number: '10.',
    title: 'Limitation of liability',
    content: `To the maximum extent permitted by law, Athletes Elevated and its officers, directors, employees, affiliates, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunities, arising out of or in connection with your use of the Services, whether based in contract, tort, or any other legal theory.\n\nOur total aggregate liability to you for any and all claims arising out of or relating to the Services or these Terms will not exceed one hundred U.S. dollars ($100.00).\n\nSome jurisdictions do not allow the exclusion or limitation of certain warranties or damages, so some of the above limitations may not apply to you. Nothing in these Terms limits any rights that cannot be limited by applicable law, including consumer protection rights under UK or EU law.`,
  },
  {
    number: '11.',
    title: 'Indemnification',
    content: `You agree to indemnify and hold harmless Athletes Elevated and its officers, directors, employees, affiliates, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of your violation of these Terms, your misuse of the Services, or your violation of any law or the rights of any third party.`,
  },
  {
    number: '12.',
    title: 'Termination',
    content: `We may suspend or terminate your access to the Services at any time, with or without notice, if we believe you have violated these Terms or if we otherwise determine that termination is appropriate. You may stop using the Services at any time. Sections that by their nature should survive termination will survive, including intellectual property, disclaimers, limitation of liability, indemnification, and governing law.`,
  },
  {
    number: '13.',
    title: 'Governing law and dispute resolution',
    content: `These Terms are governed by the laws of the State of Nevada, without regard to its conflict of law principles. Any dispute arising out of or relating to these Terms or the Services will be resolved exclusively in the state or federal courts located in Clark County, Nevada, and you consent to the personal jurisdiction of those courts.\n\nNothing in this section limits any rights you have under applicable consumer protection law in the country where you live, including your right to bring a claim in your local courts if you are a consumer in the United Kingdom or European Economic Area.`,
  },
  {
    number: '14.',
    title: 'Changes to these Terms',
    content: `We may update these Terms from time to time. When we make material changes, we will update the "Last updated" date above and, where appropriate, provide additional notice. Your continued use of the Services after any update means you accept the revised Terms.`,
  },
  {
    number: '15.',
    title: 'Miscellaneous',
    content: `These Terms, together with our Privacy Policy, are the entire agreement between you and Athletes Elevated regarding the Services. If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect. Our failure to enforce any provision is not a waiver of that provision. You may not assign or transfer these Terms without our written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.`,
  },
];

export default function TermsPage() {
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
              Terms of Use
            </h1>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 300, lineHeight: 1.6 }}>
              Effective date: July 11, 2026 &nbsp;·&nbsp; Last updated: July 11, 2026
            </p>
          </div>
        </div>

        {/* Intro */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 0' }}>
          <p style={{ fontFamily: BODY, color: '#374151', fontSize: 16, fontWeight: 300, lineHeight: 1.85, borderLeft: '3px solid #52aafc', paddingLeft: 20 }}>
            Welcome to Athletes Elevated. These Terms of Use ("Terms") govern your access to and use of the Athletes Elevated website at{' '}
            <a href="https://www.athleteselevated.com" style={{ color: '#52aafc', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              https://www.athleteselevated.com
            </a>{' '}
            and any related services we provide (together, the "Services"). By using the Services, you agree to these Terms. If you do not agree, do not use the Services.
          </p>
        </div>

        {/* Sections */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
          {sections.map(({ number, title, content, list }) => (
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
                <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none' }}>
                  {list.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                      <span style={{ color: '#52aafc', fontSize: 12, marginTop: 5, flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: BODY, color: '#374151', fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Contact section */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: HEADING, color: '#52aafc', fontSize: 13, fontWeight: 300, letterSpacing: '0.04em' }}>16.</span>
              <h2 style={{ fontFamily: HEADING, color: NAVY, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
                Contact us
              </h2>
            </div>
            <address style={{ fontStyle: 'normal', fontFamily: BODY, color: '#374151', fontSize: 15, fontWeight: 300, lineHeight: 2 }}>
              Athletes Elevated LLC<br />
              2329 Creek Crossing Loop<br />
              Park City, UT 84098<br />
              <a href="mailto:ae@athleteselevated.com" style={{ color: '#52aafc', textDecoration: 'underline', textUnderlineOffset: 3 }}>
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