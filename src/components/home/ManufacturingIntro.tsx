'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Factory,
  ShieldCheck,
  Award,
  Layers,
  FlaskConical,
  Microscope,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Mail,
} from 'lucide-react';

export function ManufacturingIntro() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
              <img
                src="/images/gallery/concrete-waterproofing-application.jpg"
                alt="RockHold Industrial Plant & Quality Standards"
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darkNavy/95 via-brand-darkNavy/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                  <Factory className="w-3.5 h-3.5" />
                  <span>MANUFACTURING PARTNER</span>
                </div>
                <h4 className="text-xl font-bold font-display">
                  Kritika Enterprises Plant
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                  <span>Khata No. 287, Khl. No. 662, Beekamsara, Churu (Raj.) – 331403</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-teal font-mono">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>kritikaenterprises.sales@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Floating Quality Stamp */}
            <div className="absolute -top-5 -right-5 bg-white rounded-3xl p-4 shadow-2xl border border-slate-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-teal/15 text-brand-teal flex items-center justify-center font-black text-xl font-display">
                ISO
              </div>
              <div>
                <div className="text-xs font-black text-brand-darkNavy font-display">
                  9001 : 2015
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  QMS Certified Audit
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
              <span>Plant Capabilities & Quality Audit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkNavy tracking-tight font-display">
              Uncompromising Quality From Raw Minerals to Finished Pack
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              RockHold products are manufactured under strict ISO 9001:2015 certified quality management protocols at our dedicated production facility in Beekamsara, Churu. Through computerized dry-mix blending, precision polymer dosing, and extensive batch tensile testing, we guarantee consistent adhesion, optimal open times, and dependable shelf life.
            </p>

            {/* Quality Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-lightBg border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-brand-darkNavy font-display">
                    IS 15477:2019 Conformity
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Stringent compliance for Type 1, Type 2, and Type 3 polymer adhesives.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-lightBg border border-slate-200/80 shadow-sm">
                <Microscope className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-brand-darkNavy font-display">
                    In-House Testing Laboratory
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Continuous monitoring of pot life, tensile adhesion, and compressive strength.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-lightBg border border-slate-200/80 shadow-sm">
                <Layers className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-brand-darkNavy font-display">
                    Moisture-Barrier Packaging
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Heavy-duty laminated bags and sealed jerrycans preventing humidity degradation.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-lightBg border border-slate-200/80 shadow-sm">
                <Award className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-brand-darkNavy font-display">
                    Direct Manufacturer Supply
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Direct plant dispatch from Kritika Enterprises ensuring fresh batches and authentic quality.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-teal transition-colors group"
              >
                <span>Read More About Our Infrastructure & Manufacturing Heritage</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
