'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Inbox,
  Image as ImageIcon,
  Settings,
  Users,
  LogOut,
  ExternalLink,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Layers },
    { name: 'Blogs & SEO', href: '/admin/blogs', icon: BookOpen },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Website Settings', href: '/admin/settings', icon: Settings },
    { name: 'Admin Users', href: '/admin/admins', icon: Users },
  ];

  return (
    <aside
      className={`w-64 bg-brand-darkNavy text-slate-300 flex flex-col justify-between shrink-0 border-r border-brand-navy/80 min-h-screen transition-transform duration-300 fixed md:static inset-y-0 left-0 z-50 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl p-1.5 flex items-center justify-center border border-white/20">
              <img
                src="/images/logo/rockhold-mark.png"
                alt="RockHold"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-black text-white tracking-tight">
                  Rock<span className="text-brand-teal">Hold</span>
                </span>
                <span className="text-[9px] bg-brand-teal/20 text-brand-teal px-1 py-0.2 rounded font-bold">
                  ADMIN
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider -mt-0.5">
                Control Center
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen?.(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-teal text-white shadow-md font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Footer */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-brand-teal" />
            View Public Site
          </span>
          <span className="text-[10px] text-brand-teal font-mono">rockhold.in</span>
        </Link>

        {user && (
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal border border-brand-teal/30 flex items-center justify-center font-bold text-xs shrink-0">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="truncate text-xs">
                <div className="font-bold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-slate-400 capitalize">{user.role}</div>
              </div>
            </div>

            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
