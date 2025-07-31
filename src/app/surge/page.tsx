"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Users, Clock, Zap, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Mock data for featured mentors
const featuredMentors = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Strategy Expert',
    company: 'TechCorp',
    expertise: ['Product Strategy', 'Go-to-Market', 'User Research'],
    image: '/avatars/sarah.jpg',
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
    expertise: ['System Architecture', 'Scalability', 'Cloud Infrastructure'],
    image: '/avatars/david.jpg',
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
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking'],
    image: '/avatars/maria.jpg',
    rating: 4.7,
    reviews: 156,
    hourlyRate: 200,
    availability: 'Available Now'
  }
];

// Stats data
const stats = [
  { label: 'Expert Mentors', value: '150+', icon: Users },
  { label: 'Avg Response Time', value: '2 hours', icon: Clock },
  { label: 'Success Rate', value: '94%', icon: Zap },
  { label: 'Satisfaction Score', value: '4.8/5', icon: Star }
];

export default function SurgeLandingPage() {
  const router = useRouter();
  const { isAuthenticated, loginWithDemo, isLoading } = useAuth();
  const [isAutoSigningIn, setIsAutoSigningIn] = useState(false);

  useEffect(() => {
    // Auto-sign in users when they visit the Surge page
    const autoSignIn = async () => {
      if (!isAuthenticated && !isLoading && !isAutoSigningIn) {
        setIsAutoSigningIn(true);
        try {
          // Auto-sign in as a founder demo account for full access
          await loginWithDemo('founder');
          console.log('Auto-signed in to Surge');
        } catch (error) {
          console.error('Auto-sign in failed:', error);
        } finally {
          setIsAutoSigningIn(false);
        }
      }
    };

    autoSignIn();
  }, [isAuthenticated, isLoading, loginWithDemo, isAutoSigningIn]);

  // Show loading state while auto-signing in
  if (isLoading || isAutoSigningIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-muted-foreground">Signing you in to Surge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Surge
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link href="/surge/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Connect with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Expert Mentors
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant access to industry experts, investors, and operators who can help you scale your business and overcome challenges.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/surge/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Book Your First Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/surge/dashboard/mentors">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Browse Mentors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="flex justify-center">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Mentors Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Featured Mentors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet some of our top-rated mentors who have helped hundreds of founders scale their businesses.
            </p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {featuredMentors.map((mentor) => (
                <CarouselItem key={mentor.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={mentor.image} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <CardDescription>{mentor.role}</CardDescription>
                      <CardDescription className="text-sm">{mentor.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 justify-center">
                        {mentor.expertise.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-center space-y-2">
                        <div className="text-lg font-bold">${mentor.hourlyRate}/hr</div>
                        <Badge className="bg-green-100 text-green-800">
                          {mentor.availability}
                        </Badge>
                      </div>

                      <Link href={`/surge/dashboard/mentors/${mentor.id}`}>
                        <Button className="w-full">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Book Session
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get expert guidance in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">1. Find Your Mentor</h3>
              <p className="text-muted-foreground">
                Browse our curated list of expert mentors across various industries and expertise areas.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">2. Book a Session</h3>
              <p className="text-muted-foreground">
                Choose your preferred time slot and book a 1-on-1 session with your selected mentor.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">3. Get Expert Advice</h3>
              <p className="text-muted-foreground">
                Connect with your mentor and get personalized guidance to overcome your challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Scale Your Business?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of founders who have accelerated their growth with expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/surge/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/surge/dashboard/mentors">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                  Explore Mentors
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Surge</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Surge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 