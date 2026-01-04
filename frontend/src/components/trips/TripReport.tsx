import { Download, FileText, FileSpreadsheet, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState } from 'react';
import type { TripReport, TripDataPoint } from '@/types';
import { TripStatistics } from './TripStatistics';
import { EmissionsBreakdown } from './EmissionsBreakdown';
import { EcoScoreComparison } from './EcoScoreComparison';
import { AnnotatedTimeSeries } from './AnnotatedTimeSeries';
import { EmissionsHeatmap } from './EmissionsHeatmap';
import { MaintenanceRecommendations } from './MaintenanceRecommendations';
import { HistoricalComparison } from './HistoricalComparison';
import { exportToCSV, exportToPDF } from '@utils/export';

// Mock trip report data
const mockTripReport: TripReport = {
  trip: {
    id: 1,
    trip_id: 'T-2025-12-20-001',
    vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
    driver: { id: 1, user_id: 1, vehicle_id: 1, license_number: 'DL-12345', status: 'authorized', face_registered: true },
    started_at: '2025-12-20T08:30:00Z',
    ended_at: '2025-12-20T09:45:00Z',
    distance_km: 45.2,
    fuel_used_l: 3.8,
    eco_score: 82,
    status: 'completed'
  },
  statistics: {
    distance_km: 45.2,
    duration_minutes: 75,
    fuel_consumed_l: 3.8,
    avg_speed_kmh: 36.2,
    max_speed_kmh: 78,
    avg_eco_score: 82
  },
  emissions: {
    co2_total_g: 8920,
    co2_avg_ppm: 485,
    nox_peak_ppb: 95,
    nox_avg_ppb: 42,
    pm25_exposure_ug_m3: 18.5,
    pm25_avg_ug_m3: 12.3,
    hc_total_g: 125,
    co_total_g: 89
  },
  eco_score: {
    composite: 82,
    baseline: 75,
    improvement: 9.3,
    breakdown: {
      acceleration: 85,
      speed: 80,
      idling: 78,
      emissions: 88
    }
  },
  events: [
    { timestamp: '2025-12-20T08:32:15Z', type: 'cold_start', severity: 'medium', description: 'Cold engine start detected' },
    { timestamp: '2025-12-20T08:45:30Z', type: 'acceleration', severity: 'high', description: 'Harsh acceleration (0-60 km/h in 8s)' },
    { timestamp: '2025-12-20T09:12:45Z', type: 'braking', severity: 'medium', description: 'Hard braking detected' },
    { timestamp: '2025-12-20T09:30:20Z', type: 'acceleration', severity: 'low', description: 'Moderate acceleration' }
  ],
  data_points: generateMockDataPoints(),
  maintenance_recommendations: [
    {
      type: 'emissions',
      priority: 'high',
      title: 'High NOx Levels Detected',
      description: 'NOx peak reached 95 ppb during acceleration. Consider smoother acceleration patterns.',
      action: 'Practice gradual acceleration and avoid rapid throttle changes.'
    },
    {
      type: 'driving',
      priority: 'medium',
      title: 'Harsh Acceleration Events',
      description: 'Multiple harsh acceleration events detected. This increases fuel consumption and emissions.',
      action: 'Focus on smooth, gradual acceleration to improve eco-score.'
    },
    {
      type: 'fuel',
      priority: 'low',
      title: 'Fuel Efficiency Optimization',
      description: 'Current fuel consumption is 8.4 L/100km. Target is below 7.5 L/100km.',
      action: 'Maintain steady speeds and avoid unnecessary idling.'
    }
  ],
  historical_comparison: {
    avg_eco_score: 78,
    avg_fuel_consumption: 8.2,
    avg_emissions: {
      co2: 9500,
      nox: 48,
      pm25: 15.2
    }
  }
};

function generateMockDataPoints() {
  const points = [];
  const startTime = new Date('2025-12-20T08:30:00Z');
  for (let i = 0; i < 75; i++) {
    const time = new Date(startTime.getTime() + i * 60000); // Every minute
    points.push({
      timestamp: time.toISOString(),
      speed_kmh: Math.random() * 60 + 20,
      rpm: Math.random() * 2000 + 1000,
      throttle_pct: Math.random() * 80 + 10,
      acceleration_ms2: (Math.random() - 0.5) * 3,
      co2_ppm: Math.random() * 300 + 350,
      nox_ppb: Math.random() * 60 + 20,
      pm25_ug_m3: Math.random() * 20 + 5,
      fuel_rate_lph: Math.random() * 4 + 2,
      latitude: 7.2083 + (i * 0.001),
      longitude: 79.8358 + (i * 0.001),
      engine_temp_c: Math.min(95 + i * 0.5, 105),
      event_type: (i === 0 ? 'cold_start' : i === 15 ? 'acceleration' : i === 42 ? 'braking' : 'normal') as TripDataPoint['event_type']
    });
  }
  return points;
}

export const TripReportPage = () => {
  const [tripReport] = useState<TripReport>(mockTripReport);

  const handleExportCSV = () => {
    exportToCSV(tripReport);
  };

  const handleExportPDF = () => {
    exportToPDF(tripReport);
  };

  return (
    <div className="grid gap-6">
      {/* Header with Export Options */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trip Report</h1>
          <p className="text-sm text-neutral mt-1">
            {tripReport.trip.trip_id} · {new Date(tripReport.trip.started_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-medium"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Trip Statistics */}
      <TripStatistics statistics={tripReport.statistics} />

      {/* Emissions Breakdown */}
      <EmissionsBreakdown emissions={tripReport.emissions} />

      {/* Eco-Score Comparison */}
      <EcoScoreComparison ecoScore={tripReport.eco_score} />

      {/* Annotated Time-Series */}
      <AnnotatedTimeSeries dataPoints={tripReport.data_points} events={tripReport.events} />

      {/* Emissions Heatmap */}
      <EmissionsHeatmap dataPoints={tripReport.data_points} />

      {/* Maintenance Recommendations */}
      <MaintenanceRecommendations recommendations={tripReport.maintenance_recommendations} />

      {/* Historical Comparison */}
      <HistoricalComparison
        current={tripReport}
        historical={tripReport.historical_comparison}
      />
    </div>
  );
};

