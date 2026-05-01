import { loadEnvConfig } from '@next/env';
import { Pool } from 'pg';

loadEnvConfig(process.cwd());

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        ssl: {
          rejectUnauthorized: false,
        },
      }
);

export default pool;
