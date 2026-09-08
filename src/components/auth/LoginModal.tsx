import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { UserRole, UserAccount } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { X, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="pt-7 pb-4 px-6 text-center">
          <div className="flex justify-center mb-3">
            <BrandLogo size="md" variant="horizontal" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Welcome Back
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to continue to your Shadikabbo account
          </p>
        </div>

        {/* Form Body */}
        <div className="px-6 pb-6 pt-1">
          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs hover:border-slate-300 transition-all"
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
              <span className="bg-white px-2.5 text-slate-400 text-[11px]">
                or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
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
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#D91B2B]/20 focus:border-[#D91B2B] text-slate-900 transition-all placeholder:text-slate-400"
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
                  className="w-full pl-10 pr-10 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#D91B2B]/20 focus:border-[#D91B2B] text-slate-900 transition-all placeholder:text-slate-400"
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
              className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-[#D91B2B] to-[#b91422] hover:from-[#c21524] hover:to-[#9f0e1b] text-white text-xs font-bold rounded-xl shadow-md shadow-rose-900/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-4 text-center text-xs text-slate-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleTriggerRegister}
              className="font-bold text-[#D91B2B] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
            >
              Register Free
              <Sparkles className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Forgot password sub-dialog */}
        {forgotModalOpen && (
          <div className="absolute inset-0 bg-white/98 p-6 flex flex-col justify-center animate-in fade-in z-20">
            <h4 className="text-base font-bold text-slate-900 mb-1.5">Reset Your Password</h4>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered email address to receive a secure password reset link.
            </p>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 mb-3 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#D91B2B]"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(false);
                  showToast('Reset Link Sent', `Password instructions sent to ${forgotEmail || 'your email'}.`, 'success');
                }}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#D91B2B] text-white hover:bg-[#b91422]"
              >
                Send Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
