import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, comparePassword, hashPassword } from '@/lib/auth';
import { query } from '@/lib/db';
import { changePasswordSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = changePasswordSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { current_password, new_password } = validated.data;

    const [admin] = await query<any[]>('SELECT password FROM admins WHERE id = ?', [session.id]);
    if (!admin) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await comparePassword(current_password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(new_password);
    await query('UPDATE admins SET password = ? WHERE id = ?', [newHash, session.id]);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error: any) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
