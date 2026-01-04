import { useAlerts } from '@hooks/useAlerts';
import { formatDateTime } from '@utils/helpers';
import { BadgeAlert, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnauthorizedAlertPanel = () => {
  const { alerts } = useAlerts();
  const unauthorized = alerts.filter((a) => a.alert_type === 'unauthorized_driver');
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BadgeAlert className="h-5 w-5 text-danger" />
          <h3 className="font-semibold">Unauthorized Driver Alerts</h3>
        </div>
        <Link to="/alerts" className="text-sm text-primary underline">
          View all
        </Link>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {unauthorized.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
          >
            <div>
              <p className="font-semibold text-danger">{alert.title}</p>
              <p className="text-xs text-neutral">{formatDateTime(alert.created_at)}</p>
              <p className="text-sm">{alert.message}</p>
            </div>
            <Link
              to={`/alerts/${alert.id}`}
              className="text-primary text-sm inline-flex items-center gap-1"
              aria-label="View unauthorized alert detail"
            >
              <Eye className="h-4 w-4" /> Details
            </Link>
          </div>
        ))}
        {unauthorized.length === 0 && <p className="text-sm text-neutral">No alerts</p>}
      </div>
    </div>
  );
};

