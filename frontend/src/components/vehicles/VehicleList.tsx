import { VehicleCard } from './VehicleCard';
import type { Vehicle } from '@/types';

const mockVehicles: Vehicle[] = [
  { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234', status: 'online' },
  { id: 2, vehicle_id: 'V-002', make: 'Honda', model: 'Civic', year: 2020, license_plate: 'XYZ-9876', status: 'maintenance' },
  { id: 3, vehicle_id: 'V-003', make: 'Tesla', model: 'Model 3', year: 2022, license_plate: 'EV-5555', status: 'online' }
];

export const VehicleList = () => (
  <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    {mockVehicles.map((v) => (
      <VehicleCard key={v.id} vehicle={v} />
    ))}
  </div>
);

export const FleetOverview = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold">Fleet Overview</h3>
      <button className="text-sm text-primary underline" aria-label="Add vehicle">
        Add Vehicle
      </button>
    </div>
    <VehicleList />
  </div>
);

