import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { categorySchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = Number(params.id);
    const rows = await query<any[]>('SELECT * FROM categories WHERE id = ?', [categoryId]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categoryId = Number(params.id);
    const body = await request.json();
    const validated = categorySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;
    const finalSlug = slugify(data.slug || data.name);

    const existing = await query<any[]>(
      'SELECT id FROM categories WHERE slug = ? AND id != ?',
      [finalSlug, categoryId]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Category slug already in use' }, { status: 400 });
    }

    await query(
      `UPDATE categories SET
        name = ?, slug = ?, description = ?, image = ?,
        display_order = ?, is_active = ?
       WHERE id = ?`,
      [
        data.name,
        finalSlug,
        data.description || null,
        data.image || null,
        data.display_order || 0,
        data.is_active ? 1 : 0,
        categoryId,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
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

    const categoryId = Number(params.id);

    // Check if category has products
    const products = await query<any[]>('SELECT id FROM products WHERE category_id = ?', [categoryId]);
    if (products.length > 0) {
      return NextResponse.json(
        { error: `Cannot delete category: it has ${products.length} assigned product(s). Move or delete them first.` },
        { status: 400 }
      );
    }

    await query('DELETE FROM categories WHERE id = ?', [categoryId]);

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
