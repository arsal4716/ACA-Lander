import { Link } from 'react-router-dom'
import { SITE, PARTNERS } from '../data/site'
import PageHero from '../components/PageHero'

export default function Partners() {
  return (
    <>
      <PageHero title="Our Marketing Partners" sub="The licensed agent and marketing partners that may contact you when you submit a request." />
      <section className="legal">
        <div className="container legal-wrap">
          <p className="legal-meta">Last Updated: July 24, 2026</p>
          <p>When you submit your information through <strong>{SITE.domain.toLowerCase()}</strong> or call the number listed on this Site, you consent to be contacted about health insurance options by {SITE.name} and one or more of the licensed agent and marketing partners listed below. These partners may contact you by phone, autodialer, prerecorded or artificial voice, text message, and email regarding health insurance products. Consent is not a condition of purchase.</p>
          <h2>Our Partners</h2>
          <ul>
            {PARTNERS.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p>This list may be updated from time to time as partner relationships change. For details on how your information is collected, used, and shared, please review our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms">Terms &amp; Conditions</Link>.</p>
          <h2>Questions</h2>
          <p>If you have questions about our partners or wish to opt out of being contacted, reach us at:</p>
          <ul>
            <li>Phone: {SITE.phone}</li>
            <li>Email: {SITE.email}</li>
            <li>Mailing Address: {SITE.address}</li>
          </ul>
        </div>
      </section>
    </>
  )
}
