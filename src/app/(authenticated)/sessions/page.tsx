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
  MessageSquare,
  Play,
  ExternalLink,
  Filter
} from 'lucide-react';

interface Session {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'mentoring' | 'networking' | 'pitch';
  status: 'upcoming' | 'ongoing' | 'completed';
  date: string;
  time: string;
  duration: string;
  mentor: {
    name: string;
    avatar: string;
    company: string;
  };
  attendees: number;
  maxAttendees: number;
  tags: string[];
}

const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Product Strategy Workshop',
    description: 'Learn how to develop and execute a winning product strategy for your startup.',
    type: 'workshop',
    status: 'upcoming',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: '2 hours',
    mentor: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      company: 'Product Strategy Inc.'
    },
    attendees: 12,
    maxAttendees: 20,
    tags: ['Product', 'Strategy', 'Workshop']
  },
  {
    id: '2',
    title: 'Investor Pitch Practice',
    description: 'Practice your pitch with experienced investors and get valuable feedback.',
    type: 'pitch',
    status: 'ongoing',
    date: '2024-01-12',
    time: '2:00 PM',
    duration: '1 hour',
    mentor: {
      name: 'Michael Rodriguez',
      avatar: '/avatars/michael.jpg',
      company: 'Venture Capital Partners'
    },
    attendees: 8,
    maxAttendees: 10,
    tags: ['Pitch', 'Investor', 'Practice']
  },
  {
    id: '3',
    title: 'Networking Mixer',
    description: 'Connect with fellow founders, mentors, and investors in a casual setting.',
    type: 'networking',
    status: 'upcoming',
    date: '2024-01-18',
    time: '6:00 PM',
    duration: '3 hours',
    mentor: {
      name: 'Emily Johnson',
      avatar: '/avatars/emily.jpg',
      company: 'Startup Community Hub'
    },
    attendees: 25,
    maxAttendees: 50,
    tags: ['Networking', 'Community', 'Social']
  },
  {
    id: '4',
    title: 'Technical Architecture Review',
    description: 'Get expert advice on your technical architecture and scalability plans.',
    type: 'mentoring',
    status: 'completed',
    date: '2024-01-10',
    time: '11:00 AM',
    duration: '1.5 hours',
    mentor: {
      name: 'David Kim',
      avatar: '/avatars/david.jpg',
      company: 'Tech Solutions LLC'
    },
    attendees: 1,
    maxAttendees: 1,
    tags: ['Technical', 'Architecture', 'Review']
  }
];

export default function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('all');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const mentors = Array.from(new Set(mockSessions.map(session => session.mentor.name)));

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMentor = selectedMentor === 'all' || session.mentor.name === selectedMentor;
    return matchesSearch && matchesMentor;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-purple-100 text-purple-800';
      case 'mentoring':
        return 'bg-orange-100 text-orange-800';
      case 'networking':
        return 'bg-pink-100 text-pink-800';
      case 'pitch':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
        <p className="text-muted-foreground">
          Join workshops, mentoring sessions, and networking events
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedMentor} onValueChange={setSelectedMentor}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by mentor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Mentors</SelectItem>
            {mentors.map((mentor) => (
              <SelectItem key={mentor} value={mentor}>
                {mentor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sessions Grid */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Sessions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {session.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(session.type)}>
                      {session.type}
                    </Badge>
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{session.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                      <AvatarFallback>{session.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{session.mentor.name}</p>
                      <p className="text-xs text-muted-foreground">{session.mentor.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{session.attendees}/{session.maxAttendees}</span>
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedSession(session)}
                        >
                          View Details
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>{session.title}</SheetTitle>
                          <SheetDescription>{session.description}</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center space-x-2">
                            <Badge className={getTypeColor(session.type)}>
                              {session.type}
                            </Badge>
                            <Badge className={getStatusColor(session.status)}>
                              {session.status}
                            </Badge>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Session Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Date: {session.date}</div>
                              <div>Time: {session.time}</div>
                              <div>Duration: {session.duration}</div>
                              <div>Attendees: {session.attendees}/{session.maxAttendees}</div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <h4 className="font-medium">Mentor</h4>
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                                <AvatarFallback>{session.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{session.mentor.name}</p>
                                <p className="text-sm text-muted-foreground">{session.mentor.company}</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <h4 className="font-medium">Tags</h4>
                            <div className="flex flex-wrap gap-1">
                              {session.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-4">
                            <Button className="flex-1">
                              <Play className="mr-2 h-4 w-4" />
                              Join Session
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

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSessions.filter(s => s.status === 'upcoming').map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSessions.filter(s => s.status === 'ongoing').map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSessions.filter(s => s.status === 'completed').map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 