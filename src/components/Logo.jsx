export default function Logo({ variant = 'color', className = '' }) {
  const src = variant === 'white' ? '/images/logo-white.webp' : '/images/logo.webp'
  return <img className={`logo-img ${className}`} src={src} alt="Your ACA Plans" width="720" height={variant === 'white' ? 218 : 159} />
}
