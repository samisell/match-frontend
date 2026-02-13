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
import { Loader2 } from 'lucide-react';

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

  if (!user) return <div className="p-10 text-center"><Loader2 className="animate-spin inline-block mr-2" /> Loading settings...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>

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
            <CardDescription>Manage your account settings.</CardDescription>
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

