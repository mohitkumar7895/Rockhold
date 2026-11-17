import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { query } from '@/lib/db';
import { BlogPost } from '@/types';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Search,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Technical Knowledge Hub & Blogs | RockHold Construction Chemicals',
  description:
    'Read expert articles, tile adhesive guidelines (IS 15477:2019), epoxy grout application techniques, and concrete waterproofing engineering by RockHold.',
  alternates: {
    canonical: 'https://rockhold.in/blog',
  },
  openGraph: {
    title: 'Technical Knowledge Hub & Blogs | RockHold Construction Chemicals',
    description:
      'Expert insights, adhesive standards, and concrete waterproofing engineering guides.',
    url: 'https://rockhold.in/blog',
    type: 'website',
  },
};

async function getBlogsData() {
  try {
    const blogs = await query<any[]>(
      'SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC, id DESC'
    );
    return blogs as BlogPost[];
  } catch (error) {
    console.error('Fetch blogs page error:', error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const blogs = await getBlogsData();
  const featuredPost = blogs[0];
  const regularPosts = blogs.slice(1);

  const categories = Array.from(new Set(blogs.map((b) => b.category)));

  return (
    <div className="bg-brand-lightBg min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-brand-teal" />
            <span>Knowledge Hub & Engineering Insights</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-darkNavy tracking-tight font-display">
            Construction Chemicals & Tiling Insights
          </h1>
          <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical technical guides, IS 15477 standards breakdown, epoxy grouting best practices, and chemical waterproofing insights straight from the laboratory.
          </p>
        </div>

        {/* Featured Hero Article */}
        {featuredPost && (
          <div className="mb-12 sm:mb-16">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-industrial-lg grid grid-cols-1 lg:grid-cols-12 group">
              {/* Featured Image (7 cols) */}
              <div className="lg:col-span-7 relative h-64 sm:h-72 lg:h-auto min-h-[260px] sm:min-h-[320px] overflow-hidden bg-slate-900">
                <img
                  src={
                    featuredPost.featured_image ||
                    '/images/gallery/luxury-interior-flooring.jpg'
                  }
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                  <span className="font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-brand-teal text-white shadow-md uppercase tracking-wider">
                    ★ FEATURED ARTICLE
                  </span>
                </div>
              </div>

              {/* Featured Text (5 cols) */}
              <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="font-bold text-brand-teal uppercase">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.reading_time || '5 min read'}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} className="block">
                    <h2 className="text-lg sm:text-2xl font-black text-brand-darkNavy group-hover:text-brand-teal transition-colors font-display leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featuredPost.author}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal group-hover:text-brand-tealDark transition-colors active:scale-95"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-brand-darkNavy font-display">
              All Technical Guides ({blogs.length})
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                Category Archive
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-industrial hover:shadow-industrial-lg hover:border-brand-teal/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={
                        post.featured_image ||
                        '/images/gallery/luxury-interior-flooring.jpg'
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-brand-darkNavy/90 text-white backdrop-blur-md uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                    <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-teal" />
                        {post.reading_time || '5 min read'}
                      </span>
                      <span>•</span>
                      <span>
                        {post.published_at ? formatDate(post.published_at) : 'Recent'}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block">
                      <h3 className="text-base sm:text-lg font-bold text-brand-darkNavy group-hover:text-brand-teal transition-colors font-display line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 mt-3 sm:mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-sans truncate max-w-[120px] sm:max-w-[140px]">
                    By {post.author.split(' ')[0]}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy group-hover:text-brand-teal transition-colors active:scale-95"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
