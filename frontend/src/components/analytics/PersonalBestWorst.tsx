import { Award, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import type { Trip } from '@/types';

interface PersonalBestWorstProps {
  trips: Trip[];
}

export const PersonalBestWorst = ({ trips }: PersonalBestWorstProps) => {
  const validTrips = trips.filter(t => t.eco_score && t.distance_km && t.fuel_used_l);
  
  if (validTrips.length === 0) {
    return null;
  }

  // Find best and worst trips
  const bestTrip = validTrips.reduce((best, current) => 
    (current.eco_score || 0) > (best.eco_score || 0) ? current : best
  );
  
  const worstTrip = validTrips.reduce((worst, current) => 
    (current.eco_score || 0) < (worst.eco_score || 0) ? current : worst
  );

  const bestFuelEfficiency = bestTrip.distance_km && bestTrip.fuel_used_l
    ? ((bestTrip.fuel_used_l / bestTrip.distance_km) * 100).toFixed(2)
    : 'N/A';

  const worstFuelEfficiency = worstTrip.distance_km && worstTrip.fuel_used_l
    ? ((worstTrip.fuel_used_l / worstTrip.distance_km) * 100).toFixed(2)
    : 'N/A';

  const TripCard = ({ trip, isBest, fuelEfficiency }: {
    trip: Trip;
    isBest: boolean;
    fuelEfficiency: string;
  }) => {
    const date = new Date(trip.started_at);
    const duration = trip.ended_at && trip.started_at
      ? Math.round((new Date(trip.ended_at).getTime() - new Date(trip.started_at).getTime()) / 60000)
      : 0;

    return (
      <div className={`p-6 rounded-xl border-2 ${
        isBest
          ? 'border-success bg-success/5'
          : 'border-danger bg-danger/5'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {isBest ? (
              <Award className="h-6 w-6 text-success" />
            ) : (
              <AlertCircle className="h-6 w-6 text-danger" />
            )}
            <div>
              <h3 className="font-semibold">
                {isBest ? 'Personal Best Trip' : 'Needs Improvement'}
              </h3>
              <p className="text-sm text-neutral">{trip.trip_id}</p>
            </div>
          </div>
          <div className={`text-3xl font-bold ${
            isBest ? 'text-success' : 'text-danger'
          }`}>
            {trip.eco_score}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-neutral mb-1">Date</div>
            <div className="text-sm font-medium">{date.toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-xs text-neutral mb-1">Distance</div>
            <div className="text-sm font-medium">{trip.distance_km?.toFixed(1)} km</div>
          </div>
          <div>
            <div className="text-xs text-neutral mb-1">Fuel Efficiency</div>
            <div className="text-sm font-medium">{fuelEfficiency} L/100km</div>
          </div>
          <div>
            <div className="text-xs text-neutral mb-1">Duration</div>
            <div className="text-sm font-medium">{duration} min</div>
          </div>
        </div>

        {isBest ? (
          <div className="flex items-center gap-2 text-success text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>Excellent driving performance!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-danger text-sm">
            <TrendingDown className="h-4 w-4" />
            <span>Focus on smoother acceleration and steady speeds</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Personal Best & Worst Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TripCard trip={bestTrip} isBest={true} fuelEfficiency={bestFuelEfficiency} />
        <TripCard trip={worstTrip} isBest={false} fuelEfficiency={worstFuelEfficiency} />
      </div>
    </div>
  );
};

