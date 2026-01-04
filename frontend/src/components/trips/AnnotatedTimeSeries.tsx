import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { AlertTriangle, Zap, Snowflake, Car } from 'lucide-react';
import type { TripDataPoint } from '@/types';

interface AnnotatedTimeSeriesProps {
  dataPoints: TripDataPoint[];
  events: Array<{
    timestamp: string;
    type: 'acceleration' | 'braking' | 'cold_start' | 'harsh_turn' | 'speed_violation';
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'cold_start':
      return <Snowflake className="h-3 w-3" />;
    case 'acceleration':
      return <Zap className="h-3 w-3" />;
    case 'braking':
      return <AlertTriangle className="h-3 w-3" />;
    default:
      return <Car className="h-3 w-3" />;
  }
};

const getEventColor = (type: string, severity: string) => {
  if (severity === 'high') return '#EF4444';
  if (severity === 'medium') return '#F59E0B';
  return '#3B82F6';
};

export const AnnotatedTimeSeries = ({ dataPoints, events }: AnnotatedTimeSeriesProps) => {
  // Prepare chart data
  const chartData = dataPoints.map((point, idx) => ({
    time: idx,
    timestamp: point.timestamp,
    speed: point.speed_kmh,
    co2: point.co2_ppm,
    nox: point.nox_ppb,
    pm25: point.pm25_ug_m3,
    acceleration: point.acceleration_ms2,
    event: events.find(e => {
      const eventTime = new Date(e.timestamp).getTime();
      const pointTime = new Date(point.timestamp).getTime();
      return Math.abs(eventTime - pointTime) < 60000; // Within 1 minute
    })
  }));

  // Create annotations for events
  const annotations = events.map((event, idx) => {
    const eventIndex = dataPoints.findIndex(p => {
      const eventTime = new Date(event.timestamp).getTime();
      const pointTime = new Date(p.timestamp).getTime();
      return Math.abs(eventTime - pointTime) < 60000;
    });
    return { ...event, index: eventIndex >= 0 ? eventIndex : null };
  }).filter(a => a.index !== null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Time-Series Visualization with Annotations</h2>
      
      {/* Speed and Acceleration Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-neutral mb-3">Speed & Acceleration</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="time" stroke="#6B7280" label={{ value: 'Time (minutes)', position: 'insideBottom', offset: -5 }} />
            <YAxis yAxisId="left" stroke="#3B82F6" label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" label={{ value: 'Acceleration (m/s²)', angle: 90, position: 'insideRight' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-lg">
                      <p className="text-xs text-neutral mb-1">
                        {new Date(data.timestamp).toLocaleTimeString()}
                      </p>
                      {payload.map((entry, idx) => (
                        <p key={idx} className="text-sm" style={{ color: entry.color }}>
                          {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
                        </p>
                      ))}
                      {data.event && (
                        <div className="mt-2 pt-2 border-t border-slate-200">
                          <div className="flex items-center gap-1 text-xs">
                            {getEventIcon(data.event.type)}
                            <span className="font-medium">{data.event.description}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="speed"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              name="Speed (km/h)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="acceleration"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              name="Acceleration (m/s²)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Emissions Chart */}
      <div>
        <h3 className="text-sm font-medium text-neutral mb-3">Emissions Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="time" stroke="#6B7280" label={{ value: 'Time (minutes)', position: 'insideBottom', offset: -5 }} />
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

      {/* Event Legend */}
      <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
        <div className="text-xs font-semibold text-neutral mb-2">Detected Events</div>
        <div className="flex flex-wrap gap-3">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white border"
              style={{ borderColor: getEventColor(event.type, event.severity) }}
            >
              {getEventIcon(event.type)}
              <span>{event.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

