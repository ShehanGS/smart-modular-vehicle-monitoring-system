import type { TripDataPoint } from '@/types';

interface EmissionsHeatmapProps {
  dataPoints: TripDataPoint[];
}

export const EmissionsHeatmap = ({ dataPoints }: EmissionsHeatmapProps) => {
  // Create bins for speed (0-20, 20-40, 40-60, 60-80, 80+)
  const speedBins = [0, 20, 40, 60, 80, 120];
  // Create bins for acceleration (-3 to -1, -1 to 0, 0 to 1, 1 to 3+)
  const accelBins = [-3, -1, 0, 1, 3, 5];

  // Calculate average emissions for each bin
  const heatmapData: Array<{
    speedRange: string;
    accelRange: string;
    co2: number;
    nox: number;
    pm25: number;
    count: number;
  }> = [];

  for (let i = 0; i < speedBins.length - 1; i++) {
    for (let j = 0; j < accelBins.length - 1; j++) {
      const speedMin = speedBins[i];
      const speedMax = speedBins[i + 1];
      const accelMin = accelBins[j];
      const accelMax = accelBins[j + 1];

      const pointsInBin = dataPoints.filter(
        p => p.speed_kmh >= speedMin && p.speed_kmh < speedMax &&
        p.acceleration_ms2 >= accelMin && p.acceleration_ms2 < accelMax
      );

      if (pointsInBin.length > 0) {
        heatmapData.push({
          speedRange: `${speedMin}-${speedMax} km/h`,
          accelRange: `${accelMin.toFixed(1)} to ${accelMax.toFixed(1)} m/s²`,
          co2: pointsInBin.reduce((sum, p) => sum + p.co2_ppm, 0) / pointsInBin.length,
          nox: pointsInBin.reduce((sum, p) => sum + p.nox_ppb, 0) / pointsInBin.length,
          pm25: pointsInBin.reduce((sum, p) => sum + p.pm25_ug_m3, 0) / pointsInBin.length,
          count: pointsInBin.length
        });
      }
    }
  }

  // Find max values for color scaling
  const maxCO2 = Math.max(...heatmapData.map(d => d.co2));
  const maxNOx = Math.max(...heatmapData.map(d => d.nox));
  const maxPM25 = Math.max(...heatmapData.map(d => d.pm25));

  const getColor = (value: number, max: number) => {
    const ratio = value / max;
    if (ratio > 0.8) return '#EF4444'; // Red
    if (ratio > 0.6) return '#F59E0B'; // Orange
    if (ratio > 0.4) return '#FCD34D'; // Yellow
    if (ratio > 0.2) return '#84CC16'; // Light green
    return '#10B981'; // Green
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Emissions Heatmap</h2>
      <p className="text-sm text-neutral mb-4">
        Average emissions by speed and acceleration bins
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CO₂ Heatmap */}
        <div>
          <h3 className="text-sm font-medium mb-3">CO₂ (ppm)</h3>
          <div className="grid grid-cols-5 gap-1">
            {heatmapData.map((cell, idx) => (
              <div
                key={idx}
                className="aspect-square rounded border border-slate-200 flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: getColor(cell.co2, maxCO2) }}
                title={`${cell.speedRange}, ${cell.accelRange}: ${cell.co2.toFixed(0)} ppm`}
              >
                {cell.co2.toFixed(0)}
              </div>
            ))}
          </div>
        </div>

        {/* NOx Heatmap */}
        <div>
          <h3 className="text-sm font-medium mb-3">NOx (ppb)</h3>
          <div className="grid grid-cols-5 gap-1">
            {heatmapData.map((cell, idx) => (
              <div
                key={idx}
                className="aspect-square rounded border border-slate-200 flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: getColor(cell.nox, maxNOx) }}
                title={`${cell.speedRange}, ${cell.accelRange}: ${cell.nox.toFixed(0)} ppb`}
              >
                {cell.nox.toFixed(0)}
              </div>
            ))}
          </div>
        </div>

        {/* PM2.5 Heatmap */}
        <div>
          <h3 className="text-sm font-medium mb-3">PM2.5 (μg/m³)</h3>
          <div className="grid grid-cols-5 gap-1">
            {heatmapData.map((cell, idx) => (
              <div
                key={idx}
                className="aspect-square rounded border border-slate-200 flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: getColor(cell.pm25, maxPM25) }}
                title={`${cell.speedRange}, ${cell.accelRange}: ${cell.pm25.toFixed(1)} μg/m³`}
              >
                {cell.pm25.toFixed(1)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
        <div className="text-xs text-neutral">
          <strong>Legend:</strong> Color intensity represents emission levels. 
          Red = High, Orange = Medium-High, Yellow = Medium, Light Green = Low-Medium, Green = Low
        </div>
      </div>
    </div>
  );
};

