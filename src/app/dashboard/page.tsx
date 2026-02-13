'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, Clock, Heart, Bell, User as UserIcon, MessageSquare, ArrowRight, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { matchService } from '@/services/match.service';
import { messageService } from '@/services/message.service';
import { Match, Message } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const [matchesData, messagesData] = await Promise.all([
          matchService.getMatches(),
          messageService.getMessages()
        ]);
        setMatches(matchesData);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Matched':
        return <Heart className="h-6 w-6 text-red-500" />;
      case 'Under Review':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      default:
        return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
  };

  if (!user) return <div className="p-10 text-center">Loading user...</div>;

  const unreadCount = messages.filter(m => !m.is_read).length;
  const acceptedMatches = matches.filter(m => m.status === 'accepted').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user.name.split(' ')[0]}!</h1>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/api-test">
            Test API Endpoints
          </Link>
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
            {getStatusIcon('Active')}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Your profile is visible to matchmakers.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Matches</CardTitle>
            <Heart className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matches.length}</div>
            <p className="text-xs text-muted-foreground">{acceptedMatches} Accepted matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Bell className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">New messages waiting for you</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Profile Summary</span>
              <Button asChild variant="secondary" size="sm">
                <Link href="/dashboard/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </CardTitle>
            <CardDescription>This is a preview of how matchmakers see your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg">
                <AvatarFallback className="rounded-lg text-3xl bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold font-headline">{user.name}{user.age ? `, ${user.age}` : ''}</h2>
                <p className="text-muted-foreground">{user.location || 'Location not set'}</p>
                <p className="mt-4 italic">"{user.bio || 'No bio available.'}"</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {user.interests?.map(interest => (
                    <Badge key={interest} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Messages</span>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/messages">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardTitle>
            <CardDescription>Latest communications.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {messages.slice(0, 3).map(message => (
                <li key={message.id}>
                  <Link href="/dashboard/messages" className="block p-3 rounded-lg hover:bg-secondary">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate pr-2">Message #{message.id}</p>
                      {!message.is_read && <span className="h-2 w-2 rounded-full bg-primary shrink-0"></span>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{message.content}</p>
                  </Link>
                </li>
              ))}
              {messages.length === 0 && (
                <li className="text-center py-4 text-xs text-muted-foreground italic">No messages yet.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

