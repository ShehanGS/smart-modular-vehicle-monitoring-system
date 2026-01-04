import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import type { LiveSensorData } from '@/types';

interface RealTimeChartsProps {
  data: LiveSensorData[];
}

export const RealTimeCharts = ({ data }: RealTimeChartsProps) => {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-neutral text-center py-8">Waiting for sensor data...</p>
      </div>
    );
  }

  const chartData = data.map((d, idx) => ({
    time: idx,
    speed: d.speed_kmh,
    rpm: d.rpm / 10, // Scale down for visibility
    throttle: d.throttle_pct,
    co2: d.co2_ppm,
    nox: d.nox_ppb,
    pm25: d.pm25_ug_m3
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-4">Real-Time Sensor Data</h3>
      <div className="space-y-6">
        {/* Speed and RPM Chart */}
        <div>
          <h4 className="text-sm font-medium text-neutral mb-2">Speed & RPM</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="speed"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                name="Speed (km/h)"
              />
              <Line
                type="monotone"
                dataKey="rpm"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                name="RPM (×10)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Emissions Chart */}
        <div>
          <h4 className="text-sm font-medium text-neutral mb-2">Emissions</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="#EF4444"
                strokeWidth={2}
                dot={false}
                name="CO₂ (ppm)"
              />
              <Line
                type="monotone"
                dataKey="nox"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={false}
                name="NOx (ppb)"
              />
              <Line
                type="monotone"
                dataKey="pm25"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
                name="PM2.5 (μg/m³)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

