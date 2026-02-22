'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { preferenceService } from '@/services/preference.service';
import { Preference } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Users, Ruler, Activity, GraduationCap, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<Preference | null>(null);
  const [loadingPref, setLoadingPref] = useState(true);
  const [savingPref, setSavingPref] = useState(false);

  useEffect(() => {
    const fetchPrefs = async () => {
      if (!user) return;
      try {
        // Preference service usually has a way to get the current user's preference
        // Based on frontend.md: GET /preferences/{id}
        // But we might need GET /preferences for list and filter client-side if no specific "my preference" endpoint.
        // Assuming user.id matches preference ownership.
        const allPrefs = await preferenceService.getPreferences();
        const myPref = allPrefs.find(p => p.user_id === user.id);
        if (myPref) {
          setPreferences(myPref);
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      } finally {
        setLoadingPref(false);
      }
    };
    fetchPrefs();
  }, [user]);

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSavingPref(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        age_min: parseInt(formData.get('age_min') as string),
        age_max: parseInt(formData.get('age_max') as string),
        location_radius_km: parseInt(formData.get('location_radius_km') as string),
        desired_interests: (formData.get('desired_interests') as string).split(',').map(s => s.trim()).filter(Boolean),
        gender_preference: formData.get('gender_preference') as string,
        height_min: formData.get('height_min') as string,
        height_max: formData.get('height_max') as string,
        preferred_body_types: (formData.get('preferred_body_types') as string).split(',').map(s => s.trim()).filter(Boolean),
        smoking_preference: formData.get('smoking_preference') as string,
        drinking_preference: formData.get('drinking_preference') as string,
        drugs_preference: formData.get('drugs_preference') as string,
        religion_preference: formData.get('religion_preference') as string,
        education_level_preference: formData.get('education_level_preference') as string,
      };

      if (preferences) {
        await preferenceService.updatePreference(preferences.id, data);
      } else {
        await preferenceService.createPreference({ ...data, user_id: user.id });
      }

      toast({
        title: 'Preferences Saved',
        description: 'Your dating preferences have been updated.',
      });
    } catch (error) {
      console.error('Save failed:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Save',
        description: 'Could not update your preferences.',
      });
    } finally {
      setSavingPref(false);
    }
  };

  if (!user) return <div className="p-10 text-center"><Loader2 className="animate-spin inline-block mr-2" /> Loading dating preferences...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dating Preferences</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dating Preferences</CardTitle>
            <CardDescription>Customize who you'd like to meet.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSavePreferences}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age_min">Min Age</Label>
                  <Input id="age_min" name="age_min" type="number" defaultValue={preferences?.age_min || 18} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age_max">Max Age</Label>
                  <Input id="age_max" name="age_max" type="number" defaultValue={preferences?.age_max || 99} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location_radius_km">Location Radius (km)</Label>
                <Input id="location_radius_km" name="location_radius_km" type="number" defaultValue={preferences?.location_radius_km || 50} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desired_interests">Desired Interests (comma separated)</Label>
                <Input id="desired_interests" name="desired_interests" defaultValue={preferences?.desired_interests?.join(', ') || ''} placeholder="e.g. Travel, Music, Art" />
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Partner Basics</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender_preference">Gender Preference</Label>
                  <Select name="gender_preference" defaultValue={preferences?.gender_preference || 'both'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Interested in..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Physical Preferences</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height_min">Min Height</Label>
                    <Input id="height_min" name="height_min" defaultValue={preferences?.height_min || ''} placeholder="e.g. 5ft 5in" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height_max">Max Height</Label>
                    <Input id="height_max" name="height_max" defaultValue={preferences?.height_max || ''} placeholder="e.g. 6ft 5in" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred_body_types">Preferred Body Types (comma separated)</Label>
                  <Input id="preferred_body_types" name="preferred_body_types" defaultValue={preferences?.preferred_body_types?.join(', ') || ''} placeholder="e.g. Athletic, Slim, Average" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Lifestyle Preferences</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smoking_preference">Smoking</Label>
                    <Select name="smoking_preference" defaultValue={preferences?.smoking_preference || 'no'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Non-smoker</SelectItem>
                        <SelectItem value="occasionally">Occasionally OK</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drinking_preference">Drinking</Label>
                    <Select name="drinking_preference" defaultValue={preferences?.drinking_preference || 'socially'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Non-drinker</SelectItem>
                        <SelectItem value="socially">Socially OK</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drugs_preference">Drugs</Label>
                    <Select name="drugs_preference" defaultValue={preferences?.drugs_preference || 'no'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Never</SelectItem>
                        <SelectItem value="occasionally">Occasionally OK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Other Preferences</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="religion_preference" className="flex items-center gap-2">Religion</Label>
                    <Input id="religion_preference" name="religion_preference" defaultValue={preferences?.religion_preference || ''} placeholder="Preferred faith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education_level_preference" className="flex items-center gap-2">Education</Label>
                    <Input id="education_level_preference" name="education_level_preference" defaultValue={preferences?.education_level_preference || ''} placeholder="e.g. College Degree" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button type="submit" disabled={savingPref}>
                {savingPref && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Preferences
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} disabled />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button variant="outline" onClick={() => logout()}>Log Out</Button>
          </CardFooter>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Manage your account status and data.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <Button variant="destructive">Delete My Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

