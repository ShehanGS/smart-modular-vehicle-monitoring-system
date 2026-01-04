import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/common/Loading';

export const Login = () => {
  const { loginMutation } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      { onSuccess: () => navigate('/') }
    );
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-4"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Eco Driving Assistant</h1>
          <p className="text-neutral text-sm">Sign in to continue</p>
        </div>
        <label className="grid gap-1 text-sm">
          Email
          <input
            required
            type="email"
            className="rounded-lg border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Password
          <input
            required
            type="password"
            className="rounded-lg border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked /> Remember me
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary text-white py-2 font-semibold"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? <Loading message="Signing in..." /> : 'Login'}
        </button>
        <div className="text-center text-sm">
          <Link to="/reset" className="text-primary underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
};

