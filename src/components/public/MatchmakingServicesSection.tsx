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
        return <UserCheck className="w-6 h-6 text-[#16205B]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-600" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-[#D91B2B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-amber-600" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-purple-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#D91B2B]" />;
    }
  };

  return (
    <section id="services-section" className="relative overflow-hidden bg-gradient-to-br from-[#02061f] via-[#000080]/90 to-[#040827] text-white py-12 sm:py-16 transition-all duration-300 -mt-1">
      {/* Dynamic Animated Shifting Background Glow & Mesh matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030722] via-[#000080]/80 to-[#04092b] animate-color-shift pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-[#000080]/50 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-gradient-to-tr from-[#000080]/40 via-[#E60000]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATCHMAKING_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-white/90 shadow-2xl shadow-black/30 hover:shadow-2xl hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 shadow-xs border border-slate-200 flex items-center justify-center mb-5">
                  {getIcon(srv.iconName)}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D91B2B]">
                  {srv.subtitle}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display mt-1 mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {srv.description}
                </p>

                <ul className="space-y-2 border-t border-slate-100 pt-4">
                  {srv.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16205B] hover:text-[#D91B2B] transition-colors"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
