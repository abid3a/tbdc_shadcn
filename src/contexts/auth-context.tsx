"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole, LoginCredentials, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithDemo: (role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts data
const demoAccounts = {
  founder: {
    id: 'demo-founder-1',
    email: 'demo.founder@tbdc.com',
    password: 'demo123',
    name: 'Demo Founder',
    role: 'founder' as UserRole,
    cohort: 'Cohort 2024',
    company: 'TechStart Inc.',
    avatar: '/avatars/founder.jpg'
  },
  partner: {
    id: 'demo-partner-1',
    email: 'demo.partner@tbdc.com',
    password: 'demo123',
    name: 'Demo Partner',
    role: 'partner' as UserRole,
    company: 'Venture Capital Partners',
    avatar: '/avatars/partner.jpg'
  },
  mentor: {
    id: 'demo-mentor-1',
    email: 'demo.mentor@tbdc.com',
    password: 'demo123',
    name: 'Demo Mentor',
    role: 'mentor' as UserRole,
    company: 'Tech Mentorship LLC',
    avatar: '/avatars/mentor.jpg'
  },
  admin: {
    id: 'demo-admin-1',
    email: 'demo.admin@tbdc.com',
    password: 'demo123',
    name: 'Demo Admin',
    role: 'admin' as UserRole,
    avatar: '/avatars/admin.jpg'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('tbdc-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('tbdc-user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if it's a demo account
    const demoAccount = Object.values(demoAccounts).find(
      account => account.email === credentials.email && account.password === credentials.password
    );
    
    if (demoAccount) {
      const user: User = {
        id: demoAccount.id,
        email: demoAccount.email,
        name: demoAccount.name,
        role: demoAccount.role,
        avatar: demoAccount.avatar,
        cohort: 'cohort' in demoAccount ? demoAccount.cohort : undefined,
        company: 'company' in demoAccount ? demoAccount.company : undefined
      };
      
      localStorage.setItem('tbdc-user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      // For non-demo accounts, you would validate against your backend
      throw new Error('Invalid credentials');
    }
  };

  const loginWithDemo = async (role: UserRole) => {
    const demoAccount = demoAccounts[role];
    if (demoAccount) {
      await login({
        email: demoAccount.email,
        password: demoAccount.password
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('tbdc-user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    // Redirect to login page after logout
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loginWithDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 