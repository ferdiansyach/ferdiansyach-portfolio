export interface TranslatedText {
  id: string;
  en: string;
}

export interface Project {
  slug: string;
  title: string;
  description: TranslatedText;
  longDescription: TranslatedText;
  challenges: TranslatedText;
  technologies: string[];
  category: "webdev" | "datascience" | "wordpress";
  thumbnail: string;
  images: { src: string; caption: TranslatedText }[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  role: TranslatedText;
  company: string;
  type?: string; // e.g. "Internship" | "Freelance" | "Student Organization"
  location?: string; // e.g. "Jakarta, ID"
  period: string;
  isCurrent?: boolean;
  bullets: TranslatedText[];
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
  proficiency: "beginner" | "intermediate" | "advanced";
  isLearning?: boolean;
}

export interface SkillCategory {
  title: TranslatedText;
  skills: Skill[];
}

export interface Education {
  institution: string;
  degree: TranslatedText;
  period: string;
  gpa?: string;
  thesis?: TranslatedText;
  courses?: TranslatedText[];
}

export interface Certification {
  id: string;
  name: TranslatedText;
  issuer: string;
  issuerLogo?: string;
  date: string;
  credentialUrl?: string;
  category: "technical" | "cloud" | "methodology" | "data";
  badge?: string;
}

export interface Testimonial {
  id: string;
  quote: TranslatedText;
  name: string;
  role: TranslatedText;
  company: string;
  avatar?: string;
}

export type Language = "id" | "en";
export type Theme = "dark" | "light";
