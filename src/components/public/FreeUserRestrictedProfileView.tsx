import React from 'react';
import { Lock, ShieldAlert, Crown, PhoneCall, HelpCircle, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { ShadikabboAuthorityDeskCard } from '../common/ShadikabboAuthorityDeskCard';
import { UserAccount } from '../../types';

interface FreeUserRestrictedProfileViewProps {
  currentUser: UserAccount | null;
  onOpenUpgrade: () => void;
  onOpenEditBiodata?: () => void;
}

export const FreeUserRestrictedProfileView: React.FC<FreeUserRestrictedProfileViewProps> = ({
  currentUser,
  onOpenUpgrade,
  onOpenEditBiodata,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-in fade-in">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-rose-50 via-amber-50/60 to-rose-50 border border-rose-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#16205B] text-white flex items-center justify-center shrink-0 shadow-md">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D91B2B] text-white shadow-2xs">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ফ্রি একাউন্ট নোটিশ (Free Account Notice)</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-display">
              প্রোফাইল সেকশনের সুবিধাসমূহ সাময়িকভাবে সংরক্ষিত
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              সম্মানিত ব্যবহারকারী, পাত্র-পাত্রী ও পরিবারের মর্যাদা ও গোপনীয়তা সুরক্ষার স্বার্থে 
              <strong> ফ্রি একাউন্টের জন্য বায়োডাটার বিস্তারিত সুবিধাসমূহ (Facilities) উন্মুক্ত রাখা হয়নি</strong>।
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
            <button
              onClick={onOpenUpgrade}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#16205B] to-[#D91B2B] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>আপগ্রেড মেম্বারশিপ প্ল্যান</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column Explaining Why Profiles are Hidden + Right Column The User's Selected Option Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Clear Explanation of Why Profile is not visible and Must Contact Authority */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D91B2B] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>গুরুত্বপূর্ণ তথ্য ও নির্দেশনা</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              প্রোফাইল কেন দেখতে পাচ্ছেন না তা জানতে কর্তৃপক্ষের সাথে যোগাযোগ করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              শাদী কাব্য একটি বিশ্বস্ত ও ভেরিফাইড পারিবারিক ম্যাট্রিমনি প্ল্যাটফর্ম। অযাচিত পর্যবেক্ষণ রোধ এবং সঠিক পাত্র-পাত্রী নির্বাচনে আমাদের ম্যাচমেকার টিম সরাসরি প্রতিটি প্রোফাইল তত্ত্বাবধান করে।
            </p>
          </div>

          {/* Points list */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-rose-100 text-[#D91B2B] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ১
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  ফ্রি একাউন্টে কোনো প্রোফাইল সুবিধা (Facilities) দেওয়া হবে না
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  ফ্রি মেম্বারশিপে কোনো পাত্র-পাত্রীর পূর্ণাঙ্গ তথ্য, অভিভাবকের নম্বর, পারিবারিক ইতিহাস বা শিক্ষাগত যোগ্যতা দেখার সুবিধা বন্ধ রাখা হয়েছে।
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-[#16205B] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ২
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  সরাসরি শাদী কাব্য কর্তৃপক্ষের সাথে যোগাযোগ
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  প্রোফাইল কেন দেখা যাচ্ছে না, আপনার পছন্দ অনুযায়ী পাত্র-পাত্রী কীভাবে নির্বাচন করবেন এবং আপনার সুবিধাসমূহ আনলক করতে নিচের <strong>হেল্পলাইনে কল করুন</strong> অথবা <strong>লাইভ চ্যাট বোর্ডে</strong> কর্তৃপক্ষের সাথে যোগাযোগ করুন।
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ৩
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  ভেরিফায়েড অভিভাবক সমন্বয় ও ম্যাচমেকার সহযোগিতা
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  কর্তৃপক্ষের অনুমোদনের পর আপনাকে একজন ডেডিকেটেড রিলেশনশিপ অফিসার দেওয়া হবে, যিনি দুই পরিবারের মধ্যে নিরাপদ ও শালীন যোগাযোগ করিয়ে দেবেন।
                </p>
              </div>
            </div>
          </div>

          {/* Quick Notice footer */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              আপনার একাউন্ট: <strong>{currentUser?.name || 'ফ্রি ব্যবহারকারী'}</strong> ({currentUser?.membershipPlan === 'free' ? 'ফ্রি প্ল্যান' : 'রেজিস্টার্ড'})
            </span>
            <button
              onClick={onOpenUpgrade}
              className="text-[#D91B2B] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              প্যাকেজসমূহ দেখুন <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: User's EXACT Selected Option Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            কর্তৃপক্ষের সাথে যোগাযোগের মাধ্যম (Contact Authority)
          </div>
          <ShadikabboAuthorityDeskCard
            userName={currentUser?.name || 'User'}
            helplineNumber="+8801711009988"
            helplineDisplay="+880 1711-009988"
          />
        </div>
      </div>
    </div>
  );
};
