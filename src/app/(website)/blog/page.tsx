import React from 'react';
import { Metadata } from 'next';
import { query } from '@/lib/db';
import { BlogPost } from '@/types';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Flame,
  Award,
} from 'lucide-react';
import { BlogExplorer } from '@/components/blog/BlogExplorer';

export const revalidate = 5;

export const metadata: Metadata = {
  title: 'Technical Knowledge Hub & Guides | RockHold Construction Chemicals',
  description:
    'Read expert articles, tile adhesive guidelines (IS 15477:2019), epoxy grout application techniques, and concrete waterproofing engineering by RockHold.',
  alternates: {
    canonical: 'https://rockhold.in/blog',
  },
  openGraph: {
    title: 'Technical Knowledge Hub & Guides | RockHold Construction Chemicals',
    description:
      'Expert insights, adhesive standards, and concrete waterproofing engineering guides.',
    url: 'https://rockhold.in/blog',
    type: 'website',
  },
};

// Fallback technical articles if DB returns empty
const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: 'Tile Adhesive Guide: Understanding Type 1 vs Type 2 vs Type 3 (IS 15477:2019)',
    slug: 'tile-adhesive-type-1-type-2-type-3-guide',
    excerpt:
      'Learn how polymer-modified tile adhesives are classified under IS 15477:2019 and how choosing the right type prevents hollow debonding on vitrified and natural stone tiles.',
    category: 'Tile Installation',
    tags: 'Tile Adhesive, IS 15477, Construction Chemicals, R-11, R-21, R-51',
    author: 'Manoj Prajapat (RockHold Technical Team)',
    reading_time: '6 min read',
    featured_image: '/images/gallery/luxury-interior-flooring.jpg',
    views_count: 1420,
    is_published: true,
    published_at: '2026-11-15T10:00:00.000Z',
    content: '',
    seo_title: 'Tile Adhesive Type 1 vs Type 2 vs Type 3 Guide | RockHold',
    seo_description: 'Comprehensive guide to IS 15477:2019 tile adhesive classifications.',
  },
  {
    id: 2,
    title: 'Why Epoxy Grout is Essential for Swimming Pools, Kitchens & Luxury Bathrooms',
    slug: 'why-epoxy-grout-is-essential-for-swimming-pools-and-bathrooms',
    excerpt:
      'Discover why cementitious grout fails under continuous water exposure and how RockHold 3-component impervious epoxy grout provides 100% stain-proof, acid-resistant joints.',
    category: 'Epoxy Grouts',
    tags: 'Epoxy Grout, Swimming Pools, Waterproof Jointing, Hygiene',
    author: 'RockHold Technical Laboratory',
    reading_time: '5 min read',
    featured_image: '/images/gallery/epoxy-living-room.jpg',
    views_count: 980,
    is_published: true,
    published_at: '2026-11-14T09:30:00.000Z',
    content: '',
    seo_title: 'Why Epoxy Grout is Essential for Pools & Wet Areas | RockHold',
    seo_description: 'Explore the advantages of 3-component epoxy grout over traditional cement grout.',
  },
  {
    id: 3,
    title: 'Combating Water Seepage: The Power of Integral Waterproofing Admixtures',
    slug: 'preventing-water-seepage-integral-waterproofing-admixtures',
    excerpt:
      'How RockHold R301 LW+ and R302 SBR bonding latex modify the pore structure of concrete and mortar, permanently sealing capillaries against moisture ingress and efflorescence.',
    category: 'Waterproofing',
    tags: 'Waterproofing, R301 LW+, SBR Latex, Concrete Admixtures',
    author: 'Civil Engineering Insights',
    reading_time: '7 min read',
    featured_image: '/images/gallery/concrete-waterproofing-application.jpg',
    views_count: 850,
    is_published: true,
    published_at: '2026-11-12T11:00:00.000Z',
    content: '',
    seo_title: 'Preventing Water Seepage with Integral Waterproofing Admixtures | RockHold',
    seo_description: 'Detailed engineering analysis of integral liquid waterproofing compounds and SBR latex.',
  },
  {
    id: 4,
    title: 'How to Remove Tough Grout Haze & Limescale from Tiles Without Damaging Glaze',
    slug: 'how-to-remove-grout-haze-and-limescale-from-tiles',
    excerpt:
      'A step-by-step guide to tackling stubborn whitish mineral scaling, plastic bucket ring marks, and post-construction cement haze using active, safe chemical descalers.',
    category: 'Surface Maintenance',
    tags: 'Tile Cleaner, Tap Cleaner, Descaling, R01, Maintenance',
    author: 'RockHold Surface Care Division',
    reading_time: '4 min read',
    featured_image: '/images/gallery/cleaner-application.jpg',
    views_count: 730,
    is_published: true,
    published_at: '2026-11-10T14:15:00.000Z',
    content: '',
    seo_title: 'How to Clean Tough Grout Haze & Limescale from Tiles | RockHold R01',
    seo_description: 'Step-by-step guide for removing stubborn cement haze and hard water limescale.',
  },
];

async function getBlogsData() {
  try {
    const blogs = await query<any[]>(
      'SELECT id, title, slug, excerpt, featured_image, category, tags, author, reading_time, is_published, views_count, published_at FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC, id DESC'
    );
    if (blogs && blogs.length > 0) {
      return blogs as BlogPost[];
    }
    return FALLBACK_BLOGS;
  } catch (error) {
    console.error('Fetch blogs page error, using fallback:', error);
    return FALLBACK_BLOGS;
  }
}

export default async function BlogIndexPage() {
  const blogs = await getBlogsData();

  // Extract unique categories preserving order
  const categoriesList = [
    'Tile Installation',
    'Epoxy Grouts',
    'Waterproofing',
    'Surface Maintenance',
  ];
  const dynamicCategories = Array.from(new Set(blogs.map((b) => b.category)));
  const combinedCategories = Array.from(
    new Set([...categoriesList, ...dynamicCategories])
  ).filter(Boolean);

  return (
    <div className="bg-brand-lightBg min-h-screen">
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061626] via-[#0B1E34] to-[#0D243F] text-white pt-16 sm:pt-20 pb-20 sm:pb-24 border-b border-brand-teal/20">
        {/* Glow backdrop circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-teal/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-[#5EE2EE]/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-navy/80 border border-brand-teal/40 backdrop-blur-md shadow-industrial mb-5">
            <BookOpen className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-white">
              ROCKHOLD TECHNICAL ARCHIVE • IS 15477 COMPLIANT
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] font-display text-white max-w-4xl mx-auto">
            Civil Engineering &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-[#4DE5F5] to-white">
              Tiling Knowledge Hub
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-base lg:text-lg text-slate-200/90 leading-relaxed max-w-3xl mx-auto font-sans">
            Authoritative technical guides, IS 15477:2019 standards breakdowns, 3-component epoxy jointing chemistry, and structural waterproofing manuals directly from our laboratory.
          </p>

          {/* Metric Highlights Pill Row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-base sm:text-xl font-black text-brand-teal font-display">
                IS 15477:2019
              </div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-sans mt-0.5">
                BIS Certified Tiers
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-base sm:text-xl font-black text-white font-display">
                50.45 MPa
              </div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-sans mt-0.5">
                Epoxy Compressive
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-base sm:text-xl font-black text-brand-teal font-display">
                0% Debonding
              </div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-sans mt-0.5">
                Polymer Anchor
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-base sm:text-xl font-black text-white font-display">
                100% Free
              </div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-sans mt-0.5">
                Engineering Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <BlogExplorer initialBlogs={blogs} categories={combinedCategories} />
      </main>
    </div>
  );
}
