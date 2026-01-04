import { Route, Clock, Fuel, Gauge, TrendingUp } from 'lucide-react';

interface TripStatisticsProps {
  statistics: {
    distance_km: number;
    duration_minutes: number;
    fuel_consumed_l: number;
    avg_speed_kmh: number;
    max_speed_kmh: number;
    avg_eco_score: number;
  };
}

export const TripStatistics = ({ statistics }: TripStatisticsProps) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Trip Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={<Route className="h-5 w-5 text-primary" />}
          label="Distance"
          value={`${statistics.distance_km.toFixed(1)} km`}
        />
        <StatCard
          icon={<Clock className="h-5 w-5 text-primary" />}
          label="Duration"
          value={formatDuration(statistics.duration_minutes)}
        />
        <StatCard
          icon={<Fuel className="h-5 w-5 text-primary" />}
          label="Fuel Consumed"
          value={`${statistics.fuel_consumed_l.toFixed(2)} L`}
          subtitle={`${((statistics.fuel_consumed_l / statistics.distance_km) * 100).toFixed(2)} L/100km`}
        />
        <StatCard
          icon={<Gauge className="h-5 w-5 text-primary" />}
          label="Avg Speed"
          value={`${statistics.avg_speed_kmh.toFixed(1)} km/h`}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          label="Max Speed"
          value={`${statistics.max_speed_kmh} km/h`}
        />
        <StatCard
          icon={<Gauge className="h-5 w-5 text-success" />}
          label="Eco-Score"
          value={`${statistics.avg_eco_score}`}
          subtitle="Average"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, subtitle }: {
  icon: JSX.Element;
  label: string;
  value: string;
  subtitle?: string;
}) => (
  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-slate-50 border border-slate-100">
    <div className="mb-2">{icon}</div>
    <div className="text-xs text-neutral mb-1">{label}</div>
    <div className="text-lg font-bold">{value}</div>
    {subtitle && <div className="text-xs text-neutral mt-1">{subtitle}</div>}
  </div>
);

