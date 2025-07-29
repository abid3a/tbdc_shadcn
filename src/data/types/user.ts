export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'founder' | 'mentor' | 'partner';
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  lastActive: string;
  joinedDate: string;
  sessions: number;
  meetings: number;
}

export interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  status: 'active' | 'resolved';
}