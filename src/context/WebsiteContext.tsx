'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Category } from '@/types';

interface WebsiteContextType {
  settings: Record<string, string>;
  categories: Category[];
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Record<string, string> = {
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
  primary_color: '#10365B',
  teal_color: '#00A9B7',
  dark_navy_color: '#092B4C',
  logo_url: '/images/logo/rockhold-logo-navy.png',
  logo_mark_url: '/images/logo/rockhold-mark.png',
  mascot_url: '/images/hero/crocodile-mascot.png',
  footer_about_text: 'RockHold is a premier construction chemicals brand delivering high-performance tile adhesives, epoxy grouts, waterproofing compounds, and surface care solutions built for supreme endurance.',
};

const WebsiteContext = createContext<WebsiteContextType>({
  settings: defaultSettings,
  categories: [],
  loading: true,
  refreshSettings: async () => {},
});

export function WebsiteProvider({
  children,
  initialSettings,
  initialCategories,
}: {
  children: React.ReactNode;
  initialSettings?: Record<string, string>;
  initialCategories?: Category[];
}) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings || defaultSettings);
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [loading, setLoading] = useState(!initialSettings);

  const refreshSettings = async () => {
    try {
      const [resSettings, resCats] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/categories'),
      ]);
      if (resSettings.ok) {
        const data = await resSettings.json();
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
      if (resCats.ok) {
        const data = await resCats.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialSettings) {
      refreshSettings();
    }
  }, [initialSettings]);

  return (
    <WebsiteContext.Provider value={{ settings, categories, loading, refreshSettings }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export const useWebsite = () => useContext(WebsiteContext);
