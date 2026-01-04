import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAlerts } from '@hooks/useAlerts';
import { authStore } from '@stores/authStore';

export const Navbar = () => {
  const { alerts } = useAlerts();
  const { user, logout } = authStore();
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <span className="h-9 w-9 rounded-lg bg-primary text-white grid place-items-center">E</span>
          Eco Driving AQM
        </Link>
        <div className="flex items-center gap-3 w-full max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral" />
            <input
              aria-label="Search"
              className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Search vehicles, drivers, alerts..."
            />
          </div>
          <Link to="/alerts" className="relative">
            <Bell className="h-6 w-6 text-primary" />
            {alerts.length > 0 && (
              <span className="absolute -right-1 -top-1 text-[10px] bg-danger text-white rounded-full h-5 w-5 grid place-items-center">
                {alerts.length}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm">
              <div className="font-semibold">{user?.full_name ?? 'Guest'}</div>
              <div className="text-xs text-neutral">{user?.role ?? 'viewer'}</div>
            </div>
            {user && (
              <button
                className="ml-2 text-xs text-danger underline"
                onClick={() => logout()}
                aria-label="Logout"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

