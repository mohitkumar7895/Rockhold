export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { categorySchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const categories = await query<any[]>(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_published = 1
      GROUP BY c.id
      ORDER BY c.display_order ASC, c.id ASC
    `);

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    console.error('Fetch categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    const existing = await query<any[]>('SELECT id FROM categories WHERE slug = ?', [finalSlug]);
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Category slug already exists' },
        { status: 400 }
      );
    }

    const result: any = await query(
      `INSERT INTO categories (name, slug, description, image, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        finalSlug,
        data.description || null,
        data.image || null,
        data.display_order || 0,
        data.is_active ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      categoryId: result.insertId,
    });
  } catch (error: any) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Failed to create category: ' + error.message },
      { status: 500 }
    );
  }
}
