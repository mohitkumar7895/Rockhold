const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setup() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(process.env.DB_PORT || '3306');
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'rockhold';

  console.log(`Connecting to MySQL at ${host}:${port} as ${user}...`);

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  });

  console.log(`Ensuring database ${database} exists...`);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await connection.query(`USE \`${database}\`;`);

  console.log('Applying database/schema.sql...');
  const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf-8');
  await connection.query(schemaSql);
  console.log('Schema applied successfully.');

  console.log('Applying database/seed.sql...');
  const seedSql = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf-8');
  await connection.query(seedSql);
  console.log('Seed applied successfully.');

  // Verify counts
  const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
  const [categories] = await connection.query('SELECT COUNT(*) as count FROM categories');
  const [admins] = await connection.query('SELECT COUNT(*) as count FROM admins');
  const [gallery] = await connection.query('SELECT COUNT(*) as count FROM gallery');
  const [settings] = await connection.query('SELECT COUNT(*) as count FROM website_settings');

  console.log('Database Status:');
  console.log('- Admins:', admins[0].count);
  console.log('- Categories:', categories[0].count);
  console.log('- Products:', products[0].count);
  console.log('- Gallery items:', gallery[0].count);
  console.log('- Website settings:', settings[0].count);

  await connection.end();
  console.log('Database setup complete!');
}

setup().catch((err) => {
  console.error('Database setup failed:', err);
  process.exit(1);
});
