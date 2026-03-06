export type SectionId =
  | 'personalInfo'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certificates'
  | 'projects'
  | 'links'
  | 'interests'
  | 'references'
  | 'customSections';

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  profileImage?: string;
}

export interface BaseItem {
  id: string;
}

export interface ExperienceItem extends BaseItem {
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  achievements: string[];
}

export interface EducationItem extends BaseItem {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  details?: string;
}

export interface SkillItem extends BaseItem {
  name: string;
  level: 'Podstawowy' | 'Średniozaawansowany' | 'Zaawansowany' | 'Ekspert';
}

export interface LanguageItem extends BaseItem {
  name: string;
  level: string;
}

export interface CertificateItem extends BaseItem {
  name: string;
  issuer: string;
  year?: string;
}

export interface ProjectItem extends BaseItem {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface LinkItem extends BaseItem {
  label: string;
  url: string;
}

export interface InterestItem extends BaseItem {
  name: string;
}

export interface ReferenceItem extends BaseItem {
  name: string;
  contact: string;
  note?: string;
}

export interface CustomSectionItem extends BaseItem {
  sectionTitle: string;
  content: string;
}

export interface AppearanceSettings {
  template: 'modern' | 'classic' | 'minimal';
  accentColor: string;
  fontFamily: 'Inter' | 'Georgia' | 'Arial';
  layout: 'one-column' | 'two-column';
  spacing: 'compact' | 'normal' | 'comfortable';
  showProfileImage: boolean;
  zoom: number;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certificates: CertificateItem[];
  projects: ProjectItem[];
  links: LinkItem[];
  interests: InterestItem[];
  references: ReferenceItem[];
  customSections: CustomSectionItem[];
  settings: AppearanceSettings;
  sectionOrder: SectionId[];
  visibilitySettings: Record<SectionId, boolean>;
}
