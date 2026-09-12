export interface CountryOption {
  id: string;
  code: string;
  dialCode: string;
  name: string;
}

export const COUNTRY_OPTIONS: CountryOption[] = [
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

export interface EducationOptionGroup {
  group: string;
  options: string[];
}

export const EDUCATION_QUALIFICATION_GROUPS: EducationOptionGroup[] = [
  {
    group: 'Engineering & Technology',
    options: [
      'B.Sc. in Computer Science & Engineering (CSE)',
      'B.Sc. in Electrical & Electronic Engineering (EEE)',
      'B.Sc. in Civil Engineering (CE)',
      'B.Sc. in Mechanical Engineering (ME)',
      'B.Sc. in Textile Engineering',
      'B.Sc. in Architecture (B.Arch)',
      'B.Sc. in Industrial & Production Engineering (IPE)',
      'B.Sc. in Chemical / Petroleum Engineering',
      'B.Sc. in Aeronautical / Marine Engineering',
      'B.Sc. in Software Engineering / Information Technology (IT)',
      'M.Sc. in Computer Science / Engineering',
      'Diploma in Engineering / Polytechnic',
    ],
  },
  {
    group: 'Medical & Healthcare',
    options: [
      'MBBS (Doctor of Medicine)',
      'BDS (Bachelor of Dental Surgery)',
      'FCPS / MD / MS / MRCP / FRCS (Specialist Doctor)',
      'B.Pharm / M.Pharm (Pharmacy)',
      'B.Sc. / M.Sc. in Nursing',
      'Doctor of Physical Therapy (DPT) / Physiotherapy',
      'Master of Public Health (MPH)',
      'Diploma in Medical Faculty (DMF) / Medical Technology',
      'Doctor of Veterinary Medicine (DVM)',
    ],
  },
  {
    group: 'Business, Commerce & Finance',
    options: [
      'BBA (Bachelor of Business Administration)',
      'MBA (Master of Business Administration)',
      'B.Com / M.Com (Accounting / Finance / Marketing)',
      'Chartered Accountant (CA / ICAB / ACCA / CMA)',
      'CFA (Chartered Financial Analyst)',
      'B.Sc. / M.Sc. in Economics',
    ],
  },
  {
    group: 'Pure & Applied Sciences',
    options: [
      'B.Sc. (Hons) in Mathematics / Statistics',
      'B.Sc. (Hons) in Physics / Applied Physics',
      'B.Sc. (Hons) in Chemistry / Applied Chemistry',
      'B.Sc. (Hons) in Biochemistry / Biotechnology / Genetic Eng.',
      'B.Sc. (Hons) in Microbiology / Environmental Science',
      'B.Sc. (Hons) in Agriculture / Fisheries / Forestry',
      'M.Sc. in Pure / Applied Sciences',
    ],
  },
  {
    group: 'Law & Legal Studies',
    options: [
      'LL.B (Hons) - Bachelor of Laws',
      'LL.M - Master of Laws',
      'Bar-at-Law (Barrister-at-Law, UK)',
    ],
  },
  {
    group: 'Arts, Humanities & Social Sciences',
    options: [
      'B.A. (Hons) / M.A. in English Literature & Language',
      'B.A. (Hons) / M.A. in International Relations / Political Science',
      'B.A. (Hons) / M.A. in Journalism & Mass Communication',
      'B.A. (Hons) / M.A. in Economics / Development Studies',
      'B.A. (Hons) / M.A. in Public Administration / Governance',
      'B.A. (Hons) / M.A. in Sociology / Social Work / Anthropology',
      'B.A. (Hons) / M.A. in Bengali Literature / History / Philosophy',
      'Bachelor of Fine Arts (BFA) / Design',
    ],
  },
  {
    group: 'Doctorate & Post-Graduate Research',
    options: [
      'Ph.D. / Doctorate',
      'M.Phil (Master of Philosophy)',
      'Post-Doctoral Fellow / Researcher',
    ],
  },
  {
    group: 'Madrasah & Islamic Studies',
    options: [
      'Daura-e-Hadith (Masters Equivalent - Qawmi)',
      'Kamil (Masters Equivalent - Alia)',
      'Fazil (Bachelors Equivalent - Alia)',
      'Alim / Dakhil (Madrasah Education Board)',
      'B.A. / M.A. in Islamic Studies / Arabic',
      'Hafez-e-Quran / Mufti / Islamic Scholar',
    ],
  },
  {
    group: 'General Degree & Higher Secondary',
    options: [
      'Graduation / Degree Pass Course (B.A. / B.Sc. / B.Com)',
      'Masters / Post Graduation (General Degree)',
      'Higher Secondary Certificate (HSC / A Levels / 12th Pass)',
      'Secondary School Certificate (SSC / O Levels / 10th Pass)',
    ],
  },
  {
    group: 'Foreign & Overseas Degrees',
    options: [
      'Foreign Bachelor’s Degree (USA / UK / Canada / Australia / Europe)',
      'Foreign Master’s Degree (USA / UK / Canada / Australia / Europe)',
      'Foreign Ph.D. / Post-Graduation',
    ],
  },
  {
    group: 'Other Qualifications',
    options: [
      'Other Qualification (Specify below)',
    ],
  },
];
