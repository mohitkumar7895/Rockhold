export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin, hashPassword } from '@/lib/auth';
import { createAdminSchema } from '@/lib/validations';

export async function GET() {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admins = await query<any[]>(
      'SELECT id, name, email, role, created_at FROM admins ORDER BY id ASC'
    );

    return NextResponse.json({ success: true, admins });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionAdmin();
    if (!session || session.role !== 'superadmin') {
      return NextResponse.json({ error: 'Superadmin privileges required' }, { status: 403 });
    }

    const body = await request.json();
    const validated = createAdminSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password, role } = validated.data;

    const existing = await query<any[]>('SELECT id FROM admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Admin email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const result: any = await query(
      'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'admin']
    );

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      adminId: result.insertId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
