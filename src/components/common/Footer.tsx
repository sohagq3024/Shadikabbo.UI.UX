import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, PhoneCall, Mail, MapPin, Heart, Lock, CheckCircle2, Globe2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRegister }) => {
  return (
    <footer className="bg-[#0F1538] text-slate-300 pt-16 pb-12 border-t border-[#1C2556]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Verified Profiles</h4>
              <p className="text-xs text-slate-400">National ID & education verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Total Privacy Control</h4>
              <p className="text-xs text-slate-400">Photos & numbers on consent</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dedicated Matchmakers</h4>
              <p className="text-xs text-slate-400">Human advisors guide families</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Global Bengali Diaspora</h4>
              <p className="text-xs text-slate-400">Bangladesh, USA, UK, Canada, AUS</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" inverted={true} onClick={() => onNavigate('home')} />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Shadikabbo.com is a premier matrimonial media platform dedicated to uniting educated,
              dignified, and family-oriented individuals across Bangladesh and around the world.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D91B2B]" />
                Level 7, Concord Tower, Gulshan-2, Dhaka-1212, Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D91B2B]" />
                VIP Helpline: +880 1711-009988 | +880 9612-445566
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D91B2B]" />
                matchmaking@shadikabbo.com | support@shadikabbo.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore & Match
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('profiles')} className="hover:text-white transition-colors">
                  Browse All Biodatas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profiles')} className="hover:text-white transition-colors">
                  Doctor & Engineer Profiles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profiles')} className="hover:text-white transition-colors">
                  BCS Cadre & Govt Officers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Matchmaking Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="hover:text-white transition-colors">
                  Pricing & Membership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stories')} className="hover:text-white transition-colors">
                  Happy Matrimonial Stories
                </button>
              </li>
            </ul>
          </div>

          {/* By Location / NRI Desks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Country Desks
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  🇧🇩 Dhaka & All Districts
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  🇺🇸 USA Bengali Matrimony
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  🇬🇧 UK British-Bangladeshi
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  🇨🇦 Canada PR & Citizens
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  🇦🇺 Australia Matrimony
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  🇦🇪 Middle East & Gulf Expats
                </span>
              </li>
            </ul>
          </div>

          {/* Trust & Safe Search */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Trust & Security
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>NID Verification System</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Anti-Harassment Shield</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Parent-Controlled Biodatas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confidential Executive Desk</span>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[11px] text-slate-300 font-medium mb-2">
                Ready to find your life partner?
              </p>
              <button
                onClick={onOpenRegister}
                className="w-full bg-[#D91B2B] hover:bg-[#b91422] text-white py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                Create Biodata Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Shadikabbo.com. All Rights Reserved. Designed for Dignified Bengali Matrimony.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
