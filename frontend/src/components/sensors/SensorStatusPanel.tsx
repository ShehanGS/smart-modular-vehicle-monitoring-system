import { CheckCircle2, XCircle, Timer, Wifi, Zap } from 'lucide-react';

const connections = [
  { name: 'OBD-II Interface', status: 'connected', latency: '12ms' },
  { name: 'GPS Module', status: 'connected', satellites: 8 },
  { name: 'IMU (Accel/Gyro)', status: 'connected', temp: '42°C' },
  { name: 'AQ Sensors (Main)', status: 'warning', health: '92%' }
];

export const SensorStatusPanel = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <Zap className="h-5 w-5 text-primary" />
      <h3 className="font-semibold text-lg">System Health & Connections</h3>
    </div>

    <div className="grid gap-4">
      {/* Connection Status List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-neutral uppercase tracking-wider">Interfaces</h4>
        {connections.map((conn) => (
          <div key={conn.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
            <div className="flex items-center gap-3">
              {conn.status === 'connected' ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-warning" />
              )}
              <span className="font-medium text-sm">{conn.name}</span>
            </div>
            <div className="text-xs text-neutral">
              {conn.latency && `Lat: ${conn.latency}`}
              {conn.satellites && `${conn.satellites} Sats`}
              {conn.temp && `${conn.temp}`}
              {conn.health && `Health: ${conn.health}`}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-slate-100 my-2" />

      {/* Warm-up Status */}
      <div>
        <h4 className="text-sm font-medium text-neutral uppercase tracking-wider mb-3">Sensor Warm-up</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>NOx Sensor Heater</span>
              <span className="text-success font-medium">Ready</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-success w-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>PM2.5 Laser Stabilizer</span>
              <span className="text-primary font-medium">Warming (85%)</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[85%] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

