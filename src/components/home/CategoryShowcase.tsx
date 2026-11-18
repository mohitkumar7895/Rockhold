'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, Shield, Droplets, Sparkles, ArrowRight } from 'lucide-react';
import { Category } from '@/types';

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const categoryHighlights = [
    {
      code: '01',
      slug: 'tile-adhesives',
      name: 'Tile Adhesives',
      subtitle: 'Type 1, Type 2 & Type 3 Polymer Modifiers',
      desc: 'Engineered for ceramic, vitrified tiles, terracotta, porcelain slabs, and heavy natural stones in indoor & outdoor spaces.',
      image: '/images/products/r-11-tile-adhesive.png',
      badge: 'High Tensile Grip',
      color: 'from-blue-600/20 to-brand-navy/30',
      icon: Layers,
    },
    {
      code: '02',
      slug: 'grouts-joint-fillers',
      name: 'Grouts & Joint Fillers',
      subtitle: 'Impervious Epoxy & Cementitious Grouts',
      desc: '3-Component stain-free epoxy grouts and water-resistant polymer cement grouts offering hygienic, non-cracking joints.',
      image: '/images/products/epoxy-grout.png',
      badge: 'Stain-Free & Durable',
      color: 'from-purple-600/20 to-brand-navy/30',
      icon: Shield,
    },
    {
      code: '03',
      slug: 'surface-cleaners',
      name: 'Surface Cleaners',
      subtitle: 'Rapid Active Cleaners & Limescale Descalers',
      desc: 'High-potency R01 tile cleaner for whitish bucket scaling and eco-friendly non-corrosive tap cleaner for chrome fittings.',
      image: '/images/products/r01-tile-cleaner.png',
      badge: 'Instant Shine Restoration',
      color: 'from-emerald-600/20 to-brand-navy/30',
      icon: Sparkles,
    },
    {
      code: '04',
      slug: 'waterproofing-admixtures',
      name: 'Waterproofing & Admixtures',
      subtitle: 'Integral Liquid Compounds & SBR Latex',
      desc: 'R301 LW+ integral waterproofing for concrete and R302 SBR modified styrene butadiene latex for spalled repairs and bond coats.',
      image: '/images/products/r301-lw-plus.png',
      badge: 'Structural Defense',
      color: 'from-amber-600/20 to-brand-navy/30',
      icon: Droplets,
    },
  ];

  return (
    <section className="py-14 sm:py-24 bg-brand-lightBg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-teal" />
            <span>Product Classifications</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-darkNavy tracking-tight font-display">
            Engineered Formulations by Application
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Formulated specifically to endure Indian climate dynamics, severe thermal expansion, and demanding architectural specifications.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryHighlights.map((cat, index) => {
            const Icon = cat.icon;
            const dbCategory = categories?.find((c) => c.slug === cat.slug);
            const categoryImage = dbCategory?.image || cat.image;
            const categoryName = dbCategory?.name || cat.name;
            const categoryDesc = dbCategory?.description || cat.desc;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-industrial hover:shadow-industrial-lg hover:border-brand-teal/50 transition-all duration-300 flex flex-col justify-between overflow-hidden p-5 sm:p-6"
              >
                {/* Corner brackets */}
                <div className="corner-bracket-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="corner-bracket-br opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar: Code & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-brand-navy/60">
                      [{cat.code}]
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-brand-darkNavy group-hover:text-brand-teal transition-colors font-display">
                    {categoryName}
                  </h3>
                  <div className="text-xs font-semibold text-brand-navy/70 mt-1 font-sans">
                    {cat.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {categoryDesc}
                  </p>

                  {/* Product Pack preview image with blueprint background */}
                  <div className="relative mt-6 h-48 w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/80 rounded-2xl p-4 border border-slate-100 group-hover:border-brand-teal/30 transition-colors overflow-hidden">
                    <div className="absolute inset-0 blueprint-pattern opacity-10 pointer-events-none" />
                    <img
                      src={categoryImage}
                      alt={categoryName}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300 relative z-10"
                    />
                  </div>
                </div>

                {/* Card CTA Link */}
                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-brand-navy group-hover:text-brand-teal transition-colors"
                  >
                    <span>View Category Range</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
