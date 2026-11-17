export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { blogPostSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const admin = searchParams.get('admin');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '12', 10)));
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM blog_posts WHERE 1=1';
    let countSql = 'SELECT COUNT(*) as total FROM blog_posts WHERE 1=1';
    const params: any[] = [];
    const countParams: any[] = [];

    // Filter by publish status unless admin
    if (admin !== 'true') {
      sql += ' AND is_published = 1';
      countSql += ' AND is_published = 1';
    }

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      countSql += ' AND category = ?';
      params.push(category);
      countParams.push(category);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      const searchClause = ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ? OR tags LIKE ?)';
      sql += searchClause;
      countSql += searchClause;
      params.push(term, term, term, term);
      countParams.push(term, term, term, term);
    }

    sql += ' ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [blogs, countResult] = await Promise.all([
      query<any[]>(sql, params),
      query<any[]>(countSql, countParams),
    ]);

    const total = countResult[0]?.total || 0;

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Fetch blogs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs: ' + error.message },
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
    const validated = blogPostSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;
    const finalSlug = slugify(data.slug || data.title);

    // Check slug uniqueness
    const existing = await query<any[]>('SELECT id FROM blog_posts WHERE slug = ?', [finalSlug]);
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'An article with this URL slug already exists' },
        { status: 400 }
      );
    }

    const result: any = await query(
      `INSERT INTO blog_posts 
      (title, slug, excerpt, content, featured_image, category, tags, author, reading_time, is_published, seo_title, seo_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        finalSlug,
        data.excerpt,
        data.content,
        data.featured_image || null,
        data.category || 'Guides',
        data.tags || null,
        data.author || 'RockHold Technical Team',
        data.reading_time || '5 min read',
        data.is_published ? 1 : 0,
        data.seo_title || null,
        data.seo_description || null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Article published successfully',
      blogId: result.insertId,
      slug: finalSlug,
    });
  } catch (error: any) {
    console.error('Create blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post: ' + error.message },
      { status: 500 }
    );
  }
}
