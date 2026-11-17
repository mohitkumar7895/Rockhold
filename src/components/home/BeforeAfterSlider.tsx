'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Droplets, CheckCircle2, Zap } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-brand-lightBg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/30 text-xs font-mono uppercase tracking-widest mb-3">
            <Droplets className="w-3.5 h-3.5" />
            <span>Surface Restoration Technology</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-darkNavy tracking-tight font-display">
            Active Chemical Cleaning Power
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-base leading-relaxed">
            Drag the comparison slider to witness how <strong>RockHold R01 Tile Cleaner</strong> and <strong>Tap Cleaner</strong> eliminate cement residue, tough hard-water limescale, and whitish bucket stains in just 5–10 minutes.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Interactive Slider (7 cols) */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={(e) => {
                setIsDragging(true);
                handleTouchMove(e);
              }}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white select-none cursor-ew-resize bg-slate-900 touch-none"
            >
              {/* Image 2: AFTER (Restored clean surface) */}
              <div className="absolute inset-0">
                <img
                  src="/images/gallery/cleaner-application.jpg"
                  alt="Restored tile surface after RockHold cleaner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-brand-navy/90 text-white font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-brand-teal/50 shadow-lg backdrop-blur-md">
                  AFTER: Clean
                </div>
              </div>

              {/* Image 1: BEFORE (White stains & grout residue) with clip-path */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="/images/gallery/tap-cleaning-action.jpg"
                  alt="Stained tiles and tap before cleaning"
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                />
                <div className="absolute bottom-3 left-3 bg-red-950/90 text-red-200 font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-red-500/50 shadow-lg backdrop-blur-md">
                  BEFORE: Scaling
                </div>
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Handle Badge */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-teal text-white shadow-xl flex items-center justify-center border-2 border-white text-xs font-bold">
                  ↔
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-500 mt-2 sm:mt-3 px-1">
              <span>← Drag for Restored</span>
              <span>Drag for Stains →</span>
            </div>
          </div>

          {/* Right Column: Product Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-industrial space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-darkNavy font-display">
                    Rapid Active Formulation
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-mono">
                    Zero Abrasive Scrubbing • Safe on Glaze
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Efflorescence Eraser:</strong> Dissolves white mineral salts leeching through grout joints without damaging tile glaze.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Limescale & Bucket Spots:</strong> Removes hard ground-water rings under plastic buckets with an effortless 5-minute soak.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span><strong>Chrome-Friendly Tap Cleaner:</strong> Specially formulated non-corrosive acid matrix to clean bath faucets without peeling chrome plating.</span>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link
                  href="/products/r01-tile-cleaner"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-navy hover:bg-brand-darkNavy text-white font-bold text-xs shadow-md active:scale-95 transition-all text-center"
                >
                  <span>Explore R01 Tile Cleaner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/products/tap-cleaner"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-teal hover:bg-brand-tealDark text-white font-bold text-xs shadow-md active:scale-95 transition-all text-center"
                >
                  <span>Explore Tap Cleaner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
