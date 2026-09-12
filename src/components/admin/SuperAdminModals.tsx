import React, { useState } from 'react';
import { UserAccount, MatrimonialProfile, UserRole } from '../../types';
import {
  X,
  Check,
  Shield,
  Crown,
  UserCheck,
  Mail,
  Lock,
  Phone,
  User,
  Calendar,
  Image as ImageIcon,
  Save,
  AlertTriangle,
  Upload,
  Trash2,
} from 'lucide-react';
import { useToast } from '../common/Toast';

// -------------------------------------------------------------
// 1. CHANGE ASSIGN MODAL
// -------------------------------------------------------------
interface ChangeAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MatrimonialProfile | null;
  adminList: UserAccount[];
  onAssign: (profileId: string, adminId: string, adminName: string) => void;
}

export const ChangeAssignModal: React.FC<ChangeAssignModalProps> = ({
  isOpen,
  onClose,
  profile,
  adminList,
  onAssign,
}) => {
  const [selectedAdminId, setSelectedAdminId] = useState<string>(
    profile?.assignedAdminId || adminList[0]?.id || ''
  );

  if (!isOpen || !profile) return null;

  const handleSave = () => {
    const matchedAdmin = adminList.find((a) => a.id === selectedAdminId);
    const adminName = matchedAdmin ? matchedAdmin.name : 'Unassigned';
    onAssign(profile.profileId, selectedAdminId, adminName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#D91B2B] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Change Assigned Admin</h3>
              <p className="text-[11px] text-slate-500">Reassign candidate to a counselor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <h4 className="text-xs font-bold text-slate-900">{profile.name}</h4>
            <p className="text-[11px] text-slate-500 font-mono">ID: {profile.profileId}</p>
            <p className="text-[11px] text-slate-500">
              Current Assignee:{' '}
              <strong className="text-slate-700">{profile.assignedAdminName || 'Not Assigned'}</strong>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Select New Assigned Counselor / Admin:
          </label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {adminList.map((admin) => {
              const isSelected = selectedAdminId === admin.id;
              return (
                <div
                  key={admin.id}
                  onClick={() => setSelectedAdminId(admin.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#D91B2B] bg-rose-50/60 ring-1 ring-[#D91B2B]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{admin.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Counselor Admin'} • {admin.phone}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#D91B2B]" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D91B2B] to-[#b91422] text-white text-xs font-bold shadow hover:from-[#c21524] hover:to-[#9f0e1b] transition-all"
          >
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. FULL PROFILE VIEW & EDIT MODAL
// -------------------------------------------------------------
interface EditCandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MatrimonialProfile | null;
  adminList: UserAccount[];
  onSave: (updatedProfile: MatrimonialProfile) => void;
}

export const EditCandidateProfileModal: React.FC<EditCandidateProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  adminList,
  onSave,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<MatrimonialProfile | null>(profile);

  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    showToast('Profile Updated', `${formData.name} biodata updated successfully.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 my-8 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-display">{formData.name}</h3>
                <span className="text-[10px] font-mono font-bold bg-rose-50 text-[#D91B2B] px-2 py-0.5 rounded">
                  {formData.profileId}
                </span>
              </div>
              <p className="text-xs text-slate-500">Super Admin View & Edit Candidate Biodata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Section 1: Basic Identity */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              1. Candidate Identity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bangla Name</label>
                <input
                  type="text"
                  value={formData.candidateNameBangla || ''}
                  onChange={(e) => setFormData({ ...formData, candidateNameBangla: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Male">Male (পাত্র)</option>
                  <option value="Female">Female (পাত্রী)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Never Married">Never Married (অবিবাহিত)</option>
                  <option value="Divorced">Divorced (তালাকপ্রাপ্ত)</option>
                  <option value="Widowed">Widowed (বিধবা/বিপত্নীক)</option>
                  <option value="Separated">Separated (আলাদা)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Height</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Counselor Assignment */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              2. Contact & Staff Assignment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  value={formData.phone || '+880 1711-234567'}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Counselor</label>
                <select
                  value={formData.assignedAdminId || ''}
                  onChange={(e) => {
                    const chosen = adminList.find((a) => a.id === e.target.value);
                    setFormData({
                      ...formData,
                      assignedAdminId: e.target.value,
                      assignedAdminName: chosen ? chosen.name : 'Unassigned',
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="">-- Not Assigned --</option>
                  {adminList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.role === 'super_admin' ? 'Super Admin' : 'Admin'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Present City</label>
                <input
                  type="text"
                  value={formData.presentCity}
                  onChange={(e) => setFormData({ ...formData, presentCity: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Present Country</label>
                <input
                  type="text"
                  value={formData.presentCountry}
                  onChange={(e) => setFormData({ ...formData, presentCountry: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Professional Details & NID Verification */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              3. Career & Trust Verification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Education</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="isVerifiedToggle"
                  checked={formData.isVerified}
                  onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                  className="w-4 h-4 text-[#D91B2B] rounded border-slate-300 focus:ring-[#D91B2B]"
                />
                <label htmlFor="isVerifiedToggle" className="cursor-pointer">
                  <span className="font-bold text-slate-900 block">NID & Educational Credential Verified</span>
                  <span className="text-[11px] text-slate-500">
                    Displays authentic blue/green verified badge on public biodata card.
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D91B2B] to-[#b91422] text-white font-bold shadow hover:from-[#c21524] hover:to-[#9f0e1b] flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Biodata Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. CREATE ADMIN / SUPER ADMIN ACCOUNT MODAL
// -------------------------------------------------------------
interface CreateAdminAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newAccount: UserAccount) => void;
}

export const CreateAdminAccountModal: React.FC<CreateAdminAccountModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const { showToast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+880 17');
  const [avatar, setAvatar] = useState<string>('');
  const [role, setRole] = useState<'admin' | 'super_admin'>('admin');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Invalid File', 'Please upload a photo (JPG, PNG, or WebP).', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('File Too Large', 'Please select an image smaller than 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Invalid File', 'Please drop a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('File Too Large', 'Please select an image smaller than 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Missing Details', 'Please provide name, email, and password.', 'error');
      return;
    }

    const fallbackAvatar =
      role === 'super_admin'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face';

    const newAccount: UserAccount = {
      id: (role === 'super_admin' ? 'sup-' : 'adm-') + Math.random().toString(36).substring(2, 7),
      name,
      email,
      phone,
      avatar: avatar || fallbackAvatar,
      role,
      membershipPlan: 'special',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      password,
    };

    onCreate(newAccount);
    showToast(
      'Account Created',
      `New ${role === 'super_admin' ? 'Super Admin' : 'Admin'} account for ${name} created.`,
      'success'
    );
    onClose();
    setName('');
    setEmail('');
    setPassword('');
    setPhone('+880 17');
    setAvatar('');
    setRole('admin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#16205B] text-white flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Create Admin / Super Admin
              </h3>
              <p className="text-[11px] text-slate-500">Authorize official personnel</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Account Role *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-3 rounded-xl border text-center font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'border-[#16205B] bg-[#16205B] text-white'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin (Counselor)</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('super_admin')}
                className={`py-2 px-3 rounded-xl border text-center font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === 'super_admin'
                    ? 'border-[#D91B2B] bg-[#D91B2B] text-white'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Super Admin</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Admin Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Farhana Sultana"
              required
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farhana@shadikabbo.com"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password *</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SecurePass123"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1711-xxxxxx"
              required
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
            />
          </div>

          {/* Profile Picture Upload Section (No URL input, No demo presets) */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Profile Photo (Upload)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {avatar ? (
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt="Uploaded preview"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Photo uploaded</span>
                    <span className="text-[11px] text-emerald-600 font-medium">Ready for profile</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAvatar('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-200 hover:border-[#D91B2B]/60 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-rose-50/20 group"
              >
                <div className="w-9 h-9 mx-auto mb-1.5 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#D91B2B] group-hover:border-rose-200 transition-colors">
                  <Upload className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Click to browse photo or drag & drop
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  JPG, PNG, or WebP (max 5MB)
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white font-bold transition-all shadow"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. RESET PASSWORD & EMAIL MODAL
// -------------------------------------------------------------
interface ResetAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: UserAccount | null;
  onUpdate: (updatedAccount: UserAccount) => void;
}

export const ResetAccountModal: React.FC<ResetAccountModalProps> = ({
  isOpen,
  onClose,
  account,
  onUpdate,
}) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (account) {
      setEmail(account.email);
      setPassword(account.password || 'password123');
    }
  }, [account]);

  if (!isOpen || !account) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Error', 'Email and password cannot be empty.', 'error');
      return;
    }

    const updated: UserAccount = {
      ...account,
      email,
      password,
    };

    onUpdate(updated);
    showToast('Credentials Reset', `Updated email and password for ${account.name}.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Reset Password & Email</h3>
              <p className="text-[11px] text-slate-500">Update security access for {account.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
          <img
            src={account.avatar}
            alt={account.name}
            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <h4 className="text-xs font-bold text-slate-900">{account.name}</h4>
            <p className="text-[11px] text-slate-500 font-mono">ID: {account.id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              User will immediately be able to login with this new password.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow"
            >
              Update Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
