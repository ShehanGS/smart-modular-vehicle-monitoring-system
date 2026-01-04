import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { login, me, register } from '@services/auth';
import { authStore } from '@stores/authStore';
import { notifyError, notifySuccess } from '@services/notifications';

export const useAuth = () => {
  const { user, token, setAuth, logout } = authStore();

  const profile = useQuery({
    queryKey: ['me'],
    queryFn: me,
    enabled: !!token
  });

  useEffect(() => {
    if (profile.data && token) {
      setAuth(profile.data, token, true);
    }
    if (profile.isError) {
      logout();
    }
  }, [profile.data, profile.isError, token, setAuth, logout]);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.token, true);
      notifySuccess('Logged in');
    },
    onError: () => notifyError('Login failed')
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => notifySuccess('Registration submitted for approval'),
    onError: () => notifyError('Registration failed')
  });

  return { user, token, logout, profile, loginMutation, registerMutation };
};

