import React from 'react';
import { Metadata } from 'next';
import { query } from '@/lib/db';
import { Product, Category } from '@/types';
import { ProductFilterList } from '@/components/products/ProductFilterList';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products Range | RockHold Tile Adhesives, Epoxy Grouts & Waterproofing',
  description:
    'Browse the full catalogue of RockHold high-performance construction chemicals: R-11, R-21, R-51 Tile Adhesives, Stain-Free Epoxy Grout, Tile Cleaner, Tap Cleaner, and R301 LW+.',
};

export const revalidate = 5;

async function getProductsData() {
  try {
    const [products, categories] = await Promise.all([
      query<any[]>(`
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.is_published = 1
        ORDER BY p.display_order ASC, p.id ASC
      `),
      query<any[]>('SELECT * FROM categories WHERE is_active = 1 ORDER BY display_order ASC'),
    ]);

    return {
      products: products as Product[],
      categories: categories as Category[],
    };
  } catch (error) {
    console.error('Fetch products page data error:', error);
    return {
      products: [],
      categories: [],
    };
  }
}

export default async function ProductsPage() {
  const { products, categories } = await getProductsData();

  return (
    <div className="bg-brand-lightBg min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            Official Product Catalogue
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-darkNavy tracking-tight font-display">
            High-Performance Formulations
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Engineered tile adhesives, stain-proof grouts, rapid surface cleaners, and integral waterproofing compounds designed for lifelong structural durability.
          </p>
        </div>

        {/* Dynamic Filter & Grid */}
        <React.Suspense fallback={<div className="py-20 text-center text-slate-400">Loading product catalogue...</div>}>
          <ProductFilterList
            initialProducts={products}
            categories={categories}
          />
        </React.Suspense>
      </div>
    </div>
  );
}
