'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/shared/logo';
import { authService } from '@/services/auth.service';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    password_confirmation: z.string().min(8, { message: 'Please confirm your password.' }),
    token: z.string().min(1, { message: 'Reset token is missing.' }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const email = searchParams.get('email') || '';
    const token = searchParams.get('token') || '';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email,
            password: '',
            password_confirmation: '',
            token: token,
        },
    });

    // Update form if search params change
    useEffect(() => {
        if (email) form.setValue('email', email);
        if (token) form.setValue('token', token);
    }, [email, token, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            await authService.resetPassword(values);
            setIsSuccess(true);
            toast({
                title: 'Password reset successful',
                description: 'Your password has been updated. You can now log in.',
            });
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error: any) {
            console.error('Reset password error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to reset password. The link may have expired.';
            toast({
                variant: 'destructive',
                title: 'Error',
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (!token) {
        return (
            <div className="text-center space-y-4">
                <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
                    Reset token is missing or invalid. Please request a new link.
                </div>
                <Button asChild className="w-full">
                    <Link href="/forgot-password">Request New Link</Link>
                </Button>
            </div>
        );
    }

    return (
        <>
            {isSuccess ? (
                <div className="space-y-4">
                    <div className="text-center text-sm text-green-600 p-4 bg-green-50 rounded-md">
                        Your password has been successfully reset. Redirecting to login...
                    </div>
                    <Button asChild className="w-full">
                        <Link href="/login">Go to Login Now</Link>
                    </Button>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} disabled={true} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <input type="hidden" {...form.register('token')} />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Reset Password
                        </Button>
                    </form>
                </Form>
            )}
        </>
    );
}

export default function PasswordResetPage() {
    return (
        <div
            className="relative flex min-h-screen items-center justify-center bg-cover bg-center p-4"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2544&auto=format&fit=crop')" }}
        >
            <div className="absolute inset-0 bg-black/40" />
            <Card className="relative z-10 w-full max-w-md shadow-xl border-0 bg-background/95 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <Logo inHeader />
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Reset Password</CardTitle>
                    <CardDescription>
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}>
                        <ResetPasswordForm />
                    </Suspense>
                    <div className="mt-6 text-center text-sm">
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
