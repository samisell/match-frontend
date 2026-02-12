import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Search } from 'lucide-react';
import { userMatches, loggedInUser } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

const EmptyState = () => (
  <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
    <Search className="mx-auto h-12 w-12 text-muted-foreground" />
    <h2 className="mt-6 text-xl font-semibold">No Matches Yet</h2>
    <p className="mt-2 text-muted-foreground">
      Our matchmakers are carefully curating the best connections for you.
    </p>
    <p className="mt-1 text-muted-foreground">
      Check back soon, or visit your profile to add more details.
    </p>
    <Button asChild className="mt-6">
      <Link href="/dashboard/profile">Update My Profile</Link>
    </Button>
  </div>
);

const MatchDetailModal = ({ match }: { match: (typeof userMatches)[0] }) => (
    <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
            <DialogTitle className="font-headline text-3xl">{match.name}, {match.age}</DialogTitle>
            <DialogDescription>{match.location}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-48 h-64 sm:h-auto shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src={PlaceHolderImages.find(p => p.id === match.imageId)?.imageUrl || ''}
                        alt={`Profile of ${match.name}`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 space-y-4">
                     <div>
                        <h3 className="font-semibold">Occupation</h3>
                        <p className="text-muted-foreground">{match.occupation}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold">Education</h3>
                        <p className="text-muted-foreground">{match.education}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">About {match.name.split(' ')[0]}</h3>
                        <p className="text-muted-foreground">{match.profileSummary}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Interests</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {match.interests?.map(interest => (
                                <Badge key={interest} variant="secondary">{interest}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-lg font-headline">A Note From Your Matchmaker</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground italic">
                        "We believe {match.name.split(' ')[0]}'s passion for the outdoors and shared value of intellectual curiosity makes them a wonderful potential partner for you, {loggedInUser.name.split(' ')[0]}. We encourage you to connect over your mutual love for adventure!"
                    </p>
                </CardContent>
            </Card>
        </div>
    </DialogContent>
);


export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">My Matches</h1>
        <div className="flex items-center text-red-500">
          <Heart className="mr-2 h-5 w-5" />
          <span className="font-semibold">{userMatches.length} Match{userMatches.length !== 1 && 'es'}</span>
        </div>
      </div>
      
      {userMatches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userMatches.map((match) => (
            <Dialog key={match.id}>
              <Card className="overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={PlaceHolderImages.find(p => p.id === match.imageId)?.imageUrl || ''}
                    alt={`Profile of ${match.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{match.name}, {match.age}</CardTitle>
                  <CardDescription>{match.location}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground italic">"{match.quote}"</p>
                </CardContent>
                <CardFooter>
                  <DialogTrigger asChild>
                    <Button className="w-full">View Full Profile</Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>
              <MatchDetailModal match={match} />
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
}
