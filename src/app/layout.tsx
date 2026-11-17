import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { AuthProvider } from '@/context/AuthContext';
import { WebsiteProvider } from '@/context/WebsiteContext';
import { query } from '@/lib/db';
import { Category } from '@/types';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const headingFont = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rockhold.in'),
  title: {
    default: 'RockHold | Premium Construction Chemicals & Tile Adhesives',
    template: '%s | RockHold Construction Chemicals',
  },
  description:
    'RockHold is an ISO 9001:2015 certified manufacturer of high-performance tile adhesives (R-11, R-21, R-51), stain-free epoxy grouts, integral waterproofing compounds, and surface cleaners.',
  keywords: [
    'RockHold',
    'Tile Adhesive Type 1',
    'Tile Adhesive Type 2',
    'Tile Adhesive Type 3',
    'Epoxy Grout',
    'Construction Chemicals',
    'Tile Cleaner',
    'R301 LW+',
    'R302 SBR',
    'Manoj Prajapat',
    'Sardarshahr',
    'Churu',
    'Rajasthan',
    'Kritika Enterprises',
  ],
  authors: [{ name: 'RockHold - Manoj Prajapat' }],
  creator: 'RockHold',
  publisher: 'RockHold',
  icons: {
    icon: '/images/logo/rockhold-mark.png',
    apple: '/images/logo/rockhold-mark.png',
  },
  openGraph: {
    title: 'RockHold | Premium Construction Chemicals & Tile Adhesives',
    description:
      'Strong Bonds. Superior Performance. ISO 9001:2015 certified tile adhesives, epoxy grouts, and waterproofing solutions.',
    url: 'https://rockhold.in',
    siteName: 'RockHold',
    images: [
      {
        url: '/images/gallery/rockhold-product-lineup.jpg',
        width: 1200,
        height: 630,
        alt: 'RockHold Premium Construction Chemicals Product Lineup',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RockHold | Premium Construction Chemicals',
    description:
      'Strong Bonds. Superior Performance. Premium Tile Adhesives & Construction Chemical Solutions.',
    images: ['/images/gallery/rockhold-product-lineup.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getInitialWebsiteData() {
  try {
    const [settingsRows, categoriesRows] = await Promise.all([
      query<any[]>('SELECT setting_key, setting_value FROM website_settings'),
      query<any[]>('SELECT * FROM categories WHERE is_active = 1 ORDER BY display_order ASC'),
    ]);

    const settings: Record<string, string> = {};
    settingsRows.forEach((row) => {
      settings[row.setting_key] = row.setting_value;
    });

    return {
      settings,
      categories: categoriesRows as Category[],
    };
  } catch (err) {
    console.error('Error fetching initial website data for layout:', err);
    return {
      settings: {},
      categories: [],
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings, categories } = await getInitialWebsiteData();

  return (
    <html lang="en" className={`${sansFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white text-slate-800 selection:bg-brand-teal selection:text-white">
        <AuthProvider>
          <WebsiteProvider initialSettings={settings} initialCategories={categories}>
            <ToastProvider>
              {children}
            </ToastProvider>
          </WebsiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
