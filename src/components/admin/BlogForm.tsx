'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Sparkles,
  Eye,
  FileText,
  Image as ImageIcon,
  Tag,
  Globe,
  Upload,
} from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogPost } from '@/types';
import { slugify } from '@/lib/utils';

interface BlogFormProps {
  initialData?: Partial<BlogPost>;
  isEditing?: boolean;
}

const CATEGORIES = [
  'Tile Installation',
  'Epoxy Grouts',
  'Waterproofing',
  'Surface Maintenance',
  'Technical Standards',
  'Product Guides',
  'Industry News',
];

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Tile Installation',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    featured_image: initialData?.featured_image || '/images/gallery/luxury-interior-flooring.jpg',
    author: initialData?.author || 'RockHold Technical Team',
    reading_time: initialData?.reading_time || '5 min read',
    tags: initialData?.tags || 'Tile Adhesive, Construction Chemicals',
    is_published: initialData?.is_published !== undefined ? Boolean(initialData.is_published) : true,
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || '',
  });

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEditing && !prev.slug ? slugify(val) : prev.slug,
      seo_title: !prev.seo_title ? `${val} | RockHold` : prev.seo_title,
    }));
  };

  const handleAutoSlug = () => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      toastError('Please fill in title, slug, excerpt, and content.');
      return;
    }

    setLoading(true);
    try {
      const url = isEditing ? `/api/blogs/${initialData?.id}` : '/api/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save blog post');
      }

      success(
        isEditing
          ? 'Article updated successfully'
          : 'Article published successfully'
      );
      router.push('/admin/blogs');
    } catch (err: any) {
      toastError(err.message || 'Error saving article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-navy mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Articles</span>
          </Link>
          <h1 className="text-2xl font-black text-brand-darkNavy tracking-tight font-display">
            {isEditing ? 'Edit Blog Article' : 'Write New Technical Article'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/blogs">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="secondary"
            isLoading={loading}
            className="shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Update Article' : 'Publish Article'}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-teal" />
              <span>Article Details</span>
            </h2>

            {/* Title */}
            <Input
              label="Article Title"
              required
              placeholder="e.g. Tile Adhesive Guide: Understanding Type 1 vs Type 2 vs Type 3"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoSlug}
                  className="text-[11px] text-brand-teal hover:underline font-mono"
                >
                  Generate from Title
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-600 focus-within:ring-2 focus-within:ring-brand-teal/30 focus-within:border-brand-teal">
                <span className="text-slate-400 select-none">/blog/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                  }
                  className="flex-1 bg-transparent focus:outline-none font-mono text-slate-800"
                  placeholder="tile-adhesive-type-1-type-2-guide"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Summary / Short Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Brief summary displayed on blog cards and used as SEO fallback..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal text-slate-800"
              />
            </div>

            {/* Content Tabs (Edit / Preview) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700">
                  Article Body (Markdown Supported) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('edit')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === 'edit'
                        ? 'bg-white text-brand-navy font-bold shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-white text-brand-navy font-bold shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {activeTab === 'edit' ? (
                <textarea
                  rows={16}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="# Article Headline&#10;&#10;Write technical insights, installation steps, substrate guidelines, tables, and bullet points..."
                  className="w-full font-mono text-xs p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal text-slate-800 leading-relaxed"
                />
              ) : (
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 max-h-[450px] overflow-y-auto prose prose-sm max-w-none text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {formData.content || '(Nothing to preview yet. Start typing in Write mode.)'}
                </div>
              )}
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-teal" />
              <span>Search Engine Optimization (SEO)</span>
            </h2>

            <Input
              label="SEO Meta Title"
              placeholder="Custom title tag for Google search results..."
              value={formData.seo_title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, seo_title: e.target.value }))
              }
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                SEO Meta Description
              </label>
              <textarea
                rows={3}
                placeholder="Meta description displayed in search engine results snippets..."
                value={formData.seo_description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seo_description: e.target.value,
                  }))
                }
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Controls */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-2">
              Publishing Options
            </h3>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Visibility
                </div>
                <div className="text-[10px] text-slate-500">
                  {formData.is_published ? 'Visible to visitors' : 'Saved as draft'}
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_published: e.target.checked,
                  }))
                }
                className="w-5 h-5 accent-brand-teal rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Author Name"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              placeholder="RockHold Technical Team"
            />

            <Input
              label="Estimated Reading Time"
              value={formData.reading_time}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  reading_time: e.target.value,
                }))
              }
              placeholder="e.g. 5 min read"
            />

            <Input
              label="Search Tags (Comma separated)"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tags: e.target.value }))
              }
              placeholder="Tile Adhesive, Waterproofing, Epoxy"
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-teal" />
              <span>Cover Image</span>
            </h3>

            <Input
              label="Image URL"
              value={formData.featured_image}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  featured_image: e.target.value,
                }))
              }
              placeholder="/images/gallery/luxury-interior-flooring.jpg"
            />

            {formData.featured_image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={formData.featured_image}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
