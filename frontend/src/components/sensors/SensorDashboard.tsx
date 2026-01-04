import { RealTimeChart } from './RealTimeChart';
import { SensorStatusPanel } from './SensorStatusPanel';
import { CalibrationPanel } from './CalibrationPanel';
import { SensorMetadataCard } from './SensorMetadataCard';

const liveData = [
  { timestamp: 't1', speed_kmh: 40, rpm: 1500, throttle_pct: 30, co2_ppm: 420, nox_ppb: 30, pm25_ug_m3: 12 },
  { timestamp: 't2', speed_kmh: 45, rpm: 1700, throttle_pct: 40, co2_ppm: 460, nox_ppb: 35, pm25_ug_m3: 15 },
  { timestamp: 't3', speed_kmh: 50, rpm: 1800, throttle_pct: 45, co2_ppm: 480, nox_ppb: 38, pm25_ug_m3: 18 }
];

export const SensorDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="font-semibold mb-2">Real-time Sensors</h3>
        <RealTimeChart data={liveData} dataKeys={['speed_kmh', 'rpm', 'throttle_pct']} />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="font-semibold mb-2">Air Quality</h3>
        <RealTimeChart data={liveData} dataKeys={['co2_ppm', 'nox_ppb', 'pm25_ug_m3']} />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SensorMetadataCard
        sensorType="CO₂ (NDIR)"
        lastCalibrated={new Date(Date.now() - 86400000 * 2).toISOString()}
        offset={15.2}
        slope={1.02}
        status="ok"
      />
      <SensorMetadataCard
        sensorType="PM2.5 (Optical)"
        lastCalibrated={new Date(Date.now() - 86400000 * 10).toISOString()}
        offset={-2.1}
        slope={0.98}
        status="drift"
      />
      <SensorMetadataCard
        sensorType="NOx (Electrochem)"
        lastCalibrated={new Date(Date.now() - 86400000 * 1).toISOString()}
        offset={0.5}
        slope={1.00}
        status="ok"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SensorStatusPanel />
      <CalibrationPanel />
    </div>
  </div>
);

