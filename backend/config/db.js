require('dotenv').config();
const { Pool } = require('pg');

// Neon (and most cloud Postgres hosts) require SSL.
// A single connection-string env var keeps local dev and Render deployment identical.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
