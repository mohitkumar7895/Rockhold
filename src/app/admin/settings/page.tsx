'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Building2,
  Phone,
  Factory,
  Share2,
  FileText,
  Search,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { useWebsite } from '@/context/WebsiteContext';

export default function AdminSettingsPage() {
  const { success, error: toastError } = useToast();
  const { refreshSettings } = useWebsite();

  const [activeTab, setActiveTab] = useState<
    'general' | 'contact' | 'manufacturer' | 'homepage' | 'social' | 'seo'
  >('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Settings State Map
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: 'RockHold',
    brand_tagline: 'Strong Bonds. Superior Performance.',
    brand_subheading: 'Premium Tile Adhesives & Construction Chemical Solutions',
    contact_person: 'Manoj Prajapat',
    phone_number: '+91 90016 67917',
    whatsapp_number: '+919001667917',
    email_address: 'Manojsardarshar11@gmail.com',
    office_address: 'Shivani Bass, Ward No. 2, Sardarshahr, Rajasthan – 331403',
    manufacturer_name: 'Kritika Enterprises',
    manufacturer_address: 'Khata No. 287, Khl. No. 662, Beekamsara, Churu, Rajasthan – 331403',
    manufacturer_email: 'kritikaenterprises.sales@gmail.com',
    iso_certification: 'ISO 9001:2015 Certified Company',
    logo_url: '/images/logo/rockhold-logo-navy.png',
    logo_mark_url: '/images/logo/rockhold-mark.png',
    mascot_url: '/images/hero/crocodile-mascot.png',
    footer_about_text: 'RockHold is a premier construction chemicals brand delivering high-performance tile adhesives, epoxy grouts, waterproofing compounds, and surface care solutions built for supreme endurance.',
    google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14109.845347209647!2d74.4820846747683!3d28.43846614480749!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3914a1fca949a2a7%3A0xe54e19fb25265487!2sSardarshahr%2C%20Rajasthan%20331403!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    hero_headline: 'Strong Bonds. Superior Performance.',
    hero_subheadline: 'Engineered tile adhesives, impervious epoxy grouts, and advanced waterproofing compounds formulated for modern architectural resilience.',
    hero_cta_primary_text: 'Explore Products',
    hero_cta_secondary_text: 'Contact Us',
    facebook_url: 'https://facebook.com/rockholdchemicals',
    instagram_url: 'https://instagram.com/rockholdchemicals',
    linkedin_url: 'https://linkedin.com/company/rockhold-chemicals',
    youtube_url: 'https://youtube.com/@rockholdchemicals',
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      success('Website settings updated successfully! Changes are live on frontend.');
      await refreshSettings();
    } catch (err: any) {
      toastError(err.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General & Branding', icon: Building2 },
    { id: 'contact', label: 'Company Contact', icon: Phone },
    { id: 'manufacturer', label: 'Manufacturing Plant', icon: Factory },
    { id: 'homepage', label: 'Homepage Content', icon: FileText },
    { id: 'social', label: 'Social & Map Embed', icon: Share2 },
  ];

  return (
    <div>
      <AdminHeader
        title="Global Website Settings"
        subtitle="Manage Contact Info, Manufacturer Entity, Branding & Home Content"
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-5xl">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'text-slate-600 hover:bg-white hover:text-brand-navy'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Tab 1: General & Branding */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-4">
              <h3 className="text-base font-bold text-brand-darkNavy border-b border-slate-100 pb-3">
                Brand Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  value={settings.company_name || ''}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                />
                <Input
                  label="ISO Certification Text"
                  value={settings.iso_certification || ''}
                  onChange={(e) => handleChange('iso_certification', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Brand Tagline"
                  value={settings.brand_tagline || ''}
                  onChange={(e) => handleChange('brand_tagline', e.target.value)}
                />
                <Input
                  label="Brand Subheading"
                  value={settings.brand_subheading || ''}
                  onChange={(e) => handleChange('brand_subheading', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Logo Image URL"
                  value={settings.logo_url || ''}
                  onChange={(e) => handleChange('logo_url', e.target.value)}
                />
                <Input
                  label="Logo Mark URL"
                  value={settings.logo_mark_url || ''}
                  onChange={(e) => handleChange('logo_mark_url', e.target.value)}
                />
                <Input
                  label="Mascot Image URL"
                  value={settings.mascot_url || ''}
                  onChange={(e) => handleChange('mascot_url', e.target.value)}
                />
              </div>

              <Textarea
                label="Footer About Description"
                rows={3}
                value={settings.footer_about_text || ''}
                onChange={(e) => handleChange('footer_about_text', e.target.value)}
              />
            </div>
          )}

          {/* Tab 2: Company Contact */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-4">
              <h3 className="text-base font-bold text-brand-darkNavy border-b border-slate-100 pb-3">
                Brand Headquarters (Sardarshahr)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Person"
                  value={settings.contact_person || ''}
                  onChange={(e) => handleChange('contact_person', e.target.value)}
                />
                <Input
                  label="Phone Number"
                  value={settings.phone_number || ''}
                  onChange={(e) => handleChange('phone_number', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="WhatsApp Number (with country code)"
                  value={settings.whatsapp_number || ''}
                  onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                />
                <Input
                  label="Corporate Email Address"
                  value={settings.email_address || ''}
                  onChange={(e) => handleChange('email_address', e.target.value)}
                />
              </div>

              <Textarea
                label="Office Address"
                rows={2}
                value={settings.office_address || ''}
                onChange={(e) => handleChange('office_address', e.target.value)}
              />
            </div>
          )}

          {/* Tab 3: Manufacturing Plant */}
          {activeTab === 'manufacturer' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-4">
              <h3 className="text-base font-bold text-brand-darkNavy border-b border-slate-100 pb-3">
                Manufacturer Entity Details (Kritika Enterprises)
              </h3>
              <p className="text-xs text-slate-500">
                Shown transparently on brochure, footer, and about page to ensure legal compliance without conflicting with the brand sales desk.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Manufacturer Company Name"
                  value={settings.manufacturer_name || ''}
                  onChange={(e) => handleChange('manufacturer_name', e.target.value)}
                />
                <Input
                  label="Manufacturer Email"
                  value={settings.manufacturer_email || ''}
                  onChange={(e) => handleChange('manufacturer_email', e.target.value)}
                />
              </div>

              <Textarea
                label="Manufacturing Plant Address"
                rows={2}
                value={settings.manufacturer_address || ''}
                onChange={(e) => handleChange('manufacturer_address', e.target.value)}
              />
            </div>
          )}

          {/* Tab 4: Homepage Content */}
          {activeTab === 'homepage' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-4">
              <h3 className="text-base font-bold text-brand-darkNavy border-b border-slate-100 pb-3">
                Hero Section Copy
              </h3>

              <Input
                label="Hero Main Headline"
                value={settings.hero_headline || ''}
                onChange={(e) => handleChange('hero_headline', e.target.value)}
              />

              <Textarea
                label="Hero Subheadline"
                rows={3}
                value={settings.hero_subheadline || ''}
                onChange={(e) => handleChange('hero_subheadline', e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Primary Button Text"
                  value={settings.hero_cta_primary_text || ''}
                  onChange={(e) => handleChange('hero_cta_primary_text', e.target.value)}
                />
                <Input
                  label="Secondary Button Text"
                  value={settings.hero_cta_secondary_text || ''}
                  onChange={(e) => handleChange('hero_cta_secondary_text', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Tab 5: Social & Map */}
          {activeTab === 'social' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial space-y-4">
              <h3 className="text-base font-bold text-brand-darkNavy border-b border-slate-100 pb-3">
                Social Links & Google Maps Embed
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Facebook URL"
                  value={settings.facebook_url || ''}
                  onChange={(e) => handleChange('facebook_url', e.target.value)}
                />
                <Input
                  label="Instagram URL"
                  value={settings.instagram_url || ''}
                  onChange={(e) => handleChange('instagram_url', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="LinkedIn URL"
                  value={settings.linkedin_url || ''}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                />
                <Input
                  label="YouTube Channel URL"
                  value={settings.youtube_url || ''}
                  onChange={(e) => handleChange('youtube_url', e.target.value)}
                />
              </div>

              <Textarea
                label="Google Maps Iframe Embed Source URL"
                rows={3}
                value={settings.google_maps_embed || ''}
                onChange={(e) => handleChange('google_maps_embed', e.target.value)}
              />
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="font-bold shadow-md hover:shadow-industrial-glow"
              isLoading={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
