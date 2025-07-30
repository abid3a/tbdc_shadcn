"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  MapPin, 
  Clock,
  Grid3X3,
  List,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// Mock data for mentors
const allMentors = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Strategy Expert',
    company: 'TechCorp',
    avatar: '/avatars/sarah.jpg',
    expertise: ['Product Strategy', 'Go-to-Market', 'User Research', 'Product Management'],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 250,
    availability: 'Available Today',
    location: 'San Francisco, CA',
    responseTime: '2 hours',
    type: 'operator'
  },
  {
    id: '2',
    name: 'David Kim',
    role: 'Technical Architect',
    company: 'InnovateTech',
    avatar: '/avatars/david.jpg',
    expertise: ['System Architecture', 'Scalability', 'Cloud Infrastructure', 'DevOps'],
    rating: 4.8,
    reviews: 89,
    hourlyRate: 300,
    availability: 'Available This Week',
    location: 'Seattle, WA',
    responseTime: '4 hours',
    type: 'specialist'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Marketing Strategist',
    company: 'GrowthLab',
    avatar: '/avatars/maria.jpg',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking', 'Content Marketing'],
    rating: 4.7,
    reviews: 156,
    hourlyRate: 200,
    availability: 'Available Now',
    location: 'New York, NY',
    responseTime: '1 hour',
    type: 'operator'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Venture Capital Partner',
    company: 'Venture Capital',
    avatar: '/avatars/james.jpg',
    expertise: ['Fundraising', 'Investment Strategy', 'Business Development', 'Financial Modeling'],
    rating: 4.9,
    reviews: 203,
    hourlyRate: 400,
    availability: 'Available Next Week',
    location: 'Boston, MA',
    responseTime: '6 hours',
    type: 'investor'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Legal Counsel',
    company: 'Legal Partners',
    avatar: '/avatars/lisa.jpg',
    expertise: ['Corporate Law', 'Intellectual Property', 'Contract Negotiation', 'Compliance'],
    rating: 4.6,
    reviews: 78,
    hourlyRate: 350,
    availability: 'Available Today',
    location: 'Los Angeles, CA',
    responseTime: '3 hours',
    type: 'specialist'
  },
  {
    id: '6',
    name: 'Michael Brown',
    role: 'Sales & Business Development',
    company: 'SalesForce',
    avatar: '/avatars/michael.jpg',
    expertise: ['Sales Strategy', 'Business Development', 'Customer Acquisition', 'Partnerships'],
    rating: 4.8,
    reviews: 134,
    hourlyRate: 225,
    availability: 'Available This Week',
    location: 'Austin, TX',
    responseTime: '2 hours',
    type: 'operator'
  }
];

const expertiseOptions = [
  'All Expertise',
  'Product Strategy',
  'Technical',
  'Marketing',
  'Finance',
  'Legal',
  'Sales',
  'Operations'
];

const availabilityOptions = [
  'All Availability',
  'Available Now',
  'Available Today',
  'Available This Week',
  'Available Next Week'
];

const typeOptions = [
  'All Types',
  'Investor',
  'Operator',
  'Specialist'
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All Expertise');
  const [selectedAvailability, setSelectedAvailability] = useState('All Availability');
  const [selectedType, setSelectedType] = useState('All Types');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 6;

  // Filter mentors based on search and filters
  const filteredMentors = allMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === 'All Expertise' || 
                            mentor.expertise.some(skill => skill.toLowerCase().includes(selectedExpertise.toLowerCase()));
    
    const matchesAvailability = selectedAvailability === 'All Availability' || 
                               mentor.availability.toLowerCase().includes(selectedAvailability.toLowerCase());
    
    const matchesType = selectedType === 'All Types' || mentor.type === selectedType.toLowerCase();
    
    return matchesSearch && matchesExpertise && matchesAvailability && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
  const startIndex = (currentPage - 1) * mentorsPerPage;
  const endIndex = startIndex + mentorsPerPage;
  const currentMentors = filteredMentors.slice(startIndex, endIndex);

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
            <h1 className="text-3xl font-bold tracking-tight">Find Mentors</h1>
            <p className="text-muted-foreground">
              Connect with expert mentors across various industries and expertise areas
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors by name, expertise, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by expertise" />
                </SelectTrigger>
                <SelectContent>
                  {expertiseOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredMentors.length} of {allMentors.length} mentors
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentors Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.role}</CardDescription>
                    <CardDescription className="text-sm">{mentor.company}</CardDescription>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{mentor.rating}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {mentor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mentor.expertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{mentor.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium">${mentor.hourlyRate}/hr</p>
                    <p className="text-muted-foreground">{mentor.reviews} reviews</p>
                  </div>
                  <Link href={`/surge/dashboard/mentors/${mentor.id}`}>
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Book Session
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{mentor.name}</h3>
                        <p className="text-muted-foreground">{mentor.role} at {mentor.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${mentor.hourlyRate}/hr</p>
                        <p className="text-sm text-muted-foreground">{mentor.reviews} reviews</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{mentor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{mentor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{mentor.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{mentor.expertise.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <Link href={`/surge/dashboard/mentors/${mentor.id}`}>
                        <Button size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Book Session
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
} 