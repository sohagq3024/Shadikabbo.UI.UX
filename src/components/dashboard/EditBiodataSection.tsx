import React, { useState, useRef, useEffect } from 'react';
import { MatrimonialProfile, UserAccount, FamilyMember } from '../../types';
import {
  User,
  Briefcase,
  Users,
  Heart,
  Camera,
  Upload,
  UploadCloud,
  Plus,
  Trash2,
  Check,
  Save,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  MapPin,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import {
  FEATURED_COUNTRIES,
  ALL_WORLD_COUNTRIES,
  getCitiesForCountry,
} from '../../data/locationData';
import { PROFESSION_GROUPS } from '../../data/professionData';
import {
  COUNTRY_OPTIONS,
  EDUCATION_QUALIFICATION_GROUPS,
} from '../../data/registrationOptions';

interface EditBiodataSectionProps {
  currentUser: UserAccount;
  myProfile: MatrimonialProfile;
  onUpdateProfile: (updated: MatrimonialProfile) => void;
  onCancel?: () => void;
}

export const EditBiodataSection: React.FC<EditBiodataSectionProps> = ({
  currentUser,
  myProfile,
  onUpdateProfile,
  onCancel,
}) => {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Address linkage state
  const [sameAsPresentAddress, setSameAsPresentAddress] = useState<boolean>(
    Boolean(
      myProfile.presentCountry &&
      myProfile.permanentCountry &&
      myProfile.presentCountry === myProfile.permanentCountry &&
      myProfile.presentCity === myProfile.permanentDistrict
    )
  );

  // Custom input toggles
  const [isCustomEducation, setIsCustomEducation] = useState(false);
  const [isCustomProfession, setIsCustomProfession] = useState(false);
  const [isCustomPresentCity, setIsCustomPresentCity] = useState(false);
  const [isCustomPermanentDistrict, setIsCustomPermanentDistrict] = useState(false);

  // Phone country code dropdown
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form data - EXACT match to RegistrationFlow.tsx (No extra or mismatched objects)
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    candidateName: myProfile.name || currentUser.name || '',
    createdFor: (myProfile.createdFor || 'Self') as MatrimonialProfile['createdFor'],
    gender: (myProfile.gender || 'Male') as 'Male' | 'Female',
    dateOfBirth: myProfile.dateOfBirth || '',
    countryCode: '+880',
    contactNumber: currentUser.phone ? currentUser.phone.replace('+880', '').trim() : '',
    email: currentUser.email || '',

    // Step 2: Career, Education & Address
    education: myProfile.education || '',
    profession: myProfile.profession || '',
    jobType: (myProfile.jobType || 'Private') as MatrimonialProfile['jobType'],
    maritalStatus: (myProfile.maritalStatus || 'Never Married') as MatrimonialProfile['maritalStatus'],
    height: myProfile.height || `5' 6" (168 cm)`,
    presentCountry: myProfile.presentCountry || 'Bangladesh',
    presentCity: myProfile.presentCity || 'Dhaka',
    presentAddress: myProfile.presentAddress || '',
    permanentCountry: myProfile.permanentCountry || 'Bangladesh',
    permanentDistrict: myProfile.permanentDistrict || 'Dhaka',
    permanentAddress: myProfile.permanentAddress || '',

    // Step 3: Family Background
    fatherName: myProfile.fatherName || '',
    fatherProfession: myProfile.fatherProfession || '',
    motherName: myProfile.motherName || '',
    motherProfession: myProfile.motherProfession || '',
    familyMembers: (myProfile.familyMembers || []) as FamilyMember[],

    // Step 4: Partner Preferences & Photograph
    avatar: myProfile.avatar || currentUser.avatar || '',
    partnerNotes: myProfile.partnerNotes || myProfile.bio || '',
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
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
        showToast('Photo Updated', 'Candidate photo updated successfully.', 'success');
      }
    };
    reader.readAsDataURL(file);
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

  // Step 2 Address Handlers
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
    setIsCustomPermanentDistrict(false);
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
      if (val.includes('Doctor') || val.includes('Physician') || val.includes('Surgeon')) {
        updateField('jobType', 'Doctor');
      } else if (val.includes('Engineer') || val.includes('Software') || val.includes('Architect')) {
        updateField('jobType', 'Engineer');
      } else if (val.includes('Civil Service') || val.includes('Officer') || val.includes('Cadre') || val.includes('Defense')) {
        updateField('jobType', 'Government');
      } else if (val.includes('Business') || val.includes('Entrepreneur') || val.includes('Exporter')) {
        updateField('jobType', 'Business');
      }
    }
  };

  // Step 3 Family Member Handlers
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

  // Validation
  const validateCurrentStep = (stepNum: number): boolean => {
    if (stepNum === 1) {
      if (!formData.candidateName.trim()) {
        showToast('Name Required', 'Please enter candidate full name.', 'error');
        return false;
      }
      if (!formData.createdFor) {
        showToast('Required Field', 'Please specify who created this profile.', 'error');
        return false;
      }
      if (!formData.gender) {
        showToast('Required Field', 'Please select gender.', 'error');
        return false;
      }
      if (!formData.contactNumber.trim()) {
        showToast('Contact Required', 'Please provide a valid contact number.', 'error');
        return false;
      }
      return true;
    }

    if (stepNum === 2) {
      if (!formData.education.trim()) {
        showToast('Education Required', 'Please select or enter educational qualification.', 'error');
        return false;
      }
      if (!formData.profession.trim()) {
        showToast('Profession Required', 'Please select or enter profession.', 'error');
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
      if (!formData.presentCountry || !formData.presentCity) {
        showToast('Address Required', 'Please select present country and city.', 'error');
        return false;
      }
      if (!formData.permanentCountry || !formData.permanentDistrict) {
        showToast('Address Required', 'Please select permanent country and district.', 'error');
        return false;
      }
      return true;
    }

    if (stepNum === 3) {
      if (!formData.fatherName.trim() || !formData.fatherProfession.trim()) {
        showToast("Father's Info Required", "Please enter father's name and profession.", 'error');
        return false;
      }
      if (!formData.motherName.trim() || !formData.motherProfession.trim()) {
        showToast("Mother's Info Required", "Please enter mother's name and profession.", 'error');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Save changes from ANY step immediately, even if only 1 info changed
  const handleSave = () => {
    const updatedProfile: MatrimonialProfile = {
      ...myProfile,
      name: formData.candidateName.trim() || myProfile.name,
      createdFor: formData.createdFor || myProfile.createdFor,
      gender: formData.gender || myProfile.gender,
      dateOfBirth: formData.dateOfBirth || myProfile.dateOfBirth,
      education: formData.education.trim() || myProfile.education,
      profession: formData.profession.trim() || myProfile.profession,
      jobType: formData.jobType || myProfile.jobType,
      maritalStatus: formData.maritalStatus || myProfile.maritalStatus,
      height: formData.height || myProfile.height,
      presentCountry: formData.presentCountry || myProfile.presentCountry,
      presentCity: formData.presentCity || myProfile.presentCity,
      presentAddress: formData.presentAddress !== undefined ? formData.presentAddress : myProfile.presentAddress,
      permanentCountry: formData.permanentCountry || myProfile.permanentCountry,
      permanentDistrict: formData.permanentDistrict || myProfile.permanentDistrict,
      permanentAddress: formData.permanentAddress !== undefined ? formData.permanentAddress : myProfile.permanentAddress,
      fatherName: formData.fatherName.trim() || myProfile.fatherName,
      fatherProfession: formData.fatherProfession.trim() || myProfile.fatherProfession,
      motherName: formData.motherName.trim() || myProfile.motherName,
      motherProfession: formData.motherProfession.trim() || myProfile.motherProfession,
      familyMembers: formData.familyMembers || myProfile.familyMembers,
      avatar: formData.avatar || myProfile.avatar,
      partnerNotes: formData.partnerNotes !== undefined ? formData.partnerNotes : myProfile.partnerNotes,
      bio: formData.partnerNotes || myProfile.bio,
    };

    onUpdateProfile(updatedProfile);
    showToast('Biodata Saved', 'Your changes have been saved successfully.', 'success');
  };

  const steps = [
    { num: 1, label: 'Basic Info', desc: 'Personal, contact & identity', icon: User },
    { num: 2, label: 'Career & Address', desc: 'Education, job & residence', icon: Briefcase },
    { num: 3, label: 'Family Background', desc: 'Parents & family members', icon: Users },
    { num: 4, label: 'Partner & Photo', desc: 'Preferences & photograph', icon: Heart },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-sm space-y-6 max-w-5xl">
      {/* 4-Step Navigation Tabs */}
      <div className="bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/90">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.num;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#16205B] text-white shadow-sm ring-1 ring-[#16205B]'
                    : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isActive ? 'bg-[#D91B2B] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {step.num}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    <span className="truncate">{step.label}</span>
                  </div>
                  <div
                    className={`text-[10px] truncate hidden md:block ${
                      isActive ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {step.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Forms by Step */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* ================= STEP 1: Basic Info ================= */}
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
                    placeholder="01XXXXXXXXX"
                    required
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] min-w-0 h-10"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Secured. Never displayed publicly without consent.
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
          </div>
        )}

        {/* ================= STEP 2: Career, Education & Address ================= */}
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
                  } else {
                    setIsCustomEducation(false);
                    updateField('education', val);
                  }
                }}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
              >
                <option value="">-- Select Educational Qualification --</option>
                {EDUCATION_QUALIFICATION_GROUPS.map((grp) => (
                  <optgroup key={grp.group} label={grp.group}>
                    {grp.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="Other Qualification (Specify below)">
                  + Other Qualification (Specify below)
                </option>
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
                  <option value="">-- Select Profession --</option>
                  {PROFESSION_GROUPS.map((grp) => (
                    <optgroup key={grp.group} label={grp.group}>
                      {grp.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Other Profession (Specify below)">
                    + Other Profession (Specify below)
                  </option>
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
                  <h4 className="text-xs font-bold text-slate-800">Present Address *</h4>
                  <p className="text-[10px] text-slate-500">
                    Where the candidate currently lives or works
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    <h4 className="text-xs font-bold text-slate-800">Permanent Address *</h4>
                    <p className="text-[10px] text-slate-500">
                      Hometown or ancestral family origin
                    </p>
                  </div>
                </div>

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

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        District / State *
                      </label>
                      <select
                        value={isCustomPermanentDistrict ? 'Other District (Specify below)' : formData.permanentDistrict}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Other District (Specify below)') {
                            setIsCustomPermanentDistrict(true);
                            updateField('permanentDistrict', '');
                          } else {
                            setIsCustomPermanentDistrict(false);
                            updateField('permanentDistrict', val);
                          }
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white cursor-pointer"
                      >
                        <option value="">
                          {formData.permanentCountry
                            ? '-- Select District / State --'
                            : '-- Select Country First --'}
                        </option>
                        {getCitiesForCountry(formData.permanentCountry).map((city) => (
                          <option key={`perm-city-${city}`} value={city}>
                            {city}
                          </option>
                        ))}
                        <option value="Other District (Specify below)">
                          + Other District (Specify below)
                        </option>
                      </select>

                      {isCustomPermanentDistrict && (
                        <div className="mt-2 animate-in fade-in">
                          <input
                            type="text"
                            value={formData.permanentDistrict}
                            onChange={(e) => updateField('permanentDistrict', e.target.value)}
                            placeholder="Type district or state name"
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-300 focus:ring-2 focus:ring-[#D91B2B]/20 focus:border-[#D91B2B] bg-white"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>
                  </div>

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

        {/* ================= STEP 3: Family Background ================= */}
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

            {/* Family Members Section */}
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

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Relationship
                          </label>
                          <input
                            type="text"
                            list="edit-family-relationship-options"
                            value={member.relationship}
                            onChange={(e) => updateFamilyMember(idx, 'relationship', e.target.value)}
                            placeholder="e.g. Elder Brother, Sister, Uncle"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-white"
                          />
                        </div>

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

              <datalist id="edit-family-relationship-options">
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

        {/* ================= STEP 4: Partner Preferences & Photograph ================= */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Photo Upload & Preview */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Candidate Photograph *
              </label>

              {formData.avatar ? (
                <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={formData.avatar}
                      alt="Candidate Photo"
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
                      Your photograph is active. You can change or replace it anytime.
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

            {/* Partner Expectations Textarea */}
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
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 gap-3">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Save Button - Accessible from ANY step, saves single info or all info immediately */}
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-700/15 hover:shadow-lg transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save (সংরক্ষণ করুন)</span>
            </button>

            {currentStep < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-7 py-2.5 rounded-xl bg-[#16205B] hover:bg-[#0f1744] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-900/10 transition-colors cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
