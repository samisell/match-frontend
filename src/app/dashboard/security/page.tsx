'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function SecurityPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (password !== passwordConfirmation) {
            toast({
                variant: 'destructive',
                title: 'Passwords do not match',
                description: 'New password and confirmation must be the same.',
            });
            return;
        }

        setLoading(true);
        try {
            const data = {
                current_password: currentPassword,
                password: password,
                password_confirmation: passwordConfirmation,
            };

            const response = await authService.changePassword(data);

            toast({
                title: 'Success',
                description: response.message || 'Your password has been updated successfully.',
            });

            // Clear the form
            setCurrentPassword('');
            setPassword('');
            setPasswordConfirmation('');
        } catch (error: any) {
            console.error('Password change failed:', error);
            toast({
                variant: 'destructive',
                title: 'Failed to Change Password',
                description: error.response?.data?.message || 'Please check your current password and try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="p-10 text-center">
                <Loader2 className="animate-spin inline-block mr-2" /> Loading security settings...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-headline">Account Security</h1>
            </div>

            <div className="grid gap-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password to keep your account secure.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleChangePassword}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current_password">Current Password</Label>
                                <Input
                                    id="current_password"
                                    name="current_password"
                                    type="password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter your current password"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password (min. 8 characters)"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder="Re-enter new password"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Update Password
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
