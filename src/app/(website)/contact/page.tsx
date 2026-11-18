import React from 'react';
import { Metadata } from 'next';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Factory,
  ShieldCheck,
  Send,
  MessageSquare,
  Users,
} from 'lucide-react';
import { query } from '@/lib/db';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | RockHold Construction Chemicals – Manoj Prajapat',
  description:
    'Contact RockHold for dealership enquiries, commercial bulk orders, and architectural consultations in Sardarshahr, Churu, Rajasthan. Phone/WhatsApp: 90016 67917.',
};

export const revalidate = 5;

async function getContactSettings() {
  try {
    const rows = await query<any[]>('SELECT setting_key, setting_value FROM website_settings');
    const settings: Record<string, string> = {};
    rows.forEach((r) => {
      settings[r.setting_key] = r.setting_value;
    });
    return settings;
  } catch {
    return {};
  }
}

export default async function ContactPage() {
  const settings = await getContactSettings();

  const phone = settings.phone_number || '+91 90016 67917';
  const whatsapp = settings.whatsapp_number || '+919001667917';
  const email = settings.email_address || 'Manojsardarshar11@gmail.com';
  const address = settings.office_address || 'Shivani Bass, Ward No. 2, Sardarshahr, Rajasthan – 331403';
  const contactPerson = settings.contact_person || 'Manoj Prajapat';

  const mfgName = settings.manufacturer_name || 'Kritika Enterprises';
  const mfgAddress = settings.manufacturer_address || 'Khata No. 287, Khl. No. 662, Beekamsara, Churu, Rajasthan – 331403';
  const mfgEmail = settings.manufacturer_email || 'kritikaenterprises.sales@gmail.com';

  const mapEmbed =
    settings.google_maps_embed ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14109.845347209647!2d74.4820846747683!3d28.43846614480749!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3914a1fca949a2a7%3A0xe54e19fb25265487!2sSardarshahr%2C%20Rajasthan%20331403!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanWa = whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="bg-brand-lightBg min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-brand-teal" />
            Get in Touch With Leadership
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-darkNavy tracking-tight font-display">
            Contact RockHold
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            For dealership distribution inquiries, architectural specifications, on-site technical demos, and commercial bulk supply throughout Rajasthan and nationwide.
          </p>
        </div>

        {/* Contact Grid: Details (5 cols) + Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Brand Office Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-industrial space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy text-white text-xs font-bold uppercase">
                <Building2 className="w-3.5 h-3.5 text-brand-teal" />
                Brand Corporate Office
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-darkNavy">
                  RockHold Commercial Hub
                </h3>
                <div className="text-sm font-semibold text-brand-teal mt-0.5">
                  Contact Person: {contactPerson}
                </div>
              </div>

              <div className="space-y-3.5 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-darkNavy block">Registered Address</span>
                    <span className="break-words">{address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-darkNavy block">Phone / Call Desk</span>
                    <a href={`tel:${cleanPhone}`} className="hover:text-brand-teal font-medium">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-darkNavy block">Direct Email</span>
                    <a href={`mailto:${email}`} className="hover:text-brand-teal font-medium break-all">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-darkNavy block">Business Hours</span>
                    <span>Monday – Saturday: 9:00 AM – 7:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-brand-navy hover:bg-brand-darkNavy active:scale-95 text-white font-bold text-xs transition-transform"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-teal" />
                  Call Direct
                </a>

                <a
                  href={`https://wa.me/91${cleanWa.replace(/^91/, '')}?text=Hello%20Manoj%20Prajapat%2C%20I%20am%20enquiring%20about%20RockHold%20construction%20chemicals`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs transition-transform shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Separate Manufacturer Details Card */}
            <div className="bg-brand-darkNavy text-white rounded-3xl p-5 sm:p-7 border border-brand-teal/30 shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5" />
                Manufacturing Unit
              </div>

              <div>
                <h4 className="text-xl font-bold font-display text-white">
                  {mfgName}
                </h4>
                <div className="text-xs text-brand-teal font-semibold mt-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ISO 9001:2015 Certified Production Line
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span>{mfgAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{mfgEmail}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-white/10">
                Note: For dealership inquiries, technical visits, and order bookings, please coordinate directly with the RockHold brand office above.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="mt-10 sm:mt-14 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-industrial space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 sm:px-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-brand-darkNavy">
                Office Location Map – Sardarshahr, Rajasthan
              </h3>
              <p className="text-xs text-slate-500">
                Find our headquarters in Sardarshahr, Churu district.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Sardarshahr+Rajasthan+331403"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-teal hover:underline self-start sm:self-auto"
            >
              Open in Google Maps &rarr;
            </a>
          </div>

          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100">
            <iframe
              src={mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RockHold Sardarshahr Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
