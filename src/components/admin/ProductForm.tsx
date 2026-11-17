'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  X,
  Package,
  Layers,
  Sparkles,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { Product, Category } from '@/types';
import { useToast } from '@/components/ui/toast';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils';
import Link from 'next/link';

interface ProductFormProps {
  initialData?: Product;
  isEdit?: boolean;
}

export function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [categoryId, setCategoryId] = useState<number | string>(
    initialData?.category_id || ''
  );
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || ''
  );
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [packagingDetails, setPackagingDetails] = useState(
    initialData?.packaging_details || ''
  );
  const [coverage, setCoverage] = useState(initialData?.coverage || '');
  const [openTime, setOpenTime] = useState(initialData?.open_time || '');
  const [adjustmentTime, setAdjustmentTime] = useState(
    initialData?.adjustment_time || ''
  );
  const [potLife, setPotLife] = useState(initialData?.pot_life || '');
  const [tensileStrength, setTensileStrength] = useState(
    initialData?.tensile_strength || ''
  );
  const [compressiveStrength, setCompressiveStrength] = useState(
    initialData?.compressive_strength || ''
  );
  const [bondStrength, setBondStrength] = useState(
    initialData?.bond_strength || ''
  );
  const [mixingRatio, setMixingRatio] = useState(
    initialData?.mixing_ratio || ''
  );
  const [tackFreeTime, setTackFreeTime] = useState(
    initialData?.tack_free_time || ''
  );
  const [trafficTime, setTrafficTime] = useState(
    initialData?.traffic_time || ''
  );
  const [colors, setColors] = useState(initialData?.colors || '');
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featured_image || ''
  );
  const [datasheetUrl, setDatasheetUrl] = useState(
    initialData?.datasheet_url || ''
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    Boolean(initialData?.is_featured)
  );
  const [isPublished, setIsPublished] = useState<boolean>(
    initialData?.is_published !== undefined ? Boolean(initialData.is_published) : true
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    initialData?.display_order || 0
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seo_description || ''
  );

  // Dynamic Lists
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits ? initialData.benefits.map((b) => b.benefit) : ['']
  );
  const [applications, setApplications] = useState<string[]>(
    initialData?.applications
      ? initialData.applications.map((a) => a.application)
      : ['']
  );
  const [specifications, setSpecifications] = useState<
    { key: string; value: string }[]
  >(
    initialData?.specifications
      ? initialData.specifications.map((s) => ({
          key: s.spec_key,
          value: s.spec_value,
        }))
      : [{ key: '', value: '' }]
  );
  const [images, setImages] = useState<string[]>(
    initialData?.images ? initialData.images.map((img) => img.image_url) : []
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
          if (!categoryId && data.categories?.length > 0) {
            setCategoryId(data.categories[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
  }, []);

  // Auto-slugify when name changes (only in create mode if slug untouched)
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      setSlug(slugify(val));
    }
  };

  // Image Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image');

      if (!featuredImage) {
        setFeaturedImage(data.url);
      } else {
        setImages((prev) => [...prev, data.url]);
      }
      success('Image uploaded successfully!');
    } catch (err: any) {
      toastError(err.message || 'Image upload error');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !categoryId) {
      toastError('Please fill in required fields: Name, Category, and Description.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        slug: slug || slugify(name),
        category_id: Number(categoryId),
        tagline,
        short_description: shortDescription,
        description,
        packaging_details: packagingDetails,
        coverage,
        open_time: openTime,
        adjustment_time: adjustmentTime,
        pot_life: potLife,
        tensile_strength: tensileStrength,
        compressive_strength: compressiveStrength,
        bond_strength: bondStrength,
        mixing_ratio: mixingRatio,
        tack_free_time: tackFreeTime,
        traffic_time: trafficTime,
        colors,
        featured_image: featuredImage,
        datasheet_url: datasheetUrl,
        is_featured: isFeatured,
        is_published: isPublished,
        display_order: Number(displayOrder) || 0,
        seo_title: seoTitle,
        seo_description: seoDescription,
        benefits: benefits.filter((b) => b.trim() !== ''),
        applications: applications.filter((a) => a.trim() !== ''),
        specifications: specifications.filter((s) => s.key.trim() && s.value.trim()),
        images,
      };

      const url = isEdit ? `/api/products/${initialData?.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      success(
        isEdit ? 'Product updated successfully' : 'Product created successfully',
        'Success'
      );
      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      toastError(err.message || 'Error saving product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-navy"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="secondary"
            size="md"
            isLoading={submitting}
          >
            <Save className="w-4 h-4 mr-1.5" />
            {isEdit ? 'Save Changes' : 'Publish Product'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Basic Info, Descriptions, Specs, Benefits */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Basic Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-4">
            <h3 className="text-base font-bold text-brand-darkNavy border-b border-slate-100 pb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-teal" />
              General Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Product Name *"
                required
                placeholder="R-11 Tile Adhesive â€“ Type 1"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />

              <Input
                label="URL Slug *"
                required
                placeholder="r-11-tile-adhesive"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Tagline"
                placeholder="Polymer-Modified Cement-Based Tile Adhesive"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>

            <Textarea
              label="Short Description"
              rows={2}
              placeholder="Brief 1-2 sentence overview for cards and listings..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />

            <Textarea
              label="Full Detailed Description *"
              required
              rows={5}
              placeholder="Full catalogue description with technical narrative..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Section: Technical Parameters */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-4">
            <h3 className="text-base font-bold text-brand-darkNavy border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-teal" />
              Technical Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Pack Size"
                placeholder="20 kg / 1 Litre"
                value={packagingDetails}
                onChange={(e) => setPackagingDetails(e.target.value)}
              />
              <Input
                label="Coverage"
                placeholder="Approx 50-60 sq. ft."
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
              />
              <Input
                label="Colours"
                placeholder="Grey & White"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Open Time"
                placeholder="â‰¥ 20 Min."
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
              />
              <Input
                label="Adjustment Time"
                placeholder="â‰¥ 25 Min."
                value={adjustmentTime}
                onChange={(e) => setAdjustmentTime(e.target.value)}
              />
              <Input
                label="Pot Life"
                placeholder="2 Hours"
                value={potLife}
                onChange={(e) => setPotLife(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Tensile Strength"
                placeholder="Min 0.5 MPa"
                value={tensileStrength}
                onChange={(e) => setTensileStrength(e.target.value)}
              />
              <Input
                label="Compressive Strength"
                placeholder="50.45 MPa"
                value={compressiveStrength}
                onChange={(e) => setCompressiveStrength(e.target.value)}
              />
              <Input
                label="Bond Strength"
                placeholder="7.55 MPa"
                value={bondStrength}
                onChange={(e) => setBondStrength(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Mixing Ratio"
                placeholder="0.9 : 0.1 or W/P"
                value={mixingRatio}
                onChange={(e) => setMixingRatio(e.target.value)}
              />
              <Input
                label="Tack Free Time"
                placeholder="6-7 Hours"
                value={tackFreeTime}
                onChange={(e) => setTackFreeTime(e.target.value)}
              />
              <Input
                label="Traffic Time"
                placeholder="24h or 72h"
                value={trafficTime}
                onChange={(e) => setTrafficTime(e.target.value)}
              />
            </div>
          </div>

          {/* Section: Key/Value Specifications Builder */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-brand-darkNavy">
                Technical Specifications Table
              </h3>
              <button
                type="button"
                onClick={() => setSpecifications([...specifications, { key: '', value: '' }])}
                className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
            </div>

            <div className="space-y-2">
              {specifications.map((spec, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Parameter (e.g. Standard)"
                    value={spec.key}
                    onChange={(e) => {
                      const updated = [...specifications];
                      updated[i].key = e.target.value;
                      setSpecifications(updated);
                    }}
                    className="flex-1 h-10 rounded-lg border border-slate-300 px-3 text-sm focus:border-brand-teal focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Specification (e.g. IS 15477: 2019)"
                    value={spec.value}
                    onChange={(e) => {
                      const updated = [...specifications];
                      updated[i].value = e.target.value;
                      setSpecifications(updated);
                    }}
                    className="flex-1 h-10 rounded-lg border border-slate-300 px-3 text-sm focus:border-brand-teal focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSpecifications(specifications.filter((_, idx) => idx !== i))}
                    className="p-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Benefits & Applications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-brand-darkNavy">Benefits</h4>
                <button
                  type="button"
                  onClick={() => setBenefits([...benefits, ''])}
                  className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-2">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Self-curing properties"
                      value={b}
                      onChange={(e) => {
                        const updated = [...benefits];
                        updated[i] = e.target.value;
                        setBenefits(updated);
                      }}
                      className="flex-1 h-9 rounded-lg border border-slate-300 px-3 text-xs focus:border-brand-teal focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))}
                      className="p-1.5 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-brand-darkNavy">Applications</h4>
                <button
                  type="button"
                  onClick={() => setApplications([...applications, ''])}
                  className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-2">
                {applications.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Ceramic & clay tile fixing"
                      value={a}
                      onChange={(e) => {
                        const updated = [...applications];
                        updated[i] = e.target.value;
                        setApplications(updated);
                      }}
                      className="flex-1 h-9 rounded-lg border border-slate-300 px-3 text-xs focus:border-brand-teal focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setApplications(applications.filter((_, idx) => idx !== i))}
                      className="p-1.5 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Media, Publishing Status, SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-4">
            <h4 className="text-sm font-bold text-brand-darkNavy border-b border-slate-100 pb-2">
              Status & Priority
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Published on Website
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Featured on Homepage
                </span>
              </label>

              <Input
                label="Display Order (lower comes first)"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Primary Featured Image */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-4">
            <h4 className="text-sm font-bold text-brand-darkNavy border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Featured Pack Image</span>
              {featuredImage && (
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </h4>

            {featuredImage ? (
              <div className="relative h-48 bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center">
                <img
                  src={featuredImage}
                  alt="Product preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-36 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                <ImageIcon className="w-8 h-8 mb-1 text-slate-300" />
                <span className="text-xs">No primary image selected</span>
              </div>
            )}

            <div className="space-y-2">
              <Input
                label="Or Direct Image URL"
                placeholder="/images/products/r-11-tile-adhesive.png"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
              />

              <label className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer">
                <Upload className="w-4 h-4 text-brand-teal" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload File to Server'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Technical Datasheet PDF */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-3">
            <h4 className="text-sm font-bold text-brand-darkNavy border-b border-slate-100 pb-2">
              Datasheet PDF Link
            </h4>
            <Input
              label="Datasheet Path"
              placeholder="/datasheets/r-11-technical-data-sheet.pdf"
              value={datasheetUrl}
              onChange={(e) => setDatasheetUrl(e.target.value)}
            />
          </div>

          {/* SEO Metadata Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-industrial space-y-4">
            <h4 className="text-sm font-bold text-brand-darkNavy border-b border-slate-100 pb-2">
              Search Engine Optimization (SEO)
            </h4>

            <Input
              label="SEO Title"
              placeholder="RockHold R-11 | Type 1 Tile Adhesive"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
            />

            <Textarea
              label="SEO Meta Description"
              rows={3}
              placeholder="Custom meta description for Google indexing..."
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
