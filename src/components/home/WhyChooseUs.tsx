'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Target,
  FlaskConical,
  Award,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface EngineeringPillar {
  code: string;
  tag: string;
  title: string;
  desc: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PILLARS: EngineeringPillar[] = [
  {
    code: '01',
    tag: 'POLYMER ADHESION',
    title: 'Crocodile Power Grip',
    desc: 'Formulated with advanced re-dispersible polymer resins delivering high tensile shear resistance (≥ 0.5 MPa to 1.5 MPa) to permanently prevent debonding.',
    metric: '≥ 0.5–1.5 MPa',
    icon: Zap,
  },
  {
    code: '02',
    tag: 'FAST HANDOVER',
    title: 'Self-Curing Chemistry',
    desc: 'Eliminates time-consuming and expensive water curing on the job site. Hydrates autonomously, accelerating commercial project handover by 40%.',
    metric: 'Zero Water Curing',
    icon: Clock,
  },
  {
    code: '03',
    tag: 'SOLID FULL BED',
    title: 'Zero Hollow Pockets',
    desc: 'Ultra-creamy trowelability delivers 100% full-bed coverage under large format vitrified tiles and heavy natural stones, preventing hollow cracks.',
    metric: '100% Bed Contact',
    icon: Target,
  },
  {
    code: '04',
    tag: 'QUALITY AUDIT',
    title: 'ISO 9001:2015 Certified',
    desc: 'Each production batch at the Beekamsara plant undergoes strict laboratory quality control testing in compliance with IS 15477:2019 standards.',
    metric: 'IS 15477:2019',
    icon: Award,
  },
  {
    code: '05',
    tag: 'WEATHER RESISTANCE',
    title: 'Hydrostatic & Thermal Defense',
    desc: 'Dense crystalline polymer structure repels continuous moisture, resisting freeze-thaw cycles and harsh Rajasthan summer temperature swings (-10°C to +70°C).',
    metric: 'Hydrophobic Matrix',
    icon: ShieldCheck,
  },
  {
    code: '06',
    tag: 'INDUSTRY ADOPTION',
    title: 'Architect & Builder Trusted',
    desc: 'Tested and preferred by leading structural engineers, tiling contractors, and real estate developers across North India for structural reliability.',
    metric: 'Zero Failure Track',
    icon: FlaskConical,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-24 bg-gradient-to-b from-[#051728] via-brand-darkNavy to-[#08223C] text-white relative overflow-hidden">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 blueprint-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/15 text-brand-teal font-mono text-xs uppercase tracking-widest mb-3 border border-brand-teal/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Engineering Standards</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
            Why Structural Engineers Specify{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-[#5EE2EE]">
              RockHold
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Engineered to overcome common construction vulnerabilities: hollow debonding, grout hairline shrinkage, water seepage, and efflorescence.
          </p>
        </div>

        {/* 6 Blueprint Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {PILLARS.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <motion.div
                key={pt.code}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative rounded-3xl bg-white/[0.04] border border-white/10 p-5 sm:p-7 backdrop-blur-xl hover:border-brand-teal/50 hover:bg-white/[0.07] transition-all duration-300 group shadow-lg"
              >
                {/* Corner Brackets */}
                <div className="corner-bracket-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="corner-bracket-br opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Top Card Bar: Index and Tag */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-brand-teal tracking-wider">
                    [{pt.code}] // {pt.tag}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-teal/20 text-brand-teal border border-brand-teal/30">
                    {pt.metric}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/15 border border-brand-teal/40 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all shadow-md shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-teal transition-colors font-display">
                    {pt.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pt.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
