"use client"

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardContent = () => {
    switch (user.role) {
      case 'founder':
        return {
          title: 'Founder Dashboard',
          description: 'Track your progress and manage your startup journey',
          stats: [
            { title: 'Active Sessions', value: '12', icon: MessageSquare, color: 'text-blue-600' },
            { title: 'Upcoming Meetings', value: '5', icon: Calendar, color: 'text-green-600' },
            { title: 'Connections', value: '28', icon: Users, color: 'text-purple-600' },
            { title: 'Progress Score', value: '85%', icon: TrendingUp, color: 'text-orange-600' }
          ],
          recentActivity: [
            { type: 'session', title: 'Product Strategy Session', time: '2 hours ago', status: 'completed' },
            { type: 'meeting', title: 'Investor Pitch Practice', time: '1 day ago', status: 'scheduled' },
            { type: 'connection', title: 'Connected with Sarah Chen', time: '2 days ago', status: 'new' }
          ],
          announcements: [
            'New cohort session on "Scaling Your Business" scheduled for next week',
            'Mentor office hours available this Friday',
            'Deadline for pitch deck submission is approaching'
          ]
        };

      case 'partner':
        return {
          title: 'Partner Dashboard',
          description: 'Monitor portfolio companies and manage partnerships',
          stats: [
            { title: 'Portfolio Companies', value: '15', icon: Building2, color: 'text-blue-600' },
            { title: 'Scheduled Meetings', value: '8', icon: Calendar, color: 'text-green-600' },
            { title: 'Active Mentors', value: '12', icon: Users, color: 'text-purple-600' },
            { title: 'Investment Pipeline', value: '3', icon: Target, color: 'text-orange-600' }
          ],
          recentActivity: [
            { type: 'meeting', title: 'TechStart Inc. Review', time: '1 hour ago', status: 'completed' },
            { type: 'company', title: 'New company application', time: '3 hours ago', status: 'pending' },
            { type: 'mentor', title: 'Mentor availability update', time: '1 day ago', status: 'updated' }
          ],
          announcements: [
            'New startup applications available for review',
            'Quarterly portfolio review meeting scheduled',
            'Mentor matching requests pending approval'
          ]
        };

      case 'mentor':
        return {
          title: 'Mentor Dashboard',
          description: 'Manage your mentoring sessions and track impact',
          stats: [
            { title: 'Active Mentees', value: '6', icon: Users, color: 'text-blue-600' },
            { title: 'Scheduled Sessions', value: '4', icon: Calendar, color: 'text-green-600' },
            { title: 'Companies Supported', value: '8', icon: Building2, color: 'text-purple-600' },
            { title: 'Session Hours', value: '24h', icon: Clock, color: 'text-orange-600' }
          ],
          recentActivity: [
            { type: 'session', title: 'Product Strategy with TechStart', time: '3 hours ago', status: 'completed' },
            { type: 'meeting', title: 'New mentee introduction', time: '1 day ago', status: 'scheduled' },
            { type: 'company', title: 'Company progress review', time: '2 days ago', status: 'updated' }
          ],
          announcements: [
            'New mentee matching requests available',
            'Mentor community meeting next week',
            'Session feedback forms due this Friday'
          ]
        };

      case 'admin':
        return {
          title: 'Admin Dashboard',
          description: 'System overview and management controls',
          stats: [
            { title: 'Total Users', value: '156', icon: Users, color: 'text-blue-600' },
            { title: 'Active Sessions', value: '23', icon: MessageSquare, color: 'text-green-600' },
            { title: 'Companies', value: '45', icon: Building2, color: 'text-purple-600' },
            { title: 'System Health', value: '98%', icon: CheckCircle, color: 'text-orange-600' }
          ],
          recentActivity: [
            { type: 'user', title: 'New user registration', time: '30 min ago', status: 'pending' },
            { type: 'system', title: 'System backup completed', time: '2 hours ago', status: 'completed' },
            { type: 'report', title: 'Monthly analytics generated', time: '1 day ago', status: 'completed' }
          ],
          announcements: [
            'System maintenance scheduled for Sunday',
            'New feature deployment planned for next week',
            'User feedback survey results available'
          ]
        };

      default:
        return null;
    }
  };

  const content = getDashboardContent();
  if (!content) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'new':
        return <AlertCircle className="h-4 w-4 text-purple-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {content.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                {getStatusIcon(activity.status)}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Important updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.announcements.map((announcement, index) => (
              <Alert key={index}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{announcement}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Session
            </Button>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Add Connection
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 