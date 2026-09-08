import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { UserRole, UserAccount } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { X, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, KeyRound, Check } from 'lucide-react';
import { useToast } from '../common/Toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (user: UserAccount) => void;
  onLoginSuccess?: (role: UserRole, email: string) => void;
  onOpenRegister?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onLoginSuccess,
  onOpenRegister,
  onSwitchToRegister,
}) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  if (!isOpen) return null;

  const handleTriggerRegister = () => {
    onClose();
    if (onOpenRegister) {
      onOpenRegister();
    } else if (onSwitchToRegister) {
      onSwitchToRegister();
    }
  };

  const dispatchLogin = (account: UserAccount) => {
    if (onLogin) {
      onLogin(account);
    }
    if (onLoginSuccess) {
      onLoginSuccess(account.role, account.email);
    }
  };

  const handleInstantDemoLogin = (targetEmail: string) => {
    const matchedAccount =
      DEMO_USERS.find((u) => u.email.toLowerCase() === targetEmail.toLowerCase()) || DEMO_USERS[0];
    
    setEmail(matchedAccount.email);
    setPassword(matchedAccount.password || 'password');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      dispatchLogin(matchedAccount);
      showToast('Logged In as Demo Account', `Active session: ${matchedAccount.name} (${matchedAccount.email})`, 'success');
      onClose();
    }, 300);
  };

  const handleQuickFill = (targetEmail: string, targetPass: string) => {
    setEmail(targetEmail);
    setPassword(targetPass);
    showToast('Credentials Filled', `Auto-filled: ${targetEmail}`, 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Validation Error', 'Please enter both your email and password.', 'error');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const normalizedEmail = email.toLowerCase().trim();
      let matchedAccount: UserAccount;

      if (normalizedEmail === 'superadmin096@gmail.com' || normalizedEmail.includes('superadmin')) {
        matchedAccount =
          DEMO_USERS.find((u) => u.email === 'superadmin096@gmail.com') || {
            id: 'sup-001',
            name: 'Super admin',
            email: 'superadmin096@gmail.com',
            role: 'super_admin',
            phone: '+880 1912-778899',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
            membershipPlan: 'special',
            createdAt: '2023-01-01',
            status: 'active',
          };
        showToast('Welcome Super Admin', 'Access granted to platform executive controls.', 'success');
      } else if (normalizedEmail === 'admin096@gmail.com' || normalizedEmail.includes('admin')) {
        matchedAccount =
          DEMO_USERS.find((u) => u.email === 'admin096@gmail.com') || {
            id: 'adm-001',
            name: 'Admin',
            email: 'admin096@gmail.com',
            role: 'admin',
            phone: '+880 1819-334455',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
            membershipPlan: 'special',
            createdAt: '2024-03-10',
            status: 'active',
          };
        showToast('Welcome Admin', 'Access granted to assigned matrimonial candidate desk.', 'success');
      } else if (normalizedEmail === 'user096@gmail.com') {
        matchedAccount =
          DEMO_USERS.find((u) => u.email === 'user096@gmail.com') || {
            id: 'usr-001',
            name: 'user',
            email: 'user096@gmail.com',
            role: 'user',
            phone: '+880 1711-234567',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
            membershipPlan: 'standard',
            createdAt: '2025-10-15',
            status: 'active',
          };
        showToast('Welcome Back', 'Logged in as user (user096@gmail.com).', 'success');
      } else {
        matchedAccount = {
          id: 'usr-' + Math.random().toString(36).substring(2, 6),
          name: email.split('@')[0],
          email: normalizedEmail,
          role: 'user',
          phone: '+880 1700-000000',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
          membershipPlan: 'basic',
          createdAt: new Date().toISOString().split('T')[0],
          status: 'active',
        };
        showToast('Welcome Back', `Logged in as ${matchedAccount.name}`, 'success');
      }

      dispatchLogin(matchedAccount);
      onClose();
    }, 450);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser: UserAccount = {
        id: 'usr-google',
        name: 'easy.to.use.bd',
        email: 'easy.to.use.bd@gmail.com',
        role: 'user',
        phone: '+880 1711-000000',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
        membershipPlan: 'standard',
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      dispatchLogin(googleUser);
      showToast('Google Sign-In Successful', 'Connected with easy.to.use.bd@gmail.com', 'success');
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Official Brand Logo */}
        <div className="pt-8 pb-4 px-6 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="flex justify-center mb-3">
            <BrandLogo size="md" variant="horizontal" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Welcome to Shadikabbo
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Log in to manage your matrimonial biodata and proposals
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Quick Demo Credentials (Development Only) */}
          <div className="mb-5 bg-slate-50/90 p-3 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#16205B]" />
                <span className="text-[11px] font-bold text-slate-800">
                  Development Demo Accounts
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                1-Click Sign In
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* User Account */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#16205B] text-slate-700 transition-all shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      User
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">user096</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 truncate">user</p>
                  <p className="text-[10px] text-slate-500 truncate font-mono">user096@gmail.com</p>
                </div>
                <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('user096@gmail.com', 'user096')}
                    className="flex-1 py-1 text-[10px] font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-center"
                    title="Fill email and password"
                  >
                    Fill
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInstantDemoLogin('user096@gmail.com')}
                    className="flex-1 py-1 text-[10px] font-bold rounded bg-blue-600 hover:bg-blue-700 text-white text-center"
                    title="Instant login"
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Admin Account */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-600 text-slate-700 transition-all shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">admin096</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 truncate">Admin</p>
                  <p className="text-[10px] text-slate-500 truncate font-mono">admin096@gmail.com</p>
                </div>
                <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin096@gmail.com', 'admin096')}
                    className="flex-1 py-1 text-[10px] font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-center"
                    title="Fill email and password"
                  >
                    Fill
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInstantDemoLogin('admin096@gmail.com')}
                    className="flex-1 py-1 text-[10px] font-bold rounded bg-indigo-600 hover:bg-indigo-700 text-white text-center"
                    title="Instant login"
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Super Admin Account */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#D91B2B] text-slate-700 transition-all shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D91B2B] bg-rose-50 px-1.5 py-0.5 rounded">
                      Super Admin
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono truncate">superadmin</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 truncate">Super admin</p>
                  <p className="text-[10px] text-slate-500 truncate font-mono">superadmin096@gmail.com</p>
                </div>
                <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('superadmin096@gmail.com', 'superadmin096')}
                    className="flex-1 py-1 text-[10px] font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-center"
                    title="Fill email and password"
                  >
                    Fill
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInstantDemoLogin('superadmin096@gmail.com')}
                    className="flex-1 py-1 text-[10px] font-bold rounded bg-[#D91B2B] hover:bg-[#b91422] text-white text-center"
                    title="Instant login"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.14 0 9.97 0 12s.45 3.86 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 text-[11px] font-medium">
                Or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user096@gmail.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] text-[#D91B2B] hover:text-[#b91422] font-semibold transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] text-slate-900 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Log In to Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-5 text-center text-xs text-slate-600">
            Don't have a matrimonial biodata yet?{' '}
            <button
              type="button"
              onClick={handleTriggerRegister}
              className="font-bold text-[#D91B2B] hover:underline inline-flex items-center gap-0.5"
            >
              Register Free
              <Sparkles className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Forgot password sub-dialog */}
        {forgotModalOpen && (
          <div className="absolute inset-0 bg-white/95 p-6 flex flex-col justify-center animate-in fade-in">
            <h4 className="text-base font-bold text-slate-900 mb-2">Reset Your Password</h4>
            <p className="text-xs text-slate-600 mb-4">
              Enter your registered email address and we will send you a secure verification link to reset your password.
            </p>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 mb-3"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(false);
                  showToast('Reset Link Sent', `Password instructions sent to ${forgotEmail || 'your email'}.`, 'success');
                }}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-[#16205B] text-white"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
