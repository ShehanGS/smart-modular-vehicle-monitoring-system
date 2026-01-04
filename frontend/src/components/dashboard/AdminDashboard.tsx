import { Car, Leaf, ShieldAlert, Users } from 'lucide-react';
import { MetricsCard } from './MetricsCard';
import { UnauthorizedAlertPanel } from './UnauthorizedAlertPanel';
import { FleetOverview } from '../vehicles/VehicleList';
import { EmissionChart } from '../trips/EmissionChart';
import { AlertCenter } from '../alerts/AlertCenter';

const sampleEmissions = [
  { name: 'Mon', co2: 120, nox: 30, pm25: 12 },
  { name: 'Tue', co2: 140, nox: 32, pm25: 15 },
  { name: 'Wed', co2: 110, nox: 24, pm25: 10 },
  { name: 'Thu', co2: 160, nox: 35, pm25: 18 },
  { name: 'Fri', co2: 180, nox: 40, pm25: 20 }
];

export const AdminDashboard = () => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricsCard title="Total Vehicles" value="48" icon={<Car />} subtitle="12 active now" />
        <MetricsCard title="Active Trips" value="6" icon={<ShieldAlert />} subtitle="Live monitoring" />
        <MetricsCard title="Drivers" value="120" icon={<Users />} subtitle="5 unauthorized detected" />
        <MetricsCard title="Fleet Eco-score" value="82" icon={<Leaf />} subtitle="↑ 4 vs last week" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Emission Trends</h3>
          </div>
          <EmissionChart data={sampleEmissions} />
        </div>
        <UnauthorizedAlertPanel />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <FleetOverview />
        </div>
        <AlertCenter compact />
      </div>
    </div>
  );
};

