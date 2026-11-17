'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  Send,
  CheckCircle2,
  Building2,
  MapPin,
  Mail,
  Sparkles,
  Phone,
} from 'lucide-react';
import { useWebsite } from '@/context/WebsiteContext';
import { useToast } from '@/components/ui/toast';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function EnquiryCTA() {
  const { settings } = useWebsite();
  const { success, error: toastError } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Direct Website Enquiry',
    message: '',
  });

  const phone = settings.phone_number || '+91 90016 67917';
  const whatsapp = settings.whatsapp_number || '+919001667917';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toastError('Please fill in your name, email, phone, and message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');

      setSubmitted(true);
      success('Thank you! Your enquiry has been sent to Manoj Prajapat.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'Direct Website Enquiry',
        message: '',
      });
    } catch (err: any) {
      toastError(err.message || 'Error submitting enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-br from-brand-darkNavy via-brand-navy to-[#061828] text-white relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Direct Contact & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-wider border border-brand-teal/30">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Communication
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-display">
              Partner with RockHold for Your Next Project
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Whether you are an architect detailing specifications, a builder seeking bulk site delivery, or an entrepreneur interested in dealership rights, we are ready to assist.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/40 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Direct Line / WhatsApp</div>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-brand-teal transition-colors"
                  >
                    {phone}
                  </a>
                  <div className="text-[10px] sm:text-[11px] text-brand-teal font-medium">
                    Manoj Prajapat (Head of Sales)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/40 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Head Office Location</div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {settings.office_address || 'Shivani Bass, Ward No. 2, Sardarshahr, Rajasthan – 331403'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/40 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-teal/20 text-brand-teal flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Corporate Email</div>
                  <a
                    href={`mailto:${settings.email_address || 'Manojsardarshar11@gmail.com'}`}
                    className="text-xs sm:text-sm font-bold text-white hover:text-brand-teal transition-colors truncate block"
                  >
                    {settings.email_address || 'Manojsardarshar11@gmail.com'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Submission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 text-slate-800 shadow-2xl border border-white/20">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-darkNavy font-display">
                  Send Commercial Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your project requirements below. Our technical desk will provide pricing and technical datasheets.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold text-brand-darkNavy">
                    Enquiry Received Successfully!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you. We have logged your request. Manoj Prajapat will contact you shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      required
                      placeholder="Manoj Prajapat"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address *"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      label="Company / Firm Name"
                      placeholder="ABC Constructions / Dealers"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <Textarea
                    label="Project Requirements / Message *"
                    required
                    rows={4}
                    placeholder="Provide details such as tile type, sq. ft. area, site city, or requested quantities of R-11, R-21, R-51, Epoxy Grout, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full text-base font-bold shadow-md hover:shadow-industrial-glow"
                    isLoading={submitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Business Enquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
