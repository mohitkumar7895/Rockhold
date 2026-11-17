'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  PhoneCall,
  Scale,
  Package,
} from 'lucide-react';

interface SubstrateOption {
  id: string;
  name: string;
  recommendedProduct: string;
  productSlug: string;
  adhesiveType: string;
  coveragePerBag: number; // in sq ft for 20kg bag at 3mm
  description: string;
  tensileStrength: string;
  suitableColors: string;
}

const SUBSTRATE_OPTIONS: SubstrateOption[] = [
  {
    id: 'ceramic-interior',
    name: 'Ceramic Tiles (Interior Floors & Walls)',
    recommendedProduct: 'RockHold R-11 Tile Adhesive',
    productSlug: '/products/r-11-tile-adhesive',
    adhesiveType: 'Type 1 Polymer-Modified',
    coveragePerBag: 55, // approx 50-60 sq.ft
    description: 'Perfect for standard ceramic, small vitrified tiles, domestic living rooms, bedrooms, and kitchen walls.',
    tensileStrength: 'Min 0.5 MPa (IS 15477 Type 1)',
    suitableColors: 'Grey & White',
  },
  {
    id: 'vitrified-medium',
    name: 'Vitrified Tiles & Tile-on-Tile (Up to 4x2 ft)',
    recommendedProduct: 'RockHold R-21 Tile Adhesive',
    productSlug: '/products/r-21-tile-adhesive',
    adhesiveType: 'Type 2 High-Strength Polymer',
    coveragePerBag: 55,
    description: 'Engineered for dense vitrified tiles, terracotta, pavers, brick, and tile-on-tile renovation without hacking old floors.',
    tensileStrength: 'Min 0.5 MPa with high shear flexibility',
    suitableColors: 'Grey & White',
  },
  {
    id: 'large-slab-stone',
    name: 'Large Porcelain Slabs & Natural Stone',
    recommendedProduct: 'RockHold R-51 Tile Adhesive',
    productSlug: '/products/r-51-tile-adhesive',
    adhesiveType: 'Type 3 Heavy-Duty Polymer',
    coveragePerBag: 50,
    description: 'Ultra-strong bond for 6x4 ft porcelain slabs, glass mosaic, marble, granite, external facades, and shaded patio areas.',
    tensileStrength: 'Min 1.0 MPa (IS 15477 Type 3 High Adhesion)',
    suitableColors: 'Grey & White',
  },
  {
    id: 'wet-area-pools',
    name: 'Commercial Pools, Heavy Traffic & Wet Joints',
    recommendedProduct: 'RockHold Stain-Free Epoxy Grout',
    productSlug: '/products/epoxy-grout',
    adhesiveType: '3-Component Impervious Epoxy Resin',
    coveragePerBag: 100, // running feet / sq.ft ratio
    description: '100% water-tight, chemical-resistant and acid-proof epoxy formulation for swimming pools, commercial kitchens, and showers.',
    tensileStrength: '50.45 MPa Compressive | 7.55 MPa Bond',
    suitableColors: 'Range of Premium Shades',
  },
];

export function AdhesiveCalculator() {
  const [selectedSubstrateId, setSelectedSubstrateId] = useState(SUBSTRATE_OPTIONS[1].id);
  const [areaSqFt, setAreaSqFt] = useState<number>(350);
  const [thicknessMm, setThicknessMm] = useState<number>(3);

  const selectedSubstrate =
    SUBSTRATE_OPTIONS.find((s) => s.id === selectedSubstrateId) || SUBSTRATE_OPTIONS[1];

  // Calculate required bags
  // Thickness multiplier: baseline is 3mm
  const thicknessFactor = thicknessMm / 3;
  const effectiveCoverage = selectedSubstrate.coveragePerBag / thicknessFactor;
  const rawBags = areaSqFt / effectiveCoverage;
  const recommendedBags = Math.max(1, Math.ceil(rawBags * 1.05)); // 5% wastage allowance

  // WhatsApp Enquiry Link
  const waMessage = encodeURIComponent(
    `Hello RockHold, I used your website Material Calculator for ${areaSqFt} sq.ft (${selectedSubstrate.name}). Recommended: ${recommendedBags} bags of ${selectedSubstrate.recommendedProduct} (${selectedSubstrate.adhesiveType}). Please share delivery terms and pricing.`
  );
  const waLink = `https://wa.me/919001667917?text=${waMessage}`;

  return (
    <section id="calculator" className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 blueprint-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-brand-navy rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/15 text-brand-teal border border-brand-teal/30 text-xs font-mono uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Engineering Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
            Tile Adhesive & Material Estimator
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Select your tile substrate and floor or wall area to instantly calculate the exact formulation, quantity of 20kg bags, and bond strength required for zero failure.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Form: Substrate & Area Sliders (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl space-y-5 sm:space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-brand-teal uppercase tracking-wider mb-3">
                1. Select Tile Type / Application Substrate
              </label>
              <div className="space-y-2 sm:space-y-2.5">
                {SUBSTRATE_OPTIONS.map((sub) => {
                  const isSelected = sub.id === selectedSubstrateId;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubstrateId(sub.id)}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-transform duration-75 active:scale-[0.98] cursor-pointer flex items-start gap-3 sm:gap-3.5 ${
                        isSelected
                          ? 'bg-brand-teal/20 border-brand-teal text-white shadow-industrial-glow'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-brand-teal bg-brand-teal text-white' : 'border-slate-500'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs sm:text-base leading-snug">
                          {sub.name}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {sub.description}
                        </div>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-brand-teal shrink-0 hidden sm:inline-block">
                        {sub.adhesiveType.split(' ')[0]} {sub.adhesiveType.split(' ')[1]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Area Slider */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold text-brand-teal uppercase tracking-wider">
                  2. Project Surface Area (Sq. Ft.)
                </label>
                <div className="font-mono font-black text-lg sm:text-xl text-white">
                  {areaSqFt.toLocaleString()} <span className="text-xs text-slate-400 font-normal">sq.ft</span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="3000"
                step="25"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-teal"
              />

              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1">
                <span>50 sq.ft</span>
                <span>500 sq.ft</span>
                <span>3,000 sq.ft</span>
              </div>
            </div>

            {/* Thickness Selector */}
            <div className="pt-2 border-t border-white/10">
              <label className="block text-xs font-mono font-bold text-brand-teal uppercase tracking-wider mb-2">
                3. Application Bed Thickness
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[3, 4.5, 6].map((mm) => (
                  <button
                    key={mm}
                    type="button"
                    onClick={() => setThicknessMm(mm)}
                    className={`py-2 px-1 sm:px-3 rounded-xl border text-[10px] sm:text-xs font-mono font-bold text-center transition-all ${
                      thicknessMm === mm
                        ? 'bg-brand-teal text-white border-brand-teal shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mm} mm {mm === 3 ? '(Std)' : mm === 4.5 ? '(Med)' : '(Hvy)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Result Card: Recommended Formulation & Bags (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy via-[#0C2A48] to-brand-darkNavy border-2 border-brand-teal/40 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative">
            <div className="corner-bracket-tl" />
            <div className="corner-bracket-br" />

            <div className="text-center pb-5 sm:pb-6 border-b border-white/10">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-brand-teal/20 text-brand-teal font-bold border border-brand-teal/30">
                RECOMMENDED FORMULATION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2.5 sm:mt-3 font-display">
                {selectedSubstrate.recommendedProduct}
              </h3>
              <p className="text-xs text-brand-teal font-mono mt-1 font-semibold">
                {selectedSubstrate.adhesiveType}
              </p>
            </div>

            {/* Big Stat Requirement */}
            <div className="my-5 sm:my-6 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xs text-slate-300 font-mono uppercase tracking-wider">
                Estimated Material Quantity
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-white my-1 font-display">
                {recommendedBags}{' '}
                <span className="text-base sm:text-xl font-bold text-slate-300">
                  {selectedSubstrateId === 'wet-area-pools' ? 'Kits' : 'Bags (20kg)'}
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                Includes +5% site cutting & wastage allowance
              </div>
            </div>

            {/* Technical Parameters */}
            <div className="space-y-2 text-xs font-mono mb-6">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400">Tensile Bond Strength:</span>
                <span className="text-brand-teal font-bold">{selectedSubstrate.tensileStrength}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400">Available Shades:</span>
                <span className="text-white font-bold">{selectedSubstrate.suitableColors}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400">Application Bed:</span>
                <span className="text-white font-bold">{thicknessMm} mm Notch Trowel</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] active:scale-95 text-white font-bold text-sm shadow-md transition-transform duration-75 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Get Instant Quote on WhatsApp</span>
              </a>

              <Link
                href={selectedSubstrate.productSlug}
                prefetch={true}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs border border-white/20 transition-transform duration-75 cursor-pointer"
              >
                <span>Read Technical Datasheet</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-teal" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
