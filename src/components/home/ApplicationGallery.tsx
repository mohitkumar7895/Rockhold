'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Eye, Sparkles, X } from 'lucide-react';
import { GalleryItem } from '@/types';

interface ApplicationGalleryProps {
  items?: GalleryItem[];
}

export function ApplicationGallery({ items }: ApplicationGalleryProps = {}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const fallbackItems = [
    {
      title: 'Modern Geometric Living Room Tiling',
      category: 'Residential Flooring',
      product: 'RockHold R-11 & R-21',
      image: '/images/gallery/living-room-tiles.jpg',
    },
    {
      title: 'Weather-Resistant Outdoor Terrace Tiles',
      category: 'Exterior Application',
      product: 'RockHold R-21 & R-51',
      image: '/images/gallery/outdoor-patio-tiles.jpg',
    },
    {
      title: 'Luxury Porcelain Slabs in Living Lounge',
      category: 'Large Format Slabs',
      product: 'RockHold R-51 Type 3',
      image: '/images/gallery/luxury-interior-flooring.jpg',
    },
    {
      title: 'Stain-Free Seamless Epoxy Grouting',
      category: 'Hygienic Tile Joints',
      product: 'RockHold Epoxy Grout',
      image: '/images/gallery/epoxy-living-room.jpg',
    },
    {
      title: 'Precision Joint Grouting Application',
      category: 'Craftsmanship In Action',
      product: 'RockHold Tile Grout',
      image: '/images/gallery/grouting-application.jpg',
    },
    {
      title: 'Structural Foundation & Slab Waterproofing',
      category: 'Commercial Concrete',
      product: 'RockHold R301 LW+ & R302 SBR',
      image: '/images/gallery/concrete-waterproofing-application.jpg',
    },
  ];

  const displayItems =
    items && items.length > 0
      ? items.slice(0, 6).map((it) => ({
          title: it.title,
          category: it.category || 'Site Showcase',
          product: it.description || 'RockHold Chemical Application',
          image: it.image_url,
        }))
      : fallbackItems;

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              On-Site Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-darkNavy tracking-tight font-display">
              Real-World Applications
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              See how architects, builders, and master applicators utilize RockHold products to create durable, beautiful, and leak-proof installations.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-teal transition-colors group"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-industrial cursor-pointer"
              onClick={() => setActiveImage(item.image)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand-darkNavy/95 via-brand-darkNavy/30 to-transparent transition-opacity group-hover:opacity-90" />

              <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-brand-teal tracking-wider block">
                  {item.category} â€¢ {item.product}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] bg-transparent rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={activeImage}
                alt="Enlarged gallery preview"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
