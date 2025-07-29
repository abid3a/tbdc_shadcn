// Junction table for sessions and connections
export interface SessionConnection {
  id: string;
  sessionId: string;
  connectionId: string;
  role: 'mentor' | 'attendee' | 'organizer';
  joinedAt: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Junction table for meetings and connections
export interface MeetingConnection {
  id: string;
  meetingId: string;
  connectionId: string;
  role: 'attendee' | 'organizer' | 'invitee';
  joinedAt: string;
  status: 'confirmed' | 'pending' | 'declined';
}