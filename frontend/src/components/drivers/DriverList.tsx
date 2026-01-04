import type { Driver } from '@/types';
import { BadgeCheck, CircleOff, Clock, UserCheck } from 'lucide-react';

const mockDrivers: Driver[] = [
  { id: 1, user_id: 1, vehicle_id: 1, license_number: 'D123', status: 'authorized', face_registered: true, full_name: 'A. Silva' },
  { id: 2, user_id: 2, vehicle_id: 2, license_number: 'D456', status: 'pending', face_registered: false, full_name: 'B. Perera' },
  { id: 3, user_id: 3, vehicle_id: 3, license_number: 'D789', status: 'unauthorized', face_registered: false, full_name: 'Unknown' }
];

const statusIcon: Record<Driver['status'], JSX.Element> = {
  authorized: <BadgeCheck className="h-4 w-4 text-success" />,
  pending: <Clock className="h-4 w-4 text-warning" />,
  unauthorized: <CircleOff className="h-4 w-4 text-danger" />,
  suspended: <CircleOff className="h-4 w-4 text-danger" />
};

export const DriverList = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold">Drivers</h3>
      <button className="rounded-lg bg-primary text-white px-3 py-1 text-sm">Register New Driver</button>
    </div>
    <div className="divide-y divide-slate-100">
      {mockDrivers.map((d) => (
        <div key={d.id} className="py-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 grid place-items-center text-primary">
            <UserCheck className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">{d.full_name}</p>
            <p className="text-xs text-neutral">License {d.license_number}</p>
          </div>
          <div className="flex items-center gap-2 text-xs">{statusIcon[d.status]} {d.status}</div>
        </div>
      ))}
    </div>
  </div>
);

