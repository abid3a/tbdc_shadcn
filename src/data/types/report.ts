import { ReactNode } from 'react';

export interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

export interface ReportData {
  period: string;
  sessions: number;
  meetings: number;
  connections: number;
  companies: number;
  revenue: string;
  growth: string;
}

export interface TopPerformer {
  name: string;
  role: string;
  sessions?: number;
  meetings?: number;
  rating: number;
  impact: 'High' | 'Medium' | 'Low';
}