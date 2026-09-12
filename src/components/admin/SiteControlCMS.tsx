import React, { useState } from 'react';
import { SiteSettings, MembershipPlan, MatrimonialProfile, HeroMobileMockup, CountryCardSetting } from '../../types';
import {
  Megaphone,
  PhoneCall,
  CreditCard,
  Crown,
  LayoutTemplate,
  Save,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Info,
  HelpCircle,
  Eye,
  Sliders,
  DollarSign,
  Building,
  Mail,
  MessageCircle,
  Smartphone,
  Users,
  Globe,
  Upload,
  Image as ImageIcon,
  Check,
  Plus,
  Trash2,
  Clock,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface SiteControlCMSProps {
  settings: SiteSettings;
  plans: MembershipPlan[];
  allProfiles?: MatrimonialProfile[];
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onUpdatePlans: (newPlans: MembershipPlan[]) => void;
  onUpdateProfile?: (updated: MatrimonialProfile) => void;
}

export const SiteControlCMS: React.FC<SiteControlCMSProps> = ({
  settings,
  plans,
  allProfiles = [],
  onUpdateSettings,
  onUpdatePlans,
  onUpdateProfile,
}) => {
  const { showToast } = useToast();

  // Active Sub-Tab: hero_frames | featured_profiles | packages | country_cards | callback_desk | notice_payments
  const [activeSubTab, setActiveSubTab] = useState<
    'hero_frames' | 'featured_profiles' | 'packages' | 'country_cards' | 'callback_desk' | 'notice_payments'
  >('hero_frames');

  // Local state for immediate responsiveness and form editing
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [plansData, setPlansData] = useState<MembershipPlan[]>([...plans]);
  const [profilesData, setProfilesData] = useState<MatrimonialProfile[]>([...allProfiles]);
  const [isSaved, setIsSaved] = useState(false);

  // Sync with prop changes if settings update from outside
  React.useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  React.useEffect(() => {
    setPlansData([...plans]);
  }, [plans]);

  React.useEffect(() => {
    setProfilesData([...allProfiles]);
  }, [allProfiles]);

  // Image upload helper
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onUrlReady: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        showToast('Image Too Large', 'Please select an image under 4MB for fast loading.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onUrlReady(uploadEvent.target.result as string);
          showToast('Image Uploaded', 'New image loaded successfully. Click Save to apply.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle plan field edit
  const handlePlanChange = (index: number, field: keyof MembershipPlan, value: any) => {
    setPlansData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setIsSaved(false);
  };

  // Handle Plan Features edit
  const handlePlanFeatureChange = (planIdx: number, featureIdx: number, val: string) => {
    setPlansData((prev) => {
      const updated = [...prev];
      const plan = { ...updated[planIdx] };
      const feats = [...plan.features];
      feats[featureIdx] = val;
      plan.features = feats;
      updated[planIdx] = plan;
      return updated;
    });
    setIsSaved(false);
  };

  const handleAddPlanFeature = (planIdx: number) => {
    setPlansData((prev) => {
      const updated = [...prev];
      const plan = { ...updated[planIdx] };
      plan.features = [...plan.features, 'New Premium Privilege'];
      updated[planIdx] = plan;
      return updated;
    });
    setIsSaved(false);
  };

  const handleRemovePlanFeature = (planIdx: number, featureIdx: number) => {
    setPlansData((prev) => {
      const updated = [...prev];
      const plan = { ...updated[planIdx] };
      plan.features = plan.features.filter((_, i) => i !== featureIdx);
      updated[planIdx] = plan;
      return updated;
    });
    setIsSaved(false);
  };

  // Handle Featured Profile Edit
  const handleFeaturedProfileChange = (
    profileId: string,
    field: keyof MatrimonialProfile,
    value: any
  ) => {
    setProfilesData((prev) => {
      const updated = prev.map((p) => {
        if (p.profileId === profileId || p.id === profileId) {
          const mod = { ...p, [field]: value };
          if (onUpdateProfile) onUpdateProfile(mod);
          return mod;
        }
        return p;
      });
      return updated;
    });
    setIsSaved(false);
  };

  // Handle Country Card edit
  const handleCountryCardChange = (
    cardIdx: number,
    field: keyof CountryCardSetting,
    value: any
  ) => {
    const currentCards = formData.countryCards ? [...formData.countryCards] : [];
    if (currentCards[cardIdx]) {
      currentCards[cardIdx] = { ...currentCards[cardIdx], [field]: value };
      setFormData({ ...formData, countryCards: currentCards });
      setIsSaved(false);
    }
  };

  // Handle save
  const handleSaveAll = () => {
    onUpdateSettings(formData);
    onUpdatePlans(plansData);
    setIsSaved(true);
    showToast(
      'Site Management Saved',
      'All changes to the Homepage (Hero, 3 Mobile Frames, Featured Profiles, Membership Packages, Country Cards & Helpline) are now live!',
      'success'
    );
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Handle reset to default
  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all site settings and membership packages to system defaults?'
      )
    ) {
      localStorage.removeItem('shadikabbo_site_settings');
      localStorage.removeItem('shadikabbo_membership_plans');
      window.location.reload();
    }
  };

  // 3 Featured Profiles currently selected
  const featuredProfilesList = React.useMemo(() => {
    const ids = formData.featuredProfileIds || ['prof-001', 'prof-002', 'prof-003'];
    return ids
      .map((id) => profilesData.find((p) => p.profileId === id || p.id === id))
      .filter(Boolean) as MatrimonialProfile[];
  }, [profilesData, formData.featuredProfileIds]);

  return (
    <div className="space-y-4 animate-in fade-in">
      {/* Top Header Card with Quick Save */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-50 text-[#D91B2B] rounded-lg">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Site Management (Super Admin CMS)
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  Live Control
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Manage all content, texts, mobile frames, featured profiles, packages, and hotline sections across the website.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to factory settings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSaveAll}
            className={`px-5 py-2 rounded-lg text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#D91B2B] hover:bg-[#b91422]'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved & Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main CMS Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Navigation Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto">
          {[
            {
              id: 'hero_frames',
              label: 'Hero & 3 Mobile Frames',
              icon: <Smartphone className="w-4 h-4" />,
            },
            {
              id: 'featured_profiles',
              label: 'Featured Profiles (3 Demo)',
              icon: <Users className="w-4 h-4" />,
            },
            {
              id: 'packages',
              label: 'Membership Packages (3)',
              icon: <Crown className="w-4 h-4" />,
            },
            {
              id: 'country_cards',
              label: 'Country & Expat (4 Cards)',
              icon: <Globe className="w-4 h-4" />,
            },
            {
              id: 'callback_desk',
              label: 'Call Back & Helplines',
              icon: <PhoneCall className="w-4 h-4" />,
            },
            {
              id: 'notice_payments',
              label: 'Notice & Payment Accounts',
              icon: <Megaphone className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                activeSubTab === tab.id
                  ? 'border-[#D91B2B] text-[#D91B2B] bg-white font-extrabold shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* SUB-TAB 1: HERO HEADLINE & 3 MOBILE FRAMES               */}
        {/* ========================================================= */}
        {activeSubTab === 'hero_frames' && (
          <div className="p-6 space-y-6 animate-in fade-in">
            {/* Section Info */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#D91B2B] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Homepage Top Banner:</strong> Edit the main headline text (“Where Dignified Hearts & Families Unite For A Lifetime”), trust statistics, and the 3 phone frames on the right (images, names, ages, and profession/location captions).
              </p>
            </div>

            {/* Headline and High-contrast highlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Main Headline (হোম ব্যানার প্রধান শিরোনাম)
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, heroHeadline: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Where Dignified Hearts & Families"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Colored Highlight Text (রঙিন হাইলাইট টেক্সট)
                </label>
                <input
                  type="text"
                  value={formData.heroHighlight || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, heroHighlight: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Unite For A Lifetime"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none font-semibold text-[#D91B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Candidates Count Metric (প্রার্থী পরিসংখ্যান)
                </label>
                <input
                  type="text"
                  value={formData.statProfilesCount || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, statProfilesCount: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="25,000+ Verified Candidates"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Weddings Count Metric (সফল বিবাহ পরিসংখ্যান)
                </label>
                <input
                  type="text"
                  value={formData.statWeddingsCount || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, statWeddingsCount: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="4,850+ Weddings"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>
            </div>

            {/* 3 Mobile Frames Editor */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#D91B2B]" />
                    <span>3 Mobile Frames on Right Side (ডান পাশের ৩টি মোবাইল ফ্রেম)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure the image, candidate name, age, and profession text for Left, Center, and Right frames.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* 1. Left Frame */}
                <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                      1. Left Frame (বাম ফ্রেম)
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">9:16 Portrait</span>
                  </div>

                  {/* Visual Preview */}
                  <div className="relative aspect-[9/16] w-full max-w-[170px] mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-white/90 bg-slate-200">
                    <img
                      src={formData.heroLeftPhone?.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'}
                      alt="Left Phone Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                      <p className="text-xs font-bold leading-tight">{formData.heroLeftPhone?.nameAge || 'Tariqur Rahman, 29'}</p>
                      <p className="text-[10px] text-slate-300 truncate mt-0.5">{formData.heroLeftPhone?.professionCity || 'Sr. Architect • London, UK'}</p>
                    </div>
                  </div>

                  {/* Image URL & Upload button */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Image URL / Upload Image
                    </label>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={formData.heroLeftPhone?.imageUrl || ''}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            heroLeftPhone: {
                              ...formData.heroLeftPhone!,
                              imageUrl: e.target.value,
                            },
                          });
                          setIsSaved(false);
                        }}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer shadow-2xs">
                        <Upload className="w-3 h-3 text-[#D91B2B]" />
                        <span>Upload Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileUpload(e, (url) => {
                              setFormData({
                                ...formData,
                                heroLeftPhone: {
                                  ...formData.heroLeftPhone!,
                                  imageUrl: url,
                                },
                              });
                              setIsSaved(false);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  {/* Name & Age */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Name & Age Text (নাম ও বয়স)
                    </label>
                    <input
                      type="text"
                      value={formData.heroLeftPhone?.nameAge || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          heroLeftPhone: {
                            ...formData.heroLeftPhone!,
                            nameAge: e.target.value,
                          },
                        });
                        setIsSaved(false);
                      }}
                      placeholder="Tariqur Rahman, 29"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>

                  {/* Profession & City */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Profession & City Text (পেশা ও স্থান)
                    </label>
                    <input
                      type="text"
                      value={formData.heroLeftPhone?.professionCity || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          heroLeftPhone: {
                            ...formData.heroLeftPhone!,
                            professionCity: e.target.value,
                          },
                        });
                        setIsSaved(false);
                      }}
                      placeholder="Sr. Architect • London, UK"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>
                </div>

                {/* 2. Center Frame (Prominent) */}
                <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-200 space-y-3.5 ring-1 ring-rose-300/40">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D91B2B] text-white text-[10px] font-bold uppercase tracking-wide">
                      2. Center Frame (মাঝের মূল ফ্রেম)
                    </span>
                    <span className="text-[10px] text-rose-600 font-bold">Featured Main</span>
                  </div>

                  {/* Visual Preview */}
                  <div className="relative aspect-[9/16] w-full max-w-[170px] mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-rose-300 bg-slate-200">
                    <img
                      src={formData.heroCenterPhone?.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
                      alt="Center Phone Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                      <p className="text-xs font-bold leading-tight">{formData.heroCenterPhone?.nameAge || 'Dr. Anika Tabassum, 26'}</p>
                      <p className="text-[10px] text-slate-300 truncate mt-0.5">{formData.heroCenterPhone?.professionCity || 'Doctor (MBBS) • Dhaka, Bangladesh'}</p>
                    </div>
                  </div>

                  {/* Image URL & Upload button */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Image URL / Upload Image
                    </label>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={formData.heroCenterPhone?.imageUrl || ''}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            heroCenterPhone: {
                              ...formData.heroCenterPhone!,
                              imageUrl: e.target.value,
                            },
                          });
                          setIsSaved(false);
                        }}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer shadow-2xs">
                        <Upload className="w-3 h-3 text-[#D91B2B]" />
                        <span>Upload Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileUpload(e, (url) => {
                              setFormData({
                                ...formData,
                                heroCenterPhone: {
                                  ...formData.heroCenterPhone!,
                                  imageUrl: url,
                                },
                              });
                              setIsSaved(false);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  {/* Name & Age */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Name & Age Text (নাম ও বয়স)
                    </label>
                    <input
                      type="text"
                      value={formData.heroCenterPhone?.nameAge || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          heroCenterPhone: {
                            ...formData.heroCenterPhone!,
                            nameAge: e.target.value,
                          },
                        });
                        setIsSaved(false);
                      }}
                      placeholder="Dr. Anika Tabassum, 26"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>

                  {/* Profession & City */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Profession & City Text (পেশা ও স্থান)
                    </label>
                    <input
                      type="text"
                      value={formData.heroCenterPhone?.professionCity || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          heroCenterPhone: {
                            ...formData.heroCenterPhone!,
                            professionCity: e.target.value,
                          },
                        });
                        setIsSaved(false);
                      }}
                      placeholder="Doctor (MBBS) • Dhaka, Bangladesh"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>
                </div>

                {/* 3. Right Frame */}
                <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                      3. Right Frame (ডান ফ্রেম)
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">9:16 Portrait</span>
                  </div>

                  {/* Visual Preview */}
                  <div className="relative aspect-[9/16] w-full max-w-[170px] mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-white/90 bg-slate-200">
                    <img
                      src={formData.heroRightPhone?.imageUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80'}
                      alt="Right Phone Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                      <p className="text-xs font-bold leading-tight">{formData.heroRightPhone?.nameAge || 'Nusrat Jahan, 24'}</p>
                      <p className="text-[10px] text-slate-300 truncate mt-0.5">{formData.heroRightPhone?.professionCity || 'Lecturer in English • Chittagong'}</p>
                    </div>
                  </div>

                  {/* Image URL & Upload button */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Image URL / Upload Image
                    </label>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={formData.heroRightPhone?.imageUrl || ''}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            heroRightPhone: {
                              ...formData.heroRightPhone!,
                              imageUrl: e.target.value,
                            },
                          });
                          setIsSaved(false);
                        }}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer shadow-2xs">
                        <Upload className="w-3 h-3 text-[#D91B2B]" />
                        <span>Upload Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileUpload(e, (url) => {
                              setFormData({
                                ...formData,
                                heroRightPhone: {
                                  ...formData.heroRightPhone!,
                                  imageUrl: url,
                                },
                              });
                              setIsSaved(false);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  {/* Name & Age */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Name & Age Text (নাম ও বয়স)
                    </label>
                    <input
                      type="text"
                      value={formData.heroRightPhone?.nameAge || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          heroRightPhone: {
                            ...formData.heroRightPhone!,
                            nameAge: e.target.value,
                          },
                        });
                        setIsSaved(false);
                      }}
                      placeholder="Nusrat Jahan, 24"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>

                  {/* Profession & City */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Profession & City Text (পেশা ও স্থান)
                    </label>
                    <input
                      type="text"
                      value={formData.heroRightPhone?.professionCity || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          heroRightPhone: {
                            ...formData.heroRightPhone!,
                            professionCity: e.target.value,
                          },
                        });
                        setIsSaved(false);
                      }}
                      placeholder="Lecturer in English • Chittagong"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUB-TAB 2: FEATURED PROFILES (3 DEMO PROFILES)            */}
        {/* ========================================================= */}
        {activeSubTab === 'featured_profiles' && (
          <div className="p-6 space-y-6 animate-in fade-in">
            {/* Explanatory Banner */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#D91B2B] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Homepage Featured Profiles Section:</strong> Edit the section title, subtitle, and directly customize the 3 demo biodatas displayed on the homepage (upload/change profile picture, name, age, profession, education, location, and info).
              </p>
            </div>

            {/* Section Title & Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Section Title (ফিচার্ড প্রোফাইল সেকশন শিরোনাম)
                </label>
                <input
                  type="text"
                  value={formData.featuredSectionTitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, featuredSectionTitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Featured Profiles"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Section Subtitle (সেকশন সাবটাইটেল)
                </label>
                <input
                  type="text"
                  value={formData.featuredSectionSubtitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, featuredSectionSubtitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Handpicked and verified biodatas ready for meaningful matrimonial connections."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>
            </div>

            {/* 3 Featured Profile Cards Editor */}
            <div className="pt-3 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D91B2B]" />
                <span>3 Featured Profiles Displayed on Homepage (হোমপেজে প্রদর্শিত ৩টি প্রোফাইল)</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {featuredProfilesList.map((prof, idx) => (
                  <div
                    key={prof.profileId || idx}
                    className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#16205B] text-white text-[10px] font-bold">
                        Slot {idx + 1}: {prof.profileId}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {prof.gender} • {prof.age} Yrs
                      </span>
                    </div>

                    {/* Visual Card Preview */}
                    <div className="relative aspect-[3/4] w-full max-w-[190px] mx-auto rounded-xl overflow-hidden shadow-md bg-slate-200 border-2 border-white">
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                        <p className="text-xs font-bold leading-tight truncate">{prof.name}</p>
                        <p className="text-[10px] text-slate-300 truncate">{prof.profession}</p>
                        <p className="text-[9px] text-rose-300 truncate">{prof.presentCity}, {prof.presentCountry}</p>
                      </div>
                    </div>

                    {/* Change / Upload Profile Picture */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Profile Picture (ছবি লিংক / ফাইল আপলোড)
                      </label>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={prof.avatar}
                          onChange={(e) =>
                            handleFeaturedProfileChange(prof.profileId, 'avatar', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                          placeholder="Image URL"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer shadow-2xs">
                          <Upload className="w-3 h-3 text-[#D91B2B]" />
                          <span>Upload New Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (url) => {
                                handleFeaturedProfileChange(prof.profileId, 'avatar', url);
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {/* Candidate Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Candidate Name (প্রার্থীর নাম)
                      </label>
                      <input
                        type="text"
                        value={prof.name}
                        onChange={(e) =>
                          handleFeaturedProfileChange(prof.profileId, 'name', e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Age (বয়স)
                        </label>
                        <input
                          type="number"
                          value={prof.age}
                          onChange={(e) =>
                            handleFeaturedProfileChange(prof.profileId, 'age', parseInt(e.target.value) || 25)
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Gender (লিঙ্গ)
                        </label>
                        <select
                          value={prof.gender}
                          onChange={(e) =>
                            handleFeaturedProfileChange(prof.profileId, 'gender', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    {/* Profession */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Profession (পেশা)
                      </label>
                      <input
                        type="text"
                        value={prof.profession}
                        onChange={(e) =>
                          handleFeaturedProfileChange(prof.profileId, 'profession', e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* Education */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Education (শিক্ষাগত যোগ্যতা)
                      </label>
                      <input
                        type="text"
                        value={prof.education}
                        onChange={(e) =>
                          handleFeaturedProfileChange(prof.profileId, 'education', e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          City (শহর)
                        </label>
                        <input
                          type="text"
                          value={prof.presentCity}
                          onChange={(e) =>
                            handleFeaturedProfileChange(prof.profileId, 'presentCity', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Country (দেশ)
                        </label>
                        <input
                          type="text"
                          value={prof.presentCountry}
                          onChange={(e) =>
                            handleFeaturedProfileChange(prof.profileId, 'presentCountry', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                        />
                      </div>
                    </div>

                    {/* Bio Tagline */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Bio / Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={prof.bio}
                        onChange={(e) =>
                          handleFeaturedProfileChange(prof.profileId, 'bio', e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUB-TAB 3: MEMBERSHIP PACKAGES & PRICING                 */}
        {/* ========================================================= */}
        {activeSubTab === 'packages' && (
          <div className="p-6 space-y-6 animate-in fade-in">
            {/* Info Banner */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
              <Crown className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Homepage Membership Packages:</strong> Configure the 3 premium packages (Basic, Standard, VIP Executive). You can adjust amounts (৳ BDT), duration, proposal limits, contact unlocks, popular badges, and privilege bullet points.
              </p>
            </div>

            {/* Section Header Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Membership Section Title (মেম্বারশিপ সেকশন শিরোনাম)
                </label>
                <input
                  type="text"
                  value={formData.membershipSectionTitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, membershipSectionTitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Shadikabbo Membership"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Membership Subtitle (মেম্বারশিপ সাবটাইটেল)
                </label>
                <input
                  type="text"
                  value={formData.membershipSectionSubtitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, membershipSectionSubtitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Choose the dignified package tailored to your family's matrimonial search"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>
            </div>

            {/* 3 Packages Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-3 border-t border-slate-200">
              {plansData.filter((p) => p.id !== 'free').map((plan, idx) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-4 border space-y-3.5 ${
                    plan.isPopular
                      ? 'bg-blue-50/40 border-[#16205B]/40 ring-2 ring-[#16205B]/20'
                      : plan.id === 'special'
                      ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                      Package {idx + 1}: {plan.name}
                    </span>
                    {plan.isPopular && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-extrabold uppercase">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Plan Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Package Name (প্যাকেজের নাম)
                    </label>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => handlePlanChange(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>

                  {/* Price (BDT) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Price in BDT (৳ প্যাকেজ ফি)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1.5 text-xs font-bold text-slate-400">৳</span>
                      <input
                        type="number"
                        value={plan.priceBDT}
                        onChange={(e) =>
                          handlePlanChange(idx, 'priceBDT', parseInt(e.target.value) || 0)
                        }
                        className="w-full pl-6 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-extrabold text-[#D91B2B] focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Duration (মেয়াদ)
                    </label>
                    <input
                      type="text"
                      value={plan.duration}
                      onChange={(e) => handlePlanChange(idx, 'duration', e.target.value)}
                      placeholder="e.g. 6 Months"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>

                  {/* Proposals Allowed */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Proposals Allowed (প্রস্তাব পাঠানোর সীমা)
                    </label>
                    <input
                      type="text"
                      value={plan.proposalsAllowed}
                      onChange={(e) => handlePlanChange(idx, 'proposalsAllowed', e.target.value)}
                      placeholder="e.g. 60 Proposals"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>

                  {/* Contact Views Limit */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Contact Views Limit (যোগাযোগ আনলক সীমা)
                    </label>
                    <input
                      type="text"
                      value={plan.contactViews}
                      onChange={(e) => handlePlanChange(idx, 'contactViews', e.target.value)}
                      placeholder="e.g. 35 Contacts"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                    />
                  </div>

                  {/* Badge & Popular Toggle */}
                  <div className="pt-2 border-t border-slate-200/80 space-y-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Badge Label (ব্যাজ টেক্সট)
                      </label>
                      <input
                        type="text"
                        value={plan.badge || ''}
                        onChange={(e) => handlePlanChange(idx, 'badge', e.target.value)}
                        placeholder="e.g. Most Popular"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-semibold text-slate-700">
                        Highlight as Most Popular
                      </span>
                      <input
                        type="checkbox"
                        checked={!!plan.isPopular}
                        onChange={(e) => handlePlanChange(idx, 'isPopular', e.target.checked)}
                        className="w-4 h-4 text-[#D91B2B] rounded border-slate-300 focus:ring-[#D91B2B]"
                      />
                    </div>
                  </div>

                  {/* Feature Bullet Points */}
                  <div className="pt-2 border-t border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700">
                        Privileges / Features ({plan.features.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddPlanFeature(idx)}
                        className="text-[10px] text-[#D91B2B] hover:underline font-bold flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Item</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => handlePlanFeatureChange(idx, fIdx, e.target.value)}
                            className="flex-1 px-2 py-1 text-[11px] rounded border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePlanFeature(idx, fIdx)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                            title="Remove feature"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUB-TAB 4: FIND MATCHES BY COUNTRY & EXPAT COMMUNITY      */}
        {/* ========================================================= */}
        {activeSubTab === 'country_cards' && (
          <div className="p-6 space-y-6 animate-in fade-in">
            {/* Info Banner */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 flex items-start gap-3">
              <Globe className="w-4 h-4 text-[#D91B2B] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Homepage Country & Expat Cards:</strong> Edit the section title, subtitle, and the 4 city cards (Bangladesh, USA, UK, Canada). Customize the 9:16 city images, city names, community highlights, and candidate numbers.
              </p>
            </div>

            {/* Section Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Section Title (দেশ ও প্রবাসী সেকশন শিরোনাম)
                </label>
                <input
                  type="text"
                  value={formData.countrySectionTitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, countrySectionTitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Find Matches by Country & Expat Community"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Section Subtitle (সেকশন সাবটাইটেল)
                </label>
                <input
                  type="text"
                  value={formData.countrySectionSubtitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, countrySectionSubtitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Connect with eligible Bengali candidates residing locally across Bangladesh or settled in key global diaspora hubs worldwide."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>
            </div>

            {/* 4 Country Cards Editor */}
            <div className="pt-3 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D91B2B]" />
                <span>4 Country Cards (৪টি দেশের কার্ড)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(formData.countryCards || []).map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="bg-slate-50/70 rounded-2xl p-3.5 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{card.flag}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Card #{idx + 1}
                      </span>
                    </div>

                    {/* Preview */}
                    <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden shadow-md bg-slate-200 border border-slate-300">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute top-2 inset-x-2 flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded-full bg-black/60 text-[9px] text-white font-bold">
                          {card.cityName}
                        </span>
                        <span className="text-sm">{card.flag}</span>
                      </div>
                      <div className="absolute bottom-2 inset-x-2 text-white">
                        <p className="text-[9px] text-amber-300 uppercase font-bold">{card.name}</p>
                        <p className="text-[10px] font-bold leading-tight truncate">{card.highlight}</p>
                      </div>
                    </div>

                    {/* Country Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Country Name
                      </label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => handleCountryCardChange(idx, 'name', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* Flag Emoji */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Flag (ইমোজি)
                      </label>
                      <input
                        type="text"
                        value={card.flag}
                        onChange={(e) => handleCountryCardChange(idx, 'flag', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* City Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        City Name (শহর)
                      </label>
                      <input
                        type="text"
                        value={card.cityName}
                        onChange={(e) => handleCountryCardChange(idx, 'cityName', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* Highlight */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Highlight Tag (কমিউনিটি হাইলাইট)
                      </label>
                      <input
                        type="text"
                        value={card.highlight}
                        onChange={(e) => handleCountryCardChange(idx, 'highlight', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* Candidate Count */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Active Candidate Count
                      </label>
                      <input
                        type="text"
                        value={card.candidateCount}
                        onChange={(e) => handleCountryCardChange(idx, 'candidateCount', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                      />
                    </div>

                    {/* Image URL & Upload */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        9:16 Image URL / Upload
                      </label>
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={card.image}
                          onChange={(e) => handleCountryCardChange(idx, 'image', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#D91B2B]"
                        />
                        <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-[10px] font-semibold text-slate-700 cursor-pointer shadow-2xs">
                          <Upload className="w-3 h-3 text-[#D91B2B]" />
                          <span>Upload City Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (url) => {
                                handleCountryCardChange(idx, 'image', url);
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUB-TAB 5: CALL BACK SECTION & HELPLINE DESK              */}
        {/* ========================================================= */}
        {activeSubTab === 'callback_desk' && (
          <div className="p-6 space-y-6 animate-in fade-in">
            {/* Info Banner */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 flex items-start gap-3">
              <PhoneCall className="w-4 h-4 text-[#D91B2B] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Homepage Call Back & VIP Consultation:</strong> Manage the VIP executive consultation prompt under the membership tiers, designated lead counselor, hotline numbers, service hours, and office contacts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Callback Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Call Back Section Title (কল ব্যাক প্রধান শিরোনাম)
                </label>
                <input
                  type="text"
                  value={formData.callbackTitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, callbackTitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Need Confidential VIP Executive Consultation?"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none font-bold"
                />
              </div>

              {/* Callback Subtitle */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Call Back Subtitle / Description (কল ব্যাক বর্ণনা)
                </label>
                <textarea
                  rows={2}
                  value={formData.callbackSubtitle || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, callbackSubtitle: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="For distinguished business families, physicians, bureaucrats, and overseas expatriates requiring private matrimonial representation."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none resize-none"
                />
              </div>

              {/* Designated Lead Counselor */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Lead Counselor Name (দায়িত্বপ্রাপ্ত প্রধান কাউন্সেলর)
                </label>
                <input
                  type="text"
                  value={formData.callbackCounselor || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, callbackCounselor: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="Our lead counselor Kabir"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              {/* Callback Hotline */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Callback Direct Hotline (কল ব্যাক সরাসরি ফোন নম্বর)
                </label>
                <input
                  type="text"
                  value={formData.callbackPhone || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, callbackPhone: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="+880 1711-009988"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none font-bold text-[#D91B2B]"
                />
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Callback Button Text (বাটনের নাম)
                </label>
                <input
                  type="text"
                  value={formData.callbackButtonText || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, callbackButtonText: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="VIP Callback"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              {/* Service Hours */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Authority Desk Operating Hours (হেল্পলাইন সময়সূচী)
                </label>
                <input
                  type="text"
                  value={formData.authorityDeskHours || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, authorityDeskHours: e.target.value });
                    setIsSaved(false);
                  }}
                  placeholder="সকাল ১০:০০ - রাত ১০:০০"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              {/* Official Helpline 1 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Official Helpline 1 (মূল হেল্পলাইন নম্বর)
                </label>
                <input
                  type="text"
                  value={formData.helplinePhone1 || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, helplinePhone1: e.target.value });
                    setIsSaved(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              {/* Official Helpline 2 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Official Helpline 2 (বিকল্প হেল্পলাইন)
                </label>
                <input
                  type="text"
                  value={formData.helplinePhone2 || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, helplinePhone2: e.target.value });
                    setIsSaved(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              {/* WhatsApp Support */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Official WhatsApp Number (হোয়াটসঅ্যাপ নম্বর)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, whatsappNumber: e.target.value });
                    setIsSaved(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              {/* Support Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Official Support Email (ইমেইল ঠিকানা)
                </label>
                <input
                  type="text"
                  value={formData.supportEmail || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, supportEmail: e.target.value });
                    setIsSaved(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>

              {/* Office Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Head Office Address (হেড অফিস ঠিকানা)
                </label>
                <input
                  type="text"
                  value={formData.officeAddress || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, officeAddress: e.target.value });
                    setIsSaved(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUB-TAB 6: NOTICE TICKER & PAYMENT ACCOUNTS               */}
        {/* ========================================================= */}
        {activeSubTab === 'notice_payments' && (
          <div className="p-6 space-y-6 animate-in fade-in">
            {/* Notice Bar Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-[#D91B2B]" />
                    <span>Top Urgent Notice Ticker (শীর্ষ জরুরি নোটিশ বার)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Controls the scrolling ticker displayed at the very top of all pages.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    {formData.noticeTickerEnabled ? 'Active (চালু)' : 'Hidden (বন্ধ)'}
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.noticeTickerEnabled}
                    onChange={(e) => {
                      setFormData({ ...formData, noticeTickerEnabled: e.target.checked });
                      setIsSaved(false);
                    }}
                    className="w-5 h-5 text-[#D91B2B] rounded border-slate-300 focus:ring-[#D91B2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Notice Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.noticeBadgeText || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, noticeBadgeText: e.target.value });
                      setIsSaved(false);
                    }}
                    placeholder="জরুরি নোটিশ"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none font-semibold text-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Live Notice Text
                  </label>
                  <input
                    type="text"
                    value={formData.noticeTickerText || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, noticeTickerText: e.target.value });
                      setIsSaved(false);
                    }}
                    placeholder="Notice text goes here..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Accounts Section */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#D91B2B]" />
                  <span>Official Mobile Banking & Merchant Accounts (পেমেন্ট একাউন্ট)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official numbers displayed on the membership upgrade and invoice checkout pages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* bKash */}
                <div className="p-3.5 rounded-xl border border-pink-200 bg-pink-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-700">bKash Merchant</span>
                    <span className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.5 rounded font-semibold">
                      Payment
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.bkashMerchantNumber || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, bkashMerchantNumber: e.target.value });
                      setIsSaved(false);
                    }}
                    placeholder="+880 1912-096966"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-pink-200 bg-white font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>

                {/* Nagad */}
                <div className="p-3.5 rounded-xl border border-orange-200 bg-orange-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-700">Nagad Merchant</span>
                    <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-semibold">
                      Payment
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.nagadMerchantNumber || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, nagadMerchantNumber: e.target.value });
                      setIsSaved(false);
                    }}
                    placeholder="+880 1711-009988"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-orange-200 bg-white font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Rocket */}
                <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700">Rocket / City Bank</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-semibold">
                      Official
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.rocketMerchantNumber || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, rocketMerchantNumber: e.target.value });
                      setIsSaved(false);
                    }}
                    placeholder="+880 1912-096966-4"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-purple-200 bg-white font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Payment Guidance Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Payment Instructions & Verification Guidance (পেমেন্ট নির্দেশনা)
                </label>
                <textarea
                  rows={3}
                  value={formData.paymentInstructionsNote || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, paymentInstructionsNote: e.target.value });
                    setIsSaved(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D91B2B] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Changes in this panel immediately update the website without redeployment.</span>
          </div>

          <button
            onClick={handleSaveAll}
            className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#D91B2B] hover:bg-[#b91422]'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved & Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Site Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
