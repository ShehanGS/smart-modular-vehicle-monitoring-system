import { Thermometer, Gauge } from 'lucide-react';
import type { LiveSensorData } from '@/types';

interface EngineIndicatorsProps {
  data: LiveSensorData;
}

export const EngineIndicators = ({ data }: EngineIndicatorsProps) => {
  // Calculate engine temperature and load from RPM and throttle
  const engineTemp = Math.min(95 + (data.rpm / 100) + (data.throttle_pct / 2), 120);
  const engineLoad = Math.min((data.rpm / 6000) * 100 + (data.throttle_pct * 0.3), 100);

  const tempColor = engineTemp > 100 ? '#EF4444' : engineTemp > 90 ? '#F59E0B' : '#10B981';
  const loadColor = engineLoad > 80 ? '#EF4444' : engineLoad > 60 ? '#F59E0B' : '#10B981';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Engine Status</h3>
      <div className="grid gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: tempColor }}>
              {engineTemp.toFixed(1)}°C
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{ width: `${(engineTemp / 120) * 100}%`, backgroundColor: tempColor }}
            />
          </div>
          <div className="flex justify-between text-xs text-neutral mt-1">
            <span>0°C</span>
            <span>120°C</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Engine Load</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: loadColor }}>
              {engineLoad.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{ width: `${engineLoad}%`, backgroundColor: loadColor }}
            />
          </div>
          <div className="flex justify-between text-xs text-neutral mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

