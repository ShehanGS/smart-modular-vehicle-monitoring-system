import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Trip } from '@/types';

interface TripComparisonProps {
  trips: Trip[];
}

export const TripComparison = ({ trips }: TripComparisonProps) => {
  if (trips.length < 2) {
    return null;
  }

  const comparisonData = trips.map(trip => {
    const duration = trip.ended_at && trip.started_at
      ? Math.round((new Date(trip.ended_at).getTime() - new Date(trip.started_at).getTime()) / 60000)
      : 0;
    const fuelEfficiency = trip.distance_km && trip.fuel_used_l
      ? ((trip.fuel_used_l / trip.distance_km) * 100)
      : 0;

    return {
      tripId: trip.trip_id.split('-').pop(),
      date: new Date(trip.started_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      ecoScore: trip.eco_score || 0,
      fuelEfficiency: fuelEfficiency,
      distance: trip.distance_km || 0,
      fuelUsed: trip.fuel_used_l || 0,
      duration: duration,
      emissions: (trip.fuel_used_l || 0) * 2.31
    };
  });

  // Calculate averages for comparison
  const avgEcoScore = comparisonData.reduce((sum, d) => sum + d.ecoScore, 0) / comparisonData.length;
  const avgFuelEfficiency = comparisonData.reduce((sum, d) => sum + d.fuelEfficiency, 0) / comparisonData.length;
  const avgEmissions = comparisonData.reduce((sum, d) => sum + d.emissions, 0) / comparisonData.length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Trip Comparison</h2>
      <p className="text-sm text-neutral mb-6">
        Comparing {trips.length} selected trips
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Eco-Score Comparison */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Eco-Score Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="tripId" stroke="#6B7280" />
              <YAxis stroke="#6B7280" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ecoScore" fill="#10B981" name="Eco-Score" />
              <Bar dataKey={avgEcoScore} fill="#E5E7EB" name="Average" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Efficiency Comparison */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Fuel Efficiency Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="tripId" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="fuelEfficiency" fill="#3B82F6" name="L/100km" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-3 font-semibold text-neutral">Trip</th>
              <th className="text-left py-2 px-3 font-semibold text-neutral">Date</th>
              <th className="text-right py-2 px-3 font-semibold text-neutral">Eco-Score</th>
              <th className="text-right py-2 px-3 font-semibold text-neutral">Fuel Eff.</th>
              <th className="text-right py-2 px-3 font-semibold text-neutral">Distance</th>
              <th className="text-right py-2 px-3 font-semibold text-neutral">Emissions</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((data, idx) => (
              <tr key={idx} className="border-b border-slate-100">
                <td className="py-2 px-3 font-mono">{data.tripId}</td>
                <td className="py-2 px-3 text-neutral">{data.date}</td>
                <td className="py-2 px-3 text-right">
                  <span className={`font-semibold ${
                    data.ecoScore >= avgEcoScore ? 'text-success' : 'text-danger'
                  }`}>
                    {data.ecoScore}
                    {data.ecoScore >= avgEcoScore ? (
                      <TrendingUp className="inline h-3 w-3 ml-1" />
                    ) : (
                      <TrendingDown className="inline h-3 w-3 ml-1" />
                    )}
                  </span>
                </td>
                <td className="py-2 px-3 text-right">
                  {data.fuelEfficiency.toFixed(2)} L/100km
                  {data.fuelEfficiency <= avgFuelEfficiency ? (
                    <TrendingDown className="inline h-3 w-3 ml-1 text-success" />
                  ) : (
                    <TrendingUp className="inline h-3 w-3 ml-1 text-danger" />
                  )}
                </td>
                <td className="py-2 px-3 text-right">{data.distance.toFixed(1)} km</td>
                <td className="py-2 px-3 text-right">
                  {data.emissions.toFixed(2)} kg
                  {data.emissions <= avgEmissions ? (
                    <TrendingDown className="inline h-3 w-3 ml-1 text-success" />
                  ) : (
                    <TrendingUp className="inline h-3 w-3 ml-1 text-danger" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

