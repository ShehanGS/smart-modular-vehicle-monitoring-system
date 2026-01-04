import { Link, useLocation } from 'react-router-dom';
import { Car, Gauge, Home, Map, Shield, Users, Zap, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { classNames } from '@utils/helpers';

const links = [
  { to: '/', label: 'Overview', icon: Home },
  { to: '/admin', label: 'Admin', icon: Shield },
  { to: '/driver', label: 'Driver', icon: Gauge },
  { to: '/vehicles', label: 'Vehicles', icon: Car },
  { to: '/trips', label: 'Trips', icon: Map },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/sensors', label: 'Sensors', icon: Zap },
  { to: '/drivers', label: 'Drivers', icon: Users },
  { to: '/alerts', label: 'Alerts', icon: Shield },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help', icon: HelpCircle }
];

export const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="p-4">
        <h2 className="text-xs uppercase tracking-wide text-neutral mb-3">Navigation</h2>
        <nav className="space-y-1">
          {links.map((link) => {
            const ActiveIcon = link.icon;
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={classNames(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                  active ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                <ActiveIcon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

