'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Factory,
  Building2,
  ArrowRight,
  ExternalLink,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useWebsite } from '@/context/WebsiteContext';

export function Footer() {
  const { settings, categories } = useWebsite();

  const phone = settings.phone_number || '+91 90016 67917';
  const whatsapp = settings.whatsapp_number || '+919001667917';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <footer className="bg-brand-darkNavy text-slate-300 pt-16 pb-8 border-t border-brand-navy relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-navy/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Certification (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo/rockhold-mark.jpg"
                  alt="RockHold"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-white font-display">
                    Rock<span className="text-brand-teal">Hold</span>
                  </span>
                  <span className="text-[10px] text-brand-teal font-bold px-1 rounded bg-brand-teal/20">
                    TM
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold -mt-1">
                  Construction Chemicals
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.footer_about_text ||
                'RockHold manufactures advanced polymer-modified tile adhesives, stain-proof epoxy grouts, integral waterproofing compounds, and industrial cleaners engineered for architectural longevity.'}
            </p>

            {/* ISO Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-navy/80 border border-brand-teal/30 text-xs font-medium text-brand-teal">
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              <span>ISO 9001:2015 Quality Management Certified</span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-400">Brand Tagline:</span>
              <span className="text-xs font-semibold text-white tracking-wide">
                &ldquo;Strong Bonds. Superior Performance.&rdquo;
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-teal pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-brand-teal" /> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-brand-teal" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-brand-teal" /> All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-brand-teal" /> Technical Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-brand-teal" /> Project Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-brand-teal" /> Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5 text-xs text-slate-400 pt-2"
                >
                  <ExternalLink className="w-3 h-3" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Range (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-teal pl-2.5">
              Product Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/r-11-tile-adhesive"
                  className="hover:text-brand-teal transition-colors block"
                >
                  R-11 Tile Adhesive (Type 1)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/r-21-tile-adhesive"
                  className="hover:text-brand-teal transition-colors block"
                >
                  R-21 Tile Adhesive (Type 2)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/r-51-tile-adhesive"
                  className="hover:text-brand-teal transition-colors block"
                >
                  R-51 Tile Adhesive (Type 3)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/epoxy-grout"
                  className="hover:text-brand-teal transition-colors block"
                >
                  Stain-Free Epoxy Grout
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tile-grout"
                  className="hover:text-brand-teal transition-colors block"
                >
                  Polymer Tile Grout
                </Link>
              </li>
              <li>
                <Link
                  href="/products/r01-tile-cleaner"
                  className="hover:text-brand-teal transition-colors block"
                >
                  R01 Active Tile Cleaner
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tap-cleaner"
                  className="hover:text-brand-teal transition-colors block"
                >
                  Eco Tap & Scale Cleaner
                </Link>
              </li>
              <li>
                <Link
                  href="/products/r301-lw-plus"
                  className="hover:text-brand-teal transition-colors block"
                >
                  R301 LW+ Integral Waterproofing
                </Link>
              </li>
              <li>
                <Link
                  href="/products/r302-sbr"
                  className="hover:text-brand-teal transition-colors block"
                >
                  R302 SBR Bonding Latex
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Manufacturing Entity (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Brand Contact */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Building2 className="w-4 h-4 text-brand-teal" />
                <span>Brand Headquarters</span>
              </div>
              <div className="text-xs text-slate-300">
                <span className="font-medium text-white">Contact Person:</span>{' '}
                {settings.contact_person || 'Manoj Prajapat'}
              </div>
              <div className="text-xs text-slate-300 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                <span>{settings.office_address || 'Shivani Bass, Ward No. 2, Sardarshahr, Rajasthan – 331403'}</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white">
                  {phone}
                </a>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <a
                  href={`mailto:${settings.email_address || 'Manojsardarshar11@gmail.com'}`}
                  className="hover:text-white truncate"
                >
                  {settings.email_address || 'Manojsardarshar11@gmail.com'}
                </a>
              </div>
            </div>

            {/* Manufacturer Details */}
            <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-teal/20 space-y-2">
              <div className="flex items-center gap-2 text-brand-teal font-semibold text-xs uppercase tracking-wider">
                <Factory className="w-4 h-4 text-brand-teal" />
                <span>Manufacturing Plant</span>
              </div>
              <div className="text-xs font-medium text-white">
                {settings.manufacturer_name || 'Kritika Enterprises'}
              </div>
              <div className="text-[11px] text-slate-400 leading-snug">
                {settings.manufacturer_address ||
                  'Khata No. 287, Khl. No. 662, Beekamsara, Churu, Rajasthan – 331403'}
              </div>
              <div className="text-[11px] text-slate-400">
                Email: {settings.manufacturer_email || 'kritikaenterprises.sales@gmail.com'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} RockHold Construction Chemicals. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Proudly Made in India
            </span>
            <Link href="/contact" className="hover:text-brand-teal">
              Terms & Support
            </Link>
            <Link href="/admin/login" className="hover:text-brand-teal">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
