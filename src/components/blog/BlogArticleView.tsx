'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Copy,
  Check,
  List,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogArticleViewProps {
  post: BlogPost;
  related: BlogPost[];
}

export function BlogArticleView({ post, related }: BlogArticleViewProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Track scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy article link to clipboard
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // WhatsApp share link
  const articleUrl = typeof window !== 'undefined' ? window.location.href : `https://rockhold.in/blog/${post.slug}`;
  const shareWaUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out this technical guide by RockHold: "${post.title}" - ${articleUrl}`
  )}`;

  // Direct consultation message
  const consultWaUrl = `https://wa.me/919001667917?text=${encodeURIComponent(
    `Hello RockHold, I read your article "${post.title}". I would like technical guidance for our project.`
  )}`;

  // Extract table of contents (H2 headings) from content
  const tableOfContents = useMemo(() => {
    if (!post.content) return [];
    const lines = post.content.split('\n');
    const toc: { id: string; text: string }[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '').trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        toc.push({ id, text });
      }
    });

    return toc;
  }, [post.content]);

  // Enhanced Markdown Formatter with Markdown Table Parsing
  const renderedContent = useMemo(() => {
    const lines = (post.content || '').split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const trimmed = lines[i].trim();

      // Check for Markdown Table (line starts with | and next line has |---)
      if (
        trimmed.startsWith('|') &&
        i + 1 < lines.length &&
        lines[i + 1].trim().startsWith('|') &&
        lines[i + 1].includes('---')
      ) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        if (tableLines.length >= 2) {
          const headerRow = tableLines[0]
            .split('|')
            .filter((cell, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => c.trim());

          const bodyRows = tableLines.slice(2).map((row) =>
            row
              .split('|')
              .filter((cell, idx, arr) => idx > 0 && idx < arr.length - 1)
              .map((c) => c.trim())
          );

          elements.push(
            <div
              key={`table-${i}`}
              className="my-6 sm:my-8 overflow-x-auto rounded-2xl border border-slate-200/90 shadow-sm"
            >
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-navy text-white">
                    {headerRow.map((cell, cIdx) => (
                      <th
                        key={cIdx}
                        className="py-3 px-3.5 sm:px-4 font-display font-bold border-b border-brand-teal/30 whitespace-nowrap"
                        dangerouslySetInnerHTML={{
                          __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                        }}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {bodyRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={rIdx % 2 === 0 ? 'bg-white hover:bg-slate-50/80' : 'bg-slate-50/50 hover:bg-slate-50'}
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="py-2.5 px-3.5 sm:px-4 text-slate-700 font-sans"
                          dangerouslySetInnerHTML={{
                            __html: cell.replace(
                              /\*\*(.*?)\*\*/g,
                              '<strong className="text-brand-darkNavy font-semibold">$1</strong>'
                            ),
                          }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // Headers (H1, H2, H3)
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1
            key={`h1-${i}`}
            className="text-2xl sm:text-3xl font-black text-brand-darkNavy mt-8 mb-4 font-display tracking-tight"
          >
            {trimmed.replace('# ', '')}
          </h1>
        );
        i++;
        continue;
      }

      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '');
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        elements.push(
          <h2
            key={`h2-${i}`}
            id={id}
            className="text-xl sm:text-2xl font-black text-brand-darkNavy mt-8 mb-4 pt-4 font-display tracking-tight border-b border-slate-100 pb-2.5 scroll-mt-24"
          >
            {text}
          </h2>
        );
        i++;
        continue;
      }

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${i}`}
            className="text-base sm:text-lg font-bold text-brand-tealDark mt-6 mb-2.5 font-display"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal Rule
      if (trimmed === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-slate-200" />);
        i++;
        continue;
      }

      // Bullet Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.replace(/^[-*]\s+/, '');
        elements.push(
          <li
            key={`li-${i}`}
            className="ml-5 list-disc text-slate-700 my-1.5 leading-relaxed text-sm sm:text-base font-sans"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: itemText.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong className="text-brand-darkNavy font-semibold">$1</strong>'
                ),
              }}
            />
          </li>
        );
        i++;
        continue;
      }

      // Numbered Lists
      if (/^\d+\.\s+/.test(trimmed)) {
        const itemText = trimmed.replace(/^\d+\.\s+/, '');
        elements.push(
          <li
            key={`oli-${i}`}
            className="ml-5 list-decimal text-slate-700 my-1.5 leading-relaxed text-sm sm:text-base font-sans"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: itemText.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong className="text-brand-darkNavy font-semibold">$1</strong>'
                ),
              }}
            />
          </li>
        );
        i++;
        continue;
      }

      // Paragraphs
      if (trimmed) {
        elements.push(
          <p
            key={`p-${i}`}
            className="text-slate-700 my-3.5 leading-relaxed text-sm sm:text-base font-sans"
            dangerouslySetInnerHTML={{
              __html: trimmed.replace(
                /\*\*(.*?)\*\*/g,
                '<strong className="text-brand-darkNavy font-semibold">$1</strong>'
              ),
            }}
          />
        );
      }

      i++;
    }

    return elements;
  }, [post.content]);

  return (
    <>
      {/* Top Fixed Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-teal via-[#5EE2EE] to-brand-navy z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="bg-brand-lightBg min-h-screen py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-6 sm:mb-8 overflow-x-auto pb-1"
          >
            <Link href="/" className="hover:text-brand-teal transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/blog" className="hover:text-brand-teal transition-colors">
              Knowledge Hub
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-brand-teal font-medium truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="space-y-4 sm:space-y-5 mb-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-brand-navy text-white uppercase tracking-wider shadow-sm">
                {post.category}
              </span>
              <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-brand-teal" />
                <span>{post.reading_time || '5 min read'}</span>
              </span>
              <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-brand-teal" />
                <span>
                  {post.published_at ? formatDate(post.published_at) : 'Recent'}
                </span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-darkNavy tracking-tight font-display leading-[1.18] sm:leading-[1.12]">
              {post.title}
            </h1>

            {/* Author bar & Interactive Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-teal flex items-center justify-center font-bold text-sm font-mono shadow-sm">
                  RH
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-darkNavy font-display">
                    {post.author}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    RockHold Technical & Laboratory Team
                  </div>
                </div>
              </div>

              {/* Share & Copy Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-brand-teal text-slate-700 hover:text-brand-darkNavy text-xs font-semibold shadow-sm active:scale-95 transition-all"
                  title="Copy link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={shareWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </a>
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          {post.featured_image && (
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-8 sm:mb-10 shadow-2xl border-2 sm:border-4 border-white bg-brand-darkNavy">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Article Body Box */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 border border-slate-200/90 shadow-industrial space-y-6 sm:space-y-8">
            {/* Excerpt Lead */}
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-teal/5 border-l-4 border-brand-teal">
              <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed font-sans italic">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>

            {/* Quick Table of Contents (if H2 headings exist) */}
            {tableOfContents.length > 0 && (
              <div className="rounded-2xl p-4 sm:p-5 bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-brand-navy mb-3">
                  <List className="w-4 h-4 text-brand-teal" />
                  <span>Table of Contents</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm font-sans">
                  {tableOfContents.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-600 hover:text-brand-teal hover:underline flex items-center gap-2 transition-colors py-0.5"
                      >
                        <span className="text-[10px] font-mono text-brand-teal font-bold">
                          {idx + 1}.
                        </span>
                        <span>{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rendered Body Content */}
            <div className="prose max-w-none pt-2">{renderedContent}</div>

            {/* Direct Project Consultation Callout Box */}
            <div className="mt-8 sm:mt-12 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#061626] via-[#0B1E34] to-[#0D243F] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-brand-teal/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-brand-teal/20 text-brand-teal border border-brand-teal/30 inline-block">
                  TECHNICAL SUPPORT & SUPPLY
                </span>
                <h3 className="text-lg sm:text-2xl font-black font-display tracking-tight">
                  Require Project Specification Support?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                  Speak directly with Manoj Prajapat at RockHold for contractor bulk pricing, sample kits, and on-site adhesion tests across Rajasthan.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-2.5">
                <a
                  href={consultWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-display font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition-transform"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp Consultation</span>
                </a>
              </div>
            </div>

            {/* Back to Blog Button */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-teal transition-colors active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Technical Guides</span>
              </Link>
            </div>
          </div>

          {/* Related Articles Section */}
          {related && related.length > 0 && (
            <div className="mt-14 sm:mt-16 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-lg sm:text-2xl font-black text-brand-darkNavy font-display tracking-tight">
                  Related Technical Guides
                </h2>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
                >
                  <span>Explore All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-teal/40 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-teal uppercase">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-brand-darkNavy group-hover:text-brand-teal transition-colors mt-1.5 font-display line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{rel.reading_time || '5 min'}</span>
                      <span className="text-brand-teal font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
