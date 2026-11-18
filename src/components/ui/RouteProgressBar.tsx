'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Finish loading on route change
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Intercept clicks on links for instant feedback
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Check if it's an internal link
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.startsWith('/#') &&
        targetAttr !== '_blank'
      ) {
        if (href !== window.location.pathname) {
          setLoading(true);
          setProgress(25);
          setTimeout(() => setProgress((prev) => (prev < 70 ? 70 : prev)), 80);
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => document.removeEventListener('click', handleDocumentClick, { capture: true });
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-all duration-200 ease-out"
      style={{
        height: '3px',
        opacity: progress === 100 ? 0 : 1,
      }}
    >
      <div
        className="h-full bg-gradient-to-r from-brand-teal via-[#4DE5F5] to-white shadow-[0_0_12px_rgba(0,169,183,0.8)] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
