import { loadEnvConfig } from '@next/env';
import pool from './db';
import fs from 'fs';
import path from 'path';

loadEnvConfig(process.cwd());

export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');

    // Read and execute schema
    const schemaPath = path.join(process.cwd(), 'src', 'lib', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    const client = await pool.connect();
    
    try {
      await client.query(schema);
      console.log('✅ Database schema created successfully!');
      
      // Test the connection
      const result = await client.query('SELECT NOW()');
      console.log('✅ Database connection test successful:', result.rows[0].now);
      
      return { success: true };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error };
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then((result) => {
      if (result.success) {
        console.log('Database initialization completed successfully!');
        process.exit(0);
      } else {
        console.error('Database initialization failed!');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}
