'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Product, Category } from '@/types';
import { useToast } from '@/components/ui/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminProductsPage() {
  const { success, error: toastError } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resProd, resCat] = await Promise.all([
        fetch('/api/products?admin=true'),
        fetch('/api/categories'),
      ]);

      if (resProd.ok) {
        const data = await resProd.json();
        setProducts(data.products || []);
      }
      if (resCat.ok) {
        const catData = await resCat.json();
        setCategories(catData.categories || []);
      }
    } catch (err: any) {
      toastError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete product');
      }
      success(`Product "${name}" deleted successfully`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      toastError(err.message || 'Error deleting product');
    }
  };

  const filtered = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' ||
      p.category_slug === selectedCategory ||
      String(p.category_id) === selectedCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.tagline && p.tagline.toLowerCase().includes(query)) ||
      (p.short_description && p.short_description.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      <AdminHeader
        title="Product Inventory Management"
        subtitle="Manage Chemical Formulations, Specifications & Catalog"
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-industrial flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand-teal"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:border-brand-teal"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/admin/products/create"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-tealDark text-white text-xs font-bold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-industrial overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Pack Size</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      Loading products catalogue...
                    </td>
                  </tr>
                ) : filtered.length > 0 ? (
                  filtered.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 shrink-0 border border-slate-200 flex items-center justify-center">
                            {prod.featured_image ? (
                              <img
                                src={prod.featured_image}
                                alt={prod.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-slate-300" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-brand-darkNavy text-sm">
                              {prod.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              /products/{prod.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {prod.category_name || 'â€”'}
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        {prod.packaging_details || 'â€”'}
                      </td>

                      <td className="py-3 px-4">
                        {prod.is_published ? (
                          <Badge variant="success">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {prod.is_featured ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-teal">
                            <Sparkles className="w-3 h-3" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${prod.slug}`}
                            target="_blank"
                            title="Preview on live site"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-100 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${prod.id}/edit`}
                            title="Edit Product"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-brand-teal hover:bg-slate-100 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(prod.id, prod.name)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      No matching products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
