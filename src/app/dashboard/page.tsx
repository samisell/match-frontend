import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Heart, Bell, User, MessageSquare, ArrowRight } from 'lucide-react';
import { loggedInUser, userDashboard, adminMessages } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardPage() {
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Welcome back, {loggedInUser.name.split(' ')[0]}!</h1>
      
      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
            {getStatusIcon(userDashboard.profileStatus)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userDashboard.profileStatus}</div>
            <p className="text-xs text-muted-foreground">
              {userDashboard.profileStatus === 'Matched' 
                ? 'Congratulations! View your match.' 
                : 'Our team is reviewing your profile.'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Matches</CardTitle>
            <Heart className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userDashboard.matchCount}</div>
            <p className="text-xs text-muted-foreground">Total curated matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Bell className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminMessages.filter(m => !m.read).length}</div>
            <p className="text-xs text-muted-foreground">From your matchmaker</p>
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
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </CardTitle>
            <CardDescription>This is a preview of how matchmakers see your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg">
                <AvatarImage src={PlaceHolderImages.find(p => p.id === loggedInUser.imageId)?.imageUrl} alt={loggedInUser.name} className="rounded-lg"/>
                <AvatarFallback className="rounded-lg text-3xl">{loggedInUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold font-headline">{loggedInUser.name}, {loggedInUser.age}</h2>
                <p className="text-muted-foreground">{loggedInUser.location}</p>
                <p className="mt-4 italic">"{loggedInUser.quote}"</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {loggedInUser.interests?.slice(0, 5).map(interest => (
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
              <span>Admin Updates</span>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/messages">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardTitle>
            <CardDescription>Recent messages from your matchmaker.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {adminMessages.slice(0, 3).map(message => (
                <li key={message.id}>
                  <Link href="/dashboard/messages" className="block p-3 rounded-lg hover:bg-secondary">
                    <div className="flex items-center justify-between">
                       <p className="font-semibold text-sm">{message.title}</p>
                       {!message.read && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{message.content}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
