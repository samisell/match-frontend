'use client';

import { useEffect, useState } from 'react';
import { Bell, Check, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { notificationService } from '@/services/notification.service';
import { Notification } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export function NotificationPopover() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const data = await notificationService.getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll for new notifications every 60 seconds
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.read_at).length;

    const handleMarkAsRead = async (id: number) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, read_at: new Date().toISOString() } : n
            ));
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(notifications.map(n => ({ ...n, read_at: new Date().toISOString() })));
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await notificationService.deleteNotification(id);
            setNotifications(notifications.filter(n => n.id !== id));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8 relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                            variant="destructive"
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 pb-2">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-8 px-2"
                            onClick={handleMarkAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <Separator />
                <ScrollArea className="h-[300px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-full py-10">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            No notifications yet.
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-muted/50 transition-colors group relative ${!notification.read_at ? 'bg-primary/5' : ''}`}
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="space-y-1 flex-1">
                                            <p className={`text-sm ${!notification.read_at ? 'font-semibold' : ''}`}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-muted-foreground">
                                                    {notification.created_at ? formatDistanceToNow(new Date(notification.created_at), { addSuffix: true }) : ''}
                                                </span>
                                                {notification.link && (
                                                    <Link
                                                        href={notification.link}
                                                        className="text-[10px] text-primary flex items-center hover:underline"
                                                        onClick={() => {
                                                            handleMarkAsRead(notification.id);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        View <ExternalLink className="h-2 w-2 ml-0.5" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!notification.read_at && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    title="Mark as read"
                                                >
                                                    <Check className="h-3 w-3" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-destructive hover:text-destructive"
                                                onClick={(e) => handleDelete(e, notification.id)}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
