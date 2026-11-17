export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const all = searchParams.get('all'); // admin preview

    let sql = 'SELECT * FROM gallery WHERE 1=1';
    const params: any[] = [];

    if (all !== 'true') {
      sql += ' AND is_active = 1';
    }

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY display_order ASC, id DESC';

    const items = await query<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, image_url, display_order, is_active } = body;

    if (!title || !image_url) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    const validCategories = ['products', 'packaging', 'applications', 'projects'];
    const finalCategory = validCategories.includes(category) ? category : 'products';

    const result: any = await query(
      `INSERT INTO gallery (title, description, category, image_url, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || null,
        finalCategory,
        image_url,
        display_order || 0,
        is_active === false ? 0 : 1,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Gallery item added successfully',
      itemId: result.insertId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
