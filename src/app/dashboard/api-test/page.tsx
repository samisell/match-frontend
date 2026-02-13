'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { photoService } from '@/services/photo.service';
import { preferenceService } from '@/services/preference.service';
import { matchService } from '@/services/match.service';
import { messageService } from '@/services/message.service';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ApiTestPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runTest = async (name: string, promise: Promise<any>) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const data = await promise;
            setResult({ test: name, status: 'Success', data });
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Unknown error');
            setResult({ test: name, status: 'Failed', error: err.response?.data });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <header>
                <h1 className="text-3xl font-bold">API Integration Test Dashboard</h1>
                <p className="text-muted-foreground">Test all endpoints defined in frontend.md</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Endpoints</CardTitle>
                        <CardDescription>Select a service to test</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="auth" className="w-full">
                            <TabsList className="grid grid-cols-3 w-full mb-4">
                                <TabsTrigger value="auth">Auth</TabsTrigger>
                                <TabsTrigger value="user">User</TabsTrigger>
                                <TabsTrigger value="social">Social</TabsTrigger>
                            </TabsList>
                            <TabsContent value="auth" className="space-y-4">
                                <Button className="w-full justify-start" variant="outline" onClick={() => runTest('Get Current User', authService.getCurrentUser())}>GET /user</Button>
                                <Button className="w-full justify-start" variant="outline" onClick={() => runTest('Logout', authService.logout())}>POST /logout</Button>
                            </TabsContent>
                            <TabsContent value="user" className="space-y-4">
                                <Button className="w-full justify-start" variant="outline" onClick={() => runTest('Get Users', userService.getUsers())}>GET /users</Button>
                                <div className="space-y-2 border p-2 rounded">
                                    <Label>User ID</Label>
                                    <Input id="userId" placeholder="1" defaultValue="1" />
                                    <Button className="w-full" size="sm" onClick={() => {
                                        const id = parseInt((document.getElementById('userId') as HTMLInputElement).value);
                                        runTest(`Get User ${id}`, userService.getUser(id));
                                    }}>GET /users/id</Button>
                                </div>
                            </TabsContent>
                            <TabsContent value="social" className="space-y-4">
                                <Button className="w-full justify-start" variant="outline" onClick={() => runTest('Get Matches', matchService.getMatches())}>GET /matches</Button>
                                <Button className="w-full justify-start" variant="outline" onClick={() => runTest('Get Messages', messageService.getMessages())}>GET /messages</Button>
                                <Button className="w-full justify-start" variant="outline" onClick={() => runTest('Get Photos', photoService.getPhotos())}>GET /photos</Button>
                                <Button className="w-full justify-start" variant="outline" onClick={() => runTest('Get Preferences', preferenceService.getPreferences())}>GET /preferences</Button>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Results</CardTitle>
                        <CardDescription>View API response data here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading && <div className="animate-pulse text-center p-10">Running test...</div>}
                        {error && (
                            <div className="bg-destructive/10 text-destructive p-4 rounded mb-4">
                                <strong>Error:</strong> {error}
                            </div>
                        )}
                        {result && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${result.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {result.status}
                                    </span>
                                    <span className="font-mono text-sm">{result.test}</span>
                                </div>
                                <ScrollArea className="h-[400px] w-full border rounded p-4 bg-muted/50">
                                    <pre className="text-xs">
                                        {JSON.stringify(result.data || result.error, null, 2)}
                                    </pre>
                                </ScrollArea>
                            </div>
                        )}
                        {!loading && !result && !error && (
                            <div className="text-center text-muted-foreground p-10 italic">
                                Run a test to see results
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
