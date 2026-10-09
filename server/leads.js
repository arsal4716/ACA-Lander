const digits = (v) => String(v ?? '').replace(/\D/g, '')
const clip = (v, n) => (v == null || v === '' ? null : String(v).trim().slice(0, n))

// Validates a submission and returns { lead } or { error }.
export function parseLead(body, req, source) {
  const b = body && typeof body === 'object' ? body : {}
  const first = clip(b.firstName, 100)
  const last = clip(b.lastName, 100)
  const phone = digits(b.phone)
  const zip = digits(b.zip)
  if (!first || !last) return { error: 'Name is required.' }
  if (phone.length !== 10) return { error: 'A 10 digit phone number is required.' }
  if (!/^\d{5}$/.test(zip)) return { error: 'A 5 digit zip code is required.' }

  let age = null
  if (b.age !== undefined && b.age !== '') {
    age = Number(b.age)
    if (!Number.isInteger(age) || age < 18 || age > 99) return { error: 'Age must be between 18 and 99.' }
  }
  const email = clip(b.email, 255)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Email address is not valid.' }

  const safe = {
    firstName: first, lastName: last, age, zip, phone, email,
    user_ip: b.user_ip, leadid_token: b.leadid_token, xxTrustedFormCertUrl: b.xxTrustedFormCertUrl,
  }
  return {
    lead: {
      first_name: first,
      last_name: last,
      age,
      zip,
      phone,
      email,
      user_ip: clip(b.user_ip, 64),
      server_ip: clip(req.ip, 64),
      leadid_token: clip(b.leadid_token, 255),
      trustedform_url: clip(b.xxTrustedFormCertUrl, 512),
      consent_text: clip(b.consent_text, 8000),
      page_url: clip(b.page_url, 512),
      user_agent: clip(req.get('user-agent'), 512),
      source: clip(b.source, 100) || source,
      payload: JSON.stringify(safe),
    },
  }
}

const CSV_COLS = ['id', 'created_at', 'first_name', 'last_name', 'phone', 'email', 'age', 'zip', 'user_ip', 'server_ip', 'leadid_token', 'trustedform_url', 'page_url', 'source', 'consent_text']

export function toCsv(rows) {
  const esc = (v) => {
    let s = v == null ? '' : v instanceof Date ? v.toISOString() : String(v)
    // Stop spreadsheet apps from running cells that start with a formula character.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
    return `"${s.replace(/"/g, '""')}"`
  }
  return [CSV_COLS.join(','), ...rows.map((r) => CSV_COLS.map((c) => esc(r[c])).join(','))].join('\r\n')
}
