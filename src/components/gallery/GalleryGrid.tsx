'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Sparkles, Layers } from 'lucide-react';
import { GalleryItem } from '@/types';

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

export function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'products', label: 'Product Packs' },
    { id: 'packaging', label: 'Packaging Gallery' },
    { id: 'applications', label: 'Site Applications' },
    { id: 'projects', label: 'Completed Projects' },
  ];

  const filtered = initialItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-brand-navy text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-industrial cursor-pointer border border-slate-200"
              onClick={() => setLightboxImage(item)}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand-darkNavy/95 via-brand-darkNavy/20 to-transparent transition-opacity group-hover:opacity-90" />

              {/* View Icon */}
              <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-brand-teal tracking-wider block">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] bg-transparent rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={lightboxImage.image_url}
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl mx-auto"
              />
              <div className="mt-3 text-center text-white bg-black/60 backdrop-blur-md p-3 rounded-xl max-w-lg mx-auto">
                <div className="text-xs uppercase font-bold text-brand-teal">
                  {lightboxImage.category}
                </div>
                <div className="font-bold text-sm sm:text-base">
                  {lightboxImage.title}
                </div>
                {lightboxImage.description && (
                  <div className="text-xs text-slate-300 mt-0.5">
                    {lightboxImage.description}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
