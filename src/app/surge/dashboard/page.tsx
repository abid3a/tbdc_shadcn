"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';

// Mock data for dashboard
const upcomingBookings = [
  {
    id: '1',
    mentor: {
      name: 'Sarah Chen',
      role: 'Product Strategy Expert',
      avatar: '/avatars/sarah.jpg'
    },
    date: 'Tomorrow at 2:00 PM',
    topic: 'Product Strategy Review',
    status: 'confirmed'
  },
  {
    id: '2',
    mentor: {
      name: 'David Kim',
      role: 'Technical Architect',
      avatar: '/avatars/david.jpg'
    },
    date: 'Friday at 10:00 AM',
    topic: 'System Architecture Discussion',
    status: 'pending'
  }
];

const recommendedMentors = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Strategy Expert',
    company: 'TechCorp',
    avatar: '/avatars/sarah.jpg',
    expertise: ['Product Strategy', 'Go-to-Market', 'User Research'],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 250,
    availability: 'Available Today'
  },
  {
    id: '2',
    name: 'David Kim',
    role: 'Technical Architect',
    company: 'InnovateTech',
    avatar: '/avatars/david.jpg',
    expertise: ['System Architecture', 'Scalability', 'Cloud Infrastructure'],
    rating: 4.8,
    reviews: 89,
    hourlyRate: 300,
    availability: 'Available This Week'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Marketing Strategist',
    company: 'GrowthLab',
    avatar: '/avatars/maria.jpg',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking'],
    rating: 4.7,
    reviews: 156,
    hourlyRate: 200,
    availability: 'Available Now'
  }
];

const stats = [
  { label: 'Total Sessions', value: '24', icon: Calendar, change: '+12%' },
  { label: 'Hours Booked', value: '48', icon: Clock, change: '+8%' },
  { label: 'Mentors Connected', value: '12', icon: Users, change: '+25%' },
  { label: 'Avg Rating', value: '4.8', icon: Star, change: '+0.2' }
];

export default function SurgeDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Surge Dashboard</h1>
          <p className="text-muted-foreground">
            Connect with expert mentors and accelerate your business growth
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/surge/dashboard/mentors">
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Browse All Mentors
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="mentors">Recommended Mentors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled mentor sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={booking.mentor.avatar} alt={booking.mentor.name} />
                      <AvatarFallback>{booking.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{booking.topic}</p>
                      <p className="text-sm text-muted-foreground">{booking.mentor.name} • {booking.mentor.role}</p>
                      <p className="text-sm text-muted-foreground">{booking.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {booking.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Link href="/surge/dashboard/bookings">
                  <Button variant="outline" className="w-full">
                    View All Bookings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with Surge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/surge/dashboard/mentors">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Find a Mentor
                  </Button>
                </Link>
                <Link href="/surge/dashboard/bookings">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Manage Bookings
                  </Button>
                </Link>
                <Link href="/surge/dashboard/wallet">
                  <Button className="w-full justify-start" variant="outline">
                    <Zap className="mr-2 h-4 w-4" />
                    Wallet & Credits
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>All your scheduled and past sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.mentor.avatar} alt={booking.mentor.name} />
                        <AvatarFallback>{booking.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-medium">{booking.topic}</p>
                        <p className="text-sm text-muted-foreground">{booking.mentor.name} • {booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {booking.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors by name, expertise, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                <SelectItem value="product">Product Strategy</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recommended Mentors Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedMentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-md transition-shadow">
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
                      {mentor.expertise.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
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

          <div className="text-center">
            <Link href="/surge/dashboard/mentors">
              <Button variant="outline">
                View All Mentors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 