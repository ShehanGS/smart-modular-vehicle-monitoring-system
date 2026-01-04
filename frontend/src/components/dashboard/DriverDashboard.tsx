import { useMemo } from 'react';
import { MetricsCard } from './MetricsCard';
import { RealTimeDashboard } from './RealTimeDashboard';
import { TripList } from '../trips/TripList';

const mockTrips = [
  { id: 1, score: 85, distance: 32, date: '2025-12-18' },
  { id: 2, score: 78, distance: 21, date: '2025-12-17' }
];

export const DriverDashboard = () => {
  const avgScore = useMemo(
    () => Math.round(mockTrips.reduce((sum, t) => sum + t.score, 0) / mockTrips.length),
    []
  );

  return (
    <div className="grid gap-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricsCard title="My Eco-score" value={`${avgScore}`} subtitle="Last 5 trips" />
        <MetricsCard title="Fuel Efficiency" value="5.8 L/100km" subtitle="Good" />
        <MetricsCard title="Total Distance" value="1,230 km" subtitle="This month" />
        <MetricsCard title="Emissions" value="142 kg CO₂" subtitle="This month" />
      </div>
      
      {/* Real-Time Driving Interface */}
      <RealTimeDashboard />
      
      {/* Trip History */}
      <TripList />
    </div>
  );
};

