export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { blogPostSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let blog: any = null;

    if (!isNaN(Number(id))) {
      const rows = await query<any[]>('SELECT * FROM blog_posts WHERE id = ? LIMIT 1', [Number(id)]);
      blog = rows[0] || null;
    } else {
      const rows = await query<any[]>('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [id]);
      blog = rows[0] || null;
      // Increment views count for visitor read
      if (blog && blog.is_published) {
        await query('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?', [blog.id]);
      }
    }

    if (!blog) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error: any) {
    console.error('Fetch blog error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article: ' + error.message },
      { status: 500 }
    );
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

    const { id } = params;
    const blogId = Number(id);
    if (isNaN(blogId)) {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
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

    // Check slug uniqueness excluding self
    const existing = await query<any[]>(
      'SELECT id FROM blog_posts WHERE slug = ? AND id != ?',
      [finalSlug, blogId]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Another article is already using this URL slug' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE blog_posts SET
        title = ?,
        slug = ?,
        excerpt = ?,
        content = ?,
        featured_image = ?,
        category = ?,
        tags = ?,
        author = ?,
        reading_time = ?,
        is_published = ?,
        seo_title = ?,
        seo_description = ?
      WHERE id = ?`,
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
        blogId,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully',
      slug: finalSlug,
    });
  } catch (error: any) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { error: 'Failed to update article: ' + error.message },
      { status: 500 }
    );
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

    const { id } = params;
    const blogId = Number(id);
    if (isNaN(blogId)) {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    await query('DELETE FROM blog_posts WHERE id = ?', [blogId]);

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { error: 'Failed to delete article: ' + error.message },
      { status: 500 }
    );
  }
}
