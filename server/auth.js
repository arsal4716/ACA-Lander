import crypto from 'node:crypto'

const COOKIE = 'lead_admin'
const MAX_AGE_MS = 8 * 60 * 60 * 1000

const sign = (value, secret) => crypto.createHmac('sha256', secret).update(value).digest('base64url')

const safeEqual = (a, b) => {
  const ha = crypto.createHash('sha256').update(String(a)).digest()
  const hb = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function checkCredentials(user, password) {
  const u = process.env.ADMIN_USER
  const p = process.env.ADMIN_PASSWORD
  if (!u || !p) return false
  // Evaluate both so timing does not reveal which one was wrong.
  const okUser = safeEqual(user ?? '', u)
  const okPass = safeEqual(password ?? '', p)
  return okUser && okPass
}

export function issueSession(res, secure) {
  const exp = Date.now() + MAX_AGE_MS
  const body = `${process.env.ADMIN_USER}.${exp}`
  const token = `${Buffer.from(body).toString('base64url')}.${sign(body, process.env.SESSION_SECRET)}`
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'strict', secure, maxAge: MAX_AGE_MS, path: '/' })
}

export function clearSession(res) {
  res.clearCookie(COOKIE, { path: '/' })
}

function readCookie(req) {
  const raw = req.headers.cookie || ''
  const hit = raw.split(';').map((s) => s.trim()).find((s) => s.startsWith(`${COOKIE}=`))
  return hit ? decodeURIComponent(hit.slice(COOKIE.length + 1)) : null
}

export function isAuthed(req) {
  const token = readCookie(req)
  if (!token || !process.env.SESSION_SECRET) return false
  const [b64, sig] = token.split('.')
  if (!b64 || !sig) return false
  let body
  try { body = Buffer.from(b64, 'base64url').toString() } catch { return false }
  if (!safeEqual(sig, sign(body, process.env.SESSION_SECRET))) return false
  const [user, exp] = body.split('.')
  return user === process.env.ADMIN_USER && Number(exp) > Date.now()
}

export function requireAuth(req, res, next) {
  if (isAuthed(req)) return next()
  res.status(401).json({ error: 'Unauthorized' })
}
