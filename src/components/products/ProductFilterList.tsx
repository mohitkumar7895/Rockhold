'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, Filter, Layers, Package, Sparkles } from 'lucide-react';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductEnquiryModal } from '@/components/products/ProductEnquiryModal';

interface ProductFilterListProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductFilterList({
  initialProducts,
  categories,
}: ProductFilterListProps) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enquiringProduct, setEnquiringProduct] = useState<Product | null>(null);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category_slug === selectedCategory ||
        String(product.category_id) === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.tagline && product.tagline.toLowerCase().includes(query)) ||
        (product.short_description && product.short_description.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Control Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-industrial border border-slate-200/80 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Instant Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, specification, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Counter */}
          <div className="text-xs sm:text-sm font-semibold text-slate-500 whitespace-nowrap self-start md:self-auto">
            Showing <span className="text-brand-navy font-bold">{filteredProducts.length}</span> of{' '}
            {initialProducts.length} Products
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-navy text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Products ({initialProducts.length})
          </button>

          {categories.map((cat) => {
            const count = initialProducts.filter(
              (p) => p.category_id === cat.id || p.category_slug === cat.slug
            ).length;
            const isSelected = selectedCategory === cat.slug || selectedCategory === String(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-brand-teal text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEnquire={(prod) => setEnquiringProduct(prod)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Package className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-brand-darkNavy">
            No Products Found
          </h3>
          <p className="text-xs text-slate-500">
            We could not find any products matching &ldquo;{searchQuery}&rdquo;. Try clearing your search or switching categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-darkNavy transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Enquiry Modal */}
      <ProductEnquiryModal
        product={enquiringProduct}
        isOpen={!!enquiringProduct}
        onClose={() => setEnquiringProduct(null)}
      />
    </div>
  );
}
