import type { EmissionReport as Report } from '@/types';

const sample: Report = {
  trip_id: 'T-001',
  co2_total_g: 14200,
  nox_intensity_mg_km: 32,
  pm25_exposure: 12
};

export const EmissionReport = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="font-semibold mb-2">Trip Emission Report</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <Metric label="CO₂ Total" value={`${sample.co2_total_g} g`} />
      <Metric label="NOx Intensity" value={`${sample.nox_intensity_mg_km} mg/km`} />
      <Metric label="PM2.5 Exposure" value={`${sample.pm25_exposure} µg/m³`} />
    </div>
  </div>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
    <p className="text-xs text-neutral">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

