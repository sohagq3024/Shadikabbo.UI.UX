import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Heart,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface HeroSectionProps {
  onSearch: (filters: { gender: string; minAge: number; maxAge: number; country: string }) => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  isLoggedIn?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenRegister,
  onOpenLogin,
  isLoggedIn = false,
}) => {
  const { showToast } = useToast();
  const [lookingFor, setLookingFor] = useState<'Female' | 'Male'>('Female');
  const [minAge, setMinAge] = useState<number>(22);
  const [maxAge, setMaxAge] = useState<number>(30);
  const [country, setCountry] = useState<string>('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      showToast(
        'Login Mandatory',
        'বায়োডাটা অনুসন্ধান করতে দয়া করে প্রথমে লগইন করুন। (Login is mandatory to search profiles)',
        'info'
      );
      onOpenLogin();
      return;
    }
    onSearch({
      gender: lookingFor,
      minAge,
      maxAge,
      country,
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#02061f] via-[#000080] to-[#040827] text-white pt-20 sm:pt-22 lg:pt-24 pb-3 sm:pb-4 lg:pb-6 transition-all duration-300">
      {/* Dynamic Animated Shifting Background Glow & Mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030722] via-[#000080]/80 to-[#04092b] animate-color-shift pointer-events-none" />

      {/* Dynamic Crimson & Royal Navy Glowing Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#000080]/60 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#E60000]/25 via-rose-600/15 to-transparent rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-[#000080]/40 via-[#E60000]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Curving Dynamic Red Wave Ribbon (Signature Reference Accent) */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden opacity-85">
        <svg
          viewBox="0 0 1440 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-[160%] -left-[30%] -top-[10%] h-[120%] object-cover animate-wave-float"
        >
          <path
            d="M-100,280 C280,180 520,440 920,240 C1220,90 1480,310 1600,260 L1600,650 L-100,650 Z"
            fill="url(#redWaveGradient)"
            opacity="0.22"
          />
          <path
            d="M-50,340 C320,220 600,480 1000,290 C1280,160 1460,350 1580,310"
            stroke="url(#redStrokeGradient)"
            strokeWidth="3.5"
            strokeDasharray="8 6"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="redWaveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000080" stopOpacity="0.1" />
              <stop offset="45%" stopColor="#E60000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#030722" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="redStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000080" />
              <stop offset="50%" stopColor="#E60000" />
              <stop offset="100%" stopColor="#FFA3AC" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Wedding Alpona & Starry Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:28px_28px]" />

      {/* Top subtle red accent line bridging the navbar seamlessly */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E60000]/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Grid: On Desktop, Left is Content, Right is 3-Phone Showcase, Bottom is Search Card.
            On Mobile: Top (order-1) is 3-Phone Showcase, then (order-2) Full Search Card, then (order-3) Headline & Trust badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">

          {/* 3 Mobile Frames: Absolute Top on Mobile (order-1), Right Column on Desktop (lg:order-2 lg:col-span-6) */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative flex items-center justify-center pt-5 pb-3 sm:pt-4 sm:pb-3 lg:py-0">
            {/* Ambient radiant glow behind the phones */}
            <div className="absolute w-60 sm:w-72 h-60 sm:h-72 bg-gradient-to-tr from-[#E60000]/30 via-[#FF2A42]/20 to-[#000080]/40 rounded-full blur-3xl pointer-events-none" />

            {/* The 3-Phone Presentation Grid */}
            <div className="relative flex items-center justify-center">

              {/* LEFT PHONE (Smaller, angled - Groom) */}
              <div className="relative w-26 sm:w-36 h-[215px] sm:h-[290px] -rotate-8 translate-y-3 -mr-6 sm:-mr-8 z-10 opacity-90 hover:opacity-100 hover:rotate-0 hover:z-30 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                {/* Outer Phone Bezel */}
                <div className="w-full h-full rounded-[24px] sm:rounded-[26px] p-1.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black ring-1 ring-white/30 shadow-2xl shadow-black/80 border border-slate-700/60 relative flex flex-col">
                  {/* Inner Screen: Just Photo & 2-Line Text Overlay */}
                  <div className="relative w-full h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                      alt="Tariqur Rahman - Matrimonial Groom"
                      className="w-full h-full object-cover"
                    />
                    {/* Dark gradient at the bottom for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Bottom 2-Line Text Overlay */}
                    <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 text-left">
                      <p className="text-[10px] sm:text-[11px] font-bold text-white leading-tight">
                        Tariqur Rahman, 29
                      </p>
                      <p className="text-[8.5px] sm:text-[9px] text-slate-300 truncate mt-0.5 font-normal">
                        Sr. Architect • London, UK
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER PHONE (Tallest, Featured Centerpiece - Bride) */}
              <div className="relative w-36 sm:w-50 h-[285px] sm:h-[375px] z-20 shadow-2xl shadow-black/90 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                {/* Outer Phone Bezel */}
                <div className="w-full h-full rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 bg-gradient-to-b from-slate-600 via-slate-800 to-black ring-2 ring-white/45 shadow-2xl shadow-black/90 border border-slate-600/70 relative flex flex-col">
                  {/* Inner Screen: Just Photo & 2-Line Text Overlay */}
                  <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                      alt="Dr. Anika Tabassum - Matrimonial Bride"
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Dark gradient at the bottom for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                    {/* Bottom 2-Line Text Overlay */}
                    <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3.5 sm:inset-x-3 text-left">
                      <p className="text-[11px] sm:text-sm font-bold text-white leading-tight">
                        Dr. Anika Tabassum, 26
                      </p>
                      <p className="text-[9.5px] sm:text-[11px] text-slate-300 truncate mt-0.5 font-normal">
                        Doctor (MBBS) • Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT PHONE (Smaller, angled - Bride) */}
              <div className="relative w-26 sm:w-36 h-[215px] sm:h-[290px] rotate-8 translate-y-3 -ml-6 sm:-ml-8 z-10 opacity-90 hover:opacity-100 hover:rotate-0 hover:z-30 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                {/* Outer Phone Bezel */}
                <div className="w-full h-full rounded-[24px] sm:rounded-[26px] p-1.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black ring-1 ring-white/30 shadow-2xl shadow-black/80 border border-slate-700/60 relative flex flex-col">
                  {/* Inner Screen: Just Photo & 2-Line Text Overlay */}
                  <div className="relative w-full h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
                      alt="Nusrat Jahan - Matrimonial Candidate"
                      className="w-full h-full object-cover"
                    />
                    {/* Dark gradient at the bottom for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Bottom 2-Line Text Overlay */}
                    <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 text-left">
                      <p className="text-[10px] sm:text-[11px] font-bold text-white leading-tight">
                        Nusrat Jahan, 24
                      </p>
                      <p className="text-[8.5px] sm:text-[9px] text-slate-300 truncate mt-0.5 font-normal">
                        Lecturer in English • Chittagong
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Search Bar: Directly under the mobile frames on mobile (order-2), Spanning bottom on Desktop (lg:order-3 lg:col-span-12) */}
          <div className="order-2 lg:order-3 lg:col-span-12 mt-1 sm:mt-3 lg:mt-6 pt-2 lg:pt-3 border-t border-white/10">
            <div className="relative bg-white/95 hover:bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-slate-900 shadow-2xl shadow-black/35 border border-white/90 overflow-hidden transition-all duration-300">
              {/* Top illuminated red & blue gradient line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#000080] via-[#E60000] to-[#000080]" />

              {/* Horizontal Form Grid spanning across full width */}
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 items-end">
                {/* 1. Looking for (Bride / Groom) - lg:col-span-3 */}
                <div className="lg:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    I am looking for
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setLookingFor('Female')}
                      className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
                        lookingFor === 'Female'
                          ? 'bg-gradient-to-r from-[#E60000] to-[#D91B2B] text-white border-[#E60000] shadow-md shadow-red-600/30'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>Bride (পাত্রী)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLookingFor('Male')}
                      className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
                        lookingFor === 'Male'
                          ? 'bg-gradient-to-r from-[#000080] to-[#16205B] text-white border-[#000080] shadow-md shadow-indigo-950/30'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>Groom (পাত্র)</span>
                    </button>
                  </div>
                </div>

                {/* 2 & 3. Min Age & Max Age Combined in ONE Line (grid-cols-2 lg:col-span-4) */}
                <div className="grid grid-cols-2 gap-2 lg:col-span-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Min Age
                    </label>
                    <select
                      value={minAge}
                      onChange={(e) => setMinAge(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]/30 focus:border-[#000080]"
                    >
                      {[20, 22, 24, 26, 28, 30, 32, 35].map((a) => (
                        <option key={a} value={a}>
                          {a} Years
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Max Age
                    </label>
                    <select
                      value={maxAge}
                      onChange={(e) => setMaxAge(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]/30 focus:border-[#000080]"
                    >
                      {[25, 27, 29, 31, 33, 36, 40, 45].map((a) => (
                        <option key={a} value={a}>
                          {a} Years
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Candidate Location / Country - lg:col-span-3 */}
                <div className="lg:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Location / Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#000080]/30 focus:border-[#000080]"
                  >
                    <option value="All">All Locations (Global & Domestic)</option>
                    <option value="Bangladesh">🇧🇩 Bangladesh</option>
                    <option value="USA">🇺🇸 USA</option>
                    <option value="UK">🇬🇧 UK</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Australia">🇦🇺 Australia</option>
                  </select>
                </div>

                {/* 5. Action Search Button - lg:col-span-2 */}
                <div className="sm:col-span-2 lg:col-span-2">
                  <button
                    type="submit"
                    className="relative overflow-hidden w-full py-2 bg-gradient-to-r from-[#E60000] via-[#FF1A38] to-[#D91B2B] hover:opacity-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-red-600/35 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ring-1 ring-red-400/40"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-light-sweep pointer-events-none" />
                    {!isLoggedIn ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-rose-100 shrink-0" />
                        <span className="font-extrabold">Search</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5 text-rose-100 shrink-0" />
                        <span className="font-extrabold">Search</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Heading, Actions & Reassurance: Only shown in left column on Desktop (hidden on mobile to eliminate empty space and pull content up) */}
          <div className="hidden lg:block lg:order-1 lg:col-span-6 space-y-5 sm:space-y-6 lg:space-y-7 text-center lg:text-left pt-2 lg:pt-0">
            {/* Main Headline with High-Contrast Bold Typography */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight font-display leading-[1.15] text-white">
              Where Dignified Hearts & Families{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#FFA3AC] to-[#FF2B44]">
                Unite For A Lifetime
              </span>
            </h1>

            {/* Primary Action Buttons - ONLY SHOWN ON DESKTOP WEB (hidden lg:flex), HIDDEN ON MOBILE */}
            <div className="hidden lg:flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                onClick={onOpenRegister}
                className="relative group overflow-hidden bg-gradient-to-r from-[#E60000] via-[#FF1A38] to-[#D91B2B] text-white px-8 sm:px-9 py-4 rounded-xl font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/40 hover:shadow-2xl hover:shadow-red-600/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ring-1 ring-red-400/50 flex items-center gap-2.5 cursor-pointer"
              >
                {/* Light sweep animation */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-light-sweep pointer-events-none" />
                <span className="tracking-wide">GET STARTED FREE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenLogin}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-4 rounded-xl font-bold text-sm sm:text-base backdrop-blur-md shadow-md transition-all duration-200 hover:border-white/50 cursor-pointer"
              >
                Member Log In
              </button>
            </div>

            {/* Sleek Trust & Family Verification Reassurance Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 text-xs text-rose-100/90">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-white">25,000+ Verified Candidates</span>
              </div>
              <div className="h-3.5 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">100% NID & Family Privacy</span>
              </div>
              <div className="h-3.5 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0 fill-rose-400/50" />
                <span className="text-slate-200">4,850+ Weddings</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
