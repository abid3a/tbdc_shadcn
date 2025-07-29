"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { SessionSidePanel } from '@/components/ui/session-side-panel';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Search,
  Filter,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { Session } from '@/data/types';
import { sessions, getSessionConnections, getSessionWithAttendees } from '@/data';

// Helper functions
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
      return 'bg-blue-100 text-blue-800';
    case 'pitch':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Cast the sessions data to the correct type
const typedSessions = sessions as Session[];

// Session Card Component
function SessionCard({ session, onSessionClick }: { session: Session; onSessionClick: (session: Session) => void }) {
  const sessionConnections = getSessionConnections(session.id);

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSessionClick(session)}
    >
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
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{session.attendees.length}/{session.maxAttendees}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
            <AvatarFallback>{session.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{session.mentor.name}</p>
            <p className="text-xs text-muted-foreground truncate">{session.mentor.company}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {session.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const mentors = Array.from(new Set(typedSessions.map(session => session.mentor.name)));
  const sessionTypes = Array.from(new Set(typedSessions.map(session => session.type)));

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedSession(null);
  };

  // Enhanced sort sessions function
  const sortSessions = (sessions: Session[]) => {
    return sessions.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          // Sort by date (earliest first)
          const dateA = new Date(a.date + ' ' + a.time);
          const dateB = new Date(b.date + ' ' + b.time);
          return dateA.getTime() - dateB.getTime();
        
        case 'date-desc':
          // Sort by date (latest first)
          const dateC = new Date(a.date + ' ' + a.time);
          const dateD = new Date(b.date + ' ' + b.time);
          return dateD.getTime() - dateC.getTime();
        
        case 'status':
          // Sort by status priority: upcoming > ongoing > completed
          const statusPriority = { upcoming: 0, ongoing: 1, completed: 2 };
          const statusDiff = statusPriority[a.status as keyof typeof statusPriority] - statusPriority[b.status as keyof typeof statusPriority];
          if (statusDiff !== 0) return statusDiff;
          // If same status, sort by date
          const dateE = new Date(a.date + ' ' + a.time);
          const dateF = new Date(b.date + ' ' + b.time);
          return dateE.getTime() - dateF.getTime();
        
        case 'type':
          // Sort by type alphabetically
          const typeDiff = a.type.localeCompare(b.type);
          if (typeDiff !== 0) return typeDiff;
          // If same type, sort by date
          const dateG = new Date(a.date + ' ' + a.time);
          const dateH = new Date(b.date + ' ' + b.time);
          return dateG.getTime() - dateH.getTime();
        
        case 'mentor':
          // Sort by mentor name alphabetically
          const mentorDiff = a.mentor.name.localeCompare(b.mentor.name);
          if (mentorDiff !== 0) return mentorDiff;
          // If same mentor, sort by date
          const dateI = new Date(a.date + ' ' + a.time);
          const dateJ = new Date(b.date + ' ' + b.time);
          return dateI.getTime() - dateJ.getTime();
        
        case 'title':
          // Sort by title alphabetically
          const titleDiff = a.title.localeCompare(b.title);
          if (titleDiff !== 0) return titleDiff;
          // If same title, sort by date
          const dateK = new Date(a.date + ' ' + a.time);
          const dateL = new Date(b.date + ' ' + b.time);
          return dateK.getTime() - dateL.getTime();
        
        default:
          // Default: sort by status priority then date
          const statusPriorityDefault = { upcoming: 0, ongoing: 1, completed: 2 };
          const statusDiffDefault = statusPriorityDefault[a.status as keyof typeof statusPriorityDefault] - statusPriorityDefault[b.status as keyof typeof statusPriorityDefault];
          if (statusDiffDefault !== 0) return statusDiffDefault;
          const dateM = new Date(a.date + ' ' + a.time);
          const dateN = new Date(b.date + ' ' + b.time);
          return dateM.getTime() - dateN.getTime();
      }
    });
  };

  const filteredSessions = typedSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || session.status === selectedStatus;
    const matchesType = selectedType === 'all' || session.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedSessions = sortSessions(filteredSessions);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
        <p className="text-muted-foreground">
          Join workshops, mentoring sessions, and networking events
        </p>
      </div>

      {/* Filters and Sort */}
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
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {sessionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">Date (Earliest First)</SelectItem>
            <SelectItem value="date-desc">Date (Latest First)</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="mentor">Mentor</SelectItem>
            <SelectItem value="title">Title</SelectItem>
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
            {sortedSessions.map((session) => (
              <SessionCard 
                key={session.id} 
                session={session}
                onSessionClick={handleSessionClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortSessions(filteredSessions.filter(s => s.status === 'upcoming')).map((session) => (
              <SessionCard 
                key={session.id} 
                session={session}
                onSessionClick={handleSessionClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortSessions(filteredSessions.filter(s => s.status === 'ongoing')).map((session) => (
              <SessionCard 
                key={session.id} 
                session={session}
                onSessionClick={handleSessionClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortSessions(filteredSessions.filter(s => s.status === 'completed')).map((session) => (
              <SessionCard 
                key={session.id} 
                session={session}
                onSessionClick={handleSessionClick}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Session Side Panel */}
      <SessionSidePanel
        session={selectedSession}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
} 