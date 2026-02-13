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
import { authService } from '@/services/auth.service';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
});

import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            await authService.forgotPassword(values.email);
            setIsSuccess(true);
            toast({
                title: 'Reset link sent',
                description: 'Check your email for instructions to reset your password.',
            });
            // Redirect to verify-email after a short delay so they can see the success state 
            // OR redirect immediately if we want them to enter OTP. 
            // In an OTP flow, they MUST go to verify-email.
            setTimeout(() => {
                router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
            }, 2000);
        } catch (error) {
            console.error('Forgot password error:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to send reset link. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    }

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
                    <CardTitle className="text-2xl font-bold font-headline">Forgot Password</CardTitle>
                    <CardDescription>
                        {isSuccess
                            ? 'Check your email for a reset link.'
                            : 'Enter your email to receive a password reset link.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSuccess ? (
                        <div className="space-y-4">
                            <div className="text-center text-sm text-muted-foreground p-4 bg-secondary/30 rounded-md">
                                We have sent a password reset link to <strong>{form.getValues('email')}</strong>.
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/login">Return to Login</Link>
                            </Button>
                            <Button variant="ghost" className="w-full" onClick={() => setIsSuccess(false)}>
                                Try a different email
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
                                                <Input type="email" placeholder="your@email.com" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Send Reset Link
                                </Button>
                            </form>
                        </Form>
                    )}
                    <div className="mt-6 text-center text-sm">
                        Remember your password?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
