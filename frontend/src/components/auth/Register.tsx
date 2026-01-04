import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/common/Loading';

export const Register = () => {
  const { registerMutation } = useAuth();
  const [form, setForm] = useState({ full_name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(form, {
      onSuccess: () => navigate('/login')
    });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-4"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Request Access</h1>
          <p className="text-neutral text-sm">Admin approval required</p>
        </div>
        <label className="grid gap-1 text-sm">
          Full Name
          <input
            required
            className="rounded-lg border px-3 py-2"
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Email
          <input
            required
            type="email"
            className="rounded-lg border px-3 py-2"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Password
          <input
            required
            type="password"
            className="rounded-lg border px-3 py-2"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary text-white py-2 font-semibold"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? <Loading message="Submitting..." /> : 'Submit'}
        </button>
        <div className="text-center text-sm">
          <Link to="/login" className="text-primary underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};

