const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

const make = (children) =>
  function Icon(props) {
    return <svg {...base} {...props}>{children}</svg>
  }

export const PhoneIcon = make(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.300 1.800.6 2.800.7a2 2 0 0 1 1.700 2z" />)
export const InboxIcon = make(<><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.500 5.100 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.500-6.900A2 2 0 0 0 16.700 4H7.300a2 2 0 0 0-1.800 1.100z" /></>)
export const SendIcon = make(<><path d="m22 2-11 11" /><path d="M22 2 15 22l-4-9-9-4z" /></>)
export const LockIcon = make(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>)
export const UserShieldIcon = make(<><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 9-6.700" /><path d="M17 22c3-1 5-3 5-6v-3l-5-2-5 2v3c0 3 2 5 5 6z" /></>)
export const BanIcon = make(<><circle cx="12" cy="12" r="10" /><path d="m4.900 4.900 14.200 14.200" /></>)
export const CardIcon = make(<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>)
export const HandCoinIcon = make(<><circle cx="12" cy="7" r="4" /><path d="M2 14h4l3 2h5a2 2 0 0 0 0-4h-3" /><path d="m6 14 .1 6H4M22 17l-5 4-7-1H6" /></>)
export const DollarIcon = make(<><path d="M12 2v20" /><path d="M17 6H9.500a3.500 3.500 0 0 0 0 7h5a3.500 3.500 0 0 1 0 7H6" /></>)
export const PillIcon = make(<><path d="m10.500 20.500 10-10a4.950 4.950 0 1 0-7-7l-10 10a4.950 4.950 0 1 0 7 7z" /><path d="m8.500 8.500 7 7" /></>)
export const StethIcon = make(<><path d="M5 3v6a5 5 0 0 0 10 0V3" /><path d="M10 14v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="12" r="2" /></>)
export const ToothIcon = make(<path d="M7 3c-3 0-4 3-3.500 6 .5 3 2 4 2.500 7 .4 2.500 1 5 2.500 5 1.600 0 1.500-4 3-4s1.400 4 3 4c1.500 0 2.100-2.500 2.500-5 .5-3 2-4 2.500-7C21 6 20 3 17 3c-2 0-3 1-5 1S9 3 7 3z" />)
export const ShieldIcon = make(<><path d="M12 22c6-2 8-6 8-11V5l-8-3-8 3v6c0 5 2 9 8 11z" /><path d="m9 12 2 2 4-4" /></>)
export const MapIcon = make(<><path d="M3 6.500 9 4l6 2.500L21 4v13.500L15 20l-6-2.500L3 20z" /><path d="M9 4v13.500M15 6.500V20" /></>)
export const CheckCircleIcon = make(<><circle cx="12" cy="12" r="10" /><path d="m8 12 3 3 5-6" /></>)
export const ChevronDownIcon = make(<path d="m6 9 6 6 6-6" />)
export const ArrowLeftIcon = make(<><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>)
export const MenuIcon = make(<><path d="M4 6h16M4 12h16M4 18h16" /></>)
export const CloseIcon = make(<><path d="M6 6l12 12M18 6 6 18" /></>)
export const MailIcon = make(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></>)
export const PinIcon = make(<><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>)
export const HeadsetIcon = make(<><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><path d="M21 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z" /><path d="M18 17v1a3 3 0 0 1-3 3h-2" /></>)
export const DownloadIcon = make(<><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" /></>)
export const BoltIcon = make(<path d="M13 2 4 14h7l-1 8 9-12h-7z" />)
export const GlobeIcon = make(<><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></>)
export const HeartIcon = make(<path d="M20.800 4.600a5.500 5.500 0 0 0-7.800 0L12 5.700l-1-1.100a5.500 5.500 0 0 0-7.800 7.800l1 1L12 21l7.800-7.600 1-1a5.500 5.500 0 0 0 0-7.800z" />)
