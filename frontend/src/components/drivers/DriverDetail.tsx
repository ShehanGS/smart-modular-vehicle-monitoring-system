import type { Driver } from '@/types';
import { percent } from '@utils/formatters';

export const DriverDetail = ({ driver }: { driver: Driver }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="font-semibold">{driver.full_name}</h3>
    <div className="text-sm text-neutral space-y-1 mt-2">
      <p>License: {driver.license_number}</p>
      <p>Status: {driver.status}</p>
      <p>Face registered: {driver.face_registered ? 'Yes' : 'No'}</p>
      <p>Eco-score: {percent(driver.eco_score)}</p>
    </div>
  </div>
);

