import React, { useState } from 'react';
import { UserAccount, MatrimonialProfile, MembershipPlan } from '../../types';
import {
  ShieldAlert,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  UserPlus,
  Settings,
  Search,
  Eye,
  Crown,
  Sparkles,
  DollarSign,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface SuperAdminDashboardProps {
  currentSuperAdmin: UserAccount;
  allUsers: UserAccount[];
  allProfiles: MatrimonialProfile[];
  onVerifyProfile: (profileId: string) => void;
  onRejectProfile: (profileId: string) => void;
  onViewProfile: (profile: MatrimonialProfile) => void;
  onAddAdmin: (newAdmin: UserAccount) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  currentSuperAdmin,
  allUsers,
  allProfiles,
  onVerifyProfile,
  onRejectProfile,
  onViewProfile,
  onAddAdmin,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'metrics' | 'verifications' | 'staff' | 'transactions'>('metrics');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [newStaffData, setNewStaffData] = useState({
    name: '',
    email: '',
    phone: '+880 17',
    role: 'admin' as const,
  });

  const staffAdmins = allUsers.filter((u) => u.role === 'admin' || u.role === 'super_admin');
  const regularUsers = allUsers.filter((u) => u.role === 'user');
  const pendingProfiles = allProfiles.filter((p) => !p.isVerified);
  const verifiedProfiles = allProfiles.filter((p) => p.isVerified);

  // Mock revenue calculation
  const totalRevenueBDT = 485000; // Realistic BDT platform revenue

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffData.name || !newStaffData.email) {
      showToast('Name & Email Required', 'Please enter staff credentials.', 'error');
      return;
    }

    const createdStaff: UserAccount = {
      id: 'adm-' + Math.random().toString(36).substring(2, 6),
      name: newStaffData.name,
      email: newStaffData.email,
      phone: newStaffData.phone,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
      role: 'admin',
      membershipPlan: 'special',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    onAddAdmin(createdStaff);
    showToast('Staff Matchmaker Added', `${createdStaff.name} has been provisioned as an authorized Admin.`, 'success');
    setIsAddStaffModalOpen(false);
    setNewStaffData({ name: '', email: '', phone: '+880 17', role: 'admin' });
  };

  return (
    <div className="min-h-screen bg-slate-50/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-[#D91B2B]" />
              <span>Executive Master Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Shadikabbo Executive Command
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Welcome, <strong>{currentSuperAdmin.name}</strong>. Full platform control over verifications, accounts, revenue, and relationship staff.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddStaffModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Staff Counselor</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
          {[
            { id: 'metrics', label: 'Platform Metrics & Revenue', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'verifications', label: `Pending NID Audits (${pendingProfiles.length})`, icon: <Clock className="w-4 h-4" /> },
            { id: 'staff', label: `Counselor Staff (${staffAdmins.length})`, icon: <Users className="w-4 h-4" /> },
            { id: 'transactions', label: 'Financial Subscriptions', icon: <CreditCard className="w-4 h-4" /> },
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

        {/* TAB 1: Metrics & Overview */}
        {activeTab === 'metrics' && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <p className="text-xs text-slate-500 font-medium">Total Registered Biodatas</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{allProfiles.length}</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <p className="text-xs text-slate-500 font-medium">Verified Profiles</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{verifiedProfiles.length}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">Identity & NID authenticated</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <p className="text-xs text-slate-500 font-medium">Platform Membership Revenue</p>
                <p className="text-2xl font-bold text-[#16205B] mt-1">৳ {totalRevenueBDT.toLocaleString()}</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">Direct bKash, Nagad & Cards</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <p className="text-xs text-slate-500 font-medium">Pending Approvals</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{pendingProfiles.length}</p>
                <button
                  onClick={() => setActiveTab('verifications')}
                  className="text-[11px] text-[#D91B2B] hover:underline font-bold mt-1 inline-block"
                >
                  Review documents &rarr;
                </button>
              </div>
            </div>

            {/* Quick Overview Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users List */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Recent User Accounts
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {regularUsers.length} total members
                  </span>
                </div>

                <div className="space-y-3">
                  {regularUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/60"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                          alt={u.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{u.name}</p>
                          <p className="text-[11px] text-slate-500">{u.email} • {u.phone}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-[#D91B2B] px-2 py-0.5 rounded">
                          {u.membershipPlan}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Joined {u.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan Distribution */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Matrimonial Tier Subscriptions
                  </h3>
                  <p className="text-xs text-slate-500">Breakdown of active customer investments</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Free Starter Package (৳0)</p>
                      <p className="text-[11px] text-slate-500">Restricted browsing and basic profile creation</p>
                    </div>
                    <span className="font-mono font-bold text-slate-700">1,840 Users</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#16205B]">Basic Tier (৳15,000 / 3 Months)</p>
                      <p className="text-[11px] text-slate-500">15 Proposals • 20 Contact Unlocks</p>
                    </div>
                    <span className="font-mono font-bold text-[#16205B]">142 Subscriptions</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#D91B2B]">Standard Tier (৳30,000 / 6 Months)</p>
                      <p className="text-[11px] text-slate-500">35 Proposals • Matchmaker Assistance</p>
                    </div>
                    <span className="font-mono font-bold text-[#D91B2B]">88 Subscriptions</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-amber-900">Special VIP Tier (৳40,000 / 1 Year)</p>
                      <p className="text-[11px] text-slate-500">Unlimited Proposals • Executive Counselor Desk</p>
                    </div>
                    <span className="font-mono font-bold text-amber-800">45 VIPs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Verifications Queue */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                National ID & Educational Certificate Review Queue
              </h3>
              <p className="text-xs text-slate-500">
                Audit uploaded candidate documents to uphold Shadikabbo's 100% verified trust standard.
              </p>
            </div>

            {pendingProfiles.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                All submitted matrimonial biodatas are currently audited and verified!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingProfiles.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                          <span className="font-mono text-xs text-[#D91B2B] bg-rose-50 px-2 py-0.5 rounded">
                            {p.profileId}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {p.profession} ({p.jobTitle}) • {p.education}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Location: {p.presentCity}, {p.presentCountry} • Registered: {p.registeredDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onViewProfile(p)}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-white"
                      >
                        Inspect Biodata
                      </button>
                      <button
                        onClick={() => {
                          onVerifyProfile(p.profileId);
                          showToast('Verification Approved', `${p.name} (${p.profileId}) is now authenticated with a verified checkmark badge.`, 'success');
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve NID
                      </button>
                      <button
                        onClick={() => {
                          onRejectProfile(p.profileId);
                          showToast('Profile Rejected', `Verification declined for ${p.name}.`, 'error');
                        }}
                        className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Decline / Request clarification"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Staff Management */}
        {activeTab === 'staff' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Authorized Matchmakers & Admin Personnel
                </h3>
                <p className="text-xs text-slate-500">
                  Manage assigned counselors mediating families and conducting home/NID verification.
                </p>
              </div>

              <button
                onClick={() => setIsAddStaffModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#16205B] text-white text-xs font-bold hover:bg-[#0f1744] flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                Add Staff
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffAdmins.map((staff) => (
                <div
                  key={staff.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={staff.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                      alt={staff.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 font-display">{staff.name}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          staff.role === 'super_admin' ? 'bg-rose-100 text-[#D91B2B]' : 'bg-blue-100 text-[#16205B]'
                        }`}>
                          {staff.role === 'super_admin' ? 'Super Admin' : 'Counselor Admin'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{staff.email}</p>
                      <p className="text-[11px] font-mono text-slate-600 mt-0.5">{staff.phone}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Transactions Log */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Recent Membership Transactions
                </h3>
                <p className="text-xs text-slate-500">Live payment audit log across bKash, Nagad, and Cards</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                Gateway Status: All Systems Operational
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Transaction ID</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Package Tier</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Payment Method</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: 'TXN-98214', user: 'Farhan Ahmed', plan: 'Standard Tier (6 Mos)', amount: '৳ 30,000', method: 'bKash Merchant', date: 'Today, 11:20 AM', status: 'Success' },
                    { id: 'TXN-98213', user: 'Dr. Nusrat Jahan', plan: 'Special VIP Tier (1 Yr)', amount: '৳ 40,000', method: 'City Bank Visa', date: 'Yesterday', status: 'Success' },
                    { id: 'TXN-98212', user: 'Tanvir Hossain', plan: 'Basic Tier (3 Mos)', amount: '৳ 15,000', method: 'Nagad Gateway', date: '2 days ago', status: 'Success' },
                    { id: 'TXN-98211', user: 'Ayesha Siddiqua', plan: 'Standard Tier (6 Mos)', amount: '৳ 30,000', method: 'MasterCard', date: '3 days ago', status: 'Success' },
                  ].map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3.5 font-mono font-bold text-[#D91B2B]">{tx.id}</td>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">{tx.user}</td>
                      <td className="px-4 py-3.5 text-slate-700">{tx.plan}</td>
                      <td className="px-4 py-3.5 font-bold text-[#16205B]">{tx.amount}</td>
                      <td className="px-4 py-3.5 text-slate-500">{tx.method}</td>
                      <td className="px-4 py-3.5 text-slate-400">{tx.date}</td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add New Staff Member */}
        {isAddStaffModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Provision New Staff Counselor
                </h3>
                <button onClick={() => setIsAddStaffModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={newStaffData.name}
                    onChange={(e) => setNewStaffData({ ...newStaffData, name: e.target.value })}
                    placeholder="e.g. Farhana Sultana"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email *</label>
                  <input
                    type="email"
                    value={newStaffData.email}
                    onChange={(e) => setNewStaffData({ ...newStaffData, email: e.target.value })}
                    placeholder="e.g. farhana@shadikabbo.com"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Counselor Phone / Hotline *</label>
                  <input
                    type="tel"
                    value={newStaffData.phone}
                    onChange={(e) => setNewStaffData({ ...newStaffData, phone: e.target.value })}
                    placeholder="+880 1711-xxxxxx"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddStaffModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#D91B2B] text-white font-bold hover:bg-[#b91422]"
                  >
                    Authorize Staff Member
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
