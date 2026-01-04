import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { authStore } from '@stores/authStore';

export const ProtectedRoute = ({ children, roles }: { children: ReactNode; roles?: string[] }) => {
  const { user } = authStore();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

