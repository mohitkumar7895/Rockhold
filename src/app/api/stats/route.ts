export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSessionAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      productsCount,
      categoriesCount,
      enquiriesCount,
      pendingCount,
      blogsCount,
      recentEnquiries,
      recentProducts,
      categoryStats,
    ] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count FROM products'),
      query<any[]>('SELECT COUNT(*) as count FROM categories'),
      query<any[]>('SELECT COUNT(*) as count FROM enquiries'),
      query<any[]>("SELECT COUNT(*) as count FROM enquiries WHERE status = 'pending'"),
      query<any[]>('SELECT COUNT(*) as count FROM blog_posts'),
      query<any[]>(`
        SELECT e.id, e.name, e.email, e.phone, e.subject, e.status, e.created_at, p.name as product_name
        FROM enquiries e
        LEFT JOIN products p ON e.product_id = p.id
        ORDER BY e.created_at DESC
        LIMIT 6
      `),
      query<any[]>(`
        SELECT p.id, p.name, p.slug, p.featured_image, p.is_published, p.created_at, c.name as category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.id DESC
        LIMIT 6
      `),
      query<any[]>(`
        SELECT c.id, c.name, COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        GROUP BY c.id
        ORDER BY product_count DESC
      `),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts: productsCount[0]?.count || 0,
        totalCategories: categoriesCount[0]?.count || 0,
        totalEnquiries: enquiriesCount[0]?.count || 0,
        pendingEnquiries: pendingCount[0]?.count || 0,
        totalBlogs: blogsCount[0]?.count || 0,
        recentEnquiries,
        recentProducts,
        categoryStats,
      },
    });
  } catch (error: any) {
    console.error('Fetch stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
