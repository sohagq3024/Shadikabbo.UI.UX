import React from 'react';
import { COUNTRY_CATEGORIES } from '../../data/mockData';
import { SiteSettings } from '../../types';
import { ArrowRight, MapPin } from 'lucide-react';

interface CountryCategoriesProps {
  onSelectCountry: (countryName: string) => void;
  siteSettings?: SiteSettings;
}

// 9:16 Aspect Ratio City Environment Visuals fallback
const DEFAULT_COUNTRY_ENVIRONMENTS: Record<
  string,
  {
    image: string;
    cityName: string;
    highlight: string;
  }
> = {
  Bangladesh: {
    image: 'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?w=800&auto=format&fit=crop&q=80',
    cityName: 'Dhaka City',
    highlight: 'Metropolitan & Heritage',
  },
  'United States': {
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=80',
    cityName: 'New York City',
    highlight: 'Manhattan & Expat Hubs',
  },
  'United Kingdom': {
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    cityName: 'London',
    highlight: 'Greater London & Diaspora',
  },
  Canada: {
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&auto=format&fit=crop&q=80',
    cityName: 'Toronto',
    highlight: 'Downtown & Ontario Hub',
  },
};

export const CountryCategoriesSection: React.FC<CountryCategoriesProps> = ({
  onSelectCountry,
  siteSettings,
}) => {
  // If custom country cards configured in SiteSettings, use them; otherwise fallback to default
  const cards = siteSettings?.countryCards && siteSettings.countryCards.length > 0
    ? siteSettings.countryCards
    : COUNTRY_CATEGORIES.slice(0, 4).map((c) => {
        const env = DEFAULT_COUNTRY_ENVIRONMENTS[c.name] || {
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
          cityName: c.name,
          highlight: 'Expat Community',
        };
        return {
          id: c.name.toLowerCase().replace(/\s+/g, '-'),
          name: c.name,
          flag: c.flag,
          cityName: env.cityName,
          highlight: env.highlight,
          image: env.image,
          candidateCount: `${c.count} Active`,
        };
      });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#02061f] via-[#000080] to-[#040827] text-white py-8 sm:py-10 transition-all duration-300 -mt-1">
      {/* Dynamic Animated Shifting Background Glow & Mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030722] via-[#000080]/80 to-[#04092b] animate-color-shift pointer-events-none" />

      {/* Radiant ambient glow orbs */}
      <div className="absolute -top-32 left-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-[#000080]/40 via-[#E60000]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-10 w-96 h-96 bg-[#000080]/50 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-6 gap-3">
          <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] sm:text-xs font-bold mb-2.5">
              <MapPin className="w-3 h-3" />
              <span>Global Bengali Community</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              {siteSettings?.countrySectionTitle || 'Find Matches by Country & Expat Community'}
            </h2>
            <p className="text-xs sm:text-base text-slate-300 mt-1.5 sm:mt-2 leading-relaxed">
              {siteSettings?.countrySectionSubtitle ||
                'Connect with eligible Bengali candidates residing locally across Bangladesh or settled in key global diaspora hubs worldwide.'}
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {cards.map((c, i) => {
            return (
              <div
                key={c.id || i}
                onClick={() => onSelectCountry(c.name)}
                className="group bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border border-white/90 shadow-2xl shadow-black/40 hover:shadow-2xl hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* 9:16 Aspect Ratio City Environment Image */}
                <div className="relative aspect-[9/16] w-full rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 bg-slate-100 ring-1 ring-slate-200/80">
                  <img
                    src={c.image}
                    alt={`${c.name} - ${c.cityName} environment`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient shading for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges: City Name & Country Flag */}
                  <div className="absolute top-2 inset-x-2 sm:top-2.5 sm:inset-x-2.5 flex items-center justify-between z-10">
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[8px] sm:text-[10px] font-bold text-white border border-white/20 flex items-center gap-1">
                      <MapPin className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-rose-400" />
                      <span className="truncate max-w-[55px] sm:max-w-none">{c.cityName}</span>
                    </span>
                    <span className="text-lg sm:text-2xl drop-shadow-md">{c.flag}</span>
                  </div>

                  {/* Environment Highlight Caption at bottom of image */}
                  <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 text-left z-10">
                    <span className="text-[7px] sm:text-[9px] uppercase tracking-wider font-extrabold text-amber-300 block">
                      City Environment
                    </span>
                    <p className="text-[10px] sm:text-xs font-bold text-white leading-tight truncate">
                      {c.highlight}
                    </p>
                  </div>
                </div>

                {/* Card Info */}
                <div className="space-y-0.5 sm:space-y-1 text-left px-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-[#E60000] transition-colors truncate">
                      {c.name}
                    </h3>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug truncate">
                    {c.cityName} Hub & Global Diaspora
                  </p>
                </div>

                {/* Bottom Stats & Arrow Action */}
                <div className="pt-2 sm:pt-2.5 mt-2 sm:mt-2.5 border-t border-slate-100 flex items-center justify-between px-0.5">
                  <span className="text-[9px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-emerald-200">
                    {c.candidateCount.includes('Active') || c.candidateCount.includes('Candidates') ? c.candidateCount : `${c.candidateCount} Active`}
                  </span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 group-hover:bg-[#E60000] text-slate-500 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
