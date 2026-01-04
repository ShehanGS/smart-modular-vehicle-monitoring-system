import { api } from './api';
import type { User } from '@/types';

interface AuthResponse {
  user: User;
  token: string;
}

// Dummy credentials for testing (remove when backend is ready)
const DUMMY_USERS: Record<string, { user: User; password: string }> = {
  'admin@eco.com': {
    user: {
      id: 1,
      email: 'admin@eco.com',
      full_name: 'Admin User',
      role: 'admin'
    },
    password: 'admin123'
  },
  'driver@eco.com': {
    user: {
      id: 2,
      email: 'driver@eco.com',
      full_name: 'John Driver',
      role: 'driver'
    },
    password: 'driver123'
  },
  'viewer@eco.com': {
    user: {
      id: 3,
      email: 'viewer@eco.com',
      full_name: 'Viewer User',
      role: 'viewer'
    },
    password: 'viewer123'
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Mock authentication for development
  const userData = DUMMY_USERS[email.toLowerCase()];
  if (userData && userData.password === password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: userData.user,
      token: `dummy_token_${userData.user.id}_${Date.now()}`
    };
  }
  
  // Fallback to real API if not dummy user
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  } catch (error) {
    throw new Error('Invalid email or password');
  }
};

export const register = async (payload: Partial<User> & { password: string }) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const me = async (): Promise<User> => {
  // Mock implementation - in real app, this would fetch from API
  // For now, return a default user if token exists
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (error) {
    // Fallback to dummy admin if API fails
    return {
      id: 1,
      email: 'admin@eco.com',
      full_name: 'Admin User',
      role: 'admin'
    };
  }
};

