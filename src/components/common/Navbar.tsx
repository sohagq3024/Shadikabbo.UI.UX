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
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  currentUser: UserAccount | null;
  activeTab: string;
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
      headerClass: isScrolled
        ? 'bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-900/5 text-slate-800'
        : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs text-slate-800',
      ambientGlow: null,
      bottomBorder: null,
      navDefault:
        'text-slate-600 hover:text-[#D91B2B] hover:bg-slate-50 transition-all font-medium text-[13px]',
      navActive:
        'text-[#D91B2B] bg-rose-50/90 font-semibold border border-rose-200/60 shadow-2xs text-[13px]',
      loginButton:
        'text-slate-700 hover:text-[#D91B2B] hover:bg-slate-50 hover:border-slate-300 bg-white border border-slate-200 shadow-2xs font-semibold text-xs transition-all',
      userMenuButton:
        'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 shadow-2xs',
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

  // Mobile native app bottom navigation items
  const getMobileNavItems = () => {
    if (currentRole === 'guest') {
      return [
        { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
        { id: 'services', label: 'Service', icon: <HeartHandshake className="w-5 h-5" /> },
        { id: 'membership', label: 'Membership', icon: <Crown className="w-5 h-5" /> },
        { id: 'stories', label: 'Stories', icon: <BookOpen className="w-5 h-5" /> },
      ];
    }
    if (currentRole === 'user') {
      return [
        { id: 'user-dashboard', label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'profiles', label: 'Matches', icon: <Search className="w-5 h-5" /> },
        {
          id: 'user-proposals',
          label: 'Proposals',
          icon: <Inbox className="w-5 h-5" />,
          badge: receivedProposalsCount > 0 ? receivedProposalsCount : undefined,
        },
        { id: 'user-edit-profile', label: 'Biodata', icon: <UserCheck className="w-5 h-5" /> },
        { id: 'membership', label: 'Plan', icon: <Crown className="w-5 h-5" /> },
      ];
    }
    if (currentRole === 'admin') {
      return [
        { id: 'admin-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'admin-users', label: 'Users', icon: <UserCheck className="w-5 h-5" /> },
        { id: 'admin-my-assign', label: 'Assigned', icon: <Heart className="w-5 h-5" /> },
      ];
    }
    // Superadmin
    return [
      { id: 'superadmin-dashboard', label: 'Console', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'superadmin-users', label: 'Candidates', icon: <UserCheck className="w-5 h-5" /> },
      { id: 'superadmin-admins', label: 'Admins', icon: <Shield className="w-5 h-5" /> },
    ];
  };

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 relative ${theme.headerClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo - Responsive sizing (compact on mobile, standard on desktop) */}
            <div className="flex items-center">
              <div
                onClick={() => handleNavClick('home')}
                className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                title="Shadikabbo.com - Home"
              >
                {/* Desktop view */}
                <div className="hidden sm:block">
                  <BrandLogo size="sm" variant="horizontal" inverted={false} />
                </div>
                {/* Mobile view: Smaller, compact & ultra-premium */}
                <div className="block sm:hidden">
                  <BrandLogo size="xs" variant="horizontal" inverted={false} />
                </div>
              </div>
            </div>

          {/* Desktop Navigation Links - Dynamically themed */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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
                  onClick={() => handleNavClick('services')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'services' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Service
                  {activeTab !== 'services' && (
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
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${theme.loginButton}`}
                >
                  Log In
                </button>
                <button
                  onClick={onOpenRegister}
                  className="relative overflow-hidden inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D91B2B] to-[#b91422] hover:from-[#c21524] hover:to-[#9f0e1b] text-white px-4 py-1.5 rounded-lg font-bold text-xs shadow-sm shadow-rose-900/15 hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
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

          {/* Mobile Right Actions: Side-by-side Log In & Registration buttons */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {currentRole === 'guest' ? (
              <>
                <button
                  onClick={onOpenLogin}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg text-slate-700 hover:text-[#D91B2B] bg-slate-50 hover:bg-slate-100 border border-slate-200/90 shadow-2xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Log In
                </button>
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg text-white bg-gradient-to-r from-[#D91B2B] to-[#b91422] hover:from-[#c21524] hover:to-[#9f0e1b] shadow-sm shadow-rose-900/15 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-rose-200 shrink-0" />
                  <span>Registration</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1.5">
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
                  className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-slate-200 bg-slate-50 text-slate-800 shadow-2xs cursor-pointer active:scale-95"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                    alt={currentUser?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-[10px] font-bold max-w-[70px] truncate text-slate-700">
                    {currentUser?.name?.split(' ')[0]}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Native App Bottom Navigation Bar */}
    <nav
      id="mobile-bottom-bar"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] py-1 px-2 flex items-center justify-around select-none pb-[calc(env(safe-area-inset-bottom)+0.25rem)]"
      aria-label="Mobile Bottom Navigation"
    >
      {getMobileNavItems().map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 relative ${
              isActive ? 'text-[#D91B2B]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`p-1 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-rose-50 text-[#D91B2B] scale-105' : 'text-slate-400'
                }`}
              >
                {item.icon}
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 px-1 min-w-[14px] h-[14px] text-[9px] font-extrabold bg-[#D91B2B] text-white rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors ${
                isActive ? 'text-[#D91B2B] font-bold' : 'text-slate-500 font-medium'
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#D91B2B] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  </>
);
};
