export interface Session {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'mentoring' | 'networking' | 'pitch';
  status: 'upcoming' | 'ongoing' | 'completed';
  date: string;
  time: string;
  duration: string;
  mentor: {
    name: string;
    avatar: string;
    company: string;
  };
  attendees: number;
  maxAttendees: number;
  tags: string[];
}