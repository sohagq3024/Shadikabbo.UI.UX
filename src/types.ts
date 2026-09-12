export type UserRole = 'guest' | 'user' | 'admin' | 'superadmin' | 'super_admin';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatar: string;
  membershipPlan: 'free' | 'basic' | 'standard' | 'special';
  createdAt: string;
  status: 'active' | 'suspended' | 'pending';
  password?: string;
  assignedAdminId?: string;
  assignedAdminName?: string;
}

export interface FamilyMember {
  id?: string;
  name: string;
  relationship: string;
  profession: string;
}

export interface MatrimonialProfile {
  id: string;
  userId: string;
  profileId: string; // e.g., SK-1082
  name: string;
  candidateNameBangla?: string;
  createdFor: 'Self' | 'Son' | 'Daughter' | 'Brother' | 'Sister' | 'Friend' | 'Relative';
  gender: 'Male' | 'Female';
  age: number;
  dateOfBirth: string;
  height: string; // e.g., 5' 9" (175 cm)
  weight?: string; // e.g., 68 kg
  maritalStatus: 'Never Married' | 'Divorced' | 'Widowed' | 'Separated';
  religion: string;
  sect?: string;
  
  // Professional & Education
  education: string;
  highestDegree: string;
  institution: string;
  profession: string;
  jobTitle: string;
  companyOrSector: string;
  jobType: 'Government' | 'Private' | 'Multinational' | 'Business' | 'Doctor' | 'Engineer' | 'Freelance' | 'Other';
  monthlyIncome?: string;

  // Location
  presentCountry: string;
  presentCity: string;
  presentAddress: string;
  permanentCountry?: string;
  permanentDistrict: string;
  permanentAddress: string;
  citizenshipStatus?: string; // e.g., Citizen, PR, Work Permit

  // Family Background
  fatherName: string;
  fatherProfession: string;
  motherName: string;
  motherProfession: string;
  familyMembers?: FamilyMember[];
  brotherCount?: number;
  brotherDetails?: string;
  sisterCount?: number;
  sisterDetails?: string;
  familyValues?: 'Traditional' | 'Moderate' | 'Liberal' | 'Religious';
  economicStatus?: 'Middle Class' | 'Upper Middle Class' | 'Affluent' | 'High Net Worth';
  familyNotes?: string;

  // Partner Preferences
  partnerMinAge: number;
  partnerMaxAge: number;
  partnerMinHeight: string;
  partnerEducation: string[];
  partnerProfession: string[];
  partnerMaritalStatus: string[];
  partnerLocation: string[];
  partnerOtherPreferences?: string;

  // Media & Privacy
  avatar: string;
  galleryImages: string[];
  isVerified: boolean;
  isFeatured: boolean;
  photoPrivacy: 'Public' | 'Protected' | 'On-Request';
  bio: string;
  bioBangla?: string;
  lastActive: string;
  registeredDate: string;
  phone?: string;
  assignedAdminId?: string;
  assignedAdminName?: string;
  membershipPlan?: 'free' | 'basic' | 'standard' | 'special';
  birthYear?: number;
}

export interface Proposal {
  id: string;
  fromUserId: string;
  fromProfile: MatrimonialProfile;
  toUserId: string;
  toProfile: MatrimonialProfile;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  sentDate: string;
  updatedDate?: string;
  message?: string;
  contactUnlocked: boolean;
}

export interface ProposalItem {
  id: string;
  senderId: string;
  senderProfileId: string;
  senderName: string;
  receiverProfileId: string;
  receiverName: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
}

export interface AdminTask {
  id: string;
  title: string;
  candidateName: string;
  candidateProfileId: string;
  taskType: 'Verification' | 'Counseling' | 'Proposal Follow-up' | 'Document Audit';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface MembershipPlan {
  id: 'free' | 'basic' | 'standard' | 'special';
  name: string;
  nameBangla: string;
  priceBDT: number;
  duration: string;
  badge?: string;
  isPopular?: boolean;
  proposalsAllowed: string;
  contactViews: string;
  features: string[];
  description: string;
}

export interface SuccessStory {
  id: string;
  coupleName: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  marriageCity: string;
  currentResidence: string;
  image: string;
  storyQuote: string;
  fullStory: string;
  matchDuration: string;
}

export interface MatchmakingService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface ReviewComment {
  id: string;
  userName: string;
  userAvatar?: string;
  userRole?: string;
  comment: string;
  createdAt: string;
}

export interface ReviewPost {
  id: string;
  authorName: string;
  authorVerified: boolean;
  isOnline: boolean;
  uploadedDate: string;
  relativeTime: string;
  category?: 'Wedding Success' | 'Verified Match' | 'Client Review' | 'Community Story';
  caption: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  videoDuration?: string;
  likesCount: number;
  isLiked?: boolean;
  sharesCount: number;
  comments: ReviewComment[];
  coupleDetails?: {
    brideName?: string;
    groomName?: string;
    weddingLocation?: string;
  };
}

export interface HeroMobileMockup {
  imageUrl: string;
  nameAge: string;
  professionCity: string;
}

export interface CountryCardSetting {
  id: string;
  name: string;
  flag: string;
  cityName: string;
  highlight: string;
  image: string;
  candidateCount: string;
}

export interface SiteSettings {
  // Notice bar
  noticeEnabled: boolean;
  noticeText: string;
  noticeBadge: string;
  
  // Contact & Hotline
  helplinePhone1: string;
  helplinePhone2: string;
  whatsappNumber: string;
  supportEmail: string;
  officeAddress: string;
  
  // Payment accounts
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  paymentNotice: string;
  
  // Hero & Metrics
  heroHeadline: string;
  heroHighlight: string;
  heroSubtitle: string;
  statProfilesCount: string;
  statWeddingsCount: string;
  statTrustBadge: string;

  // Hero Right Side 3 Mobile Mockup Frames
  heroLeftPhone: HeroMobileMockup;
  heroCenterPhone: HeroMobileMockup;
  heroRightPhone: HeroMobileMockup;

  // Featured Profiles Section
  featuredSectionTitle: string;
  featuredSectionSubtitle: string;
  featuredProfileIds: string[];

  // Membership Section
  membershipSectionTitle: string;
  membershipSectionSubtitle: string;

  // Country & Expat Community Section
  countrySectionTitle: string;
  countrySectionSubtitle: string;
  countryCards: CountryCardSetting[];

  // Callback / VIP Consultation Section
  callbackTitle: string;
  callbackSubtitle: string;
  callbackPhone: string;
  callbackCounselor: string;
  callbackButtonText: string;
  authorityDeskHours: string;
  authorityDeskTagline: string;
}
