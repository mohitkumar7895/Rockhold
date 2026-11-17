'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Category } from '@/types';
import { useToast } from '@/components/ui/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { slugify } from '@/lib/utils';

export default function AdminCategoriesPage() {
  const { success, error: toastError } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err: any) {
      toastError(err.message || 'Error loading categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('');
    setDisplayOrder(categories.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setImage(cat.image || '');
    setDisplayOrder(cat.display_order || 0);
    setIsActive(Boolean(cat.is_active));
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toastError('Category name is required');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        slug: slug || slugify(name),
        description,
        image,
        display_order: Number(displayOrder) || 0,
        is_active: isActive,
      };

      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save category');

      success(
        editingCategory
          ? 'Category updated successfully'
          : 'Category created successfully'
      );
      setModalOpen(false);
      loadCategories();
    } catch (err: any) {
      toastError(err.message || 'Error saving category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    if (
      !window.confirm(
        `Are you sure you want to delete category "${cat.name}"?`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/categories/${cat.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete category');

      success('Category deleted');
      loadCategories();
    } catch (err: any) {
      toastError(err.message || 'Error deleting category');
    }
  };

  return (
    <div>
      <AdminHeader
        title="Category Architecture"
        subtitle="Organize Tile Adhesives, Grouts, Cleaners & Waterproofing"
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-industrial flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-brand-darkNavy">
              Product Classifications
            </h3>
            <p className="text-xs text-slate-500">
              {categories.length} active categories controlling frontend navigation
            </p>
          </div>

          <Button
            onClick={openCreateModal}
            variant="secondary"
            size="md"
            className="font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Category
          </Button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-industrial overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Assigned Products</th>
                <th className="py-3.5 px-4">Display Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 p-1 shrink-0 flex items-center justify-center border border-slate-200">
                          {cat.image ? (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Layers className="w-5 h-5 text-brand-teal" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-brand-darkNavy text-sm">
                            {cat.name}
                          </div>
                          {cat.description && (
                            <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                              {cat.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-500">
                      {cat.slug}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-brand-navy">
                        {cat.product_count || 0} Products
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-semibold">
                      {cat.display_order}
                    </td>

                    <td className="py-3 px-4">
                      {cat.is_active ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Hidden</Badge>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          title="Edit Category"
                          className="p-1.5 rounded-lg text-slate-600 hover:text-brand-teal hover:bg-slate-100 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(cat)}
                          title="Delete Category"
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
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden">
            <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-teal block">
                  Category Configuration
                </span>
                <h3 className="text-lg font-bold font-display">
                  {editingCategory ? `Edit: ${editingCategory.name}` : 'New Category'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Category Name *"
                required
                placeholder="Tile Adhesives"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />

              <Input
                label="Category Slug *"
                required
                placeholder="tile-adhesives"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />

              <Textarea
                label="Description"
                rows={2}
                placeholder="Brief summary shown on mega menu and cards..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Input
                label="Category Image URL"
                placeholder="/images/products/r-11-tile-adhesive.png"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Display Order"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                />

                <div className="pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 text-brand-teal rounded border-slate-300"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Active
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  isLoading={submitting}
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
