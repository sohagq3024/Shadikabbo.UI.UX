import React, { useState, useEffect } from 'react';
import { UserRole, UserAccount, MatrimonialProfile, ProposalItem, MembershipPlan, SiteSettings } from './types';
import { MOCK_USERS, MOCK_PROFILES, MOCK_PROPOSALS, MEMBERSHIP_PLANS, DEFAULT_SITE_SETTINGS } from './data/mockData';
import { ToastProvider, useToast } from './components/common/Toast';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NoticeBanner } from './components/common/NoticeBanner';
import { LoginModal } from './components/auth/LoginModal';
import { RegistrationFlow } from './components/auth/RegistrationFlow';
import { HeroSection } from './components/public/HeroSection';
import { ProfileDiscovery } from './components/public/ProfileDiscovery';
import { ProfileDetailModal } from './components/public/ProfileDetailModal';
import { CountryCategoriesSection } from './components/public/CountryCategoriesSection';
import { MatchmakingServicesSection } from './components/public/MatchmakingServicesSection';
import { MembershipSection } from './components/public/MembershipSection';
import { SuccessStoriesSection } from './components/public/SuccessStoriesSection';
import { ReviewTimeline } from './components/public/ReviewTimeline';
import { FreeUserRestrictedProfileView } from './components/public/FreeUserRestrictedProfileView';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';

function MatrimonialApp() {
  const { showToast } = useToast();

  // Primary platform states
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Dynamic entities
  const [allUsers, setAllUsers] = useState<UserAccount[]>(MOCK_USERS);
  const [allProfiles, setAllProfiles] = useState<MatrimonialProfile[]>(MOCK_PROFILES);
  const [proposals, setProposals] = useState<ProposalItem[]>(MOCK_PROPOSALS);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['prof-2', 'prof-5']);

  // Site CMS & Settings state (controlled by Super Admin and persisted)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('shadikabbo_site_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>(() => {
    try {
      const saved = localStorage.getItem('shadikabbo_membership_plans');
      return saved ? JSON.parse(saved) : MEMBERSHIP_PLANS;
    } catch {
      return MEMBERSHIP_PLANS;
    }
  });

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    try {
      localStorage.setItem('shadikabbo_site_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save site settings', e);
    }
  };

  const handleUpdateMembershipPlans = (newPlans: MembershipPlan[]) => {
    setMembershipPlans(newPlans);
    try {
      localStorage.setItem('shadikabbo_membership_plans', JSON.stringify(newPlans));
    } catch (e) {
      console.error('Failed to save membership plans', e);
    }
  };

  // Modals & Navigation Overlays
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<MatrimonialProfile | null>(null);

  // Search filter carryover from hero
  const [heroSearchFilters, setHeroSearchFilters] = useState<{
    gender?: string;
    country?: string;
  }>({});

  // Role Switcher Handler (for instant evaluation & demo testing)
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'guest') {
      setCurrentUser(null);
      setActiveTab('home');
      showToast('Switched to Guest Viewer', 'Viewing public landing page, verified catalog, and packages.', 'info');
    } else {
      const matchedUser = allUsers.find((u) => u.role === newRole) || allUsers[0];
      setCurrentUser(matchedUser);
      if (newRole === 'user') {
        setActiveTab('dashboard');
        showToast(
          'Logged in as Registered Candidate',
          `Welcome, ${matchedUser.name} (${matchedUser.membershipPlan === 'free' ? 'Free Account' : matchedUser.membershipPlan.toUpperCase() + ' Plan'}).`,
          'success'
        );
      } else if (newRole === 'admin') {
        setActiveTab('admin');
        showToast('Logged in as Authorized Staff Admin', `Welcome, ${matchedUser.name} (Matchmaker Desk).`, 'success');
      } else if (newRole === 'super_admin' || newRole === 'superadmin') {
        setActiveTab('super_admin');
        showToast('Logged in as Super Admin', 'Platform executive controls enabled.', 'success');
      }
    }
  };

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setIsLoginOpen(false);

    if (user.role === 'user') {
      setActiveTab('dashboard');
    } else if (user.role === 'admin') {
      setActiveTab('admin');
    } else if (user.role === 'super_admin' || user.role === 'superadmin') {
      setActiveTab('super_admin');
    }
    showToast('Login Successful', `Welcome back, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
    setActiveTab('home');
    showToast('Logged Out', 'You have securely signed out of Shadikabbo.', 'info');
  };

  const handleRegisterComplete = (newUser: UserAccount, newProfile: MatrimonialProfile) => {
    setAllUsers((prev) => [newUser, ...prev]);
    setAllProfiles((prev) => [newProfile, ...prev]);
    setCurrentUser(newUser);
    setCurrentRole('user');
    setIsRegisterOpen(false);
    setActiveTab('dashboard');
  };

  // Proposal interactions
  const handleSendProposal = (targetProfile: MatrimonialProfile) => {
    if (!currentUser) {
      setIsLoginOpen(true);
      showToast('Sign In Required', 'Please log in or register your biodata to send a marriage proposal.', 'info');
      return;
    }

    const myProfile = allProfiles.find((p) => p.userId === currentUser.id) || allProfiles[0];
    const alreadySent = proposals.some(
      (p) => p.senderProfileId === myProfile.profileId && p.receiverProfileId === targetProfile.profileId
    );

    if (alreadySent) {
      showToast('Proposal Already Sent', 'You have already sent a proposal to this candidate.', 'info');
      return;
    }

    const newProposal: ProposalItem = {
      id: 'prop-' + Math.random().toString(36).substring(2, 7),
      senderId: currentUser.id,
      senderProfileId: myProfile.profileId,
      senderName: myProfile.name,
      receiverProfileId: targetProfile.profileId,
      receiverName: targetProfile.name,
      createdAt: 'Just now',
      status: 'pending',
      message: `Respectful greetings from ${myProfile.name} & family. We are interested in reviewing candidate matrimonial credentials.`,
    };

    setProposals((prev) => [newProposal, ...prev]);
    showToast('Proposal Sent Successfully', `Marriage proposal transmitted to ${targetProfile.name} (${targetProfile.profileId}).`, 'success');
  };

  const handleAcceptProposal = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'accepted' } : p))
    );
    showToast('Proposal Accepted', 'Guardian contact and verified phone numbers are now unlocked.', 'success');
  };

  const handleDeclineProposal = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'rejected' } : p))
    );
    showToast('Proposal Declined', 'Proposal has been politely declined.', 'info');
  };

  // Shortlist toggle
  const handleToggleShortlist = (profileId: string) => {
    setShortlistedIds((prev) => {
      const exists = prev.includes(profileId);
      if (exists) {
        showToast('Removed from Shortlist', 'Candidate removed from your saved list.', 'info');
        return prev.filter((id) => id !== profileId);
      } else {
        showToast('Added to Shortlist', 'Candidate saved to your matrimonial shortlist.', 'success');
        return [...prev, profileId];
      }
    });
  };

  // Admin Verification
  const handleVerifyProfile = (profileId: string) => {
    setAllProfiles((prev) =>
      prev.map((p) => (p.profileId === profileId ? { ...p, isVerified: true } : p))
    );
  };

  const handleRejectProfile = (profileId: string) => {
    setAllProfiles((prev) =>
      prev.map((p) => (p.profileId === profileId ? { ...p, isVerified: false } : p))
    );
  };

  // Update profile from user dashboard
  const handleUpdateProfile = (updated: MatrimonialProfile) => {
    setAllProfiles((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, name: updated.name } : prev));
    }
  };

  // Add staff admin
  const handleAddAdmin = (newAdmin: UserAccount) => {
    setAllUsers((prev) => [...prev, newAdmin]);
  };

  const handleDeleteProfile = (profileId: string) => {
    setAllProfiles((prev) => prev.filter((p) => p.profileId !== profileId));
  };

  const handleUpdateFullProfile = (updated: MatrimonialProfile) => {
    setAllProfiles((prev) => prev.map((p) => (p.profileId === updated.profileId ? updated : p)));
  };

  const handleAssignProfile = (profileId: string, adminId: string, adminName: string) => {
    setAllProfiles((prev) =>
      prev.map((p) =>
        p.profileId === profileId
          ? { ...p, assignedAdminId: adminId, assignedAdminName: adminName }
          : p
      )
    );
  };

  const handleDeleteAccount = (userId: string) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleUpdateAccount = (updated: UserAccount) => {
    setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  // Hero search trigger
  const handleHeroSearch = (filters: { gender: string; minAge: number; maxAge: number; country: string }) => {
    if (!currentUser || currentRole === 'guest') {
      setIsLoginOpen(true);
      showToast('Login Mandatory', 'বায়োডাটা অনুসন্ধান করতে দয়া করে প্রথমে লগইন করুন।', 'info');
      return;
    }
    setHeroSearchFilters({
      gender: filters.gender,
      country: filters.country,
    });
    setActiveTab('profiles');
    setTimeout(() => {
      document.getElementById('profiles-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Select country category from banner
  const handleSelectCountryCategory = (countryName: string) => {
    setHeroSearchFilters((prev) => ({ ...prev, country: countryName }));
    setActiveTab('profiles');
    setTimeout(() => {
      document.getElementById('profiles-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // User's own profile
  const userProfile = currentUser
    ? allProfiles.find((p) => p.userId === currentUser.id) || allProfiles[0]
    : allProfiles[0];

  const sentProposalIds = proposals
    .filter((p) => p.senderProfileId === userProfile.profileId)
    .map((p) => p.receiverProfileId);

  // Home Page 3 Featured Profiles (Controlled by Super Admin Site Management)
  const homeFeaturedProfiles = React.useMemo(() => {
    if (siteSettings?.featuredProfileIds && siteSettings.featuredProfileIds.length > 0) {
      const selected = siteSettings.featuredProfileIds
        .map((id) => allProfiles.find((p) => p.profileId === id || p.id === id))
        .filter(Boolean) as MatrimonialProfile[];
      if (selected.length > 0) {
        return selected.slice(0, 3);
      }
    }
    return allProfiles.slice(0, 3);
  }, [allProfiles, siteSettings?.featuredProfileIds]);

  // Auto-scroll on tab change or registration open
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, isRegisterOpen]);

  // Check if current view is Super Admin web view
  const isSuperAdminView = activeTab === 'super_admin' || activeTab.startsWith('superadmin');

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-rose-100 selection:text-[#D91B2B] ${isRegisterOpen || isSuperAdminView ? 'pb-0' : 'pb-16 lg:pb-0'}`}>
      {/* 0. Live Notice Ticker Banner (Controlled by Super Admin CMS) */}
      <NoticeBanner siteSettings={siteSettings} />

      {/* 1. Global Navbar */}
      <Navbar
        currentRole={currentRole}
        currentUser={currentUser}
        activeTab={isRegisterOpen ? '' : activeTab}
        isRegisterOpen={isRegisterOpen}
        onTabChange={(tab) => {
          setIsRegisterOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onNavigate={(tab) => {
          setIsRegisterOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onOpenLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        onOpenRegister={() => {
          setIsRegisterOpen(true);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onLogout={() => {
          setIsRegisterOpen(false);
          handleLogout();
        }}
        receivedProposalsCount={proposals.filter((p) => p.receiverProfileId === userProfile.profileId && p.status === 'pending').length}
      />

      {/* 3. Main Content Views */}
      <main className={`flex-1 pb-20 lg:pb-0 transition-all duration-300 ${activeTab === 'home' && !isRegisterOpen ? '-mt-20' : ''}`}>
        {isRegisterOpen ? (
          <RegistrationFlow
            onCancel={() => {
              setIsRegisterOpen(false);
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onComplete={handleRegisterComplete}
          />
        ) : (
          <>
            {/* VIEW: Public Homepage */}
            {activeTab === 'home' && (
              <div className="space-y-0">
                <HeroSection
                  onSearch={handleHeroSearch}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                  onOpenLogin={() => setIsLoginOpen(true)}
                  isLoggedIn={!!currentUser && currentRole !== 'guest'}
                  siteSettings={siteSettings}
                />
                <ProfileDiscovery
                  profiles={homeFeaturedProfiles}
                  onSelectProfile={(p) => setSelectedProfile(p)}
                  onSendProposal={handleSendProposal}
                  onToggleShortlist={handleToggleShortlist}
                  shortlistedIds={shortlistedIds}
                  sentProposalProfileIds={sentProposalIds}
                  initialGenderFilter={heroSearchFilters.gender}
                  initialCountryFilter={heroSearchFilters.country}
                  isHomePage={true}
                  siteSettings={siteSettings}
                  onViewMore={() => {
                    setActiveTab('profiles');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <MembershipSection
                  currentPlanId={currentUser?.membershipPlan || 'free'}
                  onSelectPlan={(plan) => {
                    if (currentUser) {
                      setCurrentUser({ ...currentUser, membershipPlan: plan.id });
                    }
                  }}
                  isLoggedIn={!!currentUser}
                  onOpenLogin={() => setIsLoginOpen(true)}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                  plans={membershipPlans}
                  siteSettings={siteSettings}
                />
                <CountryCategoriesSection
                  onSelectCountry={handleSelectCountryCategory}
                  siteSettings={siteSettings}
                />
                <MatchmakingServicesSection
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />
                <SuccessStoriesSection
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />
              </div>
            )}

            {/* VIEW: Profiles Directory (Restricted for Free Users) */}
            {(activeTab === 'profiles' || activeTab === 'profile') && (
              currentRole === 'user' && (!currentUser || currentUser.membershipPlan === 'free') ? (
                <FreeUserRestrictedProfileView
                  currentUser={currentUser}
                  onOpenUpgrade={() => setActiveTab('membership')}
                  onOpenEditBiodata={() => setActiveTab('dashboard')}
                />
              ) : (
                <ProfileDiscovery
                  profiles={allProfiles}
                  onSelectProfile={(p) => setSelectedProfile(p)}
                  onSendProposal={handleSendProposal}
                  onToggleShortlist={handleToggleShortlist}
                  shortlistedIds={shortlistedIds}
                  sentProposalProfileIds={sentProposalIds}
                  initialGenderFilter={heroSearchFilters.gender}
                  initialCountryFilter={heroSearchFilters.country}
                />
              )
            )}

            {/* VIEW: Facebook Timeline Style Review Feed */}
            {(activeTab === 'review' || activeTab === 'services') && (
              <ReviewTimeline
                currentRole={currentRole}
                currentUser={currentUser}
                onOpenLogin={() => setIsLoginOpen(true)}
                onOpenRegister={() => setIsRegisterOpen(true)}
              />
            )}

            {/* VIEW: Membership & Pricing */}
            {activeTab === 'membership' && (
              <div className="py-8">
                <MembershipSection
                  currentPlanId={currentUser?.membershipPlan || 'free'}
                  onSelectPlan={(plan) => {
                    if (currentUser) {
                      setCurrentUser({ ...currentUser, membershipPlan: plan.id });
                    }
                  }}
                  isLoggedIn={!!currentUser}
                  onOpenLogin={() => setIsLoginOpen(true)}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                  plans={membershipPlans}
                />
              </div>
            )}

            {/* VIEW: Success Stories */}
            {activeTab === 'stories' && (
              <div className="py-8">
                <SuccessStoriesSection
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />
              </div>
            )}

            {/* VIEW: User Dashboard / My Account (Role 2) */}
            {(activeTab === 'dashboard' ||
              activeTab === 'account' ||
              activeTab === 'user-dashboard' ||
              activeTab === 'user-proposals' ||
              activeTab === 'user-edit-profile') &&
              currentUser && (
                <UserDashboard
                  currentUser={currentUser}
                  myProfile={userProfile}
                  proposals={proposals}
                  allProfiles={allProfiles}
                  initialTab={
                    activeTab === 'user-proposals'
                      ? 'proposals'
                      : activeTab === 'user-edit-profile'
                      ? 'edit-profile'
                      : 'overview'
                  }
                  onUpdateProfile={handleUpdateProfile}
                  onOpenUpgrade={() => setActiveTab('membership')}
                  onViewProfile={(p) => setSelectedProfile(p)}
                  onAcceptProposal={handleAcceptProposal}
                  onDeclineProposal={handleDeclineProposal}
                />
              )}

            {/* VIEW: Admin Dashboard (Role 3) */}
            {(activeTab === 'admin' ||
              activeTab === 'admin-dashboard' ||
              activeTab === 'admin-users' ||
              activeTab === 'admin-my-assign' ||
              activeTab === 'admin-account') &&
              currentUser && (
                <AdminDashboard
                  currentAdmin={currentUser}
                  allUsers={allUsers}
                  allProfiles={allProfiles}
                  onVerifyProfile={handleVerifyProfile}
                  onViewProfile={(p) => setSelectedProfile(p)}
                />
              )}

            {/* VIEW: Super Admin Dashboard (Role 4) */}
            {(activeTab === 'super_admin' ||
              activeTab === 'superadmin' ||
              activeTab === 'superadmin-dashboard' ||
              activeTab === 'superadmin-users' ||
              activeTab === 'superadmin-admins') &&
              currentUser && (
                <SuperAdminDashboard
                  currentSuperAdmin={currentUser}
                  allUsers={allUsers}
                  allProfiles={allProfiles}
                  siteSettings={siteSettings}
                  membershipPlans={membershipPlans}
                  onVerifyProfile={handleVerifyProfile}
                  onRejectProfile={handleRejectProfile}
                  onViewProfile={(p) => setSelectedProfile(p)}
                  onAddAdmin={handleAddAdmin}
                  onDeleteProfile={handleDeleteProfile}
                  onUpdateProfile={handleUpdateFullProfile}
                  onAssignProfile={handleAssignProfile}
                  onDeleteAccount={handleDeleteAccount}
                  onUpdateAccount={handleUpdateAccount}
                  onUpdateSiteSettings={handleUpdateSiteSettings}
                  onUpdateMembershipPlans={handleUpdateMembershipPlans}
                />
              )}
          </>
        )}
      </main>

      {/* 4. Global Footer (Only visible on Home page, hidden on other pages) */}
      {activeTab === 'home' && !isRegisterOpen && (
        <Footer
          onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onOpenRegister={() => setIsRegisterOpen(true)}
          siteSettings={siteSettings}
        />
      )}

      {/* 5. Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      {/* 6. Matrimonial Profile Detail Modal */}
      <ProfileDetailModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onSendProposal={handleSendProposal}
        onShortlist={(p) => handleToggleShortlist(p.id)}
        isShortlisted={selectedProfile ? shortlistedIds.includes(selectedProfile.id) : false}
        isLoggedIn={!!currentUser}
        hasProposalSent={
          selectedProfile
            ? sentProposalIds.includes(selectedProfile.profileId)
            : false
        }
        currentUser={currentUser}
        onOpenUpgrade={() => {
          setSelectedProfile(null);
          setActiveTab('membership');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MatrimonialApp />
    </ToastProvider>
  );
}
