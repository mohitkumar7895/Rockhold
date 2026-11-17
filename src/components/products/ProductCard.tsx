'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export function ProductCard({ product, onEnquire }: ProductCardProps) {
  const waMessage = encodeURIComponent(
    `Hello RockHold, I am interested in ${product.name}. Please share commercial price list and nearest dealer/distributor details.`
  );
  const waLink = `https://wa.me/919001667917?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-3xl border border-slate-200 shadow-industrial hover:border-brand-teal/50 hover:shadow-industrial-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
    >
      {/* Corner Brackets on Hover */}
      <div className="corner-bracket-tl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="corner-bracket-br opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Product Image Stage */}
        <div className="relative h-64 bg-gradient-to-b from-slate-50 via-slate-100/70 to-slate-200/50 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 blueprint-pattern opacity-10 pointer-events-none" />

          {/* Category Pill */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-brand-darkNavy text-white shadow-sm backdrop-blur-md uppercase tracking-wider border border-white/10">
              {product.category_name || 'Chemicals'}
            </span>
          </div>

          {/* Featured Ribbon */}
          {product.is_featured ? (
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-brand-teal text-white shadow-sm uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>FEATURED</span>
              </span>
            </div>
          ) : (
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="text-[9px] font-mono text-slate-400">
                {'[IS 15477]'}
              </span>
            </div>
          )}

          {/* Product Pack Photo */}
          <Link href={`/products/${product.slug}`} prefetch={true} className="w-full h-full flex items-center justify-center relative z-10 cursor-pointer">
            {product.featured_image ? (
              <img
                src={product.featured_image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <Package className="w-16 h-16 text-slate-300" />
            )}
          </Link>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-3">
          <Link href={`/products/${product.slug}`} prefetch={true} className="block cursor-pointer">
            <h3 className="text-lg font-bold text-brand-darkNavy group-hover:text-brand-teal transition-colors line-clamp-1 font-display">
              {product.name}
            </h3>
          </Link>

          {product.tagline ? (
            <p className="text-xs text-brand-slate line-clamp-1 font-medium font-sans">
              {product.tagline}
            </p>
          ) : null}

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.short_description || product.description}
          </p>

          {/* Technical Specs Chips */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 font-mono text-[11px]">
            {product.open_time ? (
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Open Time</span>
                <span className="font-bold text-slate-700">{product.open_time}</span>
              </div>
            ) : null}
            {product.tensile_strength ? (
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Tensile Strength</span>
                <span className="font-bold text-brand-navy">{product.tensile_strength}</span>
              </div>
            ) : null}
            {product.packaging_details ? (
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Packaging Details</span>
                  <span className="font-bold text-slate-700">{product.packaging_details}</span>
                </div>
                {product.colors ? (
                  <div className="text-right">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Shades</span>
                    <span className="font-bold text-brand-teal text-[10px]">{product.colors}</span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
        <Link
          href={`/products/${product.slug}`}
          prefetch={true}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-brand-navy text-xs font-bold transition-transform duration-75 cursor-pointer"
        >
          <span>Specifications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {onEnquire ? (
          <button
            type="button"
            onClick={() => onEnquire(product)}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-teal hover:bg-brand-tealDark active:scale-95 text-white text-xs font-bold shadow-sm transition-transform duration-75 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </button>
        ) : (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20b858] active:scale-95 text-white text-xs font-bold shadow-sm transition-transform duration-75 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
