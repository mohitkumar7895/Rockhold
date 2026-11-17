'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Product } from '@/types';
import { useToast } from '@/components/ui/toast';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProductEnquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductEnquiryModal({
  product,
  isOpen,
  onClose,
}: ProductEnquiryModalProps) {
  const { success, error: toastError } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toastError('Please fill in your name, email, and phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product_id: product.id,
          subject: `Enquiry for ${product.name}`,
          message: formData.message || `I would like to enquire about pricing, pack sizes, and dealer availability for ${product.name}.`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
      success('Your enquiry has been received! Our team will contact you shortly.');
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      toastError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto relative my-auto"
        >
          {/* Header */}
          <div className="bg-brand-navy p-4 sm:p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-teal mb-1">
              Quick Product Enquiry
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {product.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Direct enquiry to Manoj Prajapat & RockHold technical sales team.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6">
            {submitted ? (
              <div className="text-center py-8 sm:py-10 space-y-3">
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg sm:text-xl font-bold text-brand-darkNavy">
                  Enquiry Submitted Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Thank you for your interest in {product.name}. Our technical representative will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="Your Name *"
                    required
                    placeholder="Manoj Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Phone / WhatsApp *"
                    type="tel"
                    required
                    placeholder="90016 67917"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="Email Address *"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    label="Company / Firm Name"
                    placeholder="Builders / Tiles Store"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <Textarea
                  label="Enquiry Details"
                  rows={3}
                  placeholder={`Mention estimated quantity (e.g. 50 bags), site location, or technical questions...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={onClose}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    isLoading={submitting}
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    Submit Product Enquiry
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
