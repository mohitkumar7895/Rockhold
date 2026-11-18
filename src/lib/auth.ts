import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { verifyToken, JwtPayload } from './jwt';
import { query } from './db';

const COOKIE_NAME = 'rockhold_admin_token';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getSessionAdmin(): Promise<JwtPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    const admins = await query<any[]>('SELECT id, email, name, role FROM admins WHERE id = ?', [payload.id]);
    const admin = admins && admins[0];
    if (admin) {
      return {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      };
    }
  } catch (err) {
    // If DB check is temporarily offline or slow, fallback to verified JWT payload
    console.warn('DB check in getSessionAdmin failed, using verified JWT token payload:', err);
  }

  return {
    id: payload.id,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}

export { COOKIE_NAME };
