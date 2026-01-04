import { Zap } from 'lucide-react';

interface ThrottleGaugeProps {
  throttle: number;
}

export const ThrottleGauge = ({ throttle }: ThrottleGaugeProps) => {
  const color = throttle > 80 ? '#EF4444' : throttle > 60 ? '#F59E0B' : '#10B981';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Throttle</h3>
      </div>
      <div className="relative">
        <div className="text-center">
          <div className="text-5xl font-bold mb-1" style={{ color }}>
            {Math.round(throttle)}
          </div>
          <div className="text-sm text-neutral mb-4">%</div>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{ width: `${throttle}%`, backgroundColor: color }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

