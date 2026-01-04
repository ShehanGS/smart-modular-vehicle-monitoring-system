import { Gauge } from 'lucide-react';

interface SpeedGaugeProps {
  speed: number;
}

export const SpeedGauge = ({ speed }: SpeedGaugeProps) => {
  const maxSpeed = 120;
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  const color = speed > 100 ? '#EF4444' : speed > 80 ? '#F59E0B' : '#10B981';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Gauge className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Speed</h3>
      </div>
      <div className="relative">
        <div className="text-center">
          <div className="text-5xl font-bold mb-1" style={{ color }}>
            {Math.round(speed)}
          </div>
          <div className="text-sm text-neutral mb-4">km/h</div>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral mt-1">
          <span>0</span>
          <span>{maxSpeed}</span>
        </div>
      </div>
    </div>
  );
};

