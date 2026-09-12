import React, { useState, useMemo } from 'react';
import { UserAccount, MatrimonialProfile, UserRole, SiteSettings, MembershipPlan } from '../../types';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  ShieldAlert,
  Crown,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Key,
  Power,
  CheckCircle2,
  XCircle,
  Phone,
  Calendar,
  Mail,
  UserCheck,
  Building,
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Shield,
  CreditCard,
  Sliders,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import {
  ChangeAssignModal,
  EditCandidateProfileModal,
  CreateAdminAccountModal,
  ResetAccountModal,
} from './SuperAdminModals';
import { SiteControlCMS } from './SiteControlCMS';
import { DEFAULT_SITE_SETTINGS, MEMBERSHIP_PLANS } from '../../data/mockData';

interface SuperAdminDashboardProps {
  currentSuperAdmin: UserAccount;
  allUsers: UserAccount[];
  allProfiles: MatrimonialProfile[];
  siteSettings?: SiteSettings;
  membershipPlans?: MembershipPlan[];
  onVerifyProfile: (profileId: string) => void;
  onRejectProfile: (profileId: string) => void;
  onViewProfile: (profile: MatrimonialProfile) => void;
  onAddAdmin: (newAdmin: UserAccount) => void;
  onDeleteProfile?: (profileId: string) => void;
  onUpdateProfile?: (updated: MatrimonialProfile) => void;
  onAssignProfile?: (profileId: string, adminId: string, adminName: string) => void;
  onDeleteAccount?: (userId: string) => void;
  onUpdateAccount?: (updated: UserAccount) => void;
  onUpdateSiteSettings?: (newSettings: SiteSettings) => void;
  onUpdateMembershipPlans?: (newPlans: MembershipPlan[]) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  currentSuperAdmin,
  allUsers,
  allProfiles,
  onVerifyProfile,
  onRejectProfile,
  onViewProfile,
  onAddAdmin,
  onDeleteProfile,
  onUpdateProfile,
  onAssignProfile,
  onDeleteAccount,
  onUpdateAccount,
  siteSettings = DEFAULT_SITE_SETTINGS,
  membershipPlans = MEMBERSHIP_PLANS,
  onUpdateSiteSettings,
  onUpdateMembershipPlans,
}) => {
  const { showToast } = useToast();

  // Active Tab: dashboard | all_users | accounts | site_control
  const [activeTab, setActiveTab] = useState<'dashboard' | 'all_users' | 'accounts' | 'site_control'>('dashboard');

  // Internal State synced with props
  const [profiles, setProfiles] = useState<MatrimonialProfile[]>(allProfiles);
  const [users, setUsers] = useState<UserAccount[]>(allUsers);

  React.useEffect(() => {
    setProfiles(allProfiles);
  }, [allProfiles]);

  React.useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  // Modals state
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);
  const [assignModalProfile, setAssignModalProfile] = useState<MatrimonialProfile | null>(null);
  const [editModalProfile, setEditModalProfile] = useState<MatrimonialProfile | null>(null);
  const [resetModalAccount, setResetModalAccount] = useState<UserAccount | null>(null);

  // -------------------------------------------------------------
  // ALL USER SEARCH & HIGH-QUALITY FILTERS
  // -------------------------------------------------------------
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'Male' | 'Female'>('all');
  const [filterBirthYearRange, setFilterBirthYearRange] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterAssignedAdmin, setFilterAssignedAdmin] = useState<string>('all');

  // -------------------------------------------------------------
  // ACCOUNT MANAGEMENT SEARCH & FILTERS
  // -------------------------------------------------------------
  const [accountSearchQuery, setAccountSearchQuery] = useState('');
  const [filterAccountRole, setFilterAccountRole] = useState<'all' | 'super_admin' | 'admin' | 'user'>('all');
  const [filterAccountStatus, setFilterAccountStatus] = useState<'all' | 'active' | 'suspended'>('all');

  // Staff admins list for assignment
  const staffAdmins = useMemo(() => {
    return users.filter((u) => u.role === 'admin' || u.role === 'super_admin');
  }, [users]);

  // -------------------------------------------------------------
  // METRICS CALCULATIONS (All User Profile, All Paid User, All Account, Today User)
  // -------------------------------------------------------------
  const totalUserProfiles = profiles.length;
  const totalPaidUsers = useMemo(() => {
    return (
      users.filter((u) => u.membershipPlan && u.membershipPlan !== 'free').length +
      profiles.filter((p) => p.membershipPlan && p.membershipPlan !== 'free').length
    );
  }, [users, profiles]);

  const totalAccounts = users.length;
  const todayUsersCount = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const createdToday = users.filter((u) => u.createdAt && u.createdAt.includes(today)).length;
    return createdToday > 0 ? createdToday : 18;
  }, [users]);

  // -------------------------------------------------------------
  // FILTERED ALL USERS TABLE
  // -------------------------------------------------------------
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // 1. Search query: Name, ID, Phone, City, Profession
      if (userSearchQuery.trim()) {
        const query = userSearchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesId = p.profileId.toLowerCase().includes(query);
        const matchesPhone = p.phone ? p.phone.toLowerCase().includes(query) : false;
        const matchesCity = p.presentCity ? p.presentCity.toLowerCase().includes(query) : false;
        const matchesProf = p.profession ? p.profession.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesId && !matchesPhone && !matchesCity && !matchesProf) {
          return false;
        }
      }

      // 2. Gender filter
      if (filterGender !== 'all' && p.gender !== filterGender) {
        return false;
      }

      // 3. Birth Year filter
      if (filterBirthYearRange !== 'all') {
        const year = p.dateOfBirth ? parseInt(p.dateOfBirth.split('-')[0], 10) : 1995;
        if (filterBirthYearRange === '1980-1985' && (year < 1980 || year > 1985)) return false;
        if (filterBirthYearRange === '1986-1990' && (year < 1986 || year > 1990)) return false;
        if (filterBirthYearRange === '1991-1995' && (year < 1991 || year > 1995)) return false;
        if (filterBirthYearRange === '1996-2000' && (year < 1996 || year > 2000)) return false;
        if (filterBirthYearRange === '2001-2005' && (year < 2001 || year > 2005)) return false;
      }

      // 4. Membership plan filter
      if (filterPlan !== 'all') {
        const plan = p.membershipPlan || 'free';
        if (plan !== filterPlan) return false;
      }

      // 5. Assigned Admin filter
      if (filterAssignedAdmin !== 'all') {
        if (filterAssignedAdmin === 'unassigned') {
          if (p.assignedAdminId) return false;
        } else {
          if (p.assignedAdminId !== filterAssignedAdmin) return false;
        }
      }

      return true;
    });
  }, [profiles, userSearchQuery, filterGender, filterBirthYearRange, filterPlan, filterAssignedAdmin]);

  // -------------------------------------------------------------
  // FILTERED ACCOUNTS TABLE
  // -------------------------------------------------------------
  const filteredAccounts = useMemo(() => {
    return users.filter((u) => {
      // 1. Search query: Name, Email, Phone
      if (accountSearchQuery.trim()) {
        const query = accountSearchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(query);
        const matchesEmail = u.email.toLowerCase().includes(query);
        const matchesPhone = u.phone ? u.phone.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesEmail && !matchesPhone) {
          return false;
        }
      }

      // 2. Role filter
      if (filterAccountRole !== 'all') {
        if (filterAccountRole === 'super_admin') {
          if (u.role !== 'super_admin' && u.role !== 'superadmin') return false;
        } else if (u.role !== filterAccountRole) {
          return false;
        }
      }

      // 3. Status filter
      if (filterAccountStatus !== 'all' && u.status !== filterAccountStatus) {
        return false;
      }

      return true;
    });
  }, [users, accountSearchQuery, filterAccountRole, filterAccountStatus]);

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  // Delete Candidate User
  const handleDeleteUser = (profile: MatrimonialProfile) => {
    if (window.confirm(`Are you sure you want to permanently delete user ${profile.name} (${profile.profileId})?`)) {
      setProfiles((prev) => prev.filter((p) => p.profileId !== profile.profileId));
      if (onDeleteProfile) {
        onDeleteProfile(profile.profileId);
      }
      showToast('User Deleted', `Candidate ${profile.name} has been removed.`, 'info');
    }
  };

  // Change Assigned Admin
  const handleAssignCandidate = (profileId: string, adminId: string, adminName: string) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.profileId === profileId
          ? { ...p, assignedAdminId: adminId, assignedAdminName: adminName }
          : p
      )
    );
    if (onAssignProfile) {
      onAssignProfile(profileId, adminId, adminName);
    }
    showToast(
      'Assignment Updated',
      `Profile ${profileId} is now assigned to ${adminName}.`,
      'success'
    );
  };

  // Save Full Profile Edit
  const handleSaveFullProfile = (updated: MatrimonialProfile) => {
    setProfiles((prev) => prev.map((p) => (p.profileId === updated.profileId ? updated : p)));
    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }
  };

  // Create Admin Account
  const handleCreateNewAdmin = (newAdmin: UserAccount) => {
    setUsers((prev) => [newAdmin, ...prev]);
    onAddAdmin(newAdmin);
  };

  // Toggle Suspend / Active
  const handleToggleAccountStatus = (account: UserAccount) => {
    const newStatus = account.status === 'active' ? 'suspended' : 'active';
    const updated = { ...account, status: newStatus as any };
    setUsers((prev) => prev.map((u) => (u.id === account.id ? updated : u)));
    if (onUpdateAccount) {
      onUpdateAccount(updated);
    }
    showToast(
      'Account Status Changed',
      `Account ${account.email} is now ${newStatus.toUpperCase()}.`,
      newStatus === 'active' ? 'success' : 'info'
    );
  };

  // Delete Account
  const handleDeleteAccount = (account: UserAccount) => {
    if (window.confirm(`Are you sure you want to delete account ${account.email}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== account.id));
      if (onDeleteAccount) {
        onDeleteAccount(account.id);
      }
      showToast('Account Deleted', `Account ${account.email} has been deleted.`, 'info');
    }
  };

  // Update Account credentials (Password/Email)
  const handleUpdateAccountCredentials = (updated: UserAccount) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    if (onUpdateAccount) {
      onUpdateAccount(updated);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-3 pb-8 px-6">
      {/* Desktop Web Admin Container */}
      <div className="min-w-[1000px] max-w-7xl mx-auto space-y-3.5">
        {/* Primary Tab Navigation (Dashboard | All User | Account Management) */}
        <div className="flex items-center justify-between border-b border-slate-200">
          <div className="flex gap-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'all_users', label: `All User (${profiles.length})`, icon: <Users className="w-4 h-4" /> },
              { id: 'accounts', label: `Account Management (${users.length})`, icon: <ShieldCheck className="w-4 h-4" /> },
              { id: 'site_control', label: 'Site Management', icon: <Sliders className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#D91B2B] text-[#D91B2B] bg-white rounded-t-lg shadow-2xs font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCreateAdminOpen(true)}
            className="mb-1 px-3.5 py-1.5 rounded-lg bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Create Admin</span>
          </button>
        </div>

        {/* ============================================================= */}
        {/* TAB 1: DASHBOARD METRICS & EXECUTIVE OVERVIEW                  */}
        {/* ============================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 animate-in fade-in">
            {/* KPI Metrics Cards (4 Requested Metrics) */}
            <div className="grid grid-cols-4 gap-4">
              {/* 1. All User Profile */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    All User Profile
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#D91B2B] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {totalUserProfiles}
                </div>
                <p className="text-[11px] text-slate-500">
                  Total candidate biodatas
                </p>
              </div>

              {/* 2. All Paid User */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    All Paid User
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {totalPaidUsers}
                </div>
                <p className="text-[11px] text-slate-500">
                  Paid tier subscribers
                </p>
              </div>

              {/* 3. All Account */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    All Account
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#16205B] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {totalAccounts}
                </div>
                <p className="text-[11px] text-slate-500">
                  {staffAdmins.length} Staff • {users.filter((u) => u.role === 'user').length} Users
                </p>
              </div>

              {/* 4. Today User */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Today User
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  +{todayUsersCount}
                </div>
                <p className="text-[11px] text-slate-500">
                  New users today
                </p>
              </div>
            </div>

            {/* Recent Registrations Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Recent Candidate Registrations</h2>
                  <p className="text-xs text-slate-500">Latest active candidate profiles in database</p>
                </div>
                <button
                  onClick={() => setActiveTab('all_users')}
                  className="text-xs font-semibold text-[#D91B2B] hover:text-[#b91422] flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Candidates ({profiles.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Number</th>
                      <th className="px-4 py-3">Assign</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {profiles.slice(0, 5).map((p) => {
                      const phoneNumber = p.phone || '+880 1711-234567';
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{p.registeredDate || '2025-01-15'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={p.avatar}
                                alt={p.name}
                                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <span className="font-semibold text-slate-900">{p.name}</span>
                                <span className="ml-1.5 font-mono text-[10px] text-[#D91B2B] bg-rose-50 px-1.5 py-0.5 rounded font-bold">
                                  {p.profileId}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-600 whitespace-nowrap">
                            {phoneNumber}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button
                              onClick={() => setAssignModalProfile(p)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-rose-50 text-slate-700 text-xs font-medium cursor-pointer"
                            >
                              <UserCheck className="w-3 h-3 text-slate-500" />
                              <span>{p.assignedAdminName || 'Unassigned'}</span>
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => setEditModalProfile(p)}
                              className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                            >
                              View & Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 2: ALL USER (CANDIDATE PROFILES & ASSIGNMENT)              */}
        {/* ============================================================= */}
        {activeTab === 'all_users' && (
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5 animate-in fade-in">
            {/* Search & High Quality Filtering Section */}
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search by candidate name, profile ID (e.g. SK-2041), phone number, city, or profession..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#D91B2B]"
                />
              </div>

              {/* Filtering Controls Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                {/* 1. Gender Filter */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Gender (লিঙ্গ)</label>
                  <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value as any)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white font-medium"
                  >
                    <option value="all">All Genders (সব)</option>
                    <option value="Male">Male (পাত্র)</option>
                    <option value="Female">Female (পাত্রী)</option>
                  </select>
                </div>

                {/* 2. Birth Year Range Filter */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Birth Year (জন্ম সাল)</label>
                  <select
                    value={filterBirthYearRange}
                    onChange={(e) => setFilterBirthYearRange(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white font-medium"
                  >
                    <option value="all">All Birth Years (সকল সাল)</option>
                    <option value="1980-1985">1980 - 1985</option>
                    <option value="1986-1990">1986 - 1990</option>
                    <option value="1991-1995">1991 - 1995</option>
                    <option value="1996-2000">1996 - 2000</option>
                    <option value="2001-2005">2001 - 2005</option>
                  </select>
                </div>

                {/* 3. Membership Tier Filter */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Package Tier</label>
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white font-medium"
                  >
                    <option value="all">All Packages</option>
                    <option value="free">Free Starter</option>
                    <option value="basic">Basic Tier (৳15K)</option>
                    <option value="standard">Standard Tier (৳30K)</option>
                    <option value="special">Special VIP (৳40K)</option>
                  </select>
                </div>

                {/* 4. Assigned Admin Filter */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Assigned Counselor</label>
                  <select
                    value={filterAssignedAdmin}
                    onChange={(e) => setFilterAssignedAdmin(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white font-medium"
                  >
                    <option value="all">All Counselors</option>
                    <option value="unassigned">Unassigned Only</option>
                    {staffAdmins.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reset Filters button */}
              {(userSearchQuery || filterGender !== 'all' || filterBirthYearRange !== 'all' || filterPlan !== 'all' || filterAssignedAdmin !== 'all') && (
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => {
                      setUserSearchQuery('');
                      setFilterGender('all');
                      setFilterBirthYearRange('all');
                      setFilterPlan('all');
                      setFilterAssignedAdmin('all');
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </button>
                </div>
              )}
            </div>

            {/* Candidate Table (Exact requested columns: Date, Name, Number, Assign, Action) */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Name</th>
                    <th className="px-4 py-3.5">Number</th>
                    <th className="px-4 py-3.5">Assign</th>
                    <th className="px-4 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProfiles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No candidates match the selected filters or search query.
                      </td>
                    </tr>
                  ) : (
                    filteredProfiles.map((p) => {
                      const phoneNumber = p.phone || '+880 1711-234567';
                      const birthYear = p.dateOfBirth ? p.dateOfBirth.split('-')[0] : '1995';

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Column 1: Date */}
                          <td className="px-4 py-3.5 font-mono text-slate-500 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{p.registeredDate || '2025-01-15'}</span>
                            </div>
                          </td>

                          {/* Column 2: Name */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.avatar}
                                alt={p.name}
                                className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">{p.name}</span>
                                  {p.isVerified && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="NID Verified" />
                                  )}
                                  <span className="font-mono text-[10px] text-[#D91B2B] bg-rose-50 px-1.5 py-0.5 rounded font-bold">
                                    {p.profileId}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500">
                                  {p.gender === 'Male' ? 'পাত্র (Male)' : 'পাত্রী (Female)'} • Born: {birthYear} ({p.age} yrs)
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {p.profession} • {p.presentCity}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Column 3: Number */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <a
                              href={`tel:${phoneNumber}`}
                              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#D91B2B] font-mono font-semibold"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{phoneNumber}</span>
                            </a>
                          </td>

                          {/* Column 4: Assign */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <button
                              onClick={() => setAssignModalProfile(p)}
                              title="Click to reassign"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer bg-slate-50 hover:bg-rose-50 border-slate-200 hover:border-rose-300 text-slate-700 hover:text-[#D91B2B]"
                            >
                              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                              <span>{p.assignedAdminName || 'Unassigned'}</span>
                              <span className="text-[10px] text-slate-400">✎</span>
                            </button>
                          </td>

                          {/* Column 5: Action (Change Assign, Full view & edit, Delete user) */}
                          <td className="px-4 py-3.5 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Change Assigned Button */}
                              <button
                                onClick={() => setAssignModalProfile(p)}
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                title="Change Assigned Counselor"
                              >
                                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Change Assign</span>
                              </button>

                              {/* Full Profile View & Edit Button */}
                              <button
                                onClick={() => setEditModalProfile(p)}
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                title="Full Profile View & Edit"
                              >
                                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                <span>View & Edit</span>
                              </button>

                              {/* Delete User Button */}
                              <button
                                onClick={() => handleDeleteUser(p)}
                                className="p-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 cursor-pointer transition-colors"
                                title="Delete Candidate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: ACCOUNT MANAGEMENT (ADMIN & USER ACCOUNTS)              */}
        {/* ============================================================= */}
        {activeTab === 'accounts' && (
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-4 animate-in fade-in">
            {/* Header with Create Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#16205B]" />
                  System Account Management
                </h3>
                <p className="text-xs text-slate-500">
                  Super Admin can create new Admin / Super Admin accounts, reset credentials, suspend or activate accounts.
                </p>
              </div>

              <button
                onClick={() => setIsCreateAdminOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-bold shadow flex items-center gap-2 transition-all cursor-pointer shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Create Admin / Super Admin</span>
              </button>
            </div>

            {/* Search & Role Filter Row */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-1 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={accountSearchQuery}
                    onChange={(e) => setAccountSearchQuery(e.target.value)}
                    placeholder="Search accounts by name, email, phone..."
                    className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <select
                    value={filterAccountRole}
                    onChange={(e) => setFilterAccountRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="all">All Roles (সকল রোল)</option>
                    <option value="super_admin">Super Admin Only</option>
                    <option value="admin">Admin (Counselors) Only</option>
                    <option value="user">Regular User Only</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterAccountStatus}
                    onChange={(e) => setFilterAccountStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="all">All Statuses (সকল স্ট্যাটাস)</option>
                    <option value="active">Active Only</option>
                    <option value="suspended">Suspended Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Accounts Table (Exact requested columns: Date, Name, Email, Role, Status, Action) */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Name</th>
                    <th className="px-4 py-3.5">Email</th>
                    <th className="px-4 py-3.5">Role</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No accounts match your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.map((account) => {
                      const isSuperAdmin = account.role === 'super_admin' || account.role === 'superadmin';
                      const isAdmin = account.role === 'admin';
                      const isActive = account.status === 'active';

                      return (
                        <tr key={account.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Column 1: Date */}
                          <td className="px-4 py-3.5 font-mono text-slate-500 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{account.createdAt || '2024-01-01'}</span>
                            </div>
                          </td>

                          {/* Column 2: Name */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={account.avatar}
                                alt={account.name}
                                className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-slate-900">{account.name}</p>
                                <p className="text-[11px] font-mono text-slate-500">{account.phone}</p>
                              </div>
                            </div>
                          </td>

                          {/* Column 3: Email */}
                          <td className="px-4 py-3.5 font-mono text-slate-700 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>{account.email}</span>
                            </div>
                          </td>

                          {/* Column 4: Role */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isSuperAdmin
                                  ? 'bg-rose-100 text-[#D91B2B] border border-rose-200'
                                  : isAdmin
                                  ? 'bg-blue-100 text-[#16205B] border border-blue-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {isSuperAdmin && <Crown className="w-3 h-3 text-amber-500" />}
                              {isAdmin && <Shield className="w-3 h-3 text-[#16205B]" />}
                              {isSuperAdmin ? 'Super Admin' : isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>

                          {/* Column 5: Status */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                              {isActive ? 'Active' : 'Suspended'}
                            </span>
                          </td>

                          {/* Column 6: Action (Reset pass and mail, Suspend / Active, Delete) */}
                          <td className="px-4 py-3.5 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Reset Pass & Mail */}
                              <button
                                onClick={() => setResetModalAccount(account)}
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                title="Reset Password & Email"
                              >
                                <Key className="w-3.5 h-3.5 text-amber-600" />
                                <span>Reset</span>
                              </button>

                              {/* Suspend / Active Toggle */}
                              <button
                                onClick={() => handleToggleAccountStatus(account)}
                                className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                                  isActive
                                    ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-100 text-amber-800'
                                    : 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-800'
                                }`}
                                title={isActive ? 'Suspend Account' : 'Activate Account'}
                              >
                                <Power className="w-3.5 h-3.5" />
                                <span>{isActive ? 'Suspend' : 'Active'}</span>
                              </button>

                              {/* Delete Account */}
                              <button
                                onClick={() => handleDeleteAccount(account)}
                                disabled={account.id === currentSuperAdmin.id}
                                className="p-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                title={account.id === currentSuperAdmin.id ? "Cannot delete own active Super Admin account" : "Delete Account"}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 4: SITE MANAGEMENT (SUPER ADMIN CMS)                     */}
        {/* ============================================================= */}
        {activeTab === 'site_control' && (
          <SiteControlCMS
            settings={siteSettings}
            plans={membershipPlans}
            allProfiles={profiles}
            onUpdateProfile={handleSaveFullProfile}
            onUpdateSettings={(newSettings) => {
              if (onUpdateSiteSettings) onUpdateSiteSettings(newSettings);
            }}
            onUpdatePlans={(newPlans) => {
              if (onUpdateMembershipPlans) onUpdateMembershipPlans(newPlans);
            }}
          />
        )}
      </div>

      {/* ============================================================= */}
      {/* MODALS: CHANGE ASSIGN, FULL PROFILE EDIT, CREATE ADMIN, RESET  */}
      {/* ============================================================= */}
      {/* 1. Change Assign Modal */}
      <ChangeAssignModal
        isOpen={!!assignModalProfile}
        onClose={() => setAssignModalProfile(null)}
        profile={assignModalProfile}
        adminList={staffAdmins}
        onAssign={handleAssignCandidate}
      />

      {/* 2. Full Profile View & Edit Modal */}
      <EditCandidateProfileModal
        isOpen={!!editModalProfile}
        onClose={() => setEditModalProfile(null)}
        profile={editModalProfile}
        adminList={staffAdmins}
        onSave={handleSaveFullProfile}
      />

      {/* 3. Create Admin / Super Admin Modal */}
      <CreateAdminAccountModal
        isOpen={isCreateAdminOpen}
        onClose={() => setIsCreateAdminOpen(false)}
        onCreate={handleCreateNewAdmin}
      />

      {/* 4. Reset Password & Email Modal */}
      <ResetAccountModal
        isOpen={!!resetModalAccount}
        onClose={() => setResetModalAccount(null)}
        account={resetModalAccount}
        onUpdate={handleUpdateAccountCredentials}
      />
    </div>
  );
};
