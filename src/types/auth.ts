export type UserRole = 'founder' | 'partner' | 'mentor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  cohort?: string;
  company?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  description: string;
} 