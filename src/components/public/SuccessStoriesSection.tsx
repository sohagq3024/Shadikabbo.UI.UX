import React from 'react';
import { SUCCESS_STORIES } from '../../data/mockData';
import { Heart, Quote, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface SuccessStoriesProps {
  onOpenRegister: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesProps> = ({
  onOpenRegister,
}) => {
  return (
    <section id="stories-section" className="relative overflow-hidden bg-gradient-to-br from-[#02061f] via-[#000080]/90 to-[#040827] text-white py-12 sm:py-16 transition-all duration-300 -mt-1">
      {/* Dynamic Animated Shifting Background Glow & Mesh matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030722] via-[#000080]/80 to-[#04092b] animate-color-shift pointer-events-none" />
      <div className="absolute -top-32 left-10 w-96 h-96 bg-[#000080]/50 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute -bottom-32 right-10 w-96 h-96 bg-gradient-to-tr from-[#000080]/40 via-[#E60000]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] sm:text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-rose-300" />
            <span>Real Bangladeshi Matrimonial Journeys</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Stories of Lifelong Companionship
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed px-2 sm:px-0">
            Every marriage on Shadikabbo begins with genuine mutual respect, verified credentials,
            and shared life values between two honorable families.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-3xl overflow-hidden border border-white/90 shadow-2xl shadow-black/30 hover:shadow-2xl hover:border-red-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Couple Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-200">
                  <img
                    src={st.image}
                    alt={st.coupleName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#D91B2B] shadow-xs">
                    {st.matchDuration}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {st.coupleName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {st.weddingDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D91B2B]" />
                        {st.marriageCity}
                      </span>
                    </div>
                  </div>

                  <div className="relative pl-6 italic text-xs text-slate-700 leading-relaxed">
                    <Quote className="w-4 h-4 text-[#D91B2B] absolute left-0 top-0 opacity-70" />
                    "{st.storyQuote}"
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {st.fullStory}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Marriage Match by Shadikabbo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Callout */}
        <div className="mt-14 text-center">
          <p className="text-xs text-slate-300 mb-3">
            Ready to write your own chapter with a respectful, verified partner?
          </p>
          <button
            onClick={onOpenRegister}
            className="px-7 py-3 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-bold shadow-lg shadow-rose-900/40 hover:shadow-xl transition-all"
          >
            Create Your Verified Matrimonial Biodata
          </button>
        </div>
      </div>
    </section>
  );
};
