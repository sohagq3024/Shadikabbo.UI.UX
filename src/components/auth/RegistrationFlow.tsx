import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { MatrimonialProfile, UserAccount } from '../../types';
import {
  Check,
  ChevronRight,
  ChevronLeft,
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

  // Form states matching user specs
  const [formData, setFormData] = useState({
    // Step 1: Basic
    candidateName: '',
    candidateNameBangla: '',
    createdFor: 'Self' as MatrimonialProfile['createdFor'],
    gender: 'Male' as 'Male' | 'Female',
    dateOfBirth: '1998-05-15',
    contactNumber: '+880 17',
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

    const newUser: UserAccount = {
      id: newUserId,
      name: formData.candidateName,
      email: formData.email,
      role: 'user',
      phone: formData.contactNumber,
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
    <div className="min-h-screen bg-slate-50/80 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header with Brand Logo and Cancel Button */}
        <div className="flex items-center justify-between mb-8">
          <BrandLogo size="md" variant="horizontal" />
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel Registration
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#D91B2B] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Step-by-Step Matrimonial Registration
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Create Your Verified Matrimonial Biodata
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-1">
            Join thousands of respectable families finding ideal life partners with dignity, security, and verified authenticity.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="mb-8 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="grid grid-cols-4 gap-2 text-center">
            {steps.map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPast
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-[#16205B] text-white ring-4 ring-[#16205B]/15 shadow-md'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : step.icon}
                  </div>
                  <span
                    className={`text-[11px] mt-2 font-medium hidden sm:block ${
                      isCurrent ? 'text-[#16205B] font-bold' : isPast ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress Line */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#16205B] to-[#D91B2B] h-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Step 1: Candidate Basic Information
                </h3>
                <p className="text-xs text-slate-500">
                  Primary profile details to identify and authenticate the candidate.
                </p>
              </div>

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
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => updateField('contactNumber', e.target.value)}
                    placeholder="+880 1711-xxxxxx"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
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
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Step 2: Personal & Professional Information
                </h3>
                <p className="text-xs text-slate-500">
                  Educational credentials, career background, height, and location.
                </p>
              </div>

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
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Step 3: Family Background & Heritage
                </h3>
                <p className="text-xs text-slate-500">
                  Bengali marriage is a union of two families. Share parents and siblings info.
                </p>
              </div>

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
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Step 4: Partner Preferences & Photos
                </h3>
                <p className="text-xs text-slate-500">
                  Describe your ideal match criteria and upload profile photo.
                </p>
              </div>

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
          <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
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
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#16205B] hover:bg-[#0f1744] text-white text-xs font-bold shadow-md shadow-indigo-900/10 transition-colors"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl bg-[#D91B2B] hover:bg-[#b91422] text-white text-xs font-bold shadow-lg shadow-rose-600/20 hover:shadow-xl transition-all"
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
