import { AlertTriangle, Mail, MapPin, Phone } from 'lucide-react';
import { formatDateTime } from '@utils/helpers';
import type { UnauthorizedDriverEvent } from '@/types';

export const UnauthorizedDriverAlert = ({ event }: { event: UnauthorizedDriverEvent }) => (
  <div className="rounded-2xl border-2 border-danger/40 bg-white p-4 shadow-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-danger" />
        <div>
          <p className="font-bold text-danger">Unauthorized Driver Detected</p>
          <p className="text-xs text-neutral">{formatDateTime(event.detected_at)}</p>
        </div>
      </div>
      <span className="text-xs text-danger uppercase tracking-wide">Critical</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
      <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
        <p className="text-sm font-semibold">Vehicle</p>
        <p className="text-sm">
          {event.vehicle.make} {event.vehicle.model} ({event.vehicle.license_plate})
        </p>
        <p className="flex items-center gap-2 text-xs text-neutral mt-2">
          <MapPin className="h-4 w-4" />
          {event.location_lat.toFixed(4)}, {event.location_lon.toFixed(4)}
        </p>
      </div>
      <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
        <p className="text-sm font-semibold">Notifications</p>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-primary" /> Email sent to admin@company.com
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-primary" /> Push notification sent
        </div>
      </div>
    </div>
    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="rounded-lg overflow-hidden border border-slate-200">
        <img src={event.captured_image_path} alt="Captured driver" className="w-full h-40 object-cover" />
      </div>
      <div className="rounded-lg border border-slate-200 p-3">
        <p className="text-sm font-semibold mb-2">Match Score</p>
        <p className="text-2xl font-bold text-danger">{event.match_score}%</p>
        <p className="text-xs text-neutral">No face match found</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <button className="px-3 py-2 rounded-lg bg-primary text-white text-sm">View Full Details</button>
        <button className="px-3 py-2 rounded-lg border text-sm">Track Vehicle</button>
        <button className="px-3 py-2 rounded-lg border text-sm">Acknowledge</button>
        <button className="px-3 py-2 rounded-lg border text-sm">Investigate</button>
      </div>
    </div>
  </div>
);

