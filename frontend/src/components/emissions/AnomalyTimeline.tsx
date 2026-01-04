import type { AnomalyEvent } from '@/types';
import { formatDateTime } from '@utils/helpers';
import { AlertTriangle } from 'lucide-react';

const anomalies: AnomalyEvent[] = [
  { id: '1', type: 'nox_spike', timestamp: new Date().toISOString(), description: 'NOx spike detected', severity: 'high' },
  { id: '2', type: 'pm_spike', timestamp: new Date().toISOString(), description: 'PM2.5 exceeded threshold', severity: 'critical' }
];

export const AnomalyTimeline = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle className="h-5 w-5 text-warning" />
      <h3 className="font-semibold">Anomaly Timeline</h3>
    </div>
    <div className="space-y-3">
      {anomalies.map((a) => (
        <div key={a.id} className="rounded-lg border border-slate-200 p-3">
          <p className="text-sm font-semibold">{a.description}</p>
          <p className="text-xs text-neutral">{formatDateTime(a.timestamp)}</p>
          <p className="text-xs uppercase text-danger">Severity: {a.severity}</p>
        </div>
      ))}
    </div>
  </div>
);

