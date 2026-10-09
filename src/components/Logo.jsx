export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 3 7 11.500V30c0 15.500 10.500 26.500 25 31 14.500-4.500 25-15.500 25-31V11.500z" fill="#0b2e57" />
        <path d="M32 9 13 15.500V30c0 12 8 21 19 25 11-4 19-13 19-25V15.500z" fill="#fff" />
        <path d="M32 9v46C21 51 13 42 13 30V15.500z" fill="#e6f2e1" />
        <rect x="19" y="32" width="5" height="10" rx="1" fill="#1b7a9a" />
        <rect x="27" y="26" width="5" height="16" rx="1" fill="#4ca13a" />
        <rect x="35" y="20" width="5" height="22" rx="1" fill="#0b2e57" />
        <path d="M10 44c12 8 28 6 44-8" fill="none" stroke="#4ca13a" strokeWidth="3.500" strokeLinecap="round" />
      </svg>
      <span className="logo-text">
        <span className="logo-name">Your ACA</span>
        <span className="logo-sub">PLANS</span>
      </span>
    </span>
  )
}
