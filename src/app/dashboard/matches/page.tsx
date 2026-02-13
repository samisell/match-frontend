'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Search } from 'lucide-react';
import { matchService } from '@/services/match.service';
import { Match, User } from '@/types';
import { Badge } from '@/components/ui/badge';

// Extending Match for UI purposes if it doesn't already have user data nested
interface ExtendedMatch extends Match {
  matched_user?: User;
}

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

const MatchDetailModal = ({ match }: { match: ExtendedMatch }) => {
  const user = match.matched_user;
  if (!user) return null;

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="font-headline text-3xl">{user.name}{user.age ? `, ${user.age}` : ''}</DialogTitle>
        <DialogDescription>{user.location || 'Location Not Set'}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative w-full sm:w-48 h-64 sm:h-64 shrink-0 rounded-lg overflow-hidden bg-muted">
            {/* Assuming first photo if multiple, or just fallback if URL not present */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {user.name.charAt(0)}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-semibold text-sm">Occupation</h3>
              <p className="text-muted-foreground text-sm">{user.occupation || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Education</h3>
              <p className="text-muted-foreground text-sm">{user.education || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">About {user.name.split(' ')[0]}</h3>
              <p className="text-muted-foreground text-sm">{user.profile_summary || user.bio || 'No summary available.'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Interests</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.interests?.map(interest => (
                  <Badge key={interest} variant="secondary" className="text-[10px]">{interest}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Card className="bg-secondary/50 border-none shadow-none">
          <CardHeader className="py-3">
            <CardTitle className="text-md font-headline">A Note From Your Matchmaker</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <p className="text-sm text-muted-foreground italic">
              "{match.matchmaker_note || 'We believe you two would be a great fit based on your shared interests and values.'}"
            </p>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );
};


export default function MatchesPage() {
  const [matches, setMatches] = useState<ExtendedMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await matchService.getMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <div className="p-10 text-center">Finding matches...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">My Matches</h1>
        <div className="flex items-center text-red-500">
          <Heart className="mr-2 h-5 w-5" />
          <span className="font-semibold">{matches.length} Match{matches.length !== 1 && 'es'}</span>
        </div>
      </div>

      {matches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <Dialog key={match.id}>
              <Card className="overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative aspect-[4/5] w-full bg-muted flex items-center justify-center text-4xl text-muted-foreground">
                  {match.matched_user?.name.charAt(0) || 'M'}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="font-headline">{match.matched_user?.name || `Match #${match.id}`}{match.matched_user?.age ? `, ${match.matched_user.age}` : ''}</CardTitle>
                  <CardDescription>{match.matched_user?.location || 'Location Hidden'}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pb-2">
                  <p className="text-sm text-muted-foreground italic line-clamp-3">"{match.matched_user?.quote || 'Looking for something meaningful.'}"</p>
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

