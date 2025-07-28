"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Calendar,
  Clock,
  Users,
  Video,
  Phone,
  MapPin,
  Plus,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  description: string;
  type: 'one-on-one' | 'group' | 'pitch' | 'mentoring';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  date: string;
  time: string;
  duration: string;
  format: 'video' | 'phone' | 'in-person';
  location?: string;
  attendees: {
    name: string;
    avatar: string;
    role: string;
    company: string;
  }[];
  maxAttendees: number;
  tags: string[];
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Product Strategy Discussion',
    description: 'Deep dive into product roadmap and strategic planning for Q1.',
    type: 'one-on-one',
    status: 'scheduled',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: '1 hour',
    format: 'video',
    attendees: [
      {
        name: 'Sarah Chen',
        avatar: '/avatars/sarah.jpg',
        role: 'Product Mentor',
        company: 'Product Strategy Inc.'
      },
      {
        name: 'Demo Founder',
        avatar: '/avatars/founder.jpg',
        role: 'Founder',
        company: 'TechStart Inc.'
      }
    ],
    maxAttendees: 2,
    tags: ['Product', 'Strategy', 'Planning']
  },
  {
    id: '2',
    title: 'Investor Pitch Review',
    description: 'Practice pitch presentation and receive feedback from investors.',
    type: 'pitch',
    status: 'scheduled',
    date: '2024-01-16',
    time: '2:00 PM',
    duration: '1.5 hours',
    format: 'video',
    attendees: [
      {
        name: 'Michael Rodriguez',
        avatar: '/avatars/michael.jpg',
        role: 'Investor',
        company: 'Venture Capital Partners'
      },
      {
        name: 'Emily Johnson',
        avatar: '/avatars/emily.jpg',
        role: 'Investor',
        company: 'Startup Ventures'
      },
      {
        name: 'Demo Founder',
        avatar: '/avatars/founder.jpg',
        role: 'Founder',
        company: 'TechStart Inc.'
      }
    ],
    maxAttendees: 5,
    tags: ['Pitch', 'Investment', 'Presentation']
  },
  {
    id: '3',
    title: 'Technical Architecture Review',
    description: 'Review technical architecture and discuss scalability plans.',
    type: 'mentoring',
    status: 'ongoing',
    date: '2024-01-12',
    time: '11:00 AM',
    duration: '2 hours',
    format: 'video',
    attendees: [
      {
        name: 'David Kim',
        avatar: '/avatars/david.jpg',
        role: 'Technical Mentor',
        company: 'Tech Solutions LLC'
      },
      {
        name: 'Demo Founder',
        avatar: '/avatars/founder.jpg',
        role: 'Founder',
        company: 'TechStart Inc.'
      }
    ],
    maxAttendees: 2,
    tags: ['Technical', 'Architecture', 'Scalability']
  },
  {
    id: '4',
    title: 'Cohort Networking Event',
    description: 'Connect with fellow cohort members and share experiences.',
    type: 'group',
    status: 'scheduled',
    date: '2024-01-18',
    time: '6:00 PM',
    duration: '2 hours',
    format: 'in-person',
    location: 'TBDC Office, Downtown',
    attendees: [
      {
        name: 'Demo Founder',
        avatar: '/avatars/founder.jpg',
        role: 'Founder',
        company: 'TechStart Inc.'
      },
      {
        name: 'Alex Thompson',
        avatar: '/avatars/alex.jpg',
        role: 'Founder',
        company: 'Innovate Labs'
      },
      {
        name: 'Lisa Wang',
        avatar: '/avatars/lisa.jpg',
        role: 'Founder',
        company: 'DataFlow Solutions'
      }
    ],
    maxAttendees: 20,
    tags: ['Networking', 'Cohort', 'Community']
  }
];

export default function MeetingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const meetingTypes = Array.from(new Set(mockMeetings.map(meeting => meeting.type)));

  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || meeting.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'one-on-one':
        return 'bg-purple-100 text-purple-800';
      case 'group':
        return 'bg-orange-100 text-orange-800';
      case 'pitch':
        return 'bg-red-100 text-red-800';
      case 'mentoring':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">
            Schedule and manage your meetings with mentors, investors, and peers
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {meetingTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Meetings Grid */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Meetings</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMeetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {meeting.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(meeting.type)}>
                      {meeting.type.replace('-', ' ')}
                    </Badge>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{meeting.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getFormatIcon(meeting.format)}
                    <span className="text-sm text-muted-foreground">
                      {meeting.format === 'in-person' && meeting.location ? meeting.location : meeting.format}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{meeting.attendees.length}/{meeting.maxAttendees} attendees</span>
                    </div>
                    <div className="flex -space-x-2">
                      {meeting.attendees.slice(0, 3).map((attendee, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={attendee.avatar} alt={attendee.name} />
                          <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      ))}
                      {meeting.attendees.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                          +{meeting.attendees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {meeting.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {meeting.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{meeting.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedMeeting(meeting)}
                        >
                          View Details
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>{meeting.title}</SheetTitle>
                          <SheetDescription>{meeting.description}</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center space-x-2">
                            <Badge className={getTypeColor(meeting.type)}>
                              {meeting.type.replace('-', ' ')}
                            </Badge>
                            <Badge className={getStatusColor(meeting.status)}>
                              {meeting.status}
                            </Badge>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Meeting Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Date: {meeting.date}</div>
                              <div>Time: {meeting.time}</div>
                              <div>Duration: {meeting.duration}</div>
                              <div>Format: {meeting.format}</div>
                              {meeting.location && (
                                <div className="col-span-2">Location: {meeting.location}</div>
                              )}
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <h4 className="font-medium">Attendees ({meeting.attendees.length}/{meeting.maxAttendees})</h4>
                            <div className="space-y-2">
                              {meeting.attendees.map((attendee, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={attendee.avatar} alt={attendee.name} />
                                    <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{attendee.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {attendee.role} at {attendee.company}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <h4 className="font-medium">Tags</h4>
                            <div className="flex flex-wrap gap-1">
                              {meeting.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-4">
                            <Button className="flex-1">
                              <Video className="mr-2 h-4 w-4" />
                              Join Meeting
                            </Button>
                            <Button variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMeetings.filter(m => m.status === 'scheduled').map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMeetings.filter(m => m.status === 'ongoing').map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMeetings.filter(m => m.status === 'completed').map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 