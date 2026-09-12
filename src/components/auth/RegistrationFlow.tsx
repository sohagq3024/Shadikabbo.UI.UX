import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { MatrimonialProfile, UserAccount, FamilyMember } from '../../types';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Upload,
  UploadCloud,
  Image as ImageIcon,
  User,
  Briefcase,
  Users,
  UserPlus,
  Plus,
  Trash2,
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Camera,
  X,
  MapPin,
  Home,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import {
  FEATURED_COUNTRIES,
  ALL_WORLD_COUNTRIES,
  getCitiesForCountry,
} from '../../data/locationData';
import { PROFESSION_GROUPS } from '../../data/professionData';

import {
  CountryOption,
  COUNTRY_OPTIONS,
  EducationOptionGroup,
  EDUCATION_QUALIFICATION_GROUPS,
} from '../../data/registrationOptions';

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
  const [isCustomEducation, setIsCustomEducation] = useState(false);
  const [isCustomProfession, setIsCustomProfession] = useState(false);
  const [isCustomPresentCity, setIsCustomPresentCity] = useState(false);
  const [isCustomPermanentCity, setIsCustomPermanentCity] = useState(false);
  const [sameAsPresentAddress, setSameAsPresentAddress] = useState(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Form states matching user specs - No default pre-selected values so user must choose
  const [formData, setFormData] = useState({
    // Step 1: Basic
    candidateName: '',
    candidateNameBangla: '',
    createdFor: '' as MatrimonialProfile['createdFor'],
    gender: '' as 'Male' | 'Female' | '',
    dateOfBirth: '',
    countryCode: '+880',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',

    // Step 2: Personal & Career
    education: '',
    highestDegree: '',
    institution: '',
    profession: '',
    jobTitle: '',
    jobType: '' as MatrimonialProfile['jobType'],
    monthlyIncome: '',
    maritalStatus: '' as MatrimonialProfile['maritalStatus'],
    height: '',
    presentCountry: '',
    presentCity: '',
    presentAddress: '',
    permanentCountry: '',
    permanentDistrict: '',
    permanentAddress: '',

    // Step 3: Family
    fatherName: '',
    fatherProfession: '',
    motherName: '',
    motherProfession: '',
    familyMembers: [] as FamilyMember[],
    brotherCount: 0,
    brotherDetails: '',
    sisterCount: 0,
    sisterDetails: '',
    familyValues: 'Moderate' as MatrimonialProfile['familyValues'],
    economicStatus: 'Upper Middle Class' as MatrimonialProfile['economicStatus'],
    familyNotes: '',

    // Step 4: Preferences & Media
    partnerMinAge: 22,
    partnerMaxAge: 28,
    partnerMinHeight: `5' 2"`,
    partnerEducation: '',
    partnerProfession: '',
    partnerLocation: '',
    partnerNotes: '',
    avatar: '',
    photoPrivacy: 'Public' as MatrimonialProfile['photoPrivacy'],
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const processPhotoFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Invalid File Type', 'Please upload an image file (JPG, PNG, WEBP).', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('File Too Large', 'Please select an image smaller than 5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateField('avatar', e.target.result as string);
        showToast('Photo Uploaded', 'Candidate photograph uploaded successfully.', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
  };

  const handleDropPhoto = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPhoto(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
  };

  const handleDragOverPhoto = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPhoto(true);
  };

  const handleDragLeavePhoto = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPhoto(false);
  };

  const addFamilyMember = () => {
    setFormData((prev) => ({
      ...prev,
      familyMembers: [
        ...(prev.familyMembers || []),
        {
          id: 'fm-' + Math.random().toString(36).substring(2, 9),
          name: '',
          relationship: '',
          profession: '',
        },
      ],
    }));
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, value: string) => {
    setFormData((prev) => {
      const current = prev.familyMembers || [];
      const updated = [...current];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, familyMembers: updated };
    });
  };

  const removeFamilyMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      familyMembers: (prev.familyMembers || []).filter((_, i) => i !== index),
    }));
  };

  const handleToggleSameAddress = (checked: boolean) => {
    setSameAsPresentAddress(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permanentCountry: prev.presentCountry,
        permanentDistrict: prev.presentCity,
        permanentAddress: prev.presentAddress,
      }));
    }
  };

  const handlePresentCountryChange = (country: string) => {
    setIsCustomPresentCity(false);
    setFormData((prev) => ({
      ...prev,
      presentCountry: country,
      presentCity: '',
      ...(sameAsPresentAddress
        ? { permanentCountry: country, permanentDistrict: '' }
        : {}),
    }));
  };

  const handlePermanentCountryChange = (country: string) => {
    setIsCustomPermanentCity(false);
    setFormData((prev) => ({
      ...prev,
      permanentCountry: country,
      permanentDistrict: '',
    }));
  };

  const handleProfessionChange = (val: string) => {
    if (val === 'Other Profession (Specify below)') {
      setIsCustomProfession(true);
      updateField('profession', '');
    } else {
      setIsCustomProfession(false);
      updateField('profession', val);
      if (
        val.includes('BCS') ||
        val.includes('Government Officer') ||
        val.includes('Armed Forces') ||
        val.includes('Judicial')
      ) {
        updateField('jobType', 'Government');
      } else if (
        val.includes('Doctor') ||
        val.includes('Surgeon') ||
        val.includes('Physician')
      ) {
        updateField('jobType', 'Doctor');
      } else if (val.includes('Engineer') || val.includes('Architect')) {
        updateField('jobType', 'Engineer');
      } else if (
        val.includes('Business') ||
        val.includes('Entrepreneur') ||
        val.includes('Industrialist')
      ) {
        updateField('jobType', 'Business');
      } else if (val.includes('Freelancer') || val.includes('Remote')) {
        updateField('jobType', 'Freelance');
      } else if (val.includes('Corporate Executive') || val.includes('MNC')) {
        updateField('jobType', 'Multinational');
      } else if (val.includes('Bank')) {
        updateField('jobType', 'Private');
      }
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.candidateName.trim()) {
        showToast('Candidate Name Required', 'Please provide the candidate full name.', 'error');
        return false;
      }
      if (!formData.createdFor) {
        showToast('Profile For Required', 'Please select who this profile is being created for.', 'error');
        return false;
      }
      if (!formData.gender) {
        showToast('Gender Required', 'Please select candidate gender (Male or Female).', 'error');
        return false;
      }
      if (!formData.dateOfBirth) {
        showToast('Date of Birth Required', 'Please select candidate date of birth.', 'error');
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
      if (!formData.education.trim()) {
        showToast('Education Required', 'Please select your educational qualification.', 'error');
        return false;
      }
      if (!formData.profession.trim()) {
        showToast('Profession Required', 'Please select or enter your profession.', 'error');
        return false;
      }
      if (!formData.jobType) {
        showToast('Job Sector Required', 'Please select job sector / type.', 'error');
        return false;
      }
      if (!formData.maritalStatus) {
        showToast('Marital Status Required', 'Please select marital status.', 'error');
        return false;
      }
      if (!formData.height) {
        showToast('Height Required', 'Please select candidate height.', 'error');
        return false;
      }
      if (!formData.presentCountry.trim()) {
        showToast('Present Country Required', 'Please select present country.', 'error');
        return false;
      }
      if (!formData.presentCity.trim()) {
        showToast('Present City Required', 'Please select present city or district.', 'error');
        return false;
      }
      if (!sameAsPresentAddress) {
        if (!formData.permanentCountry.trim()) {
          showToast('Permanent Country Required', 'Please select permanent country.', 'error');
          return false;
        }
        if (!formData.permanentDistrict.trim()) {
          showToast('Permanent City Required', 'Please select permanent city or district.', 'error');
          return false;
        }
      }
    } else if (step === 3) {
      if (!formData.fatherName.trim()) {
        showToast("Father's Name Required", "Please enter candidate's father's name.", 'error');
        return false;
      }
      if (!formData.fatherProfession.trim()) {
        showToast("Father's Profession Required", "Please enter father's profession or designation.", 'error');
        return false;
      }
      if (!formData.motherName.trim()) {
        showToast("Mother's Name Required", "Please enter candidate's mother's name.", 'error');
        return false;
      }
      if (!formData.motherProfession.trim()) {
        showToast("Mother's Profession Required", "Please enter mother's profession (or Homemaker).", 'error');
        return false;
      }
    } else if (step === 4) {
      if (!formData.avatar) {
        showToast("Profile Photo Required", "Please upload a photo of the candidate before completing registration.", 'error');
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
      permanentCountry: formData.permanentCountry || formData.presentCountry,
      permanentDistrict: formData.permanentDistrict,
      permanentAddress: formData.permanentAddress,
      fatherName: formData.fatherName,
      fatherProfession: formData.fatherProfession,
      motherName: formData.motherName,
      motherProfession: formData.motherProfession,
      familyMembers: formData.familyMembers || [],
      brotherCount: (formData.familyMembers || []).filter(
        (m) =>
          m.relationship.toLowerCase().includes('brother') ||
          m.relationship.includes('ভাই')
      ).length,
      brotherDetails: (formData.familyMembers || [])
        .filter(
          (m) =>
            m.relationship.toLowerCase().includes('brother') ||
            m.relationship.includes('ভাই')
        )
        .map((m) => `${m.name ? m.name + ': ' : ''}${m.relationship}${m.profession ? ' (' + m.profession + ')' : ''}`)
        .join(', '),
      sisterCount: (formData.familyMembers || []).filter(
        (m) =>
          m.relationship.toLowerCase().includes('sister') ||
          m.relationship.includes('বোন')
      ).length,
      sisterDetails: (formData.familyMembers || [])
        .filter(
          (m) =>
            m.relationship.toLowerCase().includes('sister') ||
            m.relationship.includes('বোন')
        )
        .map((m) => `${m.name ? m.name + ': ' : ''}${m.relationship}${m.profession ? ' (' + m.profession + ')' : ''}`)
        .join(', '),
      familyValues: 'Moderate',
      economicStatus: 'Upper Middle Class',
      familyNotes: '',
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Profile Created For *
                  </label>
                  <select
                    value={formData.createdFor}
                    onChange={(e) => updateField('createdFor', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                  >
                    <option value="">-- Select Profile Creator --</option>
                    <option value="Self">Self</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Friend">Friend</option>
                    <option value="Relative">Relative</option>
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
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.gender === 'Male'
                          ? 'bg-[#16205B] text-white border-[#16205B] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('gender', 'Female')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.gender === 'Female'
                          ? 'bg-[#D91B2B] text-white border-[#D91B2B] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Female
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
              {/* Educational Qualification */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Educational Qualification *
                </label>
                <select
                  value={
                    isCustomEducation
                      ? 'Other Qualification (Specify below)'
                      : formData.education
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Other Qualification (Specify below)') {
                      setIsCustomEducation(true);
                      updateField('education', '');
                      updateField('highestDegree', 'Other Degree');
                    } else {
                      setIsCustomEducation(false);
                      updateField('education', val);
                      if (val.includes('Ph.D.') || val.includes('Doctorate') || val.includes('Post-Doctoral')) {
                        updateField('highestDegree', 'Doctorate / Ph.D.');
                      } else if (val.includes('MBBS') || val.includes('BDS') || val.includes('FCPS') || val.includes('MD')) {
                        updateField('highestDegree', 'Medical Degree (MBBS / Specialist)');
                      } else if (val.includes('M.Sc.') || val.includes('MBA') || val.includes('M.Com') || val.includes('LL.M') || val.includes('M.A.') || val.includes('Kamil') || val.includes('Foreign Master')) {
                        updateField('highestDegree', 'Masters / Post Graduation');
                      } else if (val.includes('B.Sc.') || val.includes('BBA') || val.includes('B.Com') || val.includes('LL.B') || val.includes('B.A.') || val.includes('Fazil') || val.includes('Foreign Bachelor')) {
                        updateField('highestDegree', 'Graduation / Honours');
                      } else if (val.includes('Bar-at-Law')) {
                        updateField('highestDegree', 'Barrister-at-Law');
                      } else if (val.includes('CA') || val.includes('ACCA') || val.includes('CMA') || val.includes('CFA')) {
                        updateField('highestDegree', 'Chartered Professional Certification');
                      } else if (val.includes('HSC') || val.includes('A Levels') || val.includes('Alim')) {
                        updateField('highestDegree', 'Higher Secondary');
                      } else if (val.includes('Diploma')) {
                        updateField('highestDegree', 'Diploma');
                      }
                    }
                  }}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                >
                  <option value="">
                    -- Select Educational Qualification --
                  </option>
                  {EDUCATION_QUALIFICATION_GROUPS.map((grp) => (
                    <optgroup key={grp.group} label={grp.group}>
                      {grp.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                {isCustomEducation && (
                  <div className="mt-2 animate-in fade-in">
                    <input
                      type="text"
                      value={formData.education}
                      onChange={(e) => updateField('education', e.target.value)}
                      placeholder="Type your degree or qualification (e.g. B.Tech, M.Ed)"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-300 focus:ring-2 focus:ring-[#D91B2B]/20 focus:border-[#D91B2B] bg-white"
                      autoFocus
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Specify exact degree or diploma title
                    </span>
                  </div>
                )}
              </div>

              {/* Profession & Career */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Profession *
                  </label>
                  <select
                    value={
                      isCustomProfession
                        ? 'Other Profession (Specify below)'
                        : formData.profession
                    }
                    onChange={(e) => handleProfessionChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                  >
                    <option value="">
                      -- Select Profession --
                    </option>
                    {PROFESSION_GROUPS.map((grp) => (
                      <optgroup key={grp.group} label={grp.group}>
                        {grp.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>

                  {isCustomProfession && (
                    <div className="mt-2 animate-in fade-in">
                      <input
                        type="text"
                        value={formData.profession}
                        onChange={(e) => updateField('profession', e.target.value)}
                        placeholder="Type your profession (e.g. Software Architect)"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-300 focus:ring-2 focus:ring-[#D91B2B]/20 focus:border-[#D91B2B] bg-white"
                        autoFocus
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Sector / Type *
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => updateField('jobType', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                  >
                    <option value="">-- Select Job Sector --</option>
                    <option value="Private">Private Company</option>
                    <option value="Multinational">Multinational (MNC)</option>
                    <option value="Government">Government / Civil Service</option>
                    <option value="Doctor">Medical Doctor</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Business">Business / Entrepreneur</option>
                    <option value="Freelance">Freelance / Remote</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Marital Status *
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => updateField('maritalStatus', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                  >
                    <option value="">-- Select Marital Status --</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Height *
                  </label>
                  <select
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                  >
                    <option value="">-- Select Height --</option>
                    <option value={`4' 10" (147 cm)`}>4' 10" (147 cm)</option>
                    <option value={`5' 0" (152 cm)`}>5' 0" (152 cm)</option>
                    <option value={`5' 1" (155 cm)`}>5' 1" (155 cm)</option>
                    <option value={`5' 2" (157 cm)`}>5' 2" (157 cm)</option>
                    <option value={`5' 3" (160 cm)`}>5' 3" (160 cm)</option>
                    <option value={`5' 4" (163 cm)`}>5' 4" (163 cm)</option>
                    <option value={`5' 5" (165 cm)`}>5' 5" (165 cm)</option>
                    <option value={`5' 6" (168 cm)`}>5' 6" (168 cm)</option>
                    <option value={`5' 7" (170 cm)`}>5' 7" (170 cm)</option>
                    <option value={`5' 8" (173 cm)`}>5' 8" (173 cm)</option>
                    <option value={`5' 9" (175 cm)`}>5' 9" (175 cm)</option>
                    <option value={`5' 10" (178 cm)`}>5' 10" (178 cm)</option>
                    <option value={`5' 11" (180 cm)`}>5' 11" (180 cm)</option>
                    <option value={`6' 0" (183 cm)`}>6' 0" (183 cm)</option>
                    <option value={`6' 1" (185 cm)`}>6' 1" (185 cm)</option>
                    <option value={`6' 2" (188 cm)`}>6' 2" (188 cm)</option>
                    <option value={`6' 3" (190 cm)`}>6' 3" (190 cm)</option>
                  </select>
                </div>
              </div>

              {/* PRESENT ADDRESS SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-rose-50 text-[#D91B2B] flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      Present Address *
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Where the candidate currently lives or works
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Present Country */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Country *
                    </label>
                    <select
                      value={formData.presentCountry}
                      onChange={(e) => handlePresentCountryChange(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                    >
                      <option value="">-- Select Country --</option>
                      <optgroup label="Popular Countries">
                        {FEATURED_COUNTRIES.map((c) => (
                          <option key={`pres-feat-${c}`} value={c}>
                            {c}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="All Countries A-Z">
                        {ALL_WORLD_COUNTRIES.map((c) => (
                          <option key={`pres-all-${c}`} value={c}>
                            {c}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Present City */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      City / District *
                    </label>
                    <select
                      value={isCustomPresentCity ? 'Other City (Specify below)' : formData.presentCity}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Other City (Specify below)') {
                          setIsCustomPresentCity(true);
                          updateField('presentCity', '');
                        } else {
                          setIsCustomPresentCity(false);
                          updateField('presentCity', val);
                          if (sameAsPresentAddress) {
                            updateField('permanentDistrict', val);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                    >
                      <option value="">
                        {formData.presentCountry
                          ? '-- Select City / District --'
                          : '-- Select Country First --'}
                      </option>
                      {getCitiesForCountry(formData.presentCountry).map((city) => (
                        <option key={`pres-city-${city}`} value={city}>
                          {city}
                        </option>
                      ))}
                      <option value="Other City (Specify below)">
                        + Other City (Specify below)
                      </option>
                    </select>

                    {isCustomPresentCity && (
                      <div className="mt-2 animate-in fade-in">
                        <input
                          type="text"
                          value={formData.presentCity}
                          onChange={(e) => {
                            updateField('presentCity', e.target.value);
                            if (sameAsPresentAddress) {
                              updateField('permanentDistrict', e.target.value);
                            }
                          }}
                          placeholder="Type city or town name"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-300 focus:ring-2 focus:ring-[#D91B2B]/20 focus:border-[#D91B2B] bg-white"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional manual text option */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Street Address / Area (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.presentAddress}
                    onChange={(e) => {
                      updateField('presentAddress', e.target.value);
                      if (sameAsPresentAddress) {
                        updateField('permanentAddress', e.target.value);
                      }
                    }}
                    placeholder="e.g. House #14, Road #5, Dhanmondi, Dhaka"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Short street or area details for communication.
                  </span>
                </div>
              </div>

              {/* PERMANENT ADDRESS SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#16205B] flex items-center justify-center">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Permanent Address *
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Hometown or ancestral family origin
                      </p>
                    </div>
                  </div>

                  {/* Same as present address checkbox */}
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 shadow-xs transition-colors">
                    <input
                      type="checkbox"
                      checked={sameAsPresentAddress}
                      onChange={(e) => handleToggleSameAddress(e.target.checked)}
                      className="rounded text-[#16205B] focus:ring-[#16205B] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] font-medium">Same as Present Address</span>
                  </label>
                </div>

                {!sameAsPresentAddress ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Permanent Country */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Country *
                        </label>
                        <select
                          value={formData.permanentCountry}
                          onChange={(e) => handlePermanentCountryChange(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                        >
                          <option value="">-- Select Country --</option>
                          <optgroup label="Popular Countries">
                            {FEATURED_COUNTRIES.map((c) => (
                              <option key={`perm-feat-${c}`} value={c}>
                                {c}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="All Countries A-Z">
                            {ALL_WORLD_COUNTRIES.map((c) => (
                              <option key={`perm-all-${c}`} value={c}>
                                {c}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>

                      {/* Permanent City / District */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          City / District *
                        </label>
                        <select
                          value={isCustomPermanentCity ? 'Other City (Specify below)' : formData.permanentDistrict}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other City (Specify below)') {
                              setIsCustomPermanentCity(true);
                              updateField('permanentDistrict', '');
                            } else {
                              setIsCustomPermanentCity(false);
                              updateField('permanentDistrict', val);
                            }
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                        >
                          <option value="">
                            {formData.permanentCountry
                              ? '-- Select City / District --'
                              : '-- Select Country First --'}
                          </option>
                          {getCitiesForCountry(formData.permanentCountry).map((city) => (
                            <option key={`perm-city-${city}`} value={city}>
                              {city}
                            </option>
                          ))}
                          <option value="Other City (Specify below)">
                            + Other City (Specify below)
                          </option>
                        </select>

                        {isCustomPermanentCity && (
                          <div className="mt-2 animate-in fade-in">
                            <input
                              type="text"
                              value={formData.permanentDistrict}
                              onChange={(e) => updateField('permanentDistrict', e.target.value)}
                              placeholder="Type permanent city/district name"
                              className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-300 focus:ring-2 focus:ring-[#D91B2B]/20 focus:border-[#D91B2B] bg-white"
                              autoFocus
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional manual text option for permanent */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Detailed Permanent Address / Village (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress}
                        onChange={(e) => updateField('permanentAddress', e.target.value)}
                        placeholder="e.g. Village, Post Office, Upazila / District"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Permanent address is saved same as present address ({formData.presentCity}, {formData.presentCountry}).
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Family Background */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              {/* Father's Info */}
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
                    placeholder="e.g. Retired Govt Director / Businessman / Professor"
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                  />
                </div>
              </div>

              {/* Mother's Info */}
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

              {/* Add Family Member Section */}
              <div className="pt-3 border-t border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        Family Members & Siblings
                        <span className="text-[10px] font-normal text-slate-400">
                          (Optional)
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Add brothers, sisters, or other relatives with their profession
                      </p>
                    </div>
                  </div>
                  {formData.familyMembers && formData.familyMembers.length > 0 && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {formData.familyMembers.length} {formData.familyMembers.length === 1 ? 'member' : 'members'}
                    </span>
                  )}
                </div>

                {/* Family Members Dynamic List */}
                {formData.familyMembers && formData.familyMembers.length > 0 ? (
                  <div className="space-y-3">
                    {formData.familyMembers.map((member, idx) => (
                      <div
                        key={member.id || idx}
                        className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 relative group hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#16205B] text-white flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            Family Member #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFamilyMember(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                            title="Remove this member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* 1. Name */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => updateFamilyMember(idx, 'name', e.target.value)}
                              placeholder="e.g. Tanvir Rahman"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                            />
                          </div>

                          {/* 2. Relationship */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Relationship
                            </label>
                            <input
                              type="text"
                              list="family-relationship-options"
                              value={member.relationship}
                              onChange={(e) => updateFamilyMember(idx, 'relationship', e.target.value)}
                              placeholder="e.g. Elder Brother, Sister, Uncle"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                            />
                          </div>

                          {/* 3. Profession */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Profession
                            </label>
                            <input
                              type="text"
                              value={member.profession}
                              onChange={(e) => updateFamilyMember(idx, 'profession', e.target.value)}
                              placeholder="e.g. Software Engineer, Doctor, Student"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
                    <p className="text-[11px] text-slate-500">
                      No additional family members added yet. You can add brothers, sisters, or relatives below if needed.
                    </p>
                  </div>
                )}

                {/* Suggestions Datalist */}
                <datalist id="family-relationship-options">
                  <option value="Elder Brother" />
                  <option value="Younger Brother" />
                  <option value="Brother" />
                  <option value="Elder Sister" />
                  <option value="Younger Sister" />
                  <option value="Sister" />
                  <option value="Paternal Uncle" />
                  <option value="Maternal Uncle" />
                  <option value="Paternal Aunt" />
                  <option value="Maternal Aunt" />
                  <option value="Grandfather" />
                  <option value="Grandmother" />
                  <option value="Cousin" />
                </datalist>

                {/* Add Member Button */}
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-[#16205B]/30 hover:border-[#16205B] hover:bg-[#16205B]/5 text-[#16205B] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Family Member</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Partner Preference & Photos */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in">
              {/* Hidden manual file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Photo Upload & Preview - Manually uploaded only, no demo photo buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Candidate Photograph *
                </label>

                {formData.avatar ? (
                  <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative shrink-0">
                      <img
                        src={formData.avatar}
                        alt="Uploaded Candidate Photo"
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-emerald-500/20"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Photograph Uploaded</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        Candidate Profile Photograph
                      </h4>
                      <p className="text-[11px] text-slate-500 max-w-md">
                        Your photograph has been uploaded successfully. You can change or replace it anytime before submission.
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-slate-500" />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => updateField('avatar', '')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-[#D91B2B] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOverPhoto}
                    onDragLeave={handleDragLeavePhoto}
                    onDrop={handleDropPhoto}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
                      isDraggingPhoto
                        ? 'border-[#16205B] bg-indigo-50/70 scale-[0.99]'
                        : 'border-slate-300 bg-slate-50/80 hover:bg-slate-100/80 hover:border-[#16205B]/50'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#16205B]">
                      <UploadCloud className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        Upload Candidate Photograph *
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500">
                        Drag and drop an image file here, or click to browse from your device
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Supports JPG, PNG, WEBP (Max 5MB) • Only manual upload allowed
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16205B] text-white text-xs font-semibold hover:bg-[#0f1744] shadow-xs transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Browse Photo from Device</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Partner Preference Manual Text Area */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Partner Expectations & Preferences
                  </label>
                  <span className="text-[11px] text-slate-400">Manual text description</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Describe what kind of partner you or candidate are looking for (education, family values, profession, religious outlook, lifestyle).
                </p>
                <textarea
                  value={formData.partnerNotes}
                  onChange={(e) => updateField('partnerNotes', e.target.value)}
                  rows={5}
                  placeholder="Describe your partner expectations here (e.g., preferred education, profession, family background, religious outlook, location, lifestyle)..."
                  className="w-full px-3.5 py-3 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white text-slate-800 resize-y leading-relaxed shadow-xs"
                />
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
