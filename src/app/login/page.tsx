'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (!user?.email_verified_at || user?.is_verified === false) {
        const email = user?.email ? `?email=${encodeURIComponent(user.email)}` : ''
        router.replace(`/verify-email${email}`)
      } else {
        router.replace('/dashboard')
      }
    }
  }, [isLoading, isAuthenticated, user, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login({ email: values.email, password: values.password });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error?.response?.data?.message || 'Invalid credentials or server error.',
      });
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
          <CardTitle className="text-2xl font-bold font-headline">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <div />
                <Button variant="link" asChild className="px-0 h-auto">
                  <Link href="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting || isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging In...
                  </span>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
