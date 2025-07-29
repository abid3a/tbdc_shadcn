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
import { useAuth } from '@/contexts/auth-context';
import {
  Search,
  Users,
  UserPlus,
  Building2,
  Mail,
  MessageSquare,
  Calendar,
  Star,
  Filter,
  Plus,
  MapPin,
  Heart
} from 'lucide-react';

interface Connection {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  industry: string;
  status: 'connected' | 'pending' | 'requested';
  mutualConnections: number;
  lastContact: string;
  tags: string[];
  bio: string;
  location: string;
  email: string;
  isFavorite?: boolean;
}

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
      return <Users className="h-4 w-4 text-green-600" />;
    case 'pending':
      return <Calendar className="h-4 w-4 text-yellow-600" />;
    case 'requested':
      return <UserPlus className="h-4 w-4 text-blue-600" />;
    default:
      return <Users className="h-4 w-4 text-gray-600" />;
  }
};

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '/avatars/sarah.jpg',
    role: 'Product Manager',
    company: 'Product Strategy Inc.',
    industry: 'Technology',
    status: 'connected',
    mutualConnections: 5,
    lastContact: '2 days ago',
    tags: ['Product Strategy', 'Startup Mentor', 'Tech'],
    bio: 'Experienced product manager with 10+ years in tech startups. Passionate about helping founders build successful products.',
    location: 'San Francisco, CA',
    email: 'sarah@productstrategy.com',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: '/avatars/michael.jpg',
    role: 'Investor',
    company: 'Venture Capital Partners',
    industry: 'Finance',
    status: 'connected',
    mutualConnections: 3,
    lastContact: '1 week ago',
    tags: ['Investment', 'Venture Capital', 'Fintech'],
    bio: 'Early-stage investor focused on fintech and SaaS startups. Looking for innovative founders with strong execution.',
    location: 'New York, NY',
    email: 'michael@vcpartners.com',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Emily Johnson',
    avatar: '/avatars/emily.jpg',
    role: 'Founder',
    company: 'Startup Community Hub',
    industry: 'Community',
    status: 'pending',
    mutualConnections: 8,
    lastContact: '3 days ago',
    tags: ['Community Building', 'Startup Ecosystem', 'Networking'],
    bio: 'Building communities that connect founders, mentors, and investors. Passionate about startup ecosystem development.',
    location: 'Austin, TX',
    email: 'emily@communityhub.com',
    isFavorite: true
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: '/avatars/david.jpg',
    role: 'CTO',
    company: 'Tech Solutions LLC',
    industry: 'Technology',
    status: 'requested',
    mutualConnections: 2,
    lastContact: 'Never',
    tags: ['Technical Architecture', 'Scalability', 'Engineering'],
    bio: 'Technical leader with expertise in building scalable systems. Helping startups architect their technology stack.',
    location: 'Seattle, WA',
    email: 'david@techsolutions.com',
    isFavorite: false
  }
];

// Connection Card Component
function ConnectionCard({ 
  connection, 
  onToggleFavorite 
}: { 
  connection: Connection; 
  onToggleFavorite: (connectionId: string) => void;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={connection.avatar} alt={connection.name} />
                  <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-lg">{connection.name}</CardTitle>
                  <CardDescription>
                    {connection.role} at {connection.company}
                  </CardDescription>
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
                <Heart 
                  className={`h-4 w-4 ${connection.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                />
              </Button>
            </div>
 
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{connection.industry}</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{connection.location}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last contact: {connection.lastContact}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {connection.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {connection.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{connection.tags.length - 3} more
                </Badge>
              )}
            </div>

            
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Connection Details</SheetTitle>
        </SheetHeader>
        <div className="px-6 space-y-6 pt-6 pb-6">
          <div className="flex items-center space-x-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={connection.avatar} alt={connection.name} />
              <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{connection.name}</h3>
              <p className="text-sm text-muted-foreground">{connection.role}</p>
              <p className="text-sm text-muted-foreground">{connection.company}</p>
 
              <p className="text-sm text-muted-foreground">{connection.location}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">About</h4>
            <p className="text-sm text-muted-foreground">{connection.bio}</p>
          </div>

          <Separator />

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
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {connection.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
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
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const industries = Array.from(new Set(connections.map(connection => connection.industry)));

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
                         connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === 'all' || connection.industry === selectedIndustry;
    const matchesFavorites = !showFavoritesOnly || connection.isFavorite;
    return matchesSearch && matchesIndustry && matchesFavorites;
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
        {user?.role === 'admin' && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Connection
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {showFavoritesOnly ? 'Total Favorites' : 'Total Connections'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connections.filter(connection => {
                const matchesFavorites = !showFavoritesOnly || connection.isFavorite;
                const matchesIndustry = selectedIndustry === 'all' || connection.industry === selectedIndustry;
                return matchesFavorites && matchesIndustry;
              }).length}
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
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
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
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="flex items-center gap-2"
        >
          <Heart className={`h-4 w-4 ${showFavoritesOnly ? 'fill-white' : 'fill-red-500 text-red-500'}`} />
          {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
        </Button>
      </div>

      {/* Connections Grid */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Connections</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="requested">Requested</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.map((connection) => (
              <ConnectionCard 
                key={connection.id} 
                connection={connection} 
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.filter(c => c.status === 'connected').map((connection) => (
              <ConnectionCard 
                key={connection.id} 
                connection={connection} 
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.filter(c => c.status === 'pending').map((connection) => (
              <ConnectionCard 
                key={connection.id} 
                connection={connection} 
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requested" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.filter(c => c.status === 'requested').map((connection) => (
              <ConnectionCard 
                key={connection.id} 
                connection={connection} 
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 