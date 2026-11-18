import React from 'react';

export default function WebsiteLoading() {
  return (
    <div className="min-h-screen bg-brand-lightBg py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-6 w-48 bg-slate-200 rounded-full mx-auto" />
          <div className="h-10 w-96 max-w-full bg-slate-300 rounded-2xl mx-auto" />
          <div className="h-4 w-72 max-w-full bg-slate-200 rounded-lg mx-auto" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4"
            >
              <div className="h-48 bg-slate-100 rounded-2xl" />
              <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
              <div className="h-3.5 w-1/2 bg-slate-200 rounded" />
              <div className="h-8 w-full bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
