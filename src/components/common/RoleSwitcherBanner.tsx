import React, { useState } from 'react';
import { UserRole } from '../../types';
import { Shield, User, Crown, Globe, ChevronDown, Key, Check } from 'lucide-react';

interface RoleSwitcherBannerProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenLoginModal: () => void;
}

export const RoleSwitcherBanner: React.FC<RoleSwitcherBannerProps> = ({
  currentRole,
  onSelectRole,
  onOpenLoginModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const rolesConfig: {
    id: UserRole;
    label: string;
    sub: string;
    email?: string;
    pass?: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'guest',
      label: 'Guest / Public Viewer',
      sub: 'Homepage, discovery, membership, registration',
      icon: <Globe className="w-3.5 h-3.5" />,
      color: 'text-slate-600 bg-slate-100 border-slate-300',
    },
    {
      id: 'user',
      label: 'Registered User',
      sub: 'Farhan Ahmed • Proposals, biodata, edit profile',
      email: 'user096@gmail.com',
      pass: 'user096',
      icon: <User className="w-3.5 h-3.5" />,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      id: 'admin',
      label: 'Admin (Relationship Mgr)',
      sub: 'Kabir Hossain • Assigned users, client tracking',
      email: 'admin096@gmail.com',
      pass: 'admin096',
      icon: <Shield className="w-3.5 h-3.5" />,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    },
    {
      id: 'superadmin',
      label: 'Super Admin',
      sub: 'Rahman Qureshi • All accounts, full control',
      email: 'superadmin096@gmail.com',
      pass: 'superadmin096',
      icon: <Crown className="w-3.5 h-3.5" />,
      color: 'text-rose-700 bg-rose-50 border-rose-200',
    },
  ];

  const currentConfig = rolesConfig.find((r) => r.id === currentRole) || rolesConfig[0];

  const copyCreds = (email: string, pass: string) => {
    navigator.clipboard?.writeText(`${email} / ${pass}`);
    setIsCopied(email);
    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <div className="bg-[#121A45] text-white border-b border-[#253582] text-xs py-1.5 px-3 sm:px-6 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Role identifier badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block font-semibold uppercase tracking-wider text-[10px] text-slate-300">
            Preview Role Mode:
          </span>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium transition-colors border border-white/15"
            >
              {currentConfig.icon}
              <span className="font-semibold">{currentConfig.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Test View (1-Click)
                  </p>
                </div>
                <div className="space-y-1">
                  {rolesConfig.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onSelectRole(r.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors ${
                        currentRole === r.id
                          ? 'bg-[#16205B]/10 text-[#16205B] font-semibold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="mt-0.5 p-1 rounded-md bg-slate-100 text-slate-700">
                        {r.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold leading-tight">{r.label}</p>
                          {currentRole === r.id && (
                            <span className="text-[10px] bg-[#16205B] text-white px-1.5 py-0.2 rounded font-bold">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{r.sub}</p>
                        {r.email && (
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                            {r.email}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Demo Credentials Info */}
        <div className="flex items-center gap-3 text-[11px] text-slate-200">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-slate-400">Demo Login:</span>
            <button
              onClick={() => copyCreds('user096@gmail.com', 'user096')}
              className="hover:text-white transition-colors underline decoration-slate-400 underline-offset-2 flex items-center gap-1 font-mono text-[10px]"
              title="Click to copy"
            >
              User: user096
              {isCopied === 'user096@gmail.com' ? <Check className="w-3 h-3 text-emerald-400" /> : null}
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => copyCreds('admin096@gmail.com', 'admin096')}
              className="hover:text-white transition-colors underline decoration-slate-400 underline-offset-2 flex items-center gap-1 font-mono text-[10px]"
              title="Click to copy"
            >
              Admin: admin096
              {isCopied === 'admin096@gmail.com' ? <Check className="w-3 h-3 text-emerald-400" /> : null}
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => copyCreds('superadmin096@gmail.com', 'superadmin096')}
              className="hover:text-white transition-colors underline decoration-slate-400 underline-offset-2 flex items-center gap-1 font-mono text-[10px]"
              title="Click to copy"
            >
              SuperAdmin: superadmin096
              {isCopied === 'superadmin096@gmail.com' ? <Check className="w-3 h-3 text-emerald-400" /> : null}
            </button>
          </div>

          <button
            onClick={onOpenLoginModal}
            className="inline-flex items-center gap-1 bg-[#D91B2B] hover:bg-[#b91422] text-white px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors shadow-sm"
          >
            <Key className="w-3 h-3" />
            Auth Modal
          </button>
        </div>
      </div>
    </div>
  );
};
