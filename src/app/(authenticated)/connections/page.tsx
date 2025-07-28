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
  Users,
  UserPlus,
  Building2,
  Mail,
  MessageSquare,
  Calendar,
  Star,
  Filter,
  Plus
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
}

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
    email: 'sarah@productstrategy.com'
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
    email: 'michael@vcpartners.com'
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
    email: 'emily@communityhub.com'
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
    email: 'david@techsolutions.com'
  }
];

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  const industries = Array.from(new Set(mockConnections.map(connection => connection.industry)));

  const filteredConnections = mockConnections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === 'all' || connection.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Connection
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mutual Connections</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Average per connection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industries</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
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
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={connection.avatar} alt={connection.name} />
                      <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-lg">{connection.name}</CardTitle>
                      <CardDescription>{connection.role} at {connection.company}</CardDescription>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(connection.status)}>
                          {connection.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {connection.mutualConnections} mutual
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{connection.industry}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {connection.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {connection.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{connection.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Last contact: {connection.lastContact}
                    </span>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedConnection(connection)}
                        >
                          View Profile
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>{connection.name}</SheetTitle>
                          <SheetDescription>{connection.role} at {connection.company}</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={connection.avatar} alt={connection.name} />
                              <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(connection.status)}>
                                  {connection.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {connection.mutualConnections} mutual connections
                                </span>
                              </div>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.filter(c => c.status === 'connected').map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.filter(c => c.status === 'pending').map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requested" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.filter(c => c.status === 'requested').map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 