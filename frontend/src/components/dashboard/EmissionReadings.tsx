import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { LiveSensorData } from '@/types';

interface EmissionReadingsProps {
  data: LiveSensorData;
}

const EmissionItem = ({ label, value, unit, threshold, color }: {
  label: string;
  value: number;
  unit: string;
  threshold: number;
  color: string;
}) => {
  const isWarning = value > threshold;
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
      <div className="flex items-center gap-2">
        {isWarning ? (
          <AlertTriangle className="h-4 w-4 text-danger" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-success" />
        )}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold" style={{ color }}>
          {value.toFixed(1)}
        </span>
        <span className="text-xs text-neutral">{unit}</span>
      </div>
    </div>
  );
};

export const EmissionReadings = ({ data }: EmissionReadingsProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Current Emissions</h3>
      <div className="grid gap-2">
        <EmissionItem
          label="CO₂"
          value={data.co2_ppm}
          unit="ppm"
          threshold={500}
          color={data.co2_ppm > 500 ? '#EF4444' : '#10B981'}
        />
        <EmissionItem
          label="NOx"
          value={data.nox_ppb}
          unit="ppb"
          threshold={80}
          color={data.nox_ppb > 80 ? '#EF4444' : '#10B981'}
        />
        <EmissionItem
          label="PM2.5"
          value={data.pm25_ug_m3}
          unit="μg/m³"
          threshold={25}
          color={data.pm25_ug_m3 > 25 ? '#EF4444' : '#10B981'}
        />
        <EmissionItem
          label="CO"
          value={data.co2_ppm * 0.1}
          unit="ppm"
          threshold={50}
          color={data.co2_ppm * 0.1 > 50 ? '#EF4444' : '#10B981'}
        />
        <EmissionItem
          label="HC"
          value={data.nox_ppb * 0.5}
          unit="ppm"
          threshold={40}
          color={data.nox_ppb * 0.5 > 40 ? '#EF4444' : '#10B981'}
        />
      </div>
    </div>
  );
};

