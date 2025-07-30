export interface Session {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'mentoring' | 'networking' | 'pitch';
  date: string;
  time: string;
  duration: string;
  mentor: {
    name: string;
    avatar: string;
    company: string;
  };
  attendees: Array<{
    name: string;
    avatar: string;
    role: string;
    company: string;
  }>;
  maxAttendees: number;
  tags: string[];
}