import React, { useState } from 'react';
import { UserAccount, MatrimonialProfile, AdminTask } from '../../types';
import {
  Users,
  ShieldCheck,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Edit2,
  FileText,
  PhoneCall,
  UserCheck,
  AlertCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface AdminDashboardProps {
  currentAdmin: UserAccount;
  allUsers: UserAccount[];
  allProfiles: MatrimonialProfile[];
  onVerifyProfile: (profileId: string) => void;
  onViewProfile: (profile: MatrimonialProfile) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentAdmin,
  allUsers,
  allProfiles,
  onVerifyProfile,
  onViewProfile,
}) => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending'>('all');
  const [selectedProfileForNote, setSelectedProfileForNote] = useState<MatrimonialProfile | null>(null);
  const [counselorNote, setCounselorNote] = useState('');

  // Profiles assigned to this admin (or all regular users)
  const candidateProfiles = allProfiles.filter((p) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchId = p.profileId.toLowerCase().includes(q);
      const matchProf = p.profession.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchProf) return false;
    }
    if (filterStatus === 'verified' && !p.isVerified) return false;
    if (filterStatus === 'pending' && p.isVerified) return false;
    return true;
  });

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfileForNote) return;
    showToast('Matchmaker Note Logged', `Internal note added for ${selectedProfileForNote.name} (${selectedProfileForNote.profileId}).`, 'success');
    setSelectedProfileForNote(null);
    setCounselorNote('');
  };

  return (
    <div className="min-h-screen bg-slate-50/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#16205B] text-xs font-bold">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Relationship Officer & Matchmaker Desk</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">
              Matchmaking Operations Panel
            </h1>
            <p className="text-xs text-slate-500">
              Welcome back, <strong>{currentAdmin.name}</strong>. Assist candidates, audit NID submissions, and mediate family proposals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              Assigned Desk: <strong>Dhaka & Expat Division</strong>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Assigned Candidates</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{allProfiles.length}</p>
              <p className="text-[11px] text-slate-400">Active matrimonial portfolios</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#16205B] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Verified Biodatas</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {allProfiles.filter((p) => p.isVerified).length}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">NID & Degrees verified</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Pending Verifications</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {allProfiles.filter((p) => !p.isVerified).length}
              </p>
              <p className="text-[11px] text-amber-600 font-medium">Document review requested</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name, SK-ID, or profession..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === 'all' ? 'bg-[#16205B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({allProfiles.length})
            </button>
            <button
              onClick={() => setFilterStatus('verified')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === 'verified' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pending Audit
            </button>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-bold text-[10px]">
                <tr>
                  <th className="px-6 py-4">Candidate Profile</th>
                  <th className="px-4 py-4">Profession & Degree</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Verification</th>
                  <th className="px-4 py-4">Contact</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidateProfiles.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{p.name}</span>
                            <span className="font-mono text-[10px] text-[#D91B2B] bg-rose-50 px-1.5 py-0.5 rounded">
                              {p.profileId}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {p.age} yrs • {p.gender === 'Female' ? 'Bride' : 'Groom'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-800">{p.profession}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-xs">{p.highestDegree}</p>
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      <p className="font-medium">{p.presentCity}</p>
                      <p className="text-[11px] text-slate-400">{p.presentCountry}</p>
                    </td>

                    <td className="px-4 py-4">
                      {p.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            onVerifyProfile(p.profileId);
                            showToast('Profile Verified', `${p.name} has been verified following document audit.`, 'success');
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verify Now
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => showToast('Guardian Contact', `Guardian phone for ${p.name}: +880 1711-442299`, 'info')}
                        className="inline-flex items-center gap-1 text-xs text-[#16205B] hover:text-[#D91B2B] font-semibold"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        View Phone
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewProfile(p)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                          title="View full biodata"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProfileForNote(p);
                            setCounselorNote('');
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Add matchmaker note"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note Logging Modal */}
        {selectedProfileForNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Add Matchmaker Operational Note
                  </h3>
                  <p className="text-xs text-slate-500">
                    For {selectedProfileForNote.name} ({selectedProfileForNote.profileId})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProfileForNote(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddNoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Counselor Notes & Family Communication Log
                  </label>
                  <textarea
                    rows={4}
                    value={counselorNote}
                    onChange={(e) => setCounselorNote(e.target.value)}
                    placeholder="e.g. Spoke with candidate's father. They prefer doctors or civil servants settled in Dhaka or abroad. NID verified."
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProfileForNote(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#16205B] text-white text-xs font-bold hover:bg-[#0f1744]"
                  >
                    Save Operational Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
