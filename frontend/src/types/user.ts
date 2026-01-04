export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'driver' | 'viewer';
  token?: string;
}

