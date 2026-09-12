// Comprehensive list of professions categorized by sector

export interface ProfessionGroup {
  group: string;
  options: string[];
}

export const PROFESSION_GROUPS: ProfessionGroup[] = [
  {
    group: 'Software, IT & Technology',
    options: [
      'Software Engineer / Developer',
      'Senior Software Engineer / Tech Lead',
      'Software Architect / Engineering Manager',
      'Frontend / Full-Stack Developer',
      'Backend / Cloud Engineer',
      'DevOps / SRE Engineer',
      'Data Scientist / AI / Machine Learning Specialist',
      'Data Engineer / Business Intelligence Analyst',
      'Cyber Security Specialist / Ethical Hacker',
      'UI/UX Designer / Product Designer',
      'QA / Automation Test Engineer',
      'Mobile App Developer (iOS / Android / Flutter)',
      'IT Project Manager / Scrum Master',
      'System / Network Administrator',
    ],
  },
  {
    group: 'Medical & Healthcare',
    options: [
      'Medical Doctor (MBBS)',
      'Specialist Physician (FCPS / MD / MS)',
      'Surgeon (General / Orthopedic / Neuro / Plastic)',
      'Dental Surgeon (BDS)',
      'Gynecologist / Obstetrician',
      'Pediatrician (Child Specialist)',
      'Cardiologist / Heart Specialist',
      'Pharmacist (Hospital / Industrial / Clinical)',
      'Doctor of Physical Therapy (Physiotherapist)',
      'Clinical Psychologist / Psychiatrist',
      'Public Health Specialist (MPH)',
      'Nurse Practitioner / Nursing Officer',
      'Veterinary Doctor (DVM)',
    ],
  },
  {
    group: 'Government, Civil Service & Defense',
    options: [
      'BCS (Administration Cadre) - Assistant Commissioner / UNO / ADC',
      'BCS (Police Cadre) - ASP / Additional SP',
      'BCS (Foreign Affairs Cadre) - Diplomat / Foreign Service',
      'BCS (Tax / Customs & Excise Cadre)',
      'BCS (Audit & Accounts / Economic Cadre)',
      'BCS (General Education Cadre) - Govt. College Lecturer',
      'Government Officer (1st Class / Gazetted)',
      'Armed Forces Officer - Army (Captain / Major & above)',
      'Armed Forces Officer - Navy (Lieutenant / Commander)',
      'Armed Forces Officer - Air Force (Flight Lt / Squadron Leader)',
      'Judicial Service Officer (Assistant Judge / Magistrate)',
      'Public Sector / Autonomous Enterprise Officer',
    ],
  },
  {
    group: 'Banking, Finance & Accounting',
    options: [
      'Bank Officer / Manager (Private Commercial Bank)',
      'Central Bank Officer (Bangladesh Bank)',
      'Bank Officer (Foreign / Multinational Bank)',
      'Chartered Accountant (CA / ICAB / ACCA / CMA)',
      'Investment Banker / Portfolio Manager',
      'Financial Analyst / Equity Researcher',
      'Internal Auditor / Compliance Officer',
      'Tax & Corporate Consultant',
      'Chartered Financial Analyst (CFA)',
      'Risk Management Specialist',
    ],
  },
  {
    group: 'Engineering',
    options: [
      'Civil Engineer / Structural Engineer',
      'Project Engineer / Construction Manager',
      'Electrical & Electronics Engineer (Power / Telecommunication)',
      'Mechanical Engineer',
      'Textile Engineer / Fabric Specialist',
      'Architect / Urban Planner',
      'Interior Designer / Architect',
      'Industrial & Production Engineer (IPE)',
      'Chemical / Petroleum Engineer',
      'Marine Engineer / Ship Navigator',
      'Aeronautical / Aerospace Engineer',
    ],
  },
  {
    group: 'Business, Trade & Entrepreneurship',
    options: [
      'Business Owner / Managing Director',
      'Entrepreneur / Startup Founder',
      'Industrialist / Factory Owner',
      'Import / Export Merchant',
      'Garments & Buying House Owner / Director',
      'Wholesale & Retail Distributor',
      'Real Estate Developer / Builder',
      'E-commerce Business Owner',
    ],
  },
  {
    group: 'Corporate Management & Private Sector',
    options: [
      'Corporate Executive (MNC / Conglomerate)',
      'Marketing & Brand Manager',
      'Sales & Business Development Manager',
      'Supply Chain & Procurement Manager',
      'Human Resources (HR) Manager',
      'Merchandiser (Garments / RMG Sector)',
      'Public Relations (PR) & Communications Manager',
      'Operations & Logistics Manager',
    ],
  },
  {
    group: 'Education, Teaching & Research',
    options: [
      'University Professor / Associate Professor',
      'University Lecturer / Assistant Professor',
      'College / High School Teacher',
      'English Medium School Teacher',
      'Research Scientist / Post-Doctoral Fellow',
      'Education Consultant / Counselor',
    ],
  },
  {
    group: 'Law & Legal Profession',
    options: [
      'Advocate (Supreme Court of Bangladesh)',
      'Advocate (District & Sessions Judge Court)',
      'Barrister-at-Law (Lincoln\'s Inn / Gray\'s Inn)',
      'Corporate Legal Advisor / In-House Counsel',
      'Legal Consultant / Arbitrator',
    ],
  },
  {
    group: 'Aviation, Marine & Hospitality',
    options: [
      'Commercial Airline Pilot (Captain / First Officer)',
      'Flight Dispatcher / Aviation Operations',
      'Merchant Marine Officer (Captain / Chief Engineer)',
      'Hotel & Resort General Manager',
      'Tourism & Travel Executive',
    ],
  },
  {
    group: 'Media, Journalism & Creative Arts',
    options: [
      'Journalist / News Reporter / Correspondent',
      'News Presenter / Broadcast Anchor',
      'Creative Director / Art Director',
      'Digital Content Creator / Video Producer',
      'Graphic Designer / Animator',
      'Author / Content Writer / Editor',
    ],
  },
  {
    group: 'Islamic Scholarship & Religious Services',
    options: [
      'Islamic Scholar / Muhaddis / Mufti',
      'Khatib / Imam (Central Mosque)',
      'Madrasah Lecturer / Professor',
      'Islamic Banking Shari\'ah Advisor',
    ],
  },
  {
    group: 'Overseas & Remote Freelance',
    options: [
      'Expatriate Professional (Working Abroad)',
      'Global Remote Worker (US / European Tech Firm)',
      'Full-Time Top Rated Freelancer (Upwork / Fiverr / Direct Clients)',
    ],
  },
  {
    group: 'Other Professions',
    options: [
      'Other Profession (Specify below)',
    ],
  },
];
