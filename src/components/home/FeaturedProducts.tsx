'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductEnquiryModal } from '@/components/products/ProductEnquiryModal';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = products.filter((p) => p.is_featured).slice(0, 6);
  const displayList = featured.length > 0 ? featured : products.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/15 text-brand-teal text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Catalogue Highlights
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-brand-darkNavy tracking-tight font-display">
              Featured Formulations
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
              From Type 1 economy ceramic adhesives to Type 3 heavy porcelain stone adhesives and impervious 3-component epoxy grouts.
            </p>
          </div>

          <Link
            href="/products"
            prefetch={true}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-teal transition-colors self-start md:self-auto group active:scale-95"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEnquire={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-8 rounded-3xl bg-brand-lightBg border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-brand-darkNavy">
              Need Custom Technical Formulations or Bulk Site Delivery?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Connect directly with our manufacturing plant for project tenders, dealership inquiries, and bulk builder pricing.
            </p>
          </div>
          <Link
            href="/contact"
            prefetch={true}
            className="w-full sm:w-auto text-center shrink-0 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-darkNavy text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-transform"
          >
            Request Commercial Quote
          </Link>
        </div>
      </div>

      <ProductEnquiryModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
