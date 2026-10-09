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
  for (const k of ['DB_USER', 'DB_PASSWORD', 'DB_NAME']) {
    if (!process.env[k]) throw new Error(`Missing environment variable ${k}`)
  }
  return createMysql()
}
