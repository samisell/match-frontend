'use client';

import { useEffect, useState, useRef } from 'react';
import { messageService } from '@/services/message.service';
import { adminService } from '@/services/admin.service';
import { Message, User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { Send, Loader2 } from 'lucide-react';

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [admin, setAdmin] = useState<User | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [msgs, users] = await Promise.all([
          messageService.getMessages(),
          adminService.getUsers(), // Need to find an admin to message
        ]);

        setMessages(msgs);
        const firstAdmin = users.find((u: User) => u.is_admin);
        if (firstAdmin) setAdmin(firstAdmin);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !admin || !user) return;

    setSending(true);
    try {
      const sent = await messageService.createMessage({
        receiver_id: admin.id,
        content: newMessage.trim(),
      });
      setMessages([...messages, sent]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin inline-block mr-2" /> Connecting to support...</div>;

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Messages</h1>
          <p className="text-muted-foreground">Chat with our matchmakers.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b bg-muted/30 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">MM</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">Matchmaker Support</CardTitle>
              <p className="text-[10px] text-muted-foreground">Online to help you</p>
            </div>
          </div>
        </CardHeader>

        <CardContent
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <p className="text-sm italic">No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.sender_id === user?.id
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-secondary text-secondary-foreground rounded-tl-none'
                  }`}>
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 opacity-70 text-right`}>
                    {msg.created_at ? format(new Date(msg.created_at), 'HH:mm') : ''}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>

        <CardFooter className="border-t p-3 bg-muted/30">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-background"
              disabled={sending}
            />
            <Button size="icon" type="submit" disabled={sending || !newMessage.trim() || !admin}>
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

