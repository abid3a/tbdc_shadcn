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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Building2,
  Users,
  UserPlus,
  Star,
  Calendar,
  Clock,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Connection } from '@/data/types';
import { connections, getConnectionSessions, getConnectionMeetings } from '@/data';

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'requested':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case 'requested':
      return <UserPlus className="h-4 w-4 text-blue-600" />;
    default:
      return <Users className="h-4 w-4 text-gray-600" />;
  }
};

// Cast the connections data to the correct type
const typedConnections = connections as Connection[];

// Session Card Component for Connection Details
function SessionCard({ session }: { session: any }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-sm">{session.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={getTypeColor(session.type)} variant="secondary">
              {session.type}
            </Badge>
            <Badge className={getStatusColor(session.status)} variant="secondary">
              {session.status}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800" variant="secondary">
              {session.role}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {session.date} at {session.time}
          </p>
        </div>
      </div>
    </Card>
  );
}

function MeetingCard({ meeting }: { meeting: any }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-sm">{meeting.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={getTypeColor(meeting.type)} variant="secondary">
              {meeting.type}
            </Badge>
            <Badge className={getStatusColor(meeting.status)} variant="secondary">
              {meeting.status}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800" variant="secondary">
              {meeting.role}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {meeting.date} at {meeting.time}
          </p>
        </div>
      </div>
    </Card>
  );
}

// Connection Card Component
function ConnectionCard({ 
  connection, 
  onToggleFavorite 
}: { 
  connection: Connection; 
  onToggleFavorite: (connectionId: string) => void;
}) {
  const associatedSessions = getConnectionSessions(connection.id);
  const associatedMeetings = getConnectionMeetings(connection.id);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={connection.avatar} alt={connection.name} />
                  <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-lg">{connection.name}</CardTitle>
                  <CardDescription>{connection.role} at {connection.company}</CardDescription>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(connection.status)}>
                      {getStatusIcon(connection.status)}
                      {connection.status}
                    </Badge>
                    <Badge variant="outline">{connection.industry}</Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(connection.id);
                }}
                className="h-8 w-8 p-0 hover:bg-red-50"
              >
                <Star 
                  className={`h-4 w-4 ${connection.isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} 
                />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mutual Connections</span>
                <span className="font-medium">{connection.mutualConnections}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Contact</span>
                <span className="font-medium">{connection.lastContact}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {connection.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {connection.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{connection.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-4/5 sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <SheetHeader>
          <SheetTitle>{connection.name}</SheetTitle>
          <SheetDescription>{connection.role} at {connection.company}</SheetDescription>
        </SheetHeader>
        <div className="px-6 space-y-6 pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={connection.avatar} alt={connection.name} />
              <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{connection.name}</h3>
              <p className="text-muted-foreground">{connection.role} at {connection.company}</p>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(connection.status)}>
                  {getStatusIcon(connection.status)}
                  {connection.status}
                </Badge>
                <Badge variant="outline">{connection.industry}</Badge>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Bio</h4>
              <p className="text-sm text-muted-foreground">{connection.bio}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{connection.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{connection.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{connection.location}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {connection.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Associated Sessions ({associatedSessions.length})</h4>
              <div className="space-y-2">
                {associatedSessions.length > 0 ? (
                  associatedSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No associated sessions</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Associated Meetings ({associatedMeetings.length})</h4>
              <div className="space-y-2">
                {associatedMeetings.length > 0 ? (
                  associatedMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No associated meetings</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [connections, setConnections] = useState<Connection[]>(typedConnections);

  const industries = Array.from(new Set(typedConnections.map(connection => connection.industry)));

  const toggleFavorite = (connectionId: string) => {
    setConnections(prevConnections =>
      prevConnections.map(connection =>
        connection.id === connectionId
          ? { ...connection, isFavorite: !connection.isFavorite }
          : connection
      )
    );
  };

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || connection.status === selectedStatus;
    const matchesIndustry = selectedIndustry === 'all' || connection.industry === selectedIndustry;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Connections</h1>
          <p className="text-muted-foreground">
            Manage your professional network and discover new connections
          </p>
        </div>
        {/* {user?.role === 'admin' && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Connection
          </Button>
        )} */}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Connections
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connections.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industries</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{industries.length}</div>
            <p className="text-xs text-muted-foreground">Different sectors</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connections by name, organization, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="flex items-center gap-2"
        >
          <Heart className={`h-4 w-4 ${showFavoritesOnly ? 'fill-white' : 'fill-red-500 text-red-500'}`} />
          {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
        </Button> */}
      </div>

      {/* Connections Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredConnections.map((connection) => (
          <ConnectionCard 
            key={connection.id} 
            connection={connection} 
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
} 