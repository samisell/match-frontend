import { User, Preference } from '@/types';

export const calculateCompletion = (user: User | null, preferences: Preference | null): number => {
    if (!user) return 0;

    let score = 0;
    const totalPotential = 100;

    // 1. Profile Basics (40% - 5 items, 8% each)
    if (user.age && user.age >= 18) score += 8;
    if (user.location && user.location.trim().length > 0) score += 8;
    if (user.occupation && user.occupation.trim().length > 0) score += 8;
    if (user.education && user.education.trim().length > 0) score += 8;
    if (user.phone && user.phone.trim().length > 0) score += 8;

    // 2. Profile Depth (30% - 3 items, 10% each)
    if (user.profile_summary && user.profile_summary.trim().length >= 10) score += 10;
    if (user.interests && user.interests.length > 0) score += 10;
    if (user.quote && user.quote.trim().length >= 5) score += 10;

    // 3. Dating Preferences (30% - 3 items, 10% each)
    if (preferences) {
        if (preferences.age_min && preferences.age_max) score += 10;
        if (preferences.location_radius_km && preferences.location_radius_km > 0) score += 10;
        if (preferences.gender_preference && preferences.gender_preference !== 'both' || (preferences.gender_preference === 'both')) score += 10; // gender_preference is usually set
    }

    return Math.min(score, totalPotential);
};

export const getIncompleteSteps = (user: User | null, preferences: Preference | null) => {
    const steps = [];
    if (!user) return ['Connect your account'];

    if (!user.age || !user.location || !user.occupation || !user.education) {
        steps.push('Complete basic profile info');
    }
    if (!user.profile_summary || !user.interests || user.interests.length === 0 || !user.quote) {
        steps.push('Add more detail to your profile (Bio, Interests, Quote)');
    }
    if (!preferences || !preferences.age_min || !preferences.location_radius_km) {
        steps.push('Set your dating preferences');
    }

    return steps;
};
