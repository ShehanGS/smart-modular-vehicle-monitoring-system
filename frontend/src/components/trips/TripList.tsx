import { formatDateTime } from '@utils/helpers';
import { Link } from 'react-router-dom';

const mockTrips = [
  { id: 1, trip_id: 'T-001', distance: 32, eco: 85, started_at: '2025-12-18T10:00:00Z' },
  { id: 2, trip_id: 'T-002', distance: 21, eco: 78, started_at: '2025-12-17T09:00:00Z' }
];

export const TripList = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold">Trip History</h3>
      <Link to="/trips" className="text-sm text-primary underline">
        View all
      </Link>
    </div>
    <div className="divide-y divide-slate-100">
      {mockTrips.map((t) => (
        <div key={t.id} className="py-3 flex items-center justify-between">
          <div>
            <p className="font-semibold">Trip {t.trip_id}</p>
            <p className="text-xs text-neutral">{formatDateTime(t.started_at)}</p>
          </div>
          <div className="text-sm text-neutral">Distance {t.distance} km · Eco {t.eco}</div>
        </div>
      ))}
    </div>
  </div>
);

