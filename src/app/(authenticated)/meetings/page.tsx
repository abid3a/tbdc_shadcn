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

// Meeting Card Component
function MeetingCard({ meeting, onMeetingClick }: { meeting: Meeting; onMeetingClick: (meeting: Meeting) => void }) {
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
          <div className="flex items-center space-x-1">
            {getFormatIcon(meeting.format)}
            <span>{meeting.format}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{meeting.attendees.length}/{meeting.maxAttendees}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {meeting.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MeetingsPage() {
  const { user } = useAuth();
  const { data: meetings, loading, error, refetch } = useMeetings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
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

  // Sort meetings by date and status
  const sortMeetings = (meetings: Meeting[]) => {
    return meetings.sort((a, b) => {
      // Sort by status priority first
      const statusPriority = { confirmed: 1, pending: 2, completed: 3, cancelled: 4 };
      const aPriority = statusPriority[a.status as keyof typeof statusPriority] || 5;
      const bPriority = statusPriority[b.status as keyof typeof statusPriority] || 5;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // Then sort by date
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  };

  const filteredMeetings = meetings ? meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || meeting.status === selectedStatus;
    const matchesType = selectedType === 'all' || meeting.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
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
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
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

        <TabsContent value="confirmed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortMeetings(filteredMeetings.filter(m => m.status === 'confirmed')).map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting}
                onMeetingClick={handleMeetingClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortMeetings(filteredMeetings.filter(m => m.status === 'pending')).map((meeting) => (
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
            {sortMeetings(filteredMeetings.filter(m => m.status === 'completed')).map((meeting) => (
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