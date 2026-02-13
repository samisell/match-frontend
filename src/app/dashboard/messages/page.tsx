'use client';

import { useEffect, useState } from 'react';
import { messageService } from '@/services/message.service';
import { Message } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await messageService.getMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading messages...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Messages</h1>
      <p className="text-muted-foreground">
        Review communications between you and our team.
      </p>

      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {messages.map((message) => (
              <li key={message.id} className={`p-6 hover:bg-secondary/50 ${!message.is_read ? 'bg-secondary/30' : ''}`}>
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">Message #{message.id}</p>
                        {!message.is_read && (
                          <span className="flex h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {message.created_at ? format(new Date(message.created_at), 'MMM d, yyyy') : 'No date'}
                      </p>
                    </div>
                    {/* Real messages might not have a separate title, so using a snippet or generic title */}
                    <h2 className="font-bold mt-1">{message.title || 'Notification'}</h2>
                    <p className="text-muted-foreground mt-1">
                      {message.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            {messages.length === 0 && (
              <li className="p-10 text-center text-muted-foreground italic">No messages found.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

