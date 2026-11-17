'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Calculator,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Package,
  Layers,
  Award,
} from 'lucide-react';
import { useWebsite } from '@/context/WebsiteContext';

export function HeroSection() {
  const { settings } = useWebsite();

  // Subtle 3D perspective tilt on mouse move
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const phone = settings.phone_number || '+91 90016 67917';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <section className="relative min-h-[85vh] bg-gradient-to-b from-[#092B4C] via-[#0B2E52] to-[#06182B] text-white flex flex-col justify-center overflow-hidden pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20">
      {/* Background Architectural Patterns & Ambient Glow */}
      <div className="absolute inset-0 blueprint-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-teal/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-brand-teal/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Brand Identity, Powerful Headline, Clean CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            {/* Prominent Brand Eyebrow Badge with Clean Borderless Logo Mark */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-teal/30 backdrop-blur-md text-white shadow-sm">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo/rockhold-mark.jpg"
                  alt="RockHold Logo Mark"
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-white font-display">
                  ROCK<span className="text-brand-teal">HOLD</span>™
                </span>
                <span className="text-brand-teal/50 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium hidden sm:inline">
                  Premium Construction Chemicals
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] font-display">
              Strong Bonds.{' '}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-[#5EE2EE] to-white">
                Superior Performance.
              </span>
            </h1>

            {/* Clean, Readable Value Proposition */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              High-performance polymer-modified tile adhesives, impervious 3-component epoxy grouts, and advanced structural waterproofing compounds engineered for long-lasting structural durability.
            </p>

            {/* High-Converting Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {/* Primary: Explore Products */}
              <Link
                href="/products"
                prefetch={true}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl bg-brand-teal hover:bg-brand-tealDark active:scale-95 text-white font-bold text-sm sm:text-base shadow-industrial hover:shadow-industrial-glow transition-transform duration-75 cursor-pointer group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary: Instant Smooth Scroll to Interactive Calculator */}
              <a
                href="#calculator"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-transform duration-75 cursor-pointer group"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal group-hover:rotate-12 transition-transform" />
                <span>Calculate Bags Needed</span>
              </a>

              {/* Tertiary: Quick Phone / WhatsApp Consultation */}
              <a
                href={`tel:${cleanPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300 hover:text-white font-medium text-sm sm:text-base border border-white/10 transition-transform duration-75 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-brand-teal" />
                <span>Call Manoj Prajapat</span>
              </a>
            </div>

            {/* Clean Key Performance Pillars */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left space-y-0.5">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-display">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs text-brand-teal font-semibold">
                  Zero Debonding
                </div>
                <div className="text-[10px] text-slate-400">Reliable Grip</div>
              </div>

              <div className="text-center lg:text-left space-y-0.5">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-teal font-display">
                  IS 15477
                </div>
                <div className="text-[11px] sm:text-xs text-white font-semibold">
                  Lab Certified
                </div>
                <div className="text-[10px] text-slate-400">Type 1, 2 & 3</div>
              </div>

              <div className="text-center lg:text-left space-y-0.5">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-display">
                  20+ Yrs
                </div>
                <div className="text-[11px] sm:text-xs text-brand-teal font-semibold">
                  Durability
                </div>
                <div className="text-[10px] text-slate-400">Field Proven</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Clean, Premium 3D Hero Product Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
            style={{ perspective: 1000 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none"
            >
              {/* Radial Backdrop Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-teal/30 via-brand-navy/60 to-transparent rounded-3xl blur-2xl opacity-70 pointer-events-none" />

              {/* Clean Glassmorphic Stage Box */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Clean Stage Top Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
                      Flagship Formulation
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-brand-teal/20 text-brand-teal border border-brand-teal/40">
                    TYPE 2 ADHESIVE
                  </span>
                </div>

                {/* Product Image Stage */}
                <div className="relative flex flex-col items-center justify-center py-4 sm:py-6">
                  {/* Subtle pedestal glow */}
                  <div className="absolute w-48 h-48 rounded-full bg-brand-teal/20 blur-3xl pointer-events-none" />

                  <img
                    src="/images/products/r-21-tile-adhesive.png"
                    alt="RockHold R-21 Tile Adhesive"
                    className="relative z-10 max-h-56 sm:max-h-64 lg:max-h-72 w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] animate-float-slow"
                  />

                  {/* Product Title & Info */}
                  <div className="relative z-10 mt-4 text-center">
                    <h2 className="text-lg sm:text-xl font-black text-white font-display">
                      RockHold R-21 Tile Adhesive
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xs mx-auto">
                      High-polymer modified cementitious adhesive for vitrified tiles, terracotta & tile-on-tile renovation.
                    </p>
                  </div>
                </div>

                {/* Clean Feature Pills */}
                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Pack Size
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                      20 kg Bag
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Tensile Strength
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-brand-teal mt-0.5">
                      ≥ 0.5 - 1.5 MPa
                    </div>
                  </div>
                </div>

                {/* Bottom Signature Mascot Badge */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 p-1 shrink-0 overflow-hidden border border-brand-teal/40">
                      <img
                        src="/images/hero/crocodile-mascot.png"
                        alt="RockHold Mascot"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white">
                        Crocodile Power Strength
                      </div>
                      <div className="text-[9px] text-brand-teal uppercase tracking-wider">
                        High Polymer Mechanical Anchor
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/products/r-21-tile-adhesive"
                    className="text-xs font-semibold text-brand-teal hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
