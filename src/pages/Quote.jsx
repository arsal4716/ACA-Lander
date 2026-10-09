import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { LockIcon, SendIcon, CheckCircleIcon } from '../components/Icons'

const FIELDS = [
  { name: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
  { name: 'age', label: 'Age', type: 'text', inputMode: 'numeric', autoComplete: 'off', maxLength: 3 },
  { name: 'zip', label: 'ZIP Code', type: 'text', inputMode: 'numeric', autoComplete: 'postal-code', maxLength: 5 },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel', maxLength: 14 },
  { name: 'email', label: 'Email Address', type: 'email', autoComplete: 'email' },
]

const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.name, '']))

const formatPhone = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

function validate(v) {
  const e = {}
  if (!v.firstName.trim()) e.firstName = 'Please enter your first name.'
  if (!v.lastName.trim()) e.lastName = 'Please enter your last name.'
  const age = Number(v.age)
  if (!/^\d{1,3}$/.test(v.age) || age < 18 || age > 99) e.age = 'Enter an age between 18 and 99.'
  if (!/^\d{5}$/.test(v.zip)) e.zip = 'Enter a 5 digit ZIP code.'
  if (v.phone.replace(/\D/g, '').length !== 10) e.phone = 'Enter a 10 digit phone number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.'
  return e
}

export default function Quote() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | failed

  const onChange = (e) => {
    const { name, value } = e.target
    let next = value
    if (name === 'phone') next = formatPhone(value)
    if (name === 'age' || name === 'zip') next = value.replace(/\D/g, '')
    setValues((p) => ({ ...p, [name]: next }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    setStatus('sending')
    try {
      if (SITE.formEndpoint) {
        const res = await fetch(SITE.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, source: SITE.domain, submittedAt: new Date().toISOString() }),
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      }
      setStatus('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return (
      <section className="quote-page">
        <div className="container quote-wrap">
          <div className="thank-you" id="thank-you" role="status" aria-live="polite">
            <span className="thank-icon"><CheckCircleIcon /></span>
            <h1>Thank You, {values.firstName.trim()}!</h1>
            <p>We received your request. A licensed agent will reach out shortly to help you find the ACA Marketplace plan that fits your budget and needs.</p>
            <div className="thank-actions">
              <Link to="/" className="btn btn-orange">Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="quote-page">
      <div className="container quote-split">
        <div className="quote-intro">
          <span className="pill">Get Started</span>
          <h1 className="quote-title">Get Your Free, No-Obligation Quote</h1>
          <p className="quote-sub">Fill out the short form and a licensed agent will reach out to help you find the ACA Marketplace plan that fits your budget and needs.</p>
          <ul className="quote-badges">
            <li><LockIcon /> Secure &amp; Confidential</li>
          </ul>
        </div>

        <form id="quote-form" name="quoteForm" className="quote-form" onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            {FIELDS.map((f) => (
              <div className={`form-group form-group-${f.name}`} key={f.name}>
                <label htmlFor={f.name} className="form-label">{f.label}</label>
                <input
                  id={f.name}
                  name={f.name}
                  className={`form-input input-${f.name} ${errors[f.name] ? 'has-error' : ''}`}
                  type={f.type}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  maxLength={f.maxLength}
                  value={values[f.name]}
                  onChange={onChange}
                  aria-invalid={Boolean(errors[f.name])}
                  aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                />
                {errors[f.name] && <span className="form-error" id={`${f.name}-error`}>{errors[f.name]}</span>}
              </div>
            ))}
          </div>

          <button type="submit" id="submit-btn" name="submit" className="btn btn-orange btn-block btn-lg submit-btn" disabled={status === 'sending'}>
            <SendIcon /> {status === 'sending' ? 'Sending...' : 'Get My Free Quote'}
          </button>
          {status === 'failed' && <p className="form-error form-error-banner" role="alert">Something went wrong. Please try again or call {SITE.phone}.</p>}

          <p className="consent">
            By clicking <strong>&ldquo;Get My Free Quote&rdquo;</strong>, you agree to be contacted by {SITE.name} and its licensed agent <Link to="/partners">partners</Link> at the phone number and email you provided — including by autodialer, prerecorded or artificial voice, text message, and email — regarding health insurance options, even if your number is on a Do Not Call list. Consent is not a condition of purchase; message and data rates may apply. You also agree to our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms">Terms &amp; Conditions</Link>.
          </p>
          <p className="consent consent-small">
            This is a solicitation for insurance. {SITE.name} is a private entity and is not affiliated with, endorsed by, or connected to the federal or any state government, the Health Insurance Marketplace, HealthCare.gov, or the Centers for Medicare &amp; Medicaid Services (CMS). A licensed agent may contact you regarding health insurance options. Submitting this request is not a guarantee of coverage or eligibility.
          </p>
        </form>
      </div>
    </section>
  )
}
