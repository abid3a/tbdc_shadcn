export interface Connection {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  industry: string;
  status: 'connected' | 'pending' | 'requested';
  mutualConnections: number;
  lastContact: string;
  tags: string[];
  bio: string;
  location: string;
  email: string;
  isFavorite?: boolean;
}