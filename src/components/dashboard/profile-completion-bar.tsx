'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { calculateCompletion, getIncompleteSteps } from '@/services/profile-completion.service';
import { preferenceService } from '@/services/preference.service';
import { Preference } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function ProfileCompletionBar() {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState<Preference | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrefs = async () => {
            try {
                const prefs = await preferenceService.getPreferences();
                if (prefs && prefs.length > 0) {
                    setPreferences(prefs[0]);
                }
            } catch (error) {
                console.error('Failed to fetch preferences for progress bar:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPrefs();
        }
    }, [user]);

    if (!user || loading) return null;

    const percentage = calculateCompletion(user, preferences);
    const incompleteSteps = getIncompleteSteps(user, preferences);

    if (percentage >= 100) return null;

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                        <CardDescription className="text-xs">
                            Complete your profile to get better matches.
                        </CardDescription>
                    </div>
                    <span className="text-sm font-bold text-primary">{percentage}%</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Progress value={percentage} className="h-2" />

                <div className="space-y-2">
                    {incompleteSteps.map((step, index) => (
                        <Link
                            key={index}
                            href={step.includes('dating preferences') ? '/dashboard/settings' : '/dashboard/profile'}
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <AlertCircle className="h-3 w-3 text-amber-500" />
                            <span>{step}</span>
                            <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
