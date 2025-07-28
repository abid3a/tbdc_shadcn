"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Mail, Lock, Users } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const demoAccounts = [
  {
    role: 'founder' as UserRole,
    name: 'Demo Founder',
    email: 'demo.founder@tbdc.com',
    description: 'Access to Sessions, Meetings, Connections, Reports, and more',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    role: 'partner' as UserRole,
    name: 'Demo Partner',
    email: 'demo.partner@tbdc.com',
    description: 'Access to Meetings, Companies, Reports, and Surge',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    role: 'mentor' as UserRole,
    name: 'Demo Mentor',
    email: 'demo.mentor@tbdc.com',
    description: 'Access to Meetings, Companies, and Surge',
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    role: 'admin' as UserRole,
    name: 'Demo Admin',
    email: 'demo.admin@tbdc.com',
    description: 'Full access to all modules and management capabilities',
    color: 'bg-red-500 hover:bg-red-600'
  }
];

export function LoginForm() {
  const { login, loginWithDemo, isLoading } = useAuth();
  const [error, setError] = useState<string>('');
  const [isDemoLoading, setIsDemoLoading] = useState<UserRole | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await login(data);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleDemoLogin = async (role: UserRole) => {
    try {
      setError('');
      setIsDemoLoading(role);
      await loginWithDemo(role);
    } catch (err) {
      setError('Failed to login with demo account. Please try again.');
    } finally {
      setIsDemoLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome to TBDC</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  {...form.register('email')}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  {...form.register('password')}
                />
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or try a demo account
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <Button
                key={account.role}
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleDemoLogin(account.role)}
                disabled={isDemoLoading === account.role}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`w-8 h-8 rounded-full ${account.color} flex items-center justify-center`}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{account.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {account.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {account.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {account.description}
                    </p>
                  </div>
                  {isDemoLoading === account.role && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>All demo accounts use password: <code className="bg-muted px-1 rounded">demo123</code></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 