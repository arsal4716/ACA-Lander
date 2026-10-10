import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE, FAQS } from '../data/site'
import Reveal from '../components/Reveal'
import {
  PhoneIcon, InboxIcon, UserShieldIcon, GlobeIcon, LockIcon, DownloadIcon, BoltIcon, HeadsetIcon,
  HandCoinIcon, PillIcon, StethIcon, ToothIcon, ShieldIcon, MapIcon, CheckCircleIcon, ChevronDownIcon,
  BanIcon, HeartIcon,
} from '../components/Icons'

const TRUST = [
  [UserShieldIcon, 'Licensed Health Insurance Agents'],
  [HandCoinIcon, 'No Cost to Call or Apply'],
  [BanIcon, 'Coverage Regardless of Pre-Existing Conditions*'],
  [HeartIcon, 'Personalized Plan Matching'],
]

const BENEFITS = [
  [HandCoinIcon, 'Low or $0 Monthly Premiums', 'Many applicants qualify for tax credits and subsidies that significantly reduce — or eliminate — monthly premium costs.'],
  [PillIcon, 'Prescription Drug Coverage', 'Marketplace plans include coverage for prescription medications as one of the ten essential health benefits.'],
  [StethIcon, 'Preventive & Routine Care', 'Annual checkups, screenings, vaccines, and wellness visits are covered at no additional cost on most plans.'],
  [ToothIcon, 'Dental & Vision Add-Ons', 'Bundle optional dental and vision coverage alongside your medical plan for more complete protection.'],
  [ShieldIcon, 'No Denial for Pre-Existing Conditions', 'Under the ACA, marketplace insurers cannot deny coverage or charge more because of a pre-existing condition.'],
  [MapIcon, 'Nationwide Provider Networks', 'Choose from a range of plans with access to large networks of doctors, specialists, and hospitals.'],
]

const STEPS = [
  ['Call & Check Eligibility', 'Speak with a licensed agent who will ask a few quick questions about your household to see what you qualify for.'],
  ['Compare Your Options', 'Review available ACA Marketplace plans side-by-side, including estimated subsidies and monthly costs.'],
  ['Enroll & Get Covered', "Choose the plan that fits your needs and budget. Your agent handles the paperwork so you don't have to."],
]

const QUALIFY = [
  ['Income-Based Subsidies', 'Households within certain income ranges may qualify for premium tax credits.'],
  ['Recent Life Changes', 'Marriage, a new baby, job loss, or moving can qualify you for a Special Enrollment Period.'],
  ['Self-employed & Gig Workers', 'No employer coverage? Marketplace plans are built for individuals and families.'],
  ['Currently Uninsured or Underinsured', "If your current plan costs too much or covers too little, it's worth a free comparison."],
]

function FaqItem({ q, a, open, onToggle, index }) {
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button type="button" className="faq-q" aria-expanded={open} aria-controls={`faq-a-${index}`} id={`faq-q-${index}`} onClick={onToggle}>
        <span>{q}</span>
        <ChevronDownIcon className="faq-chevron" />
      </button>
      {open && (
        <div className="faq-a" id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`}>
          {index === FAQS.length - 1 ? (
            <p>Yes. Your information is handled securely and confidentially in accordance with our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
          ) : (
            <p>{a}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(FAQS.length - 1)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Affordable Care Act Marketplace</span>
            <h1>Get Covered. Get <span className="accent-teal">Peace of Mind.</span> Get the <span className="accent-green">Care You Deserve.</span></h1>
            <p className="lead">Millions of Americans qualify for $0 low monthly premium health plans through the ACA Marketplace. Answer a few quick questions and a licensed agent will help you find a plan that fits your budget at no cost to you.</p>
            <div className="hero-cta">
              <Link to="/contact-form" className="btn btn-orange btn-lg" id="hero-quote-btn"><InboxIcon /> Get a Quote Now</Link>
              <span className="hero-note"><CheckCircleIcon /> Free · No obligation</span>
            </div>
            <ul className="hero-badges">
              <li><UserShieldIcon /> Licensed Agents</li>
              <li><GlobeIcon /> English Support</li>
              <li><LockIcon /> Secure &amp; Confidential</li>
            </ul>
          </div>
          <div className="hero-media">
            <div className="float-card float-top">
              <span className="float-icon green"><DownloadIcon /></span>
              <span><strong>Subsidies Available</strong><small>Based on household income</small></span>
            </div>
            <img src="/images/hero.webp" alt="A family relaxing together on a sofa at home" className="hero-img" width="1376" height="768" />
            <div className="float-card float-bottom">
              <span className="float-icon orange"><BoltIcon /></span>
              <span><strong>Enroll in Minutes</strong><small>Fast, guided process</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Highlights">
        <div className="container">
          <ul>
            {TRUST.map(([Icon, text]) => (
              <li key={text}><Icon className="trust-icon" /> {text}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="benefits">
        <div className="container">
          <div className="section-head center">
            <span className="pill">Why the ACA Marketplace</span>
            <h2>Health Coverage Built Around You</h2>
            <p>ACA Marketplace plans are designed to make quality healthcare accessible and affordable, no matter your situation.</p>
          </div>
          <div className="benefit-grid">
            {BENEFITS.map(([Icon, title, text], i) => (
              <Reveal as="article" className="benefit-card" key={title} delay={(i % 3) * 120}>
                <span className="benefit-icon"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="how-it-works">
        <div className="container steps-grid">
          <Reveal className="steps-copy" from="left">
            <span className="pill">Simple Process</span>
            <h2>Get Covered in 3 Easy Steps</h2>
            <ol className="steps">
              {STEPS.map(([title, text], i) => (
                <Reveal as="li" key={title} from="left" delay={250 + i * 220}>
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Reveal>
          <Reveal className="steps-media" from="right" delay={150}>
            <img src="/images/agent.webp" alt="A licensed agent speaking with a customer on a headset" className="agent-img" width="1200" height="896" />
            <div className="float-card float-agent">
              <span className="float-icon plain"><HeadsetIcon /></span>
              <span><strong>Talk to a Real Person</strong><small>Licensed and ready to help</small></span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="eligibility">
        <div className="container qualify-grid">
          <div>
            <span className="pill">Who Qualifies</span>
            <h2>You May Qualify More Than You Think</h2>
            <p className="section-sub">Eligibility for ACA Marketplace plans and subsidies depends on household size, income, and life circumstances many people are surprised by what they qualify for.</p>
            <ul className="qualify-list">
              {QUALIFY.map(([title, text]) => (
                <li key={title}>
                  <CheckCircleIcon className="qualify-check" />
                  <div><strong>{title}</strong><span>{text}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="call-card">
            <h3>Find Out in Under 5 Minutes</h3>
            <p>Submit a request and a licensed agent will walk you through your options no paperwork, no pressure, no cost.</p>
            <Link to="/contact-form" className="btn btn-orange btn-block" id="qualify-quote-btn"><InboxIcon /> Get My Free Quote</Link>
          </aside>
        </div>
      </section>

      <section className="section section-tint" id="faq">
        <div className="container">
          <div className="section-head center">
            <span className="pill">Frequently Asked Questions</span>
            <h2>Common Questions About ACA Coverage</h2>
          </div>
          <div className="faq-list">
            {FAQS.map(([q, a], i) => (
              <FaqItem key={q} q={q} a={a} index={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container center">
          <span className="pill pill-dark">Don't Wait</span>
          <h2>Your Next Step Toward Better Coverage Starts With One Call</h2>
          <p>Licensed agents are standing by to help you understand your options and find a plan that works for your budget — free and without obligation.</p>
          <span className="big-phone" id="cta-phone">{SITE.phone}</span>
          <div className="final-btns">
            <a href={SITE.phoneHref} className="btn btn-orange" id="cta-call-btn"><PhoneIcon /> Call Now</a>
            <Link to="/contact-form" className="btn btn-outline" id="cta-eligibility-btn">Check Eligibility</Link>
          </div>
        </div>
      </section>
    </>
  )
}
