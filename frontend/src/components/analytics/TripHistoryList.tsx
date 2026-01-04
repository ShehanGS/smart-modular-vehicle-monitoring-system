import { formatDateTime } from '@utils/helpers';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Trip } from '@/types';

interface TripHistoryListProps {
  trips: Trip[];
  selectedTrips: number[];
  onSelectionChange: (selected: number[]) => void;
}

export const TripHistoryList = ({ trips, selectedTrips, onSelectionChange }: TripHistoryListProps) => {
  const toggleSelection = (tripId: number) => {
    if (selectedTrips.includes(tripId)) {
      onSelectionChange(selectedTrips.filter(id => id !== tripId));
    } else {
      onSelectionChange([...selectedTrips, tripId]);
    }
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getEcoScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success/10 border-success';
    if (score >= 60) return 'bg-warning/10 border-warning';
    return 'bg-danger/10 border-danger';
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Trip History</h2>
        <div className="text-sm text-neutral">
          {selectedTrips.length > 0 && `${selectedTrips.length} selected`}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">
                <div className="flex items-center gap-2">
                  <span>Select</span>
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">Trip ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">Distance</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">Fuel</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">Eco-Score</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">Duration</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => {
              const duration = trip.ended_at && trip.started_at
                ? Math.round((new Date(trip.ended_at).getTime() - new Date(trip.started_at).getTime()) / 60000)
                : 0;
              const fuelEfficiency = trip.distance_km && trip.fuel_used_l
                ? ((trip.fuel_used_l / trip.distance_km) * 100).toFixed(2)
                : 'N/A';

              return (
                <tr
                  key={trip.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleSelection(trip.id)}
                      className="flex items-center justify-center"
                    >
                      {selectedTrips.includes(trip.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-neutral" />
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {formatDateTime(trip.started_at)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm">{trip.trip_id}</span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {trip.distance_km?.toFixed(1) || 'N/A'} km
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {trip.fuel_used_l?.toFixed(2) || 'N/A'} L
                    {fuelEfficiency !== 'N/A' && (
                      <span className="text-xs text-neutral ml-1">({fuelEfficiency} L/100km)</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-sm font-semibold ${getEcoScoreColor(trip.eco_score || 0)} ${getEcoScoreBg(trip.eco_score || 0)}`}
                    >
                      {trip.eco_score || 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral">
                    {duration} min
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/trips/${trip.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {trips.length === 0 && (
        <div className="text-center py-8 text-neutral">
          No trips found for the selected period
        </div>
      )}
    </div>
  );
};

