import { NextRequest, NextResponse } from 'next/server';
import { query, withTransaction } from '@/lib/db';
import { getSessionAdmin } from '@/lib/auth';
import { productSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idOrSlug = params.id;
    const isNumeric = !isNaN(Number(idOrSlug));

    let productQuery = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE ${isNumeric ? 'p.id = ?' : 'p.slug = ?'}
      LIMIT 1
    `;

    const products = await query<any[]>(productQuery, [isNumeric ? Number(idOrSlug) : idOrSlug]);

    if (!products || products.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = products[0];

    // Fetch child tables
    const [images, specifications, benefits, applications] = await Promise.all([
      query<any[]>('SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
      query<any[]>('SELECT * FROM product_specifications WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
      query<any[]>('SELECT * FROM product_benefits WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
      query<any[]>('SELECT * FROM product_applications WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
    ]);

    product.images = images;
    product.specifications = specifications;
    product.benefits = benefits;
    product.applications = applications;

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error('Fetch product by id/slug error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product: ' + error.message },
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

    const productId = Number(params.id);
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
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

    // Check slug uniqueness excluding self
    const existing = await query<any[]>(
      'SELECT id FROM products WHERE slug = ? AND id != ?',
      [finalSlug, productId]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Another product already has this slug' },
        { status: 400 }
      );
    }

    await withTransaction(async (conn) => {
      await conn.execute(
        `UPDATE products SET
          category_id = ?, name = ?, slug = ?, tagline = ?, short_description = ?,
          description = ?, packaging_details = ?, coverage = ?, open_time = ?,
          adjustment_time = ?, pot_life = ?, tensile_strength = ?, compressive_strength = ?,
          bond_strength = ?, mixing_ratio = ?, tack_free_time = ?, traffic_time = ?,
          colors = ?, featured_image = ?, datasheet_url = ?, is_featured = ?,
          is_published = ?, display_order = ?, seo_title = ?, seo_description = ?
        WHERE id = ?`,
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
          productId,
        ]
      );

      // Re-sync benefits
      await conn.execute('DELETE FROM product_benefits WHERE product_id = ?', [productId]);
      if (data.benefits && data.benefits.length > 0) {
        for (let i = 0; i < data.benefits.length; i++) {
          const b = data.benefits[i].trim();
          if (b) {
            await conn.execute(
              'INSERT INTO product_benefits (product_id, benefit, display_order) VALUES (?, ?, ?)',
              [productId, b, i + 1]
            );
          }
        }
      }

      // Re-sync applications
      await conn.execute('DELETE FROM product_applications WHERE product_id = ?', [productId]);
      if (data.applications && data.applications.length > 0) {
        for (let i = 0; i < data.applications.length; i++) {
          const a = data.applications[i].trim();
          if (a) {
            await conn.execute(
              'INSERT INTO product_applications (product_id, application, display_order) VALUES (?, ?, ?)',
              [productId, a, i + 1]
            );
          }
        }
      }

      // Re-sync specifications
      await conn.execute('DELETE FROM product_specifications WHERE product_id = ?', [productId]);
      if (data.specifications && data.specifications.length > 0) {
        for (let i = 0; i < data.specifications.length; i++) {
          const s = data.specifications[i];
          if (s.key && s.value) {
            await conn.execute(
              'INSERT INTO product_specifications (product_id, spec_key, spec_value, display_order) VALUES (?, ?, ?, ?)',
              [productId, s.key.trim(), s.value.trim(), i + 1]
            );
          }
        }
      }

      // Re-sync images
      if (data.featured_image || (data.images && data.images.length > 0)) {
        await conn.execute('DELETE FROM product_images WHERE product_id = ?', [productId]);
        let order = 1;
        if (data.featured_image) {
          await conn.execute(
            'INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary) VALUES (?, ?, ?, ?, 1)',
            [productId, data.featured_image, data.name, order++]
          );
        }
        if (data.images && data.images.length > 0) {
          for (const img of data.images) {
            const clean = img.trim();
            if (clean && clean !== data.featured_image) {
              await conn.execute(
                'INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary) VALUES (?, ?, ?, ?, 0)',
                [productId, clean, `${data.name} image`, order++]
              );
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product: ' + error.message },
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

    const productId = Number(params.id);
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await query('DELETE FROM products WHERE id = ?', [productId]);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product: ' + error.message },
      { status: 500 }
    );
  }
}
