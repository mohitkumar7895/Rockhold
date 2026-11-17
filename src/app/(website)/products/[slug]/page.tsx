import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { query } from '@/lib/db';
import { Product } from '@/types';
import { ProductDetailView } from '@/components/products/ProductDetailView';

interface ProductPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    const rows = await query<any[]>(
      'SELECT name, seo_title, seo_description, short_description, featured_image FROM products WHERE slug = ? LIMIT 1',
      [slug]
    );

    if (!rows || rows.length === 0) {
      return {
        title: 'Product Not Found',
      };
    }

    const p = rows[0];
    const title = p.seo_title || `${p.name} | RockHold Construction Chemicals`;
    const description = p.seo_description || p.short_description || `${p.name} manufactured by RockHold.`;
    const imageUrl = p.featured_image || '/images/gallery/rockhold-product-lineup.jpg';

    return {
      title,
      description,
      alternates: {
        canonical: `https://rockhold.in/products/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://rockhold.in/products/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: p.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: 'Product | RockHold Construction Chemicals',
    };
  }
}

async function getProductBySlug(slug: string) {
  try {
    const products = await query<any[]>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.slug = ? AND p.is_published = 1
       LIMIT 1`,
      [slug]
    );

    if (!products || products.length === 0) return null;
    const product = products[0];

    const [images, specifications, benefits, applications, related] = await Promise.all([
      query<any[]>('SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
      query<any[]>('SELECT * FROM product_specifications WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
      query<any[]>('SELECT * FROM product_benefits WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
      query<any[]>('SELECT * FROM product_applications WHERE product_id = ? ORDER BY display_order ASC', [product.id]),
      query<any[]>(
        `SELECT id, name, slug, featured_image, packaging_details, tagline
         FROM products
         WHERE category_id = ? AND id != ? AND is_published = 1
         LIMIT 3`,
        [product.category_id, product.id]
      ),
    ]);

    product.images = images;
    product.specifications = specifications;
    product.benefits = benefits;
    product.applications = applications;

    return {
      product: product as Product,
      relatedProducts: related as Product[],
    };
  } catch (error) {
    console.error('Fetch product detail error:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const data = await getProductBySlug(params.slug);

  if (!data || !data.product) {
    notFound();
  }

  const { product, relatedProducts } = data;

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.featured_image ? `https://rockhold.in${product.featured_image}` : undefined,
    description: product.description || product.short_description,
    brand: {
      '@type': 'Brand',
      name: 'RockHold',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Kritika Enterprises',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://rockhold.in/products/${product.slug}`,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://rockhold.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://rockhold.in/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://rockhold.in/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
