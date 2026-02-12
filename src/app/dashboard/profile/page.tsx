'use client';

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
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { loggedInUser } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Camera } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().min(18, { message: 'You must be at least 18.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  occupation: z.string().min(2, { message: 'Occupation is required.' }),
  education: z.string().min(2, { message: 'Education is required.' }),
  quote: z.string().min(10, { message: 'Quote must be at least 10 characters.' }).max(100, { message: 'Quote must be under 100 characters.' }),
  profileSummary: z.string().min(50, { message: 'Summary must be at least 50 characters.' }),
  interests: z.string().refine(val => val.split(',').filter(s => s.trim()).length >= 3, {
    message: "Please list at least 3 interests, separated by commas."
  }),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: loggedInUser.name,
      age: loggedInUser.age,
      location: loggedInUser.location,
      occupation: loggedInUser.occupation,
      education: loggedInUser.education,
      quote: loggedInUser.quote,
      profileSummary: loggedInUser.profileSummary,
      interests: loggedInUser.interests?.join(', ') || '',
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>This is how your profile will appear to our matchmakers. Keep it up to date.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarImage src={PlaceHolderImages.find(p => p.id === loggedInUser.imageId)?.imageUrl} alt={loggedInUser.name} />
                    <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload Photo</span>
                  </Button>
                </div>
                <div className="grid gap-2 flex-grow">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Your age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder="Your job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Input placeholder="Your highest degree and school" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Quote</FormLabel>
                    <FormControl>
                      <Input placeholder="A short, catchy quote for your profile" {...field} />
                    </FormControl>
                    <FormDescription>This is a short tagline that appears on your profile preview.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profileSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself, your passions, and what you're looking for." className="min-h-32" {...field} />
                    </FormControl>
                     <FormDescription>Write a detailed summary. This is the most important part of your profile.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>My Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Hiking, Cooking, Live Music" {...field} />
                    </FormControl>
                    <FormDescription>Separate your interests with a comma. List at least three.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
