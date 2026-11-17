'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ExternalLink, Bell, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AdminHeader({
  title,
  subtitle,
  onMenuToggle,
}: {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-brand-darkNavy font-display">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50 text-xs font-semibold transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Live Site</span>
        </Link>

        {user && (
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-brand-darkNavy leading-tight">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-400 capitalize">{user.role}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
