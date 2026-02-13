'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { EmailTemplate } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Edit, Loader2, Mail } from 'lucide-react';

export default function EmailTemplatesPage() {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const fetchTemplates = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.getEmailTemplates();
            setTemplates(data);
        } catch (error) {
            toast.error('Failed to load email templates');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleUpdateTemplate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTemplate) return;

        setIsSaving(true);
        try {
            await adminService.updateEmailTemplate(editingTemplate.id, {
                subject: editingTemplate.subject,
                body: editingTemplate.body,
            });
            toast.success('Template updated successfully');
            fetchTemplates();
            setEditingTemplate(null);
        } catch (error) {
            toast.error('Failed to update template');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Email Templates</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage dynamic email templates sent by the system.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>System Templates</CardTitle>
                    <CardDescription>Templates used for various user notifications and alerts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {templates.map((template) => (
                                <TableRow key={template.id}>
                                    <TableCell className="font-medium">{template.name}</TableCell>
                                    <TableCell>{template.subject}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                                            {template.type}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog open={editingTemplate?.id === template.id} onOpenChange={(open) => !open && setEditingTemplate(null)}>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={() => setEditingTemplate({ ...template })}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                                <form onSubmit={handleUpdateTemplate}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Template: {template.name}</DialogTitle>
                                                        <DialogDescription>
                                                            Update the email subject and body. Use {"{{ placeholders }}"} for dynamic content.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="subject">Subject</Label>
                                                            <Input
                                                                id="subject"
                                                                value={editingTemplate?.subject || ''}
                                                                onChange={(e) => editingTemplate && setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="body">Body (HTML supported)</Label>
                                                            <Textarea
                                                                id="body"
                                                                className="min-h-[300px] font-mono"
                                                                value={editingTemplate?.body || ''}
                                                                onChange={(e) => editingTemplate && setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="button" variant="outline" onClick={() => setEditingTemplate(null)}>Cancel</Button>
                                                        <Button type="submit" disabled={isSaving}>
                                                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                            Save Changes
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Placeholders Guide
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p>You can use the following placeholders in your templates:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><code>{"{{ user_name }}"}</code>: Full name of the recipient</li>
                            <li><code>{"{{ app_name }}"}</code>: Application name from configuration</li>
                            <li><code>{"{{ login_link }}"}</code>: Link to the login page</li>
                            <li><code>{"{{ reset_link }}"}</code>: Password reset URL (forgot_password template only)</li>
                            <li><code>{"{{ otp }}"}</code>: One-time password (otp_verification template only)</li>
                            <li><code>{"{{ matched_user_name }}"}</code>: Name of the person they matched with</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
