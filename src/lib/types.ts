import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type HowItWorksStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type WhyChooseUsPoint = {
  title: string;
  description:string;
  icon: LucideIcon;
};

export type SuccessStory = {
  names: string;
  matchedDate: string;
  quote: string;
  imageId: string;
};

export type PricingPlan = {
  title: string;
  description: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  featured?: boolean;
};

export type Testimonial = {
  name: string;
  info: string;
  quote: string;
  imageId: string;
};

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  location: string;
  quote: string;
  imageId: string;
  status?: 'Under Review' | 'Matched' | 'Active';
  profileSummary?: string;
  interests?: string[];
  education?: string;
  occupation?: string;
};

export type AdminMessage = {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
};
