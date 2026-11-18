'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  X,
  Sparkles,
  Tag,
  PhoneCall,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  ArrowUpRight,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogExplorerProps {
  initialBlogs: BlogPost[];
  categories: string[];
}

export function BlogExplorer({ initialBlogs, categories }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'readingTime'>('latest');

  // Popular quick tags
  const quickTags = [
    'IS 15477',
    'Tile Adhesive',
    'Epoxy Grout',
    'Waterproofing',
    'R301 LW+',
    'R-21',
    'Tile Cleaner',
    'Tile-on-Tile',
  ];

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let result = [...initialBlogs];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(
        (b) => b.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query (title, excerpt, tags, category, content)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((b) => {
        return (
          b.title?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q) ||
          b.tags?.toLowerCase().includes(q) ||
          b.category?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'latest') {
        const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
        const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'oldest') {
        const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
        const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
        return dateA - dateB;
      }
      if (sortBy === 'readingTime') {
        const timeA = parseInt(a.reading_time || '5', 10);
        const timeB = parseInt(b.reading_time || '5', 10);
        return timeA - timeB;
      }
      return 0;
    });

    return result;
  }, [initialBlogs, selectedCategory, searchQuery, sortBy]);

  // Featured article: first article if "All" is active and no search query
  const isDefaultView = selectedCategory === 'All' && !searchQuery.trim();
  const featuredPost = isDefaultView ? initialBlogs[0] : null;
  const displayPosts = isDefaultView ? filteredBlogs.slice(1) : filteredBlogs;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialBlogs.length };
    initialBlogs.forEach((b) => {
      const cat = b.category || 'Guides';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [initialBlogs]);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Search & Category Filter Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-industrial border border-slate-200/90 relative z-20 -mt-10 sm:-mt-12 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by title, IS standard (e.g. 15477), tile type, epoxy, waterproofing..."
              className="w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-brand-darkNavy text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Stats Bar */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-teal" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-brand-darkNavy text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal transition-all font-sans cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="readingTime">Quickest Read</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
              selectedCategory === 'All'
                ? 'bg-brand-navy text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-brand-darkNavy'
            }`}
          >
            <span>All Guides</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === 'All'
                  ? 'bg-brand-teal text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {categoryCounts['All'] || 0}
            </span>
          </button>

          {categories.map((category) => {
            const isSelected =
              selectedCategory.toLowerCase() === category.toLowerCase();
            const count = categoryCounts[category] || 0;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-brand-teal text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-brand-darkNavy'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-brand-navy text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Keyword Chips */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3 text-brand-teal" />
            <span>Popular Tags:</span>
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchQuery(tag)}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 hover:bg-brand-teal/10 hover:text-brand-teal text-slate-600 font-mono transition-colors"
            >
              #{tag}
            </button>
          ))}
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-[11px] font-bold text-red-600 hover:text-red-700 ml-auto transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Featured Hero Article (Only displayed on default view) */}
      {featuredPost && (
        <section aria-label="Featured Technical Guide">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-industrial-lg grid grid-cols-1 lg:grid-cols-12 group hover:shadow-2xl transition-all duration-300">
            {/* Featured Image */}
            <div className="lg:col-span-7 relative h-72 sm:h-80 lg:h-auto min-h-[280px] sm:min-h-[360px] overflow-hidden bg-brand-darkNavy">
              <img
                src={
                  featuredPost.featured_image ||
                  '/images/gallery/luxury-interior-flooring.jpg'
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="font-mono text-[11px] font-black px-3 py-1.5 rounded-lg bg-brand-teal text-white shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 animate-pulse" />
                  <span>★ LAB SPOTLIGHT</span>
                </span>
                <span className="font-mono text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-brand-darkNavy/90 backdrop-blur-md text-white shadow-md uppercase tracking-wider">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            {/* Featured Text Content */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 font-semibold text-brand-teal">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.reading_time || '6 min read'}
                  </span>
                  <span>•</span>
                  <span>
                    {featuredPost.published_at
                      ? formatDate(featuredPost.published_at)
                      : 'Recently Updated'}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} prefetch={true} className="block group/title">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-darkNavy group-hover/title:text-brand-teal transition-colors font-display leading-[1.2] tracking-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Key takeaway pill */}
                <div className="p-3 rounded-xl bg-brand-lightBg border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <p className="text-[11px] sm:text-xs text-slate-700 font-medium">
                    Covers tensile bond strengths, shear adhesion testing, and BIS compliance guidelines for Indian job sites.
                  </p>
                </div>
              </div>

              {/* Author & CTA Button */}
              <div className="pt-5 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-brand-teal flex items-center justify-center font-bold text-xs font-mono">
                    RH
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-darkNavy">
                      {featuredPost.author.split('(')[0].trim()}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Technical Specialist
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  prefetch={true}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-tealDark active:scale-95 text-white font-display font-bold text-xs sm:text-sm shadow-industrial hover:shadow-industrial-glow transition-all"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Articles */}
      <section aria-label="Technical Articles List" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-2xl font-black text-brand-darkNavy font-display tracking-tight">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === 'All'
                ? `All Technical Guides (${filteredBlogs.length})`
                : `${selectedCategory} Guides (${filteredBlogs.length})`}
            </h2>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing {displayPosts.length} article{displayPosts.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Empty State */}
        {displayPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200/90 shadow-sm space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-brand-darkNavy font-display">
              No matching guides found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any articles matching your search query &quot;{searchQuery}&quot;. Try exploring other categories or clearing your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-darkNavy text-white font-bold text-xs active:scale-95 transition-all"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-industrial hover:shadow-industrial-lg hover:border-brand-teal/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900 border-b border-slate-100">
                    <img
                      src={
                        post.featured_image ||
                        '/images/gallery/luxury-interior-flooring.jpg'
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-brand-darkNavy/90 backdrop-blur-md text-white uppercase tracking-wider border border-white/10">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-brand-teal" />
                        {post.reading_time || '5 min read'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-mono">
                      <Calendar className="w-3 h-3 text-brand-teal" />
                      <span>
                        {post.published_at ? formatDate(post.published_at) : 'Recent'}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`} prefetch={true} className="block group/link">
                      <h3 className="text-base sm:text-lg font-bold text-brand-darkNavy group-hover/link:text-brand-teal transition-colors font-display line-clamp-2 leading-snug tracking-tight">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer with Author & Action */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-sans">
                    <User className="w-3.5 h-3.5 text-brand-teal" />
                    <span className="truncate max-w-[110px] sm:max-w-[130px]">
                      {post.author.split('(')[0].trim()}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    prefetch={true}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy group-hover:text-brand-teal transition-colors active:scale-95"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Contractor & Engineer Consultation Box */}
      <section
        aria-label="Direct Engineering Consultation"
        className="rounded-3xl bg-gradient-to-br from-[#061626] via-[#0B1E34] to-[#0D243F] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-brand-teal/30 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/20 text-brand-teal border border-brand-teal/30 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Technical Advisory Service</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-display tracking-tight text-white">
              Have a Site-Specific Tiling or Waterproofing Challenge?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Connect directly with Manoj Prajapat at RockHold. We advise on IS 15477 adhesive classification, large-format tile back-buttering, substrate moisture tests, and offer free job site sample deliveries across Rajasthan.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Debonding Assurance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Govt Lab Batch Test Reports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Contractor Bulk Pricing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href="https://wa.me/919001667917?text=Hello%20RockHold,%20I%20am%20a%20contractor/engineer%20and%20need%20technical%20advice%20for%20a%20tiling/waterproofing%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-display font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition-transform"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Advisory Desk</span>
            </a>

            <a
              href="tel:+919001667917"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-semibold text-xs sm:text-sm border border-white/20 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-brand-teal" />
              <span>Call +91 90016 67917</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
