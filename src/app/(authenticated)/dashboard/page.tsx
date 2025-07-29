"use client"

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CardCarousel } from '@/components/ui/card-carousel';
import { useMeetings, useSessions, useConnections, useReports, useAdmin } from '@/hooks/use-data';
import { getConnectionSessions, getConnectionMeetings } from '@/data';
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
  const { data: meetings, loading: meetingsLoading } = useMeetings();
  const { data: sessions, loading: sessionsLoading } = useSessions();
  const { data: connections, loading: connectionsLoading } = useConnections();
  const { data: reports, loading: reportsLoading } = useReports();
  const { data: admin, loading: adminLoading } = useAdmin();

  if (!user) return null;

  const isLoading = meetingsLoading || sessionsLoading || connectionsLoading || reportsLoading || adminLoading;

  const getDashboardContent = () => {
    if (isLoading) {
      return {
        title: 'Loading Dashboard...',
        description: 'Please wait while we load your data',
        stats: [
          { title: 'Loading...', value: '...', icon: MessageSquare, color: 'text-gray-400' },
          { title: 'Loading...', value: '...', icon: Calendar, color: 'text-gray-400' },
          { title: 'Loading...', value: '...', icon: Users, color: 'text-gray-400' },
          { title: 'Loading...', value: '...', icon: TrendingUp, color: 'text-gray-400' }
        ],
        recentActivity: [],
        announcements: []
      };
    }

    switch (user.role) {
      case 'founder':
        const userConnections = connections?.filter(c => c.userId === user.id) || [];
        const userSessions = sessions?.filter(s => 
          userConnections.some(c => getConnectionSessions(c.id).some(cs => cs.id === s.id))
        ) || [];
        const userMeetings = meetings?.filter(m => 
          userConnections.some(c => getConnectionMeetings(c.id).some(cm => cm.id === m.id))
        ) || [];

        return {
          title: 'Founder Dashboard',
          description: 'Track your progress and manage your startup journey',
          stats: [
            { 
              title: 'Active Sessions', 
              value: userSessions.filter(s => s.status === 'ongoing').length.toString(), 
              icon: MessageSquare, 
              color: 'text-blue-600' 
            },
            { 
              title: 'Upcoming Meetings', 
              value: userMeetings.filter(m => m.status === 'confirmed').length.toString(), 
              icon: Calendar, 
              color: 'text-green-600' 
            },
            { 
              title: 'Connections', 
              value: userConnections.length.toString(), 
              icon: Users, 
              color: 'text-purple-600' 
            },
            { 
              title: 'Progress Score', 
              value: `${Math.min(100, Math.max(0, Math.floor((userSessions.filter(s => s.status === 'completed').length / Math.max(userSessions.length, 1)) * 100)))}%`, 
              icon: TrendingUp, 
              color: 'text-orange-600' 
            }
          ],
          recentActivity: [
            ...userSessions.slice(0, 2).map(session => ({
              type: 'session',
              title: session.title,
              time: '2 hours ago',
              status: session.status
            })),
            ...userMeetings.slice(0, 1).map(meeting => ({
              type: 'meeting',
              title: meeting.title,
              time: '1 day ago',
              status: meeting.status
            }))
          ].slice(0, 3),
          announcements: [
            'New cohort session on "Scaling Your Business" scheduled for next week',
            'Mentor office hours available this Friday',
            'Deadline for pitch deck submission is approaching'
          ]
        };

      case 'partner':
        const portfolioCompanies = connections?.filter(c => c.type === 'portfolio') || [];
        const partnerMeetings = meetings?.filter(m => m.type === 'investor') || [];
        const activeMentors = connections?.filter(c => c.type === 'mentor' && c.status === 'active') || [];

        return {
          title: 'Partner Dashboard',
          description: 'Monitor portfolio companies and manage partnerships',
          stats: [
            { 
              title: 'Portfolio Companies', 
              value: portfolioCompanies.length.toString(), 
              icon: Building2, 
              color: 'text-blue-600' 
            },
            { 
              title: 'Scheduled Meetings', 
              value: partnerMeetings.filter(m => m.status === 'confirmed').length.toString(), 
              icon: Calendar, 
              color: 'text-green-600' 
            },
            { 
              title: 'Active Mentors', 
              value: activeMentors.length.toString(), 
              icon: Users, 
              color: 'text-purple-600' 
            },
            { 
              title: 'Investment Pipeline', 
              value: '3', 
              icon: Target, 
              color: 'text-orange-600' 
            }
          ],
          recentActivity: [
            ...partnerMeetings.slice(0, 2).map(meeting => ({
              type: 'meeting',
              title: meeting.title,
              time: '1 hour ago',
              status: meeting.status
            })),
            { type: 'company', title: 'New company application', time: '3 hours ago', status: 'pending' }
          ],
          announcements: [
            'New startup applications available for review',
            'Quarterly portfolio review meeting scheduled',
            'Mentor matching requests pending approval'
          ]
        };

      case 'mentor':
        const mentorSessions = sessions?.filter(s => s.mentor.id === user.id) || [];
        const mentorConnections = connections?.filter(c => c.type === 'mentor' && c.userId === user.id) || [];

        return {
          title: 'Mentor Dashboard',
          description: 'Manage your mentoring sessions and track impact',
          stats: [
            { 
              title: 'Active Mentees', 
              value: mentorConnections.filter(c => c.status === 'active').length.toString(), 
              icon: Users, 
              color: 'text-blue-600' 
            },
            { 
              title: 'Scheduled Sessions', 
              value: mentorSessions.filter(s => s.status === 'upcoming').length.toString(), 
              icon: Calendar, 
              color: 'text-green-600' 
            },
            { 
              title: 'Companies Supported', 
              value: new Set(mentorSessions.map(s => s.mentor.company)).size.toString(), 
              icon: Building2, 
              color: 'text-purple-600' 
            },
            { 
              title: 'Session Hours', 
              value: `${mentorSessions.filter(s => s.status === 'completed').length * 2}h`, 
              icon: Clock, 
              color: 'text-orange-600' 
            }
          ],
          recentActivity: [
            ...mentorSessions.slice(0, 2).map(session => ({
              type: 'session',
              title: session.title,
              time: '3 hours ago',
              status: session.status
            })),
            { type: 'meeting', title: 'New mentee introduction', time: '1 day ago', status: 'scheduled' }
          ],
          announcements: [
            'New mentee matching requests available',
            'Mentor community meeting next week',
            'Session feedback forms due this Friday'
          ]
        };

      case 'admin':
        const totalUsers = admin?.users?.length || 0;
        const activeSessions = sessions?.filter(s => s.status === 'ongoing').length || 0;
        const totalCompanies = connections?.filter(c => c.type === 'company').length || 0;

        return {
          title: 'Admin Dashboard',
          description: 'System overview and management controls',
          stats: [
            { 
              title: 'Total Users', 
              value: totalUsers.toString(), 
              icon: Users, 
              color: 'text-blue-600' 
            },
            { 
              title: 'Active Sessions', 
              value: activeSessions.toString(), 
              icon: MessageSquare, 
              color: 'text-green-600' 
            },
            { 
              title: 'Companies', 
              value: totalCompanies.toString(), 
              icon: Building2, 
              color: 'text-purple-600' 
            },
            { 
              title: 'System Health', 
              value: '98%', 
              icon: CheckCircle, 
              color: 'text-orange-600' 
            }
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
      case 'confirmed':
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'new':
        return <AlertCircle className="h-4 w-4 text-purple-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      {/* Announcement Banner */}
      {content.announcements && content.announcements.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium">Important Updates</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {content.announcements.map((announcement, index) => (
                  <li key={index}>{announcement}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Recent Activity and Banner Carousel Row */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Recent Activity + Quick Actions */}
        <div className="md:col-span-1 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.recentActivity.length > 0 ? (
                content.recentActivity.map((activity, index) => (
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
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
            </CardContent>
          </Card>

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

        {/* Banner Carousel */}
        <div className="md:col-span-2">
          <CardCarousel
            images={[
              { src: '/assets/banners/1.png', alt: 'Banner 1' },
              { src: '/assets/banners/2.png', alt: 'Banner 2' },
              { src: '/assets/banners/3.png', alt: 'Banner 3' },
              { src: '/assets/banners/4.png', alt: 'Banner 4' },
              { src: '/assets/banners/5.png', alt: 'Banner 5' },
            ]}
            autoplayDelay={3000}
            showPagination={true}
            showNavigation={true}
            showHeader={false}
          />
        </div>
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
  );
} 