export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_verified?: boolean;
    age?: number;
    location?: string;
    occupation?: string;
    education?: string;
    quote?: string;
    profile_summary?: string;
    interests?: string[];
    phone?: string;
    height?: string;
    body_type?: string;
    eye_color?: string;
    hair_color?: string;
    smoking?: string;
    drinking?: string;
    drugs?: string;
    dietary_preferences?: string;
    exercise_frequency?: string;
    pet_ownership?: string;
    religion?: string;
    is_admin: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface EmailTemplate {
    id: number;
    name: string;
    subject: string;
    body: string;
    type: string;
    created_at?: string;
    updated_at?: string;
}

export interface Photo {
    id: number;
    user_id: number;
    url: string; // Changed from image_url to match photo.service.ts usage, or need to align.
    // api.ts used image_url. frontend.md didn't specify. photo.service.ts used url. 
    // Let's keep both or alias for safety until verified.
    image_url?: string;
    caption?: string;
    is_primary: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Preference {
    id: number;
    user_id: number;
    age_min: number;
    age_max: number;
    location_radius_km: number;
    desired_interests: string[];
    gender_preference?: string;
    height_min?: string;
    height_max?: string;
    preferred_body_types?: string[];
    smoking_preference?: string;
    drinking_preference?: string;
    drugs_preference?: string;
    religion_preference?: string;
    education_level_preference?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Match {
    id: number;
    user_id: number;
    matched_user_id: number; // match.service.ts used user_id_1/user_id_2. api.ts used matched_user_id.
    // We should align. frontend.md says "Get a specific match". 
    // Standard pivot table usually has user_id_1, user_id_2.
    // Let's add all potential fields to be safe.
    user_id_1?: number;
    user_id_2?: number;

    status: 'proposed' | 'accepted' | 'declined';
    matchmaker_note?: string;
    matched_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    is_read: boolean;
    sent_at?: string;
    created_at?: string;
    updated_at?: string;
    sender?: User;
    receiver?: User;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ChangePasswordData {
    current_password?: string;
    password?: string;
    password_confirmation?: string;
}

export interface AiAnalysisResponse {
    suggested_improvements: string;
}

export interface Notification {
    id: number;
    user_id: number;
    type: string;
    title: string;
    message: string;
    link?: string;
    read_at?: string;
    created_at?: string;
    updated_at?: string;
}
