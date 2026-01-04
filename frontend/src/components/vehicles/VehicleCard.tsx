import type { Vehicle } from '@/types';
import { BadgeCheck, Car, MapPin } from 'lucide-react';

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-lg bg-primary/10 grid place-items-center text-primary">
        <Car />
      </div>
      <div>
        <p className="font-semibold">
          {vehicle.make} {vehicle.model}
        </p>
        <p className="text-xs text-neutral">{vehicle.license_plate}</p>
      </div>
      <span className="ml-auto flex items-center gap-1 text-xs text-success">
        <BadgeCheck className="h-4 w-4" /> {vehicle.status ?? 'online'}
      </span>
    </div>
    <div className="mt-3 flex items-center gap-2 text-xs text-neutral">
      <MapPin className="h-4 w-4" /> Last seen: 2 min ago
    </div>
  </div>
);

