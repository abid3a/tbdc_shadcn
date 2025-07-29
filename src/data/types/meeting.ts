export interface Meeting {
  id: string;
  title: string;
  description: string;
  type: 'investor' | 'eir' | 'customer' | 'internal';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  date: string;
  time: string;
  duration: string;
  format: 'video' | 'phone' | 'in-person';
  location?: string;
  meetingUrl?: string;
  attendees: {
    name: string;
    avatar: string;
    role: string;
    company: string;
  }[];
  maxAttendees: number;
  tags: string[];
}