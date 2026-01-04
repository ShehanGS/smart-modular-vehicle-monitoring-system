import { useState, useEffect, useMemo } from 'react';
import { Gauge, Activity, Fuel, Thermometer, AlertTriangle, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { useWebSocket } from '@hooks/useWebSocket';
import type { LiveSensorData } from '@/types';
import { SpeedGauge } from './SpeedGauge';
import { RPMGauge } from './RPMGauge';
import { ThrottleGauge } from './ThrottleGauge';
import { EcoScoreIndicator } from './EcoScoreIndicator';
import { EmissionReadings } from './EmissionReadings';
import { EngineIndicators } from './EngineIndicators';
import { EcoTips } from './EcoTips';
import { RealTimeCharts } from './RealTimeCharts';
import { GPSMap } from './GPSMap';
import { AlertBanner } from './AlertBanner';

// Mock data generator for development
const generateMockData = (): LiveSensorData => ({
  timestamp: new Date().toISOString(),
  speed_kmh: Math.floor(Math.random() * 80) + 20,
  rpm: Math.floor(Math.random() * 2000) + 1000,
  throttle_pct: Math.floor(Math.random() * 100),
  co2_ppm: Math.floor(Math.random() * 500) + 300,
  nox_ppb: Math.floor(Math.random() * 100) + 20,
  pm25_ug_m3: Math.random() * 30 + 5,
  eco_score: Math.floor(Math.random() * 30) + 70,
  fuel_rate_lph: Math.random() * 5 + 2
});

export const RealTimeDashboard = () => {
  const [sensorData, setSensorData] = useState<LiveSensorData[]>([]);
  const [currentData, setCurrentData] = useState<LiveSensorData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number }>({ lat: 7.2083, lon: 79.8358 });

  // Mock WebSocket connection - replace with real WebSocket when backend is ready
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      setCurrentData(newData);
      setSensorData((prev) => {
        const updated = [...prev, newData];
        return updated.slice(-60); // Keep last 60 data points
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Simulate GPS movement
  useEffect(() => {
    const interval = setInterval(() => {
      setLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lon: prev.lon + (Math.random() - 0.5) * 0.001
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const warnings = useMemo(() => {
    if (!currentData) return [];
    const alerts: Array<{ type: 'danger' | 'warning'; message: string }> = [];
    
    if (currentData.nox_ppb > 80) {
      alerts.push({ type: 'danger', message: 'High NOx levels detected! Reduce throttle immediately.' });
    }
    if (currentData.pm25_ug_m3 > 25) {
      alerts.push({ type: 'danger', message: 'PM2.5 levels exceed safe limits!' });
    }
    if (currentData.co2_ppm > 600) {
      alerts.push({ type: 'warning', message: 'Elevated CO₂ levels detected.' });
    }
    if (currentData.eco_score < 60) {
      alerts.push({ type: 'warning', message: 'Eco-score is low. Improve driving behavior.' });
    }
    return alerts;
  }, [currentData]);

  if (!currentData) {
    return (
      <div className="grid place-items-center h-64">
        <div className="text-center">
          <Activity className="h-12 w-12 text-neutral mx-auto mb-2 animate-pulse" />
          <p className="text-neutral">Connecting to vehicle sensors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {/* Alert Banner */}
      {warnings.length > 0 && <AlertBanner warnings={warnings} />}

      {/* Main Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SpeedGauge speed={currentData.speed_kmh} />
        <RPMGauge rpm={currentData.rpm} />
        <ThrottleGauge throttle={currentData.throttle_pct} />
        <EcoScoreIndicator score={currentData.eco_score} />
      </div>

      {/* Emissions and Fuel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <EmissionReadings data={currentData} />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Fuel className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Fuel Consumption</h3>
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-primary mb-1">
              {currentData.fuel_rate_lph.toFixed(2)}
            </div>
            <div className="text-sm text-neutral">Liters per hour</div>
            <div className="mt-3 text-xs text-neutral">
              Estimated: {(currentData.fuel_rate_lph * 0.1).toFixed(2)} L/100km
            </div>
          </div>
        </div>
        <EngineIndicators data={currentData} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RealTimeCharts data={sensorData} />
        <GPSMap location={location} />
      </div>

      {/* Eco Tips */}
      <EcoTips currentData={currentData} />
    </div>
  );
};

