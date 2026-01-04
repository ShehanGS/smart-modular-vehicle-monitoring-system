import type { Alert } from '@/types';
import { formatDateTime } from '@utils/helpers';

export const AlertDetailModal = ({ alert, onClose }: { alert: Alert; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-30 bg-black/40 grid place-items-center px-4"
    role="dialog"
    aria-modal="true"
  >
    <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral">{alert.severity}</p>
          <h3 className="text-xl font-semibold">{alert.title}</h3>
          <p className="text-xs text-neutral">{formatDateTime(alert.created_at)}</p>
        </div>
        <button onClick={onClose} className="text-sm text-neutral underline">
          Close
        </button>
      </div>
      <p className="mt-3 text-sm">{alert.message}</p>
      {alert.unauthorized_event && (
        <div className="mt-4 grid gap-3">
          <img
            src={alert.unauthorized_event.captured_image_path}
            alt="Captured driver"
            className="w-full rounded-lg object-cover max-h-80"
          />
          <div className="text-sm text-neutral space-y-1">
            <p>
              Vehicle: {alert.unauthorized_event.vehicle.make} {alert.unauthorized_event.vehicle.model} (
              {alert.unauthorized_event.vehicle.license_plate})
            </p>
            <p>
              Location: {alert.unauthorized_event.location_lat.toFixed(4)},{' '}
              {alert.unauthorized_event.location_lon.toFixed(4)}
            </p>
            <p>Match score: {alert.unauthorized_event.match_score}%</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

