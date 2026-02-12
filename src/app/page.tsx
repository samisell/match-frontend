import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Heart, Users, ShieldCheck } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { successStories, howItWorksSteps, whyChooseUsPoints, testimonials, pricingPlans, featuredProfiles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-secondary/50 py-20 md:py-32">
          <div className="absolute inset-0">
             {heroImage && <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-20"
              priority
              data-ai-hint={heroImage.imageHint}
            />}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-4 leading-tight">
              Meaningful Matches. <br /> Curated With Care.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Tired of endless swiping? Discover a new approach to finding love. We personally vet and match profiles based on deep compatibility.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/register">Find a Match</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Your Journey to a Lasting Connection</h2>
              <p className="text-lg text-muted-foreground mt-2">A simple, private, and personalized process.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="text-center border-0 shadow-none bg-transparent">
                    <CardHeader className="flex-col items-center">
                      <div className="mb-4 bg-primary/10 text-primary p-4 rounded-full">
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="font-headline">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">A Different Kind of Dating</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  We built HeartCraft for individuals seeking serious relationships. Our manual, human-centric approach ensures quality, privacy, and genuine compatibility.
                </p>
                <div className="space-y-6">
                  {whyChooseUsPoints.map((point, index) => {
                    const Icon = point.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{point.title}</h3>
                          <p className="text-muted-foreground">{point.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
                {PlaceHolderImages.find(p => p.id === 'why-us') && <Image
                  src={PlaceHolderImages.find(p => p.id === 'why-us')!.imageUrl}
                  alt={PlaceHolderImages.find(p => p.id === 'why-us')!.description}
                  fill
                  className="object-cover"
                  data-ai-hint={PlaceHolderImages.find(p => p.id === 'why-us')!.imageHint}
                />}
              </div>
            </div>
          </div>
        </section>
        
        {/* Matches Carousel Section */}
        {featuredProfiles.length > 0 && (
          <section id="featured-profiles" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet Our Members</h2>
                <p className="text-lg text-muted-foreground mt-2">A glimpse into the quality individuals in the HeartCraft community.</p>
              </div>
              <Carousel opts={{ loop: true }} className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {featuredProfiles.map((profile, index) => {
                    const profileImage = PlaceHolderImages.find(p => p.id === profile.imageId);
                    return (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card className="overflow-hidden h-full flex flex-col">
                          <CardHeader className="p-0">
                            <div className="relative aspect-[4/3] w-full">
                              {profileImage && <Image
                                src={profileImage.imageUrl}
                                alt={profileImage.description}
                                fill
                                className="object-cover"
                                data-ai-hint={profileImage.imageHint}
                              />}
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 flex-grow">
                            <h3 className="text-xl font-bold font-headline">{profile.name}, {profile.age}</h3>
                            <p className="text-muted-foreground">{profile.location}</p>
                            <p className="mt-2 text-sm italic">"{profile.quote}"</p>
                          </CardContent>
                          <CardFooter>
                              <Button variant="link" className="p-0">
                                <Link href="/register">Learn More & Join</Link>
                              </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  )})}
                </CarouselContent>
                <CarouselPrevious className="hidden md:inline-flex" />
                <CarouselNext className="hidden md:inline-flex" />
              </Carousel>
            </div>
          </section>
        )}

        {/* Featured Success Stories */}
        <section id="success-stories" className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Love Stories from HeartCraft</h2>
              <p className="text-lg text-muted-foreground mt-2">Real couples who found their match through our curated process.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => {
                const storyImage = PlaceHolderImages.find(p => p.id === story.imageId);
                return (
                <Card key={index} className="overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  {storyImage && <div className="aspect-video relative">
                    <Image
                      src={storyImage.imageUrl}
                      alt={storyImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={storyImage.imageHint}
                    />
                  </div>}
                  <CardHeader>
                    <CardTitle className="font-headline">{story.names}</CardTitle>
                    <CardDescription>Matched on {story.matchedDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{story.quote}"</p>
                  </CardContent>
                </Card>
              )})}
            </div>
          </div>
        </section>

        {/* Membership / Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Invest in a Real Relationship</h2>
              <p className="text-lg text-muted-foreground mt-2">
                Our pricing reflects the personalized, high-touch service we provide. No hidden fees, just a clear path to finding your partner.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`flex flex-col ${plan.featured ? 'border-primary ring-2 ring-primary shadow-2xl' : ''}`}>
                  {plan.featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-bold">Most Popular</Badge>}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-center mb-6">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <ul className="space-y-4">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className={`w-full font-bold ${plan.featured ? '' : 'bg-primary/80'}`} variant={plan.featured ? 'default' : 'secondary'}>
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">What Our Members Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={PlaceHolderImages.find(p => p.id === testimonial.imageId)?.imageUrl} alt={testimonial.name} data-ai-hint={PlaceHolderImages.find(p => p.id === testimonial.imageId)?.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.info}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center shadow-lg">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Ready to Find The One?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg opacity-80">
                Your journey towards a meaningful, long-lasting relationship starts here. Let us help you write your love story.
              </p>
              <Button asChild size="lg" variant="secondary" className="font-bold text-secondary-foreground">
                <Link href="/register">Start Your Profile Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
