import { Pool } from 'pg';

// For Neon database - works both locally and in production
const pool = new Pool({
  user: process.env.DB_USER || 'neondb_owner',
  password: process.env.DB_PASSWORD || 'npg_jY1Zmgz6GOVv',
  host: process.env.DB_HOST || 'ep-quiet-waterfall-ahi9dzcn-pooler.c-3.us-east-1.aws.neon.tech',
  database: process.env.DB_NAME || 'neondb',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;