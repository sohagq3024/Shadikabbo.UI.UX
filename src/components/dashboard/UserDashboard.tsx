import React, { useState } from 'react';
import { UserAccount, MatrimonialProfile, ProposalItem, MembershipPlan } from '../../types';
import {
  User,
  Heart,
  Send,
  Inbox,
  ShieldCheck,
  Edit3,
  Crown,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  Calendar,
  Briefcase,
  MapPin,
  Clock,
  MessageCircle,
  Lock,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import { BrandLogo } from '../common/BrandLogo';
import { EditBiodataSection } from './EditBiodataSection';
import { ShadikabboLiveChatModal } from './ShadikabboLiveChatModal';

interface UserDashboardProps {
  currentUser: UserAccount;
  myProfile: MatrimonialProfile;
  proposals: ProposalItem[];
  allProfiles: MatrimonialProfile[];
  initialTab?: 'overview' | 'proposals' | 'edit-profile' | 'counselor';
  onUpdateProfile: (updated: MatrimonialProfile) => void;
  onOpenUpgrade: () => void;
  onViewProfile: (profile: MatrimonialProfile) => void;
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  myProfile,
  proposals,
  allProfiles,
  initialTab = 'overview',
  onUpdateProfile,
  onOpenUpgrade,
  onViewProfile,
  onAcceptProposal,
  onDeclineProposal,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'proposals' | 'edit-profile' | 'counselor'>(
    initialTab || 'overview'
  );

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [proposalSubTab, setProposalSubTab] = useState<'received' | 'sent'>('received');
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const helplineNumber = '+8801711009988';
  const helplineDisplay = '+880 1711-009988';

  // Filter proposals involving this user
  const sentProposals = proposals.filter((p) => p.senderProfileId === myProfile.profileId);
  const receivedProposals = proposals.filter((p) => p.receiverProfileId === myProfile.profileId);

  const getProfileByCandidateId = (candId: string) => {
    return allProfiles.find((p) => p.profileId === candId);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={myProfile.avatar}
                alt={myProfile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {myProfile.name}
                </h1>
                <span className="font-mono text-xs font-bold text-[#D91B2B] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {myProfile.profileId}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {myProfile.profession} • {myProfile.presentCity}, {myProfile.presentCountry}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span
                  id="user-membership-plan-badge"
                  className={`inline-flex items-center gap-1.5 font-semibold px-2.5 py-0.5 rounded-md ${
                    currentUser.membershipPlan === 'free'
                      ? 'bg-amber-50 text-amber-900 border border-amber-200/90'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Plan:
                  {currentUser.membershipPlan === 'free' ? (
                    <strong className="text-amber-800 font-bold flex items-center gap-1">
                      Free
                      <span className="text-[10px] font-medium text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded">
                        No Plan Purchased
                      </span>
                    </strong>
                  ) : (
                    <strong className="capitalize text-[#16205B]">{currentUser.membershipPlan}</strong>
                  )}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  NID Verified
                </span>
              </div>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('edit-profile')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={onOpenUpgrade}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#16205B] to-[#D91B2B] hover:opacity-95 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Upgrade Plan</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar - Compact names & 4-column responsive grid (Zero horizontal scroll needed on mobile) */}
        <div className="grid grid-cols-4 border-b border-slate-200 gap-1 sm:gap-2 bg-slate-100/70 p-1 sm:p-0 sm:bg-transparent rounded-2xl sm:rounded-none">
          {[
            { id: 'overview', label: 'Dashboard', icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
            {
              id: 'proposals',
              label: 'Proposals',
              icon: <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />,
              count: receivedProposals.length + sentProposals.length,
            },
            {
              id: 'edit-profile',
              label: 'Edit Profile',
              icon: <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />,
            },
            { id: 'counselor', label: 'Matchmaker', icon: <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-xs font-bold transition-all rounded-xl sm:rounded-b-none sm:border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#D91B2B] shadow-xs sm:shadow-none sm:bg-transparent sm:border-[#D91B2B] font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 sm:hover:bg-transparent sm:border-transparent'
              }`}
            >
              {tab.icon}
              <span className="truncate text-center">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#D91B2B] text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Received Proposals</span>
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#D91B2B] flex items-center justify-center">
                    <Inbox className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{receivedProposals.length}</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">Pending family decisions</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Sent Proposals</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{sentProposals.length}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">Awaiting guardian responses</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Profile Views</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">42</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">+14 this past week</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Membership Tier</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xl font-bold capitalize text-[#16205B]">
                  {currentUser.membershipPlan === 'free' ? 'Free Plan' : `${currentUser.membershipPlan} Plan`}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {currentUser.membershipPlan === 'free' ? 'No plan purchased yet' : 'Active Paid Package'}
                </p>
                <button
                  onClick={onOpenUpgrade}
                  className="text-[11px] text-[#D91B2B] hover:underline font-bold mt-1 inline-block"
                >
                  {currentUser.membershipPlan === 'free' ? 'Purchase a Plan →' : 'Upgrade to VIP →'}
                </button>
              </div>
            </div>

            {/* Quick Actions & Recent Proposals Alert */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Recent Received Proposals */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      Recent Marriage Proposals
                    </h3>
                    <p className="text-xs text-slate-500">
                      Profiles who expressed interest in your matrimonial biodata
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('proposals')}
                    className="text-xs font-bold text-[#16205B] hover:text-[#D91B2B]"
                  >
                    View All &rarr;
                  </button>
                </div>

                {receivedProposals.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No received proposals yet. Browse candidates and express interest to start conversations!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {receivedProposals.slice(0, 3).map((prop) => {
                      const sender = getProfileByCandidateId(prop.senderProfileId);
                      return (
                        <div
                          key={prop.id}
                          className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={sender?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'}
                              alt={prop.senderName}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-slate-900">
                                  {prop.senderName}
                                </h4>
                                <span className="font-mono text-[10px] text-slate-500">
                                  ({prop.senderProfileId})
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {sender?.profession || 'Professional'} • {sender?.presentCity || 'Dhaka'}
                              </p>
                              <p className="text-[11px] text-slate-600 italic mt-1 line-clamp-1">
                                "{prop.message}"
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {prop.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => onAcceptProposal(prop.id)}
                                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-2xs"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => onDeclineProposal(prop.id)}
                                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-100 transition-colors"
                                >
                                  Decline
                                </button>
                              </>
                            ) : (
                              <span className={`text-xs font-bold capitalize px-2.5 py-1 rounded-lg ${
                                prop.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                              }`}>
                                {prop.status}
                              </span>
                            )}
                            {sender && (
                              <button
                                onClick={() => onViewProfile(sender)}
                                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200"
                                title="View candidate profile"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Shadikabbo Official Helpline & Matchmaker Desk */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#16205B] via-[#1B2668] to-[#0D153B] text-white rounded-3xl p-6 shadow-lg border border-white/10 space-y-5 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative subtle ambient glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

                <div>
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
                      24/7 Helpline
                    </span>
                  </div>

                  {/* Shadikabbo Brand Highlighting (No individual person name) */}
                  <div className="flex items-center gap-3 mb-3">
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

                  <p className="text-xs text-slate-300 leading-relaxed">
                    অভিভাবক আলোচনা, সঠিক পাত্র/পাত্রী নির্বাচন ও বায়োডাটা অনুসন্ধানে শাদী কাব্য টিম সরাসরি সহায়তায় প্রস্তুত।
                  </p>

                  {/* Free Plan Guidance Notice */}
                  {currentUser.membershipPlan === 'free' && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-400/20 border border-amber-300/30 text-[11px] text-amber-200 flex items-start gap-2">
                      <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        ফ্রি একাউন্ট: পূর্ণাঙ্গ বায়োডাটা সুবিধার তথ্য জানতে কর্তৃপক্ষের সাথে সরাসরি যোগাযোগ করুন।
                      </span>
                    </div>
                  )}

                  {/* Helpline Details Box */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 flex items-center gap-1.5">
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

                {/* Two Action Buttons: Direct Dialer & Full-Page Live Chat */}
                <div className="space-y-2.5 pt-2">
                  {/* Button 1: Request Callback / Direct Mobile Dialer */}
                  <a
                    href={`tel:${helplineNumber}`}
                    className="w-full py-3 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Request Callback (সরাসরি কল করুন)</span>
                  </a>

                  {/* Button 2: Live Chat - Opens Full Page Jag Board */}
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
            </div>
          </div>
        )}

        {/* TAB 2: Proposals Management */}
        {activeTab === 'proposals' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            {/* Sub-tabs: Received vs Sent */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setProposalSubTab('received')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    proposalSubTab === 'received'
                      ? 'bg-[#16205B] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Received Proposals ({receivedProposals.length})
                </button>
                <button
                  onClick={() => setProposalSubTab('sent')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    proposalSubTab === 'sent'
                      ? 'bg-[#16205B] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Sent Proposals ({sentProposals.length})
                </button>
              </div>

              <span className="text-xs text-slate-500 hidden sm:inline">
                Formal expressions of interest between families
              </span>
            </div>

            {/* List */}
            {proposalSubTab === 'received' ? (
              receivedProposals.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No proposals received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {receivedProposals.map((prop) => {
                    const sender = getProfileByCandidateId(prop.senderProfileId);
                    return (
                      <div
                        key={prop.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={sender?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'}
                            alt={prop.senderName}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900 font-display">
                                {prop.senderName}
                              </h4>
                              <span className="font-mono text-xs text-[#D91B2B] bg-rose-50 px-2 py-0.5 rounded">
                                {prop.senderProfileId}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              {sender?.profession} • {sender?.presentCity}, {sender?.presentCountry}
                            </p>
                            <p className="text-xs text-slate-700 italic bg-slate-50 p-2 rounded-xl mt-1 max-w-xl">
                              "{prop.message}"
                            </p>
                            <span className="text-[10px] text-slate-400 block">
                              Received on {prop.createdAt}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full sm:w-auto">
                          {sender && (
                            <button
                              onClick={() => onViewProfile(sender)}
                              className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                            >
                              View Biodata
                            </button>
                          )}
                          {prop.status === 'pending' ? (
                            <div className="flex gap-2 w-full sm:w-auto">
                              <button
                                onClick={() => onAcceptProposal(prop.id)}
                                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                              >
                                Accept & Unlock Contact
                              </button>
                              <button
                                onClick={() => onDeclineProposal(prop.id)}
                                className="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium"
                              >
                                Decline
                              </button>
                            </div>
                          ) : (
                            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${
                              prop.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                            }`}>
                              Status: {prop.status}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              sentProposals.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  You haven't sent any marriage proposals yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {sentProposals.map((prop) => {
                    const receiver = getProfileByCandidateId(prop.receiverProfileId);
                    return (
                      <div
                        key={prop.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={receiver?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                            alt={prop.receiverName}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900 font-display">
                                {prop.receiverName}
                              </h4>
                              <span className="font-mono text-xs text-[#D91B2B] bg-rose-50 px-2 py-0.5 rounded">
                                {prop.receiverProfileId}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              {receiver?.profession} • {receiver?.presentCity}
                            </p>
                            <p className="text-xs text-slate-500 italic">
                              "{prop.message}"
                            </p>
                            <span className="text-[10px] text-slate-400 block">
                              Sent on {prop.createdAt}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${
                            prop.status === 'accepted'
                              ? 'bg-emerald-50 text-emerald-700'
                              : prop.status === 'pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}>
                            {prop.status === 'pending' ? 'Pending Consideration' : prop.status}
                          </span>
                          {receiver && (
                            <button
                              onClick={() => onViewProfile(receiver)}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                            >
                              View Profile
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        )}

        {/* TAB 3: Edit Profile (4-Step Comprehensive Biodata Editor) */}
        {activeTab === 'edit-profile' && (
          <EditBiodataSection
            currentUser={currentUser}
            myProfile={myProfile}
            onUpdateProfile={(updated) => {
              onUpdateProfile(updated);
            }}
            onCancel={() => setActiveTab('overview')}
          />
        )}

        {/* TAB 4: Counselor / Matchmaker Desk */}
        {activeTab === 'counselor' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#16205B] to-[#0D153B] flex items-center justify-center p-3 shadow-md border-2 border-white ring-1 ring-slate-200 shrink-0">
                <BrandLogo size="sm" variant="icon-only" inverted />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Shadikabbo Matchmaker Support Active
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Shadikabbo Relationship Desk
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Official Matchmaking Advisors • Head Office (Gulshan-2, Dhaka)
                </p>
                <p className="text-xs text-slate-600 max-w-xl pt-1 leading-relaxed">
                  "আমাদের টিম সম্মানিত পরিবারবর্গের জন্য নিরাপদ ও মর্যাদাশীল পাত্র-পাত্রী বাছাই এবং অভিভাবক সমন্বয়ে সার্বক্ষণিক কাজ করে। যেকোনো তথ্যে লাইভ চ্যাট অথবা সরাসরি হেল্পলাইনে কল করুন।"
                </p>
              </div>
            </div>

            {/* Counselor Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#16205B] shadow-2xs">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Direct Phone Call</h4>
                  <p className="font-mono text-xs font-bold text-[#D91B2B]">{helplineDisplay}</p>
                </div>
                <a
                  href={`tel:${helplineNumber}`}
                  className="w-full py-2 bg-[#D91B2B] hover:bg-[#b91422] text-white rounded-xl text-xs font-bold text-center block transition-all shadow-2xs cursor-pointer"
                >
                  Call Now (সরাসরি কল)
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-2xs">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Live Support Chat</h4>
                  <p className="text-xs text-emerald-700 font-semibold">● Active Board (অনলাইন)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLiveChatOpen(true)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  Open Live Chat Board
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#16205B] flex items-center justify-center shadow-2xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Office Appointment</h4>
                  <p className="text-xs text-slate-500">Gulshan-2, Dhaka-1212</p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Appointment Requested', 'Our front desk will contact you to confirm a meeting at the Gulshan office.', 'info')}
                  className="w-full py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Book Office Visit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Page Shadikabbo Live Chat Board Modal */}
      <ShadikabboLiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        helplineNumber={helplineNumber}
        userName={currentUser.name}
      />
    </div>
  );
};
