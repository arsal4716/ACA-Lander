import { SITE } from '../data/site'
import PageHero from '../components/PageHero'

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" sub="Your privacy matters to us. Here's how we handle your information." />
      <section className="legal">
        <div className="container legal-wrap">
          <p className="legal-meta">Effective Date: July 9, 2026 &middot; Last Updated: July 9, 2026</p>
          <p>This Privacy Policy describes how <strong>{SITE.name}</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operated by {SITE.legalName}, collects, uses, discloses, and protects information when you visit <strong>{SITE.domain.toLowerCase()}</strong> (the &ldquo;Site&rdquo;) or contact us by phone, email, or web form.</p>
          <p>By using the Site or contacting us, you agree to the collection and use of information as described in this Privacy Policy. If you do not agree, please do not use the Site.</p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following categories of information:</p>
          <ul>
            <li><strong>Information you provide directly:</strong> name, phone number, email address, ZIP code, age, household information, and other details you share with us or a licensed agent by phone or through any form on the Site.</li>
            <li><strong>Automatically collected information:</strong> IP address, browser type, device type, referring URL, pages visited, and general usage data, collected via cookies and similar tracking technologies.</li>
            <li><strong>Call information:</strong> if you call the phone number listed on the Site, calls may be recorded or monitored for quality assurance, training, and compliance purposes, where permitted by law.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To connect you with a licensed insurance agent for a free, no-obligation consultation;</li>
            <li>To respond to inquiries and provide customer support;</li>
            <li>To operate, maintain, and improve the Site;</li>
            <li>To comply with applicable laws, regulations, and industry requirements;</li>
            <li>To detect, prevent, and address fraud, abuse, or security issues.</li>
          </ul>

          <h2>3. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li><strong>Licensed insurance agents and carriers</strong> so they can provide you with plan information, quotes, and enrollment assistance;</li>
            <li><strong>Service providers</strong> who perform services on our behalf, such as hosting, analytics, and call handling, under confidentiality obligations;</li>
            <li><strong>Legal and regulatory authorities</strong> when required by law, subpoena, or to protect our rights, property, or safety, or that of others.</li>
          </ul>

          <h2>4. Cookies &amp; Tracking Technologies</h2>
          <p>The Site may use cookies, web beacons, and similar technologies to remember preferences, understand how visitors use the Site, and support advertising and analytics. You can control cookies through your browser settings; disabling cookies may affect Site functionality.</p>
          <p>We also use <strong>TrustedForm</strong>, a certification service provided by ActiveProspect, Inc., to create a timestamped record (&ldquo;certificate&rdquo;) of the session in which you submit a form on this Site. This helps us document and verify your consent to be contacted. TrustedForm may collect information such as your IP address, browser details, and interactions with the page during that session. Learn more at ActiveProspect&rsquo;s TrustedForm disclosure. We also use LeadiD (Jornaya) for the same consent verification purpose.</p>

          <h2>5. Communications Consent (Calls, Texts &amp; Email)</h2>
          <p>If you provide your phone number or submit a request through this Site, you consent to be contacted by us and/or our marketing partners and licensed agents by telephone (including via automatic telephone dialing systems and prerecorded or artificial voice messages), SMS/text message, and email regarding health insurance options, even if your number is on a Do Not Call registry. Consent is not a condition of purchasing any product or service. Message and data rates may apply. You may revoke consent at any time by requesting to be placed on our internal do not call list or by replying &ldquo;STOP&rdquo; to any text message.</p>

          <h2>6. Data Security</h2>
          <p>We use commercially reasonable administrative, technical, and physical safeguards designed to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

          <h2>7. Data Retention</h2>
          <p>We retain personal information for as long as necessary to fulfill the purposes described in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements.</p>

          <h2>8. Your Choices &amp; Rights</h2>
          <ul>
            <li>You may opt out of marketing calls, texts, or emails at any time;</li>
            <li>You may request access to, correction of, or deletion of your personal information, subject to applicable law;</li>
            <li>Residents of certain states (e.g., California) may have additional rights under state privacy laws.</li>
          </ul>
          <p>To exercise any of these rights, contact us using the information in Section 11 below.</p>

          <h2>9. Children&rsquo;s Privacy</h2>
          <p>This Site is not directed to individuals under the age of 18, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can delete it.</p>

          <h2>10. Third-Party Links</h2>
          <p>The Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those third-party sites. We encourage you to review the privacy policies of any third-party site you visit.</p>

          <h2>11. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:</p>
          <ul>
            <li>Phone: {SITE.phone}</li>
            <li>Email: {SITE.email}</li>
            <li>Mailing Address: {SITE.address}</li>
          </ul>

          <h2>12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised &ldquo;Last Updated&rdquo; date. Your continued use of the Site after changes are posted constitutes acceptance of the updated Policy.</p>
        </div>
      </section>
    </>
  )
}
