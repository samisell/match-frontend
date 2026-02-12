import type { HowItWorksStep, WhyChooseUsPoint, SuccessStory, PricingPlan, Testimonial, UserProfile, AdminMessage } from '@/lib/types';
import { FileText, UserCheck, Heart, Users, ShieldCheck, LayoutGrid, MessageSquare, Settings } from 'lucide-react';

export const navItems = [
  { title: 'Home', href: '/' },
  { title: 'How It Works', href: '/how-it-works' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: 'Submit Your Profile',
    description: 'Create a detailed, private profile focusing on your personality, values, and relationship goals.',
    icon: FileText,
  },
  {
    title: 'Expert Review',
    description: 'Our experienced matchmakers carefully review your profile to understand what you\'re looking for.',
    icon: UserCheck,
  },
  {
    title: 'Manual Matching',
    description: 'We thoughtfully hand-pick potential matches based on deep compatibility, not algorithms.',
    icon: Users,
  },
  {
    title: 'Receive Your Match',
    description: 'Get notified when we find a highly compatible match. You can view their profile in your private dashboard.',
    icon: Heart,
  },
];

export const whyChooseUsPoints: WhyChooseUsPoint[] = [
    {
        title: 'Manual Vetting',
        description: 'Every profile is reviewed by a real person to ensure quality and authenticity.',
        icon: UserCheck,
    },
    {
        title: 'Privacy-Focused',
        description: 'Your profile is only visible to our team and your hand-picked matches. No public browsing.',
        icon: ShieldCheck,
    },
    {
        title: 'For Serious Relationships',
        description: 'Our community is for individuals committed to finding a genuine, long-term partnership.',
        icon: Heart,
    }
];

export const successStories: SuccessStory[] = [
  {
    names: 'Jessica & Tom',
    matchedDate: 'June 2023',
    quote: 'The personal touch made all the difference. We were matched on values we both hold dear. Thank you, HeartCraft!',
    imageId: 'success-1',
  },
  {
    names: 'Maria & David',
    matchedDate: 'September 2023',
    quote: 'We were both tired of the dating app scene. HeartCraft introduced us in a thoughtful way that felt natural and right.',
    imageId: 'success-2',
  },
  {
    names: 'Chloe & Ben',
    matchedDate: 'November 2023',
    quote: 'Our matchmaker saw a connection we might have missed online. We\'re now engaged!',
    imageId: 'success-3',
  },
];

export const pricingPlans: PricingPlan[] = [
    {
        title: 'Discovery',
        description: 'Start your journey',
        price: 99,
        period: 'month',
        features: ['Detailed Profile Submission', 'Expert Profile Review', 'Consideration for Matches', 'Access to Dashboard'],
    },
    {
        title: 'Connection',
        description: 'Our most popular plan',
        price: 249,
        period: 'month',
        features: ['All features in Discovery, plus:', 'Guaranteed Match Introductions', 'Personalized Feedback from Matchmaker', 'Priority Profile Status'],
        featured: true,
    },
    {
        title: 'Partnership',
        description: 'A dedicated experience',
        price: 499,
        period: 'month',
        features: ['All features in Connection, plus:', 'Dedicated Personal Matchmaker', 'Curated Date Ideas & Planning', 'Monthly Progress Review'],
    }
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah L.',
    info: 'Matched Member',
    quote: 'HeartCraft\'s approach is a breath of fresh air. It felt safe, personal, and genuinely focused on my happiness. I met someone wonderful.',
    imageId: 'testimonial-1',
  },
  {
    name: 'Mark D.',
    info: 'Matched Member',
    quote: 'I appreciated the professionalism and privacy. It\'s a service for adults who are serious about finding a partner. Highly recommend.',
    imageId: 'testimonial-2',
  },
  {
    name: 'Emily R.',
    info: 'Matched Member',
    quote: 'The quality of matches was exceptional. It was clear they actually read my profile and understood what I was looking for.',
    imageId: 'testimonial-3',
  },
];

export const featuredProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Alex',
    age: 34,
    location: 'New York, NY',
    quote: 'Loves hiking, exploring new cuisines, and deep conversations.',
    imageId: 'profile-1',
  },
  {
    id: '2',
    name: 'Ben',
    age: 29,
    location: 'San Francisco, CA',
    quote: 'A creative soul who enjoys live music, art museums, and weekend getaways.',
    imageId: 'profile-2',
  },
  {
    id: '3',
    name: 'Catherine',
    age: 32,
    location: 'Chicago, IL',
    quote: 'Passionate about literature, volunteering, and her golden retriever.',
    imageId: 'profile-3',
  },
  {
    id: '4',
    name: 'Diana',
    age: 28,
    location: 'Austin, TX',
    quote: 'An entrepreneur with a love for adventure, yoga, and spicy food.',
    imageId: 'profile-4',
  },
  {
    id: '5',
    name: 'Ethan',
    age: 36,
    location: 'Miami, FL',
    quote: 'Architect by day, sailor by weekend. Looking for a partner in crime.',
    imageId: 'profile-5',
  },
];

export const userDashboard = {
  profileStatus: 'Matched',
  matchCount: 1,
  notifications: 2,
};

export const loggedInUser: UserProfile = {
  id: 'current-user',
  name: 'Jane Doe',
  age: 31,
  location: 'Los Angeles, CA',
  imageId: 'user-avatar',
  quote: 'Seeking a genuine connection built on trust and laughter.',
  status: 'Matched',
  profileSummary: 'I am a compassionate and driven graphic designer who finds joy in creativity, both in my work and personal life. I love spending weekends exploring local art galleries, trying new recipes, and unwinding with a good book. My friends would describe me as loyal, witty, and a great listener. I value open communication and emotional intelligence in a partner.',
  interests: ['Art & Design', 'Cooking', 'Reading', 'Hiking', 'Live Music'],
  education: 'BFA in Graphic Design, University of Arts',
  occupation: 'Senior Graphic Designer'
};

export const userMatches: UserProfile[] = [
  {
    id: 'match-1',
    name: 'John Smith',
    age: 35,
    location: 'Los Angeles, CA',
    imageId: 'profile-2',
    quote: 'Engineer with a passion for the outdoors and building things.',
    status: 'Matched',
    profileSummary: 'As an engineer, I\'m naturally curious about how things work, and that extends to people and relationships. I\'m an avid rock climber and camper, always looking for the next adventure. In my downtime, I enjoy woodworking and hosting board game nights with friends. I\'m looking for a partner who is independent, kind, and isn\'t afraid to get their hands dirty.',
    interests: ['Rock Climbing', 'Camping', 'Woodworking', 'Board Games', 'Technology'],
    education: 'MS in Mechanical Engineering, State University',
    occupation: 'Mechanical Engineer'
  },
];

export const adminMessages: AdminMessage[] = [
    {
        id: 'msg-1',
        title: 'Welcome to HeartCraft!',
        content: 'We are thrilled to have you join our community. Our team is now carefully reviewing your profile. We will reach out if we have any questions. Please expect an update within 3-5 business days.',
        date: '2024-05-20T10:00:00Z',
        read: false,
    },
    {
        id: 'msg-2',
        title: 'We have a potential match for you!',
        content: 'Hi Jane, after careful consideration, we believe we have found an exceptional match for you. Please navigate to your "Matches" page to view the profile of John Smith. We are excited about this potential connection and look forward to hearing your thoughts.',
        date: '2024-05-25T15:30:00Z',
        read: false,
    },
     {
        id: 'msg-3',
        title: 'Next Steps',
        content: 'We recommend taking some time to review John\'s profile. When you are ready, you can indicate your interest. Should you both wish to proceed, we will facilitate the exchange of contact information. Best of luck!',
        date: '2024-05-25T15:35:00Z',
        read: true,
    }
];

export const dashboardNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'My Profile', href: '/dashboard/profile', icon: FileText },
    { title: 'My Matches', href: '/dashboard/matches', icon: Heart },
    { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { title: 'Settings', href: '/dashboard/settings', icon: Settings },
];
