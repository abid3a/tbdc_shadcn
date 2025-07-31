"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video, 
  MapPin, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Phone,
  FileText
} from 'lucide-react';
import Link from 'next/link';

// Mock data for bookings
const allBookings = [
  {
    id: '1',
    mentor: {
      name: 'Sarah Chen',
      role: 'Product Strategy Expert',
      avatar: '/avatars/sarah.jpg',
      company: 'TechCorp'
    },
    date: '2024-01-15',
    time: '2:00 PM',
    duration: '60 minutes',
    topic: 'Product Strategy Review',
    status: 'confirmed',
    meetingType: 'virtual',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    price: 250,
    notes: 'Discuss our new product roadmap and get feedback on go-to-market strategy.',
    googleCalendarLink: 'https://calendar.google.com/calendar/event?eid=abc-defg-hij'
  },
  {
    id: '2',
    mentor: {
      name: 'David Kim',
      role: 'Technical Architect',
      avatar: '/avatars/david.jpg',
      company: 'InnovateTech'
    },
    date: '2024-01-18',
    time: '10:00 AM',
    duration: '90 minutes',
    topic: 'System Architecture Discussion',
    status: 'pending',
    meetingType: 'virtual',
    meetingLink: null,
    price: 450,
    notes: 'Review our current architecture and discuss scaling strategies.',
    googleCalendarLink: null
  },
  {
    id: '3',
    mentor: {
      name: 'Maria Rodriguez',
      role: 'Marketing Strategist',
      avatar: '/avatars/maria.jpg',
      company: 'GrowthLab'
    },
    date: '2024-01-10',
    time: '3:00 PM',
    duration: '60 minutes',
    topic: 'Marketing Strategy Session',
    status: 'completed',
    meetingType: 'virtual',
    meetingLink: null,
    price: 200,
    notes: 'Completed session on digital marketing strategies and growth hacking techniques.',
    googleCalendarLink: null
  },
  {
    id: '4',
    mentor: {
      name: 'James Wilson',
      role: 'Venture Capital Partner',
      avatar: '/avatars/james.jpg',
      company: 'Venture Capital'
    },
    date: '2024-01-22',
    time: '1:00 PM',
    duration: '120 minutes',
    topic: 'Fundraising Strategy',
    status: 'confirmed',
    meetingType: 'in-person',
    meetingLink: null,
    price: 800,
    notes: 'Discuss fundraising strategy and prepare for investor meetings.',
    googleCalendarLink: null
  }
];

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const upcomingBookings = allBookings.filter(booking => booking.status === 'confirmed' || booking.status === 'pending');
  const pastBookings = allBookings.filter(booking => booking.status === 'completed' || booking.status === 'cancelled');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleCancelBooking = () => {
    // This would integrate with your booking system
    console.log('Cancelling booking:', selectedBooking?.id);
    setShowCancelDialog(false);
    setSelectedBooking(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const bookingDate = new Date(dateString);
    return today.toDateString() === bookingDate.toDateString();
  };

  const isPast = (dateString: string) => {
    const today = new Date();
    const bookingDate = new Date(dateString);
    return bookingDate < today;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/surge/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-muted-foreground">
              Manage your scheduled mentor sessions
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allBookings.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pastBookings.filter(b => b.status === 'completed').length}</div>
            <p className="text-xs text-muted-foreground">Past sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${allBookings.reduce((sum, booking) => sum + booking.price, 0)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-4">You don't have any scheduled sessions yet.</p>
                <Link href="/surge/dashboard/mentors">
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Find a Mentor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={booking.mentor.avatar} alt={booking.mentor.name} />
                          <AvatarFallback>{booking.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-semibold">{booking.topic}</h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.mentor.name} • {booking.mentor.role} at {booking.mentor.company}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(booking.date)}</span>
                              {isToday(booking.date) && (
                                <Badge variant="secondary" className="ml-2">Today</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{booking.time} ({booking.duration})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {booking.meetingType === 'virtual' ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <MapPin className="h-4 w-4" />
                              )}
                              <span className="capitalize">{booking.meetingType}</span>
                            </div>
                          </div>

                          {booking.notes && (
                            <p className="text-sm text-muted-foreground max-w-md">
                              {booking.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">${booking.price}</div>
                          <div className="text-sm text-muted-foreground">{booking.duration}</div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {booking.status === 'confirmed' && booking.meetingLink && (
                            <Button size="sm" asChild>
                              <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer">
                                <Video className="mr-2 h-4 w-4" />
                                Join Meeting
                              </a>
                            </Button>
                          )}
                          
                          {booking.googleCalendarLink && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={booking.googleCalendarLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View in Calendar
                              </a>
                            </Button>
                          )}
                          
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>

                          {booking.status === 'pending' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedBooking(booking)}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Cancel Booking</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to cancel your session with {booking.mentor.name}? 
                                    This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">Keep Booking</Button>
                                  <Button variant="destructive" onClick={handleCancelBooking}>
                                    Cancel Session
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                <p className="text-muted-foreground">Your completed sessions will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={booking.mentor.avatar} alt={booking.mentor.name} />
                          <AvatarFallback>{booking.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-semibold">{booking.topic}</h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.mentor.name} • {booking.mentor.role} at {booking.mentor.company}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{booking.time} ({booking.duration})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {booking.meetingType === 'virtual' ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <MapPin className="h-4 w-4" />
                              )}
                              <span className="capitalize">{booking.meetingType}</span>
                            </div>
                          </div>

                          {booking.notes && (
                            <p className="text-sm text-muted-foreground max-w-md">
                              {booking.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">${booking.price}</div>
                          <div className="text-sm text-muted-foreground">{booking.duration}</div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          
                          {booking.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 