import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { query } from '@/lib/db';
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
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    const rows = await query<any[]>(
      'SELECT title, excerpt, seo_title, seo_description, featured_image, published_at FROM blog_posts WHERE slug = ? AND is_published = 1 LIMIT 1',
      [slug]
    );

    if (!rows || rows.length === 0) {
      return { title: 'Article Not Found | RockHold' };
    }

    const post = rows[0];
    const title = post.seo_title || `${post.title} | RockHold Technical Blog`;
    const description = post.seo_description || post.excerpt;
    const image = post.featured_image || '/images/gallery/luxury-interior-flooring.jpg';

    return {
      title,
      description,
      alternates: {
        canonical: `https://rockhold.in/blog/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://rockhold.in/blog/${slug}`,
        type: 'article',
        publishedTime: post.published_at,
        images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    return { title: 'Technical Guide | RockHold' };
  }
}

async function getBlogPost(slug: string) {
  try {
    const [postRows, relatedRows] = await Promise.all([
      query<any[]>('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1 LIMIT 1', [slug]),
      query<any[]>('SELECT * FROM blog_posts WHERE slug != ? AND is_published = 1 ORDER BY id DESC LIMIT 3', [slug]),
    ]);

    if (!postRows || postRows.length === 0) return null;

    // Increment view counter
    await query('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?', [postRows[0].id]);

    return {
      post: postRows[0] as BlogPost,
      related: relatedRows as BlogPost[],
    };
  } catch (error) {
    console.error('Fetch single blog error:', error);
    return null;
  }
}

// Simple Markdown Formatter for Article Content
function renderFormattedContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={index} className="text-2xl sm:text-3xl font-black text-brand-darkNavy mt-8 mb-4 font-display">
          {trimmed.replace('# ', '')}
        </h1>
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="text-xl sm:text-2xl font-bold text-brand-darkNavy mt-7 mb-3 font-display border-b border-slate-100 pb-2">
          {trimmed.replace('## ', '')}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-lg font-bold text-brand-darkNavy mt-5 mb-2 font-display">
          {trimmed.replace('### ', '')}
        </h3>
      );
      return;
    }

    // Dividers
    if (trimmed === '---') {
      elements.push(<hr key={index} className="my-8 border-slate-200" />);
      return;
    }

    // Bullet Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      elements.push(
        <li key={index} className="ml-5 list-disc text-slate-700 my-1 leading-relaxed text-sm">
          <span dangerouslySetInnerHTML={{ __html: itemText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </li>
      );
      return;
    }

    // Numbered Lists
    if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      elements.push(
        <li key={index} className="ml-5 list-decimal text-slate-700 my-1 leading-relaxed text-sm">
          <span dangerouslySetInnerHTML={{ __html: itemText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </li>
      );
      return;
    }

    // Paragraphs
    if (trimmed) {
      elements.push(
        <p
          key={index}
          className="text-slate-700 my-3 leading-relaxed text-sm sm:text-base font-sans"
          dangerouslySetInnerHTML={{
            __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      );
    }
  });

  return elements;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const data = await getBlogPost(params.slug);
  if (!data) notFound();

  const { post, related } = data;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ? `https://rockhold.in${post.featured_image}` : 'https://rockhold.in/images/gallery/luxury-interior-flooring.jpg',
    datePublished: post.published_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: post.author || 'RockHold Technical Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RockHold',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rockhold.in/images/logo/rockhold-mark.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rockhold.in/blog/${post.slug}`,
    },
  };

  const waMessage = encodeURIComponent(
    `Hello RockHold, I read your article "${post.title}". I would like to consult with your technical team regarding our project requirement.`
  );
  const waLink = `https://wa.me/919001667917?text=${waMessage}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-brand-lightBg min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-8">
            <Link href="/" className="hover:text-brand-navy transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-brand-navy transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-teal truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-brand-navy text-white uppercase tracking-wider">
                {post.category}
              </span>
              <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-teal" />
                {post.reading_time || '5 min read'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkNavy tracking-tight font-display leading-[1.15]">
              {post.title}
            </h1>

            {/* Meta bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-medium">
                <div className="w-7 h-7 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-xs">
                  RH
                </div>
                <span>{post.author}</span>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <span>{post.published_at ? formatDate(post.published_at) : 'Recent'}</span>
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          {post.featured_image && (
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-10 shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Article Body Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-industrial space-y-6">
            {/* Excerpt Lead */}
            <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic border-l-4 border-brand-teal pl-4 py-1 bg-brand-teal/5 rounded-r-xl">
              {post.excerpt}
            </p>

            {/* Rendered Body */}
            <div className="prose max-w-none pt-2">
              {renderFormattedContent(post.content)}
            </div>

            {/* Direct Project Consultation Callout */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-navy via-brand-darkNavy to-[#041322] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-brand-teal/20 text-brand-teal border border-brand-teal/30">
                  TECHNICAL SUPPORT & SUPPLY
                </span>
                <h3 className="text-xl font-bold font-display">
                  Require Project Specification Support?
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Speak directly with Manoj Prajapat at RockHold for contractor bulk rates, sample kits, and on-site adhesion guidance.
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp Consultation</span>
                </a>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-navy hover:text-brand-teal transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Knowledge Hub</span>
              </Link>
            </div>
          </div>

          {/* Related Articles Section */}
          {related && related.length > 0 && (
            <div className="mt-16 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-brand-darkNavy font-display">
                  Related Technical Articles
                </h2>
                <Link href="/blog" className="text-xs font-bold text-brand-teal hover:underline">
                  View All
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
                      <h4 className="text-sm font-bold text-brand-darkNavy group-hover:text-brand-teal transition-colors mt-1 font-display line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{rel.reading_time || '5 min'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-teal group-hover:translate-x-1 transition-transform" />
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
