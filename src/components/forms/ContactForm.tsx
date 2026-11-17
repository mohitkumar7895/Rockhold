'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const { success, error: toastError } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toastError('Please fill in all required fields.');
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
      success('Thank you! Your enquiry has been received. Manoj Prajapat will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      toastError(err.message || 'Error submitting message');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-industrial space-y-4">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-brand-darkNavy">
          Message Received Successfully!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you for contacting RockHold. Your enquiry has been recorded in our system. Manoj Prajapat and our technical team will review your requirements and respond shortly.
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200/80 shadow-industrial space-y-4 sm:space-y-5"
    >
      <div className="border-b border-slate-100 pb-3 sm:pb-4">
        <h3 className="text-lg sm:text-2xl font-bold text-brand-darkNavy font-display">
          Business & Dealership Enquiry Form
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct line to brand leadership for projects, dealership queries, and bulk orders.
        </p>
      </div>

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
          placeholder="manojsardarshar11@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Company / Firm Name"
          placeholder="Tiles & Sanitaryware Hub"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
      </div>

      <Input
        label="Enquiry Subject *"
        required
        placeholder="Dealership Enquiry / Project Bulk Quotation"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
      />

      <Textarea
        label="Message / Specifications *"
        required
        rows={4}
        placeholder="Please specify estimated volumes, project location, or questions about R-11, R-21, R-51, Epoxy Grout, R301 LW+, etc."
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
        Submit Commercial Enquiry
      </Button>
    </form>
  );
}
