import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings and email preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-password">Change Password</Label>
            <Input id="current-password" type="password" placeholder="Current Password" />
            <Input id="new-password" type="password" placeholder="New Password" />
            <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose how we communicate with you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="new-match-email" className="text-base">New Match</Label>
              <p className="text-sm text-muted-foreground">
                Receive an email when we find a new potential match for you.
              </p>
            </div>
            <Switch id="new-match-email" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="message-email" className="text-base">New Message</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your matchmaker sends you a message.
              </p>
            </div>
            <Switch id="message-email" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
             <div className="space-y-0.5">
              <Label htmlFor="newsletter-email" className="text-base">Newsletter & Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive occasional updates, tips, and success stories from HeartCraft.
              </p>
            </div>
            <Switch id="newsletter-email" />
          </div>
        </CardContent>
         <CardFooter className="border-t pt-6">
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Manage your account status and data.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="outline">Pause Account</Button>
            <p className="text-sm text-muted-foreground mt-2">
                Temporarily pause your matching process. You can resume anytime.
            </p>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <Button variant="destructive">Delete My Account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
