import type { Alert as AlertType } from '@/types';
import { formatDateTime } from '@utils/helpers';
import { AlertTriangle, CheckCircle2, Info, XCircle, CloudRain, Wrench, ShieldAlert } from 'lucide-react';
import { classNames } from '@utils/helpers';

const SeverityIcon = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info
};

const TypeIcon = {
  safety: ShieldAlert,
  emission: CloudRain,
  maintenance: Wrench,
  sensor: Info
};

const SeverityColors = {
  critical: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200'
};

export const AlertCard = ({ alert, onAcknowledge }: { alert: AlertType; onAcknowledge?: () => void }) => {
  const Icon = SeverityIcon[alert.severity as keyof typeof SeverityIcon] || Info;
  const CategoryIcon = TypeIcon[alert.type as keyof typeof TypeIcon] || Info;

  return (
    <div className={classNames(
      "rounded-lg border p-4 transition-all hover:shadow-md",
      SeverityColors[alert.severity as keyof typeof SeverityColors] || 'bg-white border-slate-200',
      alert.status === 'history' ? 'opacity-60 grayscale' : ''
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full bg-white`}>
            <Icon className={`h-5 w-5 ${alert.severity === 'critical' ? 'text-red-600' :
                alert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
              }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-slate-800">{alert.title}</p>
              {alert.type && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 border border-slate-200">
                  <CategoryIcon className="h-3 w-3" />
                  {alert.type}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{formatDateTime(alert.created_at)}</p>
            <p className="text-sm mt-2 text-slate-700">{alert.message}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={classNames(
            "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded",
            alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
              alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
          )}>
            {alert.severity}
          </span>
        </div>
      </div>

      {alert.status === 'active' && onAcknowledge && (
        <div className="mt-3 flex justify-end">
          <button
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-white px-3 py-1.5 rounded-md border border-primary/20 shadow-sm"
            onClick={onAcknowledge}
          >
            <CheckCircle2 className="h-4 w-4" /> Acknowledge
          </button>
        </div>
      )}
    </div>
  );
};

