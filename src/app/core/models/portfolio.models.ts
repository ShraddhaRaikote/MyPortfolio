export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'other';

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  avatar?: string;
  location: string;
  yearsExp: number;
  openToWork: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  image?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  order: number;
}

export interface SiteSettings {
  metaTitle: string;
  metaDescription: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  homeWelcomeText?: string;
  homeStoryEyebrow?: string;
  homeStoryTitle?: string;
  projectsPageTitle?: string;
  contactPageTitle?: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;
}
