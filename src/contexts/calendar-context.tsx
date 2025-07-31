"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CalendarContextType {
  isConnected: boolean;
  accessToken: string | null;
  connect: () => void;
  disconnect: () => void;
  setAccessToken: (token: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  // Check connection status on mount
  useEffect(() => {
    const token = localStorage.getItem('google_calendar_token');
    if (token) {
      setAccessTokenState(token);
      setIsConnected(true);
    }
  }, []);

  const connect = () => {
    // This will be handled by the component that calls it
    console.log('Connecting to Google Calendar...');
  };

  const disconnect = () => {
    localStorage.removeItem('google_calendar_token');
    setAccessTokenState(null);
    setIsConnected(false);
  };

  const setAccessToken = (token: string) => {
    localStorage.setItem('google_calendar_token', token);
    setAccessTokenState(token);
    setIsConnected(true);
  };

  return (
    <CalendarContext.Provider value={{ 
      isConnected, 
      accessToken, 
      connect, 
      disconnect, 
      setAccessToken 
    }}>
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}; 