import { SITE } from '../data/site'
import PageHero from '../components/PageHero'

const contact = (
  <ul>
    <li>Phone: {SITE.phone}</li>
    <li>Email: {SITE.email}</li>
    <li>Mailing Address: {SITE.address}</li>
  </ul>
)

export default function Terms() {
  const L = SITE.legalName
  return (
    <>
      <PageHero title="Terms & Conditions" sub="Please read these terms carefully before using our website." />
      <section className="legal">
        <div className="container legal-wrap">
          <p className="legal-meta">Effective Date: July 9, 2026 &middot; Last Updated: July 9, 2026</p>
          <p>These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of <strong>{SITE.domain.toLowerCase()}</strong> (the &ldquo;Site&rdquo;), operated by {L} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.</p>

          <h2>1. Not an Insurance Company or the Government Marketplace</h2>
          <p>{SITE.name} is a private marketing website. We are not an insurance company, insurance agency, or the Health Insurance Marketplace. We are not affiliated with, endorsed by, or sponsored by the U.S. government, any state government, the Centers for Medicare &amp; Medicaid Services (CMS), the Department of Health and Human Services (HHS), or HealthCare.gov. Calling the number listed on this Site connects you with a licensed insurance agent or producer who can discuss health insurance options with you, including but not limited to Affordable Care Act (&ldquo;ACA&rdquo;) Marketplace plans.</p>

          <h2>2. Informational Purposes Only</h2>
          <p>Content on this Site is provided for general informational purposes only and does not constitute insurance, legal, financial, or medical advice. Plan availability, pricing, subsidy eligibility, and coverage details vary by state, carrier, and individual circumstances, and are subject to change without notice. Nothing on this Site guarantees eligibility for any specific plan, subsidy, or premium amount.</p>

          <h2>3. Use of the Site</h2>
          <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Provide false, misleading, or fraudulent information when contacting us;</li>
            <li>Use the Site in any way that could damage, disable, or impair its functionality;</li>
            <li>Attempt to gain unauthorized access to any part of the Site or its related systems;</li>
            <li>Use automated means (bots, scrapers) to access or collect data from the Site without our consent.</li>
          </ul>

          <h2>4. Consent to Be Contacted</h2>
          <p>By submitting your contact information through this Site or by calling the number listed, you consent to be contacted by us and/or our marketing partners and licensed insurance agents by phone, text message, and email regarding health insurance products, using the methods described in our Privacy Policy. Consent is not required as a condition of purchasing any product or service.</p>

          <h2>5. Intellectual Property</h2>
          <p>All content on this Site, including text, graphics, logos, images, and software, is the property of {L} or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on the Site without our prior written consent.</p>

          <h2>6. Third Party Links</h2>
          <p>The Site may contain links to third party websites that are not owned or controlled by us. We are not responsible for the content, accuracy, or practices of any third party website. Accessing linked sites is at your own risk.</p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>THE SITE AND ALL CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR FREE, OR SECURE, OR THAT ANY INFORMATION ON THE SITE IS ACCURATE, COMPLETE, OR CURRENT.</p>

          <h2>8. Limitation of Liability</h2>
          <p>TO THE FULLEST EXTENT PERMITTED BY LAW, {L.toUpperCase()} AND ITS OFFICERS, EMPLOYEES, AGENTS, AND PARTNERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE OR ANY INSURANCE PRODUCT DISCUSSED THROUGH IT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

          <h2>9. Indemnification</h2>
          <p>You agree to indemnify and hold harmless {L} and its affiliates, officers, employees, and agents from any claims, damages, liabilities, and expenses arising from your use of the Site or violation of these Terms.</p>

          <h2>10. Changes to These Terms</h2>
          <p>We may update these Terms from time to time. Changes will be posted on this page with a revised &ldquo;Last Updated&rdquo; date. Your continued use of the Site after changes are posted constitutes acceptance of the updated Terms.</p>

          <h2>11. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of {SITE.state}, without regard to its conflict of laws principles, unless otherwise required by applicable federal or state law.</p>

          <h2>12. Contact Us</h2>
          <p>If you have questions about these Terms, contact us at:</p>
          {contact}
        </div>
      </section>
    </>
  )
}
