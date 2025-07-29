export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'early-traction' | 'growth' | 'scaling';
  status: 'active' | 'paused' | 'graduated' | 'failed';
  founded: string;
  location: string;
  teamSize: number;
  funding: {
    total: string;
    stage: string;
    investors: string[];
  };
  metrics: {
    revenue: string;
    users: string;
    growth: string;
  };
  founders: {
    name: string;
    avatar: string;
    role: string;
  }[];
  tags: string[];
  website: string;
}