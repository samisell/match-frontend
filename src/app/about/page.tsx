import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  { name: 'Jane Doe', role: 'Founder & Lead Matchmaker', imageId: 'testimonial-1' },
  { name: 'John Smith', role: 'Head of Member Experience', imageId: 'testimonial-2' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-secondary/50 py-20 text-center">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">About HeartCraft</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We are dedicated to fostering genuine connections through a thoughtful, human-first approach to matchmaking.
            </p>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  In a world of fleeting connections, HeartCraft stands for depth, authenticity, and lasting love. Our mission is to move beyond algorithms and bring back the human element to matchmaking. We believe that true compatibility is found in shared values, life goals, and the intangible spark that only human intuition can recognize.
                </p>
                <p className="text-muted-foreground text-lg">
                  We are committed to creating a safe, private, and supportive environment for individuals who are serious about finding a life partner.
                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                {PlaceHolderImages.find(p => p.id === 'about-mission') && (
                  <Image
                    src={PlaceHolderImages.find(p => p.id === 'about-mission')!.imageUrl}
                    alt={PlaceHolderImages.find(p => p.id === 'about-mission')!.description}
                    fill
                    className="object-cover"
                    data-ai-hint={PlaceHolderImages.find(p => p.id === 'about-mission')!.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Why Manual Matchmaking Section */}
        <section className="bg-secondary/50 py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">The HeartCraft Difference</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Why do we insist on manual matchmaking? Because you are not a data point.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="mx-auto h-10 w-10 text-primary mb-4" />
                  <CardTitle className="font-headline">Empathy & Intuition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our matchmakers use their experience and intuition to understand the nuances of your personality that algorithms miss.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Shield className="mx-auto h-10 w-10 text-primary mb-4" />
                  <CardTitle className="font-headline">Uncompromising Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your profile is never public. It's shared only with hand-selected matches, ensuring complete confidentiality.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Users className="mx-auto h-10 w-10 text-primary mb-4" />
                  <CardTitle className="font-headline">A Curated Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We manually vet every member, ensuring a community of like-minded individuals genuinely seeking commitment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline">Our Team</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        The people dedicated to helping you find your person.
                    </p>
                </div>
                <div className="flex justify-center gap-8 md:gap-16">
                    {teamMembers.map(member => (
                        <div key={member.name} className="text-center">
                            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                                <AvatarImage src={PlaceHolderImages.find(p => p.id === member.imageId)?.imageUrl} alt={member.name} />
                                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </div>
                 <div className="relative mt-12 h-80 rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
                    {PlaceHolderImages.find(p => p.id === 'about-team') && (
                    <Image
                        src={PlaceHolderImages.find(p => p.id === 'about-team')!.imageUrl}
                        alt={PlaceHolderImages.find(p => p.id === 'about-team')!.description}
                        fill
                        className="object-cover"
                        data-ai-hint={PlaceHolderImages.find(p => p.id === 'about-team')!.imageHint}
                    />
                    )}
              </div>
            </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-secondary/50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline">Begin Your Story With Us</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Take the first step towards a more intentional and meaningful way of finding love.
            </p>
            <Button asChild size="lg">
              <Link href="/register">Join HeartCraft Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
