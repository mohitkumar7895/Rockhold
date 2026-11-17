import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Factory,
  Target,
  Eye,
  Award,
  FlaskConical,
  Users,
  CheckCircle2,
  Building2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | RockHold Construction Chemicals & Manufacturing Standards',
  description:
    'Learn about RockHold, our mission, vision, ISO 9001:2015 certification, and manufacturing partner Kritika Enterprises in Beekamsara, Churu, Rajasthan.',
};

export default function AboutPage() {
  const brandValues = [
    {
      title: 'Structural Integrity',
      desc: 'We never compromise on active polymer ratios. Every batch delivers the tensile strength and bond longevity promised on our technical data sheets.',
      icon: ShieldCheck,
    },
    {
      title: 'Precision Formulation',
      desc: 'Formulated specifically to endure extreme Indian climates — from scorching dry desert heat to torrential monsoon moisture.',
      icon: FlaskConical,
    },
    {
      title: 'Contractor Empowerment',
      desc: 'We design products that are workable, sag-resistant, and self-curing to make life easier and faster for applicators on site.',
      icon: Users,
    },
    {
      title: 'Sustainable Innovation',
      desc: 'Zero-chloride integral admixtures and low-VOC formulations that safeguard indoor air quality and structural steel reinforcement.',
      icon: Award,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-brand-darkNavy to-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00A9B7_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-wider mb-4 border border-brand-teal/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            ISO 9001 : 2015 CERTIFIED BRAND
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-display">
            About RockHold
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Pioneering heavy-duty polymer tile adhesives and structural construction chemicals engineered for permanent bonding and supreme endurance.
          </p>
        </div>
      </section>

      {/* Brand Story & Company Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider">
                Our Genesis & Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-darkNavy tracking-tight font-display">
                Engineered to Eliminate Tiling Failures Once and for All
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                RockHold was established with a singular objective: to provide architects, civil contractors, and home builders with construction chemicals that perform under the most demanding structural conditions. Traditional cement mortar methods frequently fail on contemporary vitrified tiles and large porcelain slabs due to hollow debonding, poor elasticity, and thermal expansion cracks.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                By infusing state-of-the-art redispersible polymers, surface-active plasticizing compounds, and precision-graded mineral aggregates, RockHold manufactures tile adhesives (R-11, R-21, R-51), impervious epoxy grouts, and concrete admixtures that form an unbreakable monolithic bond.
              </p>

              {/* Quick Key Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-brand-lightBg border border-slate-100">
                  <div className="text-2xl font-black text-brand-navy font-display">IS 15477</div>
                  <div className="text-xs text-slate-500 font-medium">2019 Type 1, 2 & 3</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-lightBg border border-slate-100">
                  <div className="text-2xl font-black text-brand-teal font-display">Zero</div>
                  <div className="text-xs text-slate-500 font-medium">Hollow Debonding</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-lightBg border border-slate-100">
                  <div className="text-2xl font-black text-brand-navy font-display">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Batch Lab Tested</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/images/gallery/rockhold-product-lineup.jpg"
                  alt="RockHold Product Lineup & Manufacturing"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Badge - Fixed Mobile Positioning */}
              <div className="absolute -bottom-3 left-3 sm:-bottom-6 sm:-left-6 bg-brand-darkNavy text-white p-3.5 sm:p-5 rounded-2xl shadow-xl border border-brand-teal/40 max-w-[85%] sm:max-w-xs">
                <div className="text-[10px] sm:text-xs font-bold text-brand-teal uppercase tracking-wider">
                  Brand Promise
                </div>
                <div className="text-xs sm:text-sm font-bold mt-1">
                  &ldquo;Strong Bonds. Superior Performance.&rdquo;
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5">
                  Symbolized by our Crocodile Grip mascot.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-brand-lightBg border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-industrial space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-2 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-darkNavy font-display">
                Our Mission
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To engineer and deliver the most technologically reliable, contractor-friendly, and cost-effective construction chemicals in India. We aim to elevate building standards by providing products that guarantee zero tile debonding, total moisture defense, and lifelong structural durability.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-industrial space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-brand-teal/15 text-brand-teal flex items-center justify-center mb-2 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-darkNavy font-display">
                Our Vision
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To become the most respected and trusted construction chemical brand in the region, recognized for transparent technical specifications, superior raw material purity, and unparalleled customer service across architects, builders, and master applicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing & Laboratory Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/15 text-brand-teal text-xs font-bold uppercase tracking-wider mb-2">
              <Factory className="w-3.5 h-3.5" />
              Infrastructure & Production
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-darkNavy tracking-tight font-display">
              Manufacturing & Laboratory Rigor
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              RockHold chemicals are manufactured with utmost precision under ISO 9001:2015 certified quality controls at our plant in Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Plant Facility Card */}
            <div className="p-8 rounded-3xl bg-brand-darkNavy text-white space-y-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-teal/20 text-brand-teal text-xs font-bold uppercase">
                  Production Plant
                </div>
                <h3 className="text-2xl font-bold font-display">
                  Kritika Enterprises
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our manufacturing hub houses high-capacity automated batch blenders, digital load-cell weighing, and pneumatic packaging lines that eliminate human error and maintain tight grain-size distributions.
                </p>
                <div className="pt-2 space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span>Khata No. 287, Khl. No. 662, Beekamsara, Churu, Rajasthan – 331403</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>kritikaenterprises.sales@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400">
                <span className="text-white font-semibold">Note:</span> For commercial dealer enquiries and product orders, please contact our brand headquarters in Sardarshahr.
              </div>
            </div>

            {/* Brand Operations Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-industrial space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase">
                  Brand Headquarters & Sales
                </div>
                <h3 className="text-2xl font-bold text-brand-darkNavy font-display">
                  RockHold Commercial Office
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Led by Manoj Prajapat, our brand office coordinates architectural specifications, contractor training workshops, site inspections, and logistics for prompt delivery throughout the state.
                </p>
                <div className="pt-2 space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-navy shrink-0" />
                    <span>Contact Person: Manoj Prajapat</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" />
                    <span>Shivani Bass, Ward No. 2, Sardarshahr, Rajasthan – 331403</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-navy shrink-0" />
                    <span>Phone / WhatsApp: +91 90016 67917</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-navy shrink-0" />
                    <span>Email: Manojsardarshar11@gmail.com</span>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-navy hover:bg-brand-darkNavy text-white font-bold text-sm transition-colors"
              >
                <span>Connect with Manoj Prajapat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-20 bg-brand-lightBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-black text-brand-darkNavy tracking-tight font-display">
              Our Guiding Values
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              The foundational principles steering every formula, batch, and client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-industrial space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/15 text-brand-teal flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-brand-darkNavy">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
