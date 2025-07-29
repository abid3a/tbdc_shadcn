import { useState, useEffect } from 'react';
import { DataService } from '@/data';
import { Meeting, Session, Connection, Company, SurgeData, ReportData, AdminData } from '@/data/types';

export interface UseDataOptions {
  autoFetch?: boolean;
  cacheKey?: string;
  refetchOnMount?: boolean;
}

export interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export function useData<T>(
  dataType: keyof ReturnType<typeof DataService.prototype.getData>,
  options: UseDataOptions = {}
): UseDataResult<T> {
  const { autoFetch = true, cacheKey, refetchOnMount = true } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dataService = DataService.getInstance();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await dataService.getDataWithErrorHandling<T>(dataType);
      
      if (result.error) {
        setError(result.error);
        setData(null);
      } else {
        setData(result.data);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData();
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    if (autoFetch && refetchOnMount) {
      fetchData();
    }
  }, [dataType, autoFetch, refetchOnMount]);

  return {
    data,
    loading,
    error,
    refetch,
    clearError,
  };
}

// Specialized hooks for common data types
export function useMeetings(): UseDataResult<Meeting[]> {
  return useData<Meeting[]>('meetings');
}

export function useSessions(): UseDataResult<Session[]> {
  return useData<Session[]>('sessions');
}

export function useConnections(): UseDataResult<Connection[]> {
  return useData<Connection[]>('connections');
}

export function useCompanies(): UseDataResult<Company[]> {
  return useData<Company[]>('companies');
}

export function useSurge(): UseDataResult<SurgeData> {
  return useData<SurgeData>('surge');
}

export function useReports(): UseDataResult<ReportData> {
  return useData<ReportData>('reports');
}

export function useAdmin(): UseDataResult<AdminData> {
  return useData<AdminData>('admin');
}