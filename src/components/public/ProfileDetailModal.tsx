import React, { useState } from 'react';
import { MatrimonialProfile } from '../../types';
import {
  X,
  Heart,
  Send,
  MapPin,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  User,
  Sparkles,
  Calendar,
  Share2,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface ProfileDetailModalProps {
  profile: MatrimonialProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSendProposal: (profile: MatrimonialProfile) => void;
  onShortlist: (profile: MatrimonialProfile) => void;
  isShortlisted: boolean;
  isLoggedIn: boolean;
  hasProposalSent: boolean;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSendProposal,
  onShortlist,
  isShortlisted,
  isLoggedIn,
  hasProposalSent,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'career' | 'family' | 'preference' | 'contact'>('overview');

  if (!isOpen || !profile) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', `Biodata link for ${profile.name} (${profile.profileId}) copied to clipboard.`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#D91B2B] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
              {profile.profileId}
            </span>
            {profile.isVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Biodata
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Header summary banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-lg border-2 border-white ring-1 ring-slate-200"
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16205B] text-white shadow-xs">
                {profile.gender === 'Female' ? 'Bride' : 'Groom'}
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {profile.name}
                </h3>
                {profile.candidateNameBangla && (
                  <p className="text-sm font-medium text-slate-500">
                    {profile.candidateNameBangla}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  {profile.age} Years • {profile.height}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {profile.profession}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D91B2B]" />
                  {profile.presentCity}, {profile.presentCountry}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                {profile.bio}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => onSendProposal(profile)}
                  disabled={hasProposalSent}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    hasProposalSent
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-[#D91B2B] hover:bg-[#b91422] text-white shadow-md shadow-rose-600/20'
                  }`}
                >
                  {hasProposalSent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Proposal Sent
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Marriage Proposal
                    </>
                  )}
                </button>

                <button
                  onClick={() => onShortlist(profile)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isShortlisted
                      ? 'bg-rose-50 text-rose-700 border-rose-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto gap-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'career', label: 'Education & Career' },
              { id: 'family', label: 'Family Heritage' },
              { id: 'preference', label: 'Partner Preferences' },
              { id: 'contact', label: 'Contact Info' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#D91B2B] text-[#D91B2B]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Personal Attributes
                </h4>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Marital Status:</span>
                    <span className="font-semibold text-slate-800">{profile.maritalStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Religion / Faith:</span>
                    <span className="font-semibold text-slate-800">{profile.religion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date of Birth:</span>
                    <span className="font-semibold text-slate-800">{profile.dateOfBirth} ({profile.age} yrs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Height / Weight:</span>
                    <span className="font-semibold text-slate-800">{profile.height} • {profile.weight || 'Proportional'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Citizenship:</span>
                    <span className="font-semibold text-slate-800">{profile.citizenshipStatus || 'Bangladeshi'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Location & Residence
                </h4>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Present Country:</span>
                    <span className="font-semibold text-slate-800">{profile.presentCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Present City:</span>
                    <span className="font-semibold text-slate-800">{profile.presentCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Permanent District:</span>
                    <span className="font-semibold text-slate-800">{profile.permanentDistrict}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Biodata Created By:</span>
                    <span className="font-semibold text-slate-800">{profile.createdFor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Active:</span>
                    <span className="font-semibold text-emerald-700">{profile.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Career */}
          {activeTab === 'career' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#16205B]" />
                  Educational Credentials
                </h4>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Highest Qualification:</span>
                    <span className="font-bold text-slate-900">{profile.education}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Academic Institution:</span>
                    <span className="font-semibold text-slate-800">{profile.institution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Degree Level:</span>
                    <span className="font-semibold text-slate-800">{profile.highestDegree}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#D91B2B]" />
                  Professional Background
                </h4>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Profession:</span>
                    <span className="font-bold text-slate-900">{profile.profession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Designation / Role:</span>
                    <span className="font-semibold text-slate-800">{profile.jobTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sector / Employer:</span>
                    <span className="font-semibold text-slate-800">{profile.companyOrSector} ({profile.jobType})</span>
                  </div>
                  {profile.monthlyIncome && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Compensation:</span>
                      <span className="font-bold text-emerald-700">{profile.monthlyIncome}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Family */}
          {activeTab === 'family' && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Family Information & Heritage
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Father's Name & Profession:</span>
                    <p className="font-bold text-slate-900">{profile.fatherName}</p>
                    <p className="text-slate-600">{profile.fatherProfession}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Mother's Name & Profession:</span>
                    <p className="font-bold text-slate-900">{profile.motherName}</p>
                    <p className="text-slate-600">{profile.motherProfession}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Siblings Details:</span>
                    <p className="font-semibold text-slate-800">
                      {profile.brotherCount} Brother(s) • {profile.sisterCount} Sister(s)
                    </p>
                    {profile.brotherDetails && (
                      <p className="text-slate-600 text-[11px]">{profile.brotherDetails}</p>
                    )}
                    {profile.sisterDetails && (
                      <p className="text-slate-600 text-[11px]">{profile.sisterDetails}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Family Social & Economic Class:</span>
                    <p className="font-semibold text-slate-800">
                      {profile.familyValues} Values • {profile.economicStatus}
                    </p>
                  </div>
                </div>
              </div>

              {profile.familyNotes && (
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Family Heritage Note:</span>
                  <p className="text-slate-700 italic">{profile.familyNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Preferences */}
          {activeTab === 'preference' && (
            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200/80 space-y-4 text-xs">
              <h4 className="font-bold text-[#16205B] uppercase tracking-wider text-[11px]">
                Desired Partner Expectations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Age:</span>
                    <span className="font-bold">{profile.partnerMinAge} - {profile.partnerMaxAge} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Minimum Height:</span>
                    <span className="font-bold">{profile.partnerMinHeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Marital Status:</span>
                    <span className="font-bold">{profile.partnerMaritalStatus.join(', ')}</span>
                  </div>
                </div>

                <div className="space-y-2 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Preferred Education & Profession:</span>
                    <p className="font-bold">{profile.partnerProfession.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Preferred Locations:</span>
                    <p className="font-bold">{profile.partnerLocation.join(' • ')}</p>
                  </div>
                </div>
              </div>

              {profile.partnerOtherPreferences && (
                <div className="pt-3 border-t border-rose-200/60">
                  <span className="text-slate-500 block text-[11px] mb-1">Additional Expectations:</span>
                  <p className="text-slate-800 leading-relaxed">{profile.partnerOtherPreferences}</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Contact Info */}
          {activeTab === 'contact' && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4 text-xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Guardian Contact & WhatsApp Information Protected
                </h4>
                <p className="text-slate-500 max-w-md mx-auto mt-1 text-xs">
                  To safeguard the dignity of both candidates and families, verified contact numbers are automatically unlocked once a mutual marriage proposal is accepted.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onSendProposal(profile)}
                  className="px-5 py-2.5 bg-[#D91B2B] text-white font-bold rounded-xl shadow-sm text-xs hover:bg-[#b91422]"
                >
                  Send Proposal to Request Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
