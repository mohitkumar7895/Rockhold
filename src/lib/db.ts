import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'rockhold',
      waitForConnections: true,
      connectionLimit: 15,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

/**
 * Execute a parameterized query
 */
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const p = getDbPool();
  try {
    const [results] = await p.execute(sql, params || []);
    return results as T;
  } catch (error: any) {
    console.error('Database query error:', {
      sql,
      params,
      message: error.message,
    });
    throw error;
  }
}

/**
 * Execute raw query (for queries with IN clauses or non-prepared dynamic clauses)
 */
export async function rawQuery<T = any>(sql: string, params?: any[]): Promise<T> {
  const p = getDbPool();
  try {
    const [results] = await p.query(sql, params || []);
    return results as T;
  } catch (error: any) {
    console.error('Database rawQuery error:', {
      sql,
      params,
      message: error.message,
    });
    throw error;
  }
}

/**
 * Execute within a transaction
 */
export async function withTransaction<T>(
  callback: (conn: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const p = getDbPool();
  const conn = await p.getConnection();
  await conn.beginTransaction();
  try {
    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  getDbPool,
  query,
  rawQuery,
  withTransaction,
};
