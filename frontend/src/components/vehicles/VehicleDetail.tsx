import type { Vehicle } from '@/types';

export const VehicleDetail = ({ vehicle }: { vehicle: Vehicle }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="font-semibold">
      {vehicle.make} {vehicle.model} ({vehicle.license_plate})
    </h3>
    <div className="text-sm text-neutral space-y-1 mt-2">
      <p>Year: {vehicle.year}</p>
      <p>VIN: {vehicle.vin ?? '—'}</p>
      <p>OBD Protocol: {vehicle.obd_protocol ?? '—'}</p>
      <p>Status: {vehicle.status ?? 'online'}</p>
    </div>
  </div>
);

