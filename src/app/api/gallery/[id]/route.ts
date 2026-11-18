import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = Number(params.id);
    const body = await request.json();
    const { title, description, category, image_url, display_order, is_active } = body;

    const validCategories = ['products', 'packaging', 'applications', 'projects'];
    const finalCategory = validCategories.includes(category) ? category : 'products';

    await query(
      `UPDATE gallery SET
        title = ?, description = ?, category = ?, image_url = ?,
        display_order = ?, is_active = ?
       WHERE id = ?`,
      [
        title,
        description || null,
        finalCategory,
        image_url,
        display_order || 0,
        is_active === false ? 0 : 1,
        id,
      ]
    );

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/gallery');
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: 'Gallery item updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = Number(params.id);
    await query('DELETE FROM gallery WHERE id = ?', [id]);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/gallery');
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
