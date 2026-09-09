import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { MatrimonialProfile, UserAccount } from '../../types';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Upload,
  User,
  Briefcase,
  Users,
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Camera,
  X,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface CountryOption {
  id: string;
  code: string;
  dialCode: string;
  name: string;
}

const COUNTRY_OPTIONS: CountryOption[] = [
  { id: '+880', code: 'bd', dialCode: '+880', name: 'Bangladesh' },
  { id: '+1_US', code: 'us', dialCode: '+1', name: 'United States' },
  { id: '+1_CA', code: 'ca', dialCode: '+1', name: 'Canada' },
  { id: '+61', code: 'au', dialCode: '+61', name: 'Australia' },
  { id: '+44', code: 'gb', dialCode: '+44', name: 'United Kingdom' },
  { id: '+971', code: 'ae', dialCode: '+971', name: 'United Arab Emirates' },
  { id: '+966', code: 'sa', dialCode: '+966', name: 'Saudi Arabia' },
  { id: '+60', code: 'my', dialCode: '+60', name: 'Malaysia' },
  { id: '+65', code: 'sg', dialCode: '+65', name: 'Singapore' },
  { id: '+91', code: 'in', dialCode: '+91', name: 'India' },
  { id: '+39', code: 'it', dialCode: '+39', name: 'Italy' },
  { id: '+49', code: 'de', dialCode: '+49', name: 'Germany' },
  { id: '+33', code: 'fr', dialCode: '+33', name: 'France' },
  { id: '+974', code: 'qa', dialCode: '+974', name: 'Qatar' },
  { id: '+965', code: 'kw', dialCode: '+965', name: 'Kuwait' },
  { id: '+968', code: 'om', dialCode: '+968', name: 'Oman' },
];

interface RegistrationFlowProps {
  onCancel: () => void;
  onComplete: (newUser: UserAccount, newProfile: MatrimonialProfile) => void;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({
  onCancel,
  onComplete,
}) => {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form states matching user specs
  const [formData, setFormData] = useState({
    // Step 1: Basic
    candidateName: '',
    candidateNameBangla: '',
    createdFor: 'Self' as MatrimonialProfile['createdFor'],
    gender: 'Male' as 'Male' | 'Female',
    dateOfBirth: '1998-05-15',
    countryCode: '+880',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',

    // Step 2: Personal & Career
    education: 'B.Sc. in Computer Science & Engineering',
    highestDegree: 'Graduation',
    institution: 'BUET / Dhaka University',
    profession: 'Software Engineer',
    jobTitle: 'Senior Software Engineer',
    jobType: 'Private' as MatrimonialProfile['jobType'],
    monthlyIncome: '৳ 1,50,000+',
    maritalStatus: 'Never Married' as MatrimonialProfile['maritalStatus'],
    height: `5' 8" (173 cm)`,
    presentCountry: 'Bangladesh',
    presentCity: 'Dhaka',
    presentAddress: 'Dhanmondi, Dhaka',
    permanentDistrict: 'Dhaka',
    permanentAddress: 'Dhanmondi, Dhaka',

    // Step 3: Family
    fatherName: '',
    fatherProfession: '',
    motherName: '',
    motherProfession: '',
    brotherCount: 1,
    brotherDetails: '1 Brother (Studying)',
    sisterCount: 0,
    sisterDetails: '',
    familyValues: 'Moderate' as MatrimonialProfile['familyValues'],
    economicStatus: 'Upper Middle Class' as MatrimonialProfile['economicStatus'],
    familyNotes: 'Educated, respected family with strong moral principles.',

    // Step 4: Preferences & Media
    partnerMinAge: 22,
    partnerMaxAge: 28,
    partnerMinHeight: `5' 2"`,
    partnerEducation: 'Graduation / Post Graduation',
    partnerProfession: 'Doctor, Engineer, Banker or Corporate',
    partnerLocation: 'Dhaka, Sylhet, or Expat (USA/Canada)',
    partnerNotes: 'Looking for a kind, respectful, and family-oriented companion.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop',
    photoPrivacy: 'Public' as MatrimonialProfile['photoPrivacy'],
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.candidateName.trim()) {
        showToast('Candidate Name Required', 'Please provide the candidate full name.', 'error');
        return false;
      }
      if (!formData.contactNumber.trim()) {
        showToast('Mobile Number Required', 'Please provide your mobile or WhatsApp contact number.', 'error');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        showToast('Valid Email Required', 'Please provide a valid email address.', 'error');
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        showToast('Password Too Short', 'Password must be at least 6 characters.', 'error');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        showToast('Passwords Do Not Match', 'Please ensure both password fields match.', 'error');
        return false;
      }
    } else if (step === 2) {
      if (!formData.profession.trim() || !formData.presentAddress.trim()) {
        showToast('Details Required', 'Please complete your profession and address.', 'error');
        return false;
      }
    } else if (step === 3) {
      if (!formData.fatherName.trim() || !formData.motherName.trim()) {
        showToast('Family Details Required', 'Please enter father and mother names.', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSuccess(true);
    showToast('Registration Successful!', 'Your matrimonial biodata has been created.', 'success');

    const newUserId = 'usr-' + Math.random().toString(36).substring(2, 7);
    const newProfileId = 'SK-' + Math.floor(1000 + Math.random() * 9000);

    const selectedCountry =
      COUNTRY_OPTIONS.find((c) => c.id === formData.countryCode) || COUNTRY_OPTIONS[0];

    const newUser: UserAccount = {
      id: newUserId,
      name: formData.candidateName,
      email: formData.email,
      role: 'user',
      phone: `${selectedCountry.dialCode} ${formData.contactNumber}`.trim(),
      avatar: formData.avatar,
      membershipPlan: 'free',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      assignedAdminName: 'Kabir Hossain',
    };

    const newProfile: MatrimonialProfile = {
      id: 'prof-' + newUserId,
      userId: newUserId,
      profileId: newProfileId,
      name: formData.candidateName,
      candidateNameBangla: formData.candidateNameBangla,
      createdFor: formData.createdFor,
      gender: formData.gender,
      age: 26,
      dateOfBirth: formData.dateOfBirth,
      height: formData.height,
      maritalStatus: formData.maritalStatus,
      religion: 'Islam (Sunni)',
      education: formData.education,
      highestDegree: formData.highestDegree,
      institution: formData.institution,
      profession: formData.profession,
      jobTitle: formData.jobTitle,
      companyOrSector: 'Dhaka Enterprise',
      jobType: formData.jobType,
      monthlyIncome: formData.monthlyIncome,
      presentCountry: formData.presentCountry,
      presentCity: formData.presentCity,
      presentAddress: formData.presentAddress,
      permanentDistrict: formData.permanentDistrict,
      permanentAddress: formData.permanentAddress,
      fatherName: formData.fatherName,
      fatherProfession: formData.fatherProfession,
      motherName: formData.motherName,
      motherProfession: formData.motherProfession,
      brotherCount: formData.brotherCount,
      brotherDetails: formData.brotherDetails,
      sisterCount: formData.sisterCount,
      sisterDetails: formData.sisterDetails,
      familyValues: formData.familyValues,
      economicStatus: formData.economicStatus,
      familyNotes: formData.familyNotes,
      partnerMinAge: formData.partnerMinAge,
      partnerMaxAge: formData.partnerMaxAge,
      partnerMinHeight: formData.partnerMinHeight,
      partnerEducation: [formData.partnerEducation],
      partnerProfession: [formData.partnerProfession],
      partnerMaritalStatus: ['Never Married'],
      partnerLocation: [formData.partnerLocation],
      partnerOtherPreferences: formData.partnerNotes,
      avatar: formData.avatar,
      galleryImages: [],
      isVerified: true,
      isFeatured: false,
      photoPrivacy: formData.photoPrivacy,
      bio: `${formData.profession} based in ${formData.presentCity}. Looking for a compatible life companion.`,
      lastActive: 'Just now',
      registeredDate: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      onComplete(newUser, newProfile);
    }, 1800);
  };

  const steps = [
    { num: 1, label: 'Basic Info', icon: <User className="w-4 h-4" /> },
    { num: 2, label: 'Career & Life', icon: <Briefcase className="w-4 h-4" /> },
    { num: 3, label: 'Family Heritage', icon: <Users className="w-4 h-4" /> },
    { num: 4, label: 'Preferences & Photos', icon: <Heart className="w-4 h-4" /> },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl border border-emerald-100 animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-inner animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Welcome to Shadikabbo!
          </h2>
          <p className="text-sm text-slate-600 mt-2 mb-6 leading-relaxed">
            Your matrimonial biodata for <span className="font-bold text-[#16205B]">{formData.candidateName}</span> has been successfully created.
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left mb-6 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Candidate ID:</span>
              <span className="font-bold font-mono text-[#D91B2B]">SK-New2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Membership Tier:</span>
              <span className="font-bold text-slate-800">Free Starter Plan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Matchmaker:</span>
              <span className="font-bold text-emerald-700">Kabir Hossain (Senior Matchmaker)</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-4 animate-pulse">
            Transferring you directly to your personalized user dashboard...
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full py-3 bg-[#D91B2B] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#b91422] transition-colors"
          >
            Go to User Dashboard Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-2 sm:py-8 lg:py-10 px-2.5 sm:px-6 lg:px-8 flex flex-col justify-start lg:justify-center items-center pb-32 sm:pb-12">
      <div className="w-full max-w-xl sm:max-w-3xl lg:max-w-5xl mx-auto">
        {/* Responsive 4-Step Indicator Bar */}
        <div className="mb-3 sm:mb-4 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:px-5 sm:py-2.5 shadow-sm border border-slate-200/90">
          {/* Mobile Stepper (Clean, compact progress bar & badges) */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-800">
                Step {currentStep} of 4: <span className="text-[#16205B]">{steps[currentStep - 1].label}</span>
              </span>
              <span className="font-extrabold text-[11px] text-[#D91B2B] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                {currentStep * 25}%
              </span>
            </div>
            {/* 4-segment clean progress line */}
            <div className="grid grid-cols-4 gap-1.5">
              {steps.map((step) => {
                const isPast = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <div
                    key={step.num}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#16205B] shadow-xs'
                        : isPast
                        ? 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>
            {/* 4 compact labels */}
            <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-medium mt-1.5 text-slate-400">
              {steps.map((step) => (
                <span
                  key={step.num}
                  className={`truncate ${
                    currentStep === step.num
                      ? 'text-[#16205B] font-bold'
                      : currentStep > step.num
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop Stepper (Luxury pills) */}
          <div className="hidden sm:flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 lg:gap-3 flex-1 overflow-x-auto no-scrollbar py-0.5">
              {steps.map((step) => {
                const isPast = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <div
                    key={step.num}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                      isCurrent
                        ? 'bg-[#16205B] text-white shadow-xs'
                        : isPast
                        ? 'text-emerald-700 bg-emerald-50 font-medium'
                        : 'text-slate-400 bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-white text-[#16205B]'
                          : isPast
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPast ? <Check className="w-3 h-3 stroke-[3]" /> : step.num}
                    </span>
                    <span>{step.label}</span>
                  </div>
                );
              })}
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#D91B2B] bg-rose-50 px-3 py-1 rounded-full shrink-0 border border-rose-100">
              Step {currentStep}/4
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-10 shadow-lg border border-slate-200/90 relative">
          {/* Form Header: Utility row (Cancel + Logo) & Title row - Hidden on mobile since top navbar has the logo and the stepper bar shows current step */}
          <div className="hidden sm:block border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#D91B2B] px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80 cursor-pointer"
                title="Cancel registration and return to Home"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                <span>Cancel / Home</span>
              </button>

              {/* Form Right Corner Logo - Clickable to return Home */}
              <div
                className="shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                onClick={onCancel}
                title="Return to Home"
              >
                <BrandLogo size="xs" variant="horizontal" />
              </div>
            </div>

            {/* Current Step Title & Subtitle (Desktop / Tablet view) */}
            <div>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 font-display">
                {currentStep === 1 && 'Step 1: Candidate Basic Information'}
                {currentStep === 2 && 'Step 2: Career, Education & Address'}
                {currentStep === 3 && 'Step 3: Family Heritage & Details'}
                {currentStep === 4 && 'Step 4: Partner Preferences & Media'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentStep === 1 && 'Primary personal identification and authentic contact credentials.'}
                {currentStep === 2 && 'Educational background, current occupation, height and residency.'}
                {currentStep === 3 && 'Parents background, siblings details and family values.'}
                {currentStep === 4 && 'Desired partner criteria, candidate photo upload and preferences.'}
              </p>
            </div>
          </div>

          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.candidateName}
                    onChange={(e) => updateField('candidateName', e.target.value)}
                    placeholder="e.g. Farhan Ahmed"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Name in Bengali (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={formData.candidateNameBangla}
                    onChange={(e) => updateField('candidateNameBangla', e.target.value)}
                    placeholder="e.g. ফারহান আহমেদ"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Profile Created For *
                  </label>
                  <select
                    value={formData.createdFor}
                    onChange={(e) => updateField('createdFor', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                  >
                    <option value="Self">Self (নিজ)</option>
                    <option value="Son">Son (ছেলে)</option>
                    <option value="Daughter">Daughter (মেয়ে)</option>
                    <option value="Brother">Brother (ভাই)</option>
                    <option value="Sister">Sister (বোন)</option>
                    <option value="Friend">Friend (বন্ধু)</option>
                    <option value="Relative">Relative (আত্মীয়)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateField('gender', 'Male')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        formData.gender === 'Male'
                          ? 'bg-[#16205B] text-white border-[#16205B]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Male (পাত্র)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('gender', 'Female')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        formData.gender === 'Female'
                          ? 'bg-[#D91B2B] text-white border-[#D91B2B]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Female (পাত্রী)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact / WhatsApp Number *
                  </label>
                  <div className="flex gap-2">
                    {/* Custom Country Flag Selector */}
                    <div className="relative shrink-0" ref={countryDropdownRef}>
                      {(() => {
                        const selectedCountry =
                          COUNTRY_OPTIONS.find((c) => c.id === formData.countryCode) ||
                          COUNTRY_OPTIONS[0];
                        return (
                          <>
                            <button
                              type="button"
                              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                              className="flex items-center gap-2 h-10 px-2.5 sm:px-3 text-xs rounded-xl border border-slate-200 bg-white hover:bg-slate-50 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] cursor-pointer shadow-xs transition-colors"
                              title={selectedCountry.name}
                            >
                              <img
                                src={`https://flagcdn.com/w40/${selectedCountry.code}.png`}
                                alt={selectedCountry.name}
                                className="w-5 h-3.5 object-cover rounded-xs border border-slate-200/80 shrink-0"
                                loading="lazy"
                              />
                              <span className="font-bold text-slate-700">{selectedCountry.dialCode}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                                  isCountryDropdownOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {isCountryDropdownOpen && (
                              <div className="absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1 divide-y divide-slate-50">
                                {COUNTRY_OPTIONS.map((c) => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => {
                                      updateField('countryCode', c.id);
                                      setIsCountryDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                                      formData.countryCode === c.id
                                        ? 'bg-rose-50/70 font-bold text-[#D91B2B]'
                                        : 'text-slate-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <img
                                        src={`https://flagcdn.com/w40/${c.code}.png`}
                                        alt={c.name}
                                        className="w-5 h-3.5 object-cover rounded-xs border border-slate-200/80 shrink-0"
                                        loading="lazy"
                                      />
                                      <span className="truncate">{c.name}</span>
                                    </div>
                                    <span className="text-slate-500 font-mono text-[11px] shrink-0 pl-2">
                                      {c.dialCode}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>

                    <input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => updateField('contactNumber', e.target.value)}
                      placeholder={
                        formData.countryCode === '+880'
                          ? '01XXXXXXXXX'
                          : formData.countryCode.startsWith('+1')
                          ? '555-123-4567'
                          : formData.countryCode === '+61'
                          ? '4XX XXX XXX'
                          : 'Mobile number'
                      }
                      required
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] min-w-0 h-10"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Secured. Never displayed publicly without your consent.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="e.g. farhan.match@gmail.com"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Personal & Professional */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Educational Qualification *
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => updateField('education', e.target.value)}
                    placeholder="e.g. B.Sc. in Computer Science / MBBS / BBA"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    University / College / Institution *
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => updateField('institution', e.target.value)}
                    placeholder="e.g. BUET, Dhaka University, NSU, DMC, Abroad"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Profession *
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => updateField('profession', e.target.value)}
                    placeholder="e.g. Software Engineer, Doctor, Banker"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Sector / Type *
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => updateField('jobType', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                  >
                    <option value="Private">Private Company</option>
                    <option value="Multinational">Multinational (MNC)</option>
                    <option value="Government">Government / BCS Cadre</option>
                    <option value="Doctor">Medical Doctor</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Business">Business / Entrepreneur</option>
                    <option value="Freelance">Freelance / Consultant</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Marital Status *
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => updateField('maritalStatus', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                  >
                    <option value="Never Married">Never Married (অবিবাহিত)</option>
                    <option value="Divorced">Divorced (ডিভোর্সড)</option>
                    <option value="Widowed">Widowed (বিধবা/বিপত্মীক)</option>
                    <option value="Separated">Separated (আলাদা)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Height *
                  </label>
                  <select
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                  >
                    <option value={`5' 0" (152 cm)`}>5' 0" (152 cm)</option>
                    <option value={`5' 2" (157 cm)`}>5' 2" (157 cm)</option>
                    <option value={`5' 4" (163 cm)`}>5' 4" (163 cm)</option>
                    <option value={`5' 6" (168 cm)`}>5' 6" (168 cm)</option>
                    <option value={`5' 8" (173 cm)`}>5' 8" (173 cm)</option>
                    <option value={`5' 10" (178 cm)`}>5' 10" (178 cm)</option>
                    <option value={`6' 0" (183 cm)`}>6' 0" (183 cm)</option>
                    <option value={`6' 2" (188 cm)`}>6' 2" (188 cm)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Present Country & City *
                  </label>
                  <input
                    type="text"
                    value={`${formData.presentCity}, ${formData.presentCountry}`}
                    onChange={(e) => updateField('presentCity', e.target.value)}
                    placeholder="e.g. Dhaka, Bangladesh or Toronto, Canada"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Present Address *
                  </label>
                  <input
                    type="text"
                    value={formData.presentAddress}
                    onChange={(e) => updateField('presentAddress', e.target.value)}
                    placeholder="e.g. House 14, Road 5, Dhanmondi, Dhaka"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Permanent District / Ancestral Origin *
                  </label>
                  <input
                    type="text"
                    value={formData.permanentDistrict}
                    onChange={(e) => updateField('permanentDistrict', e.target.value)}
                    placeholder="e.g. Dhaka / Chattogram / Sylhet / Cumilla"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Family Background */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => updateField('fatherName', e.target.value)}
                    placeholder="e.g. Engr. M. A. Rahman"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's Profession *
                  </label>
                  <input
                    type="text"
                    value={formData.fatherProfession}
                    onChange={(e) => updateField('fatherProfession', e.target.value)}
                    placeholder="e.g. Govt Director (Retd) / Businessman / Professor"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => updateField('motherName', e.target.value)}
                    placeholder="e.g. Begum Rokeya Rahman"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mother's Profession *
                  </label>
                  <input
                    type="text"
                    value={formData.motherProfession}
                    onChange={(e) => updateField('motherProfession', e.target.value)}
                    placeholder="e.g. Homemaker / School Principal / Teacher"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brothers Details (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.brotherDetails}
                    onChange={(e) => updateField('brotherDetails', e.target.value)}
                    placeholder="e.g. 1 Elder Brother (B.Sc. Engineer, settled abroad)"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sisters Details (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.sisterDetails}
                    onChange={(e) => updateField('sisterDetails', e.target.value)}
                    placeholder="e.g. 1 Younger Sister (Doctor at DMC)"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Family Values
                  </label>
                  <select
                    value={formData.familyValues}
                    onChange={(e) => updateField('familyValues', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                  >
                    <option value="Moderate">Moderate (আধুনিক ও ধার্মিক সমন্বয়)</option>
                    <option value="Traditional">Traditional (ঐতিহ্যবাহী)</option>
                    <option value="Religious">Religious (ধার্মিক ও পর্দাশীল)</option>
                    <option value="Liberal">Liberal (প্রগতিশীল)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Family Economic Class
                  </label>
                  <select
                    value={formData.economicStatus}
                    onChange={(e) => updateField('economicStatus', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                  >
                    <option value="Upper Middle Class">Upper Middle Class (উচ্চ মধ্যবিত্ত)</option>
                    <option value="Middle Class">Middle Class (মধ্যবিত্ত)</option>
                    <option value="Affluent">Affluent (ধনী ও প্রতিষ্ঠিত)</option>
                    <option value="High Net Worth">Aristocratic / Elite</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Partner Preference & Photos */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              {/* Photo Upload & Preview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group shrink-0">
                  <img
                    src={formData.avatar}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900">
                    Candidate Profile Photo
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    High quality, front-facing dignified photograph. JPG, PNG or WEBP.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'avatar',
                          formData.gender === 'Male'
                            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
                            : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop'
                        )
                      }
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
                    >
                      Use Demo Photo A
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'avatar',
                          formData.gender === 'Male'
                            ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop'
                            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop'
                        )
                      }
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
                    >
                      Use Demo Photo B
                    </button>
                  </div>
                </div>

                {/* Privacy Setting */}
                <div className="shrink-0 w-full sm:w-auto">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Photo Privacy
                  </label>
                  <select
                    value={formData.photoPrivacy}
                    onChange={(e) => updateField('photoPrivacy', e.target.value)}
                    className="w-full sm:w-36 px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Public">Public to All</option>
                    <option value="Protected">Verified Only</option>
                    <option value="On-Request">On Request Only</option>
                  </select>
                </div>
              </div>

              {/* Partner Preference Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Age Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.partnerMinAge}
                      onChange={(e) => updateField('partnerMinAge', Number(e.target.value))}
                      className="w-20 px-3 py-2 text-xs rounded-xl border border-slate-200 text-center"
                    />
                    <span className="text-xs text-slate-400">to</span>
                    <input
                      type="number"
                      value={formData.partnerMaxAge}
                      onChange={(e) => updateField('partnerMaxAge', Number(e.target.value))}
                      className="w-20 px-3 py-2 text-xs rounded-xl border border-slate-200 text-center"
                    />
                    <span className="text-xs text-slate-500">years</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Minimum Height
                  </label>
                  <input
                    type="text"
                    value={formData.partnerMinHeight}
                    onChange={(e) => updateField('partnerMinHeight', e.target.value)}
                    placeholder="e.g. 5' 2&quot; or 5' 7&quot;"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Education & Profession
                  </label>
                  <input
                    type="text"
                    value={formData.partnerProfession}
                    onChange={(e) => updateField('partnerProfession', e.target.value)}
                    placeholder="e.g. Doctor, Engineer, BCS, Banker, MNC"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Location / Expat Country
                  </label>
                  <input
                    type="text"
                    value={formData.partnerLocation}
                    onChange={(e) => updateField('partnerLocation', e.target.value)}
                    placeholder="e.g. Dhaka, Canada, USA, UK, or Open"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Review Check */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Free Starter Membership Included
                </div>
                <p className="text-[11px] text-emerald-700">
                  By clicking Submit Registration, your biodata is generated and assigned to our relationship desk. You can review matches, send proposals, or upgrade anytime.
                </p>
              </div>
            </div>
          )}

          {/* Nav Controls (Back & Next / Submit) */}
          <div className="flex items-center justify-between pt-5 sm:pt-8 border-t border-slate-100 mt-6 gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[42px]"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-[#16205B] hover:bg-[#0f1744] text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-900/10 transition-colors cursor-pointer min-h-[42px]"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-1.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/20 hover:shadow-xl transition-all cursor-pointer min-h-[42px]"
              >
                <Sparkles className="w-4 h-4" />
                Submit Registration
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
