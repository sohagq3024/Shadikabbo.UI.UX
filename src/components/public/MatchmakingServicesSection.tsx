import React from 'react';
import { MATCHMAKING_SERVICES } from '../../data/mockData';
import {
  UserCheck,
  ShieldCheck,
  Globe,
  Lock,
  HeartHandshake,
  Crown,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface MatchmakingServicesProps {
  onOpenRegister: () => void;
}

export const MatchmakingServicesSection: React.FC<MatchmakingServicesProps> = ({
  onOpenRegister,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#16205B]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />;
      case 'Globe':
        return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />;
      case 'Lock':
        return <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#D91B2B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />;
      case 'Crown':
        return <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />;
      default:
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#D91B2B]" />;
    }
  };

  return (
    <section id="services-section" className="relative overflow-hidden bg-gradient-to-br from-[#02061f] via-[#000080]/90 to-[#040827] text-white py-10 sm:py-16 transition-all duration-300 -mt-1">
      {/* Dynamic Animated Shifting Background Glow & Mesh matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030722] via-[#000080]/80 to-[#04092b] animate-color-shift pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-[#000080]/50 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-gradient-to-tr from-[#000080]/40 via-[#E60000]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] sm:text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Marriage Media Solutions</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Professional Matchmaking Tailored to Family Values
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed px-2 sm:px-0">
            Unlike impersonal algorithmic swipe apps, Shadikabbo pairs human empathy and
            rigorous credential verification with modern technology to ensure honorable marriages.
          </p>
        </div>

        {/* Services Grid - 2 cards per line on mobile (grid-cols-2) */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {MATCHMAKING_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl sm:rounded-3xl p-3 sm:p-6 border border-white/90 shadow-lg sm:shadow-2xl shadow-black/20 sm:shadow-black/30 hover:shadow-2xl hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 shadow-xs border border-slate-200 flex items-center justify-center mb-2.5 sm:mb-5">
                  {getIcon(srv.iconName)}
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D91B2B] block">
                  {srv.subtitle}
                </span>
                <h3 className="text-xs sm:text-lg font-bold text-slate-900 font-display mt-0.5 sm:mt-1 mb-1.5 sm:mb-2 line-clamp-2 leading-snug">
                  {srv.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-2.5 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                  {srv.description}
                </p>

                <ul className="space-y-1 sm:space-y-2 border-t border-slate-100 pt-2 sm:pt-4">
                  {srv.benefits.map((b, i) => (
                    <li key={i} className="flex items-start sm:items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-700 leading-tight">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                      <span className="line-clamp-1 sm:line-clamp-none">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 sm:pt-6 mt-3 sm:mt-6 border-t border-slate-100">
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-[#16205B] hover:text-[#D91B2B] transition-colors"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
