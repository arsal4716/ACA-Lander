import mysql from 'mysql2/promise'

const COLUMNS = [
  'first_name', 'last_name', 'age', 'zip', 'phone', 'email', 'user_ip', 'server_ip',
  'leadid_token', 'trustedform_url', 'consent_text', 'page_url', 'user_agent', 'source', 'payload',
]

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS leads (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  age SMALLINT UNSIGNED NULL,
  zip CHAR(5) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NULL,
  user_ip VARCHAR(64) NULL,
  server_ip VARCHAR(64) NULL,
  leadid_token VARCHAR(255) NULL,
  trustedform_url VARCHAR(512) NULL,
  consent_text TEXT NULL,
  page_url VARCHAR(512) NULL,
  user_agent VARCHAR(512) NULL,
  source VARCHAR(100) NULL,
  payload MEDIUMTEXT NULL,
  INDEX idx_created (created_at),
  INDEX idx_phone (phone),
  INDEX idx_zip (zip)
) CHARACTER SET utf8mb4`

const SEARCH_COLS = ['first_name', 'last_name', 'phone', 'email', 'zip', 'user_ip', 'leadid_token']

function buildWhere({ q, from, to }) {
  const where = []
  const params = []
  if (q) {
    where.push('(' + SEARCH_COLS.map((c) => `${c} LIKE ?`).join(' OR ') + " OR CONCAT(first_name, ' ', last_name) LIKE ?)")
    const like = `%${q}%`
    params.push(...SEARCH_COLS.map(() => like), like)
  }
  if (from) { where.push('created_at >= ?'); params.push(`${from} 00:00:00`) }
  if (to) { where.push('created_at <= ?'); params.push(`${to} 23:59:59`) }
  return { sql: where.length ? 'WHERE ' + where.join(' AND ') : '', params }
}

async function createMysql() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
  })
  await pool.query(CREATE_TABLE)
  return {
    async insertLead(lead) {
      const [res] = await pool.execute(
        `INSERT INTO leads (${COLUMNS.join(', ')}) VALUES (${COLUMNS.map(() => '?').join(', ')})`,
        COLUMNS.map((c) => lead[c] ?? null),
      )
      return res.insertId
    },
    async listLeads({ q, from, to, page, pageSize }) {
      const { sql, params } = buildWhere({ q, from, to })
      const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM leads ${sql}`, params)
      const limit = Number(pageSize)
      const offset = (Number(page) - 1) * limit
      const [rows] = await pool.query(`SELECT * FROM leads ${sql} ORDER BY id DESC LIMIT ? OFFSET ?`, [...params, limit, offset])
      return { total, rows }
    },
    async exportLeads({ q, from, to }) {
      const { sql, params } = buildWhere({ q, from, to })
      const [rows] = await pool.query(`SELECT * FROM leads ${sql} ORDER BY id DESC LIMIT 50000`, params)
      return rows
    },
    async deleteLead(id) {
      const [res] = await pool.execute('DELETE FROM leads WHERE id = ?', [id])
      return res.affectedRows
    },
    kind: 'mysql',
  }
}


// ---------- PostgreSQL (Supabase) ----------
const PG_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  age SMALLINT NULL,
  zip CHAR(5) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NULL,
  user_ip VARCHAR(64) NULL,
  server_ip VARCHAR(64) NULL,
  leadid_token VARCHAR(255) NULL,
  trustedform_url VARCHAR(512) NULL,
  consent_text TEXT NULL,
  page_url VARCHAR(512) NULL,
  user_agent VARCHAR(512) NULL,
  source VARCHAR(100) NULL,
  payload TEXT NULL
)`

function buildPgWhere({ q, from, to }) {
  const where = []
  const params = []
  const add = (v) => { params.push(v); return `$${params.length}` }
  if (q) {
    const ph = add(`%${q}%`)
    where.push('(' + SEARCH_COLS.map((c) => `${c} ILIKE ${ph}`).join(' OR ') + ` OR (first_name || ' ' || last_name) ILIKE ${ph})`)
  }
  if (from) where.push(`created_at >= ${add(`${from} 00:00:00`)}`)
  if (to) where.push(`created_at <= ${add(`${to} 23:59:59`)}`)
  return { sql: where.length ? 'WHERE ' + where.join(' AND ') : '', params }
}

// "client" only needs query(text, params) -> { rows }. A pg Pool in production, PGlite in tests.
export async function createPostgresStore(client) {
  await client.query(PG_CREATE_TABLE)
  await client.query('CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at)')
  await client.query('CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone)')
  // Supabase exposes public tables through its REST API. Turn on row level security with no policies
  // so only this server (the table owner) can read or write leads.
  await client.query('ALTER TABLE leads ENABLE ROW LEVEL SECURITY').catch(() => {})
  return {
    async insertLead(lead) {
      const ph = COLUMNS.map((_, i) => `$${i + 1}`).join(', ')
      const res = await client.query(`INSERT INTO leads (${COLUMNS.join(', ')}) VALUES (${ph}) RETURNING id`, COLUMNS.map((c) => lead[c] ?? null))
      return res.rows[0].id
    },
    async listLeads({ q, from, to, page, pageSize }) {
      const { sql, params } = buildPgWhere({ q, from, to })
      const count = await client.query(`SELECT COUNT(*) AS total FROM leads ${sql}`, params)
      const limit = Number(pageSize)
      const offset = (Number(page) - 1) * limit
      const rows = await client.query(`SELECT * FROM leads ${sql} ORDER BY id DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`, [...params, limit, offset])
      return { total: Number(count.rows[0].total), rows: rows.rows }
    },
    async exportLeads(f) {
      const { sql, params } = buildPgWhere(f)
      return (await client.query(`SELECT * FROM leads ${sql} ORDER BY id DESC LIMIT 50000`, params)).rows
    },
    async deleteLead(id) {
      const res = await client.query('DELETE FROM leads WHERE id = $1', [id])
      return res.rowCount
    },
    kind: 'postgres',
  }
}

async function createPostgres() {
  const { default: pg } = await import('pg')
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
    max: 5,
    connectionTimeoutMillis: 10000,
  })
  return createPostgresStore(pool)
}


// ---------- MongoDB (Atlas) ----------
const escapeRegex = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function buildMongoFilter({ q, from, to }) {
  const filter = {}
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i')
    filter.$or = [
      ...SEARCH_COLS.map((c) => ({ [c]: rx })),
      { $expr: { $regexMatch: { input: { $concat: ['$first_name', ' ', '$last_name'] }, regex: escapeRegex(q), options: 'i' } } },
    ]
  }
  if (from || to) {
    filter.created_at = {}
    if (from) filter.created_at.$gte = new Date(`${from}T00:00:00.000Z`)
    if (to) filter.created_at.$lte = new Date(`${to}T23:59:59.999Z`)
  }
  return filter
}

async function createMongo() {
  const { MongoClient } = await import('mongodb')
  const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  await client.connect()
  const database = client.db(process.env.MONGODB_DB || undefined)
  const leads = database.collection('leads')
  const counters = database.collection('counters')
  await leads.createIndex({ id: 1 }, { unique: true })
  await leads.createIndex({ created_at: -1 })
  await leads.createIndex({ phone: 1 })
  const noId = { projection: { _id: 0 } }
  return {
    async insertLead(lead) {
      const counter = await counters.findOneAndUpdate({ _id: 'leads' }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: 'after' })
      const id = counter.seq ?? counter.value?.seq
      await leads.insertOne({ id, created_at: new Date(), ...lead })
      return id
    },
    async listLeads({ q, from, to, page, pageSize }) {
      const filter = buildMongoFilter({ q, from, to })
      const total = await leads.countDocuments(filter)
      const limit = Number(pageSize)
      const rows = await leads.find(filter, noId).sort({ id: -1 }).skip((Number(page) - 1) * limit).limit(limit).toArray()
      return { total, rows }
    },
    async exportLeads(f) {
      return leads.find(buildMongoFilter(f), noId).sort({ id: -1 }).limit(50000).toArray()
    },
    async deleteLead(id) {
      return (await leads.deleteOne({ id: Number(id) })).deletedCount
    },
    kind: 'mongodb',
  }
}

// In memory store for local development and tests (DB_DRIVER=memory). Data is lost on restart.
function createMemory() {
  const rows = []
  let nextId = 1
  const match = (r, { q, from, to }) => {
    if (q) {
      const hay = [...SEARCH_COLS.map((c) => r[c]), `${r.first_name} ${r.last_name}`].join('|').toLowerCase()
      if (!hay.includes(q.toLowerCase())) return false
    }
    const day = r.created_at.slice(0, 10)
    if (from && day < from) return false
    if (to && day > to) return false
    return true
  }
  return {
    async insertLead(lead) {
      const row = { id: nextId++, created_at: new Date().toISOString().replace('T', ' ').slice(0, 19), ...lead }
      rows.push(row)
      return row.id
    },
    async listLeads({ q, from, to, page, pageSize }) {
      const all = rows.filter((r) => match(r, { q, from, to })).sort((a, b) => b.id - a.id)
      const start = (Number(page) - 1) * Number(pageSize)
      return { total: all.length, rows: all.slice(start, start + Number(pageSize)) }
    },
    async exportLeads(f) { return rows.filter((r) => match(r, f)).sort((a, b) => b.id - a.id) },
    async deleteLead(id) {
      const i = rows.findIndex((r) => r.id === Number(id))
      if (i < 0) return 0
      rows.splice(i, 1)
      return 1
    },
    kind: 'memory',
  }
}

export async function createDb() {
  if (process.env.DB_DRIVER === 'memory') return createMemory()
  // MongoDB Atlas: set MONGODB_URI.
  if (process.env.MONGODB_URI) return createMongo()
  // Supabase / any PostgreSQL: set DATABASE_URL. Otherwise fall back to MySQL (DB_* variables).
  if (process.env.DATABASE_URL) return createPostgres()
  for (const k of ['DB_USER', 'DB_PASSWORD', 'DB_NAME']) {
    if (!process.env[k]) throw new Error(`Missing environment variable ${k}`)
  }
  return createMysql()
}
