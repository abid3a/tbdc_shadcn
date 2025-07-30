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

  const handleBooking = () => {
    // This would integrate with your booking system
    console.log('Booking session:', {
      mentorId: mentor.id,
      date: selectedDate,
      time: selectedTime,
      topic: sessionTopic,
      duration: sessionDuration
    });
    
    setShowBookingModal(false);
    // Redirect to confirmation or dashboard
    router.push('/surge/dashboard/bookings');
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
                      <label className="text-sm font-medium">Session Topic</label>
                      <Textarea
                        placeholder="What would you like to discuss? (optional)"
                        value={sessionTopic}
                        onChange={(e) => setSessionTopic(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-semibold ml-1">
                          ${durationOptions.find(opt => opt.value === sessionDuration)?.label.split(' - ')[1]?.replace('$', '') || '250'}
                        </span>
                      </div>
                      <Button onClick={handleBooking} disabled={!selectedDate || !selectedTime}>
                        Confirm Booking
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