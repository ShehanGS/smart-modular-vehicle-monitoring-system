import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { Trip } from '@/types';

interface TrendChartsProps {
  trips: Trip[];
  dateRange: 'week' | 'month' | 'quarter' | 'year' | 'all';
}

export const TrendCharts = ({ trips, dateRange }: TrendChartsProps) => {
  // Prepare data for charts
  const chartData = trips
    .filter(t => t.ended_at && t.distance_km && t.fuel_used_l)
    .map(trip => {
      const date = new Date(trip.started_at);
      const fuelEfficiency = trip.distance_km && trip.fuel_used_l
        ? ((trip.fuel_used_l / trip.distance_km) * 100)
        : 0;
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString(),
        ecoScore: trip.eco_score || 0,
        fuelEfficiency: fuelEfficiency,
        distance: trip.distance_km || 0,
        fuelUsed: trip.fuel_used_l || 0,
        emissions: (trip.fuel_used_l || 0) * 2.31 // Approximate CO2 in kg
      };
    })
    .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());

  // Calculate trends
  const ecoScoreTrend = chartData.length > 1
    ? ((chartData[chartData.length - 1].ecoScore - chartData[0].ecoScore) / chartData[0].ecoScore * 100).toFixed(1)
    : '0';
  
  const fuelTrend = chartData.length > 1
    ? ((chartData[0].fuelEfficiency - chartData[chartData.length - 1].fuelEfficiency) / chartData[0].fuelEfficiency * 100).toFixed(1)
    : '0';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fuel Efficiency Trend */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Fuel Efficiency Trend</h3>
            <p className="text-sm text-neutral">Liters per 100km over time</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral">Trend</div>
            <div className={`text-sm font-semibold ${parseFloat(fuelTrend) > 0 ? 'text-success' : 'text-danger'}`}>
              {parseFloat(fuelTrend) > 0 ? '↓' : '↑'} {Math.abs(parseFloat(fuelTrend))}%
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" label={{ value: 'L/100km', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="fuelEfficiency"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              name="Fuel Efficiency (L/100km)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Eco-Score Trend */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Eco-Score Trend</h3>
            <p className="text-sm text-neutral">Driving performance over time</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral">Trend</div>
            <div className={`text-sm font-semibold ${parseFloat(ecoScoreTrend) > 0 ? 'text-success' : 'text-danger'}`}>
              {parseFloat(ecoScoreTrend) > 0 ? '↑' : '↓'} {Math.abs(parseFloat(ecoScoreTrend))}%
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" domain={[0, 100]} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ecoScore"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', r: 4 }}
              name="Eco-Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Emissions Improvement */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Emissions Improvement</h3>
            <p className="text-sm text-neutral">CO₂ emissions per trip (estimated)</p>
          </div>
          <div className="flex items-center gap-2 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">Improving</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" label={{ value: 'CO₂ (kg)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="emissions"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.3}
              name="CO₂ Emissions (kg)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

