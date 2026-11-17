'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Layers,
  Inbox,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Plus,
  Eye,
  BookOpen,
} from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface StatsData {
  totalProducts: number;
  totalCategories: number;
  totalEnquiries: number;
  pendingEnquiries: number;
  totalBlogs?: number;
  recentEnquiries: any[];
  recentProducts: any[];
  categoryStats: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      <AdminHeader
        title="Executive Dashboard"
        subtitle="RockHold Real-Time Operation Metrics & Enquiries"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Products */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-industrial flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Products
              </div>
              <div className="text-3xl font-black text-brand-darkNavy mt-1 font-display">
                {loading ? '...' : stats?.totalProducts || 0}
              </div>
              <div className="text-xs text-brand-teal font-medium mt-1">
                Active in Catalog
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Total Enquiries */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-industrial flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Customer Enquiries
              </div>
              <div className="text-3xl font-black text-brand-darkNavy mt-1 font-display">
                {loading ? '...' : stats?.totalEnquiries || 0}
              </div>
              <div className="text-xs text-emerald-600 font-medium mt-1">
                Logged in MySQL
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Pending Enquiries */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-industrial flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pending Follow-Ups
              </div>
              <div className="text-3xl font-black text-amber-600 mt-1 font-display">
                {loading ? '...' : stats?.pendingEnquiries || 0}
              </div>
              <div className="text-xs text-amber-600/80 font-medium mt-1">
                Awaiting Contact
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Categories */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-industrial flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Product Categories
              </div>
              <div className="text-3xl font-black text-brand-darkNavy mt-1 font-display">
                {loading ? '...' : stats?.totalCategories || 0}
              </div>
              <div className="text-xs text-brand-teal font-medium mt-1">
                Active Sections
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-teal/15 text-brand-teal flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-darkNavy rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="text-lg font-bold font-display">
              Management Quick Access
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Rapidly manage your catalogue, customer leads, and company settings.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-teal hover:bg-brand-tealDark text-white text-xs font-bold shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Link>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              <Inbox className="w-4 h-4" /> View Enquiries
            </Link>
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Blogs ({stats?.totalBlogs || 0})
            </Link>
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Two-Column Grid: Recent Enquiries (7 cols) + Category Distribution (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Enquiries (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-industrial p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-brand-darkNavy font-display">
                  Recent Enquiries
                </h3>
                <p className="text-xs text-slate-500">
                  Latest client and contractor contact requests
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-8 text-xs text-slate-400">Loading enquiries...</div>
            ) : stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {stats.recentEnquiries.map((enq: any) => (
                  <div
                    key={enq.id}
                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-brand-darkNavy">
                          {enq.name}
                        </span>
                        <Badge
                          variant={
                            enq.status === 'completed'
                              ? 'success'
                              : enq.status === 'contacted'
                              ? 'teal'
                              : 'warning'
                          }
                        >
                          {enq.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {enq.phone} â€¢ {enq.product_name || enq.subject || 'General Enquiry'}
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      {formatDate(enq.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                No customer enquiries yet. Submit a test enquiry on the website!
              </div>
            )}
          </div>

          {/* Category Distribution & Highlights (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-industrial p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-brand-darkNavy font-display">
                Categories Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Products distribution across manufacturing lines
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {stats?.categoryStats?.map((c: any) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="text-xs font-bold text-brand-darkNavy">
                    {c.name}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-brand-navy/10 text-brand-navy font-bold text-xs">
                    {c.product_count} {c.product_count === 1 ? 'Product' : 'Products'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/admin/categories"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
              >
                <span>Manage Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
