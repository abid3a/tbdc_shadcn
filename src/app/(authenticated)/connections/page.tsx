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
import { ConnectionSidePanel } from '@/components/ui/connection-side-panel';
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
  Heart,
  Calendar,
  Clock,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Connection } from '@/data/types';
import { connections, getConnectionSessions, getConnectionMeetings } from '@/data';

// Cast the connections data to the correct type
const typedConnections = connections as Connection[];

// Connection Card Component
function ConnectionCard({ 
  connection, 
  onToggleFavorite,
  onConnectionClick
}: { 
  connection: Connection; 
  onToggleFavorite: (connectionId: string) => void;
  onConnectionClick: (connection: Connection) => void;
}) {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onConnectionClick(connection)}
    >
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
            <Heart 
              className={`h-4 w-4 ${connection.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
  );
}

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [connections, setConnections] = useState<Connection[]>(typedConnections);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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

  const handleConnectionClick = (connection: Connection) => {
    setSelectedConnection(connection);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedConnection(null);
  };

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              {showFavoritesOnly ? 'Favorite Connections' : 'Total Connections'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredConnections.length}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredConnections.map((connection) => (
          <ConnectionCard 
            key={connection.id} 
            connection={connection} 
            onToggleFavorite={toggleFavorite}
            onConnectionClick={handleConnectionClick}
          />
        ))}
      </div>

      {/* Connection Side Panel */}
      <ConnectionSidePanel
        connection={selectedConnection}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
} 