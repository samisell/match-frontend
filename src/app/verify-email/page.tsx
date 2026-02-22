'use client';

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
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
    code: z.string().min(6, { message: 'Verification code must be at least 6 characters.' }),
});

function VerifyEmailForm() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const email = searchParams.get('email'); // Optional context if available
    const { isAuthenticated, refreshUser } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!email) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Email address is missing. Please return to the forgot password page.',
            });
            return;
        }

        setIsLoading(true);
        try {
            await authService.verifyEmail(email, values.code);

            toast({
                title: 'Success',
                description: 'OTP verified successfully.',
            });

            if (isAuthenticated) {
                const updatedUser = await refreshUser();
                if (updatedUser?.is_verified) {
                    router.push('/dashboard');
                } else {
                    // Optional: Handle case where refresh fails to confirm verification
                    toast({
                        variant: 'destructive',
                        title: 'Verification Error',
                        description: 'Could not confirm your verification status. Please try logging in again.',
                    });
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }

        } catch (error) {
            console.error('Verification error:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Invalid or expired verification code.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="relative z-10 w-full max-w-md shadow-xl border-0 bg-background/95 backdrop-blur-sm">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                    <Logo inHeader />
                </div>
                <CardTitle className="text-2xl font-bold font-headline">Verify Email</CardTitle>
                <CardDescription>
                    Enter the verification code sent to{email ? ` ${email}` : ' your email'}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123456"
                                            {...field}
                                            disabled={isLoading}
                                            className="text-center text-lg tracking-widest"
                                            maxLength={6}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Verify
                        </Button>
                    </form>
                </Form>
                <div className="mt-6 text-center text-sm">
                    Didn&apos;t receive the code?{' '}
                    <Button
                        variant="link"
                        className="p-0 font-semibold text-primary hover:underline h-auto"
                        disabled={isResending}
                        onClick={async () => {
                            if (!email) {
                                toast({
                                    variant: 'destructive',
                                    title: 'Error',
                                    description: 'Email address is missing.',
                                });
                                return;
                            }
                            try {
                                setIsResending(true);
                                await authService.resendVerification(email);
                                toast({
                                    title: 'Code Sent',
                                    description: 'A new verification code has been sent to your email.',
                                });
                            } catch (error) {
                                toast({
                                    variant: 'destructive',
                                    title: 'Error',
                                    description: 'Could not resend the verification code.',
                                });
                            } finally {
                                setIsResending(false);
                            }
                        }}
                    >
                        {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Resend
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    <Link href="/login" className="text-muted-foreground hover:text-primary">
                        Back to Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function VerifyEmailPage() {
    return (
        <div
            className="relative flex min-h-screen items-center justify-center bg-cover bg-center p-4"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2544&auto=format&fit=crop')" }}
        >
            <div className="absolute inset-0 bg-black/40" />
            <Suspense fallback={
                <Card className="relative z-10 w-full max-w-md shadow-xl border-0 bg-background/95 backdrop-blur-sm p-10 text-center">
                    <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
                    <p className="mt-4 text-muted-foreground">Loading verification...</p>
                </Card>
            }>
                <VerifyEmailForm />
            </Suspense>
        </div>
    );
}
