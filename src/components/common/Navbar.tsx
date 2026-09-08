import React, { useState, useEffect } from 'react';
import { UserRole, UserAccount } from '../../types';
import { BrandLogo } from './BrandLogo';
import {
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  // Determine dynamic visual theme according to current page and scroll position
  const getTheme = () => {
    // 1. Home Tab (Transparent on top, smoothly glassifies when scrolled)
    if (activeTab === 'home') {
      return {
        isDark: true,
        headerClass: isScrolled
          ? 'bg-[#02061f]/85 backdrop-blur-xl border-b border-[#E60000]/30 shadow-lg shadow-black/25'
          : 'bg-transparent border-b border-white/10 shadow-none',
        ambientGlow: isScrolled ? (
          <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/25 via-red-600/10 to-[#000080]/25 pointer-events-none opacity-70" />
        ) : null,
        bottomBorder: isScrolled ? (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#E60000] to-transparent opacity-95 animate-pulse-border" />
        ) : null,
        navDefault: 'text-slate-100/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15',
        navActive: 'text-white bg-gradient-to-r from-[#D91B2B] to-[#E60000] font-bold shadow-md shadow-red-600/35 ring-1 ring-red-400/40',
        loginButton: 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50',
        userMenuButton: 'bg-white/10 hover:bg-white/20 border border-white/25 text-white',
        dropdown: 'bg-[#04092b]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl',
        dropdownDivider: 'border-white/10',
        dropdownItem: 'text-slate-200 hover:text-white hover:bg-white/10',
        mobileDrawer: 'bg-[#04092b]/98 backdrop-blur-2xl text-white border-t border-[#E60000]/30 shadow-2xl',
        mobileItemDefault: 'text-slate-200 hover:bg-white/10',
        mobileItemActive: 'bg-gradient-to-r from-[#D91B2B] to-[#E60000] text-white font-bold shadow-md shadow-red-600/30',
        mobileDivider: 'border-white/15',
        mobileToggle: 'text-white hover:bg-white/15 border border-white/20',
      };
    }

    // 2. Profiles Tab (Matrimonial Candidate Directory: Fresh Pearl White / Slate)
    if (activeTab === 'profiles') {
      return {
        isDark: false,
        headerClass: 'bg-white/92 backdrop-blur-xl border-b border-slate-200/90 shadow-xs shadow-slate-200/50 text-slate-800',
        ambientGlow: (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-rose-50/30 to-blue-50/50 pointer-events-none" />
        ),
        bottomBorder: (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#000080]/30 to-transparent opacity-80" />
        ),
        navDefault: 'text-slate-700 hover:text-[#000080] hover:bg-slate-100 border border-transparent hover:border-slate-200',
        navActive: 'text-white bg-gradient-to-r from-[#000080] to-[#16205B] font-bold shadow-md shadow-indigo-950/20 ring-1 ring-indigo-400/30',
        loginButton: 'text-[#000080] hover:text-[#D91B2B] bg-slate-100 hover:bg-slate-200/80 border border-slate-200',
        userMenuButton: 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800',
        dropdown: 'bg-white border border-slate-200 text-slate-800 shadow-2xl',
        dropdownDivider: 'border-slate-100',
        dropdownItem: 'text-slate-700 hover:text-[#000080] hover:bg-slate-100',
        mobileDrawer: 'bg-white text-slate-900 border-t border-slate-200 shadow-2xl',
        mobileItemDefault: 'text-slate-700 hover:bg-slate-100',
        mobileItemActive: 'bg-gradient-to-r from-[#000080] to-[#16205B] text-white font-bold shadow-md shadow-indigo-950/20',
        mobileDivider: 'border-slate-100',
        mobileToggle: 'text-slate-700 hover:bg-slate-100 border border-slate-200',
      };
    }

    // 3. Matchmaking Services Tab (Deep Royal Indigo & Midnight Navy)
    if (activeTab === 'services') {
      return {
        isDark: true,
        headerClass: 'bg-[#090e29]/95 backdrop-blur-xl border-b border-indigo-500/30 shadow-lg shadow-indigo-950/30 text-white',
        ambientGlow: (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/15 via-blue-600/10 to-indigo-600/15 pointer-events-none" />
        ),
        bottomBorder: (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-90 animate-pulse-border" />
        ),
        navDefault: 'text-indigo-100/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15',
        navActive: 'text-white bg-gradient-to-r from-[#D91B2B] to-[#E60000] font-bold shadow-md shadow-red-600/35 ring-1 ring-red-400/40',
        loginButton: 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50',
        userMenuButton: 'bg-white/10 hover:bg-white/20 border border-white/25 text-white',
        dropdown: 'bg-[#060a1f]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl',
        dropdownDivider: 'border-white/10',
        dropdownItem: 'text-slate-200 hover:text-white hover:bg-white/10',
        mobileDrawer: 'bg-[#060a1f]/98 backdrop-blur-2xl text-white border-t border-indigo-500/30 shadow-2xl',
        mobileItemDefault: 'text-slate-200 hover:bg-white/10',
        mobileItemActive: 'bg-gradient-to-r from-[#D91B2B] to-[#E60000] text-white font-bold shadow-md shadow-red-600/30',
        mobileDivider: 'border-white/15',
        mobileToggle: 'text-white hover:bg-white/15 border border-white/20',
      };
    }

    // 4. Membership & Pricing Tab (Prestige Velvet Obsidian & Champagne Gold)
    if (activeTab === 'membership') {
      return {
        isDark: true,
        headerClass: 'bg-[#0d0d16]/95 backdrop-blur-xl border-b border-amber-500/35 shadow-lg shadow-amber-950/20 text-white',
        ambientGlow: (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 pointer-events-none" />
        ),
        bottomBorder: (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-95 animate-pulse-border" />
        ),
        navDefault: 'text-amber-100/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15',
        navActive: 'text-white bg-gradient-to-r from-amber-600 via-rose-600 to-[#E60000] font-bold shadow-md shadow-amber-600/35 ring-1 ring-amber-400/40',
        loginButton: 'text-amber-100 hover:text-white bg-white/10 hover:bg-white/20 border border-amber-400/30',
        userMenuButton: 'bg-white/10 hover:bg-white/20 border border-amber-400/30 text-white',
        dropdown: 'bg-[#0c0c14]/95 backdrop-blur-xl border border-amber-500/20 text-white shadow-2xl',
        dropdownDivider: 'border-white/10',
        dropdownItem: 'text-slate-200 hover:text-white hover:bg-white/10',
        mobileDrawer: 'bg-[#0c0c14]/98 backdrop-blur-2xl text-white border-t border-amber-500/30 shadow-2xl',
        mobileItemDefault: 'text-slate-200 hover:bg-white/10',
        mobileItemActive: 'bg-gradient-to-r from-amber-600 to-[#E60000] text-white font-bold shadow-md shadow-amber-600/30',
        mobileDivider: 'border-white/15',
        mobileToggle: 'text-amber-200 hover:bg-white/15 border border-amber-400/30',
      };
    }

    // 5. Success Stories Tab (Warm Burgundy & Romantic Crimson Glow)
    if (activeTab === 'stories') {
      return {
        isDark: true,
        headerClass: 'bg-[#15070e]/95 backdrop-blur-xl border-b border-rose-500/35 shadow-lg shadow-rose-950/25 text-white',
        ambientGlow: (
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 via-pink-600/10 to-rose-600/20 pointer-events-none" />
        ),
        bottomBorder: (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-95 animate-pulse-border" />
        ),
        navDefault: 'text-rose-100/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15',
        navActive: 'text-white bg-gradient-to-r from-[#D91B2B] to-rose-600 font-bold shadow-md shadow-rose-600/35 ring-1 ring-rose-400/40',
        loginButton: 'text-rose-100 hover:text-white bg-white/10 hover:bg-white/20 border border-rose-400/30',
        userMenuButton: 'bg-white/10 hover:bg-white/20 border border-rose-400/30 text-white',
        dropdown: 'bg-[#10050b]/95 backdrop-blur-xl border border-rose-500/20 text-white shadow-2xl',
        dropdownDivider: 'border-white/10',
        dropdownItem: 'text-slate-200 hover:text-white hover:bg-white/10',
        mobileDrawer: 'bg-[#10050b]/98 backdrop-blur-2xl text-white border-t border-rose-500/30 shadow-2xl',
        mobileItemDefault: 'text-slate-200 hover:bg-white/10',
        mobileItemActive: 'bg-gradient-to-r from-[#D91B2B] to-rose-600 text-white font-bold shadow-md shadow-rose-600/30',
        mobileDivider: 'border-white/15',
        mobileToggle: 'text-rose-200 hover:bg-white/15 border border-rose-400/30',
      };
    }

    // 6. User Portal Tabs (Dashboard, Edit Profile, Proposals)
    if (activeTab === 'dashboard' || activeTab.startsWith('user-')) {
      return {
        isDark: false,
        headerClass: 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs shadow-slate-200/50 text-slate-800',
        ambientGlow: (
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50/40 via-slate-50 to-rose-50/40 pointer-events-none" />
        ),
        bottomBorder: (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#D91B2B]/40 to-transparent opacity-80" />
        ),
        navDefault: 'text-slate-700 hover:text-[#000080] hover:bg-slate-100 border border-transparent hover:border-slate-200',
        navActive: 'text-white bg-gradient-to-r from-[#D91B2B] to-[#E60000] font-bold shadow-md shadow-red-600/35 ring-1 ring-red-400/40',
        loginButton: 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200',
        userMenuButton: 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800',
        dropdown: 'bg-white border border-slate-200 text-slate-800 shadow-2xl',
        dropdownDivider: 'border-slate-100',
        dropdownItem: 'text-slate-700 hover:text-[#000080] hover:bg-slate-100',
        mobileDrawer: 'bg-white text-slate-900 border-t border-slate-200 shadow-2xl',
        mobileItemDefault: 'text-slate-700 hover:bg-slate-100',
        mobileItemActive: 'bg-gradient-to-r from-[#D91B2B] to-[#E60000] text-white font-bold shadow-md shadow-red-600/30',
        mobileDivider: 'border-slate-100',
        mobileToggle: 'text-slate-700 hover:bg-slate-100 border border-slate-200',
      };
    }

    // 7. Admin Portal Tabs (Matchmaker Relationship Manager Desk)
    if (activeTab.startsWith('admin-')) {
      return {
        isDark: true,
        headerClass: 'bg-[#080d24]/95 backdrop-blur-xl border-b border-indigo-500/40 shadow-lg shadow-indigo-950/30 text-white',
        ambientGlow: (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-blue-600/10 to-indigo-600/20 pointer-events-none" />
        ),
        bottomBorder: (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-90 animate-pulse-border" />
        ),
        navDefault: 'text-indigo-100/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15',
        navActive: 'text-white bg-gradient-to-r from-[#16205B] to-indigo-600 font-bold shadow-md shadow-indigo-600/35 ring-1 ring-indigo-400/40',
        loginButton: 'text-white/90 bg-white/10 hover:bg-white/20 border border-white/25',
        userMenuButton: 'bg-white/10 hover:bg-white/20 border border-white/25 text-white',
        dropdown: 'bg-[#060a1e]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl',
        dropdownDivider: 'border-white/10',
        dropdownItem: 'text-slate-200 hover:text-white hover:bg-white/10',
        mobileDrawer: 'bg-[#060a1e]/98 backdrop-blur-2xl text-white border-t border-indigo-500/30 shadow-2xl',
        mobileItemDefault: 'text-slate-200 hover:bg-white/10',
        mobileItemActive: 'bg-gradient-to-r from-[#16205B] to-indigo-600 text-white font-bold shadow-md shadow-indigo-600/35',
        mobileDivider: 'border-white/15',
        mobileToggle: 'text-white hover:bg-white/15 border border-white/20',
      };
    }

    // 8. Super Admin Portal Tabs (Executive Obsidian & Crimson Command Console)
    if (activeTab.startsWith('superadmin-')) {
      return {
        isDark: true,
        headerClass: 'bg-[#0e0407]/95 backdrop-blur-xl border-b border-rose-600/40 shadow-lg shadow-black/40 text-white',
        ambientGlow: (
          <div className="absolute inset-0 bg-gradient-to-r from-rose-700/20 via-red-600/10 to-rose-700/20 pointer-events-none" />
        ),
        bottomBorder: (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-95 animate-pulse-border" />
        ),
        navDefault: 'text-rose-100/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15',
        navActive: 'text-white bg-gradient-to-r from-[#D91B2B] to-rose-600 font-bold shadow-md shadow-rose-600/35 ring-1 ring-rose-400/40',
        loginButton: 'text-white/90 bg-white/10 hover:bg-white/20 border border-white/25',
        userMenuButton: 'bg-white/10 hover:bg-white/20 border border-white/25 text-white',
        dropdown: 'bg-[#0b0305]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl',
        dropdownDivider: 'border-white/10',
        dropdownItem: 'text-slate-200 hover:text-white hover:bg-white/10',
        mobileDrawer: 'bg-[#0b0305]/98 backdrop-blur-2xl text-white border-t border-rose-600/40 shadow-2xl',
        mobileItemDefault: 'text-slate-200 hover:bg-white/10',
        mobileItemActive: 'bg-gradient-to-r from-[#D91B2B] to-rose-600 text-white font-bold shadow-md shadow-rose-600/35',
        mobileDivider: 'border-white/15',
        mobileToggle: 'text-white hover:bg-white/15 border border-white/20',
      };
    }

    // Default Fallback
    return {
      isDark: true,
      headerClass: 'bg-[#02061f]/85 backdrop-blur-xl border-b border-[#E60000]/30 shadow-lg shadow-black/25',
      ambientGlow: null,
      bottomBorder: (
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#E60000] to-transparent opacity-95" />
      ),
      navDefault: 'text-slate-100/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15',
      navActive: 'text-white bg-gradient-to-r from-[#D91B2B] to-[#E60000] font-bold shadow-md shadow-red-600/35 ring-1 ring-red-400/40',
      loginButton: 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25',
      userMenuButton: 'bg-white/10 hover:bg-white/20 border border-white/25 text-white',
      dropdown: 'bg-[#04092b]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl',
      dropdownDivider: 'border-white/10',
      dropdownItem: 'text-slate-200 hover:text-white hover:bg-white/10',
      mobileDrawer: 'bg-[#04092b]/98 backdrop-blur-2xl text-white border-t border-[#E60000]/30 shadow-2xl',
      mobileItemDefault: 'text-slate-200 hover:bg-white/10',
      mobileItemActive: 'bg-gradient-to-r from-[#D91B2B] to-[#E60000] text-white font-bold shadow-md shadow-red-600/30',
      mobileDivider: 'border-white/15',
      mobileToggle: 'text-white hover:bg-white/15 border border-white/20',
    };
  };

  const theme = getTheme();

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-500 relative overflow-visible ${theme.headerClass}`}
    >
      {/* Ambient page-specific background highlights */}
      {theme.ambientGlow}

      {/* Page-specific glowing border line */}
      {theme.bottomBorder}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo in distinct, luxury protected pure-white pill badge */}
          <div className="flex items-center">
            <div
              onClick={() => handleNavClick('home')}
              className={`group relative flex items-center px-4 py-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                theme.isDark
                  ? 'bg-white/95 hover:bg-white shadow-lg shadow-black/25 border border-white/90 hover:shadow-xl hover:shadow-[#E60000]/25 hover:scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 shadow-sm border border-slate-200/90 hover:border-slate-300 hover:scale-[1.02]'
              }`}
              title="Shadikabbo.com - Home"
            >
              <BrandLogo size="md" variant="horizontal" inverted={false} />
              {/* Subtle animated red glow indicator on hover */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#E60000] to-transparent group-hover:w-3/4 transition-all duration-300 rounded-full" />
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
                  onClick={() => handleNavClick('profiles')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'profiles' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Find Matches
                  {activeTab !== 'profiles' && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E60000] group-hover:w-1/2 transition-all duration-300 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className={`group relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'services' ? theme.navActive : theme.navDefault
                  }`}
                >
                  Matchmaking Services
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
                  Membership Plans
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
          <div className="hidden lg:flex items-center gap-3">
            {currentRole === 'guest' ? (
              <>
                <button
                  onClick={onOpenLogin}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-xs backdrop-blur-md cursor-pointer ${theme.loginButton}`}
                >
                  Log In
                </button>
                <button
                  onClick={onOpenRegister}
                  className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#E60000] via-[#FF1A38] to-[#D91B2B] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-600/35 hover:shadow-xl hover:shadow-red-600/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ring-1 ring-red-400/40 cursor-pointer"
                >
                  {/* Diagonal animated shine sweep */}
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-light-sweep pointer-events-none" />
                  <Sparkles className="w-4 h-4 text-rose-200 shrink-0" />
                  <span className="tracking-wide">GET STARTED</span>
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-3 p-1.5 pr-3.5 rounded-full transition-all backdrop-blur-md shadow-xs cursor-pointer ${theme.userMenuButton}`}
                >
                  <div className="relative">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                      alt={currentUser?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-white/60 shadow-xs"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#000080]" />
                  </div>
                  <div className="text-left leading-tight hidden xl:block">
                    <p className="text-xs font-bold truncate max-w-[110px]">{currentUser?.name}</p>
                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-black/10">
                      {currentUser?.role === 'superadmin' || currentUser?.role === 'super_admin'
                        ? 'Super Admin'
                        : currentUser?.role === 'admin'
                        ? 'Relationship Mgr'
                        : `${currentUser?.membershipPlan} Member`}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
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

          {/* Mobile Menu Toggle & Action */}
          <div className="flex lg:hidden items-center gap-2">
            {currentRole === 'guest' ? (
              <button
                onClick={onOpenRegister}
                className="bg-gradient-to-r from-[#E60000] to-[#D91B2B] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md shadow-red-600/30"
              >
                GET STARTED
              </button>
            ) : (
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
                className="w-8 h-8 rounded-full overflow-hidden border border-white/40 shadow-xs"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                  alt={currentUser?.name}
                  className="w-full h-full object-cover"
                />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${theme.mobileToggle}`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer - Dynamically styled for current page */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-4 pt-4 pb-6 space-y-2 animate-in slide-in-from-top-2 ${theme.mobileDrawer}`}>
          {currentRole === 'guest' && (
            <>
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'home' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('profiles')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'profiles' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Find Matrimonial Matches
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'services' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Matchmaking Services
              </button>
              <button
                onClick={() => handleNavClick('membership')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'membership' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Membership Packages
              </button>
              <button
                onClick={() => handleNavClick('stories')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'stories' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Success Stories
              </button>
              <div className={`pt-3 border-t flex gap-2 ${theme.mobileDivider}`}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-xl ${theme.loginButton}`}
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="flex-1 py-2.5 text-center text-sm font-bold rounded-xl bg-gradient-to-r from-[#E60000] to-[#D91B2B] text-white hover:bg-red-700 shadow-md shadow-red-600/30"
                >
                  GET STARTED
                </button>
              </div>
            </>
          )}

          {currentRole === 'user' && (
            <>
              <div className="p-3 bg-black/5 rounded-xl mb-2 flex items-center gap-3 border border-black/10">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/40"
                />
                <div>
                  <p className="text-sm font-bold">{currentUser?.name}</p>
                  <p className="text-xs opacity-75">{currentUser?.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleNavClick('user-dashboard')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'user-dashboard' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Dashboard Overview
              </button>
              <button
                onClick={() => handleNavClick('profiles')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'profiles' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Browse Matches
              </button>
              <button
                onClick={() => handleNavClick('user-proposals')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                  activeTab === 'user-proposals' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                <span>Proposals</span>
                {receivedProposalsCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-[#E60000] text-white rounded-full font-bold">
                    {receivedProposalsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleNavClick('user-edit-profile')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'user-edit-profile' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Edit My Biodata
              </button>
              <button
                onClick={() => handleNavClick('membership')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'membership' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Membership Packages
              </button>
              <div className={`pt-2 border-t ${theme.mobileDivider}`}>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-500/10"
                >
                  Log Out
                </button>
              </div>
            </>
          )}

          {currentRole === 'admin' && (
            <>
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'admin-dashboard' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Admin Overview
              </button>
              <button
                onClick={() => handleNavClick('admin-users')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'admin-users' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                All Users Directory
              </button>
              <button
                onClick={() => handleNavClick('admin-my-assign')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'admin-my-assign' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                My Assigned Candidates
              </button>
              <div className={`pt-2 border-t ${theme.mobileDivider}`}>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-500/10"
                >
                  Log Out
                </button>
              </div>
            </>
          )}

          {(currentRole === 'superadmin' || currentRole === 'super_admin') && (
            <>
              <button
                onClick={() => handleNavClick('superadmin-dashboard')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'superadmin-dashboard' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Super Admin Console
              </button>
              <button
                onClick={() => handleNavClick('superadmin-users')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'superadmin-users' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                All Platform Candidates
              </button>
              <button
                onClick={() => handleNavClick('superadmin-admins')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === 'superadmin-admins' ? theme.mobileItemActive : theme.mobileItemDefault
                }`}
              >
                Admin Staff Accounts
              </button>
              <div className={`pt-2 border-t ${theme.mobileDivider}`}>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-500/10"
                >
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
