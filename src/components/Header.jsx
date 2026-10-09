import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../data/site'
import { ArrowLeftIcon, InboxIcon, MenuIcon, CloseIcon } from './Icons'

const NAV = [
  ['Benefits', 'benefits'],
  ['How It Works', 'how-it-works'],
  ['Eligibility', 'eligibility'],
  ['FAQ', 'faq'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onQuote = pathname === '/quote'

  return (
    <>
      <div className="topbar">
        Open Enrollment updates are happening now <span className="topbar-hl">get your free quote</span> before your window closes.
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label={`${SITE.name} home`} onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          {!onQuote && (
            <nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
              {NAV.map(([label, id]) => (
                <Link key={id} to={{ pathname: '/', hash: `#${id}` }} className="nav-link" onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ))}
            </nav>
          )}

          <div className="header-actions">
            <div className="header-help">
              <span className="header-help-top">Free, no obligation help</span>
              <Link to="/quote" className="header-help-link">Get a Quote Now</Link>
            </div>
            {onQuote ? (
              <Link to="/" className="btn btn-orange btn-sm" id="back-home-btn">
                <ArrowLeftIcon /> Back to Home
              </Link>
            ) : (
              <a href={SITE.phoneHref} className="btn btn-orange btn-sm" id="contact-us-btn">
                <InboxIcon /> Contact Us
              </a>
            )}
            {!onQuote && (
              <button type="button" className="menu-toggle" aria-label="Toggle menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
                {open ? <CloseIcon /> : <MenuIcon />}
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
