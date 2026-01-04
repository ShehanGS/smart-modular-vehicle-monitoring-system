import { useState } from 'react';
import { useAlerts } from '@hooks/useAlerts';
import { alertStore } from '@stores/alertStore';
import { AlertCard } from './AlertCard';
import { AlertCircle, History, Filter, CheckCircle2 } from 'lucide-react';
import { classNames } from '@utils/helpers';

export const AlertCenter = ({ compact }: { compact?: boolean }) => {
  const { alerts } = useAlerts();
  const { updateStatus } = alertStore();
  const [filter, setFilter] = useState<'all' | 'critical' | 'history'>('all');
  const [category, setCategory] = useState<string>('all');

  const filtered = alerts.filter(a => {
    if (filter === 'history') return a.status === 'history' || a.status === 'acknowledged';
    if (filter === 'critical') return a.severity === 'critical' && a.status === 'active';
    // Default 'all' = Active alerts only
    return a.status === 'active';
  }).filter(a => category === 'all' || a.type === category);

  const displayList = compact ? filtered.slice(0, 3) : filtered;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-danger" />
          <div>
            <h3 className="font-semibold text-lg">Alert Center</h3>
            <p className="text-sm text-neutral">{filtered.length} alerts found</p>
          </div>
        </div>

        {!compact && (
          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-slate-100 rounded-lg">
              {(['all', 'critical', 'history'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={classNames(
                    "px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all",
                    filter === f ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <select
              className="input w-32 h-9"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="safety">Safety</option>
              <option value="emission">Emission</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {displayList.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onAcknowledge={() => updateStatus(alert.id, 'acknowledged')}
          />
        ))}
        {displayList.length === 0 && (
          <div className="text-center py-8 text-neutral bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-slate-300" />
            <p>No alerts found</p>
          </div>
        )}
      </div>

      {compact && (
        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <a href="/alerts" className="text-sm font-medium text-primary hover:underline">View All Alerts</a>
        </div>
      )}
    </div>
  );
};

