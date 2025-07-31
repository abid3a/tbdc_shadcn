"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon,
  ArrowLeft,
  Linkedin,
  Globe,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

// Mock data for mentor details
const mentorData = {
  id: '1',
  name: 'Sarah Chen',
  role: 'Product Strategy Expert',
  company: 'TechCorp',
  avatar: '/avatars/sarah.jpg',
  email: 'sarah.chen@techcorp.com',
  bio: 'Sarah is a seasoned product strategist with over 10 years of experience helping startups scale their products and go-to-market strategies. She has worked with companies ranging from early-stage startups to Fortune 500 companies, specializing in user research, product-market fit, and growth strategies.',
  expertise: ['Product Strategy', 'Go-to-Market', 'User Research', 'Product Management', 'Growth Strategy', 'Market Analysis'],
  rating: 4.9,
  reviews: 127,
  hourlyRate: 250,
  availability: 'Available Today',
  location: 'San Francisco, CA',
  responseTime: '2 hours',
  type: 'operator',
  linkedin: 'https://linkedin.com/in/sarahchen',
  website: 'https://sarahchen.com',
  languages: ['English', 'Mandarin'],
  experience: '10+ years',
  education: 'MBA, Stanford Graduate School of Business',
  certifications: ['Certified Scrum Product Owner', 'Google Analytics Individual Qualification'],
  achievements: [
    'Helped 50+ startups achieve product-market fit',
    'Former VP of Product at TechCorp (acquired for $500M)',
    'Featured speaker at ProductCon and SaaStr',
    'Mentored 200+ product managers'
  ]
};

// Mock reviews
const reviews = [
  {
    id: '1',
    user: 'Alex Johnson',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Sarah provided incredible insights into our product strategy. Her experience with similar companies was invaluable. Highly recommend!',
    avatar: '/avatars/alex.jpg'
  },
  {
    id: '2',
    user: 'Maria Garcia',
    rating: 5,
    date: '1 month ago',
    comment: 'Excellent session! Sarah helped us identify key growth opportunities and provided actionable next steps. Will definitely book again.',
    avatar: '/avatars/maria.jpg'
  },
  {
    id: '3',
    user: 'David Kim',
    rating: 4,
    date: '2 months ago',
    comment: 'Great mentor with deep knowledge of product strategy. Very practical advice that we could implement immediately.',
    avatar: '/avatars/david.jpg'
  }
];

// Mock similar mentors
const similarMentors = [
  {
    id: '2',
    name: 'David Kim',
    role: 'Technical Architect',
    company: 'InnovateTech',
    avatar: '/avatars/david.jpg',
    rating: 4.8,
    hourlyRate: 300
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Marketing Strategist',
    company: 'GrowthLab',
    avatar: '/avatars/maria.jpg',
    rating: 4.7,
    hourlyRate: 200
  }
];

export default function MentorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mentor, setMentor] = useState(mentorData);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionDuration, setSessionDuration] = useState('60');
  const [isBooking, setIsBooking] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [showGoogleConnectModal, setShowGoogleConnectModal] = useState(false);

  // Mock time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes - $125' },
    { value: '60', label: '1 hour - $250' },
    { value: '90', label: '1.5 hours - $375' },
    { value: '120', label: '2 hours - $500' }
  ];

  // Check if Google Calendar is connected on component mount
  useEffect(() => {
    const checkCalendarConnection = async () => {
      try {
        const response = await fetch('/api/auth/google/status');
        const data = await response.json();
        
        console.log('Calendar connection status:', data);
        setIsCalendarConnected(data.isConnected);
      } catch (error) {
        console.error('Error checking calendar connection status:', error);
        setIsCalendarConnected(false);
      }
    };

    checkCalendarConnection();
  }, []);

  // Check for URL parameters (success/error messages)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const details = urlParams.get('details');

    if (success === 'calendar_connected') {
      console.log('Calendar connected successfully!');
      setIsCalendarConnected(true);
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (error) {
      console.error('Calendar connection error:', { error, details });
      let errorMessage = 'Failed to connect Google Calendar';
      
      if (error === 'auth_failed') {
        errorMessage = 'Authorization failed. Please try again.';
      } else if (error === 'no_code') {
        errorMessage = 'No authorization code received. Please try again.';
      } else if (error === 'token_exchange_failed') {
        errorMessage = 'Failed to complete authentication. Please try again.';
      }
      
      if (details) {
        errorMessage += ` Details: ${details}`;
      }
      
      alert(errorMessage);
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Connect to Google Calendar
  const connectGoogleCalendar = () => {
    console.log('Attempting to connect Google Calendar...');
    
    // Directly redirect to the OAuth endpoint
    // The API route will handle the OAuth URL generation and redirect
    window.location.href = '/api/auth/google';
  };

  // Convert 12-hour time format to 24-hour format
  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  const handleBooking = async () => {
    console.log('Booking validation check:', {
      selectedDate,
      selectedTime,
      sessionTopic,
      sessionDuration,
      isCalendarConnected
    });

    // Check if all required fields are filled
    const missingFields = [];
    if (!selectedDate) missingFields.push('Date');
    if (!selectedTime) missingFields.push('Time');
    if (!sessionTopic || !sessionTopic.trim()) missingFields.push('Session Topic');

    if (missingFields.length > 0) {
      console.error('Validation failed:', {
        selectedDate: selectedDate ? 'set' : 'missing',
        selectedTime: selectedTime ? 'set' : 'missing',
        sessionTopic: sessionTopic && sessionTopic.trim() ? 'set' : 'missing'
      });
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Check if Google Calendar is connected
    if (!isCalendarConnected) {
      const shouldConnect = confirm('Google Calendar connection is required to create calendar events with Google Meet links. Would you like to connect your Google Calendar now?');
      if (shouldConnect) {
        connectGoogleCalendar();
      }
      return;
    }

    setIsBooking(true);
    try {
      // Convert time to 24-hour format and create proper date string
      const time24h = convertTo24Hour(selectedTime);
      const dateString = selectedDate?.toISOString().split('T')[0];
      const startTime = new Date(`${dateString}T${time24h}:00`);
      const endTime = new Date(startTime.getTime() + parseInt(sessionDuration) * 60 * 1000);

      console.log('Creating booking with:', {
        mentorEmail: mentor.email,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        topic: sessionTopic.trim(),
        originalTime: selectedTime,
        convertedTime: time24h
      });

      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentorEmail: mentor.email,
          userEmail: 'user@example.com', // Get from auth context
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          topic: sessionTopic.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowBookingModal(false);
        // Show success message and redirect
        router.push(`/surge/dashboard/bookings?eventId=${result.eventId}`);
      } else {
        console.error('Booking failed:', result);
        if (result.error?.includes('Google Calendar not connected')) {
          setIsCalendarConnected(false);
          alert('Google Calendar connection expired. Please reconnect your calendar and try again.');
        } else {
          alert('Failed to create booking. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/surge/dashboard/mentors">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mentors
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mentor Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <CardTitle className="text-2xl">{mentor.name}</CardTitle>
                    <CardDescription className="text-lg">{mentor.role}</CardDescription>
                    <CardDescription>{mentor.company}</CardDescription>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className={`h-5 w-5 ${getRatingColor(mentor.rating)} fill-current`} />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {mentor.availability}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{mentor.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Response time: {mentor.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {mentor.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {mentor.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={mentor.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Bio and Details */}
          <Card>
            <CardHeader>
              <CardTitle>About {mentor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Experience & Education</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{mentor.experience} of experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{mentor.education}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Key Achievements</h4>
                <ul className="space-y-2">
                  {mentor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Award className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card>
            <CardHeader>
              <CardTitle>Areas of Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Testimonials</CardTitle>
              <CardDescription>{mentor.reviews} reviews from verified sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.avatar} alt={review.user} />
                        <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
              <CardDescription>Schedule a 1-on-1 session with {mentor.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold">${mentor.hourlyRate}</div>
                <div className="text-sm text-muted-foreground">per hour</div>
              </div>

              

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Response time</span>
                  <span className="font-medium">{mentor.responseTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Availability</span>
                  <span className="font-medium">{mentor.availability}</span>
                </div>
              </div>

              {/* Google Calendar Connection Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Calendar</span>
                  <div className="flex items-center space-x-2">
                    {isCalendarConnected ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <XCircle className="h-4 w-4" />
                        <span className="text-xs">Not Connected</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {!isCalendarConnected && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={connectGoogleCalendar}
                    className="w-full"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Connect Google Calendar
                  </Button>
                )}

                {/* Debug button for troubleshooting */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.open('/api/auth/google/test', '_blank')}
                  className="w-full text-xs text-muted-foreground"
                >
                  🔧 Test Configuration
                </Button>

                {/* OAuth Debug button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.open('/api/auth/google/debug', '_blank')}
                  className="w-full text-xs text-muted-foreground"
                >
                  🔍 Debug OAuth Setup
                </Button>
              </div>

              <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Book Session
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book Session with {mentor.name}</DialogTitle>
                    <DialogDescription>
                      Choose your preferred date, time, and session details.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Date</label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Time</label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Session Duration</label>
                      <Select value={sessionDuration} onValueChange={setSessionDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Session Topic *</label>
                      <Textarea
                        placeholder="What would you like to discuss? (required)"
                        value={sessionTopic}
                        onChange={(e) => setSessionTopic(e.target.value)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-semibold ml-1">
                          ${durationOptions.find(opt => opt.value === sessionDuration)?.label.split(' - ')[1]?.replace('$', '') || '250'}
                        </span>
                      </div>
                      <Button onClick={handleBooking} disabled={!selectedDate || !selectedTime || !sessionTopic.trim() || isBooking}>
                        {isBooking ? 'Creating Booking...' : 'Confirm Booking'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Similar Mentors */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Mentors</CardTitle>
              <CardDescription>You might also be interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {similarMentors.map((similarMentor) => (
                  <Link key={similarMentor.id} href={`/surge/dashboard/mentors/${similarMentor.id}`}>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={similarMentor.avatar} alt={similarMentor.name} />
                        <AvatarFallback>{similarMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{similarMentor.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{similarMentor.role}</p>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{similarMentor.rating}</span>
                          </div>
                          <span className="text-muted-foreground">${similarMentor.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 