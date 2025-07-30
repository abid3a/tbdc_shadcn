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
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/auth-context';
import { useMeetings } from '@/hooks/use-data';
import { getMeetingConnections } from '@/data';
import { MeetingSidePanel } from '@/components/ui/meeting-side-panel';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  MessageSquare,
  Plus,
  Search,
  Filter,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Building2,
  RefreshCw
} from 'lucide-react';
import { Meeting } from '@/data/types';

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
    case 'investor':
      return 'bg-purple-100 text-purple-800';
    case 'eir':
      return 'bg-orange-100 text-orange-800';
    case 'customer':
      return 'bg-blue-100 text-blue-800';
    case 'internal':
      return 'bg-gray-100 text-gray-800';
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

// Calculate meeting status based on date and time
const calculateMeetingStatus = (meeting: Meeting): 'upcoming' | 'ongoing' | 'completed' => {
  const now = new Date();
  const meetingDate = new Date(`${meeting.date} ${meeting.time}`);
  
  // Parse duration to get meeting end time
  const durationMatch = meeting.duration.match(/(\d+(?:\.\d+)?)\s*hours?/i);
  const durationHours = durationMatch ? parseFloat(durationMatch[1]) : 1;
  const meetingEndTime = new Date(meetingDate.getTime() + (durationHours * 60 * 60 * 1000));
  
  if (now < meetingDate) {
    return 'upcoming';
  } else if (now >= meetingDate && now <= meetingEndTime) {
    return 'ongoing';
  } else {
    return 'completed';
  }
};

// Meeting Card Component
function MeetingCard({ meeting, onMeetingClick }: { meeting: Meeting; onMeetingClick: (meeting: Meeting) => void }) {
  const calculatedStatus = calculateMeetingStatus(meeting);
  
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onMeetingClick(meeting)}
    >
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
            {meeting.type}
          </Badge>
          <Badge className={getStatusColor(calculatedStatus)}>
            {calculatedStatus}
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
          <div className="flex items-center space-x-1">
            {getFormatIcon(meeting.format)}
            <span>{meeting.format}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{meeting.attendees.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MeetingsPage() {
  const { user } = useAuth();
  const { data: meetings, loading, error, refetch } = useMeetings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const meetingTypes = meetings ? Array.from(new Set(meetings.map(meeting => meeting.type))) : [];

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedMeeting(null);
  };

  // Enhanced sort meetings function
  const sortMeetings = (meetings: Meeting[]) => {
    return meetings.sort((a, b) => {
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
          // Sort by calculated status priority
          const aStatus = calculateMeetingStatus(a);
          const bStatus = calculateMeetingStatus(b);
          const statusPriority = { upcoming: 0, ongoing: 1, completed: 2 };
          const statusDiff = statusPriority[aStatus] - statusPriority[bStatus];
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
        
        case 'format':
          // Sort by format alphabetically
          const formatDiff = a.format.localeCompare(b.format);
          if (formatDiff !== 0) return formatDiff;
          // If same format, sort by date
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
          // Default: sort by calculated status priority then date
          const aStatusDefault = calculateMeetingStatus(a);
          const bStatusDefault = calculateMeetingStatus(b);
          const statusPriorityDefault = { upcoming: 0, ongoing: 1, completed: 2 };
          const statusDiffDefault = statusPriorityDefault[aStatusDefault] - statusPriorityDefault[bStatusDefault];
          if (statusDiffDefault !== 0) return statusDiffDefault;
          const dateM = new Date(a.date + ' ' + a.time);
          const dateN = new Date(b.date + ' ' + b.time);
          return dateM.getTime() - dateN.getTime();
      }
    });
  };

  const filteredMeetings = meetings ? meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || meeting.type === selectedType;
    return matchesSearch && matchesType;
  }) : [];

  const sortedMeetings = sortMeetings(filteredMeetings);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">
            Schedule and manage your meetings with mentors, investors, and peers
          </p>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
        {user?.role === 'admin' && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        )}
      </div>

      {/* Filters and Sort */}
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
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">Date (Earliest First)</SelectItem>
            <SelectItem value="date-desc">Date (Latest First)</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="format">Format</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Meetings Grid */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Meetings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedMeetings.map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting}
                onMeetingClick={handleMeetingClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortMeetings(filteredMeetings.filter(m => calculateMeetingStatus(m) === 'upcoming')).map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting}
                onMeetingClick={handleMeetingClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortMeetings(filteredMeetings.filter(m => calculateMeetingStatus(m) === 'ongoing')).map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting}
                onMeetingClick={handleMeetingClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortMeetings(filteredMeetings.filter(m => calculateMeetingStatus(m) === 'completed')).map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting}
                onMeetingClick={handleMeetingClick}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Meeting Side Panel */}
      <MeetingSidePanel
        meeting={selectedMeeting}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
} 