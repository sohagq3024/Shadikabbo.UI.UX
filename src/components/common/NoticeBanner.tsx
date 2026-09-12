import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { Megaphone, PhoneCall, X, MessageCircle } from 'lucide-react';

interface NoticeBannerProps {
  siteSettings: SiteSettings;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ siteSettings }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!siteSettings.noticeEnabled || !siteSettings.noticeText || isDismissed) {
    return null;
  }

  return (
    <div className="relative z-40 bg-gradient-to-r from-[#D91B2B] via-[#b91422] to-[#16205B] text-white text-xs py-2 px-4 shadow-md border-b border-white/15">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Side: Badge & Scrolling / Prominent Announcement */}
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#D91B2B] font-extrabold text-[11px] shadow-xs shrink-0 uppercase tracking-wider">
            <Megaphone className="w-3 h-3 text-[#D91B2B] animate-pulse" />
            <span>{siteSettings.noticeBadge || 'জরুরি নোটিশ'}</span>
          </div>

          <p className="font-medium text-white/95 text-xs truncate sm:text-clip leading-tight">
            {siteSettings.noticeText}
          </p>
        </div>

        {/* Right Side: Quick Action & Close Button */}
        <div className="flex items-center gap-2 shrink-0">
          {siteSettings.whatsappNumber && (
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          )}

          {siteSettings.helplinePhone1 && (
            <a
              href={`tel:${siteSettings.helplinePhone1}`}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-[11px] transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{siteSettings.helplinePhone1}</span>
            </a>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            title="Dismiss notice"
            className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
