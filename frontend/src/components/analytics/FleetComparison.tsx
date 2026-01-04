import { Users, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import type { Trip } from '@/types';

interface FleetComparisonProps {
  trips: Trip[];
}

export const FleetComparison = ({ trips }: FleetComparisonProps) => {
  // Mock fleet data - in real app, this would come from API
  const fleetData = [
    { driver: 'You', avgEcoScore: 80, avgFuelEff: 8.2, totalTrips: trips.length },
    { driver: 'Driver 2', avgEcoScore: 78, avgFuelEff: 8.5, totalTrips: 12 },
    { driver: 'Driver 3', avgEcoScore: 82, avgFuelEff: 7.9, totalTrips: 15 },
    { driver: 'Driver 4', avgEcoScore: 75, avgFuelEff: 9.1, totalTrips: 8 },
    { driver: 'Fleet Avg', avgEcoScore: 79, avgFuelEff: 8.4, totalTrips: 0 }
  ];

  const yourAvgEcoScore = trips.length > 0
    ? Math.round(trips.reduce((sum, t) => sum + (t.eco_score || 0), 0) / trips.length)
    : 0;

  const yourAvgFuelEff = trips.length > 0
    ? trips
        .filter(t => t.distance_km && t.fuel_used_l)
        .reduce((sum, t) => {
          const eff = ((t.fuel_used_l || 0) / (t.distance_km || 1)) * 100;
          return sum + eff;
        }, 0) / trips.filter(t => t.distance_km && t.fuel_used_l).length
    : 0;

  // Update "You" with actual data
  fleetData[0].avgEcoScore = yourAvgEcoScore;
  fleetData[0].avgFuelEff = yourAvgFuelEff;

  const yourRank = fleetData
    .filter(d => d.driver !== 'Fleet Avg')
    .sort((a, b) => b.avgEcoScore - a.avgEcoScore)
    .findIndex(d => d.driver === 'You') + 1;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Fleet Comparison</h2>
        </div>
        <div className="text-sm text-neutral">
          Your rank: <span className="font-semibold text-primary">#{yourRank}</span> of {fleetData.length - 1}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Eco-Score Comparison */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Average Eco-Score</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fleetData.filter(d => d.driver !== 'Fleet Avg')}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="driver" stroke="#6B7280" />
              <YAxis stroke="#6B7280" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avgEcoScore"
                fill="#10B981"
                name="Eco-Score"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Efficiency Comparison */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Average Fuel Efficiency</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fleetData.filter(d => d.driver !== 'Fleet Avg')}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="driver" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avgFuelEff"
                fill="#3B82F6"
                name="L/100km"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fleet Leaderboard */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Fleet Leaderboard
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold text-neutral">Rank</th>
                <th className="text-left py-2 px-3 font-semibold text-neutral">Driver</th>
                <th className="text-right py-2 px-3 font-semibold text-neutral">Eco-Score</th>
                <th className="text-right py-2 px-3 font-semibold text-neutral">Fuel Eff.</th>
                <th className="text-right py-2 px-3 font-semibold text-neutral">Trips</th>
              </tr>
            </thead>
            <tbody>
              {fleetData
                .filter(d => d.driver !== 'Fleet Avg')
                .sort((a, b) => b.avgEcoScore - a.avgEcoScore)
                .map((driver, idx) => (
                  <tr
                    key={driver.driver}
                    className={`border-b border-slate-100 ${
                      driver.driver === 'You' ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="py-2 px-3">
                      <span className="font-semibold">#{idx + 1}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={driver.driver === 'You' ? 'font-semibold text-primary' : ''}>
                        {driver.driver}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <span className="font-semibold">{driver.avgEcoScore}</span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      {driver.avgFuelEff.toFixed(2)} L/100km
                    </td>
                    <td className="py-2 px-3 text-right text-neutral">
                      {driver.totalTrips}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

