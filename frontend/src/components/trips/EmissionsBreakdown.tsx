import { AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';

interface EmissionsBreakdownProps {
  emissions: {
    co2_total_g: number;
    co2_avg_ppm: number;
    nox_peak_ppb: number;
    nox_avg_ppb: number;
    pm25_exposure_ug_m3: number;
    pm25_avg_ug_m3: number;
    hc_total_g: number;
    co_total_g: number;
  };
}

export const EmissionsBreakdown = ({ emissions }: EmissionsBreakdownProps) => {
  const co2_kg = emissions.co2_total_g / 1000;
  const noxStatus = emissions.nox_peak_ppb > 80 ? 'danger' : emissions.nox_peak_ppb > 60 ? 'warning' : 'good';
  const pm25Status = emissions.pm25_avg_ug_m3 > 25 ? 'danger' : emissions.pm25_avg_ug_m3 > 15 ? 'warning' : 'good';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Emissions Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CO₂ */}
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">CO₂ Total</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <div className="text-2xl font-bold text-primary mb-1">{co2_kg.toFixed(2)} kg</div>
          <div className="text-xs text-neutral">Avg: {emissions.co2_avg_ppm.toFixed(0)} ppm</div>
          <div className="mt-2 text-xs text-neutral">
            Estimated from fuel consumption
          </div>
        </div>

        {/* NOx */}
        <div className={`p-4 rounded-lg border ${
          noxStatus === 'danger' ? 'border-danger bg-danger/5' :
          noxStatus === 'warning' ? 'border-warning bg-warning/5' :
          'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">NOx Peak</span>
            {noxStatus === 'danger' ? (
              <AlertTriangle className="h-4 w-4 text-danger" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-success" />
            )}
          </div>
          <div className={`text-2xl font-bold mb-1 ${
            noxStatus === 'danger' ? 'text-danger' :
            noxStatus === 'warning' ? 'text-warning' :
            'text-primary'
          }`}>
            {emissions.nox_peak_ppb.toFixed(0)} ppb
          </div>
          <div className="text-xs text-neutral">Avg: {emissions.nox_avg_ppb.toFixed(1)} ppb</div>
          {noxStatus === 'danger' && (
            <div className="mt-2 text-xs text-danger font-medium">
              Exceeds safe limits during acceleration
            </div>
          )}
        </div>

        {/* PM2.5 */}
        <div className={`p-4 rounded-lg border ${
          pm25Status === 'danger' ? 'border-danger bg-danger/5' :
          pm25Status === 'warning' ? 'border-warning bg-warning/5' :
          'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">PM2.5 Exposure</span>
            {pm25Status === 'danger' ? (
              <AlertTriangle className="h-4 w-4 text-danger" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-success" />
            )}
          </div>
          <div className={`text-2xl font-bold mb-1 ${
            pm25Status === 'danger' ? 'text-danger' :
            pm25Status === 'warning' ? 'text-warning' :
            'text-primary'
          }`}>
            {emissions.pm25_exposure_ug_m3.toFixed(1)} μg/m³
          </div>
          <div className="text-xs text-neutral">Avg: {emissions.pm25_avg_ug_m3.toFixed(1)} μg/m³</div>
          {pm25Status === 'danger' && (
            <div className="mt-2 text-xs text-danger font-medium">
              High exposure detected
            </div>
          )}
        </div>

        {/* HC & CO */}
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">HC & CO</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <div className="text-lg font-bold text-primary mb-1">
            HC: {emissions.hc_total_g.toFixed(1)} g
          </div>
          <div className="text-lg font-bold text-primary">
            CO: {emissions.co_total_g.toFixed(1)} g
          </div>
        </div>
      </div>
    </div>
  );
};

