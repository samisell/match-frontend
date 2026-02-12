export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  // Profile fields
  age?: number;
  location?: string;
  occupation?: string;
  education?: string;
  quote?: string;
  profile_summary?: string;
  interests?: string[];
}

export interface Photo {
  id: number;
  user_id: number;
  image_url: string;
  caption?: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Preference {
  id: number;
  user_id: number;
  age_min: number;
  age_max: number;
  location_radius_km: number;
  desired_interests: string[];
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: number;
  user_id: number;
  matched_user_id: number;
  status: 'proposed' | 'accepted' | 'declined';
  matchmaker_note?: string;
  matched_at: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  user_id: number;
  title: string;
  content: string;
  is_read: boolean;
  sent_at: string;
  created_at: string;
  updated_at: string;
}