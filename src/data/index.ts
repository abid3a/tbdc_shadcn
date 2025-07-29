import surgeData from './mock/surge.json';
import meetingsData from './mock/meetings.json';
import sessionsData from './mock/sessions.json';
import connectionsData from './mock/connections.json';
import companiesData from './mock/companies.json';
import reportsData from './mock/reports.json';
import adminData from './mock/admin.json';
import junctionsData from './mock/junctions.json';
import { SessionConnection, MeetingConnection, Session, Meeting, Connection } from './types';

// Data validation function
const validateData = <T>(data: any, type: string): T => {
  if (!data) {
    throw new Error(`Invalid ${type} data: data is null or undefined`);
  }
  return data as T;
};

// Export all mock data with validation
export const mockData = {
  surge: {
    surgeRequests: validateData(surgeData.surgeRequests, 'surgeRequests'),
    availableMentors: validateData(surgeData.availableMentors, 'availableMentors'),
  },
  meetings: validateData(meetingsData.meetings, 'meetings'),
  sessions: validateData(sessionsData.sessions, 'sessions'),
  connections: validateData(connectionsData.connections, 'connections'),
  companies: validateData(companiesData.companies, 'companies'),
  reports: {
    metrics: validateData(reportsData.metrics, 'metrics'),
    reportData: validateData(reportsData.reportData, 'reportData'),
    topPerformers: validateData(reportsData.topPerformers, 'topPerformers'),
  },
  admin: {
    users: validateData(adminData.users, 'users'),
    systemAlerts: validateData(adminData.systemAlerts, 'systemAlerts'),
  },
  junctions: {
    sessionConnections: validateData(junctionsData.sessionConnections, 'sessionConnections'),
    meetingConnections: validateData(junctionsData.meetingConnections, 'meetingConnections'),
  },
};

// Data service class for better error handling and loading states
export class DataService {
  private static instance: DataService;
  private cache: Map<string, any> = new Map();

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  async getData<T>(type: keyof typeof mockData): Promise<T> {
    const cacheKey = `data_${type}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const data = mockData[type];
    this.cache.set(cacheKey, data);
    
    return data as T;
  }

  async getDataWithErrorHandling<T>(type: keyof typeof mockData): Promise<{ data: T | null; error: string | null }> {
    try {
      const data = await this.getData<T>(type);
      return { data, error: null };
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      return { data: null, error: `Failed to load ${type} data` };
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Helper function to get data by type (legacy support)
export const getMockData = (type: keyof typeof mockData) => {
  return mockData[type];
};

// Helper functions to resolve relationships using junction tables
export const getConnectionSessions = (connectionId: string): Array<Session & { role: string; status: string }> => {
  const sessionConnections = mockData.junctions.sessionConnections.filter(
    sc => sc.connectionId === connectionId
  );
  
  return sessionConnections.map(sc => {
    const session = mockData.sessions.find(s => s.id === sc.sessionId);
    if (!session) return null;
    
    return {
      ...session,
      role: sc.role,
      status: sc.status, // This is the session connection status
    };
  }).filter(Boolean) as Array<Session & { role: string; status: string }>;
};

export const getConnectionMeetings = (connectionId: string): Array<Meeting & { role: string; status: string }> => {
  const meetingConnections = mockData.junctions.meetingConnections.filter(
    mc => mc.connectionId === connectionId
  );
  
  return meetingConnections.map(mc => {
    const meeting = mockData.meetings.find(m => m.id === mc.meetingId);
    if (!meeting) return null;
    
    return {
      ...meeting,
      role: mc.role,
      status: mc.status, // This is the meeting connection status
    };
  }).filter(Boolean) as Array<Meeting & { role: string; status: string }>;
};

export const getSessionConnections = (sessionId: string): Array<Connection & { role: string; status: string }> => {
  const sessionConnections = mockData.junctions.sessionConnections.filter(
    sc => sc.sessionId === sessionId
  );
  
  return sessionConnections.map(sc => {
    const connection = mockData.connections.find(c => c.id === sc.connectionId);
    if (!connection) return null;
    
    return {
      ...connection,
      role: sc.role,
      status: sc.status, // This is the session connection status
    };
  }).filter(Boolean) as Array<Connection & { role: string; status: string }>;
};

export const getMeetingConnections = (meetingId: string): Array<Connection & { role: string; status: string }> => {
  const meetingConnections = mockData.junctions.meetingConnections.filter(
    mc => mc.meetingId === meetingId
  );
  
  return meetingConnections.map(mc => {
    const connection = mockData.connections.find(c => c.id === mc.connectionId);
    if (!connection) return null;
    
    return {
      ...connection,
      role: mc.role,
      status: mc.status, // This is the meeting connection status
    };
  }).filter(Boolean) as Array<Connection & { role: string; status: string }>;
};

// Export individual data for direct access
export const {
  surge,
  meetings,
  sessions,
  connections,
  companies,
  reports,
  admin,
  junctions,
} = mockData;