'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const fallbackList = [
    {
      id: 1,
      name: 'Vikramaditya Rathore',
      role_company: 'Principal Architect, Rathore & Associates, Jaipur',
      content: 'We have specified RockHold R-51 and Epoxy Grout across multiple luxury villa projects in Rajasthan. The bonding strength, sag resistance, and color uniformity of their grouts are on par with international standards.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sunil Sharma',
      role_company: 'Chief Project Engineer, Apex Infra Build, Churu',
      content: 'RockHold R301 LW+ and R302 SBR have become our default waterproofing specifications for roof slabs and basements. Excellent cohesion in concrete, zero segregation, and noticeable reduction in curing cracks.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Rajesh Pareek',
      role_company: 'Managing Director, Pareek Tile & Marble World, Sardarshahr',
      content: 'As a premier tile dealership, our customers demand adhesives that guarantee zero hollow sounds and zero debonding on large porcelain slabs. RockHold R-21 and R-51 have had a 100% positive feedback track record.',
      rating: 5,
    },
  ];

  // Strictly display 3 testimonials
  const displayList = (testimonials && testimonials.length > 0 ? testimonials : fallbackList).slice(0, 3);

  return (
    <section className="py-14 sm:py-20 bg-brand-lightBg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
            Industry Trust
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-darkNavy tracking-tight font-display">
            Endorsed by Architects & Applicators
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Real feedback from civil contractors, architects, and building material distributors using RockHold daily.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-industrial hover:shadow-industrial-lg transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-brand-teal/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-darkNavy">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {item.role_company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
