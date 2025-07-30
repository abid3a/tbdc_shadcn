"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SurgeLayoutProps {
  children: React.ReactNode;
}

export default function SurgeLayout({ children }: SurgeLayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      // This would integrate with your actual auth system
      const token = localStorage.getItem('auth-token');
      
      // For now, we'll allow access to the landing page
      // In a real implementation, you might want to redirect unauthenticated users
      // to the landing page and authenticated users to the dashboard
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
} 