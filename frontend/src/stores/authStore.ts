import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user?: User;
  token?: string;
  remember: boolean;
  setAuth: (user: User, token: string, remember?: boolean) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      remember: true,
      setAuth: (user, token, remember = true) => set({ user, token, remember }),
      logout: () => set({ user: undefined, token: undefined })
    }),
    {
      name: 'auth-store'
    }
  )
);

