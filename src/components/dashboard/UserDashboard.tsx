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
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface UserDashboardProps {
  currentUser: UserAccount;
  myProfile: MatrimonialProfile;
  proposals: ProposalItem[];
  allProfiles: MatrimonialProfile[];
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
  onUpdateProfile,
  onOpenUpgrade,
  onViewProfile,
  onAcceptProposal,
  onDeclineProposal,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'proposals' | 'edit-profile' | 'counselor'>('overview');
  const [proposalSubTab, setProposalSubTab] = useState<'received' | 'sent'>('received');

  // Filter proposals involving this user
  const sentProposals = proposals.filter((p) => p.senderProfileId === myProfile.profileId);
  const receivedProposals = proposals.filter((p) => p.receiverProfileId === myProfile.profileId);

  // Edit profile state
  const [editFormData, setEditFormData] = useState({
    name: myProfile.name,
    profession: myProfile.profession,
    jobTitle: myProfile.jobTitle,
    companyOrSector: myProfile.companyOrSector,
    monthlyIncome: myProfile.monthlyIncome || '',
    presentAddress: myProfile.presentAddress,
    fatherProfession: myProfile.fatherProfession,
    motherProfession: myProfile.motherProfession,
    familyNotes: myProfile.familyNotes || '',
    bio: myProfile.bio,
    partnerMinAge: myProfile.partnerMinAge,
    partnerMaxAge: myProfile.partnerMaxAge,
    partnerProfession: myProfile.partnerProfession.join(', '),
  });

  const handleSaveProfileEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: MatrimonialProfile = {
      ...myProfile,
      name: editFormData.name,
      profession: editFormData.profession,
      jobTitle: editFormData.jobTitle,
      companyOrSector: editFormData.companyOrSector,
      monthlyIncome: editFormData.monthlyIncome,
      presentAddress: editFormData.presentAddress,
      fatherProfession: editFormData.fatherProfession,
      motherProfession: editFormData.motherProfession,
      familyNotes: editFormData.familyNotes,
      bio: editFormData.bio,
      partnerMinAge: editFormData.partnerMinAge,
      partnerMaxAge: editFormData.partnerMaxAge,
      partnerProfession: editFormData.partnerProfession.split(',').map((s) => s.trim()),
    };
    onUpdateProfile(updated);
    showToast('Biodata Updated', 'Your matrimonial profile changes have been successfully saved.', 'success');
    setActiveTab('overview');
  };

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
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  Plan: <strong className="capitalize text-[#16205B]">{currentUser.membershipPlan}</strong>
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Edit Biodata</span>
            </button>
            <button
              onClick={onOpenUpgrade}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#16205B] to-[#D91B2B] hover:opacity-95 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Upgrade Plan</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'proposals', label: `Proposals (${receivedProposals.length + sentProposals.length})`, icon: <Send className="w-4 h-4" /> },
            { id: 'edit-profile', label: 'Edit Biodata', icon: <Edit3 className="w-4 h-4" /> },
            { id: 'counselor', label: 'My Matchmaker Desk', icon: <PhoneCall className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#D91B2B] text-[#D91B2B] bg-white rounded-t-xl shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
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
                <p className="text-xl font-bold capitalize text-[#16205B]">{currentUser.membershipPlan}</p>
                <button
                  onClick={onOpenUpgrade}
                  className="text-[11px] text-[#D91B2B] hover:underline font-bold mt-1 inline-block"
                >
                  Upgrade to VIP &rarr;
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

              {/* Right Column: Assigned Matchmaker Desk */}
              <div className="lg:col-span-4 bg-gradient-to-b from-[#16205B] to-[#0D153B] text-white rounded-3xl p-6 shadow-md space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-300 text-xs font-bold mb-2">
                    <PhoneCall className="w-4 h-4" />
                    <span>Assigned Relationship Officer</span>
                  </div>
                  <h3 className="text-lg font-bold font-display">Kabir Hossain</h3>
                  <p className="text-xs text-slate-300">
                    Senior Matchmaking Consultant (10+ years experience in Dhaka & Expat marriages)
                  </p>

                  <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Direct Hotline:</span>
                      <strong className="text-white font-mono">+880 1711-009988</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Available:</span>
                      <strong className="text-white">10:00 AM - 8:00 PM</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => showToast('Counselor Alerted', 'Mr. Kabir Hossain has been notified to phone your contact number.', 'success')}
                    className="w-full py-2.5 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Request Callback
                  </button>
                  <button
                    onClick={() => setActiveTab('counselor')}
                    className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
                  >
                    Open Counselor Desk
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

        {/* TAB 3: Edit Profile */}
        {activeTab === 'edit-profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-in fade-in max-w-4xl">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Update Your Matrimonial Biodata
              </h3>
              <p className="text-xs text-slate-500">
                Keep your credentials accurate to receive genuine, high-compatibility family proposals.
              </p>
            </div>

            <form onSubmit={handleSaveProfileEdit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Profession
                  </label>
                  <input
                    type="text"
                    value={editFormData.profession}
                    onChange={(e) => setEditFormData({ ...editFormData, profession: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title / Designation
                  </label>
                  <input
                    type="text"
                    value={editFormData.jobTitle}
                    onChange={(e) => setEditFormData({ ...editFormData, jobTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Employer / Sector
                  </label>
                  <input
                    type="text"
                    value={editFormData.companyOrSector}
                    onChange={(e) => setEditFormData({ ...editFormData, companyOrSector: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Income
                  </label>
                  <input
                    type="text"
                    value={editFormData.monthlyIncome}
                    onChange={(e) => setEditFormData({ ...editFormData, monthlyIncome: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Present Address
                  </label>
                  <input
                    type="text"
                    value={editFormData.presentAddress}
                    onChange={(e) => setEditFormData({ ...editFormData, presentAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's Profession
                  </label>
                  <input
                    type="text"
                    value={editFormData.fatherProfession}
                    onChange={(e) => setEditFormData({ ...editFormData, fatherProfession: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Candidate Bio & Personality Note
                </label>
                <textarea
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Partner Expectations (Preferred Professions)
                </label>
                <input
                  type="text"
                  value={editFormData.partnerProfession}
                  onChange={(e) => setEditFormData({ ...editFormData, partnerProfession: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-bold shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: Counselor Desk */}
        {activeTab === 'counselor' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-6">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                alt="Kabir Hossain"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
              />
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official Matchmaker Assigned
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Kabir Hossain
                </h3>
                <p className="text-xs text-slate-500">
                  Senior Matrimonial Advisor • Shadikabbo Head Office (Gulshan-2, Dhaka)
                </p>
                <p className="text-xs text-slate-600 max-w-xl pt-1">
                  "I am personally dedicated to mediating dignified matchmaking for your family. Feel free to request private biodatas or discuss specific partner preferences anytime."
                </p>
              </div>
            </div>

            {/* Counselor Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#16205B] shadow-2xs">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Phone Hotline</h4>
                <p className="font-mono text-xs font-bold text-[#D91B2B]">+880 1711-009988</p>
                <button
                  onClick={() => showToast('Hotline Call', 'Initiating call to +880 1711-009988', 'info')}
                  className="w-full py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Call Counselor
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-2xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Official WhatsApp</h4>
                <p className="font-mono text-xs font-bold text-emerald-700">+880 1711-009988</p>
                <button
                  onClick={() => showToast('WhatsApp Connected', 'Opening official counselor WhatsApp channel...', 'success')}
                  className="w-full py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                >
                  Chat on WhatsApp
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#D91B2B] flex items-center justify-center shadow-2xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Office Appointment</h4>
                <p className="text-xs text-slate-500">Gulshan-2, Dhaka-1212</p>
                <button
                  onClick={() => showToast('Appointment Requested', 'Our front desk will contact you to confirm a meeting at the Gulshan office.', 'info')}
                  className="w-full py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Book Office Visit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
