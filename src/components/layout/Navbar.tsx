'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Layers,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useWebsite } from '@/context/WebsiteContext';
import Image from 'next/image';

export function Navbar() {
  const { settings, categories } = useWebsite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    {
      name: 'Products',
      href: '/products',
      hasDropdown: true,
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const phone = settings.phone_number || '+91 90016 67917';
  const whatsapp = settings.whatsapp_number || '+919001667917';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-brand-darkNavy text-slate-200 text-xs py-2 px-4 border-b border-brand-navy/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-brand-teal font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              AN ISO 9001:2015 CERTIFIED COMPANY
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">
              Manufactured by Kritika Enterprises, Churu (Raj.)
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-brand-teal transition-colors"
            >
              <Phone className="w-3 h-3 text-brand-teal" />
              <span>{phone}</span>
            </a>
            <span className="text-slate-500">•</span>
            <a
              href={`mailto:${settings.email_address || 'Manojsardarshar11@gmail.com'}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-brand-teal transition-colors"
            >
              <Mail className="w-3 h-3 text-brand-teal" />
              <span>{settings.email_address || 'Manojsardarshar11@gmail.com'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-navy/95 backdrop-blur-md shadow-industrial-lg py-3 border-b border-brand-teal/20'
            : 'bg-brand-navy py-4 border-b border-brand-navy/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo - Clean with No Border */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
              <img
                src="/images/logo/rockhold-mark.jpg"
                alt="RockHold Mark"
                className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-white font-display">
                  Rock<span className="text-brand-teal">Hold</span>
                </span>
                <span className="text-[10px] text-brand-teal font-bold px-1.5 py-0.2 rounded bg-brand-teal/20 border border-brand-teal/40">
                  TM
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold -mt-1">
                Construction Chemicals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive || pathname.startsWith('/products')
                          ? 'text-white bg-white/10'
                          : 'text-slate-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-brand-teal' : 'text-slate-400'
                        }`}
                      />
                    </Link>

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {productsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-[580px] bg-brand-darkNavy/98 backdrop-blur-xl border border-brand-teal/30 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-4 z-50"
                        >
                          <div className="col-span-2 pb-3 mb-1 border-b border-white/10 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
                              Product Categories
                            </span>
                            <Link
                              href="/products"
                              className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
                            >
                              View All Products <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          {categories.length > 0 ? (
                            categories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products?category=${cat.slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group/item"
                              >
                                <div className="w-10 h-10 rounded-lg bg-brand-navy p-1 shrink-0 border border-brand-teal/30 group-hover/item:border-brand-teal flex items-center justify-center">
                                  {cat.image ? (
                                    <img
                                      src={cat.image}
                                      alt={cat.name}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <Layers className="w-5 h-5 text-brand-teal" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover/item:text-brand-teal transition-colors">
                                    {cat.name}
                                  </div>
                                  <div className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                                    {cat.description || 'Engineered high-performance formulations'}
                                  </div>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <>
                              <Link
                                href="/products?category=tile-adhesives"
                                className="p-3 rounded-xl hover:bg-white/10 text-white text-sm"
                              >
                                Tile Adhesives (R-11, R-21, R-51)
                              </Link>
                              <Link
                                href="/products?category=grouts-joint-fillers"
                                className="p-3 rounded-xl hover:bg-white/10 text-white text-sm"
                              >
                                Grouts & Joint Fillers (Epoxy, Tile Grout)
                              </Link>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors active:scale-95 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20RockHold%2C%20I%20am%20interested%20in%20your%20construction%20chemicals`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-transform duration-75"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
              WhatsApp Us
            </a>

            <Link
              href="/contact"
              prefetch={true}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-teal hover:bg-brand-tealDark active:scale-95 text-white text-sm font-semibold shadow-industrial transition-transform duration-75"
            >
              <Sparkles className="w-4 h-4" />
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${cleanPhone}`}
              className="p-2 rounded-lg bg-white/10 text-brand-teal"
              aria-label="Call RockHold"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-darkNavy border-b border-brand-teal/30 overflow-hidden z-40 fixed top-[69px] left-0 w-full shadow-2xl"
          >
            <div className="px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-white hover:bg-white/10"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-white hover:bg-white/10"
                >
                  About Us
                </Link>
                <Link
                  href="/products"
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-white hover:bg-white/10"
                >
                  All Products
                </Link>

                <div className="pl-4 border-l-2 border-brand-teal/40 space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      className="block py-1.5 text-sm text-slate-300 hover:text-brand-teal"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/blog"
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-white hover:bg-white/10"
                >
                  Technical Blog & Guides
                </Link>
                <Link
                  href="/gallery"
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-white hover:bg-white/10"
                >
                  Project & Product Gallery
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-white hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs text-slate-400">
                  <div className="font-semibold text-slate-200">Contact: Manoj Prajapat</div>
                  <div>Shivani Bass, Ward No. 2, Sardarshahr (Raj.)</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white/10 text-white text-xs font-semibold"
                  >
                    <Phone className="w-4 h-4 text-brand-teal" />
                    Call Direct
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
