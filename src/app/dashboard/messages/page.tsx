import { adminMessages } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Messages</h1>
      <p className="text-muted-foreground">
        Review communications from your dedicated matchmaking team.
      </p>

      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {adminMessages.map((message) => (
              <li key={message.id} className={`p-6 hover:bg-secondary/50 ${!message.read ? 'bg-secondary' : ''}`}>
                <div className="flex items-start gap-4">
                   <Avatar className="h-10 w-10 border">
                      <AvatarFallback>HC</AvatarFallback>
                    </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">HeartCraft Team</p>
                         {!message.read && (
                          <span className="flex h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(message.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <h2 className="font-bold mt-1">{message.title}</h2>
                    <p className="text-muted-foreground mt-1">
                      {message.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
