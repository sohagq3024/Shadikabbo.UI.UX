import React, { useState, useEffect } from 'react';
import { UserRole, UserAccount } from '../../types';
import { BrandLogo } from './BrandLogo';
import {
  Home,
  HeartHandshake,
  BookOpen,
  LayoutDashboard,
  User,
  Heart,
  Search,
  Crown,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles,
  Inbox,
  UserCheck,
  MessageSquareHeart,
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  currentUser: UserAccount | null;
  activeTab: string;
  isRegisterOpen?: boolean;
  onNavigate?: (tab: string) => void;
  onTabChange?: (tab: string) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
  receivedProposalsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentUser,
  activeTab,
  isRegisterOpen = false,
  onNavigate,
  onTabChange,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  receivedProposalsCount = 0,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for smooth adaptive header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    if (onTabChange) onTabChange(tab);
    setProfileDropdownOpen(false);
  };

  // High Quality Luxury White-Themed Navigation Bar
  const getTheme = () => {
    return {
      isDark: false,
      headerClass: 'bg-transparent',
      innerClass: isScrolled
        ? 'bg-white/98 backdrop-blur-xl border border-slate-200/90 shadow-[0_6px_25px_-3px_rgba(22,32,91,0.09),0_2px_8px_-1px_rgba(0,0,0,0.04)] text-slate-800'
        : 'bg-white/95 backdrop-blur-xl border border-slate-200/85 shadow-[0_4px_20px_-2px_rgba(22,32,91,0.07),0_2px_8px_-1px_rgba(0,0,0,0.03)] text-slate-800',
      ambientGlow: null,
      bottomBorder: null,
      navDefault:
        'text-slate-600 hover:text-[#D91B2B] hover:bg-slate-50/90 transition-all font-medium text-[13px] rounded-full',
      navActive:
        'text-[#D91B2B] bg-rose-50/90 font-semibold border border-rose-200/70 shadow-2xs text-[13px] rounded-full',
      loginButton:
        'text-slate-700 hover:text-[#D91B2B] hover:bg-slate-50 hover:border-slate-300 bg-white border border-slate-200/90 shadow-2xs font-semibold text-xs transition-all rounded-full',
      userMenuButton:
        'bg-slate-50/90 hover:bg-slate-100 border border-slate-200/90 text-slate-800 shadow-2xs rounded-full',
      dropdown:
        'bg-white border border-slate-200 text-slate-800 shadow-xl',
      dropdownDivider: 'border-slate-100',
      dropdownItem:
        'text-slate-700 hover:text-[#D91B2B] hover:bg-slate-50',
      mobileDrawer:
        'bg-white text-slate-800 border-t border-slate-100 shadow-2xl',
      mobileItemDefault: 'text-slate-700 hover:bg-slate-50',
      mobileItemActive:
        'bg-rose-50 text-[#D91B2B] font-semibold border border-rose-200/60',
      mobileDivider: 'border-slate-100',
      mobileToggle:
        'text-slate-700 hover:bg-slate-100 border border-slate-200',
    };
  };

  const theme = getTheme();

  // Mobile native app bottom navigation items - streamlined & compact
  const getMobileNavItems = () => {
    if (currentRole === 'guest') {
      return [
        { id: 'home', label: 'Home', Icon: Home },
        { id: 'review', label: 'Review', Icon: MessageSquareHeart },
        { id: 'membership', label: 'Plans', Icon: Crown },
        { id: 'stories', label: 'Stories', Icon: BookOpen },
      ];
    }
    if (currentRole === 'user') {
      return [
        { id: 'user-dashboard', label: 'Home', Icon: LayoutDashboard },
        { id: 'profiles', label: 'Matches', Icon: Search },
        {
          id: 'user-proposals',
          label: 'Proposals',
          Icon: Inbox,
          badge: receivedProposalsCount > 0 ? receivedProposalsCount : undefined,
        },
        { id: 'review', label: 'Review', Icon: MessageSquareHeart },
        { id: 'membership', label: 'Plan', Icon: Crown },
      ];
    }
    if (currentRole === 'admin') {
      return [
        { id: 'admin-dashboard', label: 'Dashboard', Icon: LayoutDashboard },
        { id: 'admin-users', label: 'Users', Icon: UserCheck },
        { id: 'review', label: 'Review', Icon: MessageSquareHeart },
        { id: 'admin-my-assign', label: 'Assigned', Icon: Heart },
      ];
    }
    // Superadmin
    return [
      { id: 'superadmin-dashboard', label: 'Console', Icon: LayoutDashboard },
      { id: 'superadmin-users', label: 'Candidates', Icon: UserCheck },
      { id: 'review', label: 'Review', Icon: MessageSquareHeart },
      { id: 'superadmin-admins', label: 'Admins', Icon: Shield },
    ];
  };

  return (
    <>
      <header
        id="main-header"
        className="sticky top-1 sm:top-2.5 z-40 w-full px-2 sm:px-4 lg:px-6 transition-all duration-300 pointer-events-none"
      >
        {/* Rounded container on both sides with subtle bottom shadow and smart design elements */}
        <div
          className={`pointer-events-auto max-w-7xl mx-auto rounded-2xl sm:rounded-full ${theme.innerClass} pl-1.5 pr-2 sm:px-4 lg:px-6 relative z-10 transition-all duration-300`}
        >
          {/* Subtle luxury bottom micro-glow hairline */}
          <div className="absolute bottom-0 inset-x-8 sm:inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-[#D91B2B]/25 to-transparent pointer-events-none rounded-full" />

          {/* Slim and compact header row on mobile: h-11 (44px) removing unnecessary dead space */}
          <div className="flex items-center justify-between h-11 sm:h-12 md:h-14 lg:h-16">
            {/* Brand Logo - Pushed tightly to the far left corner */}
            <div className="flex items-center shrink-0 -ml-0.5 sm:ml-0">
              <div
                onClick={() => handleNavClick('home')}
                className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                title="Shadikabbo.com - Home"
              >
                {/* Desktop view */}
                <div className="hidden sm:block">
                  <BrandLogo size="sm" variant="horizontal" inverted={false} />
                </div>
                {/* Mobile view: Compact & placed snugly in the corner */}
                <div className="block sm:hidden">
                  <BrandLogo size="xs" variant="horizontal" inverted={false} />
                </div>
              </div>
            </div>

          {/* Desktop Navigation Links - Dynamically themed */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {currentRole === 'guest' && (
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'home' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Home
                  {activeTab !== 'home' && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E60000] group-hover:w-1/2 transition-all duration-300 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('review')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'review' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Review
                  {activeTab !== 'review' && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E60000] group-hover:w-1/2 transition-all duration-300 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('membership')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'membership' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Membership
                  {activeTab !== 'membership' && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E60000] group-hover:w-1/2 transition-all duration-300 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('stories')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'stories' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Success Stories
                  {activeTab !== 'stories' && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E60000] group-hover:w-1/2 transition-all duration-300 rounded-full" />
                  )}
                </button>
              </>
            )}

            {currentRole === 'user' && (
              <>
                <button
                  onClick={() => handleNavClick('user-dashboard')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'user-dashboard' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('profiles')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'profiles' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Browse Matches
                </button>
                <button
                  onClick={() => handleNavClick('user-proposals')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center ${
                    activeTab === 'user-proposals' ? theme.navActive : theme.navDefault
                  }`}
                >
                  <span>Proposals</span>
                  {receivedProposalsCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-[#E60000] text-white border border-white/40 shadow-xs animate-pulse">
                      {receivedProposalsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('review')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'review' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Review
                </button>
                <button
                  onClick={() => handleNavClick('user-edit-profile')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'user-edit-profile' ? theme.navActive : theme.navDefault
                  }`}
                >
                  My Biodata
                </button>
                <button
                  onClick={() => handleNavClick('membership')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'membership' ? theme.navActive : theme.navDefault
                  }`}
                >
                  My Plan
                </button>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'admin-dashboard' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Admin Overview
                </button>
                <button
                  onClick={() => handleNavClick('admin-users')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'admin-users' ? theme.navActive : theme.navDefault
                  }`}
                >
                  All Users
                </button>
                <button
                  onClick={() => handleNavClick('review')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'review' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Timeline Review
                </button>
                <button
                  onClick={() => handleNavClick('admin-my-assign')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'admin-my-assign' ? theme.navActive : theme.navDefault
                  }`}
                >
                  My Assigned Users
                </button>
                <button
                  onClick={() => handleNavClick('admin-account')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'admin-account' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Admin Profile
                </button>
              </>
            )}

            {(currentRole === 'superadmin' || currentRole === 'super_admin') && (
              <>
                <button
                  onClick={() => handleNavClick('superadmin-dashboard')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'superadmin-dashboard' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Super Overview
                </button>
                <button
                  onClick={() => handleNavClick('admin-users')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'admin-users' ? theme.navActive : theme.navDefault
                  }`}
                >
                  All Users
                </button>
                <button
                  onClick={() => handleNavClick('review')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'review' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Timeline Review
                </button>
                <button
                  onClick={() => handleNavClick('superadmin-users')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'superadmin-users' ? theme.navActive : theme.navDefault
                  }`}
                >
                  All Candidates
                </button>
                <button
                  onClick={() => handleNavClick('superadmin-admins')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'superadmin-admins' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Staff Accounts
                </button>
              </>
            )}
          </nav>

          {/* Desktop Right CTA / User Area */}
          <div className="hidden lg:flex items-center gap-2.5">
            {currentRole === 'guest' ? (
              <>
                <button
                  onClick={onOpenLogin}
                  className={`px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${theme.loginButton}`}
                >
                  Log In
                </button>
                <button
                  onClick={onOpenRegister}
                  className="relative overflow-hidden inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D91B2B] via-[#c21524] to-[#9f0e1b] hover:from-[#c21524] hover:to-[#8c0a16] text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-sm shadow-rose-900/15 hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-200 shrink-0" />
                  <span className="tracking-wide">Registration</span>
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-2.5 p-1 pr-3 rounded-full transition-all cursor-pointer ${theme.userMenuButton}`}
                >
                  <div className="relative">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                      alt={currentUser?.name || 'User'}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div className="text-left leading-tight hidden xl:block">
                    <p className="text-xs font-bold truncate max-w-[110px] text-slate-800">{currentUser?.name}</p>
                    <span className="text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {currentUser?.role === 'superadmin' || currentUser?.role === 'super_admin'
                        ? 'Super Admin'
                        : currentUser?.role === 'admin'
                        ? 'Relationship Mgr'
                        : `${currentUser?.membershipPlan} Member`}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl p-2 z-50 animate-in fade-in zoom-in-95 ${theme.dropdown}`}>
                    <div className={`p-2 border-b mb-1 ${theme.dropdownDivider}`}>
                      <p className="text-xs font-bold">{currentUser?.name}</p>
                      <p className="text-[11px] opacity-75 truncate">{currentUser?.email}</p>
                    </div>

                    {currentRole === 'user' && (
                      <>
                        <button
                          onClick={() => handleNavClick('user-dashboard')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <User className="w-3.5 h-3.5 text-blue-400" />
                          Dashboard Overview
                        </button>
                        <button
                          onClick={() => handleNavClick('user-edit-profile')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <Heart className="w-3.5 h-3.5 text-rose-400" />
                          Edit Matrimonial Biodata
                        </button>
                        <button
                          onClick={() => handleNavClick('user-proposals')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <Inbox className="w-3.5 h-3.5 text-sky-400" />
                          Proposal Requests
                        </button>
                        <button
                          onClick={() => handleNavClick('membership')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <Crown className="w-3.5 h-3.5 text-amber-400" />
                          Membership & Upgrades
                        </button>
                      </>
                    )}

                    {currentRole === 'admin' && (
                      <>
                        <button
                          onClick={() => handleNavClick('admin-dashboard')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <Shield className="w-3.5 h-3.5 text-indigo-400" />
                          Admin Overview
                        </button>
                        <button
                          onClick={() => handleNavClick('admin-my-assign')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                          My Assigned Candidates
                        </button>
                      </>
                    )}

                    {(currentRole === 'superadmin' || currentRole === 'super_admin') && (
                      <>
                        <button
                          onClick={() => handleNavClick('superadmin-dashboard')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <Crown className="w-3.5 h-3.5 text-rose-400" />
                          Super Admin Console
                        </button>
                        <button
                          onClick={() => handleNavClick('superadmin-admins')}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors ${theme.dropdownItem}`}
                        >
                          <Shield className="w-3.5 h-3.5 text-amber-400" />
                          Admin Staff Accounts
                        </button>
                      </>
                    )}

                    <div className={`pt-2 border-t mt-1 ${theme.dropdownDivider}`}>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-500/10 rounded-xl text-left transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Right Actions: High-class smart pills and quick shortcuts */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 shrink-0">
            {currentRole === 'guest' ? (
              <>
                {/* Sleek Log In Pill */}
                <button
                  onClick={onOpenLogin}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-full text-slate-700 hover:text-[#D91B2B] bg-slate-50/90 hover:bg-slate-100 border border-slate-200/90 shadow-2xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Log In
                </button>

                {/* Jewel Ruby Registration Pill with subtle sparkles */}
                <button
                  onClick={onOpenRegister}
                  className="relative overflow-hidden inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold rounded-full text-white bg-gradient-to-r from-[#D91B2B] via-[#c21524] to-[#990e1b] shadow-xs shadow-rose-600/25 hover:shadow-sm hover:shadow-rose-600/30 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-rose-200 shrink-0" />
                  <span>Registration</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Proposal quick button if candidate */}
                {currentRole === 'user' && (
                  <button
                    onClick={() => handleNavClick('user-proposals')}
                    className="relative p-1 text-slate-600 hover:text-[#D91B2B] rounded-full hover:bg-slate-100 transition-all active:scale-90"
                    title="Proposals"
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    {receivedProposalsCount > 0 && (
                      <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#D91B2B] border border-white animate-pulse" />
                    )}
                  </button>
                )}

                {/* Smart User Profile Chip */}
                <button
                  onClick={() =>
                    handleNavClick(
                      currentRole === 'user'
                        ? 'user-dashboard'
                        : currentRole === 'admin'
                        ? 'admin-dashboard'
                        : 'superadmin-dashboard'
                    )
                  }
                  className="flex items-center gap-1.5 p-0.5 pr-2 rounded-full border border-slate-200/90 bg-slate-50/90 text-slate-800 shadow-2xs cursor-pointer active:scale-95"
                >
                  <div className="relative">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                      alt={currentUser?.name}
                      className="w-5.5 h-5.5 rounded-full object-cover border border-white"
                    />
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white" />
                  </div>
                  <span className="text-[10px] font-bold max-w-[65px] truncate text-slate-700">
                    {currentUser?.name?.split(' ')[0]}
                  </span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Native App Bottom Navigation Bar - Ultra-Slim Floating Luxury Dock */}
    <nav
      id="mobile-bottom-bar"
      className="lg:hidden fixed bottom-2 inset-x-2 sm:inset-x-8 max-w-lg mx-auto z-40 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-[0_8px_30px_-4px_rgba(2,6,31,0.14),0_2px_8px_rgba(0,0,0,0.04)] px-1.5 py-1 flex items-center justify-around select-none"
      aria-label="Mobile Bottom Navigation"
    >
      {/* Subtle luxury micro hairline glow */}
      <div className="absolute -top-[1px] inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#D91B2B]/25 to-transparent pointer-events-none rounded-full" />

      {getMobileNavItems().map((item) => {
        const isActive = activeTab === item.id;
        const IconComponent = item.Icon;
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
              isActive ? 'text-[#D91B2B]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {/* Active subtle luxury pill highlight */}
            {isActive && (
              <span className="absolute inset-0.5 bg-gradient-to-b from-rose-50/90 to-red-50/50 rounded-xl border border-rose-200/70 shadow-2xs -z-0" />
            )}

            <div className="relative z-10 flex items-center justify-center">
              <IconComponent
                className={`w-4 h-4 transition-all duration-200 ${
                  isActive ? 'text-[#D91B2B] stroke-[2.2]' : 'text-slate-400 stroke-[1.8]'
                }`}
              />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 px-1 min-w-[13px] h-[13px] text-[8px] font-black bg-[#D91B2B] text-white rounded-full flex items-center justify-center border border-white shadow-2xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`relative z-10 text-[9px] font-semibold tracking-tight mt-0.5 whitespace-nowrap leading-none transition-colors ${
                isActive ? 'text-[#D91B2B]' : 'text-slate-500'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  </>
);
};
