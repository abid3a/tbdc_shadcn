export interface SurgeRequest {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'technical' | 'business' | 'legal' | 'financial' | 'marketing' | 'other';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  requester: {
    name: string;
    avatar: string;
    company: string;
  };
  assignedTo?: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
  urgency: string;
  tags: string[];
}

export interface Mentor {
  name: string;
  avatar: string;
  role: string;
  expertise: string[];
  availability: string;
  rating: number;
  responseTime: string;
}