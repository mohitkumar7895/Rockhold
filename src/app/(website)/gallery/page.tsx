import React from 'react';
import { Metadata } from 'next';
import { query } from '@/lib/db';
import { GalleryItem } from '@/types';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Project & Product Gallery | RockHold Construction Chemicals',
  description:
    'Explore high-resolution product photographs, packaging showcases, on-site tile laying demonstrations, and completed architectural projects using RockHold.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getGalleryItems() {
  try {
    const items = await query<any[]>(
      'SELECT * FROM gallery WHERE is_active = 1 ORDER BY display_order ASC, id DESC'
    );
    return items as GalleryItem[];
  } catch (error) {
    console.error('Fetch gallery error:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="bg-brand-lightBg min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            Visual Proof & Portfolio
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-darkNavy tracking-tight font-display">
            Project & Product Gallery
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A comprehensive photographic record of our moisture-resistant packaging, manufacturing quality, and live application on demanding job sites.
          </p>
        </div>

        <GalleryGrid initialItems={items} />
      </div>
    </div>
  );
}
