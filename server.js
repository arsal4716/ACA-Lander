import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { createDb } from './server/db.js'
import { checkCredentials, clearSession, isAuthed, issueSession, requireAuth } from './server/auth.js'
import { parseLead, toCsv } from './server/leads.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Hostinger may start the app from a different folder than the one that holds server.js, so look in both.
const DIST = [path.join(__dirname, 'dist'), path.join(process.cwd(), 'dist')].find((d) => fs.existsSync(path.join(d, 'index.html'))) || path.join(__dirname, 'dist')
const SOURCE = process.env.SITE_SOURCE || 'website'

// Optional local .env file (Hostinger passes real environment variables, so this is only for development).
const envFile = path.join(__dirname, '.env')
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

// The site must stay up even if the database is unreachable, so connect lazily and retry on the next request.
let realDb = null
let dbErrorCode = null
async function getDb() {
  if (realDb) return realDb
  try {
    realDb = await createDb()
    dbErrorCode = null
    return realDb
  } catch (err) {
    dbErrorCode = err.code || err.name || 'ERROR'
    console.error('Database connection failed:', err.message)
    throw err
  }
}
const db = {
  insertLead: async (...a) => (await getDb()).insertLead(...a),
  listLeads: async (...a) => (await getDb()).listLeads(...a),
  exportLeads: async (...a) => (await getDb()).exportLeads(...a),
  deleteLead: async (...a) => (await getDb()).deleteLead(...a),
  get kind() { return realDb ? realDb.kind : 'not connected' },
}
// Warm up the connection in the background. No top level await here: Hostinger loads this file with require().
getDb().catch(() => {})
const app = express()
app.set('trust proxy', 1)
app.disable('x-powered-by')

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff')
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  if (req.path.startsWith('/admin') || req.path.startsWith('/api/admin')) {
    res.set('X-Robots-Tag', 'noindex, nofollow')
    res.set('Cache-Control', 'no-store')
  }
  next()
})
app.use(express.json({ limit: '30kb' }))

// ---------- Public: receive a lead ----------
const leadLimiter = rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many requests. Please try again shortly.' } })

app.post('/api/leads', leadLimiter, async (req, res) => {
  try {
    // Honeypot: bots fill the hidden "website" field. Pretend success and store nothing.
    if (req.body && req.body.website) return res.json({ ok: true })
    const { lead, error } = parseLead(req.body, req, SOURCE)
    if (error) return res.status(400).json({ error })
    const id = await db.insertLead(lead)
    res.status(201).json({ ok: true, id })
  } catch (err) {
    console.error('Lead save failed:', err)
    res.status(500).json({ error: 'Could not save your request. Please try again.' })
  }
})

// ---------- Admin portal ----------
const loginLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many login attempts. Try again later.' } })

app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {}
  if (!process.env.SESSION_SECRET || !checkCredentials(username, password)) {
    return res.status(401).json({ error: 'Invalid username or password.' })
  }
  issueSession(res, req.secure)
  res.json({ ok: true })
})
app.post('/api/admin/logout', (req, res) => { clearSession(res); res.json({ ok: true }) })
app.get('/api/admin/session', (req, res) => res.json({ authed: isAuthed(req) }))

const filters = (req) => ({
  q: String(req.query.q || '').trim().slice(0, 100),
  from: /^\d{4}-\d{2}-\d{2}$/.test(req.query.from) ? req.query.from : '',
  to: /^\d{4}-\d{2}-\d{2}$/.test(req.query.to) ? req.query.to : '',
})

app.get('/api/admin/leads', requireAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1)
    const pageSize = [10, 25, 50, 100].includes(Number(req.query.pageSize)) ? Number(req.query.pageSize) : 25
    const { total, rows } = await db.listLeads({ ...filters(req), page, pageSize })
    res.json({ total, page, pageSize, pages: Math.max(1, Math.ceil(total / pageSize)), rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not load leads.' })
  }
})

app.get('/api/admin/leads.csv', requireAuth, async (req, res) => {
  try {
    const rows = await db.exportLeads(filters(req))
    res.set('Content-Type', 'text/csv; charset=utf-8')
    res.set('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`)
    res.send('﻿' + toCsv(rows))
  } catch (err) {
    console.error(err)
    res.status(500).send('Export failed')
  }
})

app.delete('/api/admin/leads/:id', requireAuth, async (req, res) => {
  const n = await db.deleteLead(Number(req.params.id))
  res.status(n ? 200 : 404).json({ ok: Boolean(n) })
})

const adminHtml = fs.readFileSync(path.join(__dirname, 'server', 'admin.html'), 'utf8')
app.get('/admin', (req, res) => {
  res.type('html').send(adminHtml.replaceAll('{{SITE_NAME}}', String(process.env.SITE_NAME || 'Leads').replace(/[<>&"]/g, '')))
})
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }))

// ---------- Website (built React app) ----------
app.get('/healthz', (req, res) => {
  const assets = fs.existsSync(path.join(DIST, 'assets')) ? fs.readdirSync(path.join(DIST, 'assets')).filter((f) => f.endsWith('.js')) : []
  res.json({ ok: true, node: process.version, database: db.kind, dbError: dbErrorCode, dist: DIST, hasIndex: fs.existsSync(path.join(DIST, 'index.html')), jsAssets: assets, cwd: process.cwd() })
})
app.use(express.static(DIST, { index: false, maxAge: '1h' }))
// Files that do not exist should be a real 404, never index.html (that causes confusing MIME type errors).
app.use((req, res, next) => (path.extname(req.path) ? res.status(404).type('text/plain').send('Not found') : next()))
// Any other URL gets index.html so reloading /contact-form works.
app.get(/.*/, (req, res) => {
  const index = path.join(DIST, 'index.html')
  if (!fs.existsSync(index)) return res.status(503).send('Site is not built yet. Run: npm run build')
  res.set('Cache-Control', 'no-cache')
  res.sendFile(index)
})

const port = Number(process.env.PORT || 3000)
app.listen(port, () => console.log(`Server running on port ${port} (database: ${db.kind}, site files: ${DIST}, index.html: ${fs.existsSync(path.join(DIST, 'index.html'))})`))
