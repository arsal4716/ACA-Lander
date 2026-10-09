export const SITE = {
  name: 'Your ACA Plans',
  domain: 'Youracaplans.com',
  url: 'https://youracaplans.com',
  phone: '(844) 780-1683',
  phoneHref: 'tel:+18447801683',
  email: 'support@youracaplans.com',
  address: '1201 Orange Street, Suite 600, Wilmington, DE 19801',
  legalName: '[Company Legal Name]',
  state: '[State]',
  // Set VITE_FORM_ENDPOINT in .env to POST submissions to your CRM or lead router.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
}

export const FAQS = [
  ['What is the ACA Health Insurance Marketplace?', 'The Affordable Care Act (ACA) Marketplace is a system that lets individuals and families shop for and enroll in health insurance plans, with many qualifying for subsidies that lower monthly costs.'],
  ['Does it cost anything to call or get a quote?', 'No. Speaking with a licensed agent and comparing your plan options is completely free, with no obligation to enroll.'],
  ['Can I get coverage if I have a pre existing condition?', 'Yes. Under the ACA, marketplace insurers cannot deny you coverage or charge you more solely because of a pre existing condition.'],
  ['What is Open Enrollment and Special Enrollment?', 'Open Enrollment is the annual window to enroll in or change marketplace plans. Outside that window, certain life events (like losing coverage, marriage, or a new baby) may qualify you for a Special Enrollment Period.'],
  ['How do I know if I qualify for a subsidy?', 'Subsidy eligibility depends on household size and income. A licensed agent can quickly estimate what you may qualify for over the phone.'],
  ['Is my information kept private?', 'Yes. Your information is handled securely and confidentially in accordance with our Privacy Policy.'],
]

export const PARTNERS = [
  'All Access Insurance Network of Florida (AAHIN)', 'Alliance and Associates', 'Astoria Company', 'Certik Media (Ally Health)',
  'Excel Impact LLC Health Insurance', 'Health First Solutions LLC', 'Blue Horizon Benefits', 'PrimeCare Insurance Group',
  'Evergreen Health Advisors', 'Unity Health Partners', 'Freedom Benefits Network', 'Summit Insurance Advisors',
  'Elite Coverage Solutions', 'BrightPath Health Services', 'Secure Health Benefits LLC', 'Apex Health Agency',
  'Liberty Medicare Solutions', 'Pinnacle Benefit Group', 'Prosper Health Advisors', 'NextGen Insurance Partners',
  'Trusted Health Connect', 'Horizon Benefit Solutions', 'American Health Alliance', 'Guardian Benefit Services',
  'TotalCare Insurance Group', 'Preferred Health Network', 'United Coverage Advisors', 'Golden Shield Benefits',
  'Premier Health Consultants', 'Advantage Benefit Group', 'Infinity Health Solutions', 'National Health Advisors',
  'Keystone Insurance Partners', 'Health Choice Alliance', 'Reliable Benefit Services',
]
