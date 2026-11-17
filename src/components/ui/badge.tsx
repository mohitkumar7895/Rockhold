import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  className,
  variant = 'default',
  children,
}: {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'teal';
  children: React.ReactNode;
}) {
  const variants = {
    default: 'bg-brand-navy text-white',
    secondary: 'bg-slate-100 text-slate-800',
    outline: 'border border-slate-300 text-slate-700',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    teal: 'bg-brand-teal/15 text-brand-teal border border-brand-teal/30 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-100 shadow-industrial transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-200/80', className)}
    />
  );
}
