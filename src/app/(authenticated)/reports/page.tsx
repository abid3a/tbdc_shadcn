"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Target,
  Download,
  Filter,
  PieChart,
  Activity,
  Award,
  Clock
} from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

interface ReportData {
  period: string;
  sessions: number;
  meetings: number;
  connections: number;
  companies: number;
  revenue: string;
  growth: string;
}

const mockMetrics: Metric[] = [
  {
    label: 'Total Sessions',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: Calendar
  },
  {
    label: 'Active Users',
    value: '2,847',
    change: '+8%',
    trend: 'up',
    icon: Users
  },
  {
    label: 'Revenue Generated',
    value: '$1.2M',
    change: '+23%',
    trend: 'up',
    icon: DollarSign
  },
  {
    label: 'Success Rate',
    value: '84%',
    change: '+5%',
    trend: 'up',
    icon: Target
  },
  {
    label: 'Avg Session Duration',
    value: '45 min',
    change: '-2%',
    trend: 'down',
    icon: Clock
  },
  {
    label: 'Mentor Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    trend: 'up',
    icon: Award
  }
];

const mockReportData: ReportData[] = [
  {
    period: 'Q1 2024',
    sessions: 45,
    meetings: 89,
    connections: 234,
    companies: 12,
    revenue: '$320K',
    growth: '+15%'
  },
  {
    period: 'Q4 2023',
    sessions: 38,
    meetings: 76,
    connections: 198,
    companies: 10,
    revenue: '$280K',
    growth: '+12%'
  },
  {
    period: 'Q3 2023',
    sessions: 32,
    meetings: 65,
    connections: 167,
    companies: 8,
    revenue: '$250K',
    growth: '+8%'
  },
  {
    period: 'Q2 2023',
    sessions: 28,
    meetings: 54,
    connections: 145,
    companies: 7,
    revenue: '$230K',
    growth: '+5%'
  }
];

const mockTopPerformers = [
  {
    name: 'Sarah Chen',
    role: 'Product Mentor',
    sessions: 24,
    rating: 4.9,
    impact: 'High'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Investor',
    meetings: 18,
    rating: 4.8,
    impact: 'High'
  },
  {
    name: 'David Kim',
    role: 'Technical Mentor',
    sessions: 22,
    rating: 4.7,
    impact: 'Medium'
  },
  {
    name: 'Emily Johnson',
    role: 'Community Builder',
    sessions: 19,
    rating: 4.6,
    impact: 'Medium'
  }
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('q1-2024');
  const [selectedReport, setSelectedReport] = useState('overview');

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 rotate-180" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Track performance metrics and generate insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
              <SelectItem value="q3-2023">Q3 2023</SelectItem>
              <SelectItem value="q2-2023">Q2 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-xs ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)}
                  <span className="ml-1">{metric.change} from last period</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reports Tabs */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Quarterly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance</CardTitle>
                <CardDescription>Key metrics comparison across quarters</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Meetings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReportData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{data.period}</TableCell>
                        <TableCell>{data.sessions}</TableCell>
                        <TableCell>{data.meetings}</TableCell>
                        <TableCell>{data.revenue}</TableCell>
                        <TableCell className="text-green-600">{data.growth}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Mentors and partners with highest impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-muted-foreground">{performer.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{performer.sessions} sessions</span>
                          <Badge className={getImpactColor(performer.impact)}>
                            {performer.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{performer.rating} rating</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Session Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Session Performance</CardTitle>
                <CardDescription>Detailed session metrics and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Sessions</span>
                    <span className="text-2xl font-bold">156</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Rating</span>
                    <span className="text-2xl font-bold">4.7/5</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-2xl font-bold">92%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Follow-up Actions</span>
                    <span className="text-2xl font-bold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meeting Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Meeting Analytics</CardTitle>
                <CardDescription>Meeting effectiveness and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Meetings</span>
                    <span className="text-2xl font-bold">89</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Duration</span>
                    <span className="text-2xl font-bold">45 min</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-2xl font-bold">87%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Investment Generated</span>
                    <span className="text-2xl font-bold">$2.1M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Growth Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Monthly growth patterns and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">User Growth</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">+23%</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Revenue Growth</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">+18%</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Session Growth</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">+15%</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Company Growth</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">+12%</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>User engagement and activity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Daily Active Users</span>
                    <span className="text-2xl font-bold">847</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Weekly Active Users</span>
                    <span className="text-2xl font-bold">2,156</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Active Users</span>
                    <span className="text-2xl font-bold">4,892</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Session Duration</span>
                    <span className="text-2xl font-bold">32 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>User and company distribution by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">San Francisco</span>
                    <span className="text-2xl font-bold">28%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">New York</span>
                    <span className="text-2xl font-bold">22%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Austin</span>
                    <span className="text-2xl font-bold">18%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Other Cities</span>
                    <span className="text-2xl font-bold">32%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Breakdown</CardTitle>
                <CardDescription>Companies and users by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Technology</span>
                    <span className="text-2xl font-bold">45%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Finance</span>
                    <span className="text-2xl font-bold">18%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Healthcare</span>
                    <span className="text-2xl font-bold">15%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Other Industries</span>
                    <span className="text-2xl font-bold">22%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 