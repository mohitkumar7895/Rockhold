'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Download,
  Send,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight,
  FileText,
  ChevronRight,
  Home,
} from 'lucide-react';
import { Product } from '@/types';
import { ProductEnquiryModal } from '@/components/products/ProductEnquiryModal';
import { Button } from '@/components/ui/button';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.featured_image || (product.images?.[0]?.image_url ?? '')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allImages = [
    ...(product.featured_image ? [product.featured_image] : []),
    ...(product.images ? product.images.map((img) => img.image_url) : []),
  ];
  const uniqueImages = Array.from(new Set(allImages));

  const waUrl = `https://wa.me/919001667917?text=Hello%20RockHold%2C%20I%20am%20interested%20in%20${encodeURIComponent(
    product.name
  )}.%20Please%20provide%20rates%20and%20availability.`;

  return (
    <div className="bg-brand-lightBg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand-navy flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-brand-navy">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          {product.category_slug && (
            <>
              <Link
                href={`/products?category=${product.category_slug}`}
                className="hover:text-brand-navy text-slate-600"
              >
                {product.category_name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </>
          )}
          <span className="font-bold text-brand-navy truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Hero Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-industrial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Image Stage & Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-96 sm:h-[420px] bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl p-8 flex items-center justify-center border border-slate-200/70 shadow-inner overflow-hidden">
              {product.is_featured ? (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-teal text-white shadow-sm">
                    FEATURED
                  </span>
                </div>
              ) : null}

              <div className="absolute top-4 right-4 z-10">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-brand-navy text-white shadow-sm">
                  ISO 9001:2015
                </span>
              </div>

              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <Package className="w-20 h-20 text-slate-300" />
              )}
            </div>

            {/* Thumbnail selector */}
            {uniqueImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {uniqueImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl p-1 bg-slate-50 border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-brand-teal shadow-md scale-105'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumb ${idx}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Specs Highlights & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/15 text-brand-teal text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                {product.category_name || 'Construction Chemicals'}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-brand-darkNavy tracking-tight font-display">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-sm sm:text-base text-brand-teal font-semibold mt-1">
                  {product.tagline}
                </p>
              )}
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quick Spec Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {product.packaging_details && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pack Size</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-darkNavy">
                    {product.packaging_details}
                  </span>
                </div>
              )}
              {product.open_time && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Open Time</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-darkNavy">
                    {product.open_time}
                  </span>
                </div>
              )}
              {product.adjustment_time && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Adjustment</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-darkNavy">
                    {product.adjustment_time}
                  </span>
                </div>
              )}
              {product.tensile_strength && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Tensile Strength</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-navy">
                    {product.tensile_strength}
                  </span>
                </div>
              )}
              {product.compressive_strength && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Comp. Strength</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-navy">
                    {product.compressive_strength}
                  </span>
                </div>
              )}
              {product.pot_life && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pot Life</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-darkNavy">
                    {product.pot_life}
                  </span>
                </div>
              )}
              {product.coverage && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Coverage</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-darkNavy">
                    {product.coverage}
                  </span>
                </div>
              )}
              {product.colors && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Colours</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-darkNavy">
                    {product.colors}
                  </span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Submit Product Enquiry
              </Button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                WhatsApp Direct
              </a>

              {product.datasheet_url && (
                <a
                  href={product.datasheet_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-bold text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Datasheet PDF
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Benefits & Applications Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Benefits */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-4">
            <h3 className="text-xl font-bold text-brand-darkNavy font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-teal" />
              Key Benefits & Features
            </h3>
            {product.benefits && product.benefits.length > 0 ? (
              <ul className="space-y-3">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span>{b.benefit}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">Contact our sales desk for complete technical benefits.</p>
            )}
          </div>

          {/* Applications */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-4">
            <h3 className="text-xl font-bold text-brand-darkNavy font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-teal" />
              Recommended Applications
            </h3>
            {product.applications && product.applications.length > 0 ? (
              <ul className="space-y-3">
                {product.applications.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span>{a.application}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">Suitable for residential and commercial flooring & wall cladding.</p>
            )}
          </div>
        </div>

        {/* Technical Specifications Table */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-brand-darkNavy font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-teal" />
                Technical Specifications & Standards
              </h3>
              {product.datasheet_url && (
                <a
                  href={product.datasheet_url}
                  download
                  className="text-xs font-bold text-brand-teal hover:text-brand-tealDark flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF Datasheet
                </a>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand-navy/10 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <th className="py-3 px-4">Parameter / Property</th>
                    <th className="py-3 px-4">Specification / Certified Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {product.specifications.map((spec, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {spec.spec_key}
                      </td>
                      <td className="py-3 px-4 text-brand-navy font-medium">
                        {spec.spec_value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related Products from Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="text-2xl font-bold text-brand-darkNavy font-display">
              Related Formulations in {product.category_name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-industrial hover:shadow-industrial-lg transition-all flex items-center gap-4 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-50 p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                    {rel.featured_image ? (
                      <img
                        src={rel.featured_image}
                        alt={rel.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-darkNavy group-hover:text-brand-teal transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {rel.packaging_details || rel.tagline}
                    </p>
                    <span className="text-[11px] font-semibold text-brand-teal inline-flex items-center gap-1 mt-1">
                      View Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProductEnquiryModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
