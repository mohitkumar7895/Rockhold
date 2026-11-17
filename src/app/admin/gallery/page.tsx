'use client';

import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Upload,
  X,
  Save,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { GalleryItem } from '@/types';
import { useToast } from '@/components/ui/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';

export default function AdminGalleryPage() {
  const { success, error: toastError } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'products' | 'packaging' | 'applications' | 'projects'>('products');
  const [imageUrl, setImageUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery?all=true');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err: any) {
      toastError(err.message || 'Error loading gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setDescription('');
    setCategory('products');
    setImageUrl('');
    setDisplayOrder(items.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || '');
    setCategory(item.category);
    setImageUrl(item.image_url);
    setDisplayOrder(item.display_order);
    setIsActive(Boolean(item.is_active));
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setImageUrl(data.url);
      success('Image uploaded!');
    } catch (err: any) {
      toastError(err.message || 'Failed to upload');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      toastError('Title and Image are required');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        description,
        category,
        image_url: imageUrl,
        display_order: Number(displayOrder) || 0,
        is_active: isActive,
      };

      const url = editingItem
        ? `/api/gallery/${editingItem.id}`
        : '/api/gallery';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save item');

      success(editingItem ? 'Item updated' : 'Gallery item added');
      setModalOpen(false);
      loadGallery();
    } catch (err: any) {
      toastError(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm(`Delete "${item.title}" from gallery?`)) return;

    try {
      const res = await fetch(`/api/gallery/${item.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete item');
      success('Item deleted');
      loadGallery();
    } catch (err: any) {
      toastError(err.message || 'Error deleting item');
    }
  };

  const filtered = items.filter(
    (item) => categoryFilter === 'all' || item.category === categoryFilter
  );

  return (
    <div>
      <AdminHeader
        title="Gallery Asset Management"
        subtitle="Manage Product Packs, Application Photos & Project Portfolios"
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-industrial flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {['all', 'products', 'packaging', 'applications', 'projects'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-brand-navy text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Button
            onClick={openCreateModal}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Image
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-xs text-slate-400">
              Loading gallery images...
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-industrial overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="teal">{item.category}</Badge>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <h4 className="font-bold text-sm text-brand-darkNavy line-clamp-1">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-[11px] text-slate-400">
                    Order: {item.display_order}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-brand-teal hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-xs text-slate-400">
              No gallery images in this category.
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden">
            <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-teal block">
                  Gallery Configuration
                </span>
                <h3 className="text-lg font-bold font-display">
                  {editingItem ? 'Edit Photo Details' : 'Upload Gallery Photo'}
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
                label="Photograph Title *"
                required
                placeholder="R-11 Ceramic Tile Flooring Application"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-brand-teal focus:outline-none"
                >
                  <option value="products">Product Packs</option>
                  <option value="packaging">Packaging Gallery</option>
                  <option value="applications">Site Applications</option>
                  <option value="projects">Completed Projects</option>
                </select>
              </div>

              <Textarea
                label="Description / Caption"
                rows={2}
                placeholder="Description of the project, tile material, or application..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Image Preview & Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Image Source *
                </label>

                {imageUrl && (
                  <div className="relative h-32 bg-slate-900 rounded-xl overflow-hidden mb-2">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Input
                    placeholder="/images/gallery/living-room-tiles.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />

                  <label className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer">
                    <Upload className="w-4 h-4 text-brand-teal" />
                    <span>{uploading ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

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
                    <span className="text-xs font-bold text-slate-700">Active</span>
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
                  Save Photo
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
