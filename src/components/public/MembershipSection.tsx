import React, { useState } from 'react';
import { MembershipPlan } from '../../types';
import { MEMBERSHIP_PLANS } from '../../data/mockData';
import { Check, Sparkles, Crown, ArrowRight, PhoneCall, ShieldCheck, Gem } from 'lucide-react';
import { useToast } from '../common/Toast';

interface MembershipSectionProps {
  currentPlanId?: string;
  onSelectPlan: (plan: MembershipPlan) => void;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  currentPlanId = 'basic',
  onSelectPlan,
  isLoggedIn,
  onOpenLogin,
  onOpenRegister,
}) => {
  const { showToast } = useToast();
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<MembershipPlan | null>(null);

  // Filter out any free plan so only the 3 paid premium tiers are displayed
  const paidPlans = MEMBERSHIP_PLANS.filter((p) => p.id !== 'free');

  const handlePlanClick = (plan: MembershipPlan) => {
    if (!isLoggedIn) {
      setSelectedPlanForModal(plan);
    } else {
      onSelectPlan(plan);
      showToast('Plan Selected', `You have selected the ${plan.name} (${plan.duration}). Matchmaker guidance initiated.`, 'success');
    }
  };

  return (
    <section id="membership-section" className="relative overflow-hidden bg-gradient-to-br from-[#02061f] via-[#000080]/90 to-[#040827] text-white py-12 sm:py-16 transition-all duration-300 -mt-1">
      {/* Dynamic Animated Shifting Background Glow & Mesh matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030722] via-[#000080]/80 to-[#04092b] animate-color-shift pointer-events-none" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#E60000]/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-10 w-96 h-96 bg-[#000080]/50 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />

      <div className="relative max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] sm:text-xs font-bold">
            <Crown className="w-3.5 h-3.5" />
            <span>Matrimonial Membership Plans</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Transparent, Dignified Investment in Your Future
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed px-2 sm:px-0">
            Choose the package that aligns with your family’s search urgency with guaranteed privacy and dedicated matrimonial assistance.
          </p>
        </div>

        {/* 3 Luxury Membership Cards - Mobile: 3 cards in 1 line (grid-cols-3), PC: 3 columns */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 items-stretch pt-3">
          {paidPlans.map((plan) => {
            const isCurrent = currentPlanId === plan.id;
            const isPopular = plan.isPopular;
            const isVIP = plan.id === 'special';

            // Card Style Configurations for Premium Aesthetics
            let cardClasses = 'relative rounded-xl sm:rounded-3xl p-2 sm:p-6 lg:p-7 transition-all duration-300 flex flex-col justify-between ';
            if (isPopular) {
              cardClasses += 'bg-gradient-to-b from-[#182668] via-[#121c4e] to-[#0d143a] text-white border-2 border-amber-400/90 shadow-xl sm:shadow-2xl sm:-translate-y-2 ring-1 sm:ring-2 ring-amber-400/30';
            } else if (isVIP) {
              cardClasses += 'bg-gradient-to-b from-[#171923] via-[#1c1626] to-[#0f111a] text-white border border-rose-500/40 shadow-lg sm:shadow-xl hover:shadow-2xl hover:border-rose-400';
            } else {
              cardClasses += 'bg-white text-slate-900 border border-white/90 shadow-2xl shadow-black/30 hover:shadow-2xl hover:border-slate-300';
            }

            return (
              <div key={plan.id} className={cardClasses}>
                {/* Popular / VIP Ribbon */}
                {isPopular && (
                  <div className="absolute -top-2.5 sm:-top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-rose-500 to-[#D91B2B] text-white text-[7px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap z-10">
                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-amber-200" />
                    <span className="hidden sm:inline">RECOMMENDED</span>
                    <span className="sm:hidden">POPULAR</span>
                  </div>
                )}
                {isVIP && (
                  <div className="absolute -top-2.5 sm:-top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-700 via-purple-700 to-amber-600 text-white text-[7px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap z-10">
                    <Crown className="w-2 h-2 sm:w-3 sm:h-3 text-amber-300" />
                    <span>VIP ELITE</span>
                  </div>
                )}

                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between mb-1.5 sm:mb-3 gap-1">
                    <span
                      className={`text-[7px] sm:text-[10px] font-bold uppercase tracking-wider px-1 sm:px-2.5 py-0.5 rounded truncate ${
                        isPopular
                          ? 'bg-white/15 text-amber-300 border border-amber-400/30'
                          : isVIP
                          ? 'bg-white/10 text-rose-300 border border-rose-400/30'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {plan.badge}
                    </span>
                    <span
                      className={`text-[7px] sm:text-xs font-semibold shrink-0 ${
                        isPopular ? 'text-amber-200' : isVIP ? 'text-rose-200' : 'text-[#D91B2B]'
                      }`}
                    >
                      {plan.duration}
                    </span>
                  </div>

                  {/* Plan Name & Bangla Title */}
                  <h3 className="text-[11px] sm:text-lg lg:text-xl font-bold font-display leading-tight truncate">
                    {plan.name}
                  </h3>
                  <p
                    className={`text-[8px] sm:text-xs truncate ${
                      isPopular ? 'text-slate-300' : isVIP ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {plan.nameBangla}
                  </p>

                  {/* Price */}
                  <div className="my-2 sm:my-5">
                    <div className="flex items-baseline gap-0.5 sm:gap-1">
                      <span
                        className={`text-xs sm:text-2xl lg:text-3xl font-extrabold tracking-tight ${
                          isPopular || isVIP ? 'text-white' : 'text-[#16205B]'
                        }`}
                      >
                        ৳{plan.priceBDT.toLocaleString()}
                      </span>
                      <span
                        className={`text-[7px] sm:text-xs font-medium truncate ${
                          isPopular ? 'text-slate-300' : isVIP ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        / {plan.duration}
                      </span>
                    </div>
                  </div>

                  {/* Quick Feature Highlights (Proposals & Unlocks) */}
                  <div
                    className={`p-1.5 sm:p-3 rounded-lg sm:rounded-2xl mb-2 sm:mb-4 space-y-0.5 sm:space-y-1 text-[7px] sm:text-xs font-semibold ${
                      isPopular
                        ? 'bg-white/10 text-amber-200'
                        : isVIP
                        ? 'bg-white/10 text-rose-200'
                        : 'bg-rose-50/70 text-[#16205B]'
                    }`}
                  >
                    <p className="flex items-center gap-1 truncate">
                      <Check className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-[#D91B2B] shrink-0" />
                      <span className="truncate">{plan.proposalsAllowed}</span>
                    </p>
                    <p className="flex items-center gap-1 truncate">
                      <Check className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-[#D91B2B] shrink-0" />
                      <span className="truncate">{plan.contactViews}</span>
                    </p>
                  </div>

                  {/* Clean Streamlined Feature Bullets */}
                  <ul className="space-y-1 sm:space-y-2 text-[7px] sm:text-xs">
                    {plan.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1 sm:gap-1.5">
                        <Check
                          className={`w-2 h-2 sm:w-3.5 sm:h-3.5 shrink-0 ${
                            isPopular ? 'text-amber-300' : isVIP ? 'text-rose-400' : 'text-emerald-600'
                          }`}
                        />
                        <span
                          className={`truncate ${
                            isPopular ? 'text-slate-200' : isVIP ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-slate-100/15">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[8px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-center cursor-default"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlanClick(plan)}
                      className={`w-full py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-[8px] sm:text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 ${
                        isPopular
                          ? 'bg-gradient-to-r from-[#D91B2B] to-[#b91422] hover:from-[#c21524] hover:to-[#9f0e1b] text-white shadow-rose-900/40'
                          : isVIP
                          ? 'bg-gradient-to-r from-rose-600 to-amber-700 hover:opacity-90 text-white'
                          : 'bg-[#16205B] hover:bg-[#0f1744] text-white'
                      }`}
                    >
                      <span className="hidden sm:inline">Choose {plan.name.replace(' Package', '')}</span>
                      <span className="sm:hidden">Select</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate / Family Inquiry Callout */}
        <div className="mt-10 sm:mt-14 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white font-display">
                Need Confidential VIP Executive Consultation?
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-300 max-w-lg mt-0.5">
                For distinguished business families, physicians, bureaucrats, and overseas expatriates requiring private matrimonial representation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={() => showToast('VIP Desk Connected', 'Our lead counselor Kabir (+880 1711-009988) has been requested for a confidential callback.', 'info')}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-[11px] sm:text-xs font-bold transition-colors"
            >
              VIP Callback
            </button>
            <button
              onClick={onOpenRegister}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white text-[11px] sm:text-xs font-bold transition-colors shadow-lg shadow-rose-900/40"
            >
              Register Candidate
            </button>
          </div>
        </div>

        {/* Modal for Unauthenticated User selecting Paid Plan */}
        {selectedPlanForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-[#D91B2B] flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Register to Activate {selectedPlanForModal.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To activate your <strong>{selectedPlanForModal.name} (৳{selectedPlanForModal.priceBDT.toLocaleString()})</strong>, please create your verified matrimonial profile first or log in to your existing account.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSelectedPlanForModal(null);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Create Matrimonial Profile
                </button>
                <button
                  onClick={() => {
                    setSelectedPlanForModal(null);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
                >
                  Log In to Existing Account
                </button>
                <button
                  onClick={() => setSelectedPlanForModal(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 mt-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

