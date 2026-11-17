import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionAdmin();
    if (!session || session.role !== 'superadmin') {
      return NextResponse.json({ error: 'Superadmin privileges required' }, { status: 403 });
    }

    const id = Number(params.id);

    if (id === 1) {
      return NextResponse.json({ error: 'Cannot delete primary root administrator' }, { status: 400 });
    }

    if (id === session.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    await query('DELETE FROM admins WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Admin user deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
