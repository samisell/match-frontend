'use client';

import { useEffect, useState, useRef } from 'react';
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
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/user.service';
import { photoService } from '@/services/photo.service';
import { Photo } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Camera, Loader2, Trash2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().min(18, { message: 'You must be at least 18.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  occupation: z.string().min(2, { message: 'Occupation is required.' }),
  education: z.string().min(2, { message: 'Education is required.' }),
  quote: z.string().min(5, { message: 'Quote must be at least 5 characters.' }).max(100, { message: 'Quote must be under 100 characters.' }),
  profile_summary: z.string().min(10, { message: 'Summary must be at least 10 characters.' }),
  interests: z.string().refine(val => val.split(',').filter(s => s.trim()).length >= 1, {
    message: "Please list at least one interest, separated by commas."
  }),
});

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      age: 18,
      location: '',
      occupation: '',
      education: '',
      quote: '',
      profile_summary: '',
      interests: '',
    },
  });

  const fetchPhotos = async () => {
    try {
      const data = await photoService.getPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  // Load user data into form
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        age: user.age || 18,
        location: user.location || '',
        occupation: user.occupation || '',
        education: user.education || '',
        quote: user.quote || '',
        profile_summary: user.profile_summary || user.bio || '',
        interests: user.interests?.join(', ') || '',
      });
      fetchPhotos();
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    if (!user?.id) return;

    try {
      const payload = {
        ...values,
        interests: values.interests.split(',').map(s => s.trim()).filter(Boolean)
      };

      await userService.updateUser(user.id, payload);
      await refreshUser();

      toast({
        title: 'Profile Updated',
        description: 'Your changes have been saved successfully.',
      });
    } catch (error) {
      console.error('Update failed:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not save your changes. Please try again.',
      });
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingPhoto(true);
    try {
      await photoService.uploadPhoto({
        user_id: user.id,
        photo: file,
        is_primary: photos.length === 0, // Set first photo as primary
      });
      await fetchPhotos();
      toast({
        title: 'Photo Uploaded',
        description: 'Your photo has been added to your profile.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error uploading your photo.',
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    try {
      await photoService.deletePhoto(id);
      setPhotos(photos.filter(p => p.id !== id));
      toast({
        title: 'Photo Deleted',
        description: 'The photo has been removed.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Delete Failed',
        description: 'Could not delete the photo.',
      });
    }
  };

  const handleSetPrimary = async (id: number) => {
    try {
      await photoService.setPrimary(id);
      await fetchPhotos();
      toast({
        title: 'Primary Photo Set',
        description: 'This photo will now be your main profile picture.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to set as primary photo.',
      });
    }
  };

  const primaryPhoto = photos.find(p => p.is_primary) || photos[0];

  if (!user) return <div className="p-10 text-center"><Loader2 className="animate-spin inline-block mr-2" /> Loading profile...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Profile</h1>

      {/* Photo Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Photos</CardTitle>
          <CardDescription>Manage your profile pictures. Your first photo will be your primary.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group border bg-muted">
                <Image
                  src={photo.url || photo.image_url || ''}
                  alt="User photo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between gap-1">
                  {!photo.is_primary && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:text-green-400"
                      onClick={() => handleSetPrimary(photo.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white hover:text-red-400"
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {photo.is_primary && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
                    PRIMARY
                  </div>
                )}
              </div>
            ))}
            <button
              className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center hover:bg-secondary/50 transition-colors disabled:opacity-50"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
            >
              {uploadingPhoto ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-2">Add Photo</span>
                </>
              )}
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
            />
          </div>
        </CardContent>
      </Card>

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
                    {primaryPhoto ? (
                      <AvatarImage src={primaryPhoto.url || primaryPhoto.image_url} />
                    ) : null}
                    <AvatarFallback className="text-3xl bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
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
                name="profile_summary"
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
                    <FormDescription>Separate your interests with a comma.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
