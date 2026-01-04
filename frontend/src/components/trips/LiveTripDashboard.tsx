import { useMemo } from 'react';
import { Gauge, Activity, Fuel } from 'lucide-react';
import { RealTimeChart } from '../sensors/RealTimeChart';

const stream = [
  { timestamp: 't1', speed_kmh: 40, rpm: 1500, eco_score: 82, co2_ppm: 420 },
  { timestamp: 't2', speed_kmh: 50, rpm: 1800, eco_score: 80, co2_ppm: 480 },
  { timestamp: 't3', speed_kmh: 45, rpm: 1600, eco_score: 84, co2_ppm: 430 }
];

export const LiveTripDashboard = () => {
  const latest = useMemo(() => stream[stream.length - 1], []);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Live Trip</h3>
        <span className="text-xs text-success">IN PROGRESS</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Speed" value={`${latest.speed_kmh} km/h`} icon={<Gauge />} />
        <StatCard title="RPM" value={`${latest.rpm}`} icon={<Activity />} />
        <StatCard title="Eco-score" value={`${latest.eco_score}`} icon={<Gauge />} />
        <StatCard title="CO₂" value={`${latest.co2_ppm} ppm`} icon={<Fuel />} />
      </div>
      <div className="mt-4">
        <RealTimeChart data={stream} dataKeys={['speed_kmh', 'rpm', 'eco_score']} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: JSX.Element }) => (
  <div className="rounded-lg border border-slate-200 p-3 flex items-center gap-3">
    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">{icon}</div>
    <div>
      <p className="text-xs text-neutral">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

