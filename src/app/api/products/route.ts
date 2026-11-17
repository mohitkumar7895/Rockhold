export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { productSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const admin = searchParams.get('admin'); // If admin=true, show unpublished too

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (admin !== 'true') {
      sql += ' AND p.is_published = 1';
    }

    if (category) {
      if (!isNaN(Number(category))) {
        sql += ' AND p.category_id = ?';
        params.push(Number(category));
      } else {
        sql += ' AND c.slug = ?';
        params.push(category);
      }
    }

    if (featured === 'true') {
      sql += ' AND p.is_featured = 1';
    }

    if (search && search.trim() !== '') {
      sql += ' AND (p.name LIKE ? OR p.short_description LIKE ? OR p.description LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY p.display_order ASC, p.id ASC';

    const products = await query<any[]>(sql, params);

    // Also fetch secondary images and benefits for products if needed
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: any) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products: ' + error.message },
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
    const validated = productSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;
    const finalSlug = slugify(data.slug || data.name);

    // Check slug uniqueness
    const existing = await query<any[]>('SELECT id FROM products WHERE slug = ?', [finalSlug]);
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 400 }
      );
    }

    const productId = await withTransaction(async (conn) => {
      const [insertResult]: any = await conn.execute(
        `INSERT INTO products (
          category_id, name, slug, tagline, short_description, description,
          packaging_details, coverage, open_time, adjustment_time, pot_life,
          tensile_strength, compressive_strength, bond_strength, mixing_ratio,
          tack_free_time, traffic_time, colors, featured_image, datasheet_url,
          is_featured, is_published, display_order, seo_title, seo_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.category_id,
          data.name,
          finalSlug,
          data.tagline || null,
          data.short_description || null,
          data.description,
          data.packaging_details || null,
          data.coverage || null,
          data.open_time || null,
          data.adjustment_time || null,
          data.pot_life || null,
          data.tensile_strength || null,
          data.compressive_strength || null,
          data.bond_strength || null,
          data.mixing_ratio || null,
          data.tack_free_time || null,
          data.traffic_time || null,
          data.colors || null,
          data.featured_image || null,
          data.datasheet_url || null,
          data.is_featured ? 1 : 0,
          data.is_published ? 1 : 0,
          data.display_order || 0,
          data.seo_title || null,
          data.seo_description || null,
        ]
      );

      const pId = insertResult.insertId;

      // Insert benefits
      if (data.benefits && data.benefits.length > 0) {
        for (let i = 0; i < data.benefits.length; i++) {
          const b = data.benefits[i].trim();
          if (b) {
            await conn.execute(
              'INSERT INTO product_benefits (product_id, benefit, display_order) VALUES (?, ?, ?)',
              [pId, b, i + 1]
            );
          }
        }
      }

      // Insert applications
      if (data.applications && data.applications.length > 0) {
        for (let i = 0; i < data.applications.length; i++) {
          const a = data.applications[i].trim();
          if (a) {
            await conn.execute(
              'INSERT INTO product_applications (product_id, application, display_order) VALUES (?, ?, ?)',
              [pId, a, i + 1]
            );
          }
        }
      }

      // Insert specifications
      if (data.specifications && data.specifications.length > 0) {
        for (let i = 0; i < data.specifications.length; i++) {
          const s = data.specifications[i];
          if (s.key && s.value) {
            await conn.execute(
              'INSERT INTO product_specifications (product_id, spec_key, spec_value, display_order) VALUES (?, ?, ?, ?)',
              [pId, s.key.trim(), s.value.trim(), i + 1]
            );
          }
        }
      }

      // Insert primary & extra images
      if (data.featured_image) {
        await conn.execute(
          'INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary) VALUES (?, ?, ?, 1, 1)',
          [pId, data.featured_image, data.name]
        );
      }

      if (data.images && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
          const img = data.images[i].trim();
          if (img && img !== data.featured_image) {
            await conn.execute(
              'INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary) VALUES (?, ?, ?, ?, 0)',
              [pId, img, `${data.name} image ${i + 2}`, i + 2]
            );
          }
        }
      }

      return pId;
    });

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      productId,
    });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product: ' + error.message },
      { status: 500 }
    );
  }
}
