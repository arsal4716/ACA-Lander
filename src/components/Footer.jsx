import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../data/site'
import { PhoneIcon, MailIcon, PinIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <span className="footer-logo"><Logo /></span>
            <p>We help individuals and families understand their health insurance options under the Affordable Care Act and connect with licensed agents for free, no-obligation guidance.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to={{ pathname: '/', hash: '#benefits' }}>Benefits</Link></li>
              <li><Link to={{ pathname: '/', hash: '#how-it-works' }}>How It Works</Link></li>
              <li><Link to={{ pathname: '/', hash: '#eligibility' }}>Eligibility</Link></li>
              <li><Link to={{ pathname: '/', hash: '#faq' }}>FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="contact-list">
              <li><PhoneIcon /> <span>{SITE.phone}</span></li>
              <li><MailIcon /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><PinIcon /> <span>{SITE.address}</span></li>
            </ul>
          </div>
        </div>

        <p className="disclaimer">
          <strong>Disclaimer:</strong> {SITE.name} is a private, independent marketing website and is not affiliated with, endorsed by, or sponsored by the U.S. federal or any state government, the Health Insurance Marketplace, the Centers for Medicare &amp; Medicaid Services (CMS), or the Department of Health and Human Services (HHS). This is not the Health Insurance Marketplace website (HealthCare.gov). Calling the number on this site will connect you with a licensed insurance agent/producer who can provide information about health insurance options, including Affordable Care Act Marketplace plans. Coverage, pricing, and availability vary by state, plan, and eligibility, and are not guaranteed. Not all applicants will qualify for $0 premium plans or subsidies.
        </p>

        <div className="footer-bottom">
          <span>&copy; {2026} {SITE.name}. All rights reserved.</span>
          <span className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/partners">Partners</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
