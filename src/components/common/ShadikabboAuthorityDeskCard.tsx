import React, { useState } from 'react';
import { PhoneCall, MessageCircle, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ShadikabboLiveChatModal } from '../dashboard/ShadikabboLiveChatModal';

interface ShadikabboAuthorityDeskCardProps {
  userName?: string;
  helplineNumber?: string;
  helplineDisplay?: string;
  className?: string;
  isInsideModal?: boolean;
}

export const ShadikabboAuthorityDeskCard: React.FC<ShadikabboAuthorityDeskCardProps> = ({
  userName = 'Member',
  helplineNumber = '+8801711009988',
  helplineDisplay = '+880 1711-009988',
  className = '',
  isInsideModal = false,
}) => {
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-gradient-to-br from-[#16205B] via-[#1B2668] to-[#0D153B] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-white/10 space-y-5 flex flex-col justify-between relative overflow-hidden ${className}`}
      >
        {/* Subtle decorative ambient glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Active Status Marker & Shadikabbo Branding Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                Active Support
              </span>
            </div>
            <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-md font-mono">
              Official Authority Desk
            </span>
          </div>

          {/* Shadikabbo Brand Highlighting */}
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0">
              <BrandLogo size="xs" variant="icon-only" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-display tracking-tight text-white flex items-center gap-1.5">
                Shadikabbo Desk
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs font-semibold text-rose-300">
                শাদী কাব্য অফিসিয়াল রিলেশনশিপ সার্ভিস
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            অভিভাবক আলোচনা, সঠিক পাত্র/পাত্রী নির্বাচন ও বায়োডাটা অনুসন্ধানে শাদী কাব্য টিম সরাসরি সহায়তায় প্রস্তুত।
          </p>

          {/* Helpline Details Box */}
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <PhoneCall className="w-3.5 h-3.5 text-rose-300" />
                সরাসরি হেল্পলাইন:
              </span>
              <strong className="text-white font-mono text-sm tracking-wide">
                {helplineDisplay}
              </strong>
            </div>
            <div className="flex items-center justify-between text-slate-300 text-[11px] pt-1.5 border-t border-white/10">
              <span>সেবা সময়:</span>
              <span className="text-white font-medium">সকাল ১০:০০ - রাত ১০:০০</span>
            </div>
          </div>
        </div>

        {/* Two Action Buttons: Direct Mobile Dialer & Full-Page Live Chat Board */}
        <div className="space-y-2.5 pt-3 relative z-10">
          {/* Button 1: Request Callback / Direct Mobile Dialer */}
          <a
            href={`tel:${helplineNumber}`}
            className="w-full py-3 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Request Callback (সরাসরি কল করুন)</span>
          </a>

          {/* Button 2: Live Chat - Opens Full Page / Compact Live Chat Board */}
          <button
            type="button"
            onClick={() => setIsLiveChatOpen(true)}
            className="w-full py-3 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-xs sm:text-sm border border-white/20 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Live Chat (লাইভ চ্যাট বোর্ড)</span>
          </button>
        </div>
      </div>

      {/* Live Chat Board Modal */}
      <ShadikabboLiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        helplineNumber={helplineNumber}
        userName={userName}
      />
    </>
  );
};
